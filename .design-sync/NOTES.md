# design-sync notes — K-Booking Beauty (KBB)

Repo is a **Next.js app**, not a published component library — there is no `dist/`
and no `.d.ts`. The design system lives in `src/components/ui/` (shadcn-style,
`cva` + Tailwind). Synced in **synth-entry / package** shape.

## Build facts
- Install: `npm ci` (package-lock.json, node 22).
- No build step produces a component entry → converter runs in **synth-entry**
  mode (`[NO_DIST]` is expected, not an error). `cfg.srcDir = src/components/ui`
  scopes discovery; `cfg.componentSrcMap` pins the 10 public components so the
  compound sub-parts (CardHeader/Title/…, SkeletonCard/List, ModalFooter) stay
  in the bundle (`export *`) but don't each get their own card.
- `@/` path alias → `cfg.tsconfig = ./tsconfig.json` (paths `@/* -> ./src/*`).
- **PKG_DIR self-symlink (recreate on every fresh clone / re-sync):**
  `ln -sfn .. node_modules/kbb`. The converter resolves `PKG_DIR = node_modules/<pkg>`,
  which doesn't exist for an app that is its own package. The symlink points it at
  the repo root. `walk()` skips `node_modules` so there's no loop. It's gitignored
  (node_modules) — rebuild it before any `package-build.mjs` run.

## Styling — Tailwind compiled to static CSS
- The components are styled purely by Tailwind utility classes, so the real CSS
  only exists after Tailwind compiles. `.design-sync/build-css.sh` compiles
  `src/app/globals.css` (with `.design-sync/tailwind.build.cjs`, theme mirrored
  from `tailwind.config.ts`) into `.design-sync/compiled/tailwind.css`, which is
  `cfg.cssEntry`. **Re-run build-css.sh after editing components OR authored
  previews** (content globs cover both) so every class used ships.
- `.design-sync/css-header.css` is prepended so remote font `@import`s sit at the
  top of the file → preserved as `[FONT_REMOTE]` when the converter copies the
  file into `_ds_bundle.css` (esbuild emits no CSS here, so it copies not appends).

## Fonts (all loaded at runtime via remote @import — [FONT_REMOTE], no shipped woff2)
- Pretendard Variable — jsDelivr CDN (the app loads it the same way via a <link>).
- Poppins / Playfair Display / Noto Sans KR — Google Fonts; `--font-poppins`,
  `--font-playfair`, `--font-noto-sans-kr` defined in css-header.css (the app gets
  these from next/font, which doesn't exist outside Next).

## Overlay components (Modal, BottomSheet, SideSheet)
- All three `createPortal(…, document.body)` + framer-motion, and render nothing
  unless `isOpen`. Floor cards until previews are authored with `isOpen`. Need
  `cfg.overrides.<Name> = {cardMode:"single", viewport:"WxH"}` so the open state is
  captured. SideSheet is NOT in `src/components/ui/index.ts` barrel but is a real
  component — included.

## Overlay preview capture quirk (Modal, BottomSheet, SideSheet)
- The per-cell `package-capture.mjs` `?story=` review sheets come up BLANK for these
  three — framer-motion's mount animation (opacity 0 → 1) hasn't settled when the
  capture screenshots. This is NOT a render failure: the actual product `.html` card
  renders correctly (validate render-check: `blank:false`, `bad:false`, full text,
  pngBytes 20k+). They are graded `good` from the validate card screenshots
  (`ds-bundle/_screenshots/general__<Name>.png`), noted in each `.grade.json`. On
  re-sync, grade overlays from those validate screenshots, not the review sheets.
- All previews use **inline styles** for layout wrappers (not Tailwind utility
  classes) so a CSS recompile is never required just to lay out a card. Brand styling
  comes from the components themselves.

## Render check / playwright
- No playwright/chromium in the repo. Installed `playwright` (npm only, browser
  download skipped) into `.ds-sync`, and run validate/capture with
  `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`
  (system Chrome 149) — avoids the ~200MB chromium download. Re-export this env var
  for every validate/capture run.

## Re-sync risks
- Theme is duplicated in `tailwind.build.cjs` — if `tailwind.config.ts` colors/
  fonts change, mirror them here or the bundle drifts from the app.
- Fonts depend on network at render time (CDN + Google Fonts). If a render check
  runs offline, text falls back to system fonts (layout/colors still correct).

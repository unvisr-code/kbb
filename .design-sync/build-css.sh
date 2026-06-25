#!/usr/bin/env bash
# Compile Tailwind → static CSS for the design-sync bundle (cfg.cssEntry).
# Re-run whenever component sources OR authored previews change so every
# utility class used lands in the shipped stylesheet.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p .design-sync/compiled
npx tailwindcss -c .design-sync/tailwind.build.cjs -i src/app/globals.css -o .design-sync/compiled/_tw.css 2>&1 | tail -2
# Prepend remote font @imports + --font-* vars so they sit at the very top of
# the file (CSS requires @import before any rule); the converter copies this
# file verbatim into _ds_bundle.css when esbuild produced no CSS.
cat .design-sync/css-header.css .design-sync/compiled/_tw.css > .design-sync/compiled/tailwind.css
echo "compiled .design-sync/compiled/tailwind.css ($(wc -c < .design-sync/compiled/tailwind.css | tr -d ' ') bytes)"

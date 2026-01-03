import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#e04d75",
};

export const metadata: Metadata = {
  title: {
    default: "K-Booking Beauty | Korean Nail Salon Booking for Foreigners",
    template: "%s | K-Booking Beauty",
  },
  description: "Book nail salon appointments at foreigner-friendly salons in Korea. English-speaking staff, easy online booking, and experience the best Korean nail art in Seoul, Hongdae, Gangnam, and more.",
  keywords: [
    "Korean nail salon",
    "K-beauty nail art",
    "nail salon booking Korea",
    "foreigner friendly salon",
    "English speaking nail salon Seoul",
    "Korean manicure",
    "Korean pedicure",
    "nail art Korea",
    "Seoul nail salon",
    "Hongdae nail salon",
    "Gangnam nail salon",
    "K-beauty experience",
  ],
  authors: [{ name: "K-Booking Beauty" }],
  creator: "K-Booking Beauty",
  publisher: "K-Booking Beauty",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kbb-xi.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "ko-KR": "/ko",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kbb-xi.vercel.app",
    siteName: "K-Booking Beauty",
    title: "K-Booking Beauty | Find Your Perfect Nail Salon in Korea",
    description: "Discover and book foreigner-friendly nail salons in Korea. English-speaking staff, stunning K-beauty nail art, easy online booking in Seoul, Hongdae, Gangnam.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "K-Booking Beauty - Korean Nail Salon Booking Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "K-Booking Beauty | Korean Nail Salon Booking",
    description: "Book foreigner-friendly nail salons in Korea. English-speaking staff & stunning K-beauty nail art.",
    images: ["/og-image.png"],
    creator: "@kbookingbeauty",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "beauty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable} ${notoSansKr.variable}`}>
      <body className="font-sans antialiased bg-neutral-50 text-neutral-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}

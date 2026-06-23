import type { Metadata, Viewport } from "next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";

// Friendly, rounded display face for headings — warm and playful, the right
// register for an early-learning centre while staying clean and legible.
const display = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-baloo",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Early Learning & Childcare in St Lucia, Brisbane`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "Education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Early Learning & Childcare in St Lucia, Brisbane`,
    description: site.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Early Learning in St Lucia, Brisbane`,
    description: site.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
  other: {
    "geo.region": "AU-QLD",
    "geo.placename": "St Lucia, Brisbane",
    "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
  },
  // Add your Google Search Console token here before launch:
  // verification: { google: "..." },
};

export const viewport: Viewport = {
  themeColor: "#11253f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}

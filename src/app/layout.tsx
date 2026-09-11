import type { Metadata, Viewport } from "next";
import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "IDCARD — India's Fastest ID Card Printing & B2B Printing Ecosystem";
const description =
  "IDCARD is a technology-driven B2B printing platform for bulk ID card printing across India: quality-checked PVC raw materials, order & plant software, and a pan-India production and fulfilment network for schools, colleges, corporates and printing vendors.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  keywords: [
    "ID card printing",
    "bulk ID card printing",
    "PVC ID cards",
    "school ID cards",
    "corporate ID cards",
    "lanyards",
    "ID card accessories",
    "printing suppliers",
    "printing ecosystem",
    "ID card printing India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: "IDCARD",
    title,
    description,
    images: [{ url: "/assets/og-idcard.webp", width: 1200, height: 630, alt: "IDCARD ID cards and lanyards" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/og-idcard.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f1e7",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IDCARD",
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description,
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Sample Street, Business District",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110001",
    addressCountry: "IN",
  },
  areaServed: "IN",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}

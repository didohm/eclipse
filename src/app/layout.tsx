import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DM_Mono, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { site, clubSocialLinks } from "@/lib/site";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", display: "swap" });
const mono = DM_Mono({ variable: "--font-mono", subsets: ["latin"], weight: "400", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f1" },
    { media: "(prefers-color-scheme: dark)", color: "#082b40" },
  ],
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ECLIPSE — Scientific & Digital Student Club at ESGEN, Kolea",
    template: "%s · ECLIPSE ESGEN",
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: "ECLIPSE", url: site.url }],
  creator: "ECLIPSE",
  publisher: "ECLIPSE · ESGEN",
  category: "Education",
  classification: "Student club, science, digital economy",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: site.url },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: "ECLIPSE · ESGEN",
    title: "ECLIPSE — Scientific & Digital Student Club at ESGEN, Kolea",
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ECLIPSE — Scientific & Digital Student Club at ESGEN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ECLIPSE — Scientific & Digital Student Club at ESGEN, Kolea",
    description: site.description,
    images: ["/twitter-image"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "DZ-42",
    "geo.placename": "Kolea, Tipaza, Algeria",
  },
};

function toJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: "ECLIPSE",
    alternateName: "ECLIPSE ESGEN",
    description: site.description,
    url: site.url,
    logo: `${site.url}/eclipse-logo.png`,
    image: `${site.url}/opengraph-image`,
    email: site.email,
    foundingDate: "2025",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kolea University Hub",
      addressLocality: "Kolea",
      addressRegion: "Tipaza",
      addressCountry: "DZ",
    },
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Higher School of Management & Digital Economy (ESGEN)",
      url: "https://www.esgen.edu.dz/",
    },
    sameAs: clubSocialLinks.map((link) => link.href),
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: "ECLIPSE",
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": `${site.url}/#organization` },
  };
  return <html lang="en" dir="ltr" data-scroll-behavior="smooth" className={`${manrope.variable} ${instrument.variable} ${mono.variable}`}><body><MotionProvider><SmoothScroll /><ScrollProgress /><SiteHeader />{children}<SiteFooter /></MotionProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(organization) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(website) }} /></body></html>;
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Mono, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/lib/site";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", display: "swap" });
const mono = DM_Mono({ variable: "--font-mono", subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "ECLIPSE — ESGEN student club", template: "%s · ECLIPSE" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", siteName: "ECLIPSE", title: "ECLIPSE — ESGEN student club", description: site.description },
  twitter: { card: "summary_large_image", title: "ECLIPSE — ESGEN student club", description: site.description },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: "ECLIPSE", description: site.description, url: site.url };
  return <html lang="en" className={`${manrope.variable} ${instrument.variable} ${mono.variable}`}><body><SmoothScroll /><SiteHeader />{children}<SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}

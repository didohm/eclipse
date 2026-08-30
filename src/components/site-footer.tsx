"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Send } from "lucide-react";
import { clubSocialLinks } from "@/lib/site";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
] as const;

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V8.93a6.27 6.27 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.2 8.2 0 0 0 4.76 1.52V6.84a4.83 4.83 0 0 1-1-.15Z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialIconMap: Record<string, React.ReactNode> = {
  LinkedIn: <LinkedInIcon className="h-3.5 w-3.5" aria-hidden="true" />,
  Instagram: <InstagramIcon className="h-3.5 w-3.5" aria-hidden="true" />,
  TikTok: <TikTokIcon className="h-3.5 w-3.5" aria-hidden="true" />,
};

export function SiteFooter() {
  const [email, setEmail] = React.useState("");
  const year = new Date().getFullYear();

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = email.trim() ? `?email=${encodeURIComponent(email.trim())}` : "";
    window.location.href = `/contact${params}`;
  };

  return (
    <footer className="site-footer !py-0" style={{ padding: "0 clamp(24px,4vw,64px) 14px" }}>
      <div className="footer-orbit" aria-hidden="true" style={{ opacity: 0.55 }} />
      <div className="footer-frame !pt-7" style={{ paddingTop: "28px" }}>
        {/* Professional compact Footerdemo — tight density, no tagline, ECLIPSE theme only */}
        <div className="grid gap-7 py-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-6">
          {/* Stay connected */}
          <div className="relative">
            <div className="mb-4 flex items-center gap-2.5">
              <Image src="/eclipse-logo.png" alt="ECLIPSE" width={34} height={34} className="h-8 w-8 object-contain" />
              <div>
                <p className="eyebrow !mb-0.5" style={{ color: "var(--ink)", fontSize: "10px" }}>
                  Kolea
                </p>
                <p className="text-xs leading-none" style={{ color: "var(--ink-soft)", fontSize: "11px" }}>
                  Scientific &amp; digital student club
                </p>
              </div>
            </div>

            <h3 className="mb-2 text-sm font-bold tracking-tight" style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Stay connected
            </h3>
            <p className="mb-4 text-xs leading-relaxed" style={{ color: "var(--ink-soft)", fontSize: "12.5px", lineHeight: 1.6 }}>
              Get workshop and event updates — we&apos;ll open the contact page.
            </p>

            <form className="relative max-w-[280px]" onSubmit={handleNewsletterSubmit} aria-label="Contact ECLIPSE">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="h-9 w-full rounded-full border border-[var(--line)] bg-[var(--paper)] px-3.5 pr-10 text-xs text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 outline-none transition-colors focus:border-[var(--coral)]"
              />
              <button
                type="submit"
                aria-label="Go to contact"
                className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-[var(--ink)] text-white transition-colors hover:bg-[var(--coral)]"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </form>

            <div className="pointer-events-none absolute -right-2 top-6 h-16 w-16 rounded-full bg-[var(--teal)]/8 blur-xl" aria-hidden="true" />
          </div>

          {/* Quick Links */}
          <div>
            <p className="eyebrow mb-3 !text-[10px]">Quick Links</p>
            <nav className="flex flex-col gap-1.5 text-xs" aria-label="Footer quick links">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="w-fit py-0.5 text-[13px] font-medium leading-none transition-colors hover:text-[var(--coral)]">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow mb-3 !text-[10px]">Contact</p>
            <address className="space-y-1.5 text-xs not-italic leading-relaxed" style={{ color: "var(--ink-soft)", fontSize: "12.5px" }}>
              <p>Kolea University Hub, Algeria</p>
              <p>Scientific &amp; digital student club</p>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center gap-1 border-b border-[var(--ink)] pb-0.5 text-[10px] font-bold uppercase tracking-wide transition-colors hover:border-[var(--coral)] hover:text-[var(--coral)]"
                style={{ fontFamily: "var(--mono)", letterSpacing: "0.07em" }}
              >
                Start a conversation <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            </address>
          </div>

          {/* Follow */}
          <div>
            <p className="eyebrow mb-3 !text-[10px]">Follow the circle</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {clubSocialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="grid h-8 w-8 place-items-center rounded-full border border-[var(--line)] bg-transparent text-[var(--ink)] transition-colors hover:border-[var(--teal)] hover:bg-[var(--teal)]"
                >
                  {socialIconMap[link.label] ?? <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2.5 text-xs">
              {clubSocialLinks.map((link) => (
                <a
                  key={`${link.label}-text`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold transition-colors hover:text-[var(--coral)]"
                  style={{ fontFamily: "var(--mono)", letterSpacing: "0.04em", fontSize: "11px" }}
                >
                  {link.label} <ArrowUpRight size={11} aria-hidden="true" className="text-[var(--coral)]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal — compact, single line max */}
        <div className="footer-legal flex flex-col items-center justify-between gap-2 border-t border-[var(--line)] py-3.5 text-center md:flex-row md:text-left">
          <p style={{ color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.04em", lineHeight: 1 }}>
            © {year} ECLIPSE
          </p>
          <p style={{ color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.04em", lineHeight: 1 }}>
            Scientific &amp; digital student club · Kolea · Est. 2025
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import * as React from "react";
import type { ComponentProps, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { clubSocialLinks } from "@/lib/site";
import { delayed, transitions } from "@/lib/motion";

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
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
};

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Explore",
    links: [
      { title: "Home", href: "/" },
      { title: "About", href: "/about" },
      { title: "Events", href: "/events" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "FAQs", href: "/#faqs" },
      { title: "Join Us", href: "/contact" },
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Use", href: "/terms" },
    ],
  },
  {
    label: "Social Links",
    links: clubSocialLinks.map((link) => ({
      title: link.label,
      href: link.href,
      icon: socialIconMap[link.label],
      external: true,
    })),
  },
];

export function SiteFooter() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative mx-3 mb-0 flex flex-col items-center justify-center rounded-b-none rounded-t-[2rem] border border-b-0 border-[var(--line)] bg-[var(--white)] bg-[radial-gradient(35%_128px_at_50%_0%,rgba(244,88,55,0.08),transparent)] px-5 py-7 sm:px-6 sm:py-8 md:mx-6 md:mb-0 md:rounded-b-none md:rounded-t-[2.5rem] lg:py-9"
    >
      <h2 id="footer-heading" className="sr-only">
        ECLIPSE site footer
      </h2>
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ink)]/20 blur" />
      <div className="w-full max-w-6xl">

      <div className="grid w-full gap-6 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-3"
            aria-label="ECLIPSE — Higher School of Management & Digital Economy — go to homepage"
          >
            <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-[var(--paper)] ring-1 ring-[var(--line)] transition-shadow duration-300 group-hover:shadow-md">
              <Image
                src="/eclipse-logo.png"
                alt="ECLIPSE club logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-105"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-mono text-[13px] font-bold tracking-[0.08em] text-[var(--ink)]">
                ECLIPSE
              </span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--ink-soft)] opacity-60">
                ESGEN · KOLEA — EST. 2025
              </span>
            </span>
          </Link>
          <p className="max-w-[300px] text-sm leading-[1.65] text-[var(--ink-soft)]">
            A scientific &amp; digital student club at ESGEN — workshops, research sprints and events built around
            curiosity.
          </p>
        </AnimatedContainer>

        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink)]">
                  {section.label}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-[var(--ink-soft)]">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="footer-link group relative inline-flex items-center py-0.5 transition-all duration-300 hover:translate-x-[3px] hover:text-[var(--coral-deep)]"
                        >
                          {link.icon && (
                            <link.icon className="me-1.5 size-4 transition-transform duration-300 group-hover:scale-110" />
                          )}
                          {link.title}
                          <span
                            className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--coral)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="footer-link group relative inline-flex items-center py-0.5 transition-all duration-300 hover:translate-x-[3px] hover:text-[var(--coral-deep)]"
                        >
                          {link.icon && (
                            <link.icon className="me-1.5 size-4 transition-transform duration-300 group-hover:scale-110" />
                          )}
                          {link.title}
                          <span
                            className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--coral)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                            aria-hidden="true"
                          />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col items-center justify-between gap-3 border-t border-[var(--line)] pt-4 md:flex-row">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-soft)]">
          Kolea, Tipaza · Algeria
        </p>
        <a
          href="mailto:eclipse_club@esgen.edu.dz"
          className="group inline-flex max-w-full items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--paper)] py-2 pl-2.5 pr-4 text-[11.5px] font-bold text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--coral-deep)] hover:bg-[var(--coral-deep)] hover:text-white hover:shadow-[0_8px_20px_rgba(244,88,55,0.35)] sm:pr-5 sm:text-[13px]"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--coral-deep)] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[var(--coral-deep)]">
            <Mail size={13} aria-hidden="true" />
          </span>
          <span className="truncate">eclipse_club@esgen.edu.dz</span>
        </a>
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--coral-deep)] hover:bg-[var(--coral-deep)] hover:text-white hover:shadow-[0_8px_20px_rgba(244,88,55,0.35)]"
        >
          <ArrowUp size={15} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-3 flex w-full flex-col items-center justify-between gap-2 border-t border-[var(--line)] pt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-soft)] md:flex-row">
        <p>© {new Date().getFullYear()} ECLIPSE — All rights reserved</p>
        <p>
          Developed by{" "}
          <a
            href="https://dido.framer.ai"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex font-bold transition-colors duration-300 hover:text-[var(--ink)]"
            style={{ color: "var(--coral-deep)" }}
          >
            Boumedin Himich
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--coral)] transition-transform duration-300 ease-out group-hover:scale-x-100"
            />
          </a>
        </p>
      </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={delayed(transitions.cinematic, delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

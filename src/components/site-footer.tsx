"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
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

const socialIconMap: Record<string, React.ReactNode> = {
  LinkedIn: <LinkedInIcon className="h-4 w-4" aria-hidden="true" />,
  Instagram: <InstagramIcon className="h-4 w-4" aria-hidden="true" />,
  TikTok: <TikTokIcon className="h-4 w-4" aria-hidden="true" />,
};

export function SiteFooter() {
  const year = new Date().getFullYear();
  const [email, setEmail] = React.useState("");
  const [isHovered, setIsHovered] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = email.trim() ? `?email=${encodeURIComponent(email.trim())}` : "";
    window.location.href = `/contact${params}`;
  };

  return (
    <footer className="site-footer group/footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        ECLIPSE site footer
      </h2>

      {/* subtle top accent line that draws on view */}
      <motion.div
        initial={shouldReduceMotion ? false : { scaleX: 0 }}
        whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-[var(--ink)]"
        aria-hidden="true"
      />

      <div className="footer-inner">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Stay Connected — newsletter + brand */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <Link
              href="/"
              className="group/brand mb-4 inline-flex items-center gap-2.5"
              aria-label="ECLIPSE — go to homepage"
            >
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-[var(--paper)] ring-1 ring-[var(--line)] transition-all duration-300 group-hover/brand:ring-[var(--ink)]/20 group-hover/brand:shadow-sm">
                <Image
                  src="/eclipse-logo.png"
                  alt="ECLIPSE"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/brand:scale-110 group-hover/brand:rotate-[-4deg]"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-mono text-[12px] font-bold tracking-[0.08em] text-[var(--ink)] transition-colors duration-300 group-hover/brand:text-[var(--coral)]">
                  ECLIPSE
                </span>
                <span className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-[var(--ink-soft)] opacity-60">
                  ESGEN · KOLEA — EST. 2025
                </span>
              </span>
            </Link>

            <h3 className="mb-3 font-serif text-[26px] font-normal leading-none tracking-[-0.04em] text-[var(--ink)]">
              Stay Connected
            </h3>
            <p className="mb-6 max-w-[320px] text-[13px] leading-[1.6] text-[var(--ink-soft)]">
              Workshop &amp; event updates. No algorithm — just people. Drop your email and we open contact prefilled.
            </p>

            <form onSubmit={handleSubmit} className="group/form relative max-w-[320px]" aria-label="Stay in orbit — open contact">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@esgen.dz"
                autoComplete="email"
                className="peer h-11 w-full rounded-full border border-[var(--line)] bg-[var(--paper)] px-4 pr-12 text-[13px] text-[var(--ink)] placeholder:text-[rgba(49,83,102,0.45)] outline-none transition-all duration-300 hover:border-[var(--ink)]/20 hover:bg-white focus:border-[var(--coral)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(244,88,55,0.08)]"
              />
              <button
                type="submit"
                aria-label="Continue to contact"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="absolute right-1 top-1 grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] text-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[var(--coral)] hover:shadow-md hover:shadow-[var(--coral)]/20 active:scale-95 group-[.peer:focus-within]/form:bg-[var(--coral)]"
              >
                <motion.span
                  animate={isHovered && !shouldReduceMotion ? { x: 1, y: -1 } : { x: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="grid place-items-center"
                >
                  <Send className="h-4 w-4 transition-transform duration-300" aria-hidden="true" />
                </motion.span>
              </button>
            </form>

            <p className="mt-3 max-w-[320px] font-mono text-[10px] leading-[1.5] tracking-[0.02em] text-[var(--ink-soft)]">
              Bring your <em className="font-serif text-[var(--coral)] transition-colors duration-300">questions</em> into the circle.{" "}
              <Link
                href="/contact"
                className="group/cta relative inline-flex items-center gap-1 font-bold text-[var(--ink)]"
              >
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-100 after:bg-[var(--ink)] after:transition-all after:duration-300 group-hover/cta:after:scale-x-0 group-hover/cta:after:bg-[var(--coral)]">
                  Start a conversation
                </span>
                <ArrowUpRight
                  size={10}
                  aria-hidden="true"
                  className="shrink-0 opacity-70 transition-all duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 group-hover/cta:text-[var(--coral)] group-hover/cta:opacity-100"
                />
              </Link>
            </p>

            <div
              className="pointer-events-none absolute -right-4 top-0 h-24 w-24 rounded-full bg-[var(--teal)]/10 blur-2xl transition-transform duration-700 ease-out group-hover/footer:translate-y-1"
              style={
                shouldReduceMotion
                  ? undefined
                  : ({ animation: "footer-float 6s ease-in-out infinite" } as React.CSSProperties)
              }
              aria-hidden="true"
            />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--ink)]">Quick Links</h3>
            <nav className="flex flex-col gap-2.5 text-sm" aria-label="Quick links">
              {navigation.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.16 + idx * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className="group/link relative inline-flex items-center gap-1.5 text-[13.5px] font-medium leading-none text-[var(--ink-soft)]"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[var(--coral)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:scale-x-100" />
                    </span>
                    <ArrowUpRight
                      size={12}
                      aria-hidden="true"
                      className="h-3 w-3 translate-x-0 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-0 group-hover/link:opacity-100 group-hover/link:text-[var(--coral)]"
                    />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.32 }}
              >
                <Link
                  href="/about"
                  className="group/manifesto mt-1 inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--ink)]"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-[var(--ink)] after:transition-colors after:duration-300 group-hover/manifesto:after:bg-[var(--coral)]">
                    Manifesto &amp; leaders
                  </span>
                  <ArrowUpRight
                    size={11}
                    aria-hidden="true"
                    className="transition-all duration-300 group-hover/manifesto:translate-x-0.5 group-hover/manifesto:-translate-y-0.5 group-hover/manifesto:text-[var(--coral)]"
                  />
                </Link>
              </motion.div>
            </nav>
          </motion.div>

          {/* Contact Us */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.19, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--ink)]">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic leading-[1.6] text-[var(--ink-soft)]">
              <p className="text-[13px] font-medium leading-tight text-[var(--ink)]">
                Kolea University Hub
                <br />
                <span className="font-normal text-[var(--ink-soft)]">Kolea, Tipaza · Algeria — 36°38′N 2°52′E</span>
              </p>
              <p className="text-[13px]">Scientific &amp; digital student club</p>
              <p className="pt-1">
                <Link
                  href="/contact"
                  className="group/email inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--ink)]"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-[var(--ink)] after:transition-all after:duration-300 group-hover/email:after:bg-[var(--coral)]">
                    eclipse@esgen.dz
                  </span>
                  <ArrowUpRight
                    size={11}
                    aria-hidden="true"
                    className="transition-all duration-300 group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5 group-hover/email:text-[var(--coral)]"
                  />
                </Link>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.06em] opacity-70">
                Replies within 48 hours · Workshops monthly
              </p>
            </address>
          </motion.div>

          {/* Follow Us */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--ink)]">Follow Us</h3>
            <div className="mb-6 flex gap-3">
              {clubSocialLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${link.label} — opens in new tab`}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, y: 6 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.06 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  className="group/icon relative grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] bg-transparent text-[var(--ink)] shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white hover:shadow-md hover:shadow-[var(--ink)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--teal)]"
                >
                  <span className="transition-transform duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-[-6deg]">
                    {socialIconMap[link.label] ?? <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                  </span>
                  <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[var(--coral)] opacity-0 transition-opacity duration-300 group-hover/icon:opacity-0" />
                </motion.a>
              ))}
            </div>

            <div className="space-y-1 text-[12.5px] leading-[1.6] text-[var(--ink-soft)]">
              <p>Short reels, lab notes &amp; event after-movies.</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] font-bold uppercase tracking-[0.04em] text-[var(--ink)]">
                {clubSocialLinks.map((link) => (
                  <a
                    key={`${link.label}-text`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group/social inline-flex items-center gap-1 transition-colors duration-300 hover:text-[var(--coral)]"
                  >
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--coral)] after:transition-transform after:duration-300 group-hover/social:after:scale-x-100">
                      {link.label}
                    </span>
                    <ArrowUpRight
                      size={10}
                      aria-hidden="true"
                      className="opacity-60 transition-all duration-300 group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5 group-hover/social:text-[var(--coral)] group-hover/social:opacity-100"
                    />
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--ink-soft)] opacity-70">
              ESGEN · Kolea — Est. 2025
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-8 text-center md:flex-row md:text-left"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--ink-soft)]">
            © {year} ECLIPSE — Scientific &amp; digital student club · Kolea · Est. 2025
          </p>
          <nav
            className="flex flex-wrap justify-center gap-4 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--ink-soft)] md:justify-end"
            aria-label="Legal"
          >
            {[
              { href: "/events", label: "Events" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/admin", label: "Admin" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group/legal relative transition-colors duration-300 hover:text-[var(--coral)]"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[var(--coral)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/legal:scale-x-100" />
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>
    </footer>
  );
}

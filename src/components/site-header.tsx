"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SPRING, STAGGER, delayed, transitions } from "@/lib/motion";
import { clipReveal } from "@/lib/motion-variants";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  // Only flip the boolean when it actually changes — a scroll listener fires
  // on every frame, so setState-ing the same value would re-render the whole
  // header subtree constantly.
  useMotionValueEvent(scrollY, "change", (value) => {
    setCompact((previous) => (previous !== (value > 16) ? value > 16 : previous));
  });

  return (
    <header className={`site-header ${compact ? "site-header--compact" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitions.base}
      >
        <Link className="brand" href="/" aria-label="ECLIPSE home" onClick={() => setOpen(false)}>
          <Image src="/eclipse-logo.png" alt="ECLIPSE club logo" width={64} height={64} priority />
          <span>ECLIPSE</span>
        </Link>
      </motion.div>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={delayed(transitions.base, 0.08 + index * STAGGER.base)}
            >
              <Link
                href={link.href}
                className={`nav-link ${isActive ? "nav-link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="nav-link__text">{link.label}</span>
                <span className="nav-link__underline" aria-hidden="true" />
                {isActive ? <motion.span layoutId="nav-active-pill" className="nav-link__active-bg" aria-hidden="true" transition={SPRING.snappy} /> : null}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={delayed(transitions.base, 0.36)}
        className="header-cta-wrap"
      >
        <Link className="header-cta" href="/contact">
          <span className="header-cta__label">Join us</span>
          <span className="header-cta__icon" aria-hidden="true">
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </span>
        </Link>
      </motion.div>

      <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <motion.span
          key={open ? "x" : "menu"}
          initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={transitions.fast}
          style={{ display: "grid", placeItems: "center" }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            variants={clipReveal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mobile-nav__links">
              {links.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    className="mobile-nav__item"
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                    transition={delayed(transitions.base, 0.08 + index * STAGGER.base)}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`mobile-nav__link ${isActive ? "mobile-nav__link--active" : ""}`}
                    >
                      <span className="mobile-nav__index">0{index + 1}</span>
                      <span className="mobile-nav__label">{link.label}</span>
                      <span className="mobile-nav__arrow" aria-hidden="true">↗</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={delayed(transitions.base, 0.38)}
            >
              <Link className="button button--coral mobile-nav__cta" href="/contact" onClick={() => setOpen(false)}>
                Join us <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

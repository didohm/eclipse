"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  useMotionValueEvent(scrollY, "change", (value) => setCompact(value > 16));

  return (
    <header className={`site-header ${compact ? "site-header--compact" : ""}`}>
      <Link className="brand" href="/" aria-label="ECLIPSE home" onClick={() => setOpen(false)}>
        <Image src="/eclipse-logo.png" alt="ECLIPSE" width={64} height={64} priority />
        <span>ECLIPSE</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      </nav>
      <Link className="header-cta" href="/contact">Join the circle <span>↗</span></Link>
      <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((link, index) => (
              <motion.div key={link.href} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 + index * 0.06 }}>
                <Link href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
              </motion.div>
            ))}
            <Link className="button button--coral" href="/contact" onClick={() => setOpen(false)}>Join the circle</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

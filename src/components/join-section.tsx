"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { VIEWPORT, delayed, transitions } from "@/lib/motion";

const ENTER = { opacity: 0, y: 18 };

/**
 * Join CTA — the ambient decoration (orbs, ring, pulses) is intentionally
 * animated by the CSS keyframes in globals.css (`join-float`, `join-pulse`,
 * `join-rotate`); FM must not fight those transforms. Entrances use the
 * shared motion tokens.
 */
export function JoinSection() {
  const reduced = useReducedMotion();

  const reveal = (delay: number) =>
    reduced
      ? {}
      : {
          initial: ENTER,
          whileInView: { opacity: 1, y: 0 },
          viewport: VIEWPORT,
          transition: delayed(transitions.base, delay),
        };

  return (
    <section className="join-section page-shell" aria-labelledby="join-heading">
      <motion.div
        className="join-section__inner"
        {...reveal(0)}
        viewport={reduced ? undefined : { once: true, amount: 0.22 }}
      >
        {/* decorative field — ambient motion handled by CSS keyframes */}
        <div className="join-section__bg" aria-hidden="true">
          <span className="join-section__grid" />
          <span className="join-section__orb join-section__orb--1" />
          <span className="join-section__orb join-section__orb--2" />
          <span className="join-section__circle join-section__circle--a" />
          <span className="join-section__circle join-section__circle--b" />
          <span className="join-section__ring" />
          <span className="join-section__grain" />
        </div>

        <div className="join-section__content">
          <motion.p className="eyebrow" {...reveal(0.08)}>
            Become part of it
          </motion.p>

          <h2 id="join-heading">
            <motion.span className="join-section__line-wrap" {...reveal(0.14)}>
              <span className="join-section__line">Bring your questions</span>
            </motion.span>
            <motion.span className="join-section__line-wrap" {...reveal(0.22)}>
              <span className="join-section__line">
                into the <em>circle.</em>
              </span>
            </motion.span>
          </h2>

          <motion.p className="join-section__copy" {...reveal(0.3)}>
            Workshops, research sprints, editorial notes — and a community that makes room for your inquiry.
          </motion.p>
        </div>

        <motion.div className="join-section__action" {...reveal(0.36)}>
          <Link href="/contact" className="join-section__cta-link" aria-label="Contact ECLIPSE — Join us">
            <span>Join us</span>
            <span className="join-section__cta-icon" aria-hidden="true">
              <ArrowRight size={18} strokeWidth={2} />
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

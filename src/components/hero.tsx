"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { fadeUpSmall, heroMark } from "@/lib/motion-variants";

export function Hero() {
  const reduced = useReducedMotion();
  const [showVideo, setShowVideo] = useState(false);

  // The hero video is decorative. Defer fetching it until the browser is
  // idle so it never competes with the LCP image and first input.
  useEffect(() => {
    if (reduced) return;
    const trigger = () => setShowVideo(true);
    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(trigger, { timeout: 3000 });
      return () => window.cancelIdleCallback(handle);
    }
    const handle = setTimeout(trigger, 1200);
    return () => clearTimeout(handle);
  }, [reduced]);

  // Mount-time entrance props (hero is above the fold, so "animate" fires
  // immediately). Variants come from the shared motion system.
  const enter = reduced
    ? {}
    : { variants: fadeUpSmall, initial: "hidden" as const, animate: "visible" as const };

  return (
    <section className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__orb hero__orb--teal" aria-hidden="true" />
      <div className="hero__orb hero__orb--gold" aria-hidden="true" />
      <div className="hero__content page-shell">
        <div className="hero__intro">
          <motion.p className="eyebrow hero__eyebrow" {...enter}>
            <span /> ESGEN STUDENT CLUB · EST. 2025
          </motion.p>
          <TextReveal
            as="h1"
            delay={0.08}
            stagger={0.11}
            lineClassName="hero__line"
            lines={[
              "Welcome",
              <span key="accent" className="hero__line--accent">to ECLIPSE.</span>,
            ]}
          />
          <Reveal className="hero__copy-wrap" delay={0.3}>
            <p className="hero__copy">A living circle for students who turn questions into research, ideas into workshops, and curiosity into collective momentum.</p>
          </Reveal>
          <Reveal className="hero__actions-wrap" delay={0.42}>
            <div className="hero__actions">
              <Link className="button button--navy" href="/about">Discover ECLIPSE <ArrowDownRight size={18} /></Link>
              <Link className="text-link" href="/events">Explore our events <span>↗</span></Link>
            </div>
          </Reveal>
        </div>
        <motion.div
          className="hero__mark"
          variants={reduced ? undefined : heroMark}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="hero__mark-ring" />
          <video
            className="hero__mark-video"
            src={showVideo ? "https://res.cloudinary.com/drzwqhmsd/video/upload/v1791989382/w4qy2jhfxa9ssxbl9ts6.mp4" : undefined}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            controls={false}
            preload="none"
            aria-label="Welcome to ECLIPSE club video"
          />
          <span className="hero__mark-label">SCIENTIFIC<br />DIGITAL<br />COLLECTIVE</span>
        </motion.div>
      </div>
      <div className="hero__meta page-shell">
        <Reveal delay={0.55}>
          <p>Shaping a more curious digital economy.</p>
        </Reveal>
        <Reveal delay={0.65}>
          <p className="hero__scroll">Scroll to explore <span>↓</span></p>
        </Reveal>
      </div>
    </section>
  );
}

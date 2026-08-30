"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (reduced) return;
    const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
    timeline
      .from(".hero__eyebrow", { y: 18, opacity: 0, duration: 0.5 })
      .from(".hero__line", { yPercent: 115, duration: 1.05, stagger: 0.11 }, "-=0.15")
      .from(".hero__copy, .hero__actions, .hero__meta", { y: 18, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.55")
      .from(".hero__mark", { scale: 0.76, rotate: -7, opacity: 0, duration: 1.1 }, "<");
  }, { scope: root, dependencies: [reduced] });

  return (
    <section ref={root} className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__orb hero__orb--teal" aria-hidden="true" />
      <div className="hero__orb hero__orb--gold" aria-hidden="true" />
      <div className="hero__content page-shell">
        <div className="hero__intro">
          <p className="eyebrow hero__eyebrow"><span /> ESGEN STUDENT CLUB · EST. 2025</p>
          <h1>
            <span className="line-wrap"><span className="hero__line">Welcome</span></span>
            <span className="line-wrap"><span className="hero__line hero__line--accent">to ECLIPSE.</span></span>
          </h1>
          <p className="hero__copy">A living circle for students who turn questions into research, ideas into workshops, and curiosity into collective momentum.</p>
          <div className="hero__actions">
            <Link className="button button--navy" href="/about">Discover ECLIPSE <ArrowDownRight size={18} /></Link>
            <Link className="text-link" href="/events">Explore our events <span>↗</span></Link>
          </div>
        </div>
        <div className="hero__mark" aria-hidden="true">
          <div className="hero__mark-ring" />
          <Image src="/eclipse-logo.png" alt="" width={420} height={420} priority />
          <span className="hero__mark-label">SCIENTIFIC<br />DIGITAL<br />COLLECTIVE</span>
        </div>
      </div>
      <div className="hero__meta page-shell">
        <p>Shaping a more curious digital economy.</p>
        <p className="hero__scroll">Scroll to explore <span>↓</span></p>
      </div>
    </section>
  );
}

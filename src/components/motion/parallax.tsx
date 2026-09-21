"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { scrollSpring } from "@/lib/motion-variants";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Total travel in px across the element's viewport transit. */
  distance?: number;
  /** `up` moves against the scroll (classic depth); `down` moves with it. */
  direction?: "up" | "down";
};

/**
 * Scroll-linked parallax. The element drifts at a different speed than the
 * page while it transits the viewport, creating depth. Scroll-linked values
 * are GPU-friendly transforms, smoothed with a spring so they never jitter
 * (including under Lenis smooth scrolling).
 */
export function Parallax({ children, className, distance = 56, direction = "up" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const magnitude = direction === "up" ? distance : -distance;
  const raw = useTransform(scrollYProgress, [0, 1], [magnitude, -magnitude]);
  const y = useSpring(raw, scrollSpring);

  if (reduced) return <div ref={ref} className={className}>{children}</div>;

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

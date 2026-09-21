"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

type CountUpProps = {
  /** Final value. */
  to: number;
  className?: string;
  /** Seconds the count takes once visible. */
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** Decimal places to render. */
  decimals?: number;
};

const formatter = (decimals: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/**
 * Animated number that counts up the first time it scrolls into view.
 * Reduced-motion visitors see the final value immediately.
 */
export function CountUp({ to, className, duration = 1.6, prefix = "", suffix = "", decimals = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    // Reduced-motion visitors get the final value directly (see render below).
    if (!inView || reduced) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE.out,
      onUpdate: (latest) => setDisplay(formatter(decimals).format(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, to, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {reduced ? formatter(decimals).format(to) : display}
      {suffix}
    </span>
  );
}

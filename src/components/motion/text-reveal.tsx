"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { VIEWPORT } from "@/lib/motion";
import { lineReveal, staggerContainer } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  /** One entry per masked line. Strings or rich nodes both work. */
  lines: ReactNode[];
  className?: string;
  /** Classes applied to each line's inner span (typography lives here). */
  lineClassName?: string;
  /** Semantic tag for the whole block. */
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  /** Seconds to wait before the first line rises. */
  delay?: number;
  /** Seconds between lines. */
  stagger?: number;
};

/**
 * Editorial masked-line reveal: each line rises out of its own clip mask,
 * producing the "type lifts off the baseline" effect. Lines cascade with a
 * shared rhythm. Reduced-motion visitors see the text immediately.
 *
 * ```tsx
 * <TextReveal
 *   as="h2"
 *   lines={["Questions,", <>into the <em>circle.</em></>]}
 *   lineClassName="hero__line"
 * />
 * ```
 */
export function TextReveal({
  lines,
  className,
  lineClassName,
  as = "div",
  delay = 0,
  stagger = 0.11,
}: TextRevealProps) {
  const reduced = useReducedMotion();

  const content = lines.map((line, index) => (
    // Clip wrapper: hides the line until it rises. The tiny padding trick
    // keeps descenders (g, y, p) from being clipped at rest.
    <span key={index} className="block overflow-hidden pb-[0.09em] -mb-[0.09em]">
      <motion.span
        className={cn("block will-change-transform", lineClassName)}
        variants={lineReveal}
      >
        {line}
      </motion.span>
    </span>
  ));

  if (reduced) {
    switch (as) {
      case "h1": return <h1 className={className}>{content}</h1>;
      case "h2": return <h2 className={className}>{content}</h2>;
      case "h3": return <h3 className={className}>{content}</h3>;
      case "p": return <p className={className}>{content}</p>;
      case "span": return <span className={className}>{content}</span>;
      default: return <div className={className}>{content}</div>;
    }
  }

  const shared = {
    className,
    variants: staggerContainer(stagger, delay),
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: VIEWPORT,
  };

  switch (as) {
    case "h1": return <motion.h1 {...shared}>{content}</motion.h1>;
    case "h2": return <motion.h2 {...shared}>{content}</motion.h2>;
    case "h3": return <motion.h3 {...shared}>{content}</motion.h3>;
    case "p": return <motion.p {...shared}>{content}</motion.p>;
    case "span": return <motion.span {...shared}>{content}</motion.span>;
    default: return <motion.div {...shared}>{content}</motion.div>;
  }
}

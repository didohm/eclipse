"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { VIEWPORT, VIEWPORT_TALL } from "@/lib/motion";
import {
  blurIn,
  fade,
  fadeUp,
  fadeUpLarge,
  fadeUpSmall,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion-variants";
import type { Variants } from "framer-motion";

const ANIMATIONS = {
  fadeUp,
  fadeUpSmall,
  fadeUpLarge,
  fade,
  scaleIn,
  blurIn,
  slideInLeft,
  slideInRight,
} as const satisfies Record<string, Variants>;

export type RevealAnimation = keyof typeof ANIMATIONS;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay before the reveal starts (seconds). */
  delay?: number;
  /** Which entrance to use. Defaults to the signature fade-up. */
  animation?: RevealAnimation;
  /** Viewport amount override — use a low value (e.g. 0.08) for tall blocks. */
  amount?: number;
};

/** Injects a per-instance delay into a static variant's `visible` state. */
function withDelay(variants: Variants, delay: number): Variants {
  if (!delay) return variants;
  const visible = variants.visible;
  if (typeof visible !== "object" || visible === null) return variants;
  const { transition, ...target } = visible as Record<string, unknown>;
  return {
    ...variants,
    visible: { ...target, transition: { ...(transition as object), delay } },
  };
}

/**
 * Scroll-triggered entrance. Fades/rises content in the first time it enters
 * the viewport. Renders a plain `div` (no animation) when the visitor prefers
 * reduced motion.
 */
export function Reveal({ children, className, delay = 0, animation = "fadeUp", amount }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={withDelay(ANIMATIONS[animation], delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT, ...(amount !== undefined ? { amount } : {}) }}
    >
      {children}
    </motion.div>
  );
}

/** Tall-block reveal — triggers early so long sections never feel stuck. */
export function RevealTall(props: Omit<RevealProps, "amount">) {
  return <Reveal {...props} amount={VIEWPORT_TALL.amount} />;
}

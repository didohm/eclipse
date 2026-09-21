"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { transitions } from "@/lib/motion";

/**
 * Global motion configuration.
 *
 * Wraps the app once (in the root layout) so that:
 *  - every Framer Motion animation inherits the signature ECLIPSE easing as
 *    its default transition,
 *  - visitors with `prefers-reduced-motion` automatically get transform
 *    animations disabled (`reducedMotion="user"`).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={transitions.base}>
      {children}
    </MotionConfig>
  );
}

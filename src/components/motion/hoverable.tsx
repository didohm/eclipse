"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { hoverCard, hoverLift, interactionTransition } from "@/lib/motion-variants";

type HoverableProps = Omit<ComponentProps<typeof motion.div>, "variants" | "whileHover" | "initial" | "animate"> & {
  children: ReactNode;
  /** `lift` nudges up; `card` lifts and scales slightly. */
  effect?: "lift" | "card";
  /** Adds press-down feedback on tap/click. */
  press?: boolean;
};

/**
 * Hover/press interaction wrapper. Renders children with a soft lift (and
 * optional press) using the shared motion language. Reduced-motion visitors
 * get a static element.
 *
 * ```tsx
 * <Hoverable effect="card" press className="event-card">…</Hoverable>
 * ```
 */
export function Hoverable({ children, effect = "lift", press = false, className, ...rest }: HoverableProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={effect === "card" ? hoverCard : hoverLift}
      initial="rest"
      whileHover="hover"
      whileTap={press ? { scale: 0.975, transition: interactionTransition } : undefined}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

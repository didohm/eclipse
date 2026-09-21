"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { VIEWPORT } from "@/lib/motion";
import {
  containerItem,
  containerItemScale,
  staggerContainer,
} from "@/lib/motion-variants";
import type { Variants } from "framer-motion";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. Defaults to the site-wide rhythm. */
  gap?: number;
  /** Seconds to wait before the first child starts. */
  delayChildren?: number;
  /** Viewport amount override for tall containers. */
  amount?: number;
};

/**
 * Orchestrated cascade container. Children registered via `StaggerItem`
 * animate one after another when the container enters the viewport.
 *
 * ```tsx
 * <Stagger className="grid">
 *   {items.map(item => <StaggerItem key={item.id}>…</StaggerItem>)}
 * </Stagger>
 * ```
 */
export function Stagger({ children, className, gap, delayChildren = 0, amount }: StaggerProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={staggerContainer(gap, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...VIEWPORT, ...(amount !== undefined ? { amount } : {}) }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  /** Visual treatment of the item's entrance. */
  variant?: "up" | "scale";
};

/** A single child inside a `Stagger`. Inherits timing from the parent. */
export function StaggerItem({ children, className, variant = "up" }: StaggerItemProps) {
  const variants: Variants = variant === "scale" ? containerItemScale : containerItem;
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

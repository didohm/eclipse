import type { Transition, Variants } from "framer-motion";
import { DISTANCE, DURATION, EASE, SCALE, STAGGER, SPRING } from "@/lib/motion";

/**
 * ECLIPSE motion variants
 * -----------------------
 * Named, reusable animation states. Every variant is built from the tokens in
 * `@/lib/motion`, so retuning the token file re-choreographs the whole site.
 *
 * Usage:
 *   <motion.div variants={fadeUp} initial="hidden" whileInView="visible" />
 *
 * Parenting a `staggerContainer` with any `*Item` variant produces an
 * orchestrated cascade without per-child delays.
 */

/* ------------------------------------------------------------------ *
 * Entrances
 * ------------------------------------------------------------------ */

/** The default content entrance: rises from below and fades in. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE.md },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

/** Short-travel variant for dense UI (list rows, form fields). */
export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: DISTANCE.sm },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.out } },
};

/** Long-travel variant for hero-scale statements. */
export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: DISTANCE.lg },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slower, ease: EASE.out } },
};

/** Pure cross-fade, for layered/decorative elements. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE.out } },
};

/** Appears from below with a gentle scale-up — cards, media, panels. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: SCALE.from, y: DISTANCE.sm },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

/** Focal entrance with rotation, used by the hero mark. */
export const heroMark: Variants = {
  hidden: { opacity: 0, scale: SCALE.hero, rotate: -7 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: DURATION.slower, ease: EASE.out },
  },
};

/** Slides in from the left edge (RTL-safe: uses `x`, not `left`). */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -DISTANCE.lg },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

/** Slides in from the right edge. */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: DISTANCE.lg },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

/** Drops in from above — sticky bars, toasts, header elements. */
export const dropIn: Variants = {
  hidden: { opacity: 0, y: -DISTANCE.md },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

/**
 * Masked line reveal for headings. The wrapper clips, the child translates,
 * producing the "type rises out of the baseline" editorial effect.
 */
export const lineReveal: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: DURATION.slower, ease: EASE.out } },
};

/** Masked reveal that also fades — for smaller display text. */
export const lineRevealSoft: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

/** Wipes open vertically via clip-path — panels, drawers, nav sheets. */
export const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

/** Blur-in, used sparingly for premium/atmospheric surfaces. */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: DISTANCE.sm },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: DURATION.slower, ease: EASE.out },
  },
};

/* ------------------------------------------------------------------ *
 * Orchestration
 * ------------------------------------------------------------------ */

/**
 * Parent that cascades its children. Combine with any `*Item` variant.
 * `delayChildren` lets a cascade wait for an earlier beat (e.g. a heading).
 */
export function staggerContainer(
  staggerChildren: number = STAGGER.base,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

/** Default cascade. */
export const container = staggerContainer();

/** Item variant for use inside a `staggerContainer` parent. */
export const containerItem: Variants = {
  hidden: { opacity: 0, y: DISTANCE.md },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
};

/** Lighter item variant for dense cascades. */
export const containerItemSmall: Variants = {
  hidden: { opacity: 0, y: DISTANCE.sm },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.out } },
};

/** Item variant that scales in — for cascading media/cards. */
export const containerItemScale: Variants = {
  hidden: { opacity: 0, scale: SCALE.from, y: DISTANCE.sm },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

/* ------------------------------------------------------------------ *
 * Interactions
 * ------------------------------------------------------------------ */

/** Nudge the pointer up on hover — links, chips, secondary buttons. */
export const hoverLift: Variants = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: DURATION.fast, ease: EASE.soft } },
};

/** Scale + lift for primary cards. */
export const hoverCard: Variants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.014, transition: { duration: DURATION.fast, ease: EASE.soft } },
};

/** Press feedback, pairs with any hover variant. */
export const tapPress: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1 },
  tap: { scale: 0.975, transition: { duration: DURATION.instant, ease: EASE.soft } },
};

/** Slight counter-scale used on media inside a hovering card. */
export const hoverMedia: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.06, transition: { duration: DURATION.slow, ease: EASE.soft } },
};

/** Arrow/icon slide used inside hoverable rows and links. */
export const hoverIcon: Variants = {
  rest: { x: 0, y: 0 },
  hover: { x: 3, y: -3, transition: { duration: DURATION.fast, ease: EASE.soft } },
};

/* ------------------------------------------------------------------ *
 * Overlays & disclosure
 * ------------------------------------------------------------------ */

/** Expand/collapse used by accordions (FAQ). */
export const collapse: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: DURATION.fast, ease: EASE.in },
  },
};

/** Full-screen scrim fade for modals and lightboxes. */
export const scrim: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast, ease: EASE.out } },
  exit: { opacity: 0, transition: { duration: DURATION.fast, ease: EASE.in } },
};

/** Panel/modal entrance — rises and settles. */
export const modalPanel: Variants = {
  hidden: { opacity: 0, scale: SCALE.subtle, y: DISTANCE.md },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    scale: SCALE.subtle,
    y: DISTANCE.sm,
    transition: { duration: DURATION.fast, ease: EASE.in },
  },
};

/** Mobile drawer sliding in from the right. */
export const drawerRight: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: DURATION.base, ease: EASE.out } },
  exit: { x: "100%", transition: { duration: DURATION.base, ease: EASE.in } },
};

/* ------------------------------------------------------------------ *
 * Ambient / decorative loops
 * ------------------------------------------------------------------ */

/** Slow vertical drift for orbs and floating decoration. */
export const drift: Variants = {
  rest: { y: 0 },
  float: {
    y: [0, -16, 0],
    transition: { duration: 7.5, ease: EASE.inOut, repeat: Infinity },
  },
};

/** Breathing pulse for status dots and live indicators. */
export const pulse: Variants = {
  rest: { scale: 1, opacity: 0.95 },
  live: {
    scale: [1, 1.18, 1],
    opacity: [0.95, 1, 0.95],
    transition: { duration: 2.6, ease: EASE.inOut, repeat: Infinity },
  },
};

/** Slow rotation for rings and orbit decoration. */
export const orbit: Variants = {
  rest: { rotate: 0 },
  spin: { rotate: 360, transition: { duration: 34, ease: "linear", repeat: Infinity } },
};

/* ------------------------------------------------------------------ *
 * Progress
 * ------------------------------------------------------------------ */

/** Shared spring for smoothing scroll-linked motion values. */
export const scrollSpring: Transition = {
  stiffness: 140,
  damping: 26,
  mass: 0.4,
  restDelta: 0.001,
};

/** Reveal cascade defaults used by the shared `motion` primitives. */
export const revealContainer: Variants = staggerContainer(STAGGER.base, 0.04);

/** Fallback spring for hover transitions in primitives. */
export const interactionTransition: Transition = SPRING.gentle;



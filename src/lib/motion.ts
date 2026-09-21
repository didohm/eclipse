import type { Transition, Variants } from "framer-motion";

/**
 * ECLIPSE motion tokens
 * ---------------------
 * Single source of truth for every animation on the site. Components must
 * never hardcode easing arrays, durations or distances — import from here so
 * the whole site shares one choreography language and can be retuned globally.
 */

/** Cubic-bezier tuples. Framer Motion accepts these directly as `ease`. */
export const EASE = {
  /** Editorial "expo out" — the signature ECLIPSE entrance curve. */
  out: [0.16, 1, 0.3, 1],
  /** Symmetric in/out — for cross-fades and state swaps. */
  inOut: [0.65, 0, 0.35, 1],
  /** Softer settle — for hover and micro feedback. */
  soft: [0.33, 1, 0.68, 1],
  /** Accelerating exit — for leaving elements. */
  in: [0.7, 0, 0.84, 0],
} as const satisfies Record<string, [number, number, number, number]>;

export type EaseToken = keyof typeof EASE;

/**
 * Duration scale (seconds). Tuned so a full page reads as one rhythm:
 * micro feedback → content reveal → cinematic hero.
 */
export const DURATION = {
  instant: 0.16,
  fast: 0.28,
  base: 0.45,
  slow: 0.74,
  slower: 1.05,
  cinematic: 1.4,
} as const;

/** Stagger gaps (seconds) for choreographed groups. */
export const STAGGER = {
  tight: 0.055,
  base: 0.088,
  loose: 0.13,
} as const;

/** Travel distances (px) used by reveal variants. */
export const DISTANCE = {
  sm: 14,
  md: 26,
  lg: 44,
} as const;

/** Scale deltas used by reveal variants. */
export const SCALE = {
  /** Cards, media, panels appearing from the background. */
  from: 0.94,
  /** Important focal elements (hero mark). */
  hero: 0.78,
  /** Barely-there settle, avoids "pop". */
  subtle: 0.98,
} as const;

/** Reusable spring configs. */
export const SPRING = {
  /** Snappy UI feedback: nav pills, chips, icon buttons. */
  snappy: { type: "spring", stiffness: 380, damping: 30, mass: 0.9 },
  /** Softer, heavier motion for large surfaces. */
  gentle: { type: "spring", stiffness: 170, damping: 26, mass: 1 },
  /** Playful overshoot for cursors and badges. */
  bouncy: { type: "spring", stiffness: 300, damping: 18, mass: 0.7 },
} as const satisfies Record<string, Transition>;

/**
 * Standard transitions, ready to spread into a `transition` prop.
 * e.g. `transition={transitions.reveal}`
 */
export const transitions = {
  micro: { duration: DURATION.instant, ease: EASE.soft },
  fast: { duration: DURATION.fast, ease: EASE.out },
  base: { duration: DURATION.base, ease: EASE.out },
  reveal: { duration: DURATION.slow, ease: EASE.out },
  cinematic: { duration: DURATION.slower, ease: EASE.out },
  exit: { duration: DURATION.fast, ease: EASE.in },
  crossFade: { duration: DURATION.base, ease: EASE.inOut },
  layout: SPRING.snappy,
} as const satisfies Record<string, Transition>;

/** Reduced-motion-safe transition: collapses any transition to nothing. */
export const instant: Transition = { duration: 0 };

/** Builds a new transition with a delay, keeping the token's easing. */
export function delayed(base: Transition, delay: number): Transition {
  return { ...base, delay };
}

/** Viewport config for scroll-triggered reveals (fires once, early enough). */
export const VIEWPORT = { once: true, amount: 0.18 } as const;

/** Looser viewport for tall sections that are hard to fully bring on screen. */
export const VIEWPORT_TALL = { once: true, amount: 0.08 } as const;

/** Keyframes for a looping, ambient floating motion. */
export const floatKeyframes = {
  y: [0, -14, 0],
} satisfies Record<string, number[]>;

export const floatTransition: Transition = {
  duration: 7,
  ease: EASE.inOut,
  repeat: Infinity,
};

/** Ambient, infinitely rotating motion (rings, orbs). */
export const spinTransition = (duration = 26, direction = 1): Transition => ({
  duration,
  ease: "linear",
  repeat: Infinity,
  ...(direction < 0 ? { repeatType: "mirror" as const } : {}),
});

/**
 * Returns `true` when animations should be suppressed.
 * Wraps `useReducedMotion` so the fallback logic lives in one place.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type { Variants };
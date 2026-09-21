"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { scrollSpring } from "@/lib/motion-variants";

type ScrollProgressProps = {
  className?: string;
};

/**
 * Fixed reading-progress bar driven by page scroll. Add it once in the layout;
 * style it via the `.scroll-progress` class (or pass your own).
 */
export function ScrollProgress({ className = "scroll-progress" }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, scrollSpring);

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{ scaleX, transformOrigin: "0% 50%" }}
    />
  );
}

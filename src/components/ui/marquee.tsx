"use client";

import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

interface MarqueeProps {
  className?: string;
  style?: CSSProperties;
  pauseOnHover?: boolean;
  reverse?: boolean;
  repeat?: number;
  children: ReactNode;
}

/**
 * Infinite horizontal marquee. Duplicates children `repeat` times
 * and translates -50% on a loop. Gap is driven by `--gap` so the
 * track stays seamless.
 */
export function Marquee({
  className,
  style,
  pauseOnHover = false,
  reverse = false,
  repeat = 2,
  children,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:1.25rem] [--duration:45s]",
        pauseOnHover && "marquee--pausable",
        className,
      )}
      style={style}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex w-max shrink-0 items-stretch gap-[var(--gap)] pr-[var(--gap)]",
            "animate-marquee",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

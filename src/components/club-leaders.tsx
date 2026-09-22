"use client";

import { Lato } from "next/font/google";
import { UserStar } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { TextReveal } from "@/components/motion/text-reveal";

import { Marquee } from "@/components/ui/marquee";
import type { Leader } from "@/lib/types";

const lato = Lato({ weight: "400", subsets: ["latin"], display: "swap" });

export function ClubLeaders({ leaders }: { leaders: Leader[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleTrackScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  return (
    <section className="relative w-full overflow-hidden pb-12 md:pb-16">
      {/* decorative curve, bottom-right — ECLIPSE ink at low opacity */}
      <div aria-hidden="true" className="pointer-events-none">
        <svg
          className="absolute right-0 bottom-0 text-[var(--ink)] opacity-10"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#club-leaders-clip)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="club-leaders-clip">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-12 flex max-w-5xl flex-col items-center px-6 text-center lg:px-0">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--ink)] text-white">
            <UserStar size={24} aria-hidden="true" />
          </div>

          <p className="eyebrow">The people behind the circle</p>
          <TextReveal
            as="h2"
            delay={0.06}
            lineClassName="relative mt-3 font-medium text-4xl tracking-tight text-[var(--ink)] sm:text-5xl"
            lines={[
              <>
                Club leaders.
                <svg
                  aria-hidden="true"
                  className="absolute -top-2 -right-4 -z-10 w-16 text-[var(--ink)] opacity-10 sm:-right-8 sm:w-24"
                  fill="currentColor"
                  height="86"
                  viewBox="0 0 108 86"
                  width="108"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="28"
                  />
                </svg>
              </>,
            ]}
          />
          <p className="mt-4 max-w-2xl text-[var(--ink-soft)]">
            Meet the students shaping ECLIPSE&rsquo;s next chapter.
          </p>
        </div>

        {leaders.length ? (
          <>
            {/* Mobile: swipeable snap carousel (native touch swipe) */}
            <div className="relative w-full sm:hidden">
              <div
                ref={trackRef}
                data-lenis-prevent
                onScroll={handleTrackScroll}
                className="no-scrollbar flex snap-x snap-mandatory gap-3.5 overflow-x-auto overscroll-x-contain px-6 pt-1 pb-2 [touch-action:pan-x_pan-y] [-webkit-overflow-scrolling:touch]"
              >
                {leaders.map((leader) => (
                  <LeaderCard key={leader.id} leader={leader} snap />
                ))}
              </div>
              {/* swipe hint + progress */}
              <div className="mt-4 flex items-center gap-3 px-6">
                <p
                  aria-hidden="true"
                  className="font-mono text-[10px] tracking-[0.11em] text-[var(--ink-soft)] uppercase"
                >
                  Swipe
                </p>
                <div
                  className="h-[2px] flex-1 overflow-hidden rounded-full bg-[var(--line)]"
                  role="progressbar"
                  aria-label="Leaders carousel progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress * 100)}
                >
                  <div
                    className="h-full rounded-full bg-[var(--ink)] transition-[width] duration-150"
                    style={{ width: `${Math.max(8, progress * 100)}%` }}
                  />
                </div>
                <p className="font-mono text-[10px] tracking-[0.11em] text-[var(--ink-soft)] tabular-nums">
                  {leaders.length}
                </p>
              </div>
            </div>

            {/* Desktop / tablet: auto-scrolling marquee */}
            <div className="relative hidden w-full sm:block">
              <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-8 bg-gradient-to-r from-[var(--paper)] to-transparent sm:w-32" />
              <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-8 bg-gradient-to-l from-[var(--paper)] to-transparent sm:w-32" />

              <Marquee className="[--gap:0.875rem] sm:[--gap:1.5rem]" pauseOnHover>
                {leaders.map((leader) => (
                  <LeaderCard key={leader.id} leader={leader} />
                ))}
              </Marquee>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-0">
            <p className="eyebrow">Team in preparation</p>
            <h3 className="mt-3 text-2xl tracking-tight text-[var(--ink)]">
              New ECLIPSE leaders will appear here.
            </h3>
            <p className="mt-3 text-[var(--ink-soft)]">
              The lineup will be published as the club confirms each role.
            </p>
          </div>
        )}

        {leaders[0] && (
          <div className="mx-auto mt-16 max-w-3xl px-6 text-center lg:px-0">
            <p className="eyebrow mb-5">Kind words</p>
            <p className="mb-8 text-lg leading-relaxed font-medium text-[var(--ink)] md:text-xl">
              &ldquo;Together, we build a community where passion, teamwork, and
              leadership come first.&rdquo;
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-full border border-[var(--line)] bg-[var(--ink)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={leaders[0].name}
                  loading="lazy"
                  src={leaders[0].photoUrl}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-bold tracking-tight text-[var(--ink)]">
                  {leaders[0].name}
                </p>
                <p className="font-mono text-[10px] tracking-[0.11em] text-[var(--ink-soft)] uppercase">
                  {leaders[0].position}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function LeaderCard({ leader, snap = false }: { leader: Leader; snap?: boolean }) {
  return (
    <div
      className={`group relative h-[360px] shrink-0 overflow-hidden rounded-xl bg-[var(--ink)] shadow-xl select-none [-webkit-tap-highlight-color:transparent] sm:h-[400px] sm:w-[300px] ${snap ? "w-[72vw] max-w-[280px] snap-center" : "w-[clamp(210px,68vw,250px)]"}`}
    >
      {/* Plain <img>: leader portraits come from the admin panel
          (any host), not covered by images.remotePatterns. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={leader.name}
        loading="lazy"
        draggable={false}
        src={leader.photoUrl}
        className="absolute inset-0 h-full w-full object-cover saturate-100 transition-all duration-[800ms] ease-[cubic-bezier(.15,.45,.15,1.2)] [@media(hover:hover)]:saturate-[.2] [@media(hover:hover)]:group-hover:scale-[1.07] [@media(hover:hover)]:group-hover:saturate-100"
      />
      {/* info card — always visible on touch devices, hover/focus
          reveal only where a hover capability exists */}
      <div
        className={`absolute right-3 bottom-4 left-3 z-10 flex translate-y-0 scale-100 items-center justify-between gap-3 rounded-lg bg-white p-3 opacity-100 shadow-xl transition-all duration-[800ms] ease-[cubic-bezier(.15,.45,.15,1.2)] group-focus-within:bottom-[25px] group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 [@media(hover:hover)]:bottom-[15px] [@media(hover:hover)]:translate-y-[50px] [@media(hover:hover)]:scale-50 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:bottom-[25px] [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:scale-100 [@media(hover:hover)]:group-hover:opacity-100 ${lato.className}`}
      >
        <div className="min-w-0">
          <p className="truncate text-[17px] leading-tight text-neutral-900 sm:text-[20px]">
            {leader.name}
          </p>
          <p className="mt-1 truncate text-[13.5px] text-[#585858] sm:text-[15px]">
            {leader.position}
          </p>
        </div>
        {leader.linkedinUrl && (
          <a
            href={leader.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${leader.name} on LinkedIn`}
            className="group/link grid h-11 w-11 flex-shrink-0 place-items-center rounded-full text-neutral-900 [-webkit-tap-highlight-color:transparent] transition-transform duration-200 [@media(hover:hover)]:hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
          >
            <LinkedInIcon />
          </a>
        )}
      </div>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M 20.727 0 L 3.273 0 C 1.465 0 0 1.465 0 3.273 L 0 20.727 C 0 22.535 1.465 24 3.273 24 L 20.727 24 C 22.535 24 24 22.535 24 20.727 L 24 3.273 C 24 1.465 22.535 0 20.727 0 Z"
        className="fill-[#0077B5]"
      />
      <path
        d="M 8.646 6.545 C 8.646 6.95 8.526 7.345 8.301 7.682 C 8.076 8.018 7.757 8.28 7.383 8.435 C 7.009 8.59 6.598 8.631 6.201 8.552 C 5.804 8.473 5.44 8.278 5.154 7.992 C 4.868 7.706 4.673 7.341 4.594 6.944 C 4.515 6.548 4.556 6.136 4.71 5.763 C 4.865 5.389 5.127 5.069 5.464 4.845 C 5.8 4.62 6.196 4.5 6.6 4.5 C 7.143 4.5 7.663 4.715 8.046 5.099 C 8.43 5.483 8.646 6.003 8.646 6.545 Z M 8.182 9.955 L 8.182 18.991 C 8.182 19.058 8.17 19.124 8.144 19.186 C 8.119 19.247 8.082 19.304 8.035 19.351 C 7.988 19.398 7.932 19.436 7.87 19.461 C 7.809 19.487 7.743 19.5 7.676 19.5 L 5.52 19.5 C 5.453 19.5 5.387 19.487 5.326 19.462 C 5.264 19.436 5.208 19.399 5.161 19.352 C 5.114 19.305 5.077 19.249 5.051 19.187 C 5.026 19.125 5.013 19.059 5.013 18.993 L 5.013 9.955 C 5.013 9.82 5.066 9.691 5.161 9.596 C 5.257 9.501 5.386 9.447 5.52 9.447 L 7.676 9.447 C 7.81 9.448 7.939 9.501 8.034 9.596 C 8.129 9.691 8.182 9.82 8.182 9.955 Z M 19.451 14.659 L 19.451 19.034 C 19.451 19.095 19.439 19.156 19.416 19.212 C 19.392 19.269 19.358 19.32 19.315 19.364 C 19.271 19.407 19.22 19.441 19.163 19.465 C 19.107 19.488 19.046 19.5 18.985 19.5 L 16.666 19.5 C 16.605 19.5 16.544 19.488 16.488 19.465 C 16.431 19.441 16.38 19.407 16.336 19.364 C 16.293 19.32 16.259 19.269 16.235 19.212 C 16.212 19.156 16.2 19.095 16.2 19.034 L 16.2 14.794 C 16.2 14.161 16.386 12.023 14.546 12.023 C 13.121 12.023 12.831 13.486 12.773 14.144 L 12.773 19.034 C 12.773 19.156 12.725 19.274 12.639 19.361 C 12.553 19.448 12.436 19.498 12.314 19.5 L 10.075 19.5 C 10.013 19.5 9.953 19.488 9.896 19.464 C 9.84 19.441 9.789 19.407 9.745 19.363 C 9.702 19.32 9.668 19.269 9.645 19.212 C 9.621 19.155 9.61 19.095 9.61 19.034 L 9.61 9.915 C 9.61 9.854 9.621 9.793 9.645 9.737 C 9.668 9.68 9.702 9.629 9.745 9.585 C 9.789 9.542 9.84 9.508 9.896 9.484 C 9.953 9.461 10.013 9.449 10.075 9.449 L 12.314 9.449 C 12.437 9.449 12.556 9.498 12.643 9.585 C 12.731 9.673 12.78 9.791 12.78 9.915 L 12.78 10.703 C 13.309 9.91 14.093 9.297 15.766 9.297 C 19.473 9.297 19.451 12.758 19.451 14.659 Z"
        className="fill-white"
      />
    </svg>
  );
}

export default ClubLeaders;

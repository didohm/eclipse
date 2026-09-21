"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DURATION, EASE, STAGGER, VIEWPORT } from "@/lib/motion";
import { formatDate } from "@/lib/utils";
import type { ClubEvent } from "@/lib/types";
import { EmptyMedia } from "@/components/empty-media";

const MONTHS = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function EventCard({ event, index = 0 }: { event: ClubEvent; index?: number }) {
  const reduced = useReducedMotion();
  const image = event.primaryImage || event.images[0];
  const parts = event.date.split("-");
  const day = parts[2]?.replace(/^0/, "") ?? "";
  const month = MONTHS[Number(parts[1])] ?? "";
  const year = parts[0] ?? "";
  const hasDate = Boolean(day && month && year);

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={reduced ? undefined : { duration: DURATION.slow, delay: index * STAGGER.base, ease: EASE.out }}
    >
      <Link
        href={`/events/${event.slug}`}
        aria-label={`Read about ${event.title}`}
        className="group block"
      >
        <div className="relative h-[240px] overflow-hidden rounded-[18px] bg-[var(--ink)] shadow-[0_12px_32px_rgba(8,43,64,0.10)] sm:h-[300px] sm:rounded-[22px]">
          {image ? (
            <Image
              src={image}
              alt={event.title}
              fill
              sizes="(max-width: 700px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <EmptyMedia label="Event imagery" />
          )}
          <span className="absolute top-3 right-3 rounded-full border border-white/40 bg-white/85 px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] text-[var(--ink)] uppercase backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute right-3 bottom-3 grid h-10 w-10 place-items-center rounded-full bg-white text-[var(--ink)] shadow-lg transition-colors duration-300 group-hover:bg-[var(--coral)] group-hover:text-white">
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>

        <div className="flex gap-4 pt-5 sm:gap-5 sm:pt-6">
          {hasDate ? (
            <div className="flex shrink-0 flex-col items-center">
              <span
                style={{ fontFamily: "var(--serif)", fontStyle: "italic" }}
                className="text-[46px] leading-[0.9] tracking-[-0.04em] text-[var(--ink)] sm:text-[60px]"
              >
                {day}
              </span>
              <span className="mt-2 font-mono text-[11px] tracking-[0.1em] whitespace-nowrap text-[var(--coral)] uppercase">
                {month} {year}
              </span>
            </div>
          ) : (
            <span className="h-fit shrink-0 rounded-full border border-[var(--line)] bg-[var(--white)] px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] whitespace-nowrap text-[var(--ink)] uppercase">
              {formatDate(event.date)}
            </span>
          )}
          <div className="min-w-0 border-l border-[var(--line)] pl-4">
            <p className="font-mono text-[10px] tracking-[0.11em] text-[var(--ink-soft)] uppercase">
              {event.location || "ESGEN"}
            </p>
            <h3 className="mt-2 text-[21px] leading-tight tracking-tight text-[var(--ink)] sm:text-[26px]">
              {event.title}
            </h3>
            {event.shortDescription && (
              <p className="mt-2.5 line-clamp-2 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                {event.shortDescription}
              </p>
            )}
            <span className="text-link mt-3">
              Read story <ArrowRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

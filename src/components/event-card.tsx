"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { ClubEvent } from "@/lib/types";
import { EmptyMedia } from "@/components/empty-media";

export function EventCard({ event, index = 0 }: { event: ClubEvent; index?: number }) {
  const reduced = useReducedMotion();
  const image = event.primaryImage || event.images[0];
  return (
    <motion.article
      className="event-card"
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.68, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/events/${event.slug}`} className="event-card__visual" aria-label={`Read about ${event.title}`}>
        {image ? <Image src={image} alt={event.title} fill sizes="(max-width: 700px) 100vw, 33vw" /> : <EmptyMedia label="Event imagery" />}
        <span className="event-card__date">{formatDate(event.date)}</span>
        <span className="event-card__arrow"><ArrowUpRight size={22} /></span>
      </Link>
      <div className="event-card__body">
        <p className="event-card__kicker">{event.location || "ESGEN"}</p>
        <h3><Link href={`/events/${event.slug}`}>{event.title}</Link></h3>
        {event.shortDescription && <p>{event.shortDescription}</p>}
      </div>
    </motion.article>
  );
}

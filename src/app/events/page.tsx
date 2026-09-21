import { Suspense } from "react";
import dynamic from "next/dynamic";
import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";
import { EventCard } from "@/components/event-card";
import { Reveal } from "@/components/reveal";
import { getEvents } from "@/lib/content";
import { site } from "@/lib/site";

// The story viewer pulls in Framer Motion; keep it out of the initial bundle.
const EventStories = dynamic(() =>
  import("@/components/event-stories").then((mod) => mod.EventStories),
);
export const metadata: Metadata = {
  title: "Events — Workshops, Research & Gatherings",
  description:
    "Browse ECLIPSE events at ESGEN, Kolea: student workshops, research sprints, discoveries and community gatherings. Find the next spark.",
  alternates: { canonical: `${site.url}/events` },
  openGraph: {
    type: "website",
    url: `${site.url}/events`,
    title: "ECLIPSE Events — Workshops, Research & Gatherings",
    description:
      "Workshops, discoveries, conversations and things built together at ESGEN, Kolea University Hub.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ECLIPSE Events — Workshops, Research & Gatherings",
    description:
      "Workshops, discoveries, conversations and things built together at ESGEN, Kolea University Hub.",
  },
};
export default async function EventsPage() {
  const events = await getEvents();
  return <main className="inner-page events-page"><section className="page-intro page-shell events-intro"><Reveal><p className="eyebrow">02 — ECLIPSE calendar</p><h1>Find the next<br /><em>spark.</em></h1><p>Workshops, discoveries, conversations, and the things we are building together.</p></Reveal></section>{events.length > 0 && <section className="page-shell"><Suspense fallback={null}><EventStories events={events} /></Suspense></section>}<section className="events-page section page-shell">{events.length ? <div className="event-grid event-grid--all">{events.map((event, index) => <EventCard key={event.id} event={event} index={index} />)}</div> : <Reveal><div className="content-empty content-empty--large"><CalendarDays size={27} /><p className="eyebrow">The calendar is being prepared</p><h2>The first ECLIPSE events will be announced here.</h2></div></Reveal>}</section></main>;
}

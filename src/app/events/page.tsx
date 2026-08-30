import { CalendarDays } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { Reveal } from "@/components/reveal";
import { getEvents } from "@/lib/content";
export const metadata = { title: "Events", description: "ECLIPSE events, workshops, and gatherings." };
export default async function EventsPage() {
  const events = await getEvents();
  return <main className="inner-page"><section className="page-intro page-shell"><Reveal><p className="eyebrow">02 — ECLIPSE calendar</p><h1>Find the next<br /><em>spark.</em></h1><p>Workshops, discoveries, conversations, and the things we are building together.</p></Reveal></section><section className="events-page section page-shell">{events.length ? <div className="event-grid event-grid--all">{events.map((event, index) => <EventCard key={event.id} event={event} index={index} />)}</div> : <Reveal><div className="content-empty content-empty--large"><CalendarDays size={27} /><p className="eyebrow">The calendar is being prepared</p><h2>The first ECLIPSE events will be announced here.</h2></div></Reveal>}</section></main>;
}

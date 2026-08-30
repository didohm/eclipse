import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventGallery } from "@/components/event-gallery";
import { Reveal } from "@/components/reveal";
import { getEventBySlug, getEvents } from "@/lib/content";
import { formatDate } from "@/lib/utils";
export async function generateStaticParams() { return (await getEvents()).map((event) => ({ slug: event.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const event = await getEventBySlug((await params).slug); return { title: event?.title ?? "Event", description: event?.shortDescription ?? "ECLIPSE event" }; }
export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const event = await getEventBySlug((await params).slug); if (!event) notFound();
  const images = event.images.length ? event.images : event.primaryImage ? [event.primaryImage] : [];
  return <main className="event-page"><section className="event-intro page-shell"><Link href="/events" className="back-link"><ArrowLeft size={17} /> All events</Link><Reveal><p className="eyebrow">ECLIPSE event</p><h1>{event.title}</h1><p className="event-intro__description">{event.shortDescription}</p><div className="event-intro__meta"><span><CalendarDays size={17} />{formatDate(event.date)}</span>{event.location && <span><MapPin size={17} />{event.location}</span>}</div></Reveal></section><div className="page-shell"><EventGallery title={event.title} images={images} /></div><section className="event-story page-shell"><Reveal><p className="eyebrow">The full story</p><div className="event-story__copy">{event.fullDescription.split("\n").filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></Reveal></section></main>;
}

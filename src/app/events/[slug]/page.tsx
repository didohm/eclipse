import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { getEventBySlug, getEvents } from "@/lib/content";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

// Gallery brings Framer Motion's AnimatePresence; keep it out of the initial
// bundle of an event page until the gallery is about to render.
const EventGallery = dynamic(() =>
  import("@/components/event-gallery").then((mod) => mod.EventGallery),
);
export async function generateStaticParams() { return (await getEvents()).map((event) => ({ slug: event.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const event = await getEventBySlug((await params).slug);
  if (!event) return { title: "Event not found" };
  const url = `${site.url}/events/${event.slug}`;
  const description = (event.shortDescription || event.fullDescription || "ECLIPSE event at ESGEN, Kolea.").slice(0, 160);
  const image = event.primaryImage || event.images[0];
  return {
    title: `${event.title} — ECLIPSE Event`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "ECLIPSE · ESGEN",
      title: event.title,
      description,
      publishedTime: event.date || undefined,
      images: image
        ? [{ url: image, alt: event.title }]
        : [{ url: "/opengraph-image", width: 1200, height: 630, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description,
      images: image ? [image] : ["/twitter-image"],
    },
  };
}
export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const event = await getEventBySlug((await params).slug); if (!event) notFound();
  const images = event.images.length ? event.images : event.primaryImage ? [event.primaryImage] : [];
  const url = `${site.url}/events/${event.slug}`;
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.shortDescription || event.fullDescription,
    url,
    startDate: event.date || undefined,
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location || "ESGEN, Kolea University Hub",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolea",
        addressRegion: "Tipaza",
        addressCountry: "DZ",
      },
    },
    image: images.length ? images : [`${site.url}/opengraph-image`],
    organizer: {
      "@type": "Organization",
      name: "ECLIPSE",
      url: site.url,
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Events", item: `${site.url}/events` },
      { "@type": "ListItem", position: 3, name: event.title, item: url },
    ],
  };
  return <main className="event-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd).replace(/</g, "\\u003c") }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} /><section className="event-intro page-shell"><Link href="/events" className="back-link"><ArrowLeft size={17} /> All events</Link><Reveal><p className="eyebrow">ECLIPSE event</p><h1>{event.title}</h1><p className="event-intro__description">{event.shortDescription}</p><div className="event-intro__meta"><span><CalendarDays size={17} />{formatDate(event.date)}</span>{event.location && <span><MapPin size={17} />{event.location}</span>}</div></Reveal></section><div className="page-shell"><EventGallery title={event.title} images={images} /></div><section className="event-story page-shell"><Reveal><div className="event-story__grid"><div className="event-story__head"><p className="eyebrow">The full story</p><h2>What <em>happened.</em></h2><Link href="/events" className="text-link"><ArrowLeft size={15} /> All events</Link></div><div className="event-story__copy">{event.fullDescription.split("\n").filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></Reveal></section></main>;
}

import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ClubLeaders } from "@/components/club-leaders";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { EventCard } from "@/components/event-card";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { JoinSection } from "@/components/join-section";
import { SectionHeading } from "@/components/section-heading";
import { getEvents, getLeaders } from "@/lib/content";
import { faqItems } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Eclipse Club - ESGEN",
  },
  description:
    "Join ECLIPSE, ESGEN's scientific & digital student club in Kolea, Algeria. Workshops, research sprints, events and a curious student community — open to all five ESGEN disciplines.",
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    title: "Eclipse Club - ESGEN",
    description:
      "Workshops, research sprints, events and community for curious students at ESGEN, Kolea University Hub.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eclipse Club - ESGEN",
    description:
      "Workshops, research sprints, events and community for curious students at ESGEN, Kolea University Hub.",
  },
};

// ~90 kB of Framer Motion + story viewer logic, only needed once a visitor
// actually opens a story. Loads on idle so it never blocks first paint.
const EventStories = dynamic(() =>
  import("@/components/event-stories").then((mod) => mod.EventStories),
);

export default async function Home() {
  const [events, leaders] = await Promise.all([getEvents(), getLeaders()]);
  const latestEvents = events.slice(0, 3);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  return <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
    />
    <Hero />
    <main>
      <section className="members-section page-shell">
        <Reveal className="members-section__visual">
          <Parallax distance={44} className="members-section__photo">
            <Image
              src="https://res.cloudinary.com/drzwqhmsd/image/upload/v1789570257/plbwxm6u9azdpcpiz8cn.jpg"
              alt="ECLIPSE members photography"
              fill
              priority
              sizes="100vw"
            />
          </Parallax>
          <div className="members-section__number"><strong>20+</strong><span>Active<br />Members</span></div>
          <p className="members-section__caption">Growing one question, workshop and conversation at a time.</p>
        </Reveal>
      </section>
      <section className="section section--events page-shell">
        <SectionHeading eyebrow="What’s in motion" title="Latest events." copy="The latest three moments from the ECLIPSE calendar." action={<Link href="/events" className="text-link">View all events <ArrowRight size={16} /></Link>} />
        {latestEvents.length ? (
          <>
            <div className="mb-10">
              <Suspense fallback={null}>
                <EventStories events={latestEvents} />
              </Suspense>
            </div>
            <Stagger className="event-grid">{latestEvents.map((event, index) => <StaggerItem key={event.id}><EventCard event={event} index={index} /></StaggerItem>)}</Stagger>
          </>
        ) : (
          <Reveal><div className="content-empty"><p className="eyebrow">Calendar in preparation</p><h3>New ECLIPSE events will appear here.</h3><p>The programme will be published as the club confirms each date.</p></div></Reveal>
        )}
      </section>
      <section className="leaders-section">
        <Reveal><ClubLeaders leaders={leaders} /></Reveal>
      </section>
      <section id="faqs" className="section faq-section page-shell scroll-mt-24"><SectionHeading eyebrow="Good to know" title={<>Questions, <em>answered.</em></>} /><Reveal><Faq /></Reveal></section>
      <JoinSection />
    </main>
  </>;
}

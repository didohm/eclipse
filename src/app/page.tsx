import { ArrowRight, FlaskConical, Lightbulb, Microscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EmptyMedia } from "@/components/empty-media";
import { EventCard } from "@/components/event-card";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getEvents, getLeaders } from "@/lib/content";

export default async function Home() {
  const [events, leaders] = await Promise.all([getEvents(), getLeaders()]);
  const latestEvents = events.slice(0, 3);
  return <>
    <Hero />
    <main>
      <section className="members-section page-shell">
        <Reveal className="members-section__visual">
          <EmptyMedia label="ECLIPSE members photography" />
          <div className="members-section__number"><strong>20+</strong><span>Active<br />Members</span></div>
          <p className="members-section__caption">Our circle is growing — one question, workshop and conversation at a time.</p>
        </Reveal>
      </section>
      <section className="section section--events page-shell">
        <SectionHeading eyebrow="What’s in motion" title="Latest events." copy="The latest three moments from the ECLIPSE calendar, always arranged by date." action={<Link href="/events" className="text-link">View all events <ArrowRight size={16} /></Link>} />
        {latestEvents.length ? <div className="event-grid">{latestEvents.map((event, index) => <EventCard key={event.id} event={event} index={index} />)}</div> : <Reveal><div className="content-empty"><p className="eyebrow">Calendar in preparation</p><h3>New ECLIPSE events will appear here.</h3><p>The programme will be published as the club confirms each date.</p></div></Reveal>}
      </section>
      <section className="section leaders-section page-shell">
        <SectionHeading eyebrow="The people behind the circle" title="Club leaders." copy="Meet the students shaping ECLIPSE’s next chapter." />
        {leaders.length ? <div className="leaders-grid">{leaders.map((leader, index) => <Reveal key={leader.id} delay={index * 0.08}><article className="leader-card"><div className="leader-card__image">{leader.photoUrl ? <Image src={leader.photoUrl} alt={leader.name} fill sizes="(max-width: 700px) 100vw, 33vw" /> : <EmptyMedia label={`${leader.name} portrait`} />}</div><p className="eyebrow">{leader.position}</p><h3>{leader.name}</h3>{leader.bio && <p>{leader.bio}</p>}{leader.linkedinUrl && <a className="text-link" href={leader.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>}</article></Reveal>)}</div> : <Reveal><div className="content-empty content-empty--thin"><p className="eyebrow">Leadership</p><h3>The club leadership will be introduced here.</h3></div></Reveal>}
      </section>
      <section className="manifesto">
        <div className="manifesto__field" aria-hidden="true"><span /><span /><span /></div>
        <div className="page-shell manifesto__content">
          <Reveal><p className="eyebrow">The ECLIPSE approach</p></Reveal>
          <Reveal delay={0.08}><h2>Curiosity has more force when it moves <em>together.</em></h2></Reveal>
          <Reveal delay={0.14}><div className="manifesto__principles">
            <div><Microscope size={25} /><h3>Explore</h3><p>Make room for inquiry and scientific discovery.</p></div>
            <div><FlaskConical size={25} /><h3>Experiment</h3><p>Turn research and ideas into shared practice.</p></div>
            <div><Lightbulb size={25} /><h3>Exchange</h3><p>Build a community around questions worth pursuing.</p></div>
          </div></Reveal>
        </div>
      </section>
      <section className="section faq-section page-shell"><SectionHeading eyebrow="Good to know" title="Questions, answered." /><Reveal><Faq /></Reveal></section>
      <section className="join-section page-shell"><Reveal className="join-section__inner"><div><p className="eyebrow">Become part of it</p><h2>Bring your questions<br />into the <em>circle.</em></h2></div><Link href="/contact" className="join-section__link" aria-label="Contact ECLIPSE"><span>Join us</span><ArrowRight size={34} /></Link></Reveal></section>
    </main>
  </>;
}

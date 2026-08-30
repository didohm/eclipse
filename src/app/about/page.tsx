import { ArrowRight, ArrowUpRight, Check, FlaskConical, Lightbulb, Microscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const specialties = ["Audit and Management Control", "Digital Management", "E-Business", "IS Governance", "Digital Finance and Banking Management"];
export const metadata = { title: "About", description: "Learn about ECLIPSE, ESGEN’s scientific and digital student club." };

const approach = [
  { index: "01", title: "Explore", desc: "Make room for inquiry and scientific discovery — from first questions to field notes.", Icon: Microscope },
  { index: "02", title: "Experiment", desc: "Turn research and ideas into shared practice through workshops and sprints.", Icon: FlaskConical },
  { index: "03", title: "Exchange", desc: "Build a community around questions worth pursuing, and carry them further together.", Icon: Lightbulb },
] as const;

export default function AboutPage() {
  return <main className="inner-page">
    <section className="page-intro page-shell"><Reveal><p className="eyebrow">01 — About ECLIPSE</p><h1>Built for the<br /><em>curious.</em></h1><p>ECLIPSE is a scientific and active student club at ESGEN, focused on discovery, research, workshops, events, and the digital economy.</p></Reveal></section>
    <section className="about-split about-split--with-approach page-shell">
      <Reveal className="about-split__copy">
        <p className="eyebrow">Who we are</p>
        <h2>A student circle made for inquiry in motion.</h2>
        <p>Founded in 2025 and based at ESGEN, ECLIPSE creates room for students to explore ideas, share knowledge, and take scientific initiative together.</p>
        <p className="about-split__lead">We follow a single, repeatable rhythm — <em>Explore · Experiment · Exchange</em> — so every question has a next step and every step has a community around it.</p>
        <Link className="text-link" href="/contact">Connect with the club <ArrowRight size={16} /></Link>
      </Reveal>
      <Reveal delay={0.1} className="about-approach">
        <div className="about-approach__header">
          <p className="eyebrow"><span aria-hidden="true" /> The ECLIPSE approach</p>
          <p>Three verbs that shape every workshop, research sprint, and conversation.</p>
        </div>
        <ol className="about-approach__list">
          {approach.map(({ index, title, desc, Icon }) => (
            <li key={index} className="about-approach__item">
              <div className="about-approach__meta">
                <span className="about-approach__index">{index}</span>
                <span className="about-approach__icon" aria-hidden="true"><Icon size={18} strokeWidth={1.8} /></span>
              </div>
              <div className="about-approach__body">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="about-approach__footnote"><span aria-hidden="true">—</span> Explore opens the question · Experiment tests it together · Exchange carries it further.</p>
      </Reveal>
    </section>
    <section className="esgen-section"><div className="page-shell esgen-section__grid"><Reveal><div className="esgen-section__media"><Image src="https://res.cloudinary.com/drzwqhmsd/image/upload/v1788107556/srnkkq2mnu7ygaw48zsf.webp" alt="ESGEN campus photography" fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: "cover" }} priority /></div></Reveal><Reveal delay={0.1}><p className="eyebrow">Our home</p><h2>Higher School of Management &amp; Digital Economy.</h2><p className="large-copy">“The Higher School of Management &amp; Digital Economy (ESGEN), located in the Kolea University Hub, is the leading Algerian institution shaping the future of digital management, finance, and information governance.”</p><a href="https://www.esgen.edu.dz/" target="_blank" rel="noreferrer" className="button button--navy" style={{ marginTop: "28px" }}>Visit ESGEN website <ArrowUpRight size={16} /></a></Reveal></div></section>
    <section className="section page-shell"><SectionHeading eyebrow="ESGEN specialties" title="Where disciplines meet." /><div className="specialties-list">{specialties.map((specialty, index) => <Reveal key={specialty} delay={index * 0.06}><div><span>{String(index + 1).padStart(2, "0")}</span><h3>{specialty}</h3><Check size={20} /></div></Reveal>)}</div></section>
    <section className="timeline-section page-shell"><SectionHeading eyebrow="Our trajectory" title="A short history of forward motion." /><div className="timeline"><Reveal><article><span className="timeline__year">2025</span><div><p className="eyebrow">Phase 01 — The Genesis</p><p>ECLIPSE was founded by a small group of students at HSMDE seeking to bridge digital economy.</p></div></article></Reveal><Reveal delay={0.12}><article><span className="timeline__year timeline__year--future">2026</span><div><p className="eyebrow">Phase 02 — The Future</p><p>Official launch of all scientific and research activities, including workshops and inter-university events.</p></div></article></Reveal></div></section>
  </main>;
}

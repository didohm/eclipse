import { ArrowRight, ArrowUpRight, FlaskConical, Lightbulb, Microscope } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { clubSocialLinks, site } from "@/lib/site";

const specialties = [
  "Audit and Management Control",
  "Digital Management",
  "E-Business",
  "IS Governance",
  "Digital Finance and Banking Management",
];

export const metadata: Metadata = {
  title: "About ECLIPSE — Scientific & Digital Club at ESGEN",
  description:
    "Learn about ECLIPSE, the scientific & digital student club at ESGEN, Kolea (est. 2025). Our Explore · Experiment · Exchange approach, history, ESGEN home and how to follow the circle.",
  alternates: { canonical: `${site.url}/about` },
  openGraph: {
    type: "website",
    url: `${site.url}/about`,
    title: "About ECLIPSE — Scientific & Digital Club at ESGEN",
    description:
      "A circle for inquiry in motion: discovery, research, workshops and community at ESGEN, Kolea University Hub.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About ECLIPSE — Scientific & Digital Club at ESGEN",
    description:
      "A circle for inquiry in motion: discovery, research, workshops and community at ESGEN, Kolea University Hub.",
  },
};

const approach = [
  {
    index: "01",
    title: "Explore",
    desc: "Start with inquiry and scientific discovery — from first questions to field notes.",
    Icon: Microscope,
  },
  {
    index: "02",
    title: "Experiment",
    desc: "Turn research and ideas into shared practice through workshops and sprints.",
    Icon: FlaskConical,
  },
  { index: "03", title: "Exchange", desc: "Build a community around questions worth pursuing, and carry them further together.", Icon: Lightbulb },
] as const;

const timeline = [
  {
    year: "2025",
    phase: "Phase 01 — The Genesis",
    status: "Founded",
    title: "A circle forms at ESGEN",
    desc: "ECLIPSE was founded by a small group of students at ESGEN seeking to bridge the digital economy with scientific curiosity — a place where questions find structure.",
    meta: "Kolea University Hub · Founding cohort",
    accent: "coral" as const,
  },
  {
    year: "2025 → 26",
    phase: "Phase 02 — The Formation",
    status: "In motion",
    title: "From idea to collective",
    desc: "First workshops and research sprints shaped our rhythm and opened the circle to every discipline at ESGEN.",
    meta: "First workshops · Research sprints",
    accent: "teal" as const,
  },
  {
    year: "2026",
    phase: "Phase 03 — The Launch",
    status: "Now",
    title: "Official launch & open horizon",
    desc: "Full activation of scientific and research activities: inter-university events, editorial notebooks, and collaborative projects that carry student inquiry beyond the campus.",
    meta: "Workshops · Research · Events · Editorial",
    accent: "gold" as const,
  },
] as const;

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V8.93a6.27 6.27 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.2 8.2 0 0 0 4.76 1.52V6.84a4.83 4.83 0 0 1-1-.15Z" />
    </svg>
  );
}
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialIconMap: Record<string, React.ReactNode> = {
  LinkedIn: <LinkedInIcon className="h-[18px] w-[18px]" aria-hidden="true" />,
  Instagram: <InstagramIcon className="h-[18px] w-[18px]" aria-hidden="true" />,
  TikTok: <TikTokIcon className="h-[18px] w-[18px]" aria-hidden="true" />,
};

const socialHandles: Record<string, string> = {
  LinkedIn: "eclipse-esgen",
  Instagram: "@eclipse.esgen",
  TikTok: "@eclipse.club4",
};

export default function AboutPage() {
  return (
    <main className="inner-page about-page">
      {/* ─── Hero Intro ─── */}
      <section className="page-intro about-hero page-shell">
        <div className="about-hero__grid" aria-hidden="true" />
        <div className="about-hero__orb about-hero__orb--teal" aria-hidden="true" />
        <div className="about-hero__orb about-hero__orb--gold" aria-hidden="true" />
        <div className="about-hero__inner">
          <Reveal>
            <p className="eyebrow about-hero__eyebrow">
              <span aria-hidden="true" /> 01 — About ECLIPSE · ESGEN · Kolea — Est. 2025
            </p>
            <h1>
              <span className="about-hero__line-wrap">
                <span className="about-hero__line">Built for the</span>
              </span>
              <span className="about-hero__line-wrap">
                <span className="about-hero__line about-hero__line--accent">
                  <em>curious.</em>
                </span>
              </span>
            </h1>
            <p className="about-hero__copy">
              ECLIPSE is a scientific and active student club at ESGEN, focused on discovery, research, workshops, events, and the
              digital economy — where questions become practice.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="about-hero__media">
            <div className="about-hero__photo">
              <Image
                src="https://res.cloudinary.com/drzwqhmsd/image/upload/f_auto,q_auto/v1791989092/myrotfzho0burzrowmki.jpg"
                alt="ECLIPSE club members"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority
              />
              <span className="about-hero__photo-label" aria-hidden="true">
                ECLIPSE · In action
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="about-hero__meta">
          <div className="about-hero__meta-left">
            <p>
              Est. 2025 · 20+ members · Open to all five ESGEN disciplines
            </p>
          </div>
          <div className="about-hero__meta-right">
            <span className="about-hero__scroll">
              Scroll for the story <span aria-hidden="true">↓</span>
            </span>
          </div>
        </Reveal>
      </section>

      {/* ─── Who we are + Approach ─── */}
      <section className="about-split about-split--with-approach page-shell">
        <Reveal className="about-split__copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" /> Who we are
          </p>
          <h2>
            A circle for inquiry in <em>motion.</em>
          </h2>
          <p>
            Founded in 2025 and based at ESGEN, ECLIPSE creates room for students to explore ideas,
            share knowledge, and take scientific initiative together across the digital economy.
          </p>
          <p className="about-split__lead">
            We follow one rhythm — <em>Explore · Experiment · Exchange</em> — so every question finds its next step and its people.
          </p>
          <div className="about-split__actions">
            <Link className="button button--navy" href="/contact">
              Connect with the club <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="about-approach">
          <div className="about-approach__header">
            <p className="eyebrow">
              <span aria-hidden="true" /> The ECLIPSE approach
            </p>
          </div>
          <ol className="about-approach__list">
            {approach.map(({ index, title, desc, Icon }) => (
              <li key={index} className="about-approach__item">
                <div className="about-approach__meta">
                  <span className="about-approach__index">{index}</span>
                  <span className="about-approach__icon" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.85} />
                  </span>
                </div>
                <div className="about-approach__body">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* ─── Redesigned Timeline — the signature element ─── */}
      <section className="about-timeline-section page-shell">
        <SectionHeading
          eyebrow="Our trajectory"
          title="A history in forward motion."
          copy="From a founding question to a campus-wide research circle — three phases, one continuous line."
        />
        <div className="about-timeline">
          <div className="about-timeline__spine" aria-hidden="true">
            <span className="about-timeline__spine-line" />
            <span className="about-timeline__spine-progress" />
          </div>

          <ol className="about-timeline__list">
            {timeline.map((item, idx) => (
              <Reveal key={item.phase} delay={idx * 0.1}>
                <li className={`about-timeline__item about-timeline__item--${item.accent}`}>
                  <div className="about-timeline__rail" aria-hidden="true">
                    <span className="about-timeline__dot">
                      <span className="about-timeline__dot-inner" />
                    </span>
                  </div>

                  <div className="about-timeline__year-wrap">
                    <span className="about-timeline__year">{item.year}</span>
                    <span className="about-timeline__phase">{item.phase}</span>
                    <span className={`about-timeline__badge about-timeline__badge--${item.accent}`}>{item.status}</span>
                  </div>

                  <div className="about-timeline__card">
                    <h3>{item.title}</h3>
                    <p className="about-timeline__desc">{item.desc}</p>
                    <p className="about-timeline__meta">
                      <span aria-hidden="true">—</span> {item.meta}
                    </p>
                  </div>

                  <span className="about-timeline__index" aria-hidden="true">
                    0{idx + 1}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.35} className="about-timeline__footer">
            <p>
              <span className="about-timeline__footer-dash" aria-hidden="true">
                —
              </span>{" "}
              The line continues — next chapter written with each workshop and each new member.
              <Link href="/events" className="about-timeline__footer-link">
                Follow the calendar <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── ESGEN home + fields ─── */}
      <section className="esgen-section">
        <div className="page-shell esgen-section__grid">
          <Reveal>
            <div className="esgen-section__media">
              <Image
                src="https://res.cloudinary.com/drzwqhmsd/image/upload/v1788107556/srnkkq2mnu7ygaw48zsf.webp"
                alt="ESGEN campus photography"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority
              />
              <span className="esgen-section__media-label" aria-hidden="true">
                ESGEN · Kolea University Hub
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="esgen-section__copy">
            <p className="eyebrow">Our home</p>
            <div className="esgen-section__school-badge">
              <Image
                src="https://res.cloudinary.com/drzwqhmsd/image/upload/v1789309825/pzwzddkxrc5ypralecs0.png"
                alt="Higher School of Management & Digital Economy — official logo"
                width={64}
                height={64}
                className="esgen-section__school-logo"
              />
              <span className="esgen-section__school-name">
                Higher School of Management
                <br />
                &amp; Digital Economy · H.S.M.D.E
              </span>
            </div>
            <h2>
              Higher School of Management &amp; <em>Digital Economy.</em>
            </h2>
            <p className="large-copy">
              Based in the Kolea University Hub, ESGEN shapes the future of digital
              management, finance, and information governance.
            </p>
            <a href="https://www.esgen.edu.dz/" target="_blank" rel="noreferrer" className="button button--navy">
              Visit ESGEN website <ArrowUpRight size={16} />
            </a>
            <div className="esgen-fields">
              <p className="esgen-fields__label">Open to all five specialties</p>
              <ul>
                {specialties.map((specialty) => (
                  <li key={specialty}>{specialty}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Social Connect — clearly visible ─── */}
      <section className="about-social-section page-shell">
        <div className="about-social__header">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" /> Stay connected
            </p>
            <h2>
              Follow the <em>circle.</em>
            </h2>
            <p className="about-social__lede">
              Find ECLIPSE where the conversation is already happening — we reply within 48 hours.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="about-social__aside">
            <p>
              <span className="about-social__aside-label">Reach us directly</span>
              <a href="mailto:eclipse_club@esgen.edu.dz" className="about-social__email">
                eclipse_club@esgen.edu.dz <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <span className="about-social__aside-note">For membership, collaborations &amp; press</span>
            </p>
          </Reveal>
        </div>

        <div className="about-social__grid">
          {clubSocialLinks.map((link, idx) => (
            <Reveal key={link.label} delay={idx * 0.07}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="about-social__card"
                aria-label={`${link.label} — opens in new tab`}
              >
                <span className="about-social__card-icon" aria-hidden="true">
                  {socialIconMap[link.label] ?? <ArrowUpRight size={18} />}
                </span>
                <span className="about-social__card-body">
                  <span className="about-social__card-label">{link.label}</span>
                  <span className="about-social__card-handle">{socialHandles[link.label]}</span>
                </span>
                <span className="about-social__card-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
                <span className="about-social__card-hover" aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.28} className="about-social__footer">
          <span>ESGEN · Kolea — Est. 2025</span>
          <span aria-hidden="true" className="about-social__footer-dot">
            ·
          </span>
          <span>Workshops · Research · Community</span>
          <Link href="/contact" className="about-social__footer-link">
            Open contact <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

    </main>
  );
}

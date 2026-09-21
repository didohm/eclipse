import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { site, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact ECLIPSE — Join, Collaborate & Press",
  description:
    "Get in touch with ECLIPSE at ESGEN, Kolea University Hub. Questions, membership, collaborations or press — write below, we reply within 48 hours.",
  alternates: { canonical: `${site.url}/contact` },
  openGraph: {
    type: "website",
    url: `${site.url}/contact`,
    title: "Contact ECLIPSE — Join, Collaborate & Press",
    description:
      "Questions, ideas or collaborations — write to eclipse_club@esgen.edu.dz or use the contact form.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ECLIPSE — Join, Collaborate & Press",
    description:
      "Questions, ideas or collaborations — write to eclipse_club@esgen.edu.dz or use the contact form.",
  },
};

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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialIconMap: Record<string, React.ReactNode> = {
  LinkedIn: <LinkedInIcon width={17} height={17} />,
  Instagram: <InstagramIcon width={17} height={17} />,
  TikTok: <TikTokIcon width={17} height={17} />,
  Email: <Mail size={17} aria-hidden="true" />,
};

export default function ContactPage() {
  return (
    <main className="contact-page inner-page">
      <section className="contact-intro-simple page-shell">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1>
            Get in <em>touch.</em>
          </h1>
          <p className="contact-lede">Questions, ideas or collaborations — just write below and we&rsquo;ll reply.</p>
        </Reveal>
      </section>

      <section className="contact-body-simple page-shell">
        <Reveal className="contact-info">
          <p className="eyebrow">Direct</p>
          <h2>Contact details</h2>
          <a className="info-card" href="mailto:eclipse_club@esgen.edu.dz">
            <span className="info-card__icon info-card__icon--coral" aria-hidden="true">
              <Mail size={17} />
            </span>
            <span className="info-card__body">
              <span className="info-card__label">Email us</span>
              <span className="info-card__value">eclipse_club@esgen.edu.dz</span>
            </span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <div className="info-card">
            <span className="info-card__icon info-card__icon--teal" aria-hidden="true">
              <MapPin size={17} />
            </span>
            <span className="info-card__body">
              <span className="info-card__label">Find us</span>
              <span className="info-card__value">ESGEN, Kolea University Hub</span>
            </span>
          </div>
          {socialLinks.length > 0 && (
            <div className="social-btns">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  className="social-btn"
                  href={link.href}
                  target={link.label === "Email" ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                >
                  {socialIconMap[link.label] ?? <ArrowUpRight size={16} aria-hidden="true" />}
                </a>
              ))}
            </div>
          )}
          <div className="contact-map-side">
            <div className="contact-map-frame">
              <iframe
                title="Map — ESGEN, Kolea University Hub"
                src="https://maps.google.com/maps?q=36.639642,2.789095&z=16&hl=en&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              className="contact-map-link"
              href="https://www.google.com/maps?ll=36.639642,2.789095&z=15&t=m&hl=fr&gl=DZ&mapclient=embed&cid=18289764021719260845"
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="contact-form-wrap">
          <ContactForm />
        </Reveal>
      </section>
    </main>
  );
}

import { ArrowUpRight, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { socialLinks } from "@/lib/site";
export const metadata = { title: "Contact", description: "Get in touch with ECLIPSE at ESGEN." };
export default function ContactPage() { return <main className="contact-page inner-page"><section className="contact-intro page-shell"><Reveal><p className="eyebrow">03 — Contact ECLIPSE</p><h1>Let’s start a<br /><em>conversation.</em></h1><p>Have a question, a collaboration idea, or a reason to connect? Leave a message for the ECLIPSE team.</p></Reveal></section><section className="contact-body page-shell"><Reveal><div className="contact-aside"><Mail size={28} /><h2>We’re listening.</h2><p>Use this form to reach the club directly.</p>{socialLinks.length > 0 && <div className="contact-socials">{socialLinks.map((link) => <a key={link.label} href={link.href} target={link.label === "Email" ? undefined : "_blank"} rel="noreferrer">{link.label}<ArrowUpRight size={15} /></a>)}</div>}</div></Reveal><Reveal delay={.1}><ContactForm /></Reveal></section></main>; }

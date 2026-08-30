import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { clubSocialLinks } from "@/lib/site";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-orbit" aria-hidden="true" />
      <div className="footer-frame">
        <div className="footer-main">
          <div className="footer-brand">
            <Image src="/eclipse-logo.png" alt="ECLIPSE" width={80} height={80} />
            <div>
              <p className="eyebrow">ESGEN · Kolea</p>
              <p>Scientific &amp; digital student club</p>
            </div>
          </div>
          <div className="footer-message">
            <p className="eyebrow"><span /> A shared point of discovery</p>
            <h2>Shine together.<br /><em>ECLIPSE forever.</em></h2>
          </div>
        </div>
        <div className="footer-details">
          <nav aria-label="Footer navigation">
            <p className="eyebrow">Explore</p>
            <div className="footer-nav-links">{navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
          </nav>
          <div className="footer-socials">
            <p className="eyebrow">Follow the circle</p>
            <div>{clubSocialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div>
          </div>
          <Link className="footer-contact" href="/contact">Start a conversation <ArrowUpRight size={19} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="footer-legal"><span>© {new Date().getFullYear()} ECLIPSE</span><span>ESGEN · Higher School of Management &amp; Digital Economy</span></div>
    </footer>
  );
}

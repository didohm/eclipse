import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for ECLIPSE — scientific & digital student club at ESGEN, Kolea. Acceptable use, content and intellectual property.",
  alternates: { canonical: `${site.url}/terms` },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="inner-page page-shell legal-page">
      <p className="eyebrow">Legal — Terms of Use</p>
      <h1>
        Terms of <em>Use.</em>
      </h1>
      <p className="legal-page__head">Effective: August 2026 — ECLIPSE, ESGEN · Kolea — Est. 2025</p>

      <div className="legal-page__list">
        <section>
          <h2>1. Acceptance</h2>
          <p>By accessing this website, you agree to these Terms. If you do not agree, please do not use the site.</p>
        </section>
        <section>
          <h2>2. Club content</h2>
          <p>
            All editorial, visual, and event content is provided for informational purposes about ECLIPSE activities. Content may be
            updated without notice.
          </p>
        </section>
        <section>
          <h2>3. Acceptable use</h2>
          <p>
            You agree not to misuse the site, attempt unauthorized access, or submit spam or harmful content via forms. We reserve
            the right to moderate or remove submissions.
          </p>
        </section>
        <section>
          <h2>4. Intellectual property</h2>
          <p>ECLIPSE branding, photography, and editorial remain the property of ECLIPSE and ESGEN. Please credit when sharing.</p>
        </section>
        <section>
          <h2>5. Contact</h2>
          <p>
            Questions about these Terms? Reach us at{" "}
            <a className="legal-page__link" href="mailto:eclipse_club@esgen.edu.dz">
              eclipse_club@esgen.edu.dz
            </a>
            .
          </p>
        </section>
        <p className="legal-page__credit">
          Developed by{" "}
          <a href="https://dido.framer.ai" target="_blank" rel="noreferrer">
            Boumedien Himich
          </a>
        </p>
      </div>
    </main>
  );
}

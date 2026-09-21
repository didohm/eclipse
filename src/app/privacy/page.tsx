import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for ECLIPSE — scientific & digital student club at ESGEN, Kolea. How we collect, use and protect your data.",
  alternates: { canonical: `${site.url}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="inner-page page-shell legal-page">
      <p className="eyebrow">Legal — Privacy Policy</p>
      <h1>
        Privacy <em>Policy.</em>
      </h1>
      <p className="legal-page__head">Last updated: August 2026 — ECLIPSE, ESGEN · Kolea.</p>

      <div className="legal-page__list">
        <section>
          <h2>1. Information we collect</h2>
          <p>
            When you use our contact form or newsletter field, we collect the email address you provide and any message content you
            submit. We do not collect sensitive personal data.
          </p>
        </section>
        <section>
          <h2>2. How we use it</h2>
          <p>
            Your information is used solely to respond to your inquiry, share workshop and event updates, and improve the ECLIPSE
            experience. We do not sell or rent your data.
          </p>
        </section>
        <section>
          <h2>3. Storage &amp; retention</h2>
          <p>Messages are stored securely and retained only as long as necessary to handle your request and club operations.</p>
        </section>
        <section>
          <h2>4. Your rights</h2>
          <p>
            You may request access, correction, or deletion of your data at any time by emailing{" "}
            <a className="legal-page__link" href="mailto:eclipse_club@esgen.edu.dz">
              eclipse_club@esgen.edu.dz
            </a>
            .
          </p>
        </section>
        <section>
          <h2>5. Contact</h2>
          <p>For privacy questions, contact us at eclipse_club@esgen.edu.dz — Kolea University Hub, Tipaza, Algeria.</p>
        </section>
      </div>
    </main>
  );
}

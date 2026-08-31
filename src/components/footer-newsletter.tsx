"use client";

import * as React from "react";
import { Send } from "lucide-react";

export function FooterNewsletter() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = email.trim() ? `?email=${encodeURIComponent(email.trim())}` : "";
    window.location.href = `/contact${params}`;
  };

  return (
    <form className="footer-newsletter" onSubmit={handleSubmit} aria-label="Stay in orbit — open contact">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <div className="footer-newsletter__field">
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@esgen.dz"
          autoComplete="email"
          className="footer-newsletter__input"
        />
        <button type="submit" aria-label="Continue to contact" className="footer-newsletter__btn">
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
      <p className="footer-newsletter__hint">Press enter — we open contact with your email prefilled. No spam.</p>
    </form>
  );
}

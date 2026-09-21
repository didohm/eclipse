"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch, type Control } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().trim().min(2, "Enter your first name."),
  lastName: z.string().trim().min(2, "Enter your last name."),
  email: z.string().trim().email("Enter a valid email."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.length >= 6, "Enter a valid phone number."),
  message: z.string().trim().min(15, "Tell us a little more (15 characters minimum)."),
});
type Values = z.infer<typeof schema>;

/**
 * Character counter, isolated in its own component. It subscribes to the
 * "message" field through `useWatch`, so a keystroke re-renders only this
 * small span — the rest of the form (inputs, labels, error UI) is untouched.
 */
function MessageCount({ control }: { control: Control<Values> }) {
  const message = useWatch({ control, name: "message" });
  return (
    <span className="count" aria-hidden="true">
      {message?.length ?? 0} / 2000
    </span>
  );
}

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: Values) => {
    setServerError("");
    setSuccess(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        setServerError(result?.error ?? "Your message could not be sent. Please try again.");
        return;
      }
      reset();
      setSuccess(true);
    } catch {
      setServerError("Connection problem — please check your network and try again.");
    }
  };

  if (success) {
    return (
      <div className="form-success-simple" role="status">
        <CheckCircle2 size={22} aria-hidden="true" />
        <h3>Message sent</h3>
        <p>Thanks for writing — we&rsquo;ll get back to you soon.</p>
        <button type="button" className="text-link" onClick={() => setSuccess(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form-simple" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-first">First name *</label>
          <input
            id="cf-first"
            type="text"
            autoComplete="given-name"
            placeholder="Your first name"
            aria-invalid={Boolean(errors.firstName)}
            {...register("firstName")}
          />
          {errors.firstName && <small role="alert">{errors.firstName.message}</small>}
        </div>
        <div className="field">
          <label htmlFor="cf-last">Last name *</label>
          <input
            id="cf-last"
            type="text"
            autoComplete="family-name"
            placeholder="Your last name"
            aria-invalid={Boolean(errors.lastName)}
            {...register("lastName")}
          />
          {errors.lastName && <small role="alert">{errors.lastName.message}</small>}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-email">Email *</label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email && <small role="alert">{errors.email.message}</small>}
        </div>
        <div className="field">
          <label htmlFor="cf-phone">
            Phone <span className="optional">(optional)</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+213 …"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          {errors.phone && <small role="alert">{errors.phone.message}</small>}
        </div>
      </div>

      <div className="field">
        <div className="field-label-row">
          <label htmlFor="cf-message">Message *</label>
          <MessageCount control={control} />
        </div>
        <textarea
          id="cf-message"
          rows={8}
          maxLength={2000}
          placeholder="Write your message here…"
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        {errors.message && <small role="alert">{errors.message.message}</small>}
      </div>

      <button className="button button--navy form-submit" disabled={isSubmitting}>
        {isSubmitting ? (
          "Sending…"
        ) : (
          <>
            Send message <ArrowUpRight size={16} aria-hidden="true" />
          </>
        )}
      </button>
      {serverError && (
        <p className="form-error" role="alert">
          {serverError}
        </p>
      )}
    </form>
  );
}

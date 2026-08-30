"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({ lastName: z.string().trim().min(2, "Enter your name."), firstName: z.string().trim().min(2, "Enter your first name."), email: z.string().email("Enter a valid email."), phone: z.string().trim().min(6, "Enter a valid phone number."), message: z.string().trim().min(15, "Tell us a little more.") });
type Values = z.infer<typeof schema>;

export function ContactForm() {
  const [success, setSuccess] = useState(false); const [serverError, setServerError] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });
  const onSubmit = async (values: Values) => { setServerError(""); setSuccess(false); const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) }); const result = await response.json(); if (!response.ok) { setServerError(result.error ?? "Your message could not be sent."); return; } reset(); setSuccess(true); };
  return <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
    <div className="field-grid"><Field label="Nom" error={errors.lastName?.message}><input {...register("lastName")} autoComplete="family-name" /></Field><Field label="Prénom" error={errors.firstName?.message}><input {...register("firstName")} autoComplete="given-name" /></Field></div>
    <Field label="Email" error={errors.email?.message}><input type="email" {...register("email")} autoComplete="email" /></Field>
    <Field label="Phone" error={errors.phone?.message}><input type="tel" {...register("phone")} autoComplete="tel" /></Field>
    <Field label="Message" error={errors.message?.message}><textarea rows={5} {...register("message")} /></Field>
    <button className="button button--navy" disabled={isSubmitting}>{isSubmitting ? "Sending…" : <>Send message <ArrowUpRight size={17} /></>}</button>
    {success && <p className="form-success"><CheckCircle2 size={17} /> Your message has been received.</p>}{serverError && <p className="form-error" role="alert">{serverError}</p>}
  </form>;
}
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <label className="form-field"><span>{label}</span>{children}{error && <small>{error}</small>}</label>; }

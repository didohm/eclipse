import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid message." },
      { status: 400 },
    );

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey)
    return NextResponse.json({ error: "Contact delivery is not configured yet." }, { status: 503 });

  const { firstName, lastName, email, phone, message } = parsed.data;
  const fullName = `${firstName} ${lastName}`;

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        firstName,
        lastName,
        first_name: firstName,
        last_name: lastName,
        name: fullName,
        from_name: fullName,
        email,
        reply_to: email,
        from_email: email,
        phone: phone ?? "",
        message,
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[contact] EmailJS send failed", response.status, detail);
    return NextResponse.json(
      { error: "Your message could not be sent. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

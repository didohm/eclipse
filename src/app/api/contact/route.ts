import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { contactSchema } from "@/lib/schemas";
export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid message." }, { status: 400 });
  const db = getDb(); if (!db) return NextResponse.json({ error: "Contact delivery is not configured yet." }, { status: 503 });
  await db.collection("messages").add({ ...parsed.data, createdAt: FieldValue.serverTimestamp() }); return NextResponse.json({ ok: true }, { status: 201 });
}

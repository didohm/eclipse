import { FieldValue } from "firebase-admin/firestore";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { REVALIDATE_TAGS, getDb } from "@/lib/content";
import { eventSchema } from "@/lib/schemas";
import { slugify } from "@/lib/utils";
export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = eventSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid event." }, { status: 400 });
  const db = getDb(); if (!db) return NextResponse.json({ error: "Firestore is not configured." }, { status: 503 });
  const reference = db.collection("events").doc(); const slug = `${slugify(parsed.data.title)}-${reference.id.slice(0, 6)}`;
  await reference.set({ ...parsed.data, slug, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
  revalidateTag(REVALIDATE_TAGS.events, "max");
  return NextResponse.json({ id: reference.id }, { status: 201 });
}
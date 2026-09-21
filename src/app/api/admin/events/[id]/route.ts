import { FieldValue } from "firebase-admin/firestore";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { REVALIDATE_TAGS, getDb } from "@/lib/content";
import { eventSchema } from "@/lib/schemas";
import { slugify } from "@/lib/utils";
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = eventSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid event." }, { status: 400 });
  const db = getDb(); if (!db) return NextResponse.json({ error: "Firestore is not configured." }, { status: 503 });
  const id = (await params).id; await db.collection("events").doc(id).set({ ...parsed.data, slug: `${slugify(parsed.data.title)}-${id.slice(0, 6)}`, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  revalidateTag(REVALIDATE_TAGS.events, "max");
  return NextResponse.json({ ok: true });
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) { if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const db = getDb(); if (!db) return NextResponse.json({ error: "Firestore is not configured." }, { status: 503 }); await db.collection("events").doc((await params).id).delete(); revalidateTag(REVALIDATE_TAGS.events, "max"); return NextResponse.json({ ok: true }); }

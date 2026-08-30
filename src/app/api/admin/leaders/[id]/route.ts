import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getDb } from "@/lib/firebase-admin";
import { leaderSchema } from "@/lib/schemas";
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = leaderSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid leader." }, { status: 400 });
  const db = getDb(); if (!db) return NextResponse.json({ error: "Firestore is not configured." }, { status: 503 });
  await db.collection("leaders").doc((await params).id).set({ ...parsed.data, updatedAt: FieldValue.serverTimestamp() }, { merge: true }); return NextResponse.json({ ok: true });
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) { if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const db = getDb(); if (!db) return NextResponse.json({ error: "Firestore is not configured." }, { status: 503 }); await db.collection("leaders").doc((await params).id).delete(); return NextResponse.json({ ok: true }); }

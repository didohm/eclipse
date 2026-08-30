import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getDb } from "@/lib/firebase-admin";
import { leaderSchema } from "@/lib/schemas";
export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = leaderSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid leader." }, { status: 400 });
  const db = getDb(); if (!db) return NextResponse.json({ error: "Firestore is not configured." }, { status: 503 });
  const reference = await db.collection("leaders").add({ ...parsed.data, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
  return NextResponse.json({ id: reference.id }, { status: 201 });
}

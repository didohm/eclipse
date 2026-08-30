import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkAdminPassword, createAdminSession } from "@/lib/auth";
export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({}));
  if (typeof password !== "string" || !checkAdminPassword(password)) return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  try {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, createAdminSession(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 12 });
    return response;
  } catch { return NextResponse.json({ error: "Admin access has not been configured." }, { status: 503 }); }
}

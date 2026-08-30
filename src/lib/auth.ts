import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "eclipse_admin";
const SESSION_LIFETIME = 1000 * 60 * 60 * 12;

function constantTimeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function checkAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return constantTimeEqual(password, expected);
}

export function createAdminSession() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  const payload = `${Date.now()}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function verifyAdminSession(value?: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!value || !secret) return false;
  const [timestamp, signature] = value.split(".");
  if (!timestamp || !signature || !constantTimeEqual(signature, sign(timestamp, secret))) return false;
  const issuedAt = Number(timestamp);
  return Number.isFinite(issuedAt) && Date.now() - issuedAt < SESSION_LIFETIME;
}

export async function isAdmin() {
  return verifyAdminSession((await cookies()).get(ADMIN_COOKIE)?.value);
}

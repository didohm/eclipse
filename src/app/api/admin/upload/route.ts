import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData(); const file = form.get("file"); const type = form.get("type") === "leader" ? "leaders" : "events";
  if (!(file instanceof File) || !file.type.startsWith("image/")) return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
  if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "Images must be 10 MB or smaller." }, { status: 400 });
  try { return NextResponse.json({ url: await uploadToCloudinary(file, `eclipse/${type}`) }); } catch { return NextResponse.json({ error: "Image upload is unavailable. Check Cloudinary configuration." }, { status: 503 }); }
}

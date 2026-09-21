import { ImageResponse } from "next/og";
import { getEventBySlug } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  const title = event?.title ?? "ECLIPSE Event";
  const subtitle = (event?.shortDescription ?? "Workshops, research & community at ESGEN, Kolea.").slice(0, 110);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#082b40",
          color: "#faf7f1",
          padding: "64px 72px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#e8b34b" }}>
          ECLIPSE · EVENT
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>{title.slice(0, 70)}</div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 30, color: "#d8dee2" }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9fb3c0" }}>
          {event?.date ? `${event.date} · ` : ""}{event?.location || "ESGEN · Kolea"}
        </div>
      </div>
    ),
    { ...size },
  );
}

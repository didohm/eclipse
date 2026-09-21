import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function TwitterImage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#082b40",
        color: "#faf7f1",
        padding: "72px 80px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#e8b34b" }}>
        ECLIPSE · ESGEN · KOLEA
      </div>
      <div style={{ display: "flex", marginTop: 16, fontSize: 110, fontWeight: 800, lineHeight: 1 }}>
        ECLIPSE.
      </div>
      <div style={{ display: "flex", marginTop: 20, fontSize: 32, color: "#d8dee2" }}>
        Scientific &amp; digital student club — workshops, research &amp; events.
      </div>
    </div>
  );
}

export default function Image() {
  return new ImageResponse(<TwitterImage />, { ...size });
}

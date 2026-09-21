import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function OgImage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#082b40",
        color: "#faf7f1",
        padding: "72px 80px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 26,
          letterSpacing: 6,
          color: "#e8b34b",
        }}
      >
        ESGEN STUDENT CLUB · EST. 2025
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 130, fontWeight: 800, lineHeight: 1, letterSpacing: -4 }}>
          ECLIPSE.
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 34, lineHeight: 1.3, color: "#d8dee2", maxWidth: 900 }}>
          Scientific &amp; digital student club — workshops, research &amp; events in Kolea, Algeria.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 26,
          color: "#9fb3c0",
        }}
      >
        <span>Explore · Experiment · Exchange</span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            background: "#f45837",
            color: "#fff",
            borderRadius: 999,
            padding: "12px 28px",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          Join the circle
        </span>
      </div>
    </div>
  );
}

export default function Image() {
  return new ImageResponse(<OgImage />, { ...size });
}

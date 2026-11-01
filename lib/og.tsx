import { ImageResponse } from "next/og";
import { MARK_OUTER, MARK_S_BOTTOM, MARK_S_TOP } from "@/lib/mark";

export const ogSize = { width: 1200, height: 630 };

function MarkSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={(size * 492) / 414} viewBox="792 621 414 492">
      <g transform="translate(0,2000) scale(0.1,-0.1)" fill="#03D4EE">
        <path d={MARK_OUTER} />
        <path d={MARK_S_TOP} />
        <path d={MARK_S_BOTTOM} />
      </g>
    </svg>
  );
}

/** Branded 1200x630 social card. Uses the system font so it builds offline. */
export function renderOg({ title, kicker }: { title: string; kicker: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 30%, #0A2236 0%, #021626 45%, #010E1A 100%)",
          color: "#F4F9FC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <MarkSvg size={56} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700 }}>Sastech</span>
            <span style={{ fontSize: 15, letterSpacing: 8, color: "#03D4EE" }}>CONSULTS</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
          <span style={{ fontSize: 24, color: "#03D4EE", marginBottom: 18 }}>{kicker}</span>
          <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }}>{title}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9FB3C8" }}>
          <span>sastech.com.ng</span>
          <span>Book a free 15-min call</span>
        </div>
        <div style={{ position: "absolute", right: 70, top: 140, display: "flex", opacity: 0.12 }}>
          <MarkSvg size={380} />
        </div>
      </div>
    ),
    ogSize,
  );
}

import { ImageResponse } from "next/og";
import { MARK_OUTER, MARK_S_BOTTOM, MARK_S_TOP } from "@/lib/mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#021626",
        }}
      >
        <svg width={112} height={133} viewBox="792 621 414 492">
          <g transform="translate(0,2000) scale(0.1,-0.1)" fill="#03D4EE">
            <path d={MARK_OUTER} />
            <path d={MARK_S_TOP} />
            <path d={MARK_S_BOTTOM} />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}

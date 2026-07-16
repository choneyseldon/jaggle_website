import { ImageResponse } from "next/og";

export const alt = "Jaggle AI — AI + GNH project management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a12 0%, #14101f 55%, #1a1130 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#f4f4fb",
          }}
        >
          JAGGLE
          <span style={{ color: "#8a8aff" }}>.</span>
          <span
            style={{
              backgroundImage: "linear-gradient(135deg, #6e8cff, #b080ff)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AI
          </span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            color: "#c8c8dc",
          }}
        >
          AI + GNH project management
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 24,
            color: "#8989a8",
          }}
        >
          Plan smarter. Ship calmer.
        </div>
      </div>
    ),
    { ...size }
  );
}

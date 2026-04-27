import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#F7F5F0",
          padding: "80px 80px",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Label row */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              background: "#C8A96E",
              marginRight: 14,
            }}
          />
          <span
            style={{
              fontSize: 14,
              color: "#8C8680",
              letterSpacing: 3,
              fontFamily: "Georgia, serif",
              textTransform: "uppercase",
            }}
          >
            Product Designer · Tel Aviv
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 104,
            fontWeight: 500,
            color: "#1A1714",
            lineHeight: 1.0,
            fontFamily: "Georgia, serif",
            letterSpacing: -3,
          }}
        >
          Maya Brenner
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#8C8680",
            maxWidth: 680,
            lineHeight: 1.5,
            fontFamily: "sans-serif",
            fontWeight: 300,
          }}
        >
          Designing experiences that feel as considered as something you&apos;d
          hold in your hands.
        </div>

        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 4,
            background: "#C8A96E",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

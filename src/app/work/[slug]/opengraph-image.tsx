import { ImageResponse } from "next/og";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllCaseStudies().map((s) => ({ slug: s.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getCaseStudyBySlug(slug);

  if (!result) {
    return new ImageResponse(
      <div style={{ display: "flex", background: "#F7F5F0", width: "100%", height: "100%" }} />,
      { ...size }
    );
  }

  const { meta } = result;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: meta.accentColor,
          padding: "72px 80px",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ghost initial letter */}
        <div
          style={{
            position: "absolute",
            right: -20,
            bottom: -40,
            fontSize: 400,
            fontWeight: 700,
            color: "rgba(26,23,20,0.05)",
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            letterSpacing: -12,
          }}
        >
          {meta.title[0]}
        </div>

        {/* Top: type tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: "#8A6F3E",
              letterSpacing: 2.5,
              fontFamily: "sans-serif",
              textTransform: "uppercase",
              background: "rgba(200,169,110,0.2)",
              padding: "6px 18px",
              borderRadius: 100,
            }}
          >
            {meta.type}
          </span>
          <span style={{ fontSize: 13, color: "#8C8680", fontFamily: "sans-serif" }}>
            {meta.year}
          </span>
        </div>

        {/* Center: title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 500,
              color: "#1A1714",
              lineHeight: 1.05,
              fontFamily: "Georgia, serif",
              letterSpacing: -2,
              maxWidth: 760,
            }}
          >
            {meta.title}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 24,
              color: "#8C8680",
              fontFamily: "sans-serif",
              fontWeight: 300,
              maxWidth: 640,
              lineHeight: 1.4,
            }}
          >
            {meta.subtitle}
          </div>
        </div>

        {/* Bottom: attribution */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: "#1A1714",
              fontFamily: "Georgia, serif",
              fontWeight: 500,
            }}
          >
            Maya Brenner
          </span>
          <span style={{ fontSize: 14, color: "#8C8680", fontFamily: "sans-serif" }}>
            mayabrenner.com
          </span>
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

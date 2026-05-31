"use client";
import { useRef, useEffect, useState } from "react";

interface Props {
  src: string;
  /** "canvas" = full-width iframe.  "phone" = centered phone mockup.  "bare" = no frame, centered. */
  mode?: "canvas" | "phone" | "bare";
  height?: number;
  width?: number;
  caption?: string;
  label?: string;
}

const PHONE_W = 393;
const PHONE_H = 852;
const PHONE_SCALE = 0.72;

export default function InteractivePrototype({
  src,
  mode = "canvas",
  height = 900,
  width,
  caption,
  label = "Interactive prototype",
}: Props) {
  if (mode === "phone") {
    return <PhoneEmbed src={src} caption={caption} label={label} />;
  }
  if (mode === "bare") {
    return <BareEmbed src={src} height={height} width={width} caption={caption} label={label} />;
  }
  return <CanvasEmbed src={src} height={height} width={width} caption={caption} label={label} />;
}

function LiveBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="inline-block w-2 h-2 rounded-full animate-pulse"
        style={{ background: "#FF962C" }}
      />
      <span
        className="text-[11px] font-semibold tracking-[0.08em] uppercase"
        style={{ color: "#FF962C" }}
      >
        {label}
      </span>
    </div>
  );
}

function BareEmbed({ src, height, width, caption, label }: {
  src: string; height: number; width?: number; caption?: string; label: string;
}) {
  return (
    <div style={{ margin: "2rem 0 -2rem", textAlign: "center" }}>
      <iframe
        src={src}
        style={{
          border: "none",
          display: "inline-block",
          width: width ? `${width}px` : "100%",
          height,
          background: "transparent",
        }}
        title={label}
        loading="lazy"
      />
      {caption && (
        <p className="text-[13px] text-center m-0 mt-3" style={{ color: "var(--color-muted)" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

const CANVAS_W = 1512;
const CANVAS_H = 982;

function CanvasEmbed({ src, height, width, caption, label }: {
  src: string; height: number; width?: number; caption?: string; label: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setScale(containerRef.current.offsetWidth / CANVAS_W);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const scaledH = Math.round(CANVAS_H * scale);

  return (
    <div className="my-10">
      <div className="flex items-center justify-center gap-3 mb-3">
        <LiveBadge label={label} />
        {caption && <span className="text-[13px] text-[--color-muted]">{caption}</span>}
      </div>
      <div ref={containerRef} style={{ width: width ? `${width}px` : "100%", marginLeft: "auto", marginRight: "auto", height: scaledH, overflow: "hidden", position: "relative", borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)" }}>
        <iframe
          src={src}
          width={CANVAS_W}
          height={CANVAS_H}
          allowTransparency={true}
          style={{
            border: "none",
            display: "block",
            background: "transparent",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          title={label}
          loading="lazy"
        />
      </div>
      {caption && (
        <p className="text-[13px] text-center mt-3 m-0" style={{ color: "var(--color-muted)" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

function PhoneEmbed({ src, caption, label }: {
  src: string; caption?: string; label: string;
}) {
  const S = PHONE_SCALE;
  const screenW = PHONE_W * S;
  const screenH = PHONE_H * S;
  const pad = 12 * S;
  const shellR = 50 * S;

  return (
    <div className="my-12 flex flex-col items-center gap-4">
      <LiveBadge label={label} />

      {/* Outer phone body */}
      <div style={{
        width: screenW + pad * 2,
        height: screenH + pad * 2,
        borderRadius: shellR + 4,
        background: "#111",
        padding: pad,
        boxSizing: "border-box" as const,
        boxShadow: "0 40px 100px rgba(0,0,0,0.30), 0 8px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.06)",
        position: "relative" as const,
        flexShrink: 0,
      }}>
        {/* Side button */}
        <div style={{ position: "absolute" as const, right: -2, top: "28%", width: 2, height: 60 * S, background: "#333", borderRadius: "0 2px 2px 0" }} />
        {/* Volume up */}
        <div style={{ position: "absolute" as const, left: -2, top: "22%", width: 2, height: 32 * S, background: "#333", borderRadius: "2px 0 0 2px" }} />
        {/* Volume down */}
        <div style={{ position: "absolute" as const, left: -2, top: "30%", width: 2, height: 32 * S, background: "#333", borderRadius: "2px 0 0 2px" }} />

        {/* Screen */}
        <div style={{
          width: screenW,
          height: screenH,
          borderRadius: shellR - 4,
          overflow: "hidden" as const,
          background: "#000",
          position: "relative" as const,
        }}>
          <iframe
            src={src}
            style={{
              border: "none",
              display: "block",
              width: PHONE_W,
              height: PHONE_H,
              transform: `scale(${S})`,
              transformOrigin: "top left",
            }}
            title={label}
            loading="lazy"
            scrolling="no"
          />
        </div>
      </div>

      {caption && (
        <p className="text-[13px] text-center max-w-xs m-0" style={{ color: "var(--color-muted)" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

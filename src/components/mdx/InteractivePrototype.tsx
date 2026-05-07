"use client";

interface Props {
  src: string;
  /** "canvas" = full-width iframe.  "phone" = centered phone mockup. */
  mode?: "canvas" | "phone";
  height?: number;
  caption?: string;
  label?: string;
}

const PHONE_W = 390;
const PHONE_H = 800;
const PHONE_SCALE = 0.75;

export default function InteractivePrototype({
  src,
  mode = "canvas",
  height = 900,
  caption,
  label = "Interactive prototype",
}: Props) {
  if (mode === "phone") {
    return <PhoneEmbed src={src} caption={caption} label={label} />;
  }
  return <CanvasEmbed src={src} height={height} caption={caption} label={label} />;
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

function CanvasEmbed({ src, height, caption, label }: {
  src: string; height: number; caption?: string; label: string;
}) {
  return (
    <div className="my-10 -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-20">
      <div className="flex items-center gap-3 px-4 sm:px-8 md:px-12 lg:px-20 mb-3">
        <LiveBadge label={label} />
        {caption && <span className="text-[13px] text-[--color-muted]">{caption}</span>}
      </div>
      <div
        className="w-full overflow-hidden rounded-2xl border border-[--color-border] shadow-sm"
        style={{ height }}
      >
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: "none", display: "block" }}
          title={label}
          loading="lazy"
        />
      </div>
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
  const shellR = 52 * S;

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

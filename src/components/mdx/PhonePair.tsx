"use client";

interface PhoneProps {
  src: string;
  label: string;
  caption?: string;
}

interface Props {
  left: PhoneProps;
  right: PhoneProps;
}

const PHONE_W = 390;
const PHONE_H = 800;
const S = 0.62; // scale — two phones side by side in prose column

export default function PhonePair({ left, right }: Props) {
  return (
    <div className="my-12 -mx-4 sm:-mx-8 md:-mx-12 flex flex-col items-center gap-6">
      <div className="flex gap-8 items-start justify-center flex-wrap">
        <PhoneSlot {...left} />
        <PhoneSlot {...right} />
      </div>
    </div>
  );
}

function PhoneSlot({ src, label, caption }: PhoneProps) {
  const screenW = PHONE_W * S;
  const screenH = PHONE_H * S;
  const pad = 11 * S;
  const shellR = 52 * S;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* label */}
      <div className="flex items-center gap-1.5">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: "#FF962C" }}
        />
        <span
          className="text-[11px] font-semibold tracking-[0.08em] uppercase"
          style={{ color: "#FF962C" }}
        >
          {label}
        </span>
      </div>

      {/* phone shell */}
      <div style={{
        width: screenW + pad * 2,
        height: screenH + pad * 2,
        borderRadius: shellR + 4,
        background: "#111",
        padding: pad,
        boxSizing: "border-box" as const,
        boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 6px 20px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.06)",
        position: "relative" as const,
        flexShrink: 0,
      }}>
        {/* side button */}
        <div style={{ position: "absolute" as const, right: -2, top: "28%", width: 2, height: 56 * S, background: "#333", borderRadius: "0 2px 2px 0" }} />
        {/* volume up */}
        <div style={{ position: "absolute" as const, left: -2, top: "22%", width: 2, height: 30 * S, background: "#333", borderRadius: "2px 0 0 2px" }} />
        {/* volume down */}
        <div style={{ position: "absolute" as const, left: -2, top: "30%", width: 2, height: 30 * S, background: "#333", borderRadius: "2px 0 0 2px" }} />

        {/* screen */}
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
          />
        </div>
      </div>

      {caption && (
        <p
          className="text-[12px] text-center m-0"
          style={{ color: "var(--color-muted)", maxWidth: screenW + pad * 2 }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

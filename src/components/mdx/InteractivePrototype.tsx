"use client";
import { useRef, useEffect, useLayoutEffect, useState } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Props {
  src: string;
  /** "canvas" = full-width iframe.  "phone" = centered phone mockup.  "bare" = no frame, centered. */
  mode?: "canvas" | "phone" | "bare";
  height?: number | string;
  width?: number | string;
  caption?: string;
  label?: string;
  hideFullscreen?: boolean | string;
}

/** MDX-RSC drops numeric prop expressions on client components, so case
 *  studies pass `height="820"`. Coerce defensively here. */
const toNum = (v: number | string | undefined): number | undefined => {
  if (v === undefined || v === null || v === "") return undefined;
  const n = typeof v === "number" ? v : parseInt(String(v), 10);
  return Number.isFinite(n) ? n : undefined;
};

const PHONE_W = 393;
const PHONE_H = 852;
const PHONE_SCALE = 0.72;

export default function InteractivePrototype({
  src,
  mode = "canvas",
  height: rawHeight = 900,
  width: rawWidth,
  caption,
  label = "Interactive prototype",
  hideFullscreen,
}: Props) {
  const height = toNum(rawHeight) ?? 900;
  const width = toNum(rawWidth);
  const noFs = hideFullscreen === true || hideFullscreen === "true" || hideFullscreen === "";
  if (mode === "phone") {
    return <PhoneEmbed src={src} caption={caption} label={label} />;
  }
  if (mode === "bare") {
    return <BareEmbed src={src} height={height} width={width} caption={caption} label={label} hideFullscreen={noFs} />;
  }
  return <CanvasEmbed src={src} height={height} width={width} caption={caption} label={label} hideFullscreen={noFs} />;
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

function BareEmbed({ src, height, width, caption, label, hideFullscreen }: {
  src: string; height: number; width?: number; caption?: string; label: string; hideFullscreen?: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFs, setIsFs] = useState(false);

  const toggleFs = async () => {
    if (!wrapperRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await wrapperRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* fullscreen denied — ignore */
    }
  };

  useEffect(() => {
    const onChange = () => setIsFs(document.fullscreenElement === wrapperRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const wrapperStyle: React.CSSProperties = isFs
    ? {
        width: "100vw",
        height: "100vh",
        background: "var(--paper)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        margin: 0,
      }
    : { margin: "2.5rem 0" };

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 min-w-0 flex-wrap">
          <LiveBadge label={label} />
          {caption && !isFs && (
            <span className="text-[13px] truncate" style={{ color: "var(--ink-soft)" }}>{caption}</span>
          )}
        </div>
        {!hideFullscreen && <FullscreenBtn isFs={isFs} onClick={toggleFs} />}
      </div>

      <div
        style={{
          width: "100%",
          height: isFs ? undefined : `${height}px`,
          ...(isFs ? { flex: 1, minHeight: 0 } : {}),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--paper)",
          overflow: "hidden",
        }}
      >
        <iframe
          src={src}
          style={{
            border: "none",
            display: "block",
            width: isFs ? "100%" : (width ? `${width}px` : "100%"),
            height: isFs ? "100%" : `${height}px`,
            background: "transparent",
            maxWidth: "100%",
            flexShrink: 0,
          }}
          title={label}
          loading="lazy"
        />
      </div>

      {caption && !isFs && (
        <p className="text-[13px] text-center m-0 mt-3" style={{ color: "var(--ink-soft)" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

const CANVAS_W = 1512;
const CANVAS_H = 982;

function FsIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4,9 4,4 9,4" />
      <polyline points="20,9 20,4 15,4" />
      <polyline points="4,15 4,20 9,20" />
      <polyline points="20,15 20,20 15,20" />
    </svg>
  );
}

function FullscreenBtn({ isFs, onClick }: { isFs: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mono inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors"
      style={{
        border: "1.5px solid var(--ink)",
        background: "var(--paper)",
        color: "var(--ink)",
        fontSize: 10.5,
        letterSpacing: "0.14em",
        fontWeight: 500,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--ink)";
        e.currentTarget.style.color = "var(--paper)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--paper)";
        e.currentTarget.style.color = "var(--ink)";
      }}
      aria-label={isFs ? "Exit fullscreen" : "Open in fullscreen"}
    >
      {isFs ? "EXIT" : "FULLSCREEN"}
      <FsIcon />
    </button>
  );
}

function CanvasEmbed({ src, width, caption, label, hideFullscreen }: {
  src: string; height: number; width?: number; caption?: string; label: string; hideFullscreen?: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(() => {
    if (typeof window === "undefined") return 0.7;
    return Math.min(window.innerWidth - 80, 1280) / CANVAS_W;
  });
  const [marginLeft, setMarginLeft] = useState(0);
  const [isFs, setIsFs] = useState(false);

  const useBleed = !width;

  /* Center the wrapper on the viewport. Measure the parent's actual
     left position and the wrapper's actual width — pure-CSS centering
     can't account for the off-center prose column (col-span-9 col-start-3). */
  useIsoLayoutEffect(() => {
    if (!useBleed || isFs) {
      setMarginLeft(0);
      return;
    }
    const measure = () => {
      const parent = wrapperRef.current?.parentElement;
      if (!parent || !wrapperRef.current) return;
      const parentRect = parent.getBoundingClientRect();
      const wrapperWidth = wrapperRef.current.offsetWidth;
      // Shift wrapper left so its center sits exactly at viewport center.
      const shift = window.innerWidth / 2 - parentRect.left - wrapperWidth / 2;
      setMarginLeft(shift);
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (wrapperRef.current?.parentElement) ro.observe(wrapperRef.current.parentElement);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [useBleed, isFs]);

  /* Compute iframe scale from the canvas frame's ACTUAL width — runs
     before paint so the first painted frame has the correct scale. */
  useIsoLayoutEffect(() => {
    const update = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.offsetWidth;
      const h = canvasRef.current.offsetHeight;
      if (isFs && h > 0) {
        setScale(Math.min(w / CANVAS_W, h / CANVAS_H));
      } else if (w > 0) {
        setScale(w / CANVAS_W);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (canvasRef.current) ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, [isFs]);

  /* Native Fullscreen API */
  const toggleFs = async () => {
    if (!wrapperRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await wrapperRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* fullscreen may be denied — silently ignore */
    }
  };

  useEffect(() => {
    const onChange = () => setIsFs(document.fullscreenElement === wrapperRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const scaledH = Math.round(CANVAS_H * scale);

  const wrapperStyle: React.CSSProperties = isFs
    ? {
        width: "100vw",
        height: "100vh",
        background: "var(--paper)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        margin: 0,
      }
    : {
        width: width ? `${width}px` : "100%",
        marginLeft: "auto",
        marginRight: "auto",
      };

  return (
    <div ref={wrapperRef} className={isFs ? "" : "my-10"} style={wrapperStyle}>
      {/* Top bar: badge + caption + fullscreen button */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 min-w-0 flex-wrap">
          <LiveBadge label={label} />
          {caption && !isFs && (
            <span className="text-[13px] truncate" style={{ color: "var(--ink-soft)" }}>{caption}</span>
          )}
        </div>
        {!hideFullscreen && <FullscreenBtn isFs={isFs} onClick={toggleFs} />}
      </div>

      {/* Canvas frame */}
      {isFs ? (
        /* Fullscreen — flex-center the scaled iframe.
           canvasRef measures available space for scale calc. */
        <div
          ref={canvasRef}
          style={{
            flex: 1,
            minHeight: 0,
            width: "100%",
            overflow: "hidden",
            position: "relative",
            borderRadius: 6,
            border: "1px solid rgba(0,0,0,0.08)",
            background: "var(--paper)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: CANVAS_W * scale,
              height: CANVAS_H * scale,
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
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
        </div>
      ) : (
        /* Normal mode:
           - Outer wrapper carries the border + shadow + radius (visual frame)
           - Inner div (canvasRef) has aspect-ratio and NO border, so its
             clientWidth exactly matches the iframe's scaled visual width.
           This prevents the 1-2px gap caused by border-box vs padding-box. */
        <div
          style={{
            width: "100%",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)",
            background: "var(--paper)",
          }}
        >
          <div
            ref={canvasRef}
            style={{
              width: "100%",
              aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
              position: "relative",
              overflow: "hidden",
              background: "var(--paper)",
            }}
          >
            <iframe
              src={src}
              width={CANVAS_W}
              height={CANVAS_H}
              allowTransparency={true}
              style={{
                border: "none",
                display: "block",
                background: "transparent",
                position: "absolute",
                top: 0,
                left: 0,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
              title={label}
              loading="lazy"
            />
          </div>
        </div>
      )}

      {caption && !isFs && (
        <p className="text-[13px] text-center mt-3 m-0" style={{ color: "var(--ink-soft)" }}>
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

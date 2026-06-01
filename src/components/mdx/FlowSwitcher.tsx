"use client";

import React, { useRef, useEffect, useState } from "react";

interface FlowProps {
  label: string;
  src: string;
}

/** Marker child component — used inside <FlowSwitcher>. Renders nothing on its own. */
export function Flow(_props: FlowProps) {
  return null;
}

interface SwitcherProps {
  height: number;
  width?: number;
  caption?: string;
  label?: string;
  children?: React.ReactNode;
}

function LiveBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--red)" }} />
      <span
        className="mono"
        style={{ fontSize: 10.5, color: "var(--red)", letterSpacing: "0.14em", fontWeight: 600 }}
      >
        {label.toUpperCase()}
      </span>
    </div>
  );
}

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

export default function FlowSwitcher({
  height,
  width,
  caption,
  label = "Interactive prototype",
  children,
}: SwitcherProps) {
  /* Extract Flow children into a serializable array */
  const flows: FlowProps[] = React.Children.toArray(children)
    .filter((c): c is React.ReactElement<FlowProps> => React.isValidElement(c))
    .map((c) => ({ label: c.props.label, src: c.props.src }));

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFs, setIsFs] = useState(false);

  const active = flows[activeIdx] ?? flows[0];

  const toggleFs = async () => {
    if (!wrapperRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await wrapperRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* fullscreen denied */
    }
  };

  useEffect(() => {
    const onChange = () => setIsFs(document.fullscreenElement === wrapperRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  if (!active) return null;

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
      <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0 flex-wrap">
          <LiveBadge label={label} />
          {caption && !isFs && (
            <span className="text-[13px] truncate" style={{ color: "var(--ink-soft)" }}>{caption}</span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div
            className="inline-flex p-0.5 rounded-full"
            style={{ border: "1.5px solid var(--ink)", background: "var(--paper)" }}
          >
            {flows.map((flow, i) => (
              <button
                key={flow.src}
                onClick={() => setActiveIdx(i)}
                className="mono px-3 py-1 rounded-full transition-all duration-200"
                style={{
                  background: i === activeIdx ? "var(--ink)" : "transparent",
                  color: i === activeIdx ? "var(--paper)" : "var(--ink-soft)",
                  fontSize: 10.5,
                  letterSpacing: "0.14em",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {flow.label.toUpperCase()}
              </button>
            ))}
          </div>
          <FullscreenBtn isFs={isFs} onClick={toggleFs} />
        </div>
      </div>

      {isFs ? (
        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <iframe
            key={active.src}
            src={active.src}
            style={{
              border: "none",
              display: "block",
              width: "100%",
              height: "100%",
              background: "transparent",
            }}
            title={`${label} — ${active.label}`}
            loading="lazy"
          />
        </div>
      ) : (
        <iframe
          key={active.src}
          src={active.src}
          style={{
            border: "none",
            display: "block",
            margin: "0 auto",
            width: width ? `${width}px` : "100%",
            height: `${height}px`,
            background: "transparent",
            maxWidth: "100%",
          }}
          title={`${label} — ${active.label}`}
          loading="lazy"
        />
      )}

      {caption && !isFs && (
        <p className="text-[13px] text-center m-0 mt-3" style={{ color: "var(--ink-soft)" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

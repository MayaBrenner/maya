"use client";

/* Shared primitives for case-study UX-Decision "annotated specimens".
   Ported 1:1 from the Claude Design exploration bundle (home-again-ux/).
   Each specimen renders a faithful UI fragment with mono-labeled leader-line
   callouts in the portfolio's zine vocabulary (Cormorant + JetBrains Mono). */

import React from "react";

/* ── zine tokens (was window.HA_T in the source) ────────────── */
export const Z = {
  cream: "#FAF7EE",
  paper: "#FFFFFF",
  ink: "#1A1714",
  inkSoft: "#4E4942",
  mute: "#908A7E",
  faint: "#C1BDB3",
  outline: "#1A1714",
  outlineSoft: "rgba(26,23,20,0.14)",
  outlineFaint: "rgba(26,23,20,0.08)",
  cobalt: "#2E66C8",
  pink: "#E865A0",
  orange: "#E68330",
  green: "#1F9963",
  yellow: "#F5C518",
  red: "#E33A1A",
  serif: "'Cormorant', Georgia, serif",
  body: "'Inter Tight', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
  appBody: "'DM Sans', system-ui, sans-serif",
  appHead: "'Gambarino', Georgia, serif",
  appOrange: "#FF962C",
  appLime: "#D3D742",
  appBlue: "#8FA6EC",
  appCream: "#FBF5E7",
};

export const sMono = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: Z.mono,
  fontSize: 10.5,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontWeight: 500,
  color: Z.mute,
  ...extra,
});

export function SKicker({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <span style={{ width: 7, height: 7, borderRadius: 999, background: accent }} />
      <span style={sMono({ color: Z.inkSoft })}>{children}</span>
    </div>
  );
}

export function STitle({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        fontFamily: Z.serif,
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: 31,
        lineHeight: 1.02,
        letterSpacing: "-0.015em",
        color: Z.ink,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export interface AnnoteProps {
  x: number;
  y: number;
  w: number;
  label: string;
  body: React.ReactNode;
  side: "left" | "right";
  accent?: string;
}
export function SAnnote({ x, y, w, label, body, side, accent = Z.red }: AnnoteProps) {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w }}>
      <div style={{ display: "flex", justifyContent: side === "right" ? "flex-start" : "flex-end" }}>
        <span
          style={{
            fontFamily: Z.mono,
            fontSize: 9.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: accent,
            borderBottom: `1.5px solid ${accent}`,
            paddingBottom: 3,
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          fontFamily: Z.serif,
          fontSize: 17,
          lineHeight: 1.24,
          color: Z.ink,
          marginTop: 9,
          textAlign: side === "right" ? "left" : "right",
        }}
      >
        {body}
      </div>
    </div>
  );
}

export interface LeaderLine { d: string; ax: number; ay: number; }
export function SLeaders({
  w,
  h,
  lines,
  dotColor = Z.red,
}: {
  w: number;
  h: number;
  lines: LeaderLine[];
  dotColor?: string;
}) {
  return (
    <svg width={w} height={h} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <g stroke={Z.ink} strokeWidth="1" strokeDasharray="2 4" fill="none">
        {lines.map((l, i) => (
          <path key={i} d={l.d} />
        ))}
      </g>
      {lines.map((l, i) => (
        <circle key={"d" + i} cx={l.ax} cy={l.ay} r="3.2" fill={dotColor} className="ux-dot" />
      ))}
    </svg>
  );
}

export const sCardEdge: React.CSSProperties = {
  background: Z.paper,
  border: `1.5px solid ${Z.outline}`,
  boxShadow: `4px 4px 0 ${Z.outline}`,
  borderRadius: 6,
};

/* SStage: the "design box" that holds the specimen. Children may be a render
   function `(hover) => …` to animate on hover, or static JSX. */
export function SStage({
  children,
  w = 760,
  h = 600,
  bg = Z.paper,
  grid = true,
}: {
  children: React.ReactNode | ((hover: boolean) => React.ReactNode);
  w?: number;
  h?: number;
  bg?: string;
  grid?: boolean;
}) {
  const [on, setOn] = React.useState(false);
  return (
    <div className="ux-stage not-prose"
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        position: "relative",
        width: w,
        height: h,
        maxWidth: "100%",
        background: bg,
        overflow: "hidden",
        fontFamily: Z.body,
        color: Z.ink,
        borderRadius: 8,
        border: `1px solid ${Z.outlineFaint}`,
        margin: "2.5rem auto",
        backgroundImage: grid
          ? `linear-gradient(${Z.outlineFaint} 1px, transparent 1px),
             linear-gradient(90deg, ${Z.outlineFaint} 1px, transparent 1px)`
          : "none",
        backgroundSize: "32px 32px",
      }}
    >
      {typeof children === "function"
        ? (children as (h: boolean) => React.ReactNode)(on)
        : children}
    </div>
  );
}

/* Footer caption used at the bottom of each specimen ("Real listing card · annotated"). */
export function SFooter({ children, left = 28 }: { children: React.ReactNode; left?: number }) {
  return (
    <span style={{ ...sMono({ color: Z.faint }), position: "absolute", left, bottom: 20 }}>
      {children}
    </span>
  );
}

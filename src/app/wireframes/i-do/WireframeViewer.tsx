// @ts-nocheck
/* eslint-disable */
"use client";
// ════════════════════════════════════════════════════════════════════════════
//  I DO · Wedding Planning OS — interactive wireframe viewer
//  Drop this file at:  src/app/wireframes/i-do/WireframeViewer.tsx
//  Two view modes:  Gallery (every screen live at once) · Focus (one full-size).
//  9 screens:
//    WEB  — Onboarding (setup wizard) · Dashboard · Timeline · Vendors ·
//           Budget · Guests · Seating (drag in/out + conflicts)
//    MOBILE — Join & Sync (pairs to the web plan via code) · Day-Of Runbook
//  The mobile onboarding syncs to the same wedding the web wizard sets up
//  (shared SYNC_CODE + wedding data).
//  Type: EB Garamond (display) + Hanken Grotesk (UI). Currency: NIS (₪). 350 guests.
// ════════════════════════════════════════════════════════════════════════════
import React from "react";

// ════════════════════════════════════════════════════════════════════════════
//  I DO · Wedding Planning OS — shared foundation
//  Design tokens · icon set · primitives · app shell · frames · sample data
// ════════════════════════════════════════════════════════════════════════════

// ─── Design tokens ──────────────────────────────────────────────────────────
const IDO = {
  // Calm, bright base
  bg:          "#FAF8F4",   // warm white — app canvas
  surface:     "#FFFFFF",
  surfaceAlt:  "#F4F1EB",   // recessed panels
  ink:         "#1B1A1E",   // near-black, warm
  ink70:       "#4C4A52",
  muted:       "#8C8992",
  faint:       "#B6B2BA",
  border:      "#ECE8E1",
  borderStrong:"#DFDAD1",
  // Champagne brand accent (the warm-luxe nod)
  gold:        "#A9802F",
  goldText:    "#8A6A28",
  goldSoft:    "#F0E6CF",
  goldLine:    "#E4D3A8",
  // Dark-luxe moment (runbook + cover)
  dark:        "#15141A",
  darkPanel:   "#1E1C24",
  darkLine:    "#322F3A",
  cream:       "#F3EEE4",
  // Soft pastel category tints (Things/Apple energy)
  cat: {
    venue:     { bg: "#E7F0E9", ink: "#557F61", dot: "#6F9C7B" },
    catering:  { bg: "#FBEEDC", ink: "#B07F3C", dot: "#D29A4B" },
    photo:     { bg: "#E6EEF7", ink: "#4671A8", dot: "#5E8AC4" },
    flowers:   { bg: "#F9E7ED", ink: "#BA5E7C", dot: "#D2789A" },
    music:     { bg: "#EEE8F7", ink: "#7C61A8", dot: "#9A7FC4" },
    attire:    { bg: "#F3E9F0", ink: "#9E5E8B", dot: "#BC7BAA" },
    transport: { bg: "#E4EFED", ink: "#46847C", dot: "#5DA199" },
  },
  serif: '"EB Garamond", Garamond, Georgia, serif',
  sans:  '"Hanken Grotesk", system-ui, sans-serif',
  mono:  '"Hanken Grotesk", system-ui, sans-serif',
  shadowSm: "0 1px 2px rgba(27,26,30,0.04), 0 1px 3px rgba(27,26,30,0.05)",
  shadowMd: "0 2px 6px rgba(27,26,30,0.05), 0 8px 24px rgba(27,26,30,0.06)",
  shadowLg: "0 8px 24px rgba(27,26,30,0.08), 0 24px 60px rgba(27,26,30,0.10)",
};

// ─── Couple / wedding meta ────────────────────────────────────────────────────
const WEDDING = {
  partnerA: "Maya",
  partnerB: "Daniel",
  date: "Saturday, September 12, 2026",
  dateShort: "Sep 12 2026",
  venue: "The Olive Grove Estate",
  city: "Sonoma, California",
  daysUntil: 127,
  guestCount: 350,
};

// ─── Icon set (1.5 stroke line icons) ──────────────────────────────────────────
function Icon({ name, size = 18, color = "currentColor", sw = 1.6, style = {} }) {
  const p = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: color, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round",
    style: { display: "block", ...style },
  };
  switch (name) {
    case "dashboard": return <svg {...p}><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>;
    case "timeline": return <svg {...p}><circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><path d="M6 8.2v7.6"/><path d="M10 6h9"/><path d="M10 18h6"/></svg>;
    case "vendors": return <svg {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7"/><path d="M3 12h18"/></svg>;
    case "budget": return <svg {...p}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="17" cy="14.5" r="1.4"/></svg>;
    case "guests": return <svg {...p}><circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3 3 0 0 1 0 5.6"/><path d="M17.5 20a5.5 5.5 0 0 0-3-4.9"/></svg>;
    case "seating": return <svg {...p}><circle cx="12" cy="12" r="4.2"/><circle cx="12" cy="3.6" r="1.5"/><circle cx="12" cy="20.4" r="1.5"/><circle cx="3.6" cy="12" r="1.5"/><circle cx="20.4" cy="12" r="1.5"/></svg>;
    case "runbook": return <svg {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>;
    case "search": return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.4-3.4"/></svg>;
    case "bell": return <svg {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>;
    case "plus": return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case "check": return <svg {...p}><path d="m5 13 4 4L19 7"/></svg>;
    case "chevron-right": return <svg {...p}><path d="m9 6 6 6-6 6"/></svg>;
    case "chevron-left": return <svg {...p}><path d="m15 6-6 6 6 6"/></svg>;
    case "chevron-down": return <svg {...p}><path d="m6 9 6 6 6-6"/></svg>;
    case "arrow-right": return <svg {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case "arrow-up-right": return <svg {...p}><path d="M7 17 17 7M8 7h9v9"/></svg>;
    case "x": return <svg {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case "dots": return <svg {...p}><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg>;
    case "heart": return <svg {...p}><path d="M12 20s-7-4.6-9.2-9C1.3 7.7 3 4.5 6.2 4.5c1.9 0 3.1 1.1 3.8 2.2.7-1.1 1.9-2.2 3.8-2.2 3.2 0 4.9 3.2 3.4 6.5C19 15.4 12 20 12 20Z"/></svg>;
    case "rings": return <svg {...p}><circle cx="9" cy="14" r="6"/><circle cx="15" cy="14" r="6"/></svg>;
    case "calendar": return <svg {...p}><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>;
    case "dollar": return <svg {...p}><path d="M12 3v18M16.5 7c0-2-2-3-4.5-3S7.5 5 7.5 7s2 2.7 4.5 3.4S16.5 12.5 16.5 15s-2 3-4.5 3-4.5-1-4.5-3"/></svg>;
    case "pin": return <svg {...p}><path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case "camera": return <svg {...p}><rect x="3" y="7" width="18" height="13" rx="2.5"/><circle cx="12" cy="13.5" r="3.6"/><path d="M8 7l1.5-2.5h5L16 7"/></svg>;
    case "music": return <svg {...p}><path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>;
    case "utensils": return <svg {...p}><path d="M5 3v7a2 2 0 0 0 4 0V3M7 11v10"/><path d="M16 3c-1.5 0-3 1.5-3 4.5S14.5 13 16 13v8"/></svg>;
    case "flower": return <svg {...p}><circle cx="12" cy="9" r="2.4"/><path d="M12 6.6c0-2 1-3.6 2.6-3.6S17 4.4 16 6.2M12 6.6c0-2-1-3.6-2.6-3.6S7 4.4 8 6.2M14.4 9.6c1.7-1 3.8-.8 4.6.6.8 1.4-.2 3.2-2.2 3.6M9.6 9.6c-1.7-1-3.8-.8-4.6.6-.8 1.4.2 3.2 2.2 3.6"/><path d="M12 11.4V21"/></svg>;
    case "car": return <svg {...p}><path d="M4 13l1.6-4.2A3 3 0 0 1 8.4 7h7.2a3 3 0 0 1 2.8 1.8L20 13v5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1H7.5v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/><path d="M4 13h16"/><circle cx="7.5" cy="16" r="0.6"/><circle cx="16.5" cy="16" r="0.6"/></svg>;
    case "dress": return <svg {...p}><path d="M9 3h6l-1 4 3 3-3 11H8L5 10l3-3-1-4Z"/></svg>;
    case "phone": return <svg {...p}><path d="M6 3h12v18H6zM10.5 18.5h3"/></svg>;
    case "mail": return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/></svg>;
    case "file": return <svg {...p}><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/></svg>;
    case "alert": return <svg {...p}><path d="M12 4 3 19h18Z"/><path d="M12 10v4M12 17v.5"/></svg>;
    case "sparkle": return <svg {...p}><path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.5 6.5 9 9M15 15l2.5 2.5M6.5 17.5 9 15M15 9l2.5-2.5"/></svg>;
    case "grip": return <svg {...p}><circle cx="9" cy="6" r="1.2"/><circle cx="15" cy="6" r="1.2"/><circle cx="9" cy="12" r="1.2"/><circle cx="15" cy="12" r="1.2"/><circle cx="9" cy="18" r="1.2"/><circle cx="15" cy="18" r="1.2"/></svg>;
    case "leaf": return <svg {...p}><path d="M4 20C4 11 11 4 20 4c0 9-7 16-16 16Z"/><path d="M4 20C8 15 13 11 18 8"/></svg>;
    case "link": return <svg {...p}><path d="M9 15l6-6"/><path d="M11 7l1-1a3.5 3.5 0 0 1 5 5l-1 1M13 17l-1 1a3.5 3.5 0 0 1-5-5l1-1"/></svg>;
    case "filter": return <svg {...p}><path d="M3 5h18l-7 8v5l-4 2v-7Z"/></svg>;
    case "gift": return <svg {...p}><rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M4 13h16M12 9v11"/><path d="M12 9S10.5 4 8.5 5 9.5 9 12 9ZM12 9s1.5-5 3.5-4-.5 4-3.5 4Z"/></svg>;
    case "moon": return <svg {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>;
    case "share": return <svg {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="17" cy="6" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="m8.2 10.8 6.6-3.6M8.2 13.2l6.6 3.6"/></svg>;
    default: return null;
  }
}

// ─── Text primitives ────────────────────────────────────────────────────────
function Eyebrow({ children, color = IDO.muted, style = {} }) {
  return <span style={{ fontFamily: IDO.mono, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color, ...style }}>{children}</span>;
}
function Serif({ children, size = 32, italic = false, color = IDO.ink, style = {} }) {
  return <span style={{ fontFamily: IDO.serif, fontStyle: italic ? "italic" : "normal", fontSize: size, lineHeight: 1.0, letterSpacing: "-0.01em", color, ...style }}>{children}</span>;
}

// ─── Avatar (monogram) ─────────────────────────────────────────────────────────
function Avatar({ initials, size = 30, bg = IDO.surfaceAlt, color = IDO.ink70, ring = false, style = {} }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 999, background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: IDO.sans, fontWeight: 600, fontSize: size * 0.36, flexShrink: 0, boxShadow: ring ? `0 0 0 2px ${IDO.surface}, 0 0 0 3px ${IDO.goldLine}` : "none", ...style }}>
      {initials}
    </div>
  );
}

// ─── Progress bar ──────────────────────────────────────────────────────────────
function Bar({ pct, color = IDO.gold, track = IDO.surfaceAlt, h = 6, over = false }) {
  return (
    <div style={{ position: "relative", height: h, borderRadius: h, background: track, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${Math.min(100, pct)}%`, background: over ? IDO.cat.flowers.dot : color, borderRadius: h }} />
    </div>
  );
}

// ─── Donut ring (SVG) ───────────────────────────────────────────────────────────
function Ring({ pct, size = 92, sw = 9, color = IDO.gold, track = IDO.surfaceAlt, children }) {
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(100, pct) / 100);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)", display: "block" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      {children && <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>{children}</div>}
    </div>
  );
}

// ─── Chip / pill ────────────────────────────────────────────────────────────────
function Chip({ children, bg = IDO.surfaceAlt, color = IDO.ink70, dot = null, style = {} }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, background: bg, color, fontFamily: IDO.sans, fontSize: 12, fontWeight: 600, lineHeight: 1, whiteSpace: "nowrap", ...style }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: dot, flexShrink: 0 }} />}
      {children}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({ children, pad = 22, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{ background: IDO.surface, border: `1px solid ${IDO.border}`, borderRadius: 18, padding: pad, boxShadow: IDO.shadowSm, ...style }}>
      {children}
    </div>
  );
}

// ─── Clickable hover row (works in HTML + TSX, no :hover CSS needed) ───────────
function Clickable({ onClick, base = {}, hover = {}, style = {}, children, title }) {
  const [h, setH] = React.useState(false);
  return (
    <div onClick={onClick} title={title}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ cursor: "pointer", transition: "background 130ms ease, border-color 130ms ease, transform 130ms ease", ...base, ...(h ? hover : null), ...style }}>
      {children}
    </div>
  );
}

// ─── Category meta ──────────────────────────────────────────────────────────────
const CATS = [
  { key: "venue",     label: "Venue",          icon: "pin" },
  { key: "catering",  label: "Catering",       icon: "utensils" },
  { key: "photo",     label: "Photography",    icon: "camera" },
  { key: "flowers",   label: "Flowers",        icon: "flower" },
  { key: "music",     label: "Music",          icon: "music" },
  { key: "attire",    label: "Attire",         icon: "dress" },
  { key: "transport", label: "Transportation", icon: "car" },
];

// ─── Nav model ───────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "timeline",  label: "Timeline",  icon: "timeline" },
  { id: "vendors",   label: "Vendors",   icon: "vendors" },
  { id: "budget",    label: "Budget",    icon: "budget" },
  { id: "guests",    label: "Guests",    icon: "guests" },
  { id: "seating",   label: "Seating",   icon: "seating" },
];

// ─── Wordmark ────────────────────────────────────────────────────────────────
function Wordmark({ size = 22, dark = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{ position: "relative", width: size * 1.05, height: size * 0.72, flexShrink: 0 }}>
        <svg width={size * 1.05} height={size * 0.72} viewBox="0 0 30 20" fill="none">
          <circle cx="11" cy="11" r="7" stroke={IDO.gold} strokeWidth="1.8" />
          <circle cx="19" cy="11" r="7" stroke={dark ? IDO.cream : IDO.ink} strokeWidth="1.8" />
        </svg>
      </div>
      <span style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: size, letterSpacing: "0.01em", color: dark ? IDO.cream : IDO.ink, lineHeight: 1 }}>
        I&nbsp;do
      </span>
    </div>
  );
}

// ─── Sidebar (desktop) ──────────────────────────────────────────────────────────
function Sidebar({ active, onNav }) {
  return (
    <div style={{ width: 232, flexShrink: 0, background: IDO.surface, borderRight: `1px solid ${IDO.border}`, display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "22px 22px 20px" }}>
        <Wordmark size={22} />
      </div>

      <div style={{ padding: "0 14px", display: "flex", flexDirection: "column", gap: 2 }}>
        <Eyebrow style={{ padding: "0 10px 10px", fontSize: 9.5 }}>Planning</Eyebrow>
        {NAV.map((n) => {
          const on = active === n.id;
          return (
            <button key={n.id} onClick={() => onNav && onNav(n.id)} style={{
              display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 11,
              background: on ? IDO.surfaceAlt : "transparent", border: "none", cursor: "pointer",
              fontFamily: IDO.sans, fontSize: 14, fontWeight: on ? 600 : 500,
              color: on ? IDO.ink : IDO.ink70, textAlign: "left", width: "100%", position: "relative",
            }}>
              {on && <span style={{ position: "absolute", left: -14, top: 10, bottom: 10, width: 3, borderRadius: 3, background: IDO.gold }} />}
              <Icon name={n.icon} size={18} color={on ? IDO.gold : IDO.faint} sw={1.7} />
              {n.label}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: "auto", padding: 14 }}>
        <div style={{ background: IDO.surfaceAlt, borderRadius: 14, padding: 14, display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ display: "flex" }}>
            <Avatar initials="M" size={32} bg={IDO.cat.flowers.bg} color={IDO.cat.flowers.ink} ring />
            <Avatar initials="D" size={32} bg={IDO.cat.photo.bg} color={IDO.cat.photo.ink} ring style={{ marginLeft: -10 }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: IDO.sans, fontSize: 13, fontWeight: 600, color: IDO.ink, lineHeight: 1.1 }}>Maya & Daniel</div>
            <div style={{ fontFamily: IDO.mono, fontSize: 9.5, color: IDO.muted, letterSpacing: "0.04em", marginTop: 3 }}>OWNER · 2 PLANNERS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Top bar (desktop) ──────────────────────────────────────────────────────────
function TopBar({ title, subtitle, action }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", borderBottom: `1px solid ${IDO.border}`, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", flexShrink: 0 }}>
      <div>
        <div style={{ fontFamily: IDO.serif, fontSize: 26, color: IDO.ink, lineHeight: 1, letterSpacing: "-0.01em" }}>{title}</div>
        {subtitle && <div style={{ fontFamily: IDO.sans, fontSize: 13, color: IDO.muted, marginTop: 5 }}>{subtitle}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: IDO.dark, color: IDO.cream }}>
          <Icon name="heart" size={13} color={IDO.gold} sw={1.8} />
          <span style={{ fontFamily: IDO.mono, fontSize: 11.5, fontWeight: 500, letterSpacing: "0.04em" }}>{WEDDING.daysUntil} DAYS</span>
        </div>
        <button style={{ width: 38, height: 38, borderRadius: 999, border: `1px solid ${IDO.border}`, background: IDO.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="search" size={17} color={IDO.ink70} />
        </button>
        <button style={{ width: 38, height: 38, borderRadius: 999, border: `1px solid ${IDO.border}`, background: IDO.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
          <Icon name="bell" size={17} color={IDO.ink70} />
          <span style={{ position: "absolute", top: 9, right: 10, width: 6, height: 6, borderRadius: 999, background: IDO.cat.flowers.dot, boxShadow: `0 0 0 2px ${IDO.surface}` }} />
        </button>
        {action}
      </div>
    </div>
  );
}

function PrimaryButton({ children, icon, dark = true, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 999,
      background: dark ? IDO.ink : IDO.surface, color: dark ? IDO.surface : IDO.ink,
      border: dark ? "none" : `1px solid ${IDO.borderStrong}`, cursor: "pointer",
      fontFamily: IDO.sans, fontSize: 13.5, fontWeight: 600, ...style,
    }}>
      {icon && <Icon name={icon} size={16} color={dark ? IDO.surface : IDO.ink} sw={1.8} />}
      {children}
    </button>
  );
}

// ─── Desktop browser frame ───────────────────────────────────────────────────────
function BrowserFrame({ children }) {
  return (
    <div style={{ width: 1180, height: 760, borderRadius: 16, overflow: "hidden", background: IDO.surface, boxShadow: IDO.shadowLg, border: `1px solid ${IDO.borderStrong}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      {/* chrome */}
      <div style={{ height: 40, background: "#F0EDE7", borderBottom: `1px solid ${IDO.border}`, display: "flex", alignItems: "center", padding: "0 14px", gap: 8, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 7 }}>
          <span style={{ width: 11, height: 11, borderRadius: 999, background: "#E0867D" }} />
          <span style={{ width: 11, height: 11, borderRadius: 999, background: "#E6C06A" }} />
          <span style={{ width: 11, height: 11, borderRadius: 999, background: "#A9CE8E" }} />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 16px", background: IDO.surface, borderRadius: 8, border: `1px solid ${IDO.border}`, minWidth: 280 }}>
            <Icon name="heart" size={11} color={IDO.gold} sw={2} />
            <span style={{ fontFamily: IDO.mono, fontSize: 11, color: IDO.muted, letterSpacing: "0.02em" }}>app.ido.studio/maya-daniel</span>
          </div>
        </div>
        <div style={{ width: 50 }} />
      </div>
      {/* app body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", background: IDO.bg }}>
        {children}
      </div>
    </div>
  );
}

// ─── Mobile phone frame ───────────────────────────────────────────────────────
function PhoneFrame({ children, dark = false }) {
  return (
    <div style={{ width: 384, height: 812, borderRadius: 52, overflow: "hidden", boxShadow: `0 0 0 9px ${dark ? "#0A0910" : "#1A1815"}, 0 0 0 11px #2A2520, ${IDO.shadowLg}`, position: "relative", flexShrink: 0, background: dark ? IDO.dark : IDO.surface, display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 116, height: 32, background: dark ? "#0A0910" : "#1A1815", borderBottomLeftRadius: 18, borderBottomRightRadius: 18, zIndex: 30 }} />
      {children}
    </div>
  );
}

function PhoneStatusBar({ dark = false }) {
  const c = dark ? IDO.cream : IDO.ink;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px 4px", flexShrink: 0 }}>
      <span style={{ fontFamily: IDO.sans, fontSize: 14, fontWeight: 700, color: c }}>9:41</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="0.5" fill={c}/><rect x="4.5" y="5" width="3" height="6" rx="0.5" fill={c}/><rect x="9" y="2.5" width="3" height="8.5" rx="0.5" fill={c}/><rect x="13.5" y="0" width="3" height="11" rx="0.5" fill={c}/></svg>
        <svg width="23" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="20" height="10" rx="3" stroke={c} strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="16" height="7" rx="1.5" fill={c}/></svg>
      </div>
    </div>
  );
}

// ─── Image placeholder ──────────────────────────────────────────────────────────
function Placeholder({ label, h = 120, radius = 12, dark = false, style = {} }) {
  const stroke = dark ? "rgba(243,238,228,0.10)" : "#E7E2D8";
  const fg = dark ? "rgba(243,238,228,0.45)" : IDO.faint;
  return (
    <div style={{ height: h, borderRadius: radius, position: "relative", overflow: "hidden", background: dark ? "rgba(243,238,228,0.04)" : IDO.surfaceAlt, border: `1px solid ${stroke}`, display: "flex", alignItems: "center", justifyContent: "center", ...style }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
        <defs>
          <pattern id={"ph" + label.replace(/\s/g, "")} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="9" stroke={stroke} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={"url(#ph" + label.replace(/\s/g, "") + ")"} />
      </svg>
      <span style={{ position: "relative", fontFamily: IDO.mono, fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: fg }}>{label}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SAMPLE DATA
// ════════════════════════════════════════════════════════════════════════════

// Budget (dollars)
const BUDGET = {
  total: 180000,
  categories: [
    { key: "venue",     spent: 52000, planned: 54000 },
    { key: "catering",  spent: 38000, planned: 46000 },
    { key: "photo",     spent: 16000, planned: 16000 },
    { key: "flowers",   spent: 8000,  planned: 11000 },
    { key: "music",     spent: 9500,  planned: 9500  },
    { key: "attire",    spent: 11000, planned: 15000 },
    { key: "transport", spent: 3000,  planned: 6000  },
  ],
};

// Aggregate guest stats for a 350-guest wedding (table below shows a sample)
const GUEST_STATS = { invited: 350, attending: 284, awaiting: 41, declined: 25, dietary: 38, brideSide: 180, groomSide: 170 };

// Vendors
const VENDORS = [
  { id: "photo",  cat: "photo",     name: "Aperture & Vine",     role: "Photography",  status: "booked",   paid: 50, total: 16000, contact: "Lena Ortiz", next: "Engagement shoot · Jun 4" },
  { id: "venue",  cat: "venue",     name: "Olive Grove Estate",  role: "Venue",        status: "booked",   paid: 75, total: 54000, contact: "Marcus Hale", next: "Final walkthrough · Aug 22" },
  { id: "cater",  cat: "catering",  name: "Saffron & Sage",      role: "Catering",     status: "booked",   paid: 40, total: 46000, contact: "Priya Nair",  next: "Tasting · Jun 18" },
  { id: "dj",     cat: "music",     name: "Midnight Strings",    role: "Band & DJ",    status: "booked",   paid: 50, total: 9500,  contact: "Theo Brooks", next: "Song list due · Jul 1" },
  { id: "flor",   cat: "flowers",   name: "Wild Bloom Co.",      role: "Florals",      status: "proposal", paid: 0,  total: 11000, contact: "Iris Chen",   next: "Proposal review · May 30" },
  { id: "cake",   cat: "catering",  name: "Flour & Honey",       role: "Cake",         status: "shortlist",paid: 0,  total: 3500,  contact: "—",            next: "Tasting to book" },
  { id: "trans",  cat: "transport", name: "Vineyard Coaches",    role: "Transport",    status: "shortlist",paid: 0,  total: 6000,  contact: "—",            next: "Quote requested" },
];

// Per-vendor workspace detail
const VENDOR_DETAIL = {
  photo: {
    contactRole: "Lead photographer",
    files: [["Photography_Agreement.pdf", "Signed · Mar 2"], ["Shot_list_v2.pdf", "Shared · 1.1 MB"], ["Invoice_deposit.pdf", "Paid · Mar 3"]],
    gallery: ["Golden hour", "Candid", "Detail", "Venue wide", "B&W", "Florals"],
    notes: [["Apr 12", "Wants documentary style — fewer posed shots. Confirmed 2 shooters for the ceremony."], ["Mar 2", "Signed contract. Deposit paid. Engagement session included in package."]],
  },
  venue: {
    contactRole: "Events manager",
    files: [["Venue_Contract.pdf", "Signed · Jan 18"], ["Floor_plan_hall.pdf", "Shared · 2.4 MB"], ["Certificate_insurance.pdf", "On file"]],
    gallery: ["Ceremony lawn", "Barn interior", "Terrace", "Vineyard", "Lighting plan", "Table layout"],
    notes: [["Apr 2", "Confirmed rain plan — ceremony moves to the barn. 142 seated capacity holds."], ["Jan 18", "Booked Sep 12. 75% deposit paid. Final walkthrough scheduled for Aug 22."]],
  },
  cater: {
    contactRole: "Head chef",
    files: [["Catering_Agreement.pdf", "Signed · Feb 9"], ["Menu_draft_v3.pdf", "Shared · 0.8 MB"], ["Dietary_summary.pdf", "Auto-synced from Guests"]],
    gallery: ["Plated main", "Canapés", "Dessert", "Bar", "Stations", "Linens"],
    notes: [["May 6", "Tasting on Jun 18. Building menu around the 7 vegetarian + 1 vegan + 1 kosher guests."], ["Feb 9", "Booked plated service for 140. 40% deposit paid."]],
  },
  dj: {
    contactRole: "Bandleader",
    files: [["Performance_Contract.pdf", "Signed · Mar 20"], ["Set_list_draft.pdf", "In progress"], ["Tech_rider.pdf", "Shared"]],
    gallery: ["Trio set", "Dance floor", "Lighting", "Stage"],
    notes: [["Apr 28", "Cocktail-hour trio confirmed, full band for reception. Song requests due Jul 1."], ["Mar 20", "Booked. 50% deposit paid."]],
  },
  flor: {
    contactRole: "Floral designer",
    files: [["Floral_Proposal_v2.pdf", "Awaiting review"], ["Mood_board.pdf", "Shared · 3.1 MB"]],
    gallery: ["Bouquet", "Ceremony arch", "Centerpiece", "Aisle", "Boutonnière", "Garland"],
    notes: [["May 24", "Proposal v2 in — came in $800 under our flowers budget. Need to approve by May 30."], ["May 10", "Loved the wild, unstructured style. Sent our color palette."]],
  },
  cake: {
    contactRole: "Pastry chef",
    files: [["Initial_quote.pdf", "Received"]],
    gallery: ["Tiered", "Naked", "Florals", "Slice"],
    notes: [["May 20", "Shortlisted from 3 bakeries. Need to book a tasting before deciding."]],
  },
  trans: {
    contactRole: "Coordinator",
    files: [["Quote_request.pdf", "Sent · May 22"]],
    gallery: ["Coach", "Interior", "Route map"],
    notes: [["May 22", "Requested a quote for two shuttle runs — hotel to venue and the late send-off."]],
  },
};

// Timeline milestones
const TIMELINE = [
  { phase: "12 months out", window: "DONE", tasks: [
    { t: "Set the date & budget", done: true, to: "budget" },
    { t: "Book the venue", done: true, to: "vendors" },
    { t: "Draft the guest list", done: true, to: "guests" },
  ]},
  { phase: "9 months out", window: "DONE", tasks: [
    { t: "Book photographer", done: true, to: "vendors" },
    { t: "Book band & DJ", done: true, to: "vendors" },
    { t: "Choose wedding party", done: true, to: "guests" },
  ]},
  { phase: "6 months out", window: "IN PROGRESS", tasks: [
    { t: "Send save-the-dates", done: true, to: "guests" },
    { t: "Book caterer & tasting", done: true, to: "vendors" },
    { t: "Finalize florals", done: false, to: "vendors" },
    { t: "Order attire", done: false, to: "budget" },
  ]},
  { phase: "3 months out", window: "UPCOMING", tasks: [
    { t: "Send invitations", done: false, to: "guests" },
    { t: "Hair & makeup trial", done: false, to: "vendors" },
    { t: "Confirm transportation", done: false, to: "vendors" },
  ]},
  { phase: "1 month out", window: "UPCOMING", tasks: [
    { t: "Confirm final guest count", done: false, to: "guests" },
    { t: "Build seating chart", done: false, to: "seating" },
    { t: "Confirm timeline with vendors", done: false, to: "vendors" },
  ]},
  { phase: "Wedding week", window: "UPCOMING", tasks: [
    { t: "Final vendor payments", done: false, to: "budget" },
    { t: "Rehearsal dinner", done: false, to: "runbook" },
    { t: "Pack & prep day-of kit", done: false, to: "runbook" },
  ]},
];

// Guests — shared between CRM and Seating
// side: bride/groom · group: family unit for relative-highlighting
const GUESTS = [
  { id: "g1",  name: "Elena Cohen",      side: "bride", group: "cohen",   rsvp: "yes",     diet: "Vegetarian", plus: true,  gift: true,  table: "t1" },
  { id: "g2",  name: "David Cohen",      side: "bride", group: "cohen",   rsvp: "yes",     diet: "—",          plus: false, gift: true,  table: "t1" },
  { id: "g3",  name: "Rachel Cohen",     side: "bride", group: "cohen",   rsvp: "yes",     diet: "Gluten-free",plus: false, gift: false, table: "t1" },
  { id: "g4",  name: "Sam Levy",         side: "bride", group: "friends", rsvp: "yes",     diet: "—",          plus: true,  gift: false, table: "t2" },
  { id: "g5",  name: "Noa Friedman",     side: "bride", group: "friends", rsvp: "yes",     diet: "Vegan",      plus: false, gift: true,  table: "t2" },
  { id: "g6",  name: "Tomer Adler",      side: "bride", group: "friends", rsvp: "maybe",   diet: "—",          plus: false, gift: false, table: null },
  { id: "g7",  name: "Robert Stern",     side: "groom", group: "stern",   rsvp: "yes",     diet: "—",          plus: true,  gift: true,  table: "t3" },
  { id: "g8",  name: "Carol Stern",      side: "groom", group: "stern",   rsvp: "yes",     diet: "Pescatarian",plus: false, gift: true,  table: "t3" },
  { id: "g9",  name: "Aunt Miriam",      side: "groom", group: "stern",   rsvp: "yes",     diet: "Kosher",     plus: false, gift: false, table: null },
  { id: "g10", name: "Jake Miller",      side: "groom", group: "college", rsvp: "yes",     diet: "—",          plus: true,  gift: false, table: "t4" },
  { id: "g11", name: "Chris Park",       side: "groom", group: "college", rsvp: "yes",     diet: "—",          plus: false, gift: true,  table: "t4" },
  { id: "g12", name: "Maria Lopez",      side: "groom", group: "college", rsvp: "no",      diet: "—",          plus: false, gift: false, table: null },
  { id: "g13", name: "Hannah Weiss",     side: "bride", group: "work",    rsvp: "yes",     diet: "Vegetarian", plus: false, gift: false, table: null },
  { id: "g14", name: "Daniel Roth",      side: "bride", group: "work",    rsvp: "pending", diet: "—",          plus: false, gift: false, table: null },
  { id: "g15", name: "Grandpa Joe",      side: "groom", group: "stern",   rsvp: "yes",     diet: "Low-sodium", plus: false, gift: true,  table: null },
  { id: "g16", name: "Lily Tran",        side: "bride", group: "friends", rsvp: "pending", diet: "—",          plus: false, gift: false, table: null },
];

// Tables for seating — round, 8 seats
const TABLES = [
  { id: "t1", name: "Table 1", seats: 8, x: 0,   y: 0 },
  { id: "t2", name: "Table 2", seats: 8, x: 1,   y: 0 },
  { id: "t3", name: "Table 3", seats: 8, x: 0,   y: 1 },
  { id: "t4", name: "Table 4", seats: 8, x: 1,   y: 1 },
];

// Conflicts — guest pairs that should NOT share a table
const CONFLICTS = [
  ["g4", "g12"],  // Sam & Maria — history
  ["g9", "g10"],  // Aunt Miriam & Jake — keep apart
];

// Day-of runbook
const RUNBOOK = [
  { time: "08:00", title: "Hair & makeup begins", who: "Bridal suite · 5 people", cat: "attire", done: true },
  { time: "11:30", title: "Photographer arrives", who: "Lena · getting-ready shots", cat: "photo", done: true },
  { time: "13:00", title: "First look", who: "Maya & Daniel · olive terrace", cat: "photo", done: false, now: true },
  { time: "14:30", title: "Guests arrive & seated", who: "Ushers · ceremony lawn", cat: "venue", done: false },
  { time: "15:00", title: "Ceremony", who: "Officiant · 30 min", cat: "venue", done: false },
  { time: "15:45", title: "Cocktail hour", who: "Midnight Strings · trio set", cat: "music", done: false },
  { time: "17:00", title: "Dinner service", who: "Saffron & Sage · plated", cat: "catering", done: false },
  { time: "19:00", title: "First dance & toasts", who: "DJ · floor open", cat: "music", done: false },
  { time: "23:00", title: "Send-off", who: "Sparklers · front drive", cat: "venue", done: false },
];

function money(n) { return "₪" + n.toLocaleString("en-US"); }
function moneyK(n) { return "₪" + (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "k"; }

// ─── Cross-device sync (web ⇄ mobile onboarding) ──────────────────────────────
const SYNC_CODE = "IDO-512";
const COLLABORATORS = [
  { name: "Maya Cohen",    role: "Owner",       initials: "M",  side: "bride" },
  { name: "Daniel Stern",  role: "Partner",     initials: "D",  side: "groom" },
  { name: "Renee Adler",   role: "Planner",     initials: "RA", side: "bride" },
  { name: "Lena Ortiz",    role: "Photographer",initials: "LO", side: "groom" },
];

// ─── export to window ─────────────────────────────────────────────────────────

// ════════════════════════════════════════════════════════════════════════════
//  I DO — core desktop screens: Dashboard · Timeline · Vendors · Budget
// ════════════════════════════════════════════════════════════════════════════

const catOf = (k) => IDO.cat[k];
const catMeta = (k) => CATS.find((c) => c.key === k);

// helpers shared by screens
function ScreenScroll({ children, pad = 32, bg = IDO.bg }) {
  return (
    <div className="ido-scroll" style={{ flex: 1, overflowY: "auto", background: bg }}>
      <div style={{ padding: pad }}>{children}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1 · DASHBOARD — mission control
// ════════════════════════════════════════════════════════════════════════════
function DashboardScreen({ onNav }) {
  const totalSpent = BUDGET.categories.reduce((s, c) => s + c.spent, 0);
  const budgetPct = Math.round((totalSpent / BUDGET.total) * 100);
  const rsvpYes = GUESTS.filter((g) => g.rsvp === "yes").length;
  const rsvpPending = GUESTS.filter((g) => g.rsvp === "pending" || g.rsvp === "maybe").length;
  const vendorsBooked = VENDORS.filter((v) => v.status === "booked").length;
  const nav = onNav || (() => {});

  const thisWeek = [
    { t: "Review Wild Bloom floral proposal", cat: "flowers", due: "Today", to: "vendors" },
    { t: "Confirm tasting menu with Saffron & Sage", cat: "catering", due: "Thu", to: "vendors" },
    { t: "Send save-the-dates to B-list", cat: "venue", due: "Fri", to: "guests" },
    { t: "Approve engagement shoot locations", cat: "photo", due: "Sat", to: "vendors" },
  ];

  return (
    <ScreenScroll>
      {/* Hero countdown */}
      <div style={{ display: "flex", gap: 20, marginBottom: 22 }}>
        <div style={{ flex: 1.5, background: IDO.dark, borderRadius: 20, padding: "30px 34px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: 999, border: `1px solid ${IDO.darkLine}`, opacity: 0.6 }} />
          <div style={{ position: "absolute", right: -10, bottom: -60, width: 160, height: 160, borderRadius: 999, border: `1px solid ${IDO.darkLine}`, opacity: 0.4 }} />
          <Eyebrow color={IDO.gold} style={{ position: "relative" }}>Maya & Daniel · The countdown</Eyebrow>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 14, position: "relative" }}>
            <span style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 92, lineHeight: 0.8, color: IDO.cream, paddingRight: 4 }}>{WEDDING.daysUntil}</span>
            <div style={{ marginLeft: 4 }}>
              <div style={{ fontFamily: IDO.serif, fontSize: 30, color: IDO.cream, lineHeight: 1 }}>days</div>
              <div style={{ fontFamily: IDO.mono, fontSize: 11, color: "rgba(243,238,228,0.55)", letterSpacing: "0.08em", marginTop: 5 }}>UNTIL "I DO"</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 22, marginTop: 26, position: "relative" }}>
            <div>
              <div style={{ fontFamily: IDO.mono, fontSize: 9.5, color: "rgba(243,238,228,0.45)", letterSpacing: "0.1em" }}>DATE</div>
              <div style={{ fontFamily: IDO.sans, fontSize: 13.5, color: IDO.cream, fontWeight: 500, marginTop: 4 }}>Sep 12, 2026</div>
            </div>
            <div style={{ width: 1, background: IDO.darkLine }} />
            <div>
              <div style={{ fontFamily: IDO.mono, fontSize: 9.5, color: "rgba(243,238,228,0.45)", letterSpacing: "0.1em" }}>VENUE</div>
              <div style={{ fontFamily: IDO.sans, fontSize: 13.5, color: IDO.cream, fontWeight: 500, marginTop: 4 }}>Olive Grove Estate</div>
            </div>
            <div style={{ width: 1, background: IDO.darkLine }} />
            <div>
              <div style={{ fontFamily: IDO.mono, fontSize: 9.5, color: "rgba(243,238,228,0.45)", letterSpacing: "0.1em" }}>GUESTS</div>
              <div style={{ fontFamily: IDO.sans, fontSize: 13.5, color: IDO.cream, fontWeight: 500, marginTop: 4 }}>{WEDDING.guestCount} invited</div>
            </div>
          </div>
        </div>

        {/* Overall progress ring */}
        <Card style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <Eyebrow style={{ alignSelf: "flex-start" }}>Overall progress</Eyebrow>
          <Ring pct={62} size={128} sw={11} color={IDO.gold}>
            <span style={{ fontFamily: IDO.serif, fontSize: 38, color: IDO.ink, lineHeight: 1 }}>62</span>
            <span style={{ fontFamily: IDO.mono, fontSize: 9, color: IDO.muted, letterSpacing: "0.1em", marginTop: 2 }}>% COMPLETE</span>
          </Ring>
          <div style={{ fontFamily: IDO.sans, fontSize: 12.5, color: IDO.muted, marginTop: 6, textAlign: "center" }}>
            On track · 18 of 29 tasks done
          </div>
        </Card>
      </div>

      {/* Stat tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 22 }}>
        <StatTile icon="budget" cat="catering" label="Budget used" big={`${budgetPct}%`}
          sub={`${moneyK(totalSpent)} of ${moneyK(BUDGET.total)}`} bar={budgetPct} />
        <StatTile icon="guests" cat="flowers" label="RSVPs in" big={`${GUEST_STATS.attending}`}
          sub={`${GUEST_STATS.awaiting} awaiting reply`} bar={Math.round((GUEST_STATS.attending / GUEST_STATS.invited) * 100)} barColor={IDO.cat.flowers.dot} />
        <StatTile icon="vendors" cat="photo" label="Vendors booked" big={`${vendorsBooked}/${VENDORS.length}`}
          sub="2 in review" bar={Math.round((vendorsBooked / VENDORS.length) * 100)} barColor={IDO.cat.photo.dot} />
        <StatTile icon="timeline" cat="venue" label="Tasks this week" big="4"
          sub="1 due today" bar={25} barColor={IDO.cat.venue.dot} />
      </div>

      {/* Lower row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
        {/* This week */}
        <Card pad={0}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px 14px", borderBottom: `1px solid ${IDO.border}` }}>
            <div style={{ fontFamily: IDO.serif, fontSize: 20, color: IDO.ink }}>This week's focus</div>
            <span onClick={() => nav("timeline")} style={{ fontFamily: IDO.mono, fontSize: 11, color: IDO.gold, letterSpacing: "0.04em", cursor: "pointer" }}>VIEW ALL →</span>
          </div>
          <div style={{ padding: "6px 14px 12px" }}>
            {thisWeek.map((task, i) => {
              const c = catOf(task.cat);
              return (
                <Clickable key={i} onClick={() => nav(task.to)} title={`Go to ${task.to}`}
                  base={{ display: "flex", alignItems: "center", gap: 13, padding: "12px 8px", borderBottom: i < thisWeek.length - 1 ? `1px solid ${IDO.border}` : "none", borderRadius: 10 }}
                  hover={{ background: IDO.surfaceAlt }}>
                  <div style={{ width: 20, height: 20, borderRadius: 7, border: `1.6px solid ${IDO.borderStrong}`, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: IDO.sans, fontSize: 14, color: IDO.ink, fontWeight: 500 }}>{task.t}</div>
                  </div>
                  <Chip bg={c.bg} color={c.ink} dot={c.dot} style={{ fontSize: 11 }}>{catMeta(task.cat).label}</Chip>
                  <span style={{ fontFamily: IDO.mono, fontSize: 10.5, color: task.due === "Today" ? IDO.cat.flowers.ink : IDO.muted, letterSpacing: "0.04em", minWidth: 42, textAlign: "right", fontWeight: task.due === "Today" ? 600 : 400 }}>{task.due.toUpperCase()}</span>
                  <Icon name="chevron-right" size={15} color={IDO.faint} />
                </Clickable>
              );
            })}
          </div>
        </Card>

        {/* Vendor progress + next */}
        <Card pad={0}>
          <div style={{ padding: "18px 22px 14px", borderBottom: `1px solid ${IDO.border}` }}>
            <div style={{ fontFamily: IDO.serif, fontSize: 20, color: IDO.ink }}>Vendor progress</div>
          </div>
          <div style={{ padding: "8px 22px 16px" }}>
            {VENDORS.slice(0, 5).map((v, i) => {
              const c = catOf(v.cat);
              const statusColor = v.status === "booked" ? IDO.cat.venue.ink : v.status === "proposal" ? IDO.gold : IDO.muted;
              return (
                <Clickable key={v.id} onClick={() => nav("vendors")} title={`Open ${v.name}`}
                  base={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 6px", borderBottom: i < 4 ? `1px solid ${IDO.border}` : "none", borderRadius: 9, margin: "0 -6px" }}
                  hover={{ background: IDO.surfaceAlt }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={catMeta(v.cat).icon} size={15} color={c.ink} sw={1.7} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: IDO.sans, fontSize: 13, fontWeight: 600, color: IDO.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.name}</div>
                    <div style={{ fontFamily: IDO.sans, fontSize: 11.5, color: IDO.muted }}>{v.role}</div>
                  </div>
                  <Chip bg="transparent" color={statusColor} dot={statusColor} style={{ padding: "2px 0", fontSize: 11, textTransform: "capitalize" }}>{v.status}</Chip>
                </Clickable>
              );
            })}
          </div>
        </Card>
      </div>
    </ScreenScroll>
  );
}

function StatTile({ icon, cat, label, big, sub, bar, barColor }) {
  const c = catOf(cat);
  return (
    <Card pad={18}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={17} color={c.ink} sw={1.7} />
        </div>
        <Icon name="arrow-up-right" size={15} color={IDO.faint} />
      </div>
      <div style={{ fontFamily: IDO.serif, fontSize: 36, color: IDO.ink, lineHeight: 0.9 }}>{big}</div>
      <div style={{ fontFamily: IDO.sans, fontSize: 12.5, color: IDO.ink70, fontWeight: 500, marginTop: 6 }}>{label}</div>
      <div style={{ fontFamily: IDO.sans, fontSize: 11.5, color: IDO.muted, marginTop: 2, marginBottom: 12 }}>{sub}</div>
      <Bar pct={bar} color={barColor || IDO.gold} track={IDO.surfaceAlt} h={5} />
    </Card>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2 · SMART TIMELINE — the roadmap
// ════════════════════════════════════════════════════════════════════════════
function TimelineScreen({ onNav }) {
  const allTasks = TIMELINE.flatMap((p) => p.tasks);
  const doneCount = allTasks.filter((t) => t.done).length;
  const pct = Math.round((doneCount / allTasks.length) * 100);
  const nav = onNav || (() => {});

  return (
    <ScreenScroll>
      {/* header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 26 }}>
        <div>
          <Eyebrow>The roadmap · not a calendar</Eyebrow>
          <div style={{ fontFamily: IDO.serif, fontSize: 30, color: IDO.ink, marginTop: 8, lineHeight: 1 }}>
            Every milestone, in order.
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: IDO.serif, fontSize: 40, color: IDO.gold, lineHeight: 0.9 }}>{pct}%</div>
          <Eyebrow>{doneCount} of {allTasks.length} done</Eyebrow>
        </div>
      </div>

      {/* roadmap spine */}
      <div style={{ position: "relative", paddingLeft: 4 }}>
        {TIMELINE.map((phase, pi) => {
          const phaseDone = phase.tasks.every((t) => t.done);
          const phaseActive = phase.window === "IN PROGRESS";
          const dotColor = phaseDone ? IDO.gold : phaseActive ? IDO.gold : IDO.borderStrong;
          return (
            <div key={pi} style={{ display: "flex", gap: 24, position: "relative" }}>
              {/* spine */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 18, flexShrink: 0 }}>
                <div style={{ width: 16, height: 16, borderRadius: 999, background: phaseDone ? IDO.gold : IDO.surface, border: `2px solid ${dotColor}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, marginTop: 2 }}>
                  {phaseDone && <Icon name="check" size={9} color={IDO.surface} sw={2.6} />}
                  {phaseActive && <span style={{ width: 6, height: 6, borderRadius: 999, background: IDO.gold }} />}
                </div>
                {pi < TIMELINE.length - 1 && <div style={{ flex: 1, width: 2, background: phaseDone ? IDO.goldLine : IDO.border, marginTop: 2 }} />}
              </div>

              {/* phase content */}
              <div style={{ flex: 1, paddingBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 22, color: phaseDone ? IDO.ink70 : IDO.ink, lineHeight: 1 }}>{phase.phase}</span>
                  <Chip bg={phase.window === "DONE" ? IDO.cat.venue.bg : phase.window === "IN PROGRESS" ? IDO.goldSoft : IDO.surfaceAlt}
                        color={phase.window === "DONE" ? IDO.cat.venue.ink : phase.window === "IN PROGRESS" ? IDO.goldText : IDO.muted}
                        style={{ fontSize: 10 }}>{phase.window}</Chip>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                  {phase.tasks.map((task, ti) => (
                    <Clickable key={ti} onClick={() => nav(task.to)} title={`Go to ${task.to}`}
                      base={{ display: "flex", alignItems: "center", gap: 11, padding: "13px 16px", background: IDO.surface, border: `1px solid ${IDO.border}`, borderRadius: 13, opacity: task.done ? 0.72 : 1, boxShadow: IDO.shadowSm }}
                      hover={{ background: IDO.surfaceAlt, borderColor: IDO.goldLine }}>
                      <div style={{ width: 19, height: 19, borderRadius: 6, flexShrink: 0, background: task.done ? IDO.gold : IDO.surface, border: task.done ? "none" : `1.6px solid ${IDO.borderStrong}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {task.done && <Icon name="check" size={11} color={IDO.surface} sw={2.6} />}
                      </div>
                      <span style={{ flex: 1, fontFamily: IDO.sans, fontSize: 13.5, color: IDO.ink, fontWeight: 500, textDecoration: task.done ? "line-through" : "none", textDecorationColor: IDO.faint }}>{task.t}</span>
                      <Icon name="chevron-right" size={15} color={IDO.faint} />
                    </Clickable>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* finish marker */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <div style={{ width: 18, display: "flex", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: 18, height: 18, borderRadius: 999, background: IDO.dark, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="heart" size={10} color={IDO.gold} sw={2} />
            </div>
          </div>
          <span style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 26, color: IDO.ink }}>The big day.</span>
        </div>
      </div>
    </ScreenScroll>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3 · VENDOR WORKSPACE
// ════════════════════════════════════════════════════════════════════════════
function VendorScreen({ onNav }) {
  const [activeId, setActiveId] = React.useState(VENDORS[0].id);
  const active = VENDORS.find((v) => v.id === activeId) || VENDORS[0];
  const detail = VENDOR_DETAIL[active.id];
  const c = catOf(active.cat);
  const statusColor = active.status === "booked" ? IDO.cat.venue.ink : active.status === "proposal" ? IDO.gold : IDO.muted;
  const statusLabel = active.status.charAt(0).toUpperCase() + active.status.slice(1);
  const paidAmt = Math.round(active.total * active.paid / 100);
  const nextParts = active.next.split(" · ");
  const hasContact = active.contact && active.contact !== "—";
  const contactInitials = hasContact ? active.contact.split(" ").map((w) => w[0]).slice(0, 2).join("") : "?";

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      {/* vendor list */}
      <div className="ido-scroll" style={{ width: 280, flexShrink: 0, borderRight: `1px solid ${IDO.border}`, overflowY: "auto", background: IDO.surface }}>
        <div style={{ padding: "20px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Eyebrow>Vendors · {VENDORS.length}</Eyebrow>
          <Icon name="plus" size={16} color={IDO.gold} sw={2} />
        </div>
        {VENDORS.map((v) => {
          const vc = catOf(v.cat);
          const on = v.id === activeId;
          const sc = v.status === "booked" ? IDO.cat.venue.ink : v.status === "proposal" ? IDO.gold : IDO.muted;
          return (
            <Clickable key={v.id} onClick={() => setActiveId(v.id)} title={`Open ${v.name}`}
              base={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 18px", background: on ? IDO.surfaceAlt : "transparent", borderLeft: on ? `3px solid ${IDO.gold}` : "3px solid transparent" }}
              hover={on ? {} : { background: IDO.bg }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: vc.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={catMeta(v.cat).icon} size={17} color={vc.ink} sw={1.7} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: IDO.sans, fontSize: 13.5, fontWeight: 600, color: IDO.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.name}</div>
                <div style={{ fontFamily: IDO.sans, fontSize: 11.5, color: IDO.muted }}>{v.role}</div>
              </div>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: sc, flexShrink: 0 }} />
            </Clickable>
          );
        })}
      </div>

      {/* vendor detail */}
      <div className="ido-scroll" style={{ flex: 1, overflowY: "auto", background: IDO.bg }}>
        {/* banner */}
        <div style={{ height: 132, background: c.bg, position: "relative", display: "flex", alignItems: "flex-end", padding: 24 }}>
          <Placeholder label="Inspiration cover" h={132} radius={0} style={{ position: "absolute", inset: 0, border: "none", background: c.bg }} />
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: IDO.surface, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: IDO.shadowMd }}>
              <Icon name={catMeta(active.cat).icon} size={30} color={c.ink} sw={1.5} />
            </div>
            <div>
              <Eyebrow color={c.ink}>{active.role}</Eyebrow>
              <div style={{ fontFamily: IDO.serif, fontSize: 30, color: IDO.ink, lineHeight: 1, marginTop: 4 }}>{active.name}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: 28 }}>
          {/* status row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 22 }}>
            <MiniStat label="Status" value={statusLabel} valueColor={statusColor} icon={active.status === "booked" ? "check" : "alert"} />
            {active.paid > 0
              ? <MiniStat label="Payment" value={`${active.paid}% paid`} sub={`${money(paidAmt)} of ${money(active.total)}`} icon="dollar" bar={active.paid} />
              : <MiniStat label="Payment" value="Not yet due" sub={`Est. ${money(active.total)}`} icon="dollar" />}
            <MiniStat label="Next up" value={nextParts[0]} sub={nextParts[1] || "—"} icon="calendar" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 18 }}>
            {/* left col: contract + contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Card pad={20}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ fontFamily: IDO.serif, fontSize: 18, color: IDO.ink }}>Contract & files</div>
                  <Icon name="plus" size={15} color={IDO.muted} />
                </div>
                {detail.files.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderTop: i > 0 ? `1px solid ${IDO.border}` : "none" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: IDO.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="file" size={15} color={IDO.ink70} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: IDO.sans, fontSize: 13, fontWeight: 500, color: IDO.ink }}>{f[0]}</div>
                      <div style={{ fontFamily: IDO.sans, fontSize: 11.5, color: IDO.muted }}>{f[1]}</div>
                    </div>
                    <Icon name="arrow-up-right" size={15} color={IDO.faint} />
                  </div>
                ))}
              </Card>

              <Card pad={20}>
                <div style={{ fontFamily: IDO.serif, fontSize: 18, color: IDO.ink, marginBottom: 14 }}>Contact</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <Avatar initials={contactInitials} size={42} bg={c.bg} color={c.ink} />
                  <div>
                    <div style={{ fontFamily: IDO.sans, fontSize: 14, fontWeight: 600, color: hasContact ? IDO.ink : IDO.muted }}>{hasContact ? active.contact : "To be assigned"}</div>
                    <div style={{ fontFamily: IDO.sans, fontSize: 12, color: IDO.muted }}>{detail.contactRole}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "10px", borderRadius: 10, border: `1px solid ${IDO.border}`, background: IDO.surface, cursor: "pointer", fontFamily: IDO.sans, fontSize: 12.5, fontWeight: 600, color: IDO.ink70 }}>
                    <Icon name="mail" size={15} color={IDO.ink70} /> Email
                  </button>
                  <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "10px", borderRadius: 10, border: `1px solid ${IDO.border}`, background: IDO.surface, cursor: "pointer", fontFamily: IDO.sans, fontSize: 12.5, fontWeight: 600, color: IDO.ink70 }}>
                    <Icon name="phone" size={15} color={IDO.ink70} /> Call
                  </button>
                </div>
              </Card>
            </div>

            {/* right col: inspiration + notes */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Card pad={20}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ fontFamily: IDO.serif, fontSize: 18, color: IDO.ink }}>Inspiration gallery</div>
                  <span style={{ fontFamily: IDO.mono, fontSize: 10.5, color: IDO.gold }}>{detail.gallery.length * 2} PINS</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {detail.gallery.map((l, i) => (
                    <Placeholder key={i} label={l} h={68} radius={9} />
                  ))}
                </div>
              </Card>

              <Card pad={20}>
                <div style={{ fontFamily: IDO.serif, fontSize: 18, color: IDO.ink, marginBottom: 12 }}>Meeting notes</div>
                {detail.notes.map((note, i) => (
                  <div key={i} style={{ paddingLeft: 14, borderLeft: `2px solid ${IDO.goldLine}`, marginBottom: i < detail.notes.length - 1 ? 14 : 0 }}>
                    <Eyebrow>{note[0]}</Eyebrow>
                    <div style={{ fontFamily: IDO.sans, fontSize: 13, color: IDO.ink70, lineHeight: 1.5, marginTop: 4 }}>{note[1]}</div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, sub, valueColor = IDO.ink, icon, bar }) {
  return (
    <Card pad={16}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Icon name={icon} size={15} color={IDO.muted} />
        <Eyebrow>{label}</Eyebrow>
      </div>
      <div style={{ fontFamily: IDO.sans, fontSize: 17, fontWeight: 700, color: valueColor }}>{value}</div>
      {sub && <div style={{ fontFamily: IDO.sans, fontSize: 11.5, color: IDO.muted, marginTop: 2 }}>{sub}</div>}
      {bar != null && <div style={{ marginTop: 10 }}><Bar pct={bar} color={IDO.gold} h={5} /></div>}
    </Card>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4 · BUDGET COMMAND CENTER
// ════════════════════════════════════════════════════════════════════════════
function BudgetScreen() {
  const totalSpent = BUDGET.categories.reduce((s, c) => s + c.spent, 0);
  const totalPlanned = BUDGET.categories.reduce((s, c) => s + c.planned, 0);
  const remaining = BUDGET.total - totalSpent;
  const usedPct = Math.round((totalSpent / BUDGET.total) * 100);

  // donut segments
  let acc = 0;
  const segs = BUDGET.categories.map((cat) => {
    const frac = cat.spent / totalSpent;
    const seg = { key: cat.key, start: acc, frac, color: catOf(cat.key).dot };
    acc += frac;
    return seg;
  });

  // monthly spend trend (mock)
  const trend = [2.1, 3.4, 5.2, 8.8, 6.1, 9.4, 7.0, 4.0];
  const maxTrend = Math.max(...trend);
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

  return (
    <ScreenScroll>
      {/* top: big numbers + donut */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 18 }}>
        <Card pad={26}>
          <Eyebrow>Total budget</Eyebrow>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 8 }}>
            <span style={{ fontFamily: IDO.serif, fontSize: 56, color: IDO.ink, lineHeight: 0.85 }}>{money(BUDGET.total)}</span>
          </div>
          <div style={{ display: "flex", gap: 26, marginTop: 22 }}>
            <div>
              <div style={{ fontFamily: IDO.sans, fontSize: 22, fontWeight: 700, color: IDO.gold }}>{money(totalSpent)}</div>
              <Eyebrow>Spent · {usedPct}%</Eyebrow>
            </div>
            <div style={{ width: 1, background: IDO.border }} />
            <div>
              <div style={{ fontFamily: IDO.sans, fontSize: 22, fontWeight: 700, color: IDO.ink }}>{money(remaining)}</div>
              <Eyebrow>Remaining</Eyebrow>
            </div>
            <div style={{ width: 1, background: IDO.border }} />
            <div>
              <div style={{ fontFamily: IDO.sans, fontSize: 22, fontWeight: 700, color: totalPlanned > BUDGET.total ? IDO.cat.flowers.ink : IDO.cat.venue.ink }}>{moneyK(totalPlanned)}</div>
              <Eyebrow>Forecast</Eyebrow>
            </div>
          </div>
          <div style={{ marginTop: 22 }}>
            <div style={{ display: "flex", height: 12, borderRadius: 8, overflow: "hidden", gap: 2 }}>
              {segs.map((s) => (
                <div key={s.key} style={{ width: `${s.frac * 100}%`, background: s.color }} title={s.key} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <Eyebrow>Allocation by category</Eyebrow>
              <Eyebrow color={IDO.gold}>{moneyK(totalSpent)} committed</Eyebrow>
            </div>
          </div>
        </Card>

        {/* donut */}
        <Card pad={22} style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Ring pct={usedPct} size={130} sw={14} color={IDO.gold} track={IDO.surfaceAlt}>
            <span style={{ fontFamily: IDO.serif, fontSize: 34, color: IDO.ink, lineHeight: 1 }}>{usedPct}%</span>
            <Eyebrow style={{ fontSize: 8.5 }}>USED</Eyebrow>
          </Ring>
          <div style={{ flex: 1 }}>
            <Eyebrow>Health</Eyebrow>
            <div style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 22, color: IDO.cat.venue.ink, lineHeight: 1.1, marginTop: 6 }}>On budget</div>
            <div style={{ fontFamily: IDO.sans, fontSize: 12.5, color: IDO.muted, marginTop: 8, lineHeight: 1.5 }}>
              Forecast is {moneyK(BUDGET.total - totalPlanned)} under. Flowers & attire still have room.
            </div>
          </div>
        </Card>
      </div>

      {/* category breakdown + trend */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <Card pad={0}>
          <div style={{ padding: "18px 22px 12px", borderBottom: `1px solid ${IDO.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: IDO.serif, fontSize: 20, color: IDO.ink }}>By category</div>
            <Eyebrow>Spent / planned</Eyebrow>
          </div>
          <div style={{ padding: "6px 22px 14px" }}>
            {BUDGET.categories.map((cat, i) => {
              const c = catOf(cat.key);
              const pct = Math.round((cat.spent / cat.planned) * 100);
              const over = cat.spent > cat.planned;
              return (
                <div key={cat.key} style={{ padding: "13px 0", borderBottom: i < BUDGET.categories.length - 1 ? `1px solid ${IDO.border}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 9 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={catMeta(cat.key).icon} size={15} color={c.ink} sw={1.7} />
                    </div>
                    <span style={{ flex: 1, fontFamily: IDO.sans, fontSize: 13.5, fontWeight: 600, color: IDO.ink }}>{catMeta(cat.key).label}</span>
                    <span style={{ fontFamily: IDO.sans, fontSize: 13, color: IDO.ink, fontWeight: 600 }}>{money(cat.spent)}</span>
                    <span style={{ fontFamily: IDO.sans, fontSize: 12.5, color: IDO.muted }}>/ {money(cat.planned)}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1 }}><Bar pct={pct} color={c.dot} h={6} over={over} /></div>
                    <span style={{ fontFamily: IDO.mono, fontSize: 10.5, color: pct >= 100 ? IDO.cat.flowers.ink : IDO.muted, minWidth: 34, textAlign: "right" }}>{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* spend trend */}
          <Card pad={20}>
            <div style={{ fontFamily: IDO.serif, fontSize: 18, color: IDO.ink, marginBottom: 4 }}>Spending trend</div>
            <Eyebrow>Monthly · last 8 months</Eyebrow>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, marginTop: 18 }}>
              {trend.map((v, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
                  <div style={{ width: "100%", height: `${(v / maxTrend) * 100}%`, background: i === trend.length - 1 ? IDO.gold : IDO.goldSoft, borderRadius: 5, minHeight: 6 }} />
                  <span style={{ fontFamily: IDO.mono, fontSize: 8.5, color: IDO.faint }}>{months[i]}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* forecast callout */}
          <div style={{ background: IDO.dark, borderRadius: 18, padding: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Icon name="sparkle" size={15} color={IDO.gold} sw={1.8} />
              <Eyebrow color={IDO.gold}>Forecast insight</Eyebrow>
            </div>
            <div style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 20, color: IDO.cream, lineHeight: 1.25 }}>
              "At this pace you'll finish {moneyK(BUDGET.total - totalPlanned)} under budget."
            </div>
            <div style={{ fontFamily: IDO.sans, fontSize: 12.5, color: "rgba(243,238,228,0.6)", lineHeight: 1.5, marginTop: 12 }}>
              Catering is your biggest variable — the final headcount could swing it by {moneyK(1800)}.
            </div>
          </div>
        </div>
      </div>
    </ScreenScroll>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  I DO — people screens: Guest CRM · Seating Builder (draggable) · Day-Of Runbook
// ════════════════════════════════════════════════════════════════════════════

const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
const cat2 = (k) => IDO.cat[k];
const catM = (k) => CATS.find((c) => c.key === k);

const RSVP_STYLE = {
  yes:     { bg: IDO.cat.venue.bg,   ink: IDO.cat.venue.ink,   dot: IDO.cat.venue.dot,   label: "Attending" },
  no:      { bg: IDO.surfaceAlt,     ink: IDO.muted,           dot: IDO.faint,           label: "Declined" },
  maybe:   { bg: IDO.goldSoft,       ink: IDO.goldText,        dot: IDO.gold,            label: "Maybe" },
  pending: { bg: IDO.cat.catering.bg,ink: IDO.cat.catering.ink,dot: IDO.cat.catering.dot,label: "Awaiting" },
};
const SIDE_STYLE = {
  bride: { bg: IDO.cat.flowers.bg, ink: IDO.cat.flowers.ink, dot: IDO.cat.flowers.dot, label: "Maya" },
  groom: { bg: IDO.cat.photo.bg,   ink: IDO.cat.photo.ink,   dot: IDO.cat.photo.dot,   label: "Daniel" },
};

// ════════════════════════════════════════════════════════════════════════════
//  5 · GUEST RELATIONSHIP MANAGER (wedding CRM)
// ════════════════════════════════════════════════════════════════════════════
function GuestScreen() {
  const [filter, setFilter] = React.useState("all");
  const filters = [
    { id: "all", label: "All guests", n: GUEST_STATS.invited },
    { id: "bride", label: "Maya's side", n: GUEST_STATS.brideSide },
    { id: "groom", label: "Daniel's side", n: GUEST_STATS.groomSide },
    { id: "pending", label: "Awaiting reply", n: GUEST_STATS.awaiting },
  ];
  const rows = GUESTS.filter((g) =>
    filter === "all" ? true :
    filter === "pending" ? (g.rsvp === "pending" || g.rsvp === "maybe") :
    g.side === filter
  );
  const displayTotal = (filters.find((f) => f.id === filter) || filters[0]).n;

  return (
    <ScreenScroll pad={0}>
      {/* header */}
      <div style={{ padding: "26px 30px 18px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <Eyebrow>The wedding CRM</Eyebrow>
            <div style={{ fontFamily: IDO.serif, fontSize: 30, color: IDO.ink, marginTop: 8, lineHeight: 1 }}>Guests</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <PrimaryButton dark={false} icon="filter">Segment</PrimaryButton>
            <PrimaryButton dark icon="plus">Add guest</PrimaryButton>
          </div>
        </div>

        {/* summary stat strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
          <SummaryStat big={`${GUEST_STATS.attending}`} label="Attending" tint={IDO.cat.venue} />
          <SummaryStat big={`${GUEST_STATS.awaiting}`} label="Awaiting reply" tint={IDO.cat.catering} />
          <SummaryStat big={`${GUEST_STATS.declined}`} label="Declined" tint={null} />
          <SummaryStat big={`${GUEST_STATS.dietary}`} label="Dietary notes" tint={IDO.cat.flowers} />
        </div>

        {/* filter tabs */}
        <div style={{ display: "flex", gap: 8 }}>
          {filters.map((f) => {
            const on = filter === f.id;
            return (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 999,
                border: `1px solid ${on ? IDO.ink : IDO.border}`, background: on ? IDO.ink : IDO.surface,
                cursor: "pointer", fontFamily: IDO.sans, fontSize: 13, fontWeight: 600, color: on ? IDO.surface : IDO.ink70,
              }}>
                {f.label}
                <span style={{ fontFamily: IDO.mono, fontSize: 10.5, color: on ? "rgba(243,238,228,0.6)" : IDO.muted }}>{f.n}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* table */}
      <div style={{ padding: "0 30px 30px" }}>
        <div style={{ background: IDO.surface, border: `1px solid ${IDO.border}`, borderRadius: 16, overflow: "hidden", boxShadow: IDO.shadowSm }}>
          {/* table head */}
          <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1.2fr 1.3fr 0.7fr 0.8fr 1fr", padding: "12px 20px", borderBottom: `1px solid ${IDO.border}`, background: IDO.surfaceAlt }}>
            {["Guest", "Side", "RSVP", "Dietary", "+1", "Gift", "Table"].map((h) => (
              <Eyebrow key={h} style={{ fontSize: 9.5 }}>{h}</Eyebrow>
            ))}
          </div>
          {rows.map((g, i) => {
            const r = RSVP_STYLE[g.rsvp];
            const s = SIDE_STYLE[g.side];
            const tableName = g.table ? TABLES.find((t) => t.id === g.table)?.name : null;
            return (
              <div key={g.id} style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1.2fr 1.3fr 0.7fr 0.8fr 1fr", padding: "13px 20px", borderBottom: i < rows.length - 1 ? `1px solid ${IDO.border}` : "none", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <Avatar initials={initials(g.name)} size={32} bg={s.bg} color={s.ink} />
                  <span style={{ fontFamily: IDO.sans, fontSize: 14, fontWeight: 600, color: IDO.ink }}>{g.name}</span>
                </div>
                <div><Chip bg={s.bg} color={s.ink} dot={s.dot} style={{ fontSize: 11 }}>{s.label}</Chip></div>
                <div><Chip bg={r.bg} color={r.ink} dot={r.dot} style={{ fontSize: 11 }}>{r.label}</Chip></div>
                <div style={{ fontFamily: IDO.sans, fontSize: 13, color: g.diet === "—" ? IDO.faint : IDO.ink70 }}>{g.diet}</div>
                <div>{g.plus ? <Icon name="check" size={15} color={IDO.cat.venue.ink} sw={2.4} /> : <span style={{ color: IDO.faint }}>—</span>}</div>
                <div>{g.gift ? <Icon name="gift" size={15} color={IDO.gold} sw={1.7} /> : <span style={{ color: IDO.faint }}>—</span>}</div>
                <div style={{ fontFamily: IDO.mono, fontSize: 11.5, color: tableName ? IDO.ink70 : IDO.faint, letterSpacing: "0.02em" }}>{tableName || "Unassigned"}</div>
              </div>
            );
          })}
          {/* pagination footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 20px", borderTop: `1px solid ${IDO.border}`, background: IDO.surfaceAlt }}>
            <span style={{ fontFamily: IDO.sans, fontSize: 12.5, color: IDO.muted }}>
              Showing <b style={{ color: IDO.ink70 }}>1–{rows.length}</b> of <b style={{ color: IDO.ink70 }}>{displayTotal}</b> guests
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${IDO.border}`, background: IDO.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Icon name="chevron-left" size={15} color={IDO.faint} />
              </button>
              {[1, 2, 3].map((p) => (
                <button key={p} style={{ minWidth: 30, height: 30, padding: "0 8px", borderRadius: 8, border: p === 1 ? "none" : `1px solid ${IDO.border}`, background: p === 1 ? IDO.ink : IDO.surface, color: p === 1 ? IDO.surface : IDO.ink70, cursor: "pointer", fontFamily: IDO.sans, fontSize: 12.5, fontWeight: 600 }}>{p}</button>
              ))}
              <span style={{ fontFamily: IDO.sans, fontSize: 12.5, color: IDO.faint, padding: "0 2px" }}>…</span>
              <button style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${IDO.border}`, background: IDO.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Icon name="chevron-right" size={15} color={IDO.ink70} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScreenScroll>
  );
}

function SummaryStat({ big, label, tint }) {
  return (
    <div style={{ background: tint ? tint.bg : IDO.surfaceAlt, borderRadius: 13, padding: "14px 16px" }}>
      <div style={{ fontFamily: IDO.serif, fontSize: 32, color: tint ? tint.ink : IDO.muted, lineHeight: 0.9 }}>{big}</div>
      <div style={{ fontFamily: IDO.sans, fontSize: 12, fontWeight: 600, color: tint ? tint.ink : IDO.muted, marginTop: 6, opacity: 0.85 }}>{label}</div>
    </div>
  );
}

// seated guest avatar with hover-reveal remove button
function SeatedAvatar({ g, cx, cy, isRel, inConflict, onDragStart, onDragEnd, onRemove }) {
  const [hov, setHov] = React.useState(false);
  const s = SIDE_STYLE[g.side];
  return (
    <div title={g.name} draggable
      onDragStart={onDragStart} onDragEnd={() => { setHov(false); onDragEnd(); }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "absolute", left: `calc(50% + ${cx}px)`, top: `calc(50% + ${cy}px)`, transform: "translate(-50%, -50%)", cursor: "grab", zIndex: hov ? 6 : 1 }}>
      <div style={{ position: "relative" }}>
        <Avatar initials={initials(g.name)} size={34} bg={s.bg} color={s.ink}
          style={{ boxShadow: inConflict ? `0 0 0 2px ${IDO.surface}, 0 0 0 4px ${IDO.cat.flowers.dot}` : isRel ? `0 0 0 2px ${IDO.surface}, 0 0 0 4px ${IDO.cat.venue.dot}` : `0 0 0 2px ${IDO.surface}` }} />
        {hov && (
          <button onClick={(e) => { e.stopPropagation(); onRemove(); }} title="Remove from table"
            style={{ position: "absolute", top: -7, right: -7, width: 19, height: 19, borderRadius: 999, background: IDO.ink, border: `2px solid ${IDO.surface}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, zIndex: 7 }}>
            <Icon name="x" size={9} color={IDO.surface} sw={2.8} />
          </button>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  6 · SEATING BUILDER — genuinely draggable, conflict highlighting (HERO)
// ════════════════════════════════════════════════════════════════════════════
function SeatingScreen() {
  // assignment state: guestId -> tableId | null
  const [assign, setAssign] = React.useState(() => {
    const m = {};
    GUESTS.forEach((g) => { m[g.id] = g.table; });
    return m;
  });
  const [dragId, setDragId] = React.useState(null);
  const [overTable, setOverTable] = React.useState(null);
  const [overTray, setOverTray] = React.useState(false);

  const attending = GUESTS.filter((g) => g.rsvp === "yes" || g.rsvp === "maybe");
  const unseated = attending.filter((g) => !assign[g.id]);
  const seatedCount = attending.filter((g) => assign[g.id]).length;

  const guestsAt = (tid) => attending.filter((g) => assign[g.id] === tid);

  // conflict check: is guest gId in conflict with anyone at table tid?
  const conflictAt = (gId, tid) => {
    const here = guestsAt(tid).map((g) => g.id);
    return CONFLICTS.some(([a, b]) =>
      (a === gId && here.includes(b)) || (b === gId && here.includes(a))
    );
  };
  // does table currently HAVE a conflict among seated guests?
  const tableHasConflict = (tid) => {
    const here = guestsAt(tid).map((g) => g.id);
    return CONFLICTS.some(([a, b]) => here.includes(a) && here.includes(b));
  };
  // relative present? (same family group)
  const relativeAt = (gId, tid) => {
    const g = GUESTS.find((x) => x.id === gId);
    return guestsAt(tid).some((x) => x.group === g.group && x.id !== gId);
  };

  const drag = GUESTS.find((g) => g.id === dragId);
  const draggingSeated = drag && assign[dragId];

  const handleDrop = (tid) => {
    if (!dragId) return;
    const here = guestsAt(tid);
    if (here.length >= 8 && assign[dragId] !== tid) { setDragId(null); setOverTable(null); return; }
    setAssign((m) => ({ ...m, [dragId]: tid }));
    setDragId(null); setOverTable(null);
  };
  const handleUnseat = () => {
    if (!dragId) return;
    setAssign((m) => ({ ...m, [dragId]: null }));
    setDragId(null); setOverTable(null);
  };

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      {/* unseated tray (drop target to remove) */}
      <div
        className="ido-scroll"
        onDragOver={(e) => { e.preventDefault(); setOverTray(true); }}
        onDragLeave={() => setOverTray(false)}
        onDrop={() => { handleUnseat(); setOverTray(false); }}
        style={{ width: 224, flexShrink: 0, borderRight: `1px solid ${IDO.border}`, background: overTray && draggingSeated ? IDO.goldSoft : IDO.surface, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: draggingSeated ? `inset 0 0 0 2px ${IDO.goldLine}` : "none", transition: "background 120ms, box-shadow 120ms" }}
      >
        <div style={{ padding: "18px 18px 12px", borderBottom: `1px solid ${IDO.border}` }}>
          <Eyebrow>Unseated</Eyebrow>
          <div style={{ fontFamily: IDO.serif, fontSize: 26, color: IDO.ink, lineHeight: 1, marginTop: 6 }}>{unseated.length} guests</div>
          <div style={{ fontFamily: IDO.sans, fontSize: 11.5, color: draggingSeated ? IDO.goldText : IDO.muted, marginTop: 4, fontWeight: draggingSeated ? 600 : 400 }}>
            {draggingSeated ? "← Drop here to unseat" : "Drag onto a table →"}
          </div>
        </div>
        <div className="ido-scroll ido-noselect" style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
          {unseated.length === 0 && (
            <div style={{ padding: "30px 10px", textAlign: "center", fontFamily: IDO.sans, fontSize: 12.5, color: IDO.muted }}>
              Everyone's seated 🎉
            </div>
          )}
          {unseated.map((g) => {
            const s = SIDE_STYLE[g.side];
            return (
              <div key={g.id}
                draggable
                onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", g.id); setDragId(g.id); }}
                onDragEnd={() => { setDragId(null); setOverTable(null); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", borderRadius: 11,
                  background: dragId === g.id ? IDO.goldSoft : IDO.surface, border: `1px solid ${dragId === g.id ? IDO.goldLine : IDO.border}`,
                  cursor: "grab", boxShadow: IDO.shadowSm,
                }}>
                <Icon name="grip" size={15} color={IDO.faint} />
                <Avatar initials={initials(g.name)} size={28} bg={s.bg} color={s.ink} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: IDO.sans, fontSize: 12.5, fontWeight: 600, color: IDO.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{g.name}</div>
                  <div style={{ fontFamily: IDO.mono, fontSize: 9, color: IDO.muted, letterSpacing: "0.04em", textTransform: "uppercase" }}>{g.group}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* canvas */}
      <div className="ido-scroll" style={{ flex: 1, overflow: "auto", background: IDO.bg, position: "relative" }}>
        {/* canvas header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px 6px" }}>
          <div>
            <Eyebrow>Seating builder</Eyebrow>
            <div style={{ fontFamily: IDO.serif, fontSize: 24, color: IDO.ink, lineHeight: 1, marginTop: 5 }}>The Olive Grove · main hall</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <LegendDot color={IDO.cat.venue.dot} label="Same family" />
            <LegendDot color={IDO.cat.flowers.dot} label="Conflict" />
            <div style={{ fontFamily: IDO.mono, fontSize: 11, color: IDO.gold, letterSpacing: "0.04em" }}>{seatedCount}/{attending.length} SEATED</div>
          </div>
        </div>

        {/* drag hint banner */}
        {drag && (
          <div style={{ margin: "8px 28px 0", padding: "10px 16px", borderRadius: 12, background: IDO.dark, display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="sparkle" size={14} color={IDO.gold} sw={1.8} />
            <span style={{ fontFamily: IDO.sans, fontSize: 12.5, color: IDO.cream }}>
              Placing <b style={{ color: IDO.gold }}>{drag.name}</b> — green tables seat their <b style={{ color: IDO.cat.venue.dot }}>{drag.group}</b> family; red tables have a conflict.
            </span>
          </div>
        )}

        {/* tables grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, padding: 28 }}>
          {TABLES.map((t) => {
            const here = guestsAt(t.id);
            const isOver = overTable === t.id;
            const full = here.length >= 8;
            let glow = "transparent";
            let ring = IDO.border;
            if (drag) {
              if (conflictAt(dragId, t.id)) { glow = IDO.cat.flowers.bg; ring = IDO.cat.flowers.dot; }
              else if (relativeAt(dragId, t.id) && !full) { glow = IDO.cat.venue.bg; ring = IDO.cat.venue.dot; }
              else if (full) { ring = IDO.border; }
            }
            const hasConflict = tableHasConflict(t.id);
            return (
              <div key={t.id}
                onDragOver={(e) => { e.preventDefault(); setOverTable(t.id); }}
                onDragLeave={() => setOverTable((o) => (o === t.id ? null : o))}
                onDrop={() => handleDrop(t.id)}
                style={{
                  position: "relative", background: isOver && glow !== "transparent" ? glow : IDO.surface,
                  border: `1.5px solid ${isOver ? ring : (drag && glow !== "transparent" ? ring : IDO.border)}`,
                  borderRadius: 18, padding: "20px 16px 18px", minHeight: 248,
                  boxShadow: isOver ? IDO.shadowMd : IDO.shadowSm, transition: "background 120ms, border-color 120ms",
                  opacity: drag && full && glow === "transparent" ? 0.55 : 1,
                }}>
                {/* table header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 19, color: IDO.ink }}>{t.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {hasConflict && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 999, background: IDO.cat.flowers.bg }}>
                        <Icon name="alert" size={11} color={IDO.cat.flowers.ink} sw={2} />
                        <span style={{ fontFamily: IDO.mono, fontSize: 9, color: IDO.cat.flowers.ink, letterSpacing: "0.06em" }}>CONFLICT</span>
                      </span>
                    )}
                    <span style={{ fontFamily: IDO.mono, fontSize: 10.5, color: full ? IDO.cat.flowers.ink : IDO.muted }}>{here.length}/8</span>
                  </div>
                </div>

                {/* round table viz */}
                <div style={{ position: "relative", height: 188, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {/* table surface */}
                  <div style={{ width: 88, height: 88, borderRadius: 999, background: IDO.surfaceAlt, border: `1px dashed ${IDO.borderStrong}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="rings" size={22} color={IDO.faint} sw={1.4} />
                  </div>
                  {/* seats around */}
                  {Array.from({ length: 8 }).map((_, si) => {
                    const ang = (si / 8) * Math.PI * 2 - Math.PI / 2;
                    const R = 76;
                    const cx = Math.cos(ang) * R, cy = Math.sin(ang) * R;
                    const g = here[si];
                    if (g) {
                      const isRel = drag && g.group === drag.group && g.id !== dragId;
                      const inConflict = drag && CONFLICTS.some(([a, b]) => (a === dragId && b === g.id) || (b === dragId && a === g.id));
                      return (
                        <SeatedAvatar key={si} g={g} cx={cx} cy={cy} isRel={isRel} inConflict={inConflict}
                          onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", g.id); setDragId(g.id); }}
                          onDragEnd={() => { setDragId(null); setOverTable(null); }}
                          onRemove={() => setAssign((m) => ({ ...m, [g.id]: null }))} />
                      );
                    }
                    return (
                      <div key={si} style={{ position: "absolute", left: `calc(50% + ${cx}px)`, top: `calc(50% + ${cy}px)`, transform: "translate(-50%, -50%)" }}>
                        <div style={{ width: 30, height: 30, borderRadius: 999, border: `1.5px dashed ${isOver && drag && glow === IDO.cat.venue.bg ? IDO.cat.venue.dot : IDO.borderStrong}`, background: IDO.surface }} />
                      </div>
                    );
                  })}
                </div>

                {/* names ticker */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 4, minHeight: 20 }}>
                  {here.map((g) => (
                    <span key={g.id} style={{ fontFamily: IDO.sans, fontSize: 10.5, color: IDO.ink70, background: IDO.surfaceAlt, padding: "2px 7px", borderRadius: 999 }}>{g.name.split(" ")[0]}</span>
                  ))}
                  {here.length === 0 && <span style={{ fontFamily: IDO.sans, fontSize: 11, color: IDO.faint, fontStyle: "italic" }}>Empty — drag guests here</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 9, height: 9, borderRadius: 999, background: color }} />
      <span style={{ fontFamily: IDO.sans, fontSize: 11.5, color: IDO.muted }}>{label}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  7 · WEDDING DAY RUNBOOK — desktop web app
// ════════════════════════════════════════════════════════════════════════════
function WebRunbookScreen() {
  const now = RUNBOOK.find((r) => r.now);
  const upcoming = RUNBOOK.filter((r) => !r.done && !r.now);

  return (
    <div style={{ width: "100%", height: "100%", background: IDO.dark, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: IDO.sans }}>
      {/* Header */}
      <div style={{ padding: "18px 28px 14px", borderBottom: `1px solid ${IDO.darkLine}`, flexShrink: 0, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <Eyebrow color={IDO.gold}>The big day · Sep 12, 2026</Eyebrow>
          <div style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 26, color: IDO.cream, lineHeight: 1, marginTop: 8 }}>Saturday in motion.</div>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: IDO.serif, fontSize: 20, color: IDO.gold, lineHeight: 1 }}>13:00</div>
              <div style={{ fontFamily: IDO.mono, fontSize: 9, color: "rgba(243,238,228,0.5)", letterSpacing: "0.06em", marginTop: 3 }}>NOW · FIRST LOOK</div>
            </div>
            <div style={{ width: 1, background: IDO.darkLine, height: 36 }} />
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: IDO.serif, fontSize: 20, color: IDO.cream, lineHeight: 1 }}>15:00</div>
              <div style={{ fontFamily: IDO.mono, fontSize: 9, color: "rgba(243,238,228,0.5)", letterSpacing: "0.06em", marginTop: 3 }}>NEXT · CEREMONY</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: IDO.cat.venue.dot }} />
            <span style={{ fontFamily: IDO.mono, fontSize: 10, color: "rgba(243,238,228,0.6)", letterSpacing: "0.06em" }}>ALL ON TRACK</span>
          </div>
        </div>
      </div>

      {/* Body: two columns */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left: full timeline list */}
        <div style={{ width: 310, borderRight: `1px solid ${IDO.darkLine}`, flexShrink: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "12px 18px 10px", borderBottom: `1px solid ${IDO.darkLine}`, flexShrink: 0 }}>
            <Eyebrow style={{ color: "rgba(243,238,228,0.38)", fontSize: 9.5 }}>FULL SCHEDULE</Eyebrow>
          </div>
          <div className="ido-scroll" style={{ flex: 1, overflowY: "auto", padding: "8px 10px 16px" }}>
            {RUNBOOK.map((item, i) => {
              const c = cat2(item.cat);
              const isNow = item.now;
              return (
                <div key={i} style={{ display: "flex", gap: 10, position: "relative" }}>
                  <div style={{ width: 42, flexShrink: 0, textAlign: "right", paddingTop: 13 }}>
                    <span style={{ fontFamily: IDO.mono, fontSize: 11, fontWeight: 500, color: isNow ? IDO.gold : item.done ? "rgba(243,238,228,0.3)" : IDO.cream, letterSpacing: "0.02em" }}>{item.time}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 14, flexShrink: 0 }}>
                    <div style={{ marginTop: 15, width: isNow ? 12 : 8, height: isNow ? 12 : 8, borderRadius: 999, background: isNow ? IDO.gold : item.done ? "transparent" : IDO.darkPanel, border: `2px solid ${isNow ? IDO.gold : item.done ? IDO.darkLine : c.dot}`, zIndex: 2, boxShadow: isNow ? `0 0 0 3px rgba(169,128,47,0.2)` : "none" }} />
                    {i < RUNBOOK.length - 1 && <div style={{ flex: 1, width: 2, background: IDO.darkLine, marginTop: 3, minHeight: 22 }} />}
                  </div>
                  <div style={{ flex: 1, paddingTop: 9, paddingBottom: 8 }}>
                    <div style={{ fontFamily: IDO.sans, fontSize: 13, fontWeight: isNow ? 700 : 500, color: isNow ? IDO.gold : item.done ? "rgba(243,238,228,0.3)" : IDO.cream, textDecoration: item.done ? "line-through" : "none", textDecorationColor: "rgba(243,238,228,0.3)" }}>{item.title}</div>
                    <div style={{ fontFamily: IDO.sans, fontSize: 11, color: "rgba(243,238,228,0.38)", marginTop: 2 }}>{item.who}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: detail panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 22px 16px", gap: 14, minWidth: 0 }}>
          {/* NOW card */}
          {now && (
            <div style={{ background: "rgba(169,128,47,0.08)", border: `1px solid rgba(169,128,47,0.28)`, borderRadius: 18, padding: "20px 22px", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <Chip bg={IDO.gold} color={IDO.dark} style={{ fontSize: 10, padding: "4px 10px" }}>NOW</Chip>
                <span style={{ fontFamily: IDO.mono, fontSize: 11, color: "rgba(243,238,228,0.45)", letterSpacing: "0.04em" }}>{now.time}</span>
              </div>
              <div style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 28, color: IDO.cream, lineHeight: 1.1 }}>{now.title}</div>
              <div style={{ fontFamily: IDO.sans, fontSize: 13.5, color: "rgba(243,238,228,0.6)", marginTop: 8 }}>{now.who}</div>
            </div>
          )}

          {/* Up next grid */}
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, minHeight: 0 }}>
            {upcoming.slice(0, 4).map((item, i) => {
              const c = cat2(item.cat);
              const cm = catM(item.cat);
              return (
                <div key={i} style={{ background: IDO.darkPanel, border: `1px solid ${IDO.darkLine}`, borderRadius: 14, padding: "15px 16px", overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 8, background: "rgba(243,238,228,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={cm ? cm.icon : "calendar"} size={13} color={c ? c.dot : IDO.gold} sw={1.8} />
                    </div>
                    <span style={{ fontFamily: IDO.mono, fontSize: 11, color: IDO.gold, letterSpacing: "0.04em" }}>{item.time}</span>
                  </div>
                  <div style={{ fontFamily: IDO.sans, fontSize: 13.5, fontWeight: 600, color: IDO.cream, lineHeight: 1.25 }}>{item.title}</div>
                  <div style={{ fontFamily: IDO.sans, fontSize: 11.5, color: "rgba(243,238,228,0.42)", marginTop: 5 }}>{item.who}</div>
                </div>
              );
            })}
          </div>

          {/* Team strip */}
          <div style={{ borderTop: `1px solid ${IDO.darkLine}`, paddingTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {["LO", "PN", "TB", "+6"].map((x, i) => (
                <div key={i} style={{ marginLeft: i ? -8 : 0, width: 28, height: 28, borderRadius: 999, background: i === 3 ? "rgba(243,238,228,0.1)" : IDO.darkPanel, border: `2px solid ${IDO.dark}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: IDO.sans, fontSize: 10, fontWeight: 700, color: i === 3 ? IDO.gold : IDO.cream }}>{x}</div>
              ))}
              <span style={{ fontFamily: IDO.mono, fontSize: 10, color: "rgba(243,238,228,0.42)", letterSpacing: "0.04em", marginLeft: 12 }}>SHARED WITH 9 VENDORS</span>
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 999, border: `1px solid ${IDO.darkLine}`, background: "transparent", color: IDO.cream, cursor: "pointer", fontFamily: IDO.sans, fontSize: 12, fontWeight: 600 }}>
              <Icon name="share" size={13} color="rgba(243,238,228,0.6)" />
              Share runbook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  7b · WEDDING DAY RUNBOOK (mobile · dark luxe)
// ════════════════════════════════════════════════════════════════════════════
function RunbookScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: IDO.dark, color: IDO.cream, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: IDO.sans }}>
      <PhoneStatusBar dark />
      {/* header */}
      <div style={{ padding: "10px 24px 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Eyebrow color={IDO.gold}>The big day · live</Eyebrow>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: IDO.cat.venue.dot }} />
            <span style={{ fontFamily: IDO.mono, fontSize: 9.5, color: "rgba(243,238,228,0.6)", letterSpacing: "0.06em" }}>ALL ON TRACK</span>
          </div>
        </div>
        <div style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 34, color: IDO.cream, lineHeight: 1, marginTop: 12 }}>
          Saturday<br />in motion.
        </div>
        <div style={{ display: "flex", gap: 18, marginTop: 16 }}>
          <div>
            <div style={{ fontFamily: IDO.serif, fontSize: 22, color: IDO.gold, lineHeight: 1 }}>13:00</div>
            <div style={{ fontFamily: IDO.mono, fontSize: 9, color: "rgba(243,238,228,0.5)", letterSpacing: "0.06em", marginTop: 3 }}>NOW · FIRST LOOK</div>
          </div>
          <div style={{ width: 1, background: IDO.darkLine }} />
          <div>
            <div style={{ fontFamily: IDO.serif, fontSize: 22, color: IDO.cream, lineHeight: 1 }}>15:00</div>
            <div style={{ fontFamily: IDO.mono, fontSize: 9, color: "rgba(243,238,228,0.5)", letterSpacing: "0.06em", marginTop: 3 }}>NEXT · CEREMONY</div>
          </div>
        </div>
      </div>

      {/* timeline */}
      <div className="ido-scroll" style={{ flex: 1, overflowY: "auto", padding: "4px 24px 20px" }}>
        {RUNBOOK.map((item, i) => {
          const c = cat2(item.cat);
          const isNow = item.now;
          return (
            <div key={i} style={{ display: "flex", gap: 14, position: "relative" }}>
              {/* time + spine */}
              <div style={{ width: 46, flexShrink: 0, textAlign: "right", paddingTop: 14 }}>
                <span style={{ fontFamily: IDO.mono, fontSize: 12, fontWeight: 500, color: isNow ? IDO.gold : item.done ? "rgba(243,238,228,0.4)" : IDO.cream, letterSpacing: "0.02em" }}>{item.time}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 16, flexShrink: 0 }}>
                <div style={{ marginTop: 16, width: isNow ? 13 : 9, height: isNow ? 13 : 9, borderRadius: 999, background: isNow ? IDO.gold : item.done ? "transparent" : IDO.darkPanel, border: `2px solid ${isNow ? IDO.gold : item.done ? IDO.darkLine : c.dot}`, zIndex: 2, boxShadow: isNow ? `0 0 0 4px rgba(169,128,47,0.2)` : "none" }} />
                {i < RUNBOOK.length - 1 && <div style={{ flex: 1, width: 2, background: IDO.darkLine, marginTop: 3, minHeight: 28 }} />}
              </div>
              {/* card */}
              <div style={{ flex: 1, marginBottom: 12 }}>
                <div style={{
                  background: isNow ? "rgba(169,128,47,0.10)" : IDO.darkPanel,
                  border: `1px solid ${isNow ? "rgba(169,128,47,0.4)" : IDO.darkLine}`,
                  borderRadius: 14, padding: "13px 15px", opacity: item.done ? 0.55 : 1,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: isNow ? IDO.gold : "rgba(243,238,228,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={catM(item.cat).icon} size={14} color={isNow ? IDO.dark : c.dot} sw={1.8} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: IDO.sans, fontSize: 14, fontWeight: 600, color: IDO.cream, textDecoration: item.done ? "line-through" : "none", textDecorationColor: "rgba(243,238,228,0.3)" }}>{item.title}</div>
                    </div>
                    {isNow && <Chip bg={IDO.gold} color={IDO.dark} style={{ fontSize: 9.5, padding: "3px 8px" }}>NOW</Chip>}
                    {item.done && <Icon name="check" size={15} color="rgba(243,238,228,0.4)" sw={2.2} />}
                  </div>
                  <div style={{ fontFamily: IDO.sans, fontSize: 11.5, color: "rgba(243,238,228,0.55)", marginTop: 6, paddingLeft: 35 }}>{item.who}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* shared footer */}
      <div style={{ padding: "12px 24px 30px", borderTop: `1px solid ${IDO.darkLine}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {["LO", "PN", "TB", "+6"].map((x, i) => (
            <div key={i} style={{ marginLeft: i ? -8 : 0, width: 28, height: 28, borderRadius: 999, background: i === 3 ? "rgba(243,238,228,0.1)" : IDO.darkPanel, border: `2px solid ${IDO.dark}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: IDO.sans, fontSize: 10, fontWeight: 700, color: i === 3 ? IDO.gold : IDO.cream }}>{x}</div>
          ))}
        </div>
        <span style={{ fontFamily: IDO.mono, fontSize: 10, color: "rgba(243,238,228,0.5)", letterSpacing: "0.04em" }}>SHARED WITH 9 VENDORS</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  I DO — Onboarding: Web setup wizard + Mobile join-and-sync companion
// ════════════════════════════════════════════════════════════════════════════

// ─── small form primitives ────────────────────────────────────────────────────
function Field({ label, value, hint, icon, wide = false }) {
  return (
    <div style={{ flex: wide ? "1 1 100%" : 1, minWidth: 0 }}>
      <div style={{ fontFamily: IDO.sans, fontSize: 12, fontWeight: 600, color: IDO.ink70, marginBottom: 7 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, border: `1px solid ${IDO.borderStrong}`, background: IDO.surface }}>
        {icon && <Icon name={icon} size={16} color={IDO.muted} />}
        <span style={{ flex: 1, fontFamily: IDO.sans, fontSize: 14.5, color: IDO.ink, fontWeight: 500 }}>{value}</span>
        {hint && <span style={{ fontFamily: IDO.mono, fontSize: 10, color: IDO.faint, letterSpacing: "0.04em" }}>{hint}</span>}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  WEB ONBOARDING — split-screen setup wizard (no app chrome)
// ════════════════════════════════════════════════════════════════════════════
function WebOnboarding({ onNav }) {
  const [step, setStep] = React.useState(0);
  const nav = onNav || (() => {});
  const steps = [
    { n: "Who's getting married?", k: "The couple" },
    { n: "When & where?",          k: "Date & venue" },
    { n: "What's the budget?",     k: "The budget" },
    { n: "Who's helping plan?",    k: "Your people" },
  ];
  const last = step === steps.length - 1;
  const next = () => { if (last) nav("dashboard"); else setStep((s) => s + 1); };
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: IDO.bg, fontFamily: IDO.sans }}>
      {/* LEFT — dark brand rail */}
      <div style={{ width: 412, flexShrink: 0, background: IDO.dark, color: IDO.cream, padding: "40px 38px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -70, top: -50, width: 240, height: 240, borderRadius: 999, border: `1px solid ${IDO.darkLine}`, opacity: 0.6 }} />
        <div style={{ position: "absolute", right: -30, bottom: -90, width: 200, height: 200, borderRadius: 999, border: `1px solid ${IDO.darkLine}`, opacity: 0.4 }} />
        <div style={{ position: "relative" }}><Wordmark size={24} dark /></div>
        <div style={{ position: "relative", marginTop: 40 }}>
          <Eyebrow color={IDO.gold}>Welcome</Eyebrow>
          <div style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 44, lineHeight: 1.05, color: IDO.cream, marginTop: 14 }}>
            Let's plan<br />your wedding.
          </div>
          <div style={{ fontFamily: IDO.sans, fontSize: 14, color: "rgba(243,238,228,0.62)", lineHeight: 1.6, marginTop: 16, maxWidth: 300 }}>
            A few quick questions and your dashboard, timeline and budget will be ready.
          </div>
        </div>

        {/* step list */}
        <div style={{ position: "relative", marginTop: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
          {steps.map((s, i) => {
            const done = i < step; const on = i === step;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, padding: "10px 0", opacity: done || on ? 1 : 0.45 }}>
                <div style={{ width: 24, height: 24, borderRadius: 999, flexShrink: 0, background: done ? IDO.gold : on ? "transparent" : "transparent", border: done ? "none" : `1.5px solid ${on ? IDO.gold : IDO.darkLine}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {done ? <Icon name="check" size={12} color={IDO.dark} sw={2.6} /> : <span style={{ fontFamily: IDO.mono, fontSize: 11, color: on ? IDO.gold : "rgba(243,238,228,0.6)" }}>{i + 1}</span>}
                </div>
                <span style={{ fontFamily: IDO.sans, fontSize: 13.5, fontWeight: on ? 600 : 500, color: on ? IDO.cream : "rgba(243,238,228,0.75)" }}>{s.k}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT — form */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "44px 56px", minWidth: 0 }}>
        {/* progress */}
        <div style={{ marginBottom: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
            <Eyebrow>Step {step + 1} of {steps.length}</Eyebrow>
            <Eyebrow color={IDO.goldText}>{Math.round(((step + 1) / steps.length) * 100)}%</Eyebrow>
          </div>
          <Bar pct={((step + 1) / steps.length) * 100} color={IDO.gold} h={6} />
        </div>

        <div style={{ fontFamily: IDO.serif, fontSize: 34, color: IDO.ink, lineHeight: 1.05, marginBottom: 28 }}>{steps[step].n}</div>

        {/* step body */}
        <div style={{ flex: 1 }}>
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 520 }}>
              <div style={{ display: "flex", gap: 16 }}>
                <Field label="Partner one" value="Maya Cohen" icon="heart" />
                <Field label="Partner two" value="Daniel Stern" icon="heart" />
              </div>
              <Field label="Wedding name (optional)" value="Maya & Daniel" hint="URL: ido.studio/maya-daniel" wide />
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderRadius: 12, background: IDO.goldSoft, border: `1px solid ${IDO.goldLine}` }}>
                <Icon name="sparkle" size={16} color={IDO.goldText} sw={1.8} />
                <span style={{ fontFamily: IDO.sans, fontSize: 13, color: IDO.goldText, lineHeight: 1.4 }}>We'll create a shared space only you and your invited collaborators can see.</span>
              </div>
            </div>
          )}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 520 }}>
              <Field label="Wedding date" value={WEDDING.date} hint={WEDDING.daysUntil + " DAYS"} icon="calendar" wide />
              <div style={{ display: "flex", gap: 16 }}>
                <Field label="Venue" value={WEDDING.venue} icon="pin" />
                <Field label="City" value={WEDDING.city} icon="pin" />
              </div>
              <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                {["Set later", "Still deciding", "Multiple sites"].map((t) => (
                  <Chip key={t} bg={IDO.surfaceAlt} color={IDO.ink70}>{t}</Chip>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div style={{ maxWidth: 560 }}>
              <div style={{ fontFamily: IDO.sans, fontSize: 12, fontWeight: 600, color: IDO.ink70, marginBottom: 7 }}>Total budget</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderRadius: 14, border: `1px solid ${IDO.borderStrong}`, background: IDO.surface, marginBottom: 22 }}>
                <span style={{ fontFamily: IDO.serif, fontSize: 40, color: IDO.ink, lineHeight: 1 }}>{money(BUDGET.total)}</span>
                <span style={{ fontFamily: IDO.mono, fontSize: 11, color: IDO.muted, marginLeft: "auto" }}>NIS</span>
              </div>
              <div style={{ fontFamily: IDO.sans, fontSize: 12, fontWeight: 600, color: IDO.ink70, marginBottom: 12 }}>We'll track these categories</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {CATS.map((c) => {
                  const t = IDO.cat[c.key];
                  return (
                    <div key={c.key} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 13px", borderRadius: 999, background: t.bg }}>
                      <Icon name={c.icon} size={14} color={t.ink} sw={1.7} />
                      <span style={{ fontFamily: IDO.sans, fontSize: 13, fontWeight: 600, color: t.ink }}>{c.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {step === 3 && (
            <div style={{ display: "flex", gap: 30, maxWidth: 620 }}>
              {/* collaborators */}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: IDO.sans, fontSize: 12, fontWeight: 600, color: IDO.ink70, marginBottom: 12 }}>Invited so far</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {COLLABORATORS.map((c) => {
                    const tint = c.side === "bride" ? IDO.cat.flowers : IDO.cat.photo;
                    return (
                      <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 11px", borderRadius: 11, border: `1px solid ${IDO.border}`, background: IDO.surface }}>
                        <Avatar initials={c.initials} size={32} bg={tint.bg} color={tint.ink} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: IDO.sans, fontSize: 13.5, fontWeight: 600, color: IDO.ink }}>{c.name}</div>
                          <div style={{ fontFamily: IDO.sans, fontSize: 11.5, color: IDO.muted }}>{c.role}</div>
                        </div>
                        <Icon name="check" size={15} color={IDO.cat.venue.ink} sw={2.2} />
                      </div>
                    );
                  })}
                  <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 11px", borderRadius: 11, border: `1.5px dashed ${IDO.borderStrong}`, cursor: "pointer" }}>
                    <Icon name="plus" size={15} color={IDO.muted} />
                    <span style={{ fontFamily: IDO.sans, fontSize: 13, fontWeight: 600, color: IDO.muted }}>Invite by email</span>
                  </div>
                </div>
              </div>

              {/* sync code card */}
              <div style={{ width: 248, flexShrink: 0 }}>
                <div style={{ background: IDO.dark, borderRadius: 16, padding: 22, color: IDO.cream }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon name="phone" size={15} color={IDO.gold} sw={1.8} />
                    <Eyebrow color={IDO.gold}>Sync the mobile app</Eyebrow>
                  </div>
                  <div style={{ fontFamily: IDO.sans, fontSize: 12.5, color: "rgba(243,238,228,0.62)", lineHeight: 1.5, marginTop: 10 }}>
                    Collaborators enter this code in the I DO app to see the live day-of runbook.
                  </div>
                  {/* QR-ish glyph */}
                  <div style={{ display: "flex", justifyContent: "center", margin: "18px 0" }}>
                    <div style={{ width: 92, height: 92, borderRadius: 12, background: IDO.cream, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridTemplateRows: "repeat(5,1fr)", gap: 3, padding: 10 }}>
                      {Array.from({ length: 25 }).map((_, i) => {
                        const on = [0,1,2,4,5,7,9,10,12,14,15,17,19,20,21,22,24].includes(i);
                        return <div key={i} style={{ background: on ? IDO.dark : "transparent", borderRadius: 2 }} />;
                      })}
                    </div>
                  </div>
                  <div style={{ textAlign: "center", fontFamily: IDO.mono, fontSize: 18, fontWeight: 600, letterSpacing: "0.22em", color: IDO.gold }}>{SYNC_CODE}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 30, paddingTop: 22, borderTop: `1px solid ${IDO.border}` }}>
          <button onClick={back} style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 16px", borderRadius: 999, border: "none", background: "transparent", cursor: step === 0 ? "default" : "pointer", opacity: step === 0 ? 0.4 : 1, fontFamily: IDO.sans, fontSize: 14, fontWeight: 600, color: IDO.ink70 }}>
            <Icon name="chevron-left" size={16} color={IDO.ink70} /> Back
          </button>
          <button onClick={next} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 999, border: "none", background: IDO.ink, color: IDO.surface, cursor: "pointer", fontFamily: IDO.sans, fontSize: 14, fontWeight: 600 }}>
            {last ? "Open dashboard" : "Continue"}
            <Icon name={last ? "arrow-right" : "chevron-right"} size={16} color={IDO.surface} sw={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  MOBILE ONBOARDING — join & sync companion (dark luxe)
// ════════════════════════════════════════════════════════════════════════════
function MobileOnboarding({ onNav }) {
  const nav = onNav || (() => {});
  const [mstep, setMstep] = React.useState(0); // 0 welcome · 1 code · 2 synced
  const [role, setRole] = React.useState("Partner");
  const codeChars = SYNC_CODE.replace("-", "").split("");

  return (
    <div style={{ width: "100%", height: "100%", background: IDO.dark, color: IDO.cream, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: IDO.sans }}>
      <PhoneStatusBar dark />

      {/* WELCOME */}
      {mstep === 0 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 30px 34px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -80, top: 20, width: 220, height: 220, borderRadius: 999, border: `1px solid ${IDO.darkLine}`, opacity: 0.5 }} />
          <div style={{ position: "relative", marginTop: 8 }}><Wordmark size={22} dark /></div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
            <div style={{ display: "flex", marginBottom: 26 }}>
              <Avatar initials="M" size={62} bg={IDO.cat.flowers.bg} color={IDO.cat.flowers.ink} style={{ boxShadow: `0 0 0 3px ${IDO.dark}` }} />
              <Avatar initials="D" size={62} bg={IDO.cat.photo.bg} color={IDO.cat.photo.ink} style={{ marginLeft: -18, boxShadow: `0 0 0 3px ${IDO.dark}` }} />
            </div>
            <Eyebrow color={IDO.gold}>You're invited</Eyebrow>
            <div style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 38, lineHeight: 1.08, color: IDO.cream, marginTop: 12 }}>
              Help plan Maya &amp; Daniel's wedding.
            </div>
            <div style={{ fontFamily: IDO.sans, fontSize: 14, color: "rgba(243,238,228,0.6)", lineHeight: 1.6, marginTop: 14 }}>
              Pair this phone to their plan to see the shared timeline and day-of runbook.
            </div>
          </div>
          <button onClick={() => setMstep(1)} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px", borderRadius: 999, border: "none", background: IDO.gold, color: IDO.dark, cursor: "pointer", fontFamily: IDO.sans, fontSize: 15, fontWeight: 700 }}>
            Join the plan <Icon name="arrow-right" size={17} color={IDO.dark} sw={2} />
          </button>
        </div>
      )}

      {/* CODE ENTRY */}
      {mstep === 1 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 30px 34px" }}>
          <button onClick={() => setMstep(0)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, color: "rgba(243,238,228,0.6)", fontFamily: IDO.sans, fontSize: 13, fontWeight: 600, alignSelf: "flex-start" }}>
            <Icon name="chevron-left" size={16} color="rgba(243,238,228,0.6)" /> Back
          </button>
          <div style={{ marginTop: 30 }}>
            <Eyebrow color={IDO.gold}>Enter invite code</Eyebrow>
            <div style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 30, color: IDO.cream, lineHeight: 1.1, marginTop: 12 }}>
              Sync to the plan
            </div>
            <div style={{ fontFamily: IDO.sans, fontSize: 13.5, color: "rgba(243,238,228,0.6)", lineHeight: 1.55, marginTop: 10 }}>
              Find this 6-digit code in your invite, or on the couple's dashboard under <b style={{ color: IDO.cream }}>Share</b>.
            </div>
          </div>
          {/* code boxes */}
          <div style={{ display: "flex", gap: 9, marginTop: 30 }}>
            {codeChars.map((ch, i) => (
              <div key={i} style={{ flex: 1, aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 13, background: IDO.darkPanel, border: `1.5px solid ${i === codeChars.length - 1 ? IDO.gold : IDO.darkLine}`, fontFamily: IDO.mono, fontSize: 24, fontWeight: 600, color: IDO.cream }}>
                {ch}
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <button onClick={() => setMstep(2)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px", borderRadius: 999, border: "none", background: IDO.gold, color: IDO.dark, cursor: "pointer", fontFamily: IDO.sans, fontSize: 15, fontWeight: 700 }}>
            <Icon name="link" size={17} color={IDO.dark} sw={2} /> Sync now
          </button>
        </div>
      )}

      {/* SYNCED */}
      {mstep === 2 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 26px 34px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 18 }}>
            <div style={{ width: 56, height: 56, borderRadius: 999, background: "rgba(95,161,123,0.16)", border: `1.5px solid ${IDO.cat.venue.dot}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="check" size={26} color={IDO.cat.venue.dot} sw={2.4} />
            </div>
            <div style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 28, color: IDO.cream, marginTop: 16, whiteSpace: "nowrap" }}>You're synced</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, padding: "5px 11px", borderRadius: 999, background: IDO.darkPanel, border: `1px solid ${IDO.darkLine}` }}>
              <Icon name="link" size={11} color={IDO.gold} sw={2} />
              <span style={{ fontFamily: IDO.mono, fontSize: 10, color: "rgba(243,238,228,0.7)", letterSpacing: "0.06em" }}>SYNCED FROM WEB · {SYNC_CODE}</span>
            </div>
          </div>

          {/* synced wedding card — same data as the web setup */}
          <div style={{ marginTop: 22, background: IDO.darkPanel, border: `1px solid ${IDO.darkLine}`, borderRadius: 18, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex" }}>
                <Avatar initials="M" size={34} bg={IDO.cat.flowers.bg} color={IDO.cat.flowers.ink} style={{ boxShadow: `0 0 0 2px ${IDO.darkPanel}` }} />
                <Avatar initials="D" size={34} bg={IDO.cat.photo.bg} color={IDO.cat.photo.ink} style={{ marginLeft: -10, boxShadow: `0 0 0 2px ${IDO.darkPanel}` }} />
              </div>
              <div>
                <div style={{ fontFamily: IDO.sans, fontSize: 15, fontWeight: 700, color: IDO.cream, whiteSpace: "nowrap" }}>Maya &amp; Daniel</div>
                <div style={{ fontFamily: IDO.mono, fontSize: 10, color: "rgba(243,238,228,0.55)", letterSpacing: "0.04em", marginTop: 2 }}>{WEDDING.daysUntil} DAYS TO GO</div>
              </div>
            </div>
            <div style={{ height: 1, background: IDO.darkLine, margin: "16px 0" }} />
            {[
              { icon: "calendar", l: "Date", v: "Sep 12, 2026" },
              { icon: "pin", l: "Venue", v: WEDDING.venue },
              { icon: "guests", l: "Guests", v: GUEST_STATS.invited + " invited" },
            ].map((r) => (
              <div key={r.l} style={{ display: "flex", alignItems: "center", gap: 11, padding: "7px 0" }}>
                <Icon name={r.icon} size={15} color={IDO.gold} sw={1.7} />
                <span style={{ flex: 1, fontFamily: IDO.sans, fontSize: 12.5, color: "rgba(243,238,228,0.6)" }}>{r.l}</span>
                <span style={{ fontFamily: IDO.sans, fontSize: 13, fontWeight: 600, color: IDO.cream }}>{r.v}</span>
              </div>
            ))}
          </div>

          {/* role */}
          <div style={{ marginTop: 20 }}>
            <Eyebrow color="rgba(243,238,228,0.5)">I'm joining as</Eyebrow>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              {["Partner", "Planner", "Vendor"].map((r) => {
                const on = role === r;
                return (
                  <button key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: "11px 0", borderRadius: 11, border: `1.5px solid ${on ? IDO.gold : IDO.darkLine}`, background: on ? "rgba(169,128,47,0.12)" : "transparent", color: on ? IDO.gold : "rgba(243,238,228,0.7)", cursor: "pointer", fontFamily: IDO.sans, fontSize: 13, fontWeight: 600 }}>{r}</button>
                );
              })}
            </div>
          </div>

          <div style={{ flex: 1 }} />
          <button onClick={() => nav("runbook")} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px", borderRadius: 999, border: "none", background: IDO.gold, color: IDO.dark, cursor: "pointer", fontFamily: IDO.sans, fontSize: 15, fontWeight: 700 }}>
            Open day-of runbook <Icon name="arrow-right" size={17} color={IDO.dark} sw={2} />
          </button>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  I DO — Wireframe Viewer: Gallery (all screens live at once) + Focus modes
// ════════════════════════════════════════════════════════════════════════════

const SCREENS = [
  { id: "onboarding", label: "Onboarding", sub: "First-run setup — names, date, budget, invite & sync", surface: "desktop", chrome: false, crumb: "Setup", component: WebOnboarding },
  { id: "dashboard", label: "Dashboard",  sub: "Mission control — the whole wedding at a glance", surface: "desktop", crumb: "Dashboard",  component: DashboardScreen },
  { id: "timeline",  label: "Timeline",   sub: "The roadmap — milestones, not just dates",        surface: "desktop", crumb: "Timeline",   component: TimelineScreen },
  { id: "vendors",   label: "Vendors",    sub: "A dedicated workspace for every vendor",          surface: "desktop", crumb: "Vendors / Aperture & Vine", component: VendorScreen },
  { id: "budget",    label: "Budget",     sub: "Command center for the money — data, forecasts",  surface: "desktop", crumb: "Budget",     component: BudgetScreen },
  { id: "guests",    label: "Guests",     sub: "A CRM for everyone you love",                     surface: "desktop", crumb: "Guests",     component: GuestScreen },
  { id: "seating",   label: "Seating",    sub: "Drag-and-drop tables with live conflict checks",  surface: "desktop", crumb: "Seating",    component: SeatingScreen },
  { id: "onboarding-m", label: "Join & Sync", sub: "Companion onboarding — pair to the couple's plan", surface: "mobile", component: MobileOnboarding },
  { id: "runbook",      label: "Day-Of",     sub: "A live, shared runbook for the wedding day", surface: "mobile", component: RunbookScreen },
];

const NAV_ICON = { onboarding: "sparkle", dashboard: "dashboard", timeline: "timeline", vendors: "vendors", budget: "budget", guests: "guests", seating: "seating", "onboarding-m": "share", runbook: "runbook" };

const FRAME = {
  desktop: { w: 1180, h: 760 },
  mobile:  { w: 384,  h: 812 },
};

// slim app bar (breadcrumb + chrome) for desktop screens
function AppBar({ crumb }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 24px", borderBottom: `1px solid ${IDO.border}`, background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: IDO.sans, fontSize: 13 }}>
        <span style={{ color: IDO.muted }}>Maya & Daniel</span>
        <span style={{ color: IDO.faint }}>/</span>
        <span style={{ color: IDO.ink, fontWeight: 600 }}>{crumb}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: 999, background: IDO.dark, color: IDO.cream }}>
          <Icon name="heart" size={12} color={IDO.gold} sw={1.8} />
          <span style={{ fontFamily: IDO.mono, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.04em" }}>{WEDDING.daysUntil} DAYS</span>
        </div>
        <button style={{ width: 34, height: 34, borderRadius: 999, border: `1px solid ${IDO.border}`, background: IDO.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="search" size={16} color={IDO.ink70} />
        </button>
        <button style={{ width: 34, height: 34, borderRadius: 999, border: `1px solid ${IDO.border}`, background: IDO.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
          <Icon name="bell" size={16} color={IDO.ink70} />
          <span style={{ position: "absolute", top: 8, right: 9, width: 6, height: 6, borderRadius: 999, background: IDO.cat.flowers.dot, boxShadow: `0 0 0 2px ${IDO.surface}` }} />
        </button>
        <div style={{ display: "flex", alignItems: "center", marginLeft: 2 }}>
          <Avatar initials="LO" size={28} bg={IDO.cat.photo.bg} color={IDO.cat.photo.ink} style={{ boxShadow: `0 0 0 2px ${IDO.surface}` }} />
          <Avatar initials="PN" size={28} bg={IDO.cat.venue.bg} color={IDO.cat.venue.ink} style={{ marginLeft: -8, boxShadow: `0 0 0 2px ${IDO.surface}` }} />
          <div style={{ marginLeft: 8, display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 999, border: `1px solid ${IDO.border}`, cursor: "pointer" }}>
            <Icon name="share" size={13} color={IDO.ink70} />
            <span style={{ fontFamily: IDO.sans, fontSize: 12, fontWeight: 600, color: IDO.ink70 }}>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopComposition({ screen, active, onNav }) {
  const Screen = screen.component;
  if (screen.chrome === false) {
    return (
      <BrowserFrame>
        <Screen onNav={onNav} />
      </BrowserFrame>
    );
  }
  return (
    <BrowserFrame>
      <Sidebar active={active} onNav={onNav} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: IDO.bg }}>
        <AppBar crumb={screen.crumb} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Screen onNav={onNav} />
        </div>
      </div>
    </BrowserFrame>
  );
}

function MobileComposition({ screen, onNav }) {
  const Screen = screen.component;
  return (
    <PhoneFrame dark>
      <Screen onNav={onNav} />
    </PhoneFrame>
  );
}

// renders the right composition for a screen
function Composition({ screen, onNav }) {
  return screen.surface === "desktop"
    ? <DesktopComposition screen={screen} active={screen.id} onNav={onNav} />
    : <MobileComposition screen={screen} onNav={onNav} />;
}

// a live scaled frame at a given scale
function ScaledFrame({ screen, scale, onNav }) {
  const f = FRAME[screen.surface];
  return (
    <div style={{ width: f.w * scale, height: f.h * scale, position: "relative", flexShrink: 0 }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: f.w, height: f.h }}>
        <Composition screen={screen} onNav={onNav} />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  GALLERY — every screen, live, at the same time
// ════════════════════════════════════════════════════════════════════════════
function Gallery({ onFocus, refs }) {
  const desktop = SCREENS.filter((s) => s.surface === "desktop");
  const mobile = SCREENS.filter((s) => s.surface === "mobile");
  const dScale = 0.46;
  const mScale = 0.62;

  const scrollTo = (id) => {
    const el = refs.current[id];
    if (el) el.scrollIntoView ? el.scrollIntoView({ behavior: "smooth", block: "center" }) : null;
  };

  return (
    <div style={{ width: "100%", maxWidth: 1240, margin: "0 auto" }}>
      {/* WEB APP section */}
      <SectionHeader kicker="Web app · desktop" title="The planning OS" count={desktop.length} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "center", marginBottom: 56 }}>
        {desktop.map((s, i) => (
          <GalleryCard key={s.id} screen={s} index={SCREENS.indexOf(s)} scale={dScale}
            cardRef={(el) => (refs.current[s.id] = el)}
            onFocus={() => onFocus(SCREENS.indexOf(s))} onNav={scrollTo} />
        ))}
      </div>

      {/* MOBILE section */}
      <SectionHeader kicker="Mobile companion" title="Shared on the day" count={mobile.length} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "center", alignItems: "flex-start" }}>
        {mobile.map((s) => (
          <GalleryCard key={s.id} screen={s} index={SCREENS.indexOf(s)} scale={mScale}
            cardRef={(el) => (refs.current[s.id] = el)}
            onFocus={() => onFocus(SCREENS.indexOf(s))} onNav={scrollTo} />
        ))}
        {/* companion note */}
        <div style={{ width: 300, alignSelf: "center", padding: "0 8px" }}>
          <Eyebrow color={IDO.gold}>Why a separate surface</Eyebrow>
          <div style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 26, color: IDO.cream, lineHeight: 1.2, marginTop: 12 }}>
            The day-of runbook goes dark and mobile.
          </div>
          <div style={{ fontFamily: IDO.sans, fontSize: 13.5, color: "#7C7986", lineHeight: 1.6, marginTop: 14 }}>
            Couples plan at a desk, but on the wedding day everyone — planner, photographer, caterer — is on their phone. The runbook is the one screen they all share, designed for glances in low light.
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ kicker, title, count }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", maxWidth: 1180, margin: "0 auto 26px", paddingBottom: 16, borderBottom: "1px solid #211E27" }}>
      <div>
        <div style={{ fontFamily: IDO.mono, fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: IDO.gold, marginBottom: 8 }}>{kicker.toUpperCase()}</div>
        <div style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 30, color: IDO.cream, lineHeight: 1 }}>{title}</div>
      </div>
      <div style={{ fontFamily: IDO.mono, fontSize: 11, color: "#55525C" }}>{String(count).padStart(2, "0")} {count === 1 ? "SCREEN" : "SCREENS"}</div>
    </div>
  );
}

function GalleryCard({ screen, index, scale, onFocus, onNav, cardRef }) {
  const f = FRAME[screen.surface];
  const [hov, setHov] = React.useState(false);
  return (
    <div ref={cardRef} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ scrollMarginTop: 30 }}>
      {/* caption */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, width: f.w * scale }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 9, minWidth: 0 }}>
          <span style={{ fontFamily: IDO.mono, fontSize: 10.5, color: "#55525C" }}>{String(index + 1).padStart(2, "0")}</span>
          <span style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 21, color: IDO.cream, lineHeight: 1, whiteSpace: "nowrap" }}>{screen.label}</span>
        </div>
        <button onClick={onFocus} title="Open full size" style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 999, border: "1px solid #2A2730", background: hov ? "#1E1A12" : "transparent", color: hov ? IDO.gold : "#7C7986", cursor: "pointer", transition: "all 140ms", flexShrink: 0 }}>
          <Icon name="arrow-up-right" size={12} color={hov ? IDO.gold : "#7C7986"} sw={2} />
          <span style={{ fontFamily: IDO.mono, fontSize: 9, letterSpacing: "0.08em" }}>FOCUS</span>
        </button>
      </div>
      {/* live frame */}
      <div style={{ borderRadius: screen.surface === "mobile" ? 36 : 16, transition: "transform 160ms ease", transform: hov ? "translateY(-3px)" : "none" }}>
        <ScaledFrame screen={screen} scale={scale} onNav={onNav} />
      </div>
      {/* sub caption */}
      <div style={{ width: f.w * scale, fontFamily: IDO.sans, fontSize: 12, color: "#6C6975", marginTop: 12, lineHeight: 1.45 }}>{screen.sub}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  FOCUS — single screen, big, with carousel nav
// ════════════════════════════════════════════════════════════════════════════
function Focus({ idx, setIdx, onExit }) {
  const screen = SCREENS[idx];
  const stageRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  const f = FRAME[screen.surface];

  React.useEffect(() => {
    const update = () => {
      if (!stageRef.current) return;
      const availW = stageRef.current.offsetWidth - 32;
      const availH = stageRef.current.offsetHeight - 32;
      const s = Math.min(1, availW / f.w, availH / f.h);
      setScale(s > 0 ? s : 1);
    };
    update();
    const ro = new ResizeObserver(update);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, [f.w, f.h]);

  const go = (i) => setIdx(Math.max(0, Math.min(SCREENS.length - 1, i)));

  return (
    <div style={{ width: "100%", maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* label bar */}
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <button onClick={onExit} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 11px 5px 8px", borderRadius: 999, border: "1px solid #2A2730", background: "#16131C", color: "#9C99A6", cursor: "pointer", fontFamily: IDO.mono, fontSize: 9.5, letterSpacing: "0.08em", marginBottom: 12 }}>
            <Icon name="chevron-left" size={13} color="#9C99A6" /> ALL SCREENS
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "nowrap" }}>
            <span style={{ fontFamily: IDO.serif, fontStyle: "italic", fontSize: 26, color: IDO.cream, lineHeight: 1, whiteSpace: "nowrap", paddingRight: 4 }}>{screen.label}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px", borderRadius: 999, border: `1px solid ${IDO.darkLine}` }}>
              <Icon name={screen.surface === "desktop" ? "dashboard" : "runbook"} size={11} color="#8C8992" />
              <span style={{ fontFamily: IDO.mono, fontSize: 9, color: "#8C8992", letterSpacing: "0.08em" }}>{screen.surface === "desktop" ? "WEB APP" : "MOBILE"}</span>
            </span>
          </div>
          <div style={{ fontFamily: IDO.sans, fontSize: 13, color: "#7C7986", marginTop: 6, maxWidth: 540 }}>{screen.sub}</div>
        </div>
        <div style={{ fontFamily: IDO.mono, fontSize: 11, color: "#55525C", paddingTop: 4 }}>
          {String(idx + 1).padStart(2, "0")} / {String(SCREENS.length).padStart(2, "0")}
        </div>
      </div>

      {/* stage */}
      <div ref={stageRef} style={{ width: "100%", height: 770, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ width: f.w * scale, height: f.h * scale }}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: f.w, height: f.h }}>
            <Composition screen={screen} onNav={(id) => go(SCREENS.findIndex((s) => s.id === id))} />
          </div>
        </div>
      </div>

      {/* nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 28 }}>
        <NavArrow dir="left" disabled={idx === 0} onClick={() => go(idx - 1)} />
        <div style={{ display: "flex", gap: 7 }}>
          {SCREENS.map((s, i) => (
            <button key={s.id} onClick={() => go(i)} title={s.label} style={{ width: i === idx ? 22 : 7, height: 7, borderRadius: 4, background: i === idx ? IDO.gold : "#2A2730", border: "none", cursor: "pointer", transition: "all 0.25s ease", padding: 0 }} />
          ))}
        </div>
        <NavArrow dir="right" disabled={idx === SCREENS.length - 1} onClick={() => go(idx + 1)} />
      </div>
    </div>
  );
}

function NavArrow({ dir, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid #26232C", background: disabled ? "transparent" : "#1A1722", color: disabled ? "#3A3842" : IDO.cream, cursor: disabled ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name={dir === "left" ? "chevron-left" : "chevron-right"} size={18} color={disabled ? "#3A3842" : IDO.cream} />
    </button>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  ROOT
// ════════════════════════════════════════════════════════════════════════════
function Viewer() {
  React.useEffect(() => {
    if (!document.getElementById("ido-fonts")) {
      const l = document.createElement("link");
      l.id = "ido-fonts";
      l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..600&family=Hanken+Grotesk:ital,wght@0,300..800;1,400..600&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  // Initial screen from ?start= query param, defaulting to web onboarding
  const initialId = React.useMemo(() => {
    if (typeof window === "undefined") return "onboarding";
    const p = new URLSearchParams(window.location.search).get("start");
    if (p && SCREENS.some((s) => s.id === p)) return p;
    return "onboarding";
  }, []);
  const [activeId, setActiveId] = React.useState(initialId);
  const screen = SCREENS.find((s) => s.id === activeId) || SCREENS[0];
  const f = FRAME[screen.surface] || FRAME["desktop"];
  const stageRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const update = () => {
      if (!stageRef.current) return;
      const w = stageRef.current.offsetWidth;
      const h = stageRef.current.offsetHeight;
      const s = Math.min(w / f.w, h / f.h);
      setScale(s > 0 ? s : 1);
    };
    update();
    const ro = new ResizeObserver(update);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [f.w, f.h]);

  return (
    <div ref={stageRef} style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: IDO.bg, overflow: "hidden" }}>
      <div style={{ width: f.w * scale, height: f.h * scale, position: "relative", flexShrink: 0 }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: f.w, height: f.h }}>
          <Composition screen={screen} onNav={(id) => { const s = SCREENS.find((x) => x.id === id); if (s) setActiveId(id); }} />
        </div>
      </div>
    </div>
  );
}

export default function WireframeViewer() {
  return <Viewer />;
}


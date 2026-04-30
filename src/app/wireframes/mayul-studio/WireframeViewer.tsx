"use client";
import { useState } from "react";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const MS = {
  parchment: "#F4EFEA",
  warmGold: "#C8A96E",
  goldLight: "#DFC090",
  goldDark: "#A8893E",
  ink: "#1A1714",
  stone: "#8C8680",
  dust: "#E8E5DF",
  bg: "#0D0B09",
  serif: '"Georgia", "Times New Roman", serif',
  sans: 'system-ui, -apple-system, "Helvetica Neue", sans-serif',
};

// ─── Shared ───────────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: MS.sans, fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", color: MS.stone, textTransform: "uppercase" as const }}>
      {children}
    </div>
  );
}

function ArtboardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "24px 40px 0", marginBottom: 32, borderBottom: `1px solid ${MS.dust}`, paddingBottom: 16 }}>
      <div>
        <Label>Mayul Studio · Brand Identity</Label>
        <div style={{ fontFamily: MS.serif, fontSize: 20, color: MS.ink, marginTop: 5 }}>{title}</div>
      </div>
      {subtitle && <div style={{ fontFamily: MS.sans, fontSize: 11, color: MS.stone }}>{subtitle}</div>}
    </div>
  );
}

// M mark as SVG path – stylised double-stroke M
function MMark({ size = 48, color = MS.ink }: { size?: number; color?: string }) {
  const s = size / 48;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M6 38V10L24 30L42 10V38"
        stroke={color}
        strokeWidth={2.5 * (1 / s)}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M6 10L24 30L42 10"
        stroke={color}
        strokeWidth={1 * (1 / s)}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
}

// ─── Artboards ────────────────────────────────────────────────────────────────
function ColorSystemScreen() {
  const swatches = [
    { hex: MS.parchment, name: "Parchment", role: "Primary background", dark: false },
    { hex: MS.warmGold,  name: "Warm Gold", role: "Accent — use sparingly", dark: false },
    { hex: MS.ink,       name: "Ink",       role: "Text · logo · line work", dark: true  },
    { hex: MS.stone,     name: "Stone",     role: "Secondary copy", dark: true  },
    { hex: MS.dust,      name: "Dust",      role: "Borders · dividers", dark: false },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: MS.parchment, display: "flex", flexDirection: "column", fontFamily: MS.sans }}>
      <ArtboardHeader title="Colour System" subtitle="Five roles, zero decoration" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 40px 32px", gap: 24 }}>
        {/* Swatch row */}
        <div style={{ display: "flex", gap: 0, borderRadius: 8, overflow: "hidden", height: 200 }}>
          {swatches.map((sw, i) => (
            <div key={i} style={{ flex: 1, background: sw.hex, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "16px 18px", borderRight: i < 4 ? `1px solid ${sw.dark ? "#ffffff22" : "#00000010"}` : "none" }}>
              <div style={{ fontFamily: MS.serif, fontSize: 15, color: sw.dark ? MS.parchment : MS.ink, marginBottom: 4 }}>{sw.name}</div>
              <div style={{ fontFamily: MS.sans, fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", color: sw.dark ? `${MS.parchment}99` : MS.stone, marginBottom: 4 }}>{sw.hex}</div>
              <div style={{ fontFamily: MS.sans, fontSize: 10, color: sw.dark ? `${MS.parchment}77` : MS.stone, lineHeight: 1.4 }}>{sw.role}</div>
            </div>
          ))}
        </div>
        {/* In-context strip */}
        <div style={{ display: "flex", gap: 20 }}>
          {/* Business card */}
          <div style={{ width: 280, height: 160, background: MS.ink, borderRadius: 6, padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0, boxShadow: "0 8px 32px rgba(26,23,20,0.3)" }}>
            <div style={{ fontFamily: MS.serif, fontSize: 18, color: MS.parchment, letterSpacing: "-0.01em" }}>mayul studio</div>
            <div>
              <div style={{ fontFamily: MS.sans, fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", color: MS.warmGold, marginBottom: 4 }}>MAYA BRENNER</div>
              <div style={{ fontFamily: MS.sans, fontSize: 9, color: `${MS.parchment}55` }}>Tel Aviv · mayulstudio.com</div>
            </div>
          </div>
          {/* Parchment card */}
          <div style={{ width: 280, height: 160, background: MS.parchment, border: `1px solid ${MS.dust}`, borderRadius: 6, padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0, boxShadow: "0 4px 16px rgba(26,23,20,0.08)" }}>
            <MMark size={28} color={MS.ink} />
            <div>
              <div style={{ fontFamily: MS.serif, fontSize: 14, color: MS.ink, marginBottom: 4 }}>mayul studio</div>
              <div style={{ width: 40, height: 1, background: MS.warmGold }} />
            </div>
          </div>
          {/* Principle text */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 20px" }}>
            <div style={{ fontFamily: MS.serif, fontSize: 15, color: MS.ink, lineHeight: 1.6, marginBottom: 12 }}>
              "The palette is built around the warmth of paper stock, not the clinical white of most stationery brands."
            </div>
            <div style={{ fontFamily: MS.sans, fontSize: 10, color: MS.stone }}>Each colour has a specific role. None are decorative.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoPrimaryScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: MS.parchment, display: "flex", flexDirection: "column", fontFamily: MS.sans }}>
      <ArtboardHeader title="Primary Wordmark" subtitle="Modified serif · tightened tracking" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 40px 32px", gap: 20 }}>
        {/* Hero wordmark */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${MS.dust}`, borderRadius: 6 }}>
          <div style={{ textAlign: "center" as const }}>
            <div style={{ fontFamily: MS.serif, fontSize: 72, fontWeight: 400, color: MS.ink, letterSpacing: "-0.04em", lineHeight: 1 }}>mayul studio</div>
            <div style={{ width: 120, height: 1, background: MS.warmGold, margin: "20px auto 0" }} />
          </div>
        </div>
        {/* Three colourways */}
        <div style={{ display: "flex", gap: 12, height: 80 }}>
          {[
            { bg: MS.parchment, fg: MS.ink, border: MS.dust, label: "Primary — on Parchment" },
            { bg: MS.ink, fg: MS.parchment, border: "transparent", label: "Reversed — on Ink" },
            { bg: MS.warmGold, fg: MS.ink, border: "transparent", label: "Gold application" },
          ].map((c, i) => (
            <div key={i} style={{ flex: 1, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 6, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <div style={{ fontFamily: MS.serif, fontSize: 20, color: c.fg, letterSpacing: "-0.03em" }}>mayul studio</div>
              <div style={{ fontFamily: MS.sans, fontSize: 9, letterSpacing: "0.08em", color: c.fg, opacity: 0.5 }}>{c.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogoSecondaryScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: MS.parchment, display: "flex", flexDirection: "column", fontFamily: MS.sans }}>
      <ArtboardHeader title="Secondary Mark" subtitle="Stamp · emboss · favicon" />
      <div style={{ flex: 1, display: "flex", padding: "0 40px 32px", gap: 24 }}>
        {/* Large mark */}
        <div style={{ flex: 1, border: `1px solid ${MS.dust}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <MMark size={160} color={MS.ink} />
        </div>
        {/* Applications */}
        <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 14 }}>
          <Label>Applications</Label>
          {/* Wax seal */}
          <div style={{ background: MS.dust, borderRadius: 6, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: MS.warmGold, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)" }}>
              <MMark size={28} color={MS.ink} />
            </div>
            <div>
              <div style={{ fontFamily: MS.sans, fontSize: 12, fontWeight: 600, color: MS.ink }}>Wax seal</div>
              <div style={{ fontFamily: MS.sans, fontSize: 10, color: MS.stone }}>52mm · pressed in gold</div>
            </div>
          </div>
          {/* Emboss */}
          <div style={{ background: MS.parchment, border: `1px solid ${MS.dust}`, borderRadius: 6, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, border: `1px solid ${MS.dust}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MMark size={28} color={`${MS.ink}40`} />
            </div>
            <div>
              <div style={{ fontFamily: MS.sans, fontSize: 12, fontWeight: 600, color: MS.ink }}>Blind emboss</div>
              <div style={{ fontFamily: MS.sans, fontSize: 10, color: MS.stone }}>5mm depth on box lid</div>
            </div>
          </div>
          {/* Sizes */}
          <div style={{ background: MS.dust, borderRadius: 6, padding: "16px 20px" }}>
            <Label>Size range</Label>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginTop: 14 }}>
              {[12, 20, 32, 48, 72].map(sz => (
                <div key={sz} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <MMark size={sz} color={MS.ink} />
                  <div style={{ fontFamily: MS.sans, fontSize: 8, color: MS.stone }}>{sz}px</div>
                </div>
              ))}
            </div>
          </div>
          {/* Favicon */}
          <div style={{ background: MS.parchment, border: `1px solid ${MS.dust}`, borderRadius: 6, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            {[32, 16].map(sz => (
              <div key={sz} style={{ width: sz + 12, height: sz + 12, background: MS.ink, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MMark size={sz - 4} color={MS.parchment} />
              </div>
            ))}
            <div>
              <div style={{ fontFamily: MS.sans, fontSize: 12, fontWeight: 600, color: MS.ink }}>Favicon / app icon</div>
              <div style={{ fontFamily: MS.sans, fontSize: 10, color: MS.stone }}>32px · 16px</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoScaleScreen() {
  const sizes = [
    { label: "5mm emboss", px: 14, note: "Minimum" },
    { label: "16px", px: 16, note: "Favicon" },
    { label: "32px", px: 32, note: "App icon" },
    { label: "64px", px: 64, note: "Header" },
    { label: "120px", px: 120, note: "Print" },
    { label: "400px", px: null, note: "Display" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: MS.parchment, display: "flex", flexDirection: "column", fontFamily: MS.sans }}>
      <ArtboardHeader title="Scale Test — Print to Digital" subtitle="If it breaks at either extreme, the form isn't right yet" />
      <div style={{ flex: 1, padding: "0 40px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Wordmark scale row */}
        <div style={{ border: `1px solid ${MS.dust}`, borderRadius: 6, flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "flex-start", gap: 40, padding: "24px 40px" }}>
          {sizes.map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
              <div style={{ fontFamily: MS.serif, fontSize: s.px ?? 180, color: MS.ink, lineHeight: 1, letterSpacing: "-0.03em", whiteSpace: "nowrap" as const }}>
                {s.px && s.px <= 32 ? "M" : s.px === 64 ? "mayul" : s.px === 120 ? "mayul" : "mayul studio"}
              </div>
              <div>
                <div style={{ fontFamily: MS.sans, fontSize: 9, fontWeight: 700, color: MS.ink }}>{s.label}</div>
                <div style={{ fontFamily: MS.sans, fontSize: 9, color: MS.stone }}>{s.note}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Rule */}
        <div style={{ background: `${MS.warmGold}20`, border: `1px solid ${MS.warmGold}50`, borderRadius: 6, padding: "12px 20px" }}>
          <div style={{ fontFamily: MS.serif, fontSize: 13, color: MS.ink, lineHeight: 1.5 }}>
            Rule: the mark must be legible at 5mm emboss depth. If the stroke weight collapses or the counter fills in, revise the form — not the minimum size.
          </div>
        </div>
      </div>
    </div>
  );
}

function TypographySpecimenScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: MS.parchment, display: "flex", flexDirection: "column", fontFamily: MS.sans }}>
      <ArtboardHeader title="Typography" subtitle="Serif leads — sans supports. Never reversed." />
      <div style={{ flex: 1, display: "flex", padding: "0 40px 32px", gap: 32 }}>
        {/* Left: serif */}
        <div style={{ flex: 1, border: `1px solid ${MS.dust}`, borderRadius: 6, padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <Label>Primary · Editorial Serif</Label>
            <div style={{ fontFamily: MS.serif, fontSize: 64, color: MS.ink, lineHeight: 1, marginTop: 16, letterSpacing: "-0.02em" }}>Aa</div>
            <div style={{ fontFamily: MS.serif, fontSize: 18, color: MS.ink, marginTop: 16, lineHeight: 1.4 }}>
              ABCDEFGHIJKLMabcdefghijklm<br />
              NnOoPpQqRrSsTtUuVvWwXxYyZz
            </div>
          </div>
          <div>
            <div style={{ width: "100%", height: 1, background: MS.dust, margin: "20px 0" }} />
            <div style={{ fontFamily: MS.serif, fontSize: 22, color: MS.ink, lineHeight: 1.4, marginBottom: 8 }}>
              Quiet luxury in every detail.
            </div>
            <div style={{ fontFamily: MS.serif, fontSize: 15, color: MS.stone, lineHeight: 1.6 }}>
              For product names, campaign headlines, and anywhere the brand speaks with voice.
            </div>
          </div>
          <div style={{ background: MS.dust, borderRadius: 4, padding: "10px 14px", marginTop: 16 }}>
            <Label>Use for: product names · headlines · quotes</Label>
          </div>
        </div>
        {/* Right: sans */}
        <div style={{ flex: 1, border: `1px solid ${MS.dust}`, borderRadius: 6, padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <Label>Secondary · Geometric Sans</Label>
            <div style={{ fontFamily: MS.sans, fontSize: 64, color: MS.ink, lineHeight: 1, marginTop: 16, fontWeight: 300 }}>Aa</div>
            <div style={{ fontFamily: MS.sans, fontSize: 14, color: MS.ink, marginTop: 16, lineHeight: 1.8, letterSpacing: "0.06em", fontWeight: 400 }}>
              ABCDEFGHIJKLM abcdefghijklm<br />
              NOPQRSTUVWXYZ nopqrstuvwxyz
            </div>
          </div>
          <div>
            <div style={{ width: "100%", height: 1, background: MS.dust, margin: "20px 0" }} />
            <div style={{ fontFamily: MS.sans, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: MS.ink, lineHeight: 1.6, marginBottom: 8 }}>
              PRODUCT CODE · MS-NK-001<br />
              250gsm · A5 · NATURAL WHITE
            </div>
            <div style={{ fontFamily: MS.sans, fontSize: 13, color: MS.stone, lineHeight: 1.6 }}>
              Product codes, labels, pricing, and all UI. The contrast between the two faces creates hierarchy without size or colour changes.
            </div>
          </div>
          <div style={{ background: MS.dust, borderRadius: 4, padding: "10px 14px", marginTop: 16 }}>
            <Label>Use for: codes · labels · pricing · UI copy</Label>
          </div>
        </div>
      </div>
    </div>
  );
}

function PackagingHeroScreen() {
  // Five packaging items shown as flat/angled simplified shapes
  const items = [
    { label: "Gift box", w: 160, h: 200 },
    { label: "Envelope", w: 200, h: 140 },
    { label: "Tissue wrap", w: 220, h: 160 },
    { label: "Hang tag", w: 80, h: 140 },
    { label: "Paper bag", w: 140, h: 200 },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: MS.dust, display: "flex", flexDirection: "column", fontFamily: MS.sans }}>
      <div style={{ padding: "18px 40px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: `1px solid ${MS.parchment}60` }}>
        <div>
          <Label>Mayul Studio · Packaging System</Label>
          <div style={{ fontFamily: MS.serif, fontSize: 18, color: MS.ink, marginTop: 4 }}>Full Packaging Lineup</div>
        </div>
        <div style={{ fontFamily: MS.sans, fontSize: 10, color: MS.stone }}>All elements · same type · colour · spacing rules</div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 28, padding: "0 40px" }}>
        {/* Gift box */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ width: 160, height: 200, background: MS.parchment, border: `1px solid ${MS.warmGold}60`, borderRadius: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "20px 16px", boxShadow: "4px 4px 0 rgba(26,23,20,0.08)" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: 40, height: 1.5, background: MS.warmGold }} />
            </div>
            <div style={{ textAlign: "center" as const }}>
              <MMark size={36} color={MS.ink} />
            </div>
            <div style={{ textAlign: "center" as const, width: "100%", borderTop: `1px solid ${MS.dust}`, paddingTop: 10 }}>
              <div style={{ fontFamily: MS.serif, fontSize: 11, color: MS.ink, letterSpacing: "-0.01em" }}>mayul studio</div>
              <div style={{ fontFamily: MS.sans, fontSize: 8, color: MS.stone, letterSpacing: "0.1em", marginTop: 2 }}>TEL AVIV</div>
            </div>
          </div>
          <Label>Gift box</Label>
        </div>
        {/* Envelope */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ width: 200, height: 140, background: MS.parchment, border: `1px solid ${MS.dust}`, borderRadius: 2, position: "relative", boxShadow: "4px 4px 0 rgba(26,23,20,0.06)" }}>
            {/* Envelope flap */}
            <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} viewBox="0 0 200 140">
              <polygon points="0,0 100,80 200,0" fill={MS.dust} stroke="none"/>
              <line x1="0" y1="0" x2="100" y2="80" stroke={MS.warmGold} strokeWidth="0.5" opacity="0.5"/>
              <line x1="200" y1="0" x2="100" y2="80" stroke={MS.warmGold} strokeWidth="0.5" opacity="0.5"/>
            </svg>
            <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)" }}>
              <div style={{ fontFamily: MS.sans, fontSize: 9, letterSpacing: "0.1em", color: MS.stone, textAlign: "center" as const }}>MS · TEL AVIV</div>
            </div>
            {/* Wax seal */}
            <div style={{ position: "absolute", top: 58, left: "50%", transform: "translateX(-50%)", width: 28, height: 28, borderRadius: "50%", background: MS.warmGold, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MMark size={14} color={MS.ink} />
            </div>
          </div>
          <Label>Envelope</Label>
        </div>
        {/* Tissue wrap */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ width: 220, height: 160, background: MS.parchment, border: `1px dashed ${MS.warmGold}60`, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "4px 4px 0 rgba(26,23,20,0.05)" }}>
            {/* Repeating tiny M pattern */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.07 }}>
              {Array.from({ length: 5 }).map((_, row) =>
                Array.from({ length: 6 }).map((_, col) => (
                  <div key={`${row}-${col}`} style={{ position: "absolute", left: col * 38 - 10, top: row * 32 - 6 }}>
                    <MMark size={18} color={MS.ink} />
                  </div>
                ))
              )}
            </div>
            <div style={{ position: "relative", fontFamily: MS.serif, fontSize: 13, color: MS.ink, textAlign: "center" as const, lineHeight: 1.4 }}>
              mayul studio<br />
              <span style={{ fontSize: 9, fontFamily: MS.sans, letterSpacing: "0.1em", color: MS.stone }}>TISSUE PAPER</span>
            </div>
          </div>
          <Label>Tissue wrap</Label>
        </div>
        {/* Hang tag */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 2, height: 20, background: MS.stone, opacity: 0.3 }} />
            <div style={{ width: 80, height: 140, background: MS.ink, borderRadius: "3px 3px 2px 2px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "16px 10px", boxShadow: "3px 3px 0 rgba(26,23,20,0.15)" }}>
              <MMark size={24} color={MS.parchment} />
              <div style={{ textAlign: "center" as const }}>
                <div style={{ fontFamily: MS.serif, fontSize: 10, color: MS.parchment, lineHeight: 1.4 }}>mayul<br />studio</div>
                <div style={{ width: 24, height: 0.5, background: MS.warmGold, margin: "6px auto" }} />
                <div style={{ fontFamily: MS.sans, fontSize: 7, color: `${MS.parchment}66`, letterSpacing: "0.1em" }}>TEL AVIV</div>
              </div>
            </div>
          </div>
          <Label>Hang tag</Label>
        </div>
        {/* Paper bag */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ width: 140, height: 190, background: MS.parchment, border: `1px solid ${MS.warmGold}50`, borderRadius: "2px 2px 0 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "5px 5px 0 rgba(26,23,20,0.08)" }}>
            {/* Handle */}
            <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", width: 60, height: 14, borderTop: "2px solid " + MS.warmGold, borderLeft: "2px solid " + MS.warmGold, borderRight: "2px solid " + MS.warmGold, borderRadius: "4px 4px 0 0" }} />
            <div style={{ textAlign: "center" as const }}>
              <MMark size={32} color={MS.ink} />
              <div style={{ fontFamily: MS.serif, fontSize: 11, color: MS.ink, marginTop: 8 }}>mayul studio</div>
              <div style={{ width: 32, height: 0.5, background: MS.warmGold, margin: "6px auto" }} />
            </div>
          </div>
          <Label>Paper bag</Label>
        </div>
      </div>
    </div>
  );
}

function PackagingEnvelopeScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: MS.parchment, display: "flex", flexDirection: "column", fontFamily: MS.sans }}>
      <div style={{ padding: "20px 32px 16px", borderBottom: `1px solid ${MS.dust}`, display: "flex", justifyContent: "space-between" }}>
        <div>
          <Label>Mayul Studio · Packaging Detail</Label>
          <div style={{ fontFamily: MS.serif, fontSize: 18, color: MS.ink, marginTop: 4 }}>Envelope System</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", padding: "24px 32px", gap: 20 }}>
        {/* Outer envelope */}
        <div style={{ flex: 1, border: `1px solid ${MS.dust}`, borderRadius: 4, overflow: "hidden", position: "relative", background: MS.parchment }}>
          <svg width="100%" height="100%" viewBox="0 0 280 300" style={{ position: "absolute", inset: 0 }}>
            {/* Liner — inside visible at top when flap open */}
            <rect width="280" height="300" fill={MS.parchment}/>
            {/* Liner peek */}
            <rect x="0" y="0" width="280" height="110" fill="#E8DCC4" opacity="0.6"/>
            {/* Flap */}
            <polygon points="0,0 140,120 280,0" fill={MS.warmGold} opacity="0.25"/>
            <polygon points="0,0 140,120 280,0" fill="none" stroke={MS.warmGold} strokeWidth="0.8" opacity="0.5"/>
            {/* Seal */}
            <circle cx="140" cy="118" r="20" fill={MS.warmGold}/>
            <text x="140" y="115" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fill={MS.ink} fontWeight="400">M</text>
            <text x="140" y="127" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5" fill={MS.ink} opacity="0.6">MAYUL</text>
            {/* Address area */}
            <rect x="60" y="190" width="160" height="1" fill={MS.dust}/>
            <rect x="60" y="210" width="130" height="1" fill={MS.dust}/>
            <rect x="60" y="228" width="100" height="1" fill={MS.dust}/>
            <text x="60" y="174" fontFamily="Georgia, serif" fontSize="9" fill={MS.stone}>To:</text>
          </svg>
          <div style={{ position: "absolute", bottom: 20, right: 20 }}>
            <Label>Outer · A5 · 120gsm</Label>
          </div>
        </div>
        {/* Liner detail */}
        <div style={{ flex: 1, border: `1px solid ${MS.dust}`, borderRadius: 4, background: "#E8DCC4", display: "flex", flexDirection: "column", padding: "24px 24px" }}>
          <Label>Envelope liner detail</Label>
          {/* Repeating pattern */}
          <div style={{ flex: 1, marginTop: 12, position: "relative", overflow: "hidden", borderRadius: 2 }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.18 }}>
              {Array.from({ length: 6 }).map((_, row) =>
                Array.from({ length: 4 }).map((_, col) => (
                  <div key={`${row}-${col}`} style={{ position: "absolute", left: col * 56, top: row * 40 }}>
                    <MMark size={22} color={MS.ink} />
                  </div>
                ))
              )}
            </div>
            <div style={{ position: "absolute", bottom: 16, left: 16 }}>
              <div style={{ fontFamily: MS.serif, fontSize: 11, color: MS.ink }}>mayul studio</div>
              <div style={{ fontFamily: MS.sans, fontSize: 8, letterSpacing: "0.1em", color: MS.stone, marginTop: 2 }}>TEL AVIV · EST. 2020</div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <Label>Inside liner · pattern repeat · warm cream</Label>
          </div>
        </div>
      </div>
    </div>
  );
}

function PackagingLabelScreen() {
  const labels = [
    { size: "Large", w: 160, h: 100, code: "MS-NK-001", product: "Notecard Set", weight: "250gsm · Natural" },
    { size: "Small", w: 100, h: 60, code: "MS-NB-002", product: "Notebook A5", weight: "120gsm" },
    { size: "Tag", w: 70, h: 110, code: "MS-TG-003", product: "Gift Tag", weight: "300gsm" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: "#F0ECE5", display: "flex", flexDirection: "column", fontFamily: MS.sans }}>
      <div style={{ padding: "20px 32px 16px", background: MS.parchment, borderBottom: `1px solid ${MS.dust}`, display: "flex", justifyContent: "space-between" }}>
        <div>
          <Label>Mayul Studio · Packaging Detail</Label>
          <div style={{ fontFamily: MS.serif, fontSize: 18, color: MS.ink, marginTop: 4 }}>Product Label System</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, padding: "24px 32px" }}>
        <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
          {labels.map((l, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{ width: l.w, height: l.h, background: MS.parchment, border: `1px solid ${MS.warmGold}60`, borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px 14px", boxShadow: "2px 2px 8px rgba(26,23,20,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontFamily: MS.serif, fontSize: l.size === "Tag" ? 8 : 10, color: MS.ink }}>{l.product}</div>
                  <MMark size={l.size === "Tag" ? 10 : 14} color={MS.ink} />
                </div>
                <div>
                  <div style={{ width: "100%", height: 0.5, background: MS.warmGold, marginBottom: 6, opacity: 0.6 }} />
                  <div style={{ fontFamily: MS.sans, fontSize: l.size === "Tag" ? 6 : 8, letterSpacing: "0.1em", color: MS.stone }}>{l.code}</div>
                  {l.size !== "Tag" && <div style={{ fontFamily: MS.sans, fontSize: 7, color: `${MS.stone}80`, marginTop: 2 }}>{l.weight}</div>}
                </div>
              </div>
              <Label>{l.size} label</Label>
            </div>
          ))}
        </div>
        {/* Rule strip */}
        <div style={{ background: MS.parchment, border: `1px solid ${MS.dust}`, borderRadius: 6, padding: "14px 24px", width: "100%", maxWidth: 440 }}>
          <Label>Label system rules</Label>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
            {["Serif for product name — sans for codes and specs", "Gold rule divides name from data — always 0.5pt", "M mark always top-right — never scaled below 10px"].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: MS.warmGold, marginTop: 5, flexShrink: 0 }} />
                <div style={{ fontFamily: MS.sans, fontSize: 11, color: MS.ink, lineHeight: 1.4 }}>{r}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StationerySetScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#EDE9E2", display: "flex", flexDirection: "column", fontFamily: MS.sans }}>
      <div style={{ padding: "18px 40px 14px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", background: MS.parchment, borderBottom: `1px solid ${MS.dust}` }}>
        <div>
          <Label>Mayul Studio · Stationery & Print</Label>
          <div style={{ fontFamily: MS.serif, fontSize: 18, color: MS.ink, marginTop: 4 }}>Complete Stationery Set</div>
        </div>
        <div style={{ fontFamily: MS.sans, fontSize: 10, color: MS.stone }}>Notecards · envelopes · wax seals · tissue</div>
      </div>
      <div style={{ flex: 1, padding: "32px 48px", display: "flex", gap: 24, alignItems: "center" }}>
        {/* Left: notecard stack */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative", width: 200, height: 140 }}>
            {[3, 2, 1, 0].map(offset => (
              <div key={offset} style={{ position: "absolute", top: offset * 3, left: offset * 3, width: 200, height: 140, background: offset === 0 ? MS.parchment : "#F0EBE2", border: `1px solid ${MS.dust}`, borderRadius: 2, display: offset === 0 ? "flex" : "block", flexDirection: "column" as const, justifyContent: "space-between" as const, padding: offset === 0 ? "18px 20px" : undefined }}>
                {offset === 0 && <>
                  <MMark size={20} color={MS.ink} />
                  <div>
                    <div style={{ width: 40, height: 0.5, background: MS.warmGold, marginBottom: 8 }} />
                    <div style={{ fontFamily: MS.serif, fontSize: 11, color: MS.ink }}>mayul studio</div>
                    <div style={{ fontFamily: MS.sans, fontSize: 8, letterSpacing: "0.1em", color: MS.stone, marginTop: 2 }}>TEL AVIV</div>
                  </div>
                </>}
              </div>
            ))}
          </div>
          <Label>A6 Notecards (stack of 10)</Label>
        </div>
        {/* Center: envelope + seal */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative", width: 220, height: 155 }}>
            <div style={{ width: 220, height: 155, background: MS.parchment, border: `1px solid ${MS.dust}`, borderRadius: 2 }}>
              <svg width="220" height="155" viewBox="0 0 220 155">
                <polygon points="0,0 110,90 220,0" fill={MS.dust} opacity="0.7"/>
                <circle cx="110" cy="88" r="16" fill={MS.warmGold}/>
                <text x="110" y="84" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7" fill={MS.ink}>M</text>
                <text x="110" y="95" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4" fill={MS.ink} opacity="0.7">MAYUL</text>
              </svg>
            </div>
          </div>
          <Label>Envelope with wax seal</Label>
        </div>
        {/* Right: composition elements */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Tissue paper swatch */}
          <div style={{ height: 80, background: MS.parchment, border: `1px dashed ${MS.warmGold}50`, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
              {Array.from({ length: 4 }).map((_, r) =>
                Array.from({ length: 8 }).map((_, c) => (
                  <div key={`${r}-${c}`} style={{ position: "absolute", left: c * 32, top: r * 24 }}>
                    <MMark size={14} color={MS.ink} />
                  </div>
                ))
              )}
            </div>
            <div style={{ position: "relative", fontFamily: MS.sans, fontSize: 9, letterSpacing: "0.1em", color: MS.stone }}>TISSUE PAPER · PRINTED PATTERN</div>
          </div>
          {/* Notecard lineup */}
          <div style={{ flex: 1, background: MS.parchment, border: `1px solid ${MS.dust}`, borderRadius: 2, display: "flex", alignItems: "center", padding: "16px 20px", gap: 20 }}>
            {["Gratitude", "Thinking of you", "Just because", "Celebration"].map((label, i) => (
              <div key={i} style={{ width: 70, height: 90, background: i % 2 === 0 ? MS.parchment : MS.ink, border: `1px solid ${MS.dust}`, borderRadius: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <MMark size={14} color={i % 2 === 0 ? MS.ink : MS.parchment} />
                <div style={{ fontFamily: MS.sans, fontSize: 5, letterSpacing: "0.06em", color: i % 2 === 0 ? MS.stone : `${MS.parchment}66`, textAlign: "center" as const }}>{label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DigitalInstagramScreen() {
  const posts = [
    { bg: MS.ink, text: "mayul\nstudio" },
    { bg: MS.parchment, img: true },
    { bg: MS.warmGold, text: "NEW" },
    { bg: "#E8DCC4", img: true },
    { bg: MS.parchment, text: "25%" },
    { bg: MS.ink, img: true },
    { bg: MS.dust, img: true },
    { bg: MS.warmGold, text: "SS\n25" },
    { bg: MS.parchment, img: true },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: "#F7F4EF", display: "flex", flexDirection: "column", fontFamily: MS.sans }}>
      <div style={{ padding: "16px 32px 12px", background: MS.parchment, borderBottom: `1px solid ${MS.dust}`, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <Label>Mayul Studio · Digital — Instagram</Label>
          <div style={{ fontFamily: MS.serif, fontSize: 18, color: MS.ink, marginTop: 4 }}>Social Template System</div>
        </div>
        <div style={{ fontFamily: MS.sans, fontSize: 10, color: MS.stone }}>Figma components — any product photo drops in</div>
      </div>
      <div style={{ flex: 1, display: "flex", gap: 28, padding: "24px 36px", alignItems: "stretch" }}>
        {/* Instagram feed grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <Label>Feed grid</Label>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, width: 330 }}>
            {posts.map((p, i) => (
              <div key={i} style={{ width: 108, height: 108, background: p.bg, border: `0.5px solid rgba(0,0,0,0.06)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                {p.text ? (
                  <div style={{ fontFamily: p.text.includes("mayul") ? MS.serif : MS.sans, fontSize: p.text === "NEW" || p.text === "25%" ? 16 : 13, color: p.bg === MS.ink ? MS.parchment : MS.ink, textAlign: "center" as const, whiteSpace: "pre" as const, lineHeight: 1.3, fontWeight: p.text === "25%" ? 700 : 400 }}>
                    {p.text}
                  </div>
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 48, height: 48, background: MS.warmGold, opacity: 0.15, borderRadius: "50%" }}/>
                    <div style={{ position: "absolute", width: 40, height: 30, background: MS.warmGold, opacity: 0.12, borderRadius: 2 }} />
                  </div>
                )}
                <div style={{ position: "absolute", bottom: 6, right: 6 }}>
                  <MMark size={10} color={p.bg === MS.ink ? MS.parchment : MS.ink} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Story template */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>Story template</Label>
          <div style={{ width: 148, flex: 1, background: MS.ink, borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "16px 12px", boxShadow: "0 4px 20px rgba(26,23,20,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: MS.warmGold, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MMark size={10} color={MS.ink} />
                </div>
                <div style={{ fontFamily: MS.sans, fontSize: 9, color: MS.parchment }}>mayulstudio</div>
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 80, height: 80, background: MS.warmGold, opacity: 0.1, borderRadius: "50%" }} />
            </div>
            <div>
              <div style={{ fontFamily: MS.serif, fontSize: 14, color: MS.parchment, lineHeight: 1.3, marginBottom: 6 }}>New collection,<br />now available.</div>
              <div style={{ background: MS.warmGold, borderRadius: 4, padding: "5px 10px", display: "inline-block" }}>
                <div style={{ fontFamily: MS.sans, fontSize: 8, fontWeight: 700, color: MS.ink, letterSpacing: "0.08em" }}>SHOP NOW →</div>
              </div>
            </div>
          </div>
        </div>
        {/* Post template */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>Post template</Label>
          <div style={{ width: 220, flex: 1, background: MS.parchment, border: `1px solid ${MS.dust}`, borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 16px rgba(26,23,20,0.08)" }}>
            {/* Image area */}
            <div style={{ height: 140, background: MS.dust, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ width: 60, height: 60, background: MS.warmGold, opacity: 0.18, borderRadius: "50%" }} />
              <div style={{ position: "absolute", bottom: 8, right: 8 }}>
                <MMark size={12} color={MS.ink} />
              </div>
            </div>
            {/* Caption area */}
            <div style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: MS.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MMark size={8} color={MS.parchment} />
                  </div>
                  <div style={{ fontFamily: MS.sans, fontSize: 9, fontWeight: 600, color: MS.ink }}>mayulstudio</div>
                </div>
                <div style={{ fontFamily: MS.serif, fontSize: 11, color: MS.ink, lineHeight: 1.5, marginBottom: 4 }}>
                  Quiet luxury in every detail.
                </div>
                <div style={{ fontFamily: MS.sans, fontSize: 9, color: MS.stone }}>Tel Aviv · 250gsm Natural White</div>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                {["#mayulstudio", "#stationery", "#telaviv"].map(tag => (
                  <div key={tag} style={{ fontFamily: MS.sans, fontSize: 8, color: MS.warmGold }}>{tag}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DigitalWebsiteScreen() {
  const products = [
    { name: "Notecard Set", code: "MS-NK-001", price: "₪ 85" },
    { name: "Notebook A5", code: "MS-NB-002", price: "₪ 120" },
    { name: "Gift Set", code: "MS-GS-003", price: "₪ 210" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: MS.parchment, display: "flex", flexDirection: "column", fontFamily: MS.sans }}>
      {/* Browser chrome */}
      <div style={{ height: 36, background: "#F0ECE5", borderBottom: `1px solid ${MS.dust}`, display: "flex", alignItems: "center", padding: "0 14px", gap: 10, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }}/>)}
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ background: MS.parchment, border: `1px solid ${MS.dust}`, borderRadius: 5, padding: "3px 14px", fontFamily: MS.sans, fontSize: 10, color: MS.stone }}>
            mayulstudio.com
          </div>
        </div>
        <div style={{ width: 56 }} />
      </div>
      {/* Nav */}
      <div style={{ height: 56, borderBottom: `1px solid ${MS.dust}`, display: "flex", alignItems: "center", padding: "0 48px", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ fontFamily: MS.serif, fontSize: 18, color: MS.ink, letterSpacing: "-0.02em" }}>mayul studio</div>
        <div style={{ display: "flex", gap: 32 }}>
          {["Shop", "Collections", "About", "Stockists"].map(item => (
            <div key={item} style={{ fontFamily: MS.sans, fontSize: 11, letterSpacing: "0.08em", color: MS.stone, cursor: "pointer" }}>{item.toUpperCase()}</div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ fontFamily: MS.sans, fontSize: 10, color: MS.stone }}>Search</div>
          <div style={{ fontFamily: MS.sans, fontSize: 10, color: MS.stone }}>Cart (0)</div>
        </div>
      </div>
      {/* Body */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Thin brand ribbon */}
        <div style={{ background: MS.ink, height: 36, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ fontFamily: MS.sans, fontSize: 10, letterSpacing: "0.14em", color: MS.parchment }}>FREE SHIPPING ON ORDERS OVER ₪200 · WORLDWIDE</div>
        </div>
        {/* Products — no hero, arrives immediately */}
        <div style={{ padding: "32px 48px", flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
            <div style={{ fontFamily: MS.serif, fontSize: 22, color: MS.ink }}>New this season</div>
            <div style={{ fontFamily: MS.sans, fontSize: 10, color: MS.stone, letterSpacing: "0.08em" }}>VIEW ALL →</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {products.map((p, i) => (
              <div key={i} style={{ cursor: "pointer" }}>
                <div style={{ background: i === 0 ? MS.dust : i === 1 ? "#E8DCC4" : MS.ink, borderRadius: 3, aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <MMark size={40} color={i === 2 ? MS.parchment : MS.ink} />
                </div>
                <div style={{ fontFamily: MS.serif, fontSize: 14, color: MS.ink, marginBottom: 3 }}>{p.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: MS.sans, fontSize: 9, color: MS.stone, letterSpacing: "0.06em" }}>{p.code}</div>
                  <div style={{ fontFamily: MS.sans, fontSize: 12, color: MS.ink, fontWeight: 600 }}>{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Registry ─────────────────────────────────────────────────────────────────
const screens = [
  { id: "color-system",         label: "Colour System",       sub: "Five roles, zero decoration",                component: ColorSystemScreen,      type: "video" },
  { id: "logo-primary",         label: "Primary Wordmark",    sub: "Modified serif · three colourways",          component: LogoPrimaryScreen,       type: "video" },
  { id: "logo-secondary",       label: "Secondary Mark",      sub: "Stamp · emboss · favicon",                   component: LogoSecondaryScreen,     type: "video" },
  { id: "logo-scale",           label: "Scale Test",          sub: "Print to digital — 5mm to 400px",           component: LogoScaleScreen,         type: "wide"  },
  { id: "typography-specimen",  label: "Typography",          sub: "Serif leads — sans supports",                component: TypographySpecimenScreen, type: "video" },
  { id: "packaging-hero",       label: "Packaging System",    sub: "Full lineup — box, envelope, tag, bag",      component: PackagingHeroScreen,     type: "wide"  },
  { id: "packaging-envelope",   label: "Envelope Detail",     sub: "Outer + liner — wax seal system",           component: PackagingEnvelopeScreen, type: "square"},
  { id: "packaging-label",      label: "Label System",        sub: "Three sizes — same type and rules",         component: PackagingLabelScreen,    type: "square"},
  { id: "stationery-set",       label: "Stationery Set",      sub: "Notecards · envelopes · tissue · seals",    component: StationerySetScreen,     type: "video" },
  { id: "digital-instagram",    label: "Instagram Templates", sub: "Feed grid · story · post — Figma components",component: DigitalInstagramScreen,  type: "video" },
  { id: "digital-website",      label: "Website",             sub: "Homepage — products arrive immediately",     component: DigitalWebsiteScreen,    type: "video" },
] as const;

type ScreenType = typeof screens[number]["type"];
const DIMS: Record<ScreenType, { w: number; h: number }> = {
  video:  { w: 1200, h: 675 },
  wide:   { w: 1200, h: 514 },
  square: { w: 640,  h: 640 },
};

// ─── Viewer ───────────────────────────────────────────────────────────────────
export default function WireframeViewer() {
  const [current, setCurrent] = useState(0);
  const s = screens[current];
  const Screen = s.component;
  const { w, h } = DIMS[s.type];

  return (
    <div style={{ minHeight: "100vh", background: MS.bg, display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 24px 40px", fontFamily: MS.sans, boxSizing: "border-box" }}>
      {/* Header */}
      <div style={{ width: "100%", maxWidth: 1320, display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: MS.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: MS.warmGold, marginBottom: 4 }}>MAYUL STUDIO · BRAND IDENTITY</div>
          <div style={{ fontFamily: MS.serif, fontSize: 24, color: "#F4EFEA", letterSpacing: "-0.01em" }}>{s.label}</div>
          <div style={{ fontFamily: MS.sans, fontSize: 13, color: MS.stone, marginTop: 3 }}>{s.sub}</div>
        </div>
        <div style={{ fontFamily: MS.sans, fontSize: 12, color: "#2A2420", paddingTop: 4 }}>
          {String(current + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
        </div>
      </div>

      {/* Artboard */}
      <div
        data-screen={s.id}
        style={{
          width: w,
          height: h,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 0 0 1px #2A2420, 0 32px 80px rgba(0,0,0,0.7)",
          flexShrink: 0,
        }}
      >
        <Screen />
      </div>

      {/* Nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 28 }}>
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
          style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #2A2420", background: current === 0 ? "transparent" : "#1A1208", color: current === 0 ? "#2A2420" : "#F4EFEA", cursor: current === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none"><path d="M5 1L1 6l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ display: "flex", gap: 7 }}>
          {screens.map((sc, i) => (
            <button key={sc.id} onClick={() => setCurrent(i)} title={sc.label}
              style={{ width: i === current ? 22 : 7, height: 7, borderRadius: 4, background: i === current ? MS.warmGold : "#2A2420", border: "none", cursor: "pointer", transition: "all 0.25s", padding: 0 }} />
          ))}
        </div>
        <button onClick={() => setCurrent(c => Math.min(screens.length - 1, c + 1))} disabled={current === screens.length - 1}
          style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #2A2420", background: current === screens.length - 1 ? "transparent" : "#1A1208", color: current === screens.length - 1 ? "#2A2420" : "#F4EFEA", cursor: current === screens.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none"><path d="M1 1l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: "flex", gap: 8, marginTop: 18, overflowX: "auto", paddingBottom: 4, width: "100%", maxWidth: 1320, justifyContent: "center" }}>
        {screens.map((sc, i) => (
          <button key={sc.id} onClick={() => setCurrent(i)}
            style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 8, border: i === current ? `1.5px solid ${MS.warmGold}` : "1px solid #2A2420", background: i === current ? "#1A1208" : MS.bg, color: i === current ? MS.warmGold : "#3A2A20", cursor: "pointer", textAlign: "left" as const }}>
            <div style={{ fontFamily: MS.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 2 }}>{sc.label.toUpperCase()}</div>
            <div style={{ fontFamily: MS.sans, fontSize: 10, opacity: 0.5 }}>{sc.type}</div>
          </button>
        ))}
      </div>

      <p style={{ fontFamily: MS.sans, fontSize: 10, color: "#2A2420", marginTop: 20, textAlign: "center", letterSpacing: "0.08em" }}>
        MAYUL STUDIO · BRAND IDENTITY · localhost:3000/wireframes/mayul-studio
      </p>
    </div>
  );
}

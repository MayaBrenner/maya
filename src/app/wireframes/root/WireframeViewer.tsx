"use client";
import { useState } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const ROOT = {
  ink: "#0F0E0C",
  inkSoft: "#2A2622",
  bone: "#F4EFE6",
  paper: "#FAF6EC",
  card: "#FFFFFF",
  gold: "#B89968",
  goldDeep: "#8C7245",
  soil: "#6B5840",
  sage: "#9AA68C",
  muted: "#8C8479",
  border: "#E2DCCD",
  borderSoft: "#EDE7D8",
  serif: '"Crimson Pro", Georgia, serif',
  sans: '"Manrope", "Inter", system-ui, sans-serif',
  mono: '"Montserrat", "Inter", system-ui, sans-serif',
};

// ─── Potato SVG illustrations ─────────────────────────────────────────────────
function Potato({ kind = "russet", size = 96 }: { kind?: string; size?: number }) {
  const variants: Record<string, { fill: string; stroke: string; spots: string; shape: string }> = {
    russet:     { fill: "#A8825A", stroke: "#5A3F25", spots: "#3A2515", shape: "long" },
    yukon:      { fill: "#E5C880", stroke: "#8C6A2A", spots: "#6B4F1C", shape: "round" },
    fingerling: { fill: "#D4B370", stroke: "#7A5A2A", spots: "#4A3515", shape: "finger" },
    redbliss:   { fill: "#B86A52", stroke: "#6B3025", spots: "#3A1612", shape: "round" },
    purple:     { fill: "#5A3A6E", stroke: "#2A1530", spots: "#1A0820", shape: "oval" },
    kingedward: { fill: "#E8D2A0", stroke: "#8A6B3A", spots: "#5A4220", shape: "oval" },
  };
  const v = variants[kind] ?? variants.russet;
  const paths: Record<string, string> = {
    long:   "M 30 28 Q 22 50, 30 72 Q 50 86, 72 76 Q 84 56, 76 32 Q 56 18, 30 28 Z",
    round:  "M 28 36 Q 22 56, 36 76 Q 60 84, 78 68 Q 86 44, 70 26 Q 44 22, 28 36 Z",
    oval:   "M 26 34 Q 20 54, 30 76 Q 54 86, 76 72 Q 84 48, 72 28 Q 48 20, 26 34 Z",
    finger: "M 24 26 Q 18 50, 26 76 Q 42 86, 60 78 Q 76 56, 70 30 Q 50 18, 24 26 Z",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }}>
      <path d={paths[v.shape]} fill={v.fill} stroke={v.stroke} strokeWidth="1.4" />
      <circle cx="42" cy="44" r="2" fill={v.spots} opacity="0.55" />
      <circle cx="60" cy="38" r="1.6" fill={v.spots} opacity="0.55" />
      <circle cx="56" cy="62" r="2.2" fill={v.spots} opacity="0.55" />
      <circle cx="38" cy="64" r="1.4" fill={v.spots} opacity="0.5" />
      <ellipse cx="40" cy="38" rx="6" ry="3" fill="#fff" opacity="0.18" transform="rotate(-30 40 38)" />
    </svg>
  );
}

// ─── Icon set ─────────────────────────────────────────────────────────────────
function Icon({ name, size = 18, color = ROOT.ink, strokeWidth = 1.4 }: { name: string; size?: number; color?: string; strokeWidth?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "search") return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
  if (name === "home") return <svg {...p}><path d="M3 11 12 4l9 7v8a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2Z"/></svg>;
  if (name === "sparkles") return <svg {...p}><path d="M12 4v3M12 17v3M4 12h3M17 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"/></svg>;
  if (name === "book") return <svg {...p}><path d="M4 5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1-2-2Z"/><path d="M4 5v14"/></svg>;
  if (name === "user") return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>;
  if (name === "check") return <svg {...p}><path d="m5 13 4 4L19 7"/></svg>;
  if (name === "x") return <svg {...p}><path d="M6 6l12 12M18 6l-12 12"/></svg>;
  if (name === "arrow-right") return <svg {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
  if (name === "arrow-up-right") return <svg {...p}><path d="M7 17 17 7M9 7h8v8"/></svg>;
  if (name === "chevron-left") return <svg {...p}><path d="m15 6-6 6 6 6"/></svg>;
  if (name === "mic") return <svg {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>;
  if (name === "bookmark") return <svg {...p}><path d="M6 3h12v18l-6-4-6 4Z"/></svg>;
  if (name === "send") return <svg {...p}><path d="m4 12 16-8-6 18-3-7Z"/></svg>;
  return null;
}

// ─── Shared primitives ────────────────────────────────────────────────────────
function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? "#fff" : ROOT.ink;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px 6px", fontFamily: ROOT.sans }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: c }}>9:41</span>
      <div style={{ display: "flex", gap: 5 }}>
        <svg width="17" height="11" viewBox="0 0 17 11">
          <rect x="0" y="7" width="3" height="4" rx="0.5" fill={c}/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill={c}/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" fill={c}/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill={c}/>
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11">
          <rect x="0.5" y="0.5" width="20" height="10" rx="3" stroke={c} strokeOpacity="0.4" fill="none"/>
          <rect x="2" y="2" width="17" height="7" rx="1.5" fill={c}/>
        </svg>
      </div>
    </div>
  );
}

function Label({ children, color = ROOT.muted, style = {} }: { children: React.ReactNode; color?: string; style?: React.CSSProperties }) {
  return (
    <span style={{ fontFamily: ROOT.mono, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" as const, color, ...style }}>
      {children}
    </span>
  );
}

function HairRule({ color = ROOT.border, width = 24, style = {} }: { color?: string; width?: number; style?: React.CSSProperties }) {
  return <div style={{ width, height: 1, background: color, ...style }} />;
}

function HomeIndicator() {
  return (
    <div style={{ padding: "8px 0 6px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: 134, height: 5, background: ROOT.ink, borderRadius: 3, opacity: 0.18 }} />
    </div>
  );
}

function TabBar({ active }: { active: "home" | "sparkles" | "book" | "bookmark" }) {
  const tabs = ["home", "sparkles", "book", "bookmark"] as const;
  return (
    <div style={{ display: "flex", justifyContent: "space-around", padding: "14px 32px 0", borderTop: `1px solid ${ROOT.borderSoft}`, background: ROOT.paper }}>
      {tabs.map((t) => (
        <Icon key={t} name={t} size={20} color={active === t ? ROOT.ink : ROOT.muted} strokeWidth={active === t ? 1.8 : 1.3} />
      ))}
    </div>
  );
}

// ─── Screen 1: Home ───────────────────────────────────────────────────────────
function HomeScreen() {
  const recents = [
    { kind: "yukon", name: "Yukon Gold", use: "Mash, gratin" },
    { kind: "russet", name: "Russet", use: "Roast, fry" },
    { kind: "fingerling", name: "Fingerling", use: "Confit" },
    { kind: "kingedward", name: "King Edward", use: "Pommes purée" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: ROOT.paper, color: ROOT.ink, fontFamily: ROOT.sans, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBar />
      <div style={{ padding: "20px 28px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <Label color={ROOT.gold}>Service · Tuesday</Label>
          <Icon name="user" size={18} color={ROOT.ink} />
        </div>
        <div style={{ textAlign: "center", padding: "4px 0 8px" }}>
          <HairRule color={ROOT.ink} width={32} style={{ margin: "0 auto 14px" }} />
          <Label color={ROOT.ink} style={{ fontSize: 9.5 }}>Root · Est. 2026</Label>
          <h1 style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 38, fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.02em", margin: "14px 0 14px" }}>
            The potato<br />sommelier
          </h1>
          <HairRule color={ROOT.ink} width={32} style={{ margin: "0 auto" }} />
        </div>
      </div>

      <div style={{ padding: "14px 24px 8px" }}>
        <div style={{ background: ROOT.ink, color: ROOT.paper, borderRadius: 4, padding: "20px 22px 18px", position: "relative", overflow: "hidden", border: `1px solid ${ROOT.ink}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <Label color={ROOT.gold}>The chef</Label>
            <span style={{ fontFamily: ROOT.mono, fontSize: 10, color: "rgba(244,239,230,0.5)" }}>AI · 0.4s</span>
          </div>
          <div style={{ fontFamily: ROOT.serif, fontSize: 22, fontStyle: "italic", lineHeight: 1.15, color: ROOT.paper, marginBottom: 14, fontWeight: 400 }}>
            "What are we cooking tonight?"
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(244,239,230,0.08)", borderRadius: 999, flex: 1 }}>
            <Icon name="mic" size={14} color={ROOT.gold} />
            <span style={{ fontSize: 12.5, color: "rgba(244,239,230,0.6)", fontStyle: "italic" }}>Tap to speak or type…</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 24px 12px" }}>
        <div style={{ background: ROOT.bone, borderRadius: 4, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, border: `1px solid ${ROOT.border}` }}>
          <div style={{ width: 40, height: 40, borderRadius: 999, background: ROOT.ink, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ROOT.gold} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h3l2-3h6l2 3h3v13H4z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 16, fontWeight: 400, color: ROOT.ink, lineHeight: 1.15 }}>At the market?</div>
            <div style={{ fontFamily: ROOT.mono, fontSize: 9.5, color: ROOT.muted, letterSpacing: "0.12em", marginTop: 4 }}>SNAP A POTATO · GET DISHES</div>
          </div>
          <Icon name="arrow-right" size={16} color={ROOT.gold} />
        </div>
      </div>

      <div style={{ padding: "4px 28px 8px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Label>The Cellar · 8 varieties</Label>
        <span style={{ fontFamily: ROOT.mono, fontSize: 10, color: ROOT.gold }}>VIEW ALL →</span>
      </div>

      <div style={{ flex: 1, padding: "8px 24px 12px", overflow: "hidden" }}>
        {recents.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 6px", borderBottom: i < recents.length - 1 ? `1px solid ${ROOT.borderSoft}` : "none" }}>
            <Potato kind={r.kind} size={42} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: ROOT.serif, fontSize: 16, fontStyle: "italic", fontWeight: 400 }}>{r.name}</div>
              <div style={{ fontFamily: ROOT.mono, fontSize: 10, color: ROOT.muted, letterSpacing: "0.06em", marginTop: 2 }}>{r.use.toUpperCase()}</div>
            </div>
            <span style={{ fontFamily: ROOT.mono, fontSize: 11, color: ROOT.gold }}>{String(i + 1).padStart(2, "0")}</span>
          </div>
        ))}
      </div>

      <TabBar active="home" />
      <HomeIndicator />
    </div>
  );
}

// ─── Screen 2: Chef Conversation ──────────────────────────────────────────────
function ChefScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: ROOT.ink, color: ROOT.paper, fontFamily: ROOT.sans, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBar dark />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 24px 16px" }}>
        <Icon name="x" size={20} color={ROOT.paper} />
        <Label color="rgba(244,239,230,0.6)">The Chef</Label>
        <span style={{ fontFamily: ROOT.mono, fontSize: 10, color: ROOT.gold }}>AI</span>
      </div>

      <div style={{ flex: 1, padding: "10px 24px 0", overflow: "hidden" }}>
        <div style={{ marginBottom: 18 }}>
          <Label color={ROOT.gold} style={{ marginBottom: 10, display: "block" }}>00:01 · CHEF</Label>
          <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 22, lineHeight: 1.25, color: ROOT.paper, fontWeight: 400 }}>
            "Tell me the dish. I'll find your potato."
          </div>
        </div>

        <div style={{ marginBottom: 18, paddingLeft: 24, borderLeft: `1px solid ${ROOT.gold}` }}>
          <Label color="rgba(244,239,230,0.4)" style={{ marginBottom: 6, display: "block" }}>00:08 · YOU</Label>
          <div style={{ fontSize: 14.5, lineHeight: 1.5, color: "rgba(244,239,230,0.9)" }}>
            Pommes purée tonight. For four. Want it silky.
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <Label color={ROOT.gold} style={{ marginBottom: 10, display: "block" }}>00:09 · CHEF</Label>
          <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 18, lineHeight: 1.35, color: ROOT.paper, fontWeight: 400, marginBottom: 14 }}>
            "For purée, you want starch and butter. King Edward — passed through a tamis twice. Trust me."
          </div>

          <div style={{ background: "rgba(244,239,230,0.05)", border: `1px solid rgba(184,153,104,0.3)`, borderRadius: 4, padding: "20px 22px", display: "flex", alignItems: "center", gap: 16 }}>
            <Potato kind="kingedward" size={56} />
            <div style={{ flex: 1 }}>
              <Label color={ROOT.gold} style={{ marginBottom: 4, display: "block", fontSize: 9.5 }}>Recommendation</Label>
              <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 19, fontWeight: 400, color: ROOT.paper }}>King Edward</div>
              <div style={{ fontFamily: ROOT.mono, fontSize: 10.5, color: "rgba(244,239,230,0.5)", marginTop: 4, letterSpacing: "0.06em" }}>1.2 KG · FLOURY · UK SOIL</div>
            </div>
            <Icon name="arrow-up-right" size={18} color={ROOT.gold} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const, marginTop: 22 }}>
          {["Why this one?", "A second choice?", "Already have russet"].map((q, i) => (
            <div key={i} style={{ padding: "8px 14px", borderRadius: 999, border: `1px solid rgba(244,239,230,0.2)`, fontSize: 12, color: "rgba(244,239,230,0.85)", fontStyle: "italic", fontFamily: ROOT.serif }}>
              {q}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "14px 24px 30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "rgba(244,239,230,0.06)", border: `1px solid rgba(244,239,230,0.12)`, borderRadius: 999 }}>
          <Icon name="mic" size={16} color={ROOT.gold} />
          <span style={{ flex: 1, fontSize: 13, color: "rgba(244,239,230,0.4)", fontStyle: "italic" }}>Ask the chef…</span>
          <Icon name="send" size={16} color={ROOT.gold} />
        </div>
      </div>
    </div>
  );
}

// ─── Screen 3: Pairing / Dish Match ──────────────────────────────────────────
function DishMatch() {
  const matches = [
    { kind: "kingedward", name: "King Edward", score: 96, why: "Floury starch breaks to silk", primary: true },
    { kind: "yukon", name: "Yukon Gold", score: 87, why: "Buttery, holds shape, less pure" },
    { kind: "russet", name: "Russet Burbank", score: 71, why: "Drier — needs more cream" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: ROOT.paper, color: ROOT.ink, fontFamily: ROOT.sans, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBar />
      <div style={{ padding: "8px 24px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <Icon name="chevron-left" size={22} />
          <Label color={ROOT.gold}>Course · Pairing</Label>
          <Icon name="bookmark" size={18} color={ROOT.muted} />
        </div>
        <div style={{ textAlign: "center" }}>
          <HairRule color={ROOT.ink} width={24} style={{ margin: "0 auto 14px" }} />
          <Label color={ROOT.muted} style={{ fontSize: 9.5, marginBottom: 8, display: "block" }}>For your dish</Label>
          <h2 style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 28, fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>Pommes purée</h2>
          <div style={{ fontFamily: ROOT.mono, fontSize: 10.5, color: ROOT.gold, letterSpacing: "0.14em", marginTop: 10 }}>FOR FOUR · 35 MIN · SILKY</div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "4px 24px 8px", overflow: "hidden" }}>
        {matches.map((m, i) => (
          <div key={i} style={{ background: m.primary ? ROOT.ink : ROOT.card, color: m.primary ? ROOT.paper : ROOT.ink, padding: "18px 18px 16px", marginBottom: 10, borderRadius: 4, border: m.primary ? `1px solid ${ROOT.ink}` : `1px solid ${ROOT.border}`, display: "flex", alignItems: "center", gap: 14, position: "relative", overflow: "hidden" }}>
            <Potato kind={m.kind} size={54} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 17, fontWeight: 400, color: m.primary ? ROOT.paper : ROOT.ink }}>{m.name}</span>
                <span style={{ fontFamily: ROOT.mono, fontSize: 12, fontWeight: 500, color: ROOT.gold, marginLeft: 8 }}>
                  {m.score}<span style={{ opacity: 0.5 }}>/100</span>
                </span>
              </div>
              <div style={{ fontSize: 11.5, color: m.primary ? "rgba(244,239,230,0.6)" : ROOT.muted, lineHeight: 1.4 }}>{m.why}</div>
              <div style={{ height: 1.5, background: m.primary ? "rgba(244,239,230,0.12)" : ROOT.borderSoft, marginTop: 10, position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${m.score}%`, background: ROOT.gold }} />
              </div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 14, padding: "0 4px" }}>
          <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 12.5, lineHeight: 1.5, color: ROOT.muted, textAlign: "center" }}>
            "The chef reasons in plain language. No black box."
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 24px 28px" }}>
        <button style={{ width: "100%", padding: "16px", borderRadius: 4, background: ROOT.gold, color: ROOT.ink, border: "none", fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 15, fontWeight: 500 }}>
          Take to the market →
        </button>
      </div>
    </div>
  );
}

// ─── Screen 4: Variety Detail ─────────────────────────────────────────────────
function VarietyDetail() {
  return (
    <div style={{ width: "100%", height: "100%", background: ROOT.paper, color: ROOT.ink, fontFamily: ROOT.sans, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 24px 8px" }}>
        <Icon name="chevron-left" size={22} />
        <Label>Variety · 03 / 08</Label>
        <Icon name="bookmark" size={18} color={ROOT.ink} />
      </div>

      <div style={{ flex: 1, overflow: "hidden" }}>
        <div style={{ padding: "12px 24px 8px", textAlign: "center" }}>
          <HairRule color={ROOT.ink} width={20} style={{ margin: "0 auto 14px" }} />
          <Label color={ROOT.gold}>Solanum tuberosum</Label>
          <h2 style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 40, fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.02em", margin: "12px 0 6px" }}>
            King Edward
          </h2>
          <div style={{ fontFamily: ROOT.mono, fontSize: 10.5, color: ROOT.muted, letterSpacing: "0.14em", marginBottom: 20 }}>EST. 1902 · UK</div>
          <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 12px" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -16, border: `1px solid ${ROOT.gold}`, borderRadius: "50%", opacity: 0.4 }} />
              <Potato kind="kingedward" size={140} />
            </div>
          </div>
          <HairRule color={ROOT.ink} width={20} style={{ margin: "8px auto 0" }} />
        </div>

        <div style={{ padding: "20px 30px 10px" }}>
          {[
            { l: "Texture", v: "Floury, breaks down to silk" },
            { l: "Best for", v: "Mash, roast, baked" },
            { l: "Avoid for", v: "Salads, gratin, frites" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "12px 0", borderBottom: i < 2 ? `1px dotted ${ROOT.border}` : "none" }}>
              <Label color={ROOT.muted}>{row.l}</Label>
              <span style={{ fontFamily: ROOT.serif, fontSize: 14, fontStyle: "italic", color: ROOT.ink, textAlign: "right", maxWidth: 200 }}>{row.v}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: "12px 32px 0", textAlign: "center" }}>
          <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 15, lineHeight: 1.5, color: ROOT.inkSoft, fontWeight: 400 }}>
            "The starch is generous. Cook it whole, in its skin, in salted water. Peel while warm — never before."
          </div>
          <div style={{ fontFamily: ROOT.mono, fontSize: 9.5, color: ROOT.gold, letterSpacing: "0.14em", marginTop: 12 }}>— THE CHEF</div>
        </div>
      </div>

      <div style={{ padding: "14px 24px 28px" }}>
        <button style={{ width: "100%", padding: "16px", borderRadius: 4, background: ROOT.ink, color: ROOT.paper, border: "none", fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 15, fontWeight: 400 }}>
          See the dishes →
        </button>
      </div>
    </div>
  );
}

// ─── Screen 5: Store Picker ───────────────────────────────────────────────────
function StorePicker() {
  return (
    <div style={{ width: "100%", height: "100%", background: ROOT.paper, color: ROOT.ink, fontFamily: ROOT.sans, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBar />
      <div style={{ padding: "6px 24px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Icon name="chevron-left" size={22} />
        <Label color={ROOT.gold}>At the market</Label>
        <Icon name="x" size={20} color={ROOT.muted} />
      </div>
      <div style={{ padding: "8px 24px 14px", textAlign: "center" }}>
        <h2 style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 26, fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 8px" }}>Pick a King Edward.</h2>
        <div style={{ fontFamily: ROOT.mono, fontSize: 10.5, color: ROOT.muted, letterSpacing: "0.14em" }}>FOR PURÉE · 1.2 KG TOTAL</div>
      </div>

      <div style={{ flex: 1, padding: "10px 24px 8px", overflow: "hidden" }}>
        {[
          { n: "I", l: "Choose", t: "Heavy for size — dense flesh.", spec: "Weight" },
          { n: "II", l: "Inspect", t: "Skin firm, no green tint or sprouts.", spec: "Skin" },
          { n: "III", l: "Press", t: "No give. Soft = old. Walk away.", spec: "Touch" },
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 16, padding: "16px 4px", borderTop: i === 0 ? `1px solid ${ROOT.ink}` : `1px dotted ${ROOT.border}`, borderBottom: i === 2 ? `1px solid ${ROOT.ink}` : "none", alignItems: "flex-start" }}>
            <span style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 22, color: ROOT.gold, minWidth: 32, lineHeight: 1, fontWeight: 400, marginTop: 2 }}>{row.n}.</span>
            <div style={{ flex: 1 }}>
              <Label color={ROOT.ink} style={{ marginBottom: 6, display: "block", fontSize: 9.5 }}>{row.l}</Label>
              <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 16, lineHeight: 1.3, fontWeight: 400, color: ROOT.ink }}>{row.t}</div>
            </div>
            <span style={{ fontFamily: ROOT.mono, fontSize: 9.5, color: ROOT.muted, letterSpacing: "0.1em", marginTop: 4 }}>{row.spec.toUpperCase()}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: "14px 32px 0", textAlign: "center" }}>
        <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 13, lineHeight: 1.45, color: ROOT.inkSoft }}>
          "If two pass all three, take the slightly smaller one. They cook more evenly."
        </div>
        <div style={{ fontFamily: ROOT.mono, fontSize: 9.5, color: ROOT.gold, letterSpacing: "0.14em", marginTop: 10 }}>— THE CHEF</div>
      </div>

      <div style={{ padding: "18px 24px 28px" }}>
        <button style={{ width: "100%", padding: "16px", borderRadius: 4, background: ROOT.ink, color: ROOT.paper, border: "none", fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 15, fontWeight: 400 }}>
          Got one →
        </button>
      </div>
    </div>
  );
}

// ─── Screen 6: Scanner ───────────────────────────────────────────────────────
function ScannerScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#0A0A08", color: ROOT.paper, fontFamily: ROOT.sans, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 55%, #6B5840 0%, #3A2E20 45%, #15110C 100%)" }} />
      <div style={{ position: "absolute", left: "50%", top: "52%", transform: "translate(-50%, -50%)", filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.6))" }}>
        <Potato kind="kingedward" size={220} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)" }} />

      <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column" }}>
        <StatusBar dark />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 24px 0" }}>
          <Icon name="x" size={20} color={ROOT.paper} />
          <Label color="rgba(244,239,230,0.7)">Identify · the market</Label>
          <span style={{ fontFamily: ROOT.mono, fontSize: 10, color: ROOT.gold, letterSpacing: "0.14em" }}>AI</span>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ width: 260, height: 260, position: "relative" }}>
            {[
              { top: 0, left: 0, borderTop: `1.5px solid ${ROOT.gold}`, borderLeft: `1.5px solid ${ROOT.gold}` },
              { top: 0, right: 0, borderTop: `1.5px solid ${ROOT.gold}`, borderRight: `1.5px solid ${ROOT.gold}` },
              { bottom: 0, left: 0, borderBottom: `1.5px solid ${ROOT.gold}`, borderLeft: `1.5px solid ${ROOT.gold}` },
              { bottom: 0, right: 0, borderBottom: `1.5px solid ${ROOT.gold}`, borderRight: `1.5px solid ${ROOT.gold}` },
            ].map((corner, i) => (
              <div key={i} style={{ position: "absolute", width: 28, height: 28, ...corner }} />
            ))}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 14, height: 14 }}>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: ROOT.gold, opacity: 0.5 }} />
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: ROOT.gold, opacity: 0.5 }} />
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", padding: "0 32px 18px" }}>
          <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 22, lineHeight: 1.2, fontWeight: 400, color: ROOT.paper, marginBottom: 8 }}>
            "Show me the potato."
          </div>
          <Label color="rgba(244,239,230,0.55)" style={{ fontSize: 9.5 }}>POINT · STEADY · ONE AT A TIME</Label>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 36px 32px" }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, border: `1px solid rgba(244,239,230,0.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="bookmark" size={16} color={ROOT.paper} />
          </div>
          <div style={{ position: "relative", width: 76, height: 76 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 999, border: `1.5px solid ${ROOT.gold}` }} />
            <div style={{ position: "absolute", inset: 6, borderRadius: 999, background: ROOT.paper }} />
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 999, border: `1px solid rgba(244,239,230,0.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: ROOT.mono, fontSize: 9.5, color: ROOT.paper, letterSpacing: "0.1em" }}>GAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 7: Scan Result ────────────────────────────────────────────────────
function ScanResultScreen() {
  const dishes = [
    { name: "Pommes purée", why: "Floury starch · breaks to silk", score: 96, primary: true, avoid: false },
    { name: "Roast potatoes", why: "Crisps outside, fluffy within", score: 91, avoid: false },
    { name: "Baked, in jacket", why: "Skin holds — flesh goes airy", score: 88, avoid: false },
    { name: "Gratin dauphinois", why: "Will collapse — try a waxy", score: 42, avoid: true },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: ROOT.paper, color: ROOT.ink, fontFamily: ROOT.sans, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 24px 0" }}>
        <Icon name="chevron-left" size={22} />
        <Label color={ROOT.gold}>Identified · 0.6s</Label>
        <Icon name="bookmark" size={18} color={ROOT.muted} />
      </div>

      <div style={{ padding: "14px 24px 18px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: -10, border: `1px solid ${ROOT.gold}`, borderRadius: "50%", opacity: 0.35 }} />
            <Potato kind="kingedward" size={84} />
          </div>
        </div>
        <Label color={ROOT.muted} style={{ fontSize: 9.5, marginBottom: 4, display: "block" }}>This is a</Label>
        <h2 style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 32, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em", margin: "4px 0 8px" }}>King Edward</h2>
        <div style={{ fontFamily: ROOT.mono, fontSize: 10, color: ROOT.gold, letterSpacing: "0.16em" }}>FLOURY · 94% MATCH</div>
      </div>

      <div style={{ padding: "0 24px 4px" }}>
        <HairRule color={ROOT.ink} width={20} style={{ margin: "0 auto 12px" }} />
        <div style={{ textAlign: "center", fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 19, lineHeight: 1.3, fontWeight: 400, color: ROOT.ink, padding: "0 8px 4px" }}>
          "Perfect for mash. A reliable roast. Not your gratin."
        </div>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <span style={{ fontFamily: ROOT.mono, fontSize: 9.5, color: ROOT.gold, letterSpacing: "0.14em" }}>— THE CHEF</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: "0 24px 8px", overflow: "hidden" }}>
        {dishes.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 4px", borderTop: i === 0 ? `1px solid ${ROOT.ink}` : `1px dotted ${ROOT.border}`, borderBottom: i === dishes.length - 1 ? `1px solid ${ROOT.ink}` : "none", opacity: d.avoid ? 0.55 : 1 }}>
            <span style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 18, color: ROOT.gold, minWidth: 24, lineHeight: 1, fontWeight: 400 }}>
              {d.avoid ? "×" : String(i + 1).padStart(2, "0")}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 16, fontWeight: 400, color: ROOT.ink }}>{d.name}</span>
                <span style={{ fontFamily: ROOT.mono, fontSize: 10.5, color: d.avoid ? ROOT.muted : ROOT.gold, marginLeft: 8, letterSpacing: "0.06em" }}>
                  {d.score}<span style={{ opacity: 0.5 }}>/100</span>
                </span>
              </div>
              <div style={{ fontSize: 11, color: ROOT.muted, lineHeight: 1.4, fontStyle: d.avoid ? "italic" : "normal", fontFamily: d.avoid ? ROOT.serif : ROOT.sans }}>{d.why}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "14px 24px 28px", display: "flex", gap: 10 }}>
        <button style={{ flex: 1, padding: "15px", borderRadius: 4, background: "transparent", color: ROOT.ink, border: `1px solid ${ROOT.ink}`, fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 14, fontWeight: 400 }}>Scan another</button>
        <button style={{ flex: 1.4, padding: "15px", borderRadius: 4, background: ROOT.ink, color: ROOT.paper, border: "none", fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 14, fontWeight: 400 }}>Cook the mash →</button>
      </div>
    </div>
  );
}

// ─── Screen 8: Debrief ────────────────────────────────────────────────────────
function DebriefScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: ROOT.bone, color: ROOT.ink, fontFamily: ROOT.sans, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBar />
      <div style={{ flex: 1, padding: "32px 30px 16px", display: "flex", flexDirection: "column" }}>
        <Label color={ROOT.gold} style={{ marginBottom: 22 }}>The debrief</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <Potato kind="kingedward" size={56} />
          <div>
            <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 18, fontWeight: 400 }}>King Edward · purée</div>
            <div style={{ fontFamily: ROOT.mono, fontSize: 10, color: ROOT.muted, letterSpacing: "0.08em", marginTop: 3 }}>SERVED · 8:42 PM</div>
          </div>
        </div>
        <h2 style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 32, fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 10px" }}>How was it?</h2>
        <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 14, lineHeight: 1.5, color: ROOT.muted, marginBottom: 30 }}>Honesty teaches the chef. The chef teaches you back.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { t: "Silky. As promised.", s: "A perfect service" },
            { t: "A little gluey", s: "Over-worked, or wrong starch" },
            { t: "Grainy", s: "Under-cooked, or wrong variety" },
          ].map((opt, i) => (
            <button key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderRadius: 4, background: ROOT.card, border: `1px solid ${ROOT.border}`, fontFamily: ROOT.sans, textAlign: "left" as const, cursor: "pointer" }}>
              <div>
                <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 16, fontWeight: 400, color: ROOT.ink, marginBottom: 2 }}>{opt.t}</div>
                <div style={{ fontFamily: ROOT.mono, fontSize: 9.5, color: ROOT.muted, letterSpacing: "0.08em" }}>{opt.s.toUpperCase()}</div>
              </div>
              <Icon name="arrow-right" size={16} color={ROOT.gold} />
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 30px 28px", textAlign: "center" }}>
        <span style={{ fontFamily: ROOT.mono, fontSize: 10, color: ROOT.muted, letterSpacing: "0.14em" }}>SKIP · REMIND ME LATER</span>
      </div>
    </div>
  );
}

// ─── Screen 9: Cellar ─────────────────────────────────────────────────────────
function CellarScreen() {
  const cellar = [
    { kind: "kingedward", name: "King Edward", mastery: 92, dishes: 4 },
    { kind: "yukon", name: "Yukon Gold", mastery: 78, dishes: 3 },
    { kind: "russet", name: "Russet", mastery: 64, dishes: 2 },
    { kind: "fingerling", name: "Fingerling", mastery: 41, dishes: 1 },
    { kind: "redbliss", name: "Red Bliss", mastery: 12, dishes: 0 },
    { kind: "purple", name: "Purple Majesty", mastery: 0, dishes: 0 },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: ROOT.paper, color: ROOT.ink, fontFamily: ROOT.sans, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StatusBar />
      <div style={{ padding: "8px 24px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Label>Your cellar</Label>
        <Icon name="search" size={18} color={ROOT.muted} />
      </div>
      <div style={{ padding: "14px 24px 18px", textAlign: "center" }}>
        <HairRule color={ROOT.ink} width={20} style={{ margin: "0 auto 12px" }} />
        <h2 style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 32, fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.02em", margin: 0 }}>
          Six varieties.<br />Two mastered.
        </h2>
        <div style={{ fontFamily: ROOT.mono, fontSize: 10.5, color: ROOT.gold, letterSpacing: "0.14em", marginTop: 12 }}>10 DISHES · 12 DAY STREAK</div>
      </div>
      <div style={{ flex: 1, padding: "4px 24px 12px", overflow: "hidden" }}>
        {cellar.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 4px", borderTop: `1px solid ${ROOT.borderSoft}`, borderBottom: i === cellar.length - 1 ? `1px solid ${ROOT.borderSoft}` : "none", opacity: c.mastery === 0 ? 0.45 : 1 }}>
            <Potato kind={c.kind} size={36} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 15, fontWeight: 400 }}>{c.name}</span>
                <span style={{ fontFamily: ROOT.mono, fontSize: 10, color: ROOT.muted, letterSpacing: "0.1em" }}>{String(c.dishes).padStart(2, "0")} DISHES</span>
              </div>
              <div style={{ position: "relative", height: 1.5, background: ROOT.borderSoft }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${c.mastery}%`, background: c.mastery > 80 ? ROOT.ink : ROOT.gold }} />
              </div>
            </div>
            <span style={{ fontFamily: ROOT.mono, fontSize: 11, color: c.mastery > 80 ? ROOT.ink : ROOT.gold, minWidth: 32, textAlign: "right" }}>{c.mastery}%</span>
          </div>
        ))}
      </div>
      <TabBar active="bookmark" />
      <HomeIndicator />
    </div>
  );
}

// ─── Screen registry ──────────────────────────────────────────────────────────
const screens = [
  { id: "home",       label: "Home",            sub: "The pass · two entry paths",      dark: false, component: HomeScreen },
  { id: "chef",       label: "The Chef",        sub: "AI conversation · dish → potato", dark: true,  component: ChefScreen },
  { id: "pairing",    label: "Pairing",         sub: "AI scores three varieties",       dark: false, component: DishMatch },
  { id: "variety",    label: "Variety Detail",  sub: "King Edward · tasting note",      dark: false, component: VarietyDetail },
  { id: "store",      label: "At the Market",   sub: "Three rules for picking right",   dark: false, component: StorePicker },
  { id: "scanner",    label: "Scanner",         sub: "Point at the potato",             dark: true,  component: ScannerScreen },
  { id: "scan-result",label: "Identified",      sub: "What can I cook with this?",      dark: false, component: ScanResultScreen },
  { id: "debrief",    label: "Debrief",         sub: "Feedback · chef learns from you", dark: false, component: DebriefScreen },
  { id: "cellar",     label: "The Cellar",      sub: "Mastery tracking · six varieties",dark: false, component: CellarScreen },
];

// ─── Viewer ───────────────────────────────────────────────────────────────────
export default function WireframeViewer() {
  const [current, setCurrent] = useState(0);
  const Screen = screens[current].component;

  return (
    <div style={{ minHeight: "100vh", background: "#0A0905", display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 16px 40px", boxSizing: "border-box", fontFamily: ROOT.sans }}>
      {/* Top bar */}
      <div style={{ width: "100%", maxWidth: 760, display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: ROOT.mono, fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: ROOT.gold, marginBottom: 5 }}>
            ROOT · THE POTATO SOMMELIER
          </div>
          <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 22, fontWeight: 400, color: "#FAF6EC", lineHeight: 1.1 }}>
            {screens[current].label}
          </div>
          <div style={{ fontFamily: ROOT.mono, fontSize: 11, color: ROOT.muted, marginTop: 3, letterSpacing: "0.06em" }}>
            {screens[current].sub}
          </div>
        </div>
        <div style={{ fontFamily: ROOT.mono, fontSize: 11, color: "#444", paddingTop: 4 }}>
          {String(current + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
        </div>
      </div>

      {/* iPhone frame */}
      <div data-phone={screens[current].id} style={{ width: 402, height: 874, borderRadius: 58, overflow: "hidden", boxShadow: "0 0 0 10px #1A1815, 0 0 0 12px #2A2520, 0 50px 100px rgba(0,0,0,0.8)", display: "flex", flexDirection: "column", position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 126, height: 36, background: "#0A0905", borderBottomLeftRadius: 22, borderBottomRightRadius: 22, zIndex: 10 }} />
        <Screen />
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 36 }}>
        <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid #2A2520", background: current === 0 ? "transparent" : "#1A1815", color: current === 0 ? "#333" : "#FAF6EC", cursor: current === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="7" height="13" viewBox="0 0 7 13" fill="none"><path d="M6 1L1 6.5L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div style={{ display: "flex", gap: 7 }}>
          {screens.map((s, i) => (
            <button key={s.id} onClick={() => setCurrent(i)} title={s.label} style={{ width: i === current ? 22 : 7, height: 7, borderRadius: 4, background: i === current ? ROOT.gold : "#2A2520", border: "none", cursor: "pointer", transition: "all 0.25s ease", padding: 0 }} />
          ))}
        </div>

        <button onClick={() => setCurrent((c) => Math.min(screens.length - 1, c + 1))} disabled={current === screens.length - 1} style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid #2A2520", background: current === screens.length - 1 ? "transparent" : "#1A1815", color: current === screens.length - 1 ? "#333" : "#FAF6EC", cursor: current === screens.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="7" height="13" viewBox="0 0 7 13" fill="none"><path d="M1 1L6 6.5L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: "flex", gap: 8, marginTop: 28, overflowX: "auto", paddingBottom: 4, width: "100%", maxWidth: 760, justifyContent: "center" }}>
        {screens.map((s, i) => (
          <button key={s.id} onClick={() => setCurrent(i)} style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 8, border: i === current ? `1.5px solid ${ROOT.gold}` : "1px solid #1E1B17", background: i === current ? "#1A1510" : "#0F0D0A", color: i === current ? ROOT.gold : "#555", cursor: "pointer", textAlign: "left" as const }}>
            <div style={{ fontFamily: ROOT.mono, fontSize: 9.5, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 2 }}>{s.label.toUpperCase()}</div>
            <div style={{ fontFamily: ROOT.serif, fontStyle: "italic", fontSize: 11, opacity: 0.6 }}>{s.sub}</div>
          </button>
        ))}
      </div>

      {/* Figma hint */}
      <p style={{ fontFamily: ROOT.mono, fontSize: 10, color: "#333", marginTop: 24, textAlign: "center", letterSpacing: "0.08em" }}>
        IMPORT TO FIGMA VIA html.to.design · localhost:3000/wireframes/root
      </p>
    </div>
  );
}

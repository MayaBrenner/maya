"use client";
import { useState } from "react";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const SC = {
  sand: "#F5EDE2",
  sandLight: "#FAF7F2",
  linen: "#E8D5BE",
  terracotta: "#C4714A",
  earth: "#4A3728",
  clay: "#8B6550",
  clayLight: "#B8967E",
  white: "#FFFFFF",
  mapBg: "#EDE3D4",
  mapStreet: "#F5EAD8",
  mapBlock: "#E8D5BE",
  mapPark: "#C8D89A",
  bg: "#18100C",
  font: 'system-ui, -apple-system, "Helvetica Neue", sans-serif',
};

// ─── Shared ───────────────────────────────────────────────────────────────────
function StatusBar({ bg = SC.sand }: { bg?: string }) {
  return (
    <div style={{ height: 44, background: bg, display: "flex", alignItems: "flex-end", padding: "0 20px 8px", justifyContent: "space-between", flexShrink: 0 }}>
      <span style={{ fontFamily: SC.font, fontSize: 15, fontWeight: 600, color: SC.earth }}>9:41</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <svg width="17" height="12" viewBox="0 0 17 12">
          {[0,1,2,3].map(i => <rect key={i} x={i*4.5} y={12-(i+1)*3} width="3.5" height={(i+1)*3} rx="1" fill={SC.earth} opacity={i<3?1:0.3}/>)}
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={SC.earth} strokeWidth="1"/>
          <rect x="22.5" y="3.5" width="2.5" height="5" rx="1.5" fill={SC.earth} opacity="0.5"/>
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill={SC.earth} opacity="0.8"/>
        </svg>
      </div>
    </div>
  );
}

function HomeIndicator({ bg = SC.white }: { bg?: string }) {
  return (
    <div style={{ height: 34, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: 134, height: 5, borderRadius: 3, background: SC.earth, opacity: 0.15 }} />
    </div>
  );
}

// Shared map SVG background
function MapBg({ viewBox = "0 0 402 500", style = {} }: { viewBox?: string; style?: React.CSSProperties }) {
  return (
    <svg width="402" height="100%" viewBox={viewBox} preserveAspectRatio="xMidYMin slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }}>
      <rect width="402" height="500" fill={SC.mapBg}/>
      {/* H streets */}
      <rect y="75" width="402" height="22" fill={SC.mapStreet}/>
      <rect y="175" width="402" height="20" fill={SC.mapStreet}/>
      <rect y="285" width="402" height="22" fill={SC.mapStreet}/>
      <rect y="390" width="402" height="18" fill={SC.mapStreet}/>
      {/* V streets */}
      <rect x="50" width="20" height="500" fill={SC.mapStreet}/>
      <rect x="155" width="18" height="500" fill={SC.mapStreet}/>
      <rect x="265" width="20" height="500" fill={SC.mapStreet}/>
      <rect x="365" width="18" height="500" fill={SC.mapStreet}/>
      {/* Blocks */}
      <rect x="0" y="0" width="50" height="75" rx="2" fill="#E2D0B8" opacity="0.7"/>
      <rect x="70" y="0" width="85" height="75" rx="2" fill={SC.mapBlock} opacity="0.7"/>
      <rect x="173" y="0" width="92" height="75" rx="2" fill={SC.mapBlock} opacity="0.7"/>
      <rect x="285" y="0" width="80" height="75" rx="2" fill={SC.mapBlock} opacity="0.7"/>
      <rect x="0" y="97" width="50" height="78" rx="2" fill={SC.mapBlock} opacity="0.7"/>
      <rect x="70" y="97" width="85" height="78" rx="2" fill={SC.mapBlock} opacity="0.7"/>
      {/* Park */}
      <rect x="173" y="97" width="92" height="78" rx="2" fill={SC.mapPark} opacity="0.7"/>
      <text x="219" y="143" textAnchor="middle" fontSize="11" fill="#5A7A30" fontFamily="system-ui" opacity="0.85">🌳 Park</text>
      <rect x="285" y="97" width="80" height="78" rx="2" fill={SC.mapBlock} opacity="0.7"/>
      <rect x="0" y="195" width="50" height="90" rx="2" fill={SC.mapBlock} opacity="0.7"/>
      <rect x="70" y="195" width="85" height="90" rx="2" fill="#E2D0B8" opacity="0.7"/>
      <rect x="173" y="195" width="92" height="90" rx="2" fill={SC.mapBlock} opacity="0.7"/>
      <rect x="285" y="195" width="98" height="90" rx="2" fill={SC.mapBlock} opacity="0.7"/>
      <rect x="0" y="307" width="50" height="83" rx="2" fill={SC.mapBlock} opacity="0.7"/>
      <rect x="70" y="307" width="195" height="83" rx="2" fill={SC.mapBlock} opacity="0.7"/>
      <rect x="285" y="307" width="98" height="83" rx="2" fill="#E2D0B8" opacity="0.7"/>
    </svg>
  );
}

// ─── Phone screens ────────────────────────────────────────────────────────────
function MapScreen() {
  const vibes = ["All", "Quiet", "Lively", "Date", "Kids"];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: SC.sand, fontFamily: SC.font }}>
      <StatusBar />
      <div style={{ padding: "8px 16px 6px", flexShrink: 0 }}>
        <div style={{ background: SC.white, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 2px 8px rgba(74,55,40,0.08)" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke={SC.clay} strokeWidth="1.5"/><path d="M11 11l3 3" stroke={SC.clay} strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span style={{ fontFamily: SC.font, fontSize: 14, color: SC.clayLight }}>Search your neighborhood…</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 7, padding: "0 16px 8px", flexShrink: 0 }}>
        {vibes.map((v, i) => (
          <div key={v} style={{ flexShrink: 0, padding: "5px 14px", borderRadius: 999, background: i === 0 ? SC.terracotta : SC.linen, color: i === 0 ? SC.white : SC.clay, fontFamily: SC.font, fontSize: 13, fontWeight: i === 0 ? 600 : 400 }}>{v}</div>
        ))}
      </div>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <MapBg />
        {/* Pins */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 402 500" preserveAspectRatio="xMidYMin slice">
          <circle cx="219" cy="136" r="12" fill={SC.terracotta}/>
          <circle cx="219" cy="136" r="5" fill={SC.white}/>
          <rect x="229" y="117" width="76" height="22" rx="5" fill={SC.earth}/>
          <polygon points="229,128 235,122 235,134" fill={SC.earth}/>
          <text x="267" y="132" textAnchor="middle" fontSize="9.5" fill={SC.white} fontFamily="system-ui">The Bench</text>
          <circle cx="100" cy="42" r="12" fill={SC.terracotta} opacity="0.85"/>
          <circle cx="100" cy="42" r="5" fill={SC.white}/>
          <circle cx="320" cy="136" r="12" fill={SC.terracotta} opacity="0.85"/>
          <circle cx="320" cy="136" r="5" fill={SC.white}/>
          <circle cx="115" cy="245" r="12" fill={SC.terracotta} opacity="0.7"/>
          <circle cx="115" cy="245" r="5" fill={SC.white}/>
          {/* User's own pin */}
          <circle cx="215" cy="245" r="16" fill="none" stroke={SC.terracotta} strokeWidth="2.5"/>
          <circle cx="215" cy="245" r="12" fill={SC.terracotta}/>
          <circle cx="215" cy="245" r="5" fill={SC.white}/>
        </svg>
      </div>
      <div style={{ background: SC.white, borderRadius: "22px 22px 0 0", padding: "10px 20px 0", boxShadow: "0 -4px 24px rgba(74,55,40,0.12)", flexShrink: 0 }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: SC.linen, margin: "0 auto 12px" }} />
        <div style={{ fontFamily: SC.font, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: SC.clay, marginBottom: 6 }}>5 PLACES NEARBY</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16 }}>
          <div>
            <div style={{ fontFamily: SC.font, fontSize: 17, fontWeight: 700, color: SC.earth }}>The Bench</div>
            <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
              {["Quiet", "Park"].map(t => <div key={t} style={{ background: SC.sand, borderRadius: 999, padding: "3px 10px", fontFamily: SC.font, fontSize: 11, color: SC.clay }}>{t}</div>)}
            </div>
          </div>
          <div style={{ background: SC.sand, borderRadius: 10, padding: "6px 12px", fontFamily: SC.font, fontSize: 12, color: SC.clay }}>2 min walk</div>
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

function VibeFilterScreen() {
  const vibes = ["All", "Quiet", "Lively", "Date", "Kids"];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: SC.sand, fontFamily: SC.font }}>
      <StatusBar />
      <div style={{ padding: "8px 16px 6px", flexShrink: 0 }}>
        <div style={{ background: SC.white, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 2px 8px rgba(74,55,40,0.08)" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke={SC.clay} strokeWidth="1.5"/><path d="M11 11l3 3" stroke={SC.clay} strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span style={{ fontFamily: SC.font, fontSize: 14, color: SC.clayLight }}>Search your neighborhood…</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 7, padding: "0 16px 8px", flexShrink: 0 }}>
        {vibes.map((v, i) => (
          <div key={v} style={{ flexShrink: 0, padding: "5px 14px", borderRadius: 999, background: i === 1 ? SC.terracotta : SC.linen, color: i === 1 ? SC.white : SC.clay, fontFamily: SC.font, fontSize: 13, fontWeight: i === 1 ? 600 : 400 }}>{v}</div>
        ))}
      </div>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <MapBg />
        {/* Overlay to dim non-quiet pins */}
        <div style={{ position: "absolute", inset: 0, background: `${SC.mapBg}99` }} />
        {/* Only quiet pins */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 402 500" preserveAspectRatio="xMidYMin slice">
          <circle cx="219" cy="136" r="12" fill={SC.terracotta}/>
          <circle cx="219" cy="136" r="5" fill={SC.white}/>
          <rect x="229" y="117" width="76" height="22" rx="5" fill={SC.earth}/>
          <polygon points="229,128 235,122 235,134" fill={SC.earth}/>
          <text x="267" y="132" textAnchor="middle" fontSize="9.5" fill={SC.white} fontFamily="system-ui">The Bench</text>
          <circle cx="320" cy="136" r="12" fill={SC.terracotta}/>
          <circle cx="320" cy="136" r="5" fill={SC.white}/>
        </svg>
        <div style={{ position: "absolute", top: 12, right: 12, background: SC.terracotta, borderRadius: 999, padding: "5px 12px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: SC.font, fontSize: 12, fontWeight: 600, color: SC.white }}>Quiet · 2 places</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2L2 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
      </div>
      <div style={{ background: SC.white, borderRadius: "22px 22px 0 0", padding: "10px 20px 0", boxShadow: "0 -4px 24px rgba(74,55,40,0.12)", flexShrink: 0 }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: SC.linen, margin: "0 auto 12px" }} />
        <div style={{ fontFamily: SC.font, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: SC.terracotta, marginBottom: 6 }}>QUIET · 2 PLACES</div>
        <div style={{ paddingBottom: 16 }}>
          <div style={{ fontFamily: SC.font, fontSize: 17, fontWeight: 700, color: SC.earth }}>The Bench</div>
          <div style={{ fontFamily: SC.font, fontSize: 13, color: SC.clay, marginTop: 3, fontStyle: "italic" }}>"Best view in the neighborhood at 6am"</div>
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

function PlaceCardScreen() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: SC.sand, fontFamily: SC.font }}>
      <StatusBar />
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <svg width="402" height="100%" viewBox="0 0 402 300" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <rect width="402" height="300" fill={SC.mapBg}/>
          <rect y="50" width="402" height="16" fill={SC.mapStreet}/>
          <rect y="130" width="402" height="16" fill={SC.mapStreet}/>
          <rect x="55" width="16" height="300" fill={SC.mapStreet}/>
          <rect x="160" width="16" height="300" fill={SC.mapStreet}/>
          <rect x="71" y="0" width="89" height="50" rx="2" fill={SC.mapBlock} opacity="0.7"/>
          <rect x="176" y="0" width="88" height="50" rx="2" fill={SC.mapBlock} opacity="0.7"/>
          <rect x="176" y="66" width="88" height="64" rx="2" fill={SC.mapPark} opacity="0.6"/>
          <circle cx="220" cy="97" r="14" fill={SC.terracotta}/>
          <circle cx="220" cy="97" r="6" fill={SC.white}/>
        </svg>
      </div>
      <div style={{ background: SC.white, borderRadius: "22px 22px 0 0", padding: "12px 24px 0", boxShadow: "0 -8px 32px rgba(74,55,40,0.15)", flexShrink: 0 }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: SC.linen, margin: "0 auto 16px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <div style={{ fontFamily: SC.font, fontSize: 22, fontWeight: 700, color: SC.earth }}>The Bench</div>
            <div style={{ fontFamily: SC.font, fontSize: 13, color: SC.clay, marginTop: 2 }}>Florentin · Tel Aviv</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
          {["Quiet", "Morning", "Park"].map(t => <div key={t} style={{ background: SC.sand, borderRadius: 999, padding: "4px 12px", fontFamily: SC.font, fontSize: 12, color: SC.clay }}>{t}</div>)}
        </div>
        <div style={{ background: SC.sand, borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
          <div style={{ fontFamily: SC.font, fontSize: 15, color: SC.earth, lineHeight: 1.5, fontStyle: "italic" }}>
            "The bench with the best view in the whole neighborhood. Magical at 6am before anyone else shows up."
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderTop: `1px solid ${SC.linen}` }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: SC.terracotta, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: SC.font, fontSize: 14, color: SC.white, fontWeight: 700 }}>N</span>
          </div>
          <div>
            <div style={{ fontFamily: SC.font, fontSize: 13, fontWeight: 600, color: SC.earth }}>Noa</div>
            <div style={{ fontFamily: SC.font, fontSize: 12, color: SC.clay }}>Florentin · 6 years</div>
          </div>
        </div>
        <div style={{ paddingBottom: 12 }}>
          <button style={{ width: "100%", padding: "14px", background: SC.terracotta, color: SC.white, border: "none", borderRadius: 12, fontFamily: SC.font, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            Save to my map
          </button>
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

function AddPlaceScreen() {
  const categories = ["Park", "Café", "Restaurant", "Market", "Shop", "Other"];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: SC.white, fontFamily: SC.font }}>
      <StatusBar bg={SC.white} />
      <div style={{ padding: "10px 20px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${SC.linen}`, flexShrink: 0 }}>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7l6 6" stroke={SC.earth} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: SC.font, fontSize: 17, fontWeight: 700, color: SC.earth }}>Add a place</div>
          <div style={{ fontFamily: SC.font, fontSize: 12, color: SC.clay }}>Step 1 of 3 · Details</div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {[1,2,3].map(i => <div key={i} style={{ width: i===1?20:7, height: 7, borderRadius: 4, background: i===1?SC.terracotta:SC.linen }}/>)}
        </div>
      </div>
      {/* Mini map picker */}
      <div style={{ height: 160, position: "relative", flexShrink: 0, overflow: "hidden" }}>
        <svg width="402" height="160" viewBox="0 0 402 160" style={{ display: "block" }}>
          <rect width="402" height="160" fill={SC.mapBg}/>
          <rect y="35" width="402" height="14" fill={SC.mapStreet}/>
          <rect y="100" width="402" height="14" fill={SC.mapStreet}/>
          <rect x="55" width="16" height="160" fill={SC.mapStreet}/>
          <rect x="160" width="16" height="160" fill={SC.mapStreet}/>
          <rect x="265" width="16" height="160" fill={SC.mapStreet}/>
          <rect x="71" y="0" width="89" height="35" rx="2" fill={SC.mapBlock} opacity="0.7"/>
          <rect x="176" y="0" width="89" height="35" rx="2" fill={SC.mapBlock} opacity="0.7"/>
          <rect x="176" y="49" width="89" height="51" rx="2" fill={SC.mapPark} opacity="0.6"/>
          <circle cx="220" cy="80" r="18" fill={SC.terracotta} opacity="0.2"/>
          <circle cx="220" cy="80" r="13" fill={SC.terracotta}/>
          <circle cx="220" cy="80" r="5" fill={SC.white}/>
          <line x1="220" y1="93" x2="220" y2="105" stroke={SC.terracotta} strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", background: SC.earth, borderRadius: 8, padding: "5px 14px" }}>
          <span style={{ fontFamily: SC.font, fontSize: 12, color: SC.white }}>Tap to adjust pin</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: "18px 20px 0", overflow: "hidden" }}>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontFamily: SC.font, fontSize: 11, fontWeight: 700, color: SC.clay, letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>PLACE NAME</label>
          <div style={{ background: SC.sand, borderRadius: 10, padding: "12px 14px", border: `1.5px solid ${SC.terracotta}` }}>
            <span style={{ fontFamily: SC.font, fontSize: 15, color: SC.earth }}>The Bench</span>
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontFamily: SC.font, fontSize: 11, fontWeight: 700, color: SC.clay, letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>CATEGORY</label>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 7 }}>
            {categories.map((c, i) => (
              <div key={c} style={{ padding: "7px 14px", borderRadius: 8, background: i===0?SC.terracotta:SC.sand, color: i===0?SC.white:SC.clay, fontFamily: SC.font, fontSize: 13, border: i===0?"none":`1px solid ${SC.linen}` }}>{c}</div>
            ))}
          </div>
        </div>
        <div>
          <label style={{ fontFamily: SC.font, fontSize: 11, fontWeight: 700, color: SC.clay, letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
            YOUR TIP <span style={{ fontWeight: 400, textTransform: "none" as const, letterSpacing: 0 }}>· 72 / 120 chars</span>
          </label>
          <div style={{ background: SC.sand, borderRadius: 10, padding: "12px 14px", border: `1px solid ${SC.linen}`, minHeight: 68 }}>
            <span style={{ fontFamily: SC.font, fontSize: 15, color: SC.earth, lineHeight: 1.5 }}>
              Best view at 6am before anyone else shows up. Worth the early alarm.
            </span>
          </div>
        </div>
      </div>
      <div style={{ padding: "14px 20px", borderTop: `1px solid ${SC.linen}`, flexShrink: 0 }}>
        <button style={{ width: "100%", padding: "15px", background: SC.terracotta, color: SC.white, border: "none", borderRadius: 12, fontFamily: SC.font, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
          Continue →
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

function PersonalMapScreen() {
  const places = [
    { name: "The Bench", category: "Park", vibes: ["Quiet", "Morning"], tip: "Best view at 6am" },
    { name: "Sunrise Café", category: "Café", vibes: ["Work", "Morning"], tip: "No WiFi policy — bliss" },
    { name: "Saturday Market", category: "Market", vibes: ["Lively", "Kids"], tip: "Come before 9am for the good stuff" },
    { name: "Hidden Garden", category: "Park", vibes: ["Quiet", "Date"], tip: "Secret entrance on the east side" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: SC.sandLight, fontFamily: SC.font }}>
      <StatusBar bg={SC.sandLight} />
      <div style={{ padding: "10px 20px 14px", background: SC.white, borderBottom: `1px solid ${SC.linen}`, flexShrink: 0 }}>
        <div style={{ fontFamily: SC.font, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: SC.clay, marginBottom: 3 }}>YOUR SCOUT MAP</div>
        <div style={{ fontFamily: SC.font, fontSize: 22, fontWeight: 700, color: SC.earth }}>My neighborhood</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <span style={{ fontFamily: SC.font, fontSize: 13, color: SC.clay }}>4 places added</span>
          <button style={{ padding: "7px 16px", background: SC.terracotta, color: SC.white, border: "none", borderRadius: 8, fontFamily: SC.font, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Share map →</button>
        </div>
      </div>
      <div style={{ flex: 1, padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        {places.map((p, i) => (
          <div key={i} style={{ background: SC.white, borderRadius: 14, padding: "14px 16px", border: `1px solid ${SC.linen}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontFamily: SC.font, fontSize: 16, fontWeight: 700, color: SC.earth }}>{p.name}</div>
              <span style={{ fontFamily: SC.font, fontSize: 12, color: SC.clay }}>{p.category}</span>
            </div>
            <div style={{ fontFamily: SC.font, fontSize: 13, color: SC.clay, fontStyle: "italic", marginBottom: 8, lineHeight: 1.4 }}>"{p.tip}"</div>
            <div style={{ display: "flex", gap: 6 }}>
              {p.vibes.map(v => <div key={v} style={{ background: SC.sand, borderRadius: 999, padding: "3px 10px", fontFamily: SC.font, fontSize: 11, color: SC.clay }}>{v}</div>)}
            </div>
          </div>
        ))}
      </div>
      <HomeIndicator />
    </div>
  );
}

// ─── Wide screens ─────────────────────────────────────────────────────────────
function ResearchBoardScreen() {
  const themes = [
    { title: "How people build local knowledge", color: SC.terracotta, notes: ["Ask neighbors first", "WhatsApp before Yelp", '"My colleague told me about it"', "Trust > star rating"] },
    { title: "What makes a tip trustworthy", color: "#8B8BC4", notes: ["Knows who said it", '"Lived there 6 years"', "Specific + time-bound", "No commercial motive"] },
    { title: "Why current apps fail", color: "#E8A055", notes: ["Google Maps: global, impersonal", "Yelp: overwhelmed by volume", "Instagram: algorithmic", '"None feel local"'] },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: "#F7F4EE", display: "flex", flexDirection: "column", fontFamily: SC.font, padding: "32px 44px" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: SC.clay, marginBottom: 5 }}>SCOUT · RESEARCH SYNTHESIS</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: SC.earth }}>15 interviews — how people discover their neighborhoods</div>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { value: "15/15", label: "Rely on personal networks first", sub: "Neighbors, WhatsApp, colleagues — not apps" },
          { value: "11/15", label: "Would share local knowledge", sub: "If the format felt low-effort and casual" },
          { value: "0/15",  label: "Satisfied with any current tool", sub: '"None feel like they\'re actually from here"' },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: SC.white, borderRadius: 12, padding: "16px 20px", border: `1px solid ${SC.linen}` }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: SC.terracotta, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: SC.earth, marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: SC.clay }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", gap: 16 }}>
        {themes.map((theme, i) => (
          <div key={i} style={{ flex: 1, background: SC.white, borderRadius: 12, border: `1px solid ${SC.linen}`, overflow: "hidden" }}>
            <div style={{ background: theme.color, padding: "10px 16px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: SC.white }}>{theme.title}</div>
            </div>
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
              {theme.notes.map((note, j) => (
                <div key={j} style={{ background: SC.sand, borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: SC.earth, lineHeight: 1.4, fontStyle: "italic" }}>{note}</div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ width: 210, display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { text: "The bakery only has croissants until 9am — you just have to know", attr: "User 3 · moved 4 months ago" },
            { text: "I always ask my neighbor. She's lived here 12 years.", attr: "User 7 · returned from abroad" },
          ].map((q, i) => (
            <div key={i} style={{ background: `${SC.terracotta}12`, borderRadius: 12, padding: "16px", border: `1px solid ${SC.terracotta}30` }}>
              <div style={{ fontSize: 32, color: SC.terracotta, lineHeight: 1, marginBottom: 6 }}>"</div>
              <div style={{ fontSize: 13, color: SC.earth, lineHeight: 1.5, fontStyle: "italic", marginBottom: 10 }}>{q.text}</div>
              <div style={{ fontSize: 11, color: SC.clay }}>— {q.attr}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VibeTaxonomyScreen() {
  const vibes = [
    { name: "Quiet", emoji: "🤫", desc: "Low noise, no crowds", ex: "Hidden gardens, solo cafés" },
    { name: "Lively", emoji: "🎉", desc: "Energy, buzz, people", ex: "Markets, squares, evening spots" },
    { name: "Date spot", emoji: "💫", desc: "Atmosphere, intimacy", ex: "Rooftops, candlelit bars" },
    { name: "Kids", emoji: "🎈", desc: "Safe, fun for all ages", ex: "Playgrounds, parks, ice cream" },
    { name: "Work-friendly", emoji: "💻", desc: "Tables, long stays ok", ex: "Cafés, co-working, libraries" },
    { name: "Morning", emoji: "🌅", desc: "Open early, worth it", ex: "Sunrise spots, early bakeries" },
    { name: "Late night", emoji: "🌙", desc: "Open past 10pm", ex: "Night markets, late bars" },
    { name: "Local secret", emoji: "🗝️", desc: "Not in any guidebook", ex: "Hidden alleys, off-menu items" },
    { name: "Outdoor", emoji: "🌿", desc: "Fresh air, green space", ex: "Rooftops, terraces, parks" },
    { name: "History", emoji: "🏛️", desc: "Story, character, patina", ex: "Old quarters, preserved buildings" },
    { name: "Foodie", emoji: "🍜", desc: "Worth going out of your way", ex: "The one dish, the original" },
    { name: "Cheap", emoji: "🪙", desc: "Great value, no pretense", ex: "Local joints, street food" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: SC.sand, display: "flex", flexDirection: "column", fontFamily: SC.font, padding: "28px 36px" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: SC.clay, marginBottom: 4 }}>SCOUT · VIBE TAXONOMY</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: SC.earth }}>12 vibes — how people actually think about where to go</div>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(3, 1fr)", gap: 12 }}>
        {vibes.map((v, i) => (
          <div key={i} style={{ background: SC.white, borderRadius: 10, padding: "14px 16px", border: `1px solid ${SC.linen}`, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: 18 }}>{v.emoji}</span>
              <div style={{ fontSize: 14, fontWeight: 700, color: SC.earth }}>{v.name}</div>
            </div>
            <div style={{ fontSize: 12, color: SC.clay, marginBottom: 4, lineHeight: 1.4 }}>{v.desc}</div>
            <div style={{ fontSize: 11, color: SC.clayLight, lineHeight: 1.4, fontStyle: "italic" }}>{v.ex}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapStyleScreen() {
  const pins = [
    { cx: 268, cy: 128, color: SC.terracotta, label: "Florentin Park", tx: 278, ty: 108 },
    { cx: 590, cy: 212, color: "#E8A055" },
    { cx: 158, cy: 212, color: "#C4A847" },
    { cx: 750, cy: 302, color: "#C47AA0" },
    { cx: 400, cy: 302, color: SC.terracotta, opacity: 0.8 },
    { cx: 880, cy: 128, color: SC.terracotta, opacity: 0.8 },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: SC.sand, display: "flex", flexDirection: "column", fontFamily: SC.font }}>
      <div style={{ padding: "14px 28px", background: SC.white, borderBottom: `1px solid ${SC.linen}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: SC.clay }}>SCOUT · MAP STYLE</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: SC.earth, marginTop: 2 }}>Custom Mapbox — neighborhood guide aesthetic</div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[["Quiet", SC.terracotta], ["Lively", "#E8A055"], ["Morning", "#C4A847"], ["Date", "#C47AA0"]].map(([l, c]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: c as string }} />
              <span style={{ fontSize: 12, color: SC.clay }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <svg width="100%" height="100%" viewBox="0 0 1200 570" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
          <rect width="1200" height="570" fill={SC.mapBg}/>
          {[80,162,250,340,430,520].map((y,i) => <rect key={i} x="0" y={y} width="1200" height={i===2?26:16} fill={SC.mapStreet}/>)}
          {[100,200,320,440,560,680,800,920,1040].map((x,i) => <rect key={i} x={x} y="0" width={i%3===0?20:14} fill={SC.mapStreet} height="570"/>)}
          {/* Blocks */}
          {[
            [120,0,80,80],[214,0,106,80],[334,0,106,80],[454,0,106,80],[574,0,106,80],[694,0,106,80],[814,0,106,80],[934,0,106,80],[1054,0,146,80],
            [0,96,100,66],[120,96,80,66],[334,96,106,66],[454,96,106,66],[574,96,106,66],[694,96,106,66],[1054,96,146,66],
            [0,178,100,72],[120,178,80,72],[214,178,106,72],[334,178,226,72],[574,178,106,72],[694,178,106,72],[814,178,106,72],[934,178,266,72],
            [0,266,320,74],[334,266,106,74],[454,266,106,74],[574,266,226,74],[814,266,386,74],
            [0,356,100,74],[120,356,200,74],[334,356,226,74],[574,356,106,74],[694,356,506,74],
          ].map(([x,y,w,h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill={i===7||i===12?"#C8D89A":SC.mapBlock} opacity="0.75"/>)}
          <text x="214" y="132" textAnchor="start" fontSize="11" fill="#5A7A30" fontFamily="system-ui">🌳 Florentin Park</text>
          <text x="826" y="132" textAnchor="start" fontSize="11" fill="#5A7A30" fontFamily="system-ui">🌳 HaTachana Garden</text>
          {pins.map((p, i) => (
            <g key={i} opacity={p.opacity ?? 1}>
              <circle cx={p.cx} cy={p.cy} r="13" fill={p.color}/>
              <circle cx={p.cx} cy={p.cy} r="5" fill={SC.white}/>
              {p.label && <>
                <rect x={p.tx} y={p.ty} width="88" height="22" rx="5" fill={SC.earth}/>
                <polygon points={`${p.tx},${p.ty+11} ${p.tx-6},${p.ty+7} ${p.tx-6},${p.ty+15}`} fill={SC.earth}/>
                <text x={p.tx+44} y={p.ty+15} textAnchor="middle" fontSize="10" fill={SC.white} fontFamily="system-ui">{p.label}</text>
              </>}
            </g>
          ))}
          {/* User pin */}
          <circle cx="500" cy="212" r="17" fill="none" stroke={SC.terracotta} strokeWidth="2.5"/>
          <circle cx="500" cy="212" r="13" fill={SC.terracotta}/>
          <circle cx="500" cy="212" r="5" fill={SC.white}/>
        </svg>
      </div>
    </div>
  );
}

function VisualDirectionScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: SC.sand, display: "flex", flexDirection: "column", fontFamily: SC.font, padding: "22px 30px" }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: SC.clay, marginBottom: 3 }}>SCOUT · VISUAL DIRECTION</div>
        <div style={{ fontSize: 19, fontWeight: 700, color: SC.earth }}>Component overview — warm neighborhood guide aesthetic</div>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "190px 1fr 190px", gap: 16 }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: SC.white, borderRadius: 12, padding: "14px", border: `1px solid ${SC.linen}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: SC.clay, marginBottom: 12 }}>PALETTE</div>
            {[["#F5EDE2","Sand"],["#C4714A","Terracotta"],["#E8D5BE","Linen"],["#4A3728","Earth"],["#8B6550","Clay"]].map(([hex,name]) => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: hex, border: "1px solid rgba(74,55,40,0.12)", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: SC.earth }}>{name}</div>
                  <div style={{ fontSize: 10, color: SC.clay, fontFamily: '"Courier New", monospace' }}>{hex}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: SC.white, borderRadius: 12, padding: "14px", border: `1px solid ${SC.linen}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: SC.clay, marginBottom: 10 }}>TYPE · System UI</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: SC.earth, marginBottom: 8 }}>Aa</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: SC.earth }}>Heading</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: SC.earth }}>Subheading</div>
            <div style={{ fontSize: 13, color: SC.clay }}>Body text</div>
            <div style={{ fontSize: 12, color: SC.clayLight, fontStyle: "italic" }}>Tip / italic</div>
          </div>
        </div>
        {/* Center */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: SC.white, borderRadius: 12, padding: "14px 18px", border: `1px solid ${SC.linen}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: SC.clay, marginBottom: 14 }}>PIN SYSTEM</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
              {[["Quiet",SC.terracotta],["Lively","#E8A055"],["Morning","#C4A847"],["Date","#C47AA0"],["Kids","#78C478"],["Work","#8B8BC4"],["Mine",SC.terracotta]].map(([l,c],i) => (
                <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <svg width={i===6?34:26} height={i===6?38:32} viewBox={i===6?"0 0 34 38":"0 0 26 32"}>
                    {i===6 ? <>
                      <circle cx="17" cy="17" r="17" fill="none" stroke={c as string} strokeWidth="2.5"/>
                      <circle cx="17" cy="17" r="12" fill={c as string}/>
                      <circle cx="17" cy="17" r="4.5" fill={SC.white}/>
                      <line x1="17" y1="29" x2="17" y2="38" stroke={c as string} strokeWidth="2.5" strokeLinecap="round"/>
                    </> : <>
                      <circle cx="13" cy="13" r="13" fill={c as string}/>
                      <circle cx="13" cy="13" r="5" fill={SC.white}/>
                      <line x1="13" y1="26" x2="13" y2="32" stroke={c as string} strokeWidth="2.5" strokeLinecap="round"/>
                    </>}
                  </svg>
                  <span style={{ fontFamily: SC.font, fontSize: 10, color: SC.clay }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: SC.white, borderRadius: 12, padding: "14px 18px", border: `1px solid ${SC.linen}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: SC.clay, marginBottom: 12 }}>PLACE CARD</div>
            <div style={{ background: SC.white, borderRadius: 12, border: `1.5px solid ${SC.linen}`, padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: SC.earth }}>The Bench</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["Quiet","Morning"].map(v => <div key={v} style={{ background: SC.sand, borderRadius: 999, padding: "3px 10px", fontSize: 11, color: SC.clay }}>{v}</div>)}
                </div>
              </div>
              <div style={{ background: SC.sand, borderRadius: 8, padding: "10px 12px", marginBottom: 10, fontSize: 13, color: SC.earth, fontStyle: "italic", lineHeight: 1.5 }}>
                "Best view at 6am before anyone else shows up."
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 10, borderTop: `1px solid ${SC.linen}` }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: SC.terracotta, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 11, color: SC.white, fontWeight: 700 }}>N</span>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: SC.earth }}>Noa</div>
                  <div style={{ fontSize: 11, color: SC.clay }}>Florentin · 6 years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: SC.white, borderRadius: 12, padding: "14px", border: `1px solid ${SC.linen}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: SC.clay, marginBottom: 12 }}>VIBE TAGS</div>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
              {["Quiet","Lively","Date","Kids","Work","Morning","Secret"].map((v,i) => (
                <div key={v} style={{ padding: "5px 12px", borderRadius: 999, background: i===0?SC.terracotta:SC.sand, color: i===0?SC.white:SC.clay, fontSize: 12, fontWeight: i===0?600:400 }}>{v}</div>
              ))}
            </div>
          </div>
          <div style={{ background: SC.white, borderRadius: 12, padding: "14px", border: `1px solid ${SC.linen}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: SC.clay, marginBottom: 12 }}>BUTTONS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button style={{ padding: "12px", background: SC.terracotta, color: SC.white, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: SC.font }}>Save to my map</button>
              <button style={{ padding: "12px", background: "transparent", color: SC.earth, border: `1.5px solid ${SC.linen}`, borderRadius: 10, fontSize: 13, cursor: "pointer", fontFamily: SC.font }}>Share map →</button>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ padding: "6px 14px", borderRadius: 999, background: SC.sand, color: SC.clay, fontSize: 12 }}>Cancel</div>
                <div style={{ padding: "6px 14px", borderRadius: 999, background: SC.terracotta, color: SC.white, fontSize: 12, fontWeight: 600 }}>Add place</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Registry ─────────────────────────────────────────────────────────────────
const screens = [
  { id: "screen-map",          label: "Map",              sub: "Main view — neighborhood discovery",     component: MapScreen,            type: "phone" },
  { id: "screen-vibe-filter",  label: "Vibe Filter",      sub: "Quiet selected — 2 places visible",     component: VibeFilterScreen,     type: "phone" },
  { id: "screen-place-card",   label: "Place Card",       sub: "Expanded bottom sheet — The Bench",     component: PlaceCardScreen,      type: "phone" },
  { id: "screen-add-place",    label: "Add a Place",      sub: "Step 1 of 3 — details + map pin",       component: AddPlaceScreen,       type: "phone" },
  { id: "screen-personal-map", label: "Personal Map",     sub: "Your 4 added places, shareable",        component: PersonalMapScreen,    type: "phone" },
  { id: "research-board",      label: "Research Board",   sub: "15 interviews · synthesis board",       component: ResearchBoardScreen,  type: "wide" },
  { id: "vibe-taxonomy",       label: "Vibe Taxonomy",    sub: "12 vibes with icons and examples",      component: VibeTaxonomyScreen,   type: "wide" },
  { id: "map-style",           label: "Map Style",        sub: "Custom Mapbox neighborhood aesthetic",  component: MapStyleScreen,       type: "wide" },
  { id: "visual-direction",    label: "Visual Direction", sub: "Component overview + design tokens",    component: VisualDirectionScreen, type: "wide" },
] as const;

// ─── Viewer ───────────────────────────────────────────────────────────────────
export default function WireframeViewer() {
  const [current, setCurrent] = useState(0);
  const s = screens[current];
  const Screen = s.component;
  const isPhone = s.type === "phone";

  // Phone: 402×874 displayed at 0.6 scale; Wide: 1200×675 displayed at 0.88 scale
  const frameW = isPhone ? 402 : 1200;
  const frameH = isPhone ? 874 : 675;
  const scale = isPhone ? 0.58 : 0.88;

  return (
    <div style={{ minHeight: "100vh", background: SC.bg, display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 24px 40px", fontFamily: SC.font, boxSizing: "border-box" }}>
      {/* Header */}
      <div style={{ width: "100%", maxWidth: 1320, display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: SC.terracotta, marginBottom: 4 }}>SCOUT · WIREFRAMES</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: SC.white, letterSpacing: "-0.02em" }}>{s.label}</div>
          <div style={{ fontSize: 13, color: "#6B5040", marginTop: 2 }}>{s.sub}</div>
        </div>
        <div style={{ fontSize: 12, color: "#2A1810", paddingTop: 4 }}>
          {String(current + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
        </div>
      </div>

      {/* Frame */}
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top center", flexShrink: 0, marginBottom: isPhone ? `${(frameH * scale - frameH) + 24}px` : 0 }}>
        <div
          data-screen={s.id}
          style={{
            width: frameW,
            height: frameH,
            borderRadius: isPhone ? 56 : 12,
            overflow: "hidden",
            boxShadow: isPhone
              ? "0 0 0 12px #0A0704, 0 0 0 14px #1A0F08, 0 32px 80px rgba(0,0,0,0.85)"
              : "0 0 0 1px #2A1810, 0 32px 80px rgba(0,0,0,0.7)",
          }}
        >
          <Screen />
        </div>
      </div>

      {/* Dot nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8 }}>
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
          style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #2A1810", background: current === 0 ? "transparent" : "#1A0F08", color: current === 0 ? "#2A1810" : SC.white, cursor: current === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none"><path d="M5 1L1 6l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ display: "flex", gap: 7 }}>
          {screens.map((sc, i) => (
            <button key={sc.id} onClick={() => setCurrent(i)} title={sc.label}
              style={{ width: i === current ? 22 : 7, height: 7, borderRadius: 4, background: i === current ? SC.terracotta : "#2A1810", border: "none", cursor: "pointer", transition: "all 0.25s", padding: 0 }} />
          ))}
        </div>
        <button onClick={() => setCurrent(c => Math.min(screens.length - 1, c + 1))} disabled={current === screens.length - 1}
          style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #2A1810", background: current === screens.length - 1 ? "transparent" : "#1A0F08", color: current === screens.length - 1 ? "#2A1810" : SC.white, cursor: current === screens.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none"><path d="M1 1l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: "flex", gap: 8, marginTop: 20, overflowX: "auto", paddingBottom: 4, width: "100%", maxWidth: 1320, justifyContent: "center" }}>
        {screens.map((sc, i) => (
          <button key={sc.id} onClick={() => setCurrent(i)}
            style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 8, border: i === current ? `1.5px solid ${SC.terracotta}` : "1px solid #2A1810", background: i === current ? "#1A0C08" : SC.bg, color: i === current ? SC.terracotta : "#3A2010", cursor: "pointer", textAlign: "left" as const }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 2 }}>{sc.label.toUpperCase()}</div>
            <div style={{ fontSize: 10, opacity: 0.5 }}>{sc.type === "phone" ? "portrait" : "16:9"}</div>
          </button>
        ))}
      </div>

      <p style={{ fontFamily: SC.font, fontSize: 10, color: "#2A1810", marginTop: 20, textAlign: "center", letterSpacing: "0.08em" }}>
        SCOUT · WIREFRAMES · localhost:3000/wireframes/scout
      </p>
    </div>
  );
}

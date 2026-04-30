"use client";
import { useEffect, useState } from "react";

// ─── Load fonts ───────────────────────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    if (document.getElementById("scout-fonts")) return;
    const link = document.createElement("link");
    link.id = "scout-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

// ─── Tokens ───────────────────────────────────────────────────────────────────
const S = {
  sand: "#F5EDE2", paper: "#FBF6EE", linen: "#E8D5BE", shell: "#EFE2CE",
  earth: "#3A2A1E", clay: "#8B6550", silt: "#B8A18E",
  terracotta: "#C4714A", terracottaDeep: "#9F5435",
  moss: "#7A8C6B", slate: "#5C6B78", amber: "#D4A24C", plum: "#7E5A6B",
  road: "#E2C9A7", roadMajor: "#D4B387", water: "#CFD8DC",
  building: "#EAD9C0", buildingDark: "#E0CCB0",
  hairline: "rgba(58,42,30,0.10)", hairlineStrong: "rgba(58,42,30,0.18)",
  bg: "#1A120C",
};
const SF = {
  display: '"Fraunces", Georgia, serif',
  body: '"Geist", -apple-system, system-ui, sans-serif',
  mono: '"Geist Mono", ui-monospace, "SF Mono", monospace',
};

// ─── Vibe taxonomy ────────────────────────────────────────────────────────────
const VIBES = [
  { id: "quiet",    label: "Quiet",         hint: "reading, thinking",  color: "#5C6B78", glyph: "wave"   },
  { id: "lively",   label: "Lively",        hint: "people, energy",     color: "#C4714A", glyph: "spark"  },
  { id: "morning",  label: "Early morning", hint: "before 9am",         color: "#D4A24C", glyph: "sun"    },
  { id: "golden",   label: "Golden hour",   hint: "late afternoon",     color: "#D88B4A", glyph: "sunset" },
  { id: "work",     label: "Work-friendly", hint: "wifi, plugs",        color: "#5C6B78", glyph: "square" },
  { id: "kids",     label: "Good for kids", hint: "family time",        color: "#7A8C6B", glyph: "kite"   },
  { id: "date",     label: "Date spot",     hint: "romantic",           color: "#7E5A6B", glyph: "flame"  },
  { id: "outdoors", label: "Outdoors",      hint: "green, air",         color: "#7A8C6B", glyph: "leaf"   },
  { id: "late",     label: "Late night",    hint: "after 11pm",         color: "#3F4C5A", glyph: "moon"   },
  { id: "cheap",    label: "Cheap eats",    hint: "under ₪40",          color: "#B07A3E", glyph: "coin"   },
  { id: "rainy",    label: "Rainy day",     hint: "indoor, cozy",       color: "#6B7B86", glyph: "drop"   },
  { id: "view",     label: "Hidden view",   hint: "rooftops, sea",      color: "#9F5C4A", glyph: "eye"    },
];

// ─── Places data ──────────────────────────────────────────────────────────────
const PLACES = [
  { id:"p1",  name:"Suzanna",           kind:"Restaurant", street:"Shabazi 14",    vibes:["lively","date"],          tip:"Friday-night sabich on the terrace under the ficus tree. Get there before 7.", x:0.42,y:0.40,by:"Noa",   years:9,  ago:"3d"  },
  { id:"p2",  name:"The yellow bench",  kind:"Bench",      street:"Shabazi 47",    vibes:["quiet","view","golden"],   tip:"Across from the yellow door. Best at 4pm when the light hits the wall.",        x:0.58,y:0.32,by:"Eitan", years:14, ago:"1w"  },
  { id:"p3",  name:"Café Levinsky",     kind:"Café",       street:"Lilienblum 11", vibes:["morning","quiet"],         tip:"Croissants gone by 9. No-laptop policy after 11. Order the cardamom espresso.", x:0.28,y:0.55,by:"Maya",  years:6,  ago:"2d"  },
  { id:"p4",  name:"HaTachana garden",  kind:"Park",       street:"HaTachana",     vibes:["outdoors","kids"],         tip:"Inner courtyard nobody finds. Shaded stones, kids run wild, no dogs allowed.",  x:0.66,y:0.62,by:"Tomer", years:11, ago:"5d"  },
  { id:"p5",  name:"Bookworm",          kind:"Bookshop",   street:"Pines 4",       vibes:["rainy","quiet"],           tip:"Hebrew poetry shelf at the back. Owner Ronit will recommend something perfect.", x:0.48,y:0.50,by:"Dana",  years:7,  ago:"2w"  },
  { id:"p6",  name:"Yehieli rooftop",   kind:"Rooftop",    street:"Yehieli 6",     vibes:["view","date","late"],      tip:"Three friends, a bottle, sunset. The neighbors don't mind if you're quiet.",     x:0.22,y:0.27,by:"Yael",  years:4,  ago:"1d"  },
  { id:"p7",  name:"Yossi the baker",   kind:"Bakery",     street:"Amzaleg 9",     vibes:["morning","cheap"],         tip:"Saturday challah. Order Friday before 4pm or it's gone.",                         x:0.74,y:0.45,by:"Itai",  years:18, ago:"4d"  },
  { id:"p8",  name:"Chelouche corner",  kind:"Wine bar",   street:"Chelouche 3",   vibes:["date","late"],             tip:"Six seats at the bar. Ask Avi about the orange wine from the Negev.",           x:0.36,y:0.74,by:"Lior",  years:5,  ago:"6d"  },
  { id:"p9",  name:"Studio nook",       kind:"Café",       street:"Eilat 22",      vibes:["work","quiet"],            tip:"Two tables, fast wifi, nobody talks. Open weekdays only.",                       x:0.80,y:0.30,by:"Ronit", years:8,  ago:"1w"  },
  { id:"p10", name:"Levontin steps",    kind:"Spot",       street:"Levontin",      vibes:["lively","late"],           tip:"Thursday nights, music spills from somewhere. Sit, listen, leave.",             x:0.18,y:0.42,by:"Gil",   years:10, ago:"3w"  },
  { id:"p11", name:"Suzanne's fig tree",kind:"Tree",       street:"Amzaleg 14",    vibes:["outdoors","golden"],       tip:"August only. Take three figs, leave the rest.",                                  x:0.55,y:0.78,by:"Eitan", years:14, ago:"6mo" },
  { id:"p12", name:"Hashachar gallery", kind:"Gallery",    street:"Pines 18",      vibes:["rainy"],                   tip:"Tiny, free, changes every two weeks. Knock if the door is closed.",             x:0.86,y:0.58,by:"Avi",   years:3,  ago:"2d"  },
];

// ─── Glyph icons ─────────────────────────────────────────────────────────────
function VibeGlyph({ kind, color = "#fff", size = 12 }: { kind: string; color?: string; size?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 14 14" };
  switch (kind) {
    case "wave":   return <svg {...p}><path d="M1 8c1.5-2 3-2 4.5 0S8.5 10 10 8s2.5-2 3 0" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>;
    case "spark":  return <svg {...p}><path d="M7 1.5v3M7 9.5v3M1.5 7h3M9.5 7h3M3 3l1.5 1.5M9.5 9.5L11 11M11 3L9.5 4.5M4.5 9.5L3 11" stroke={color} strokeWidth="1.4" strokeLinecap="round"/></svg>;
    case "sun":    return <svg {...p}><circle cx="7" cy="7" r="2.5" fill={color}/><path d="M7 1.5v1.5M7 11v1.5M1.5 7h1.5M11 7h1.5M3 3l1 1M10 10l1 1M11 3l-1 1M4 10l-1 1" stroke={color} strokeWidth="1.2" strokeLinecap="round"/></svg>;
    case "sunset": return <svg {...p}><path d="M2.5 9.5a4.5 4.5 0 019 0" stroke={color} strokeWidth="1.4" fill="none"/><path d="M1 12h12M3 5l1 1M10 6l1-1M7 2v2" stroke={color} strokeWidth="1.2" strokeLinecap="round"/></svg>;
    case "square": return <svg {...p}><rect x="2" y="2.5" width="10" height="9" rx="1.4" stroke={color} strokeWidth="1.4" fill="none"/><path d="M5 6.5h4M5 8.5h2.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/></svg>;
    case "kite":   return <svg {...p}><path d="M7 1.5L11 6 7 10.5 3 6z" stroke={color} strokeWidth="1.4" fill="none" strokeLinejoin="round"/><path d="M7 10.5l-1.5 2" stroke={color} strokeWidth="1.2" strokeLinecap="round"/></svg>;
    case "flame":  return <svg {...p}><path d="M7 1.5c0 2.5 3 3.5 3 6.5s-1.5 4.5-3 4.5-3-1.5-3-4.5c0-1.5 1-2 1-3.5 1 1 2 .5 2-3z" stroke={color} strokeWidth="1.3" fill="none" strokeLinejoin="round"/></svg>;
    case "leaf":   return <svg {...p}><path d="M2.5 12c0-5.5 4-9.5 9.5-9.5 0 5.5-4 9.5-9.5 9.5z" stroke={color} strokeWidth="1.4" fill="none" strokeLinejoin="round"/><path d="M2.5 12L8 6.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/></svg>;
    case "moon":   return <svg {...p}><path d="M11 8.5A4.5 4.5 0 016 3a5 5 0 105 5.5z" stroke={color} strokeWidth="1.4" fill="none" strokeLinejoin="round"/></svg>;
    case "coin":   return <svg {...p}><circle cx="7" cy="7" r="4.8" stroke={color} strokeWidth="1.4" fill="none"/><path d="M7 4v6M5.5 5.5h3M5.5 8.5h3" stroke={color} strokeWidth="1.2" strokeLinecap="round"/></svg>;
    case "drop":   return <svg {...p}><path d="M7 1.5C7 4 10.5 5.5 10.5 8.5a3.5 3.5 0 11-7 0c0-3 3.5-4.5 3.5-7z" stroke={color} strokeWidth="1.3" fill="none" strokeLinejoin="round"/></svg>;
    case "eye":    return <svg {...p}><path d="M1.5 7c1.8-2.8 3.6-4.2 5.5-4.2S10.7 4.2 12.5 7c-1.8 2.8-3.6 4.2-5.5 4.2S3.3 9.8 1.5 7z" stroke={color} strokeWidth="1.3" fill="none"/><circle cx="7" cy="7" r="1.5" fill={color}/></svg>;
    default: return null;
  }
}

// ─── Pin ─────────────────────────────────────────────────────────────────────
function ScoutPin({ vibe = "lively", variant = "community", count, selected = false, size = 36 }: {
  vibe?: string; variant?: string; count?: number; selected?: boolean; size?: number;
}) {
  const v = VIBES.find(x => x.id === vibe) || VIBES[1];
  const w = size, h = size * 1.18;

  if (variant === "small") {
    return <div style={{ width:9, height:9, borderRadius:9999, background:v.color, boxShadow:`0 0 0 2px ${S.paper}, 0 1px 2px rgba(58,42,30,0.2)` }}/>;
  }
  if (variant === "cluster") {
    return (
      <div style={{ width:42, height:42, borderRadius:9999, background:S.paper, border:`1.5px solid ${S.terracotta}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:SF.mono, fontSize:13, fontWeight:600, color:S.terracottaDeep, boxShadow:"0 4px 10px rgba(58,42,30,0.16), 0 1px 2px rgba(58,42,30,0.08)" }}>{count}</div>
    );
  }

  const fill = variant === "you" ? S.paper : v.color;
  const stroke = variant === "you" ? v.color : "rgba(58,42,30,0.18)";
  const sw = variant === "you" ? 2.5 : 1;
  const gc = variant === "you" ? v.color : "#FBF6EE";

  return (
    <div style={{ position:"relative", width:w, height:h, filter: selected ? "drop-shadow(0 8px 16px rgba(58,42,30,0.4))" : "drop-shadow(0 3px 6px rgba(58,42,30,0.22))", transform: selected ? "scale(1.18)" : "none", transformOrigin:"bottom center" }}>
      <svg width={w} height={h} viewBox="0 0 36 42" style={{ display:"block" }}>
        {selected && <path d="M18 0C8 0 0 8 0 18c0 11.5 14 23 18 24 4-1 18-12.5 18-24 0-10-8-18-18-18z" fill={S.paper}/>}
        <path d="M18 1.5C9 1.5 1.5 9 1.5 18c0 10.5 13 22 16.5 23 3.5-1 16.5-12.5 16.5-23 0-9-7.5-16.5-16.5-16.5z" fill={fill} stroke={stroke} strokeWidth={sw}/>
      </svg>
      <div style={{ position:"absolute", top: w*0.5-1, left:"50%", transform:"translate(-50%, -50%)" }}>
        <VibeGlyph kind={v.glyph} color={gc} size={Math.round(size*0.42)}/>
      </div>
    </div>
  );
}

// ─── Vibe chip ────────────────────────────────────────────────────────────────
function VibeChip({ vibe, active = false, size = "md" }: { vibe: string | typeof VIBES[0]; active?: boolean; size?: "sm"|"md" }) {
  const v = typeof vibe === "string" ? VIBES.find(x => x.id === vibe) : vibe;
  if (!v) return null;
  const py = size === "sm" ? 6 : 8, px = size === "sm" ? 10 : 14, fs = size === "sm" ? 12 : 13;
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:`${py}px ${px}px`, borderRadius:9999, background: active ? v.color : S.paper, color: active ? "#FBF6EE" : S.earth, border:`1px solid ${active ? v.color : S.hairline}`, fontFamily:SF.body, fontSize:fs, fontWeight:500, whiteSpace:"nowrap" as const, boxShadow: active ? "0 1px 4px rgba(58,42,30,0.12)" : "none" }}>
      <VibeGlyph kind={v.glyph} color={active ? "#FBF6EE" : v.color} size={11}/>
      <span>{v.label}</span>
    </div>
  );
}

// ─── Shared bits ──────────────────────────────────────────────────────────────
function Hairline({ vertical = false }: { vertical?: boolean }) {
  return <div style={vertical ? { width:1, alignSelf:"stretch", background:S.hairline } : { height:1, width:"100%", background:S.hairline }}/>;
}
function MonoLabel({ children, color = S.clay, size = 10 }: { children: React.ReactNode; color?: string; size?: number }) {
  return <span style={{ fontFamily:SF.mono, fontSize:size, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase" as const, color }}>{children}</span>;
}
function CircleBtn({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <div style={{ width:40, height:40, borderRadius:9999, background: primary ? S.terracotta : S.paper, border: primary ? "none" : `1px solid ${S.hairline}`, boxShadow: primary ? "0 6px 16px rgba(196,113,74,0.42)" : "0 4px 12px rgba(58,42,30,0.10)", display:"flex", alignItems:"center", justifyContent:"center" }}>
      {children}
    </div>
  );
}
function VibeRail({ active }: { active?: string }) {
  return (
    <div style={{ display:"flex", gap:7, overflowX:"hidden" as const, padding:"0 16px", WebkitMaskImage:"linear-gradient(to right, #000 0%, #000 92%, transparent 100%)" }}>
      <div style={{ padding:"7px 13px", borderRadius:9999, background:S.earth, color:S.paper, fontFamily:SF.body, fontSize:13, fontWeight:500, whiteSpace:"nowrap" as const }}>All</div>
      {VIBES.slice(0,7).map(v => <VibeChip key={v.id} vibe={v} active={active===v.id} size="sm"/>)}
    </div>
  );
}

// ─── Basemap — Neve Tzedek, Tel Aviv ─────────────────────────────────────────
function ScoutBasemap({ width = 390, height = 720 }: { width?: number; height?: number }) {
  const W = width, H = height;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display:"block", position:"absolute", inset:0 }}>
      <rect width={W} height={H} fill={S.sand}/>
      <path d={`M 0 0 L ${W*0.14} 0 L 0 ${H*0.18} Z`} fill={S.water} opacity="0.7"/>
      {/* Parks */}
      <rect x={W*0.55} y={H*0.55} width={W*0.30} height={H*0.18} fill="#D9E2CC" rx="4"/>
      <rect x={W*0.05} y={H*0.78} width={W*0.28} height={H*0.18} fill="#D9E2CC" rx="4"/>
      <rect x={W*0.42} y={H*0.20} width={W*0.05} height={H*0.05} fill="#D9E2CC" rx="2"/>
      {/* Building blocks */}
      {([
        [0.16,0.04,0.20,0.16,S.building],[0.38,0.04,0.16,0.14,S.building],[0.56,0.04,0.18,0.14,S.building],[0.76,0.04,0.22,0.14,S.building],
        [0.16,0.22,0.18,0.16,S.buildingDark],[0.36,0.22,0.20,0.16,S.building],[0.58,0.22,0.18,0.16,S.buildingDark],[0.78,0.22,0.20,0.16,S.building],
        [0.04,0.40,0.10,0.14,S.buildingDark],[0.16,0.42,0.20,0.14,S.building],[0.38,0.42,0.18,0.14,S.buildingDark],[0.58,0.42,0.20,0.14,S.building],[0.80,0.42,0.18,0.14,S.buildingDark],
        [0.04,0.58,0.12,0.14,S.building],[0.18,0.60,0.16,0.14,S.buildingDark],[0.36,0.60,0.18,0.14,S.building],[0.86,0.60,0.12,0.14,S.buildingDark],
        [0.36,0.78,0.18,0.18,S.buildingDark],[0.55,0.78,0.18,0.18,S.building],
      ] as [number,number,number,number,string][]).map(([x,y,w,h,c],i) => (
        <rect key={i} x={W*x} y={H*y} width={W*w} height={H*h} fill={c} rx="2"/>
      ))}
      {/* Streets H */}
      {[0.20,0.40,0.58,0.76].map((y,i) => <line key={"h"+i} x1={0} y1={H*y} x2={W} y2={H*y} stroke={S.road} strokeWidth={i===1||i===2?7:5}/>)}
      {/* Streets V */}
      {[0.36,0.56,0.76].map((x,i) => <line key={"v"+i} x1={W*x} y1={0} x2={W*x} y2={H} stroke={S.road} strokeWidth={5}/>)}
      {/* Shabazi diagonal */}
      <line x1={W*0.05} y1={H*0.10} x2={W*0.95} y2={H*0.50} stroke={S.roadMajor} strokeWidth="9"/>
      {/* Yehieli */}
      <line x1={W*0.04} y1={H*0.30} x2={W*0.40} y2={H*0.06} stroke={S.road} strokeWidth="5"/>
      {/* Street labels */}
      {([
        ["Shabazi",    0.32,0.28,-22],["Lilienblum",0.20,0.62,0],["Pines",0.55,0.20,0],
        ["Yehieli",   0.18,0.18,-36],["HaTachana", 0.68,0.58,0],["Eilat",0.78,0.36,90],
        ["Amzaleg",   0.50,0.78,0], ["Chelouche", 0.20,0.74,0],
      ] as [string,number,number,number][]).map(([name,x,y,r],i) => (
        <text key={"s"+i} x={W*x} y={H*y} transform={`rotate(${r} ${W*x} ${H*y})`}
          fontFamily={SF.display} fontStyle="italic" fontSize="10" fill={S.clay} opacity="0.7">{name}</text>
      ))}
      <text x={W*0.70} y={H*0.65} fontFamily={SF.mono} fontSize="8.5" fill={S.clay} letterSpacing="1" opacity="0.85">HATACHANA</text>
      <text x={W*0.07} y={H*0.88} fontFamily={SF.mono} fontSize="8.5" fill={S.clay} letterSpacing="1" opacity="0.85">SUZANNE DELLAL</text>
      <text x={W*0.02} y={H*0.06} fontFamily={SF.display} fontStyle="italic" fontSize="11" fill={S.clay} opacity="0.8">Mediterranean</text>
    </svg>
  );
}

function ScoutPinLayer({ width=390, height=720, filter=null, selectedId=null, youIds=[] }: {
  width?: number; height?: number; filter?: string|null; selectedId?: string|null; youIds?: string[];
}) {
  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
      {PLACES.map(p => {
        const matches = !filter || p.vibes.includes(filter);
        const dim = !!filter && !matches;
        const isYou = youIds.includes(p.id);
        const isSel = selectedId === p.id;
        return (
          <div key={p.id} style={{ position:"absolute", left:`${p.x*100}%`, top:`${p.y*100}%`, transform:"translate(-50%, -100%)", opacity: dim ? 0.18 : 1, transition:"opacity 250ms" }}>
            <ScoutPin vibe={p.vibes[0]} variant={isYou?"you":"community"} selected={isSel} size={isSel?38:30}/>
          </div>
        );
      })}
    </div>
  );
}

// ─── Phone screens (390 × 844) ────────────────────────────────────────────────
const PW = 390, PH = 844;

function ScreenMap() {
  return (
    <div style={{ position:"relative", width:PW, height:PH, background:S.sand, overflow:"hidden", fontFamily:SF.body }}>
      <ScoutBasemap width={PW} height={PH}/>
      <ScoutPinLayer width={PW} height={PH} youIds={["p2","p11"]}/>
      {/* Header */}
      <div style={{ position:"absolute", top:62, left:16, right:16, zIndex:5, display:"flex", gap:8, alignItems:"center" }}>
        <div style={{ flex:1, padding:"10px 14px", borderRadius:14, background:"rgba(251,246,238,0.92)", backdropFilter:"blur(20px) saturate(180%)", WebkitBackdropFilter:"blur(20px) saturate(180%)", border:`1px solid ${S.hairline}`, boxShadow:"0 6px 20px rgba(58,42,30,0.10)", display:"flex", alignItems:"center", gap:10 }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.5" stroke={S.clay} strokeWidth="1.4" fill="none"/><path d="M9.5 9.5L12 12" stroke={S.clay} strokeWidth="1.4" strokeLinecap="round"/></svg>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:SF.mono, fontSize:9, letterSpacing:"0.16em", textTransform:"uppercase" as const, color:S.clay }}>Neighborhood</div>
            <div style={{ fontFamily:SF.display, fontStyle:"italic", fontSize:17, color:S.earth, lineHeight:1.1, marginTop:1 }}>Neve Tzedek</div>
          </div>
          <span style={{ fontFamily:SF.mono, fontSize:10, letterSpacing:"0.1em", color:S.clay }}>47</span>
        </div>
        <CircleBtn><svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="3" stroke={S.earth} strokeWidth="1.5" fill="none"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke={S.earth} strokeWidth="1.5" strokeLinecap="round"/></svg></CircleBtn>
      </div>
      {/* Vibe rail */}
      <div style={{ position:"absolute", top:124, left:0, right:0, zIndex:5 }}><VibeRail/></div>
      {/* You-are-here */}
      <div style={{ position:"absolute", left:"48%", top:"45%", transform:"translate(-50%,-50%)", zIndex:3 }}>
        <div style={{ width:14, height:14, borderRadius:9999, background:S.terracotta, boxShadow:"0 0 0 5px rgba(196,113,74,0.18), 0 0 0 12px rgba(196,113,74,0.08)" }}/>
      </div>
      {/* Bottom peek */}
      <div style={{ position:"absolute", left:0, right:0, bottom:0, zIndex:6, background:S.paper, borderTopLeftRadius:24, borderTopRightRadius:24, boxShadow:"0 -8px 30px rgba(58,42,30,0.10)", paddingBottom:34 }}>
        <div style={{ width:38, height:4, borderRadius:2, background:S.silt, margin:"10px auto 12px" }}/>
        <div style={{ padding:"4px 20px 12px", display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
          <div>
            <MonoLabel>This week · Neve Tzedek</MonoLabel>
            <div style={{ fontFamily:SF.display, fontSize:20, color:S.earth, marginTop:4, lineHeight:1.1 }}>
              <em style={{ color:S.terracottaDeep, fontStyle:"italic" }}>4 new</em> places
            </div>
          </div>
          <span style={{ fontFamily:SF.body, fontSize:13, color:S.terracottaDeep, fontWeight:500 }}>See all →</span>
        </div>
        <div style={{ display:"flex", gap:10, padding:"0 16px", overflow:"hidden" }}>
          {PLACES.slice(0,3).map(p => (
            <div key={p.id} style={{ flex:"0 0 220px", padding:14, borderRadius:14, background:S.sand, border:`1px solid ${S.hairline}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <ScoutPin vibe={p.vibes[0]} size={20}/>
                <MonoLabel size={9}>{p.kind}</MonoLabel>
              </div>
              <div style={{ fontFamily:SF.display, fontSize:16, color:S.earth, fontWeight:500, lineHeight:1.15 }}>{p.name}</div>
              <div style={{ fontFamily:SF.body, fontSize:11.5, color:S.clay, marginTop:6, lineHeight:1.45, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" as const, overflow:"hidden" }}>"{p.tip}"</div>
              <div style={{ fontFamily:SF.mono, fontSize:9, color:S.clay, marginTop:8, letterSpacing:"0.1em" }}>
                {p.by.toUpperCase()} · {p.years}Y · {p.ago.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* FAB */}
      <div style={{ position:"absolute", right:18, bottom:230, zIndex:7 }}>
        <div style={{ width:52, height:52, borderRadius:9999, background:S.terracotta, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 10px 24px rgba(196,113,74,0.45), 0 2px 4px rgba(58,42,30,0.15)" }}>
          <svg width="22" height="22" viewBox="0 0 22 22"><path d="M11 4v14M4 11h14" stroke={S.paper} strokeWidth="2.2" strokeLinecap="round"/></svg>
        </div>
      </div>
    </div>
  );
}

function ScreenVibeFilter() {
  const v = VIBES.find(x => x.id === "quiet")!;
  return (
    <div style={{ position:"relative", width:PW, height:PH, background:S.sand, overflow:"hidden", fontFamily:SF.body }}>
      <ScoutBasemap width={PW} height={PH}/>
      <ScoutPinLayer width={PW} height={PH} filter="quiet"/>
      <div style={{ position:"absolute", top:62, left:16, right:16, zIndex:5, display:"flex", gap:8, alignItems:"center" }}>
        <CircleBtn><svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke={S.earth} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></CircleBtn>
        <div style={{ flex:1, padding:"10px 14px", borderRadius:14, background:v.color, color:S.paper, boxShadow:"0 6px 18px rgba(92,107,120,0.30)", display:"flex", alignItems:"center", gap:10 }}>
          <VibeGlyph kind={v.glyph} color={S.paper} size={14}/>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:SF.mono, fontSize:9, letterSpacing:"0.16em", opacity:0.7, textTransform:"uppercase" as const }}>Filtering by vibe</div>
            <div style={{ fontFamily:SF.display, fontStyle:"italic", fontSize:17, marginTop:1 }}>Quiet · 4 places</div>
          </div>
          <span style={{ fontFamily:SF.mono, fontSize:14, opacity:0.7 }}>×</span>
        </div>
      </div>
      <div style={{ position:"absolute", top:138, left:36, right:36, zIndex:4, padding:"12px 14px", borderRadius:12, background:"rgba(251,246,238,0.94)", backdropFilter:"blur(10px)", border:`1px solid ${S.hairline}`, boxShadow:"0 8px 22px rgba(58,42,30,0.10)" }}>
        <div style={{ fontFamily:SF.display, fontStyle:"italic", fontSize:14, lineHeight:1.45, color:S.earth }}>"Places where the conversation is quieter than the music. Reading-friendly."</div>
        <div style={{ fontFamily:SF.mono, fontSize:9, color:S.clay, marginTop:6, letterSpacing:"0.12em" }}>FROM THE COMMUNITY</div>
      </div>
      <div style={{ position:"absolute", left:0, right:0, bottom:0, zIndex:6, background:S.paper, borderTopLeftRadius:24, borderTopRightRadius:24, paddingBottom:34, boxShadow:"0 -8px 30px rgba(58,42,30,0.10)" }}>
        <div style={{ width:38, height:4, borderRadius:2, background:S.silt, margin:"10px auto 14px" }}/>
        <div style={{ padding:"0 20px 10px" }}><MonoLabel>Quiet · sorted closest</MonoLabel></div>
        {PLACES.filter(p=>p.vibes.includes("quiet")).slice(0,3).map((p,i,a) => (
          <div key={p.id} style={{ display:"flex", gap:12, padding:"12px 20px", borderTop:i===0?`1px solid ${S.hairline}`:"none", borderBottom:i<a.length-1?`1px solid ${S.hairline}`:"none" }}>
            <ScoutPin vibe="quiet" size={26}/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
                <span style={{ fontFamily:SF.display, fontSize:15, fontWeight:500, color:S.earth }}>{p.name}</span>
                <span style={{ fontFamily:SF.mono, fontSize:9, color:S.clay, letterSpacing:"0.08em" }}>{["180m","340m","520m"][i]}</span>
              </div>
              <div style={{ fontFamily:SF.body, fontSize:12, color:S.clay, marginTop:3, lineHeight:1.4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" as const }}>{p.tip}</div>
              <div style={{ fontFamily:SF.mono, fontSize:9, color:S.silt, marginTop:5, letterSpacing:"0.1em" }}>{p.by.toUpperCase()} · {p.years}Y HERE</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenPlaceCard() {
  const p = PLACES[0];
  return (
    <div style={{ position:"relative", width:PW, height:PH, background:S.sand, overflow:"hidden", fontFamily:SF.body }}>
      <div style={{ position:"absolute", inset:0 }}>
        <ScoutBasemap width={PW} height={PH}/>
        <ScoutPinLayer width={PW} height={PH} selectedId="p1"/>
        <div style={{ position:"absolute", inset:0, background:"rgba(58,42,30,0.18)" }}/>
      </div>
      <div style={{ position:"absolute", top:62, left:16, right:16, zIndex:5, display:"flex", justifyContent:"space-between" }}>
        <CircleBtn><svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke={S.earth} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></CircleBtn>
        <div style={{ display:"flex", gap:8 }}>
          <CircleBtn><svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 13.5l-1-0.9C3.7 9.7 1.5 7.7 1.5 5.4A2.9 2.9 0 016.5 3.5a2.9 2.9 0 005 1.9c0 2.3-2.2 4.3-5.5 7.2L8 13.5z" stroke={S.earth} strokeWidth="1.4" fill="none" strokeLinejoin="round"/></svg></CircleBtn>
          <CircleBtn><svg width="16" height="16" viewBox="0 0 16 16"><path d="M11 5l-1.4-1.4a2 2 0 00-2.8 0L5.4 5.2m5.2 5.6L9.2 12.2a2 2 0 01-2.8 0L4.8 10.6" stroke={S.earth} strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg></CircleBtn>
        </div>
      </div>
      <div style={{ position:"absolute", left:0, right:0, bottom:0, zIndex:6, background:S.paper, borderTopLeftRadius:28, borderTopRightRadius:28, boxShadow:"0 -12px 40px rgba(58,42,30,0.20)", padding:"14px 24px 36px", maxHeight:560 }}>
        <div style={{ width:40, height:4, borderRadius:2, background:S.silt, margin:"0 auto 16px" }}/>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" as const, marginBottom:14 }}>
          {p.vibes.map(id => <VibeChip key={id} vibe={id} size="sm"/>)}
        </div>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:14 }}>
          <div style={{ flex:1 }}>
            <MonoLabel>Restaurant · Shabazi 14</MonoLabel>
            <h2 style={{ fontFamily:SF.display, fontSize:34, fontWeight:500, color:S.earth, lineHeight:1.05, margin:"6px 0 0", letterSpacing:"-0.02em" }}>{p.name}</h2>
            <div style={{ fontFamily:SF.body, fontSize:13, color:S.clay, marginTop:6 }}>4 min walk · open until 23:00</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <span style={{ fontFamily:SF.mono, fontSize:9, letterSpacing:"0.14em", color:S.clay }}>SAVED BY</span>
            <span style={{ fontFamily:SF.display, fontSize:24, fontStyle:"italic", color:S.terracottaDeep, fontWeight:500 }}>23</span>
          </div>
        </div>
        <div style={{ marginTop:22, padding:"18px 0", borderTop:`1px solid ${S.hairline}`, borderBottom:`1px solid ${S.hairline}` }}>
          <p style={{ margin:0, fontFamily:SF.display, fontStyle:"italic", fontSize:21, color:S.earth, lineHeight:1.4, fontWeight:400, letterSpacing:"-0.005em" }}>"{p.tip}"</p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:16 }}>
          <div style={{ width:38, height:38, borderRadius:9999, background:S.linen, border:`1.5px solid ${S.terracotta}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:SF.display, fontStyle:"italic", fontSize:15, color:S.terracottaDeep }}>{p.by[0]}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:SF.body, fontSize:13.5, color:S.earth, fontWeight:500 }}>{p.by} · lives on Shabazi for {p.years} years</div>
            <div style={{ fontFamily:SF.mono, fontSize:9, color:S.clay, marginTop:2, letterSpacing:"0.12em" }}>ADDED {p.ago.toUpperCase()} AGO · 6 OTHER PLACES</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:10, marginTop:20 }}>
          <div style={{ flex:1, padding:"14px 0", borderRadius:14, background:S.earth, color:S.paper, fontFamily:SF.body, fontSize:14, fontWeight:500, textAlign:"center" as const }}>Walk there · 4 min</div>
          <div style={{ width:50, padding:"14px 0", borderRadius:14, border:`1px solid ${S.hairlineStrong}`, textAlign:"center" as const }}>
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ display:"block", margin:"0 auto" }}><path d="M9 2v8M5 6l4-4 4 4M3 14h12" stroke={S.earth} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenAddPlace() {
  return (
    <div style={{ position:"relative", width:PW, height:PH, background:S.paper, overflow:"hidden", fontFamily:SF.body }}>
      <div style={{ padding:"62px 20px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontFamily:SF.body, fontSize:14, color:S.clay }}>Cancel</span>
          <MonoLabel>Step 2 of 3</MonoLabel>
          <span style={{ fontFamily:SF.body, fontSize:14, color:S.terracottaDeep, fontWeight:500 }}>Next</span>
        </div>
        <div style={{ display:"flex", gap:6, marginTop:14 }}>
          <div style={{ flex:1, height:3, borderRadius:9999, background:S.terracotta }}/>
          <div style={{ flex:1, height:3, borderRadius:9999, background:S.terracotta }}/>
          <div style={{ flex:1, height:3, borderRadius:9999, background:S.linen }}/>
        </div>
        <div style={{ marginTop:36 }}>
          <MonoLabel>Adding</MonoLabel>
          <div style={{ fontFamily:SF.display, fontSize:30, fontWeight:500, color:S.earth, lineHeight:1.05, marginTop:6, letterSpacing:"-0.01em" }}>
            Yossi the <em style={{ color:S.terracotta, fontStyle:"italic" }}>baker</em>
          </div>
          <div style={{ fontFamily:SF.body, fontSize:13, color:S.clay, marginTop:6 }}>Bakery · Amzaleg 9, Neve Tzedek</div>
        </div>
        <div style={{ marginTop:36 }}>
          <MonoLabel>What would you say to a friend?</MonoLabel>
          <div style={{ marginTop:12, padding:"18px 18px", borderRadius:14, background:S.sand, border:`1.5px solid ${S.terracotta}`, minHeight:140 }}>
            <div style={{ fontFamily:SF.display, fontStyle:"italic", fontSize:20, lineHeight:1.4, color:S.earth, fontWeight:400 }}>
              "Saturday challah. Order Friday before 4pm or it's gone.<span style={{ display:"inline-block", width:2, height:22, background:S.terracotta, marginLeft:2, verticalAlign:"-3px" }}/>
              "
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, padding:"0 4px" }}>
            <span style={{ fontFamily:SF.mono, fontSize:10, color:S.clay, letterSpacing:"0.12em" }}>ONE SENTENCE · THE SHORTER, THE BETTER</span>
            <span style={{ fontFamily:SF.mono, fontSize:10, color:S.terracotta, fontWeight:500 }}>62/140</span>
          </div>
        </div>
        <div style={{ marginTop:30 }}>
          <MonoLabel>Add a vibe (optional)</MonoLabel>
          <div style={{ display:"flex", gap:7, marginTop:12, flexWrap:"wrap" as const }}>
            <VibeChip vibe="morning" active size="sm"/>
            <VibeChip vibe="quiet" size="sm"/>
            <VibeChip vibe="lively" size="sm"/>
            <VibeChip vibe="rainy" size="sm"/>
            <VibeChip vibe="date" size="sm"/>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenPersonal() {
  return (
    <div style={{ position:"relative", width:PW, height:PH, background:S.paper, overflow:"hidden", fontFamily:SF.body }}>
      <div style={{ padding:"62px 24px 0" }}>
        <MonoLabel>Your map · Neve Tzedek</MonoLabel>
        <h1 style={{ fontFamily:SF.display, fontSize:34, fontWeight:500, color:S.earth, margin:"8px 0 0", letterSpacing:"-0.02em", lineHeight:1 }}>
          Maya's <em style={{ fontStyle:"italic", color:S.terracotta }}>14</em> places
        </h1>
        <div style={{ fontFamily:SF.body, fontSize:13, color:S.clay, marginTop:8, lineHeight:1.5 }}>
          You've lived here 6 years. Here's everything you've added — and the 3 friends who've saved them.
        </div>
      </div>
      <div style={{ margin:"24px 24px 0", borderRadius:18, overflow:"hidden", position:"relative", border:`1px solid ${S.hairline}`, height:210 }}>
        <ScoutBasemap width={342} height={210}/>
        <ScoutPinLayer width={342} height={210} youIds={["p1","p2","p3","p4","p5","p6","p7","p8","p9","p11"]}/>
        <div style={{ position:"absolute", bottom:10, left:10, padding:"5px 10px", borderRadius:9999, background:"rgba(58,42,30,0.86)", color:S.paper, fontFamily:SF.mono, fontSize:10, letterSpacing:"0.1em" }}>14 places · 8 vibes</div>
      </div>
      <div style={{ display:"flex", padding:"20px 24px 0", gap:12 }}>
        {[["14","added"],["38","saved by friends"],["6y","in this neighborhood"]].map(([n,l],i) => (
          <div key={i} style={{ flex:1, padding:"12px 14px", borderRadius:12, background:S.sand, border:`1px solid ${S.hairline}` }}>
            <div style={{ fontFamily:SF.display, fontStyle:"italic", fontSize:24, fontWeight:500, color:S.earth, lineHeight:1 }}>{n}</div>
            <div style={{ fontFamily:SF.mono, fontSize:9, color:S.clay, marginTop:4, letterSpacing:"0.1em", textTransform:"uppercase" as const }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:"24px 24px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:12 }}>
          <MonoLabel>Recent additions</MonoLabel>
          <span style={{ fontFamily:SF.body, fontSize:12, color:S.terracottaDeep, fontWeight:500 }}>See all 14</span>
        </div>
        {PLACES.slice(0,3).map((p,i) => (
          <div key={p.id} style={{ display:"flex", gap:12, padding:"10px 0", borderTop:i===0?`1px solid ${S.hairline}`:"none", borderBottom:`1px solid ${S.hairline}` }}>
            <ScoutPin vibe={p.vibes[0]} variant="you" size={26}/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                <span style={{ fontFamily:SF.display, fontSize:15, fontWeight:500, color:S.earth }}>{p.name}</span>
                <span style={{ fontFamily:SF.mono, fontSize:9, color:S.clay, letterSpacing:"0.1em" }}>{p.ago.toUpperCase()}</span>
              </div>
              <div style={{ fontFamily:SF.body, fontSize:12, color:S.clay, marginTop:2, lineHeight:1.4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" as const }}>"{p.tip}"</div>
              <div style={{ fontFamily:SF.mono, fontSize:9, color:S.silt, marginTop:5, letterSpacing:"0.1em" }}>SAVED BY 3 FRIENDS</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Wide artboards (1280 × 880 or 720) ──────────────────────────────────────
function ArtResearchBoard() {
  const W=1280,H=880;
  const Quote = ({q,who,where}:{q:string;who:string;where:string}) => (
    <div style={{ padding:"20px 22px", background:S.sand, borderRadius:12, border:`1px solid ${S.hairline}` }}>
      <div style={{ fontFamily:SF.display, fontStyle:"italic", fontSize:18, color:S.earth, lineHeight:1.4, fontWeight:400 }}>"{q}"</div>
      <div style={{ fontFamily:SF.mono, fontSize:10, color:S.clay, letterSpacing:"0.12em", marginTop:14, textTransform:"uppercase" as const }}>{who} · {where}</div>
    </div>
  );
  return (
    <div style={{ width:W, height:H, background:S.paper, fontFamily:SF.body, padding:"56px 64px", position:"relative" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:28 }}>
        <div>
          <MonoLabel>Scout · Research 00</MonoLabel>
          <h1 style={{ margin:"10px 0 0", fontFamily:SF.display, fontWeight:500, fontSize:56, letterSpacing:"-0.025em", color:S.earth, lineHeight:1 }}>What people <em style={{ fontStyle:"italic", color:S.terracottaDeep }}>actually</em> said</h1>
          <div style={{ fontFamily:SF.body, fontSize:14, color:S.clay, marginTop:14, maxWidth:620, lineHeight:1.55 }}>12 conversations across Tel Aviv, Lisbon, and Brooklyn. The pattern was immediate: people don't want better reviews — they want their friends' shortlist.</div>
        </div>
        <div style={{ fontFamily:SF.mono, fontSize:10, color:S.clay, letterSpacing:"0.14em" }}>FIG. 00 — N=12 · OCT 2025</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:40, borderTop:`1px solid ${S.hairlineStrong}`, paddingTop:32 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <MonoLabel>Verbatim</MonoLabel>
          <Quote q="I trust my neighbor more than 200 strangers with phones." who="Eitan, 47" where="Tel Aviv · 14y resident"/>
          <Quote q="Google Maps tells me where to eat. It doesn't tell me where my friend Maya eats." who="Dana, 31" where="Lisbon · 5y resident"/>
          <Quote q="I want a list of 8 places, not a search of 800." who="Tomer, 38" where="Brooklyn · 11y resident"/>
        </div>
        <div>
          <MonoLabel>Three insights</MonoLabel>
          <div style={{ marginTop:16 }}>
            {[["01","Trust ≠ rating","Star ratings answer 'is this good?' The real question is 'is this for me, today?' Identity beats aggregation."],["02","Volume is poison","20 great places beats 200 average ones. Curation is a feature, not a constraint."],["03","Locals don't use Yelp","Every interview: locals already have a mental map. They just want to share it."]].map(([n,t,b]) => (
              <div key={n} style={{ paddingTop:18, paddingBottom:18, borderTop:`1px solid ${S.hairline}` }}>
                <div style={{ display:"flex", gap:18 }}>
                  <div style={{ fontFamily:SF.mono, fontSize:11, color:S.terracottaDeep, letterSpacing:"0.16em", paddingTop:4, minWidth:24 }}>{n}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:SF.display, fontSize:22, fontWeight:500, color:S.earth, letterSpacing:"-0.01em" }}>{t}</div>
                    <div style={{ fontFamily:SF.body, fontSize:13, color:S.clay, marginTop:6, lineHeight:1.55 }}>{b}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArtVibeTaxonomy() {
  const W=1280,H=880;
  return (
    <div style={{ width:W, height:H, background:S.paper, fontFamily:SF.body, position:"relative", overflow:"hidden", padding:"64px 72px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:56 }}>
        <div>
          <MonoLabel>Scout · Taxonomy 01</MonoLabel>
          <h1 style={{ margin:"12px 0 0", fontFamily:SF.display, fontWeight:500, fontSize:72, letterSpacing:"-0.025em", color:S.earth, lineHeight:0.96 }}>Twelve <em style={{ fontStyle:"italic", color:S.terracottaDeep }}>vibes</em>,<br/>not five stars.</h1>
        </div>
        <div style={{ width:380, paddingTop:14 }}>
          <div style={{ width:38, height:1, background:S.terracotta, marginBottom:16 }}/>
          <p style={{ margin:0, fontFamily:SF.display, fontStyle:"italic", fontSize:17, lineHeight:1.5, color:S.earth }}>Stars are about quality. Vibes are about fit. Scout asks "what for?" instead of "how good?" — because a place that's perfect at 4pm is wrong at 11pm, and the rating doesn't know.</p>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:0, borderTop:`1px solid ${S.hairlineStrong}` }}>
        {VIBES.map((v,i) => (
          <div key={v.id} style={{ padding:"28px 22px 24px", borderRight:i%4<3?`1px solid ${S.hairline}`:"none", borderBottom:i<8?`1px solid ${S.hairline}`:"none", minHeight:162 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:46, height:46, borderRadius:9999, background:v.color, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(58,42,30,0.10)" }}>
                <VibeGlyph kind={v.glyph} color="#FBF6EE" size={20}/>
              </div>
              <div style={{ fontFamily:SF.mono, fontSize:11, color:S.clay, letterSpacing:"0.14em" }}>{String(i+1).padStart(2,"0")}</div>
            </div>
            <div style={{ fontFamily:SF.display, fontSize:26, fontWeight:500, color:S.earth, marginTop:18, letterSpacing:"-0.012em" }}>{v.label}</div>
            <div style={{ fontFamily:SF.body, fontSize:13, color:S.clay, marginTop:6 }}>{v.hint}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:28, paddingTop:16, borderTop:`1px solid ${S.hairline}`, display:"flex", justifyContent:"space-between", fontFamily:SF.mono, fontSize:10, color:S.clay, letterSpacing:"0.12em" }}>
        <span>SCOUT · NEIGHBORHOOD DISCOVERY</span>
        <span>FIG. 01 — VIBE TAXONOMY · 2026</span>
      </div>
    </div>
  );
}

function ArtMapStyle() {
  const W=1280,H=720;
  return (
    <div style={{ width:W, height:H, position:"relative", overflow:"hidden", background:S.sand, fontFamily:SF.body }}>
      <ScoutBasemap width={W} height={H}/>
      <ScoutPinLayer width={W} height={H} youIds={["p2","p11","p3"]}/>
      <div style={{ position:"absolute", left:48, top:48, zIndex:5, padding:"18px 22px", background:"rgba(251,246,238,0.92)", backdropFilter:"blur(10px)", borderRadius:14, border:`1px solid ${S.hairline}`, boxShadow:"0 6px 22px rgba(58,42,30,0.10)", maxWidth:360 }}>
        <MonoLabel>Map · Custom style</MonoLabel>
        <div style={{ fontFamily:SF.display, fontSize:28, color:S.earth, fontWeight:500, marginTop:10, letterSpacing:"-0.012em", lineHeight:1.1 }}>Neve Tzedek<br/><em style={{ fontStyle:"italic", color:S.terracottaDeep }}>at a glance</em></div>
        <div style={{ fontFamily:SF.body, fontSize:13, color:S.clay, marginTop:10, lineHeight:1.5 }}>Hand-feeling vector basemap. Sand & terracotta do the warming; Mediterranean to the west; Suzanne Dellal & HaTachana parks anchor the south.</div>
      </div>
      <div style={{ position:"absolute", right:48, bottom:48, zIndex:5, padding:"16px 20px", background:"rgba(251,246,238,0.92)", backdropFilter:"blur(10px)", borderRadius:12, border:`1px solid ${S.hairline}` }}>
        <div style={{ fontFamily:SF.mono, fontSize:10, letterSpacing:"0.14em", color:S.clay, marginBottom:14 }}>LEGEND</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[["lively","Place"],["quiet","Quiet spot"],["date","Date spot"]].map(([v,l]) => (
            <div key={v} style={{ display:"flex", alignItems:"center", gap:10 }}>
              <ScoutPin vibe={v} size={20}/><span style={{ fontFamily:SF.body, fontSize:12, color:S.earth }}>{l}</span>
            </div>
          ))}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <ScoutPin vibe="lively" variant="you" size={20}/><span style={{ fontFamily:SF.body, fontSize:12, color:S.earth }}>Yours</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArtVisualDirection() {
  const W=1280,H=880;
  return (
    <div style={{ width:W, height:H, background:S.paper, fontFamily:SF.body, padding:"56px 64px", position:"relative", overflow:"hidden" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:36 }}>
        <div>
          <MonoLabel>Scout · Direction 04</MonoLabel>
          <h1 style={{ margin:"10px 0 0", fontFamily:SF.display, fontWeight:500, fontSize:64, letterSpacing:"-0.025em", color:S.earth, lineHeight:0.98 }}>Modern. Editorial.<br/><em style={{ fontStyle:"italic", color:S.terracottaDeep }}>Warm</em>.</h1>
        </div>
        <div style={{ width:340, paddingTop:20 }}>
          <div style={{ width:38, height:1, background:S.terracotta, marginBottom:16 }}/>
          <p style={{ margin:0, fontFamily:SF.display, fontStyle:"italic", fontSize:16, lineHeight:1.5, color:S.earth }}>Scout looks like a serious tech product, but reads like a hand-drawn neighborhood guide. Sand and terracotta do the warming. Italic Fraunces carries the human voice. Geist Mono does the labelling.</p>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:0, borderTop:`1px solid ${S.hairlineStrong}`, paddingTop:22 }}>
        {[["Sand","#F5EDE2","Map base"],["Paper","#FBF6EE","App surface"],["Linen","#E8D5BE","Cards"],["Earth","#3A2A1E","Text · CTA"],["Clay","#8B6550","Captions"],["Terracotta","#C4714A","Brand · pins"],["Terracotta·Dp","#9F5435","Hover · accent"]].map(([n,h,u],i) => (
          <div key={n} style={{ paddingRight:i<6?16:0 }}>
            <div style={{ width:"100%", height:88, background:h, borderRadius:6, border: h==="#FBF6EE"?`1px solid ${S.hairline}`:"none" }}/>
            <div style={{ marginTop:10, fontFamily:SF.body, fontSize:13, fontWeight:500, color:S.earth }}>{n}</div>
            <div style={{ fontFamily:SF.mono, fontSize:10, color:S.clay, letterSpacing:"0.08em", marginTop:2 }}>{h.toUpperCase()}</div>
            <div style={{ fontFamily:SF.body, fontSize:11.5, color:S.clay, marginTop:6, lineHeight:1.4 }}>{u}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:40, paddingTop:24, borderTop:`1px solid ${S.hairline}`, display:"grid", gridTemplateColumns:"1.6fr 1fr 1fr", gap:36 }}>
        <div>
          <MonoLabel>Display · Fraunces</MonoLabel>
          <div style={{ marginTop:18, fontFamily:SF.display, fontSize:96, fontWeight:500, color:S.earth, letterSpacing:"-0.03em", lineHeight:0.92 }}>Aa <em style={{ fontStyle:"italic", color:S.terracottaDeep }}>Bb</em></div>
          <div style={{ fontFamily:SF.mono, fontSize:10, color:S.clay, letterSpacing:"0.12em", marginTop:14 }}>REGULAR · MEDIUM · MEDIUM ITALIC</div>
        </div>
        <div>
          <MonoLabel>Body · Geist</MonoLabel>
          <div style={{ marginTop:18, fontFamily:SF.body, fontSize:16, color:S.earth, lineHeight:1.55 }}>The yellow bench across from the yellow door. Best at 4pm when the light hits the wall.</div>
          <div style={{ fontFamily:SF.mono, fontSize:10, color:S.clay, letterSpacing:"0.12em", marginTop:14 }}>REGULAR · MEDIUM</div>
        </div>
        <div>
          <MonoLabel>Mono · Geist Mono</MonoLabel>
          <div style={{ marginTop:18, fontFamily:SF.mono, fontSize:12, color:S.earth, letterSpacing:"0.14em", lineHeight:1.7 }}>EITAN · 14Y HERE<br/>NEVE TZEDEK · 47<br/>ADDED 3D AGO</div>
          <div style={{ fontFamily:SF.mono, fontSize:10, color:S.clay, letterSpacing:"0.12em", marginTop:14 }}>LABELS · TIMESTAMPS · METADATA</div>
        </div>
      </div>
      <div style={{ marginTop:40, paddingTop:24, borderTop:`1px solid ${S.hairline}`, display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:0 }}>
        {[["Motion · Calm","Cubic-bezier(0.16, 1, 0.3, 1). 250–400ms. Things slide and settle. Nothing bounces."],["Layout · Hairlines","1px rules at 10% opacity earth. The grid is a whisper, not a shout."],["Voice · Italic","Italic Fraunces marks the human moment. Quotes, neighborhood names, contributor count."]].map(([t,b],i) => (
          <div key={t} style={{ padding:"0 24px 0 0", paddingLeft:i>0?24:0, borderLeft:i>0?`1px solid ${S.hairline}`:"none" }}>
            <MonoLabel>0{i+1}</MonoLabel>
            <div style={{ fontFamily:SF.display, fontStyle:"italic", fontSize:22, fontWeight:400, color:S.earth, marginTop:10, letterSpacing:"-0.01em" }}>{t}</div>
            <div style={{ fontFamily:SF.body, fontSize:13, color:S.clay, marginTop:10, lineHeight:1.55 }}>{b}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Registry ─────────────────────────────────────────────────────────────────
const screens = [
  { id:"screen-map",          label:"Map",              sub:"Neve Tzedek · 47 places",                  component:ScreenMap,          type:"phone" },
  { id:"screen-vibe-filter",  label:"Vibe Filter",      sub:"Quiet · 4 places · sorted closest",        component:ScreenVibeFilter,   type:"phone" },
  { id:"screen-place-card",   label:"Place Card",       sub:"Suzanna · Friday sabich under the ficus",  component:ScreenPlaceCard,    type:"phone" },
  { id:"screen-add-place",    label:"Add a Place",      sub:"Step 2 of 3 · Yossi the baker",            component:ScreenAddPlace,     type:"phone" },
  { id:"screen-personal-map", label:"Personal Map",     sub:"Maya's 14 places · Neve Tzedek",           component:ScreenPersonal,     type:"phone" },
  { id:"research-board",      label:"Research Board",   sub:"N=12 · what people actually said",         component:ArtResearchBoard,   type:"wide"  },
  { id:"vibe-taxonomy",       label:"Vibe Taxonomy",    sub:"12 vibes, not 5 stars",                    component:ArtVibeTaxonomy,    type:"wide"  },
  { id:"map-style",           label:"Map Style",        sub:"Custom basemap · Neve Tzedek at a glance", component:ArtMapStyle,        type:"wideshort" },
  { id:"visual-direction",    label:"Visual Direction", sub:"Modern · Editorial · Warm",                component:ArtVisualDirection, type:"wide"  },
] as const;

type SType = "phone"|"wide"|"wideshort";
const DIMS: Record<SType,{w:number;h:number}> = {
  phone:    {w:390,  h:844},
  wide:     {w:1280, h:880},
  wideshort:{w:1280, h:720},
};

// ─── Viewer ───────────────────────────────────────────────────────────────────
export default function WireframeViewer() {
  useFonts();
  const [current, setCurrent] = useState(0);
  const s = screens[current];
  const Screen = s.component;
  const {w,h} = DIMS[s.type as SType];
  const isPhone = s.type === "phone";
  const scale = isPhone ? 0.72 : 0.72;

  return (
    <div style={{ minHeight:"100vh", background:S.bg, display:"flex", flexDirection:"column", alignItems:"center", padding:"32px 24px 40px", fontFamily:SF.body, boxSizing:"border-box" }}>
      <div style={{ width:"100%", maxWidth:1320, display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
        <div>
          <div style={{ fontFamily:SF.mono, fontSize:10, fontWeight:500, letterSpacing:"0.14em", color:S.terracotta, marginBottom:4 }}>SCOUT · WIREFRAMES</div>
          <div style={{ fontFamily:SF.display, fontStyle:"italic", fontSize:24, color:S.paper, letterSpacing:"-0.01em" }}>{s.label}</div>
          <div style={{ fontFamily:SF.body, fontSize:13, color:S.clay, marginTop:3 }}>{s.sub}</div>
        </div>
        <div style={{ fontFamily:SF.mono, fontSize:12, color:"#2A1810", paddingTop:4 }}>{String(current+1).padStart(2,"0")} / {String(screens.length).padStart(2,"0")}</div>
      </div>

      {/* Scale wrapper (display only) */}
      <div style={{ transform:`scale(${scale})`, transformOrigin:"top center", flexShrink:0, marginBottom:`${(h*scale-h)+24}px` }}>
        <div data-screen={s.id} style={{ width:w, height:h, borderRadius:isPhone?56:4, overflow:"hidden", boxShadow:isPhone?"0 0 0 12px #0A0704, 0 0 0 14px #1A0F08, 0 32px 80px rgba(0,0,0,0.85)":"0 0 0 1px #2A1810, 0 32px 80px rgba(0,0,0,0.7)" }}>
          <Screen/>
        </div>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:20, marginTop:8 }}>
        <button onClick={() => setCurrent(c=>Math.max(0,c-1))} disabled={current===0} style={{ width:40, height:40, borderRadius:"50%", border:"1px solid #2A1810", background:current===0?"transparent":"#1A0F08", color:current===0?"#2A1810":S.paper, cursor:current===0?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none"><path d="M5 1L1 6l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ display:"flex", gap:7 }}>
          {screens.map((sc,i) => (
            <button key={sc.id} onClick={() => setCurrent(i)} title={sc.label} style={{ width:i===current?22:7, height:7, borderRadius:4, background:i===current?S.terracotta:"#2A1810", border:"none", cursor:"pointer", transition:"all 0.25s", padding:0 }}/>
          ))}
        </div>
        <button onClick={() => setCurrent(c=>Math.min(screens.length-1,c+1))} disabled={current===screens.length-1} style={{ width:40, height:40, borderRadius:"50%", border:"1px solid #2A1810", background:current===screens.length-1?"transparent":"#1A0F08", color:current===screens.length-1?"#2A1810":S.paper, cursor:current===screens.length-1?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none"><path d="M1 1l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <div style={{ display:"flex", gap:8, marginTop:20, overflowX:"auto", paddingBottom:4, width:"100%", maxWidth:1320, justifyContent:"center" }}>
        {screens.map((sc,i) => (
          <button key={sc.id} onClick={() => setCurrent(i)} style={{ flexShrink:0, padding:"8px 14px", borderRadius:8, border:i===current?`1.5px solid ${S.terracotta}`:"1px solid #2A1810", background:i===current?"#1A0C08":S.bg, color:i===current?S.terracotta:"#3A2010", cursor:"pointer", textAlign:"left" as const }}>
            <div style={{ fontFamily:SF.mono, fontSize:9.5, fontWeight:500, letterSpacing:"0.08em", marginBottom:2 }}>{sc.label.toUpperCase()}</div>
            <div style={{ fontFamily:SF.mono, fontSize:10, opacity:0.5 }}>{sc.type==="phone"?"portrait":"16:9"}</div>
          </button>
        ))}
      </div>
      <p style={{ fontFamily:SF.mono, fontSize:10, color:"#2A1810", marginTop:20, textAlign:"center", letterSpacing:"0.08em" }}>SCOUT · WIREFRAMES · localhost:3000/wireframes/scout</p>
    </div>
  );
}

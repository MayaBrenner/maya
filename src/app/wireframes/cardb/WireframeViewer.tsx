"use client";
import { useEffect, useState } from "react";

// ─── Fonts ────────────────────────────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    if (document.getElementById("cardb-fonts")) return;
    const link = document.createElement("link");
    link.id = "cardb-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap";
    document.head.appendChild(link);
  }, []);
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  cream:    "#FAF7F2",
  paper:    "#F5F0E8",
  sand:     "#ECE8E2",
  sandDeep: "#DDD8D0",
  ink:      "#1A1814",
  inkMid:   "#2E2A25",
  stone:    "#8A7F76",
  mist:     "#B8B0A7",
  gold:     "#C49A4A",
  goldLight:"#E8D89A",
  goldTint: "#FBF5E6",
  rust:     "#CF5F38",
  rustLight:"#F5C4B0",
  rustTint: "#FEF0EA",
  white:    "#FFFFFF",
};

const F = {
  serif: '"DM Serif Display", Georgia, serif',
  sans:  '"DM Sans", system-ui, -apple-system, sans-serif',
};

// ─── Car silhouette SVG ───────────────────────────────────────────────────────
function CarSilhouette({ color = C.ink, opacity = 0.12, width = 200 }: { color?: string; opacity?: number; width?: number }) {
  const h = width * 0.42;
  return (
    <svg width={width} height={h} viewBox="0 0 200 84" fill="none">
      <path d="M18 54 Q18 38 30 38 L52 38 L70 18 L138 18 L158 38 L172 38 Q182 38 182 54 L182 62 Q182 66 178 66 L22 66 Q18 66 18 62 Z" fill={color} opacity={opacity}/>
      <path d="M74 38 L80 22 L136 22 L154 38 Z" fill={color} opacity={opacity * 1.5}/>
      <circle cx="55" cy="66" r="14" fill={color} opacity={opacity * 1.8}/>
      <circle cx="55" cy="66" r="7" fill={C.cream} opacity={0.9}/>
      <circle cx="145" cy="66" r="14" fill={color} opacity={opacity * 1.8}/>
      <circle cx="145" cy="66" r="7" fill={C.cream} opacity={0.9}/>
    </svg>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({ step, dark = false }: { step?: number; dark?: boolean }) {
  return (
    <div style={{ height: 58, background: dark ? C.ink : C.white, borderBottom: `1px solid ${dark ? "#2E2A25" : C.sand}`, display: "flex", alignItems: "center", padding: "0 36px", justifyContent: "space-between", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
        <span style={{ fontFamily: F.serif, fontSize: 18, color: dark ? C.cream : C.ink, letterSpacing: "-0.01em" }}>Car</span>
        <span style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: "0.04em" }}>DB</span>
      </div>
      {step !== undefined && (
        <span style={{ fontFamily: F.sans, fontSize: 13, color: C.stone }}>{step} of 15</span>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ fontFamily: F.sans, fontSize: 13, color: dark ? C.stone : C.stone, cursor: "pointer" }}>Save progress</span>
        <div style={{ width: 30, height: 30, borderRadius: "50%", border: `1.5px solid ${dark ? C.stone : C.sandDeep}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 600, color: dark ? C.cream : C.ink }}>M</span>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 1: Onboarding ─────────────────────────────────────────────────────
function OnboardingScreen() {
  const options = [
    { label: "Under 100 miles / week", sub: "Mostly local errands and short trips" },
    { label: "100 – 300 miles / week", sub: "Regular commuter, some weekend drives" },
    { label: "300 – 500 miles / week", sub: "Frequent driver, highway miles" },
    { label: "500 + miles / week", sub: "Road warrior — mileage is a key factor" },
  ];
  const selected = 1;

  return (
    <div style={{ width: "100%", height: "100%", background: C.cream, display: "flex", flexDirection: "column", fontFamily: F.sans }}>
      <NavBar step={8} />
      <div style={{ height: 2, background: C.sand, flexShrink: 0 }}>
        <div style={{ height: "100%", width: "53%", background: C.gold }} />
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 120px" }}>
        <div style={{ width: "100%", maxWidth: 600 }}>
          <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: C.stone, marginBottom: 12 }}>
            Driving habits · Question 8
          </div>
          <h2 style={{ fontFamily: F.serif, fontSize: 36, color: C.ink, margin: "0 0 10px", lineHeight: 1.15 }}>
            How many miles do you drive each week?
          </h2>
          <p style={{ fontFamily: F.sans, fontSize: 15, color: C.stone, margin: "0 0 36px", lineHeight: 1.6 }}>
            This helps us prioritise fuel efficiency and range. Approximate is fine.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {options.map((o, i) => {
              const sel = i === selected;
              return (
                <div key={i} style={{ padding: "18px 22px", background: sel ? C.goldTint : C.white, border: `1.5px solid ${sel ? C.gold : C.sand}`, borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: F.sans, fontSize: 15, fontWeight: sel ? 600 : 400, color: sel ? C.ink : C.inkMid }}>{o.label}</div>
                    <div style={{ fontFamily: F.sans, fontSize: 12.5, color: C.stone, marginTop: 2 }}>{o.sub}</div>
                  </div>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: `1.5px solid ${sel ? C.gold : C.sandDeep}`, background: sel ? C.gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {sel && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke={C.white} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36 }}>
            <button style={{ fontFamily: F.sans, fontSize: 14, color: C.stone, background: "none", border: "none", cursor: "pointer", padding: "10px 0", display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M13 5H1M1 5L5 1M1 5L5 9" stroke={C.stone} strokeWidth="1.5" strokeLinecap="round"/></svg>
              Back
            </button>
            <button style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 600, color: C.white, background: C.rust, border: "none", borderRadius: 10, padding: "14px 36px", cursor: "pointer" }}>
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 2: AI Glow ────────────────────────────────────────────────────────
function AIGlowScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: C.ink, display: "flex", flexDirection: "column", fontFamily: F.sans }}>
      <NavBar dark />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {[380, 290, 210, 145, 88].map((size, i) => (
          <div key={i} style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: `1px solid ${C.gold}`, opacity: 0.04 + i * 0.055, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
        ))}
        <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}28 0%, transparent 68%)`, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", border: `1.5px solid ${C.gold}70`, background: `${C.gold}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
              <path d="M3 10 Q3 3 13 3 Q23 3 23 10 Q23 17 13 17 Q3 17 3 10Z" stroke={C.gold} strokeWidth="1.5" fill="none"/>
              <path d="M9 10 L12 13 L17 7" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: F.serif, fontSize: 26, color: C.cream, marginBottom: 10 }}>Finding your match</div>
            <div style={{ fontFamily: F.sans, fontSize: 14, color: C.stone, marginBottom: 20 }}>Reviewing 200+ models against your answers…</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? C.gold : C.stone, opacity: i === 0 ? 1 : 0.4 }} />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
            {["Budget", "Usage", "Family", "Features"].map((label, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, opacity: i < 3 ? 1 : 0.35 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: i < 3 ? C.gold : C.stone }} />
                <span style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 500, color: i < 3 ? C.mist : "#3A3530", letterSpacing: "0.08em" }}>{label.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 3: Results ────────────────────────────────────────────────────────
function ResultsScreen() {
  const cars = [
    { name: "Honda CR-V Hybrid", year: "2024", score: 94, reasons: ["Fits your 100–300 mi/week driving pattern perfectly", "Hybrid saves ~$180/month at your weekly mileage", "Seating for 5 with cargo room for weekend trips"], price: "$32,400 – $38,600", best: true },
    { name: "Toyota RAV4 Hybrid", year: "2024", score: 89, reasons: ["Proven reliability — avg 180k miles before major work", "AWD standard — suited for your climate", "Strong resale value at 3 and 5 years"], price: "$33,100 – $40,200", best: false },
    { name: "Mazda CX-5", year: "2024", score: 84, reasons: ["Best driving feel in class — matters on long commutes", "Premium interior without the premium badge price", "Below your budget ceiling with room to add features"], price: "$29,800 – $35,500", best: false },
    { name: "Subaru Outback", year: "2024", score: 79, reasons: ["Standard AWD — best ground clearance in class", "Largest cargo area: 75.7 cu ft vs avg 40", "Fuel economy lower than hybrids at this range"], price: "$30,100 – $36,800", best: false },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: C.cream, display: "flex", flexDirection: "column", fontFamily: F.sans }}>
      <NavBar />
      <div style={{ padding: "18px 36px 14px", background: C.white, borderBottom: `1px solid ${C.sand}`, flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ fontFamily: F.serif, fontSize: 24, color: C.ink, margin: 0 }}>Your matches</h1>
            <p style={{ fontFamily: F.sans, fontSize: 13, color: C.stone, margin: "4px 0 0" }}>4 cars matched your profile · Ranked by fit, not commission.</p>
          </div>
          <button style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 600, color: C.white, background: C.rust, border: "none", borderRadius: 10, padding: "11px 24px", cursor: "pointer" }}>
            Send to expert →
          </button>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          {["All matches", "New only", "Under $35k", "Hybrid / EV", "More filters"].map((f, i) => (
            <div key={i} style={{ padding: "6px 14px", borderRadius: 20, background: i === 0 ? C.ink : C.cream, border: `1px solid ${i === 0 ? C.ink : C.sandDeep}`, fontFamily: F.sans, fontSize: 12, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? C.white : C.stone, cursor: "pointer" }}>
              {f}
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: "18px 36px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, overflow: "hidden" }}>
        {cars.map((car, i) => (
          <div key={i} style={{ background: C.white, borderRadius: 14, border: `1.5px solid ${i === 0 ? C.gold : C.sand}`, padding: "18px 20px", display: "flex", flexDirection: "column", cursor: "pointer", position: "relative", overflow: "hidden" }}>
            {car.best && (
              <div style={{ position: "absolute", top: 14, right: 14, background: C.goldTint, border: `1px solid ${C.gold}60`, color: C.gold, fontFamily: F.sans, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", padding: "3px 9px", borderRadius: 4 }}>BEST MATCH</div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ fontFamily: F.serif, fontSize: 17, color: C.ink }}>{car.name}</div>
                <div style={{ fontFamily: F.sans, fontSize: 12, color: C.stone, marginTop: 2 }}>{car.year} model year</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
                <div style={{ fontFamily: F.serif, fontSize: 30, color: C.rust, lineHeight: 1 }}>{car.score}<span style={{ fontFamily: F.sans, fontSize: 13, color: C.stone }}>%</span></div>
                <div style={{ fontFamily: F.sans, fontSize: 9, color: C.stone, letterSpacing: "0.1em" }}>MATCH</div>
              </div>
            </div>
            <div style={{ marginBottom: 10, opacity: 0.5 }}>
              <CarSilhouette color={C.ink} opacity={0.08} width={130} />
            </div>
            <div style={{ flex: 1 }}>
              {car.reasons.map((r, j) => (
                <div key={j} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.gold, marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontFamily: F.sans, fontSize: 12, color: C.inkMid, lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.sand}` }}>
              <span style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: C.ink }}>{car.price}</span>
              <span style={{ fontFamily: F.sans, fontSize: 12, color: C.stone }}>Details →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 4: Car Detail ─────────────────────────────────────────────────────
function CarDetailScreen() {
  const specs = [
    { plain: "Fits 5 full-size adults — no one folded in the back", raw: "5 adults (188cm headroom front/rear)" },
    { plain: "~$130/month in fuel at your weekly mileage", raw: "43 mpg city / 37 mpg highway (hybrid)" },
    { plain: "Costco run + carry-on + dog in the back, no problem", raw: "33.2 cu ft cargo (72.8 ft³ folded)" },
    { plain: "Add AWD for $1,500 if you drive in rain or snow often", raw: "AWD optional, FWD standard" },
    { plain: "Auto braking, lane assist, cruise — all included", raw: "Honda Sensing standard on all trims" },
    { plain: "Brisk enough for highway merges — not sporty, not slow", raw: "0–60 mph: 7.8s (hybrid powertrain)" },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: C.cream, display: "flex", flexDirection: "column", fontFamily: F.sans }}>
      <NavBar />
      <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
        <div style={{ width: 340, background: C.white, borderRight: `1px solid ${C.sand}`, padding: "28px", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <button style={{ fontFamily: F.sans, fontSize: 13, color: C.stone, background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M13 5H1M1 5L5 1M1 5L5 9" stroke={C.stone} strokeWidth="1.5" strokeLinecap="round"/></svg>
            Back to results
          </button>
          <div style={{ background: C.cream, borderRadius: 12, height: 140, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22, border: `1px solid ${C.sand}` }}>
            <CarSilhouette color={C.ink} opacity={0.15} width={200} />
          </div>
          <div style={{ fontFamily: F.serif, fontSize: 21, color: C.ink, marginBottom: 2 }}>Honda CR-V Hybrid</div>
          <div style={{ fontFamily: F.sans, fontSize: 13, color: C.stone }}>2024 · EX-L trim · from $35,450</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0" }}>
            <div style={{ background: C.rustTint, borderRadius: 8, padding: "6px 14px", display: "flex", alignItems: "baseline", gap: 2 }}>
              <span style={{ fontFamily: F.serif, fontSize: 28, color: C.rust, lineHeight: 1 }}>94</span>
              <span style={{ fontFamily: F.sans, fontSize: 13, color: C.rust }}>%</span>
            </div>
            <span style={{ fontFamily: F.sans, fontSize: 13, color: C.stone }}>match</span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button style={{ padding: "14px", background: C.rust, color: C.white, border: "none", borderRadius: 10, fontFamily: F.sans, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Send to expert →</button>
            <button style={{ padding: "13px", background: "transparent", color: C.ink, border: `1.5px solid ${C.sandDeep}`, borderRadius: 10, fontFamily: F.sans, fontSize: 14, cursor: "pointer" }}>Add to shortlist</button>
          </div>
        </div>
        <div style={{ flex: 1, padding: "28px 32px", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
            <h2 style={{ fontFamily: F.serif, fontSize: 20, color: C.ink, margin: 0 }}>What this car means for you</h2>
            <div style={{ background: C.rustTint, border: `1px solid ${C.rustLight}`, borderRadius: 4, padding: "3px 9px", fontFamily: F.sans, fontSize: 9, fontWeight: 700, color: C.rust, letterSpacing: "0.06em" }}>AI TRANSLATED</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {specs.map((s, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.sand}`, padding: "16px 18px" }}>
                <div style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 500, color: C.ink, lineHeight: 1.5, marginBottom: 7 }}>{s.plain}</div>
                <div style={{ fontFamily: F.sans, fontSize: 11, color: C.stone, lineHeight: 1.4 }}>{s.raw}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 5: Expert Handoff ─────────────────────────────────────────────────
function ExpertHandoffScreen() {
  const statuses = ["Shortlist sent", "Expert reviewing", "Response received"];
  const current = 1;

  return (
    <div style={{ width: "100%", height: "100%", background: C.cream, display: "flex", flexDirection: "column", fontFamily: F.sans }}>
      <NavBar />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 64px" }}>
        <div style={{ width: "100%", maxWidth: 860, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 28 }}>
          <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.sand}`, padding: "28px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: C.stone, marginBottom: 18 }}>YOUR ADVISOR</div>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 22 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.paper, border: `1.5px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: F.serif, fontSize: 22, color: C.gold }}>S</span>
              </div>
              <div>
                <div style={{ fontFamily: F.serif, fontSize: 18, color: C.ink }}>Sarah Chen</div>
                <div style={{ fontFamily: F.sans, fontSize: 13, color: C.stone, marginTop: 2 }}>Certified Automotive Advisor</div>
                <div style={{ fontFamily: F.sans, fontSize: 12, color: C.mist, marginTop: 1 }}>8 years · 1,400+ clients</div>
                <div style={{ display: "flex", gap: 3, marginTop: 8 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill={C.gold}><path d="M6 1l1.5 3.1L11 4.6l-2.5 2.4.6 3.4L6 9l-3.1 1.4.6-3.4L1 4.6l3.5-.5L6 1z"/></svg>
                  ))}
                  <span style={{ fontFamily: F.sans, fontSize: 11, color: C.stone, marginLeft: 4 }}>4.9</span>
                </div>
              </div>
            </div>
            <div style={{ background: C.cream, borderRadius: 8, padding: "12px 14px", marginBottom: 20 }}>
              <div style={{ fontFamily: F.sans, fontSize: 11, color: C.stone, marginBottom: 2 }}>Expected response</div>
              <div style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 600, color: C.ink }}>Within 2 hours</div>
            </div>
            <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: C.stone, marginBottom: 14 }}>STATUS</div>
            {statuses.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: i < current ? C.gold : i === current ? C.rust : "transparent", border: `1.5px solid ${i === current ? C.rust : i < current ? C.gold : C.sandDeep}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {i < current && <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>}
                    {i === current && <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.rust }} />}
                  </div>
                  {i < statuses.length - 1 && <div style={{ width: 1, height: 18, background: i < current ? C.gold : C.sandDeep, marginTop: 3 }} />}
                </div>
                <div style={{ paddingTop: 2 }}>
                  <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: i === current ? 600 : 400, color: i <= current ? C.ink : C.mist }}>{s}</div>
                  {i === current && <div style={{ fontFamily: F.sans, fontSize: 11, color: C.stone, marginTop: 2 }}>Sarah is reviewing your shortlist now</div>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: C.stone, marginBottom: 2 }}>YOUR SHORTLIST</div>
            {[{ name: "Honda CR-V Hybrid 2024", score: 94 }, { name: "Toyota RAV4 Hybrid 2024", score: 89 }].map((car, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.sand}`, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 500, color: C.ink }}>{car.name}</div>
                  <div style={{ fontFamily: F.sans, fontSize: 12, color: C.stone, marginTop: 2 }}>In your shortlist</div>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                  <span style={{ fontFamily: F.serif, fontSize: 22, color: C.rust }}>{car.score}</span>
                  <span style={{ fontFamily: F.sans, fontSize: 11, color: C.stone }}>%</span>
                </div>
              </div>
            ))}
            <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.sand}`, padding: "18px 20px" }}>
              <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: C.stone, marginBottom: 12 }}>WHAT SARAH WILL CHECK</div>
              {["Current incentives and regional pricing for your area", "Known reliability issues flagged in the last 18 months", "Which trim level gives the best value at your budget"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.gold, marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontFamily: F.sans, fontSize: 12.5, color: C.inkMid, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ padding: "14px", background: "transparent", color: C.stone, border: `1.5px solid ${C.sand}`, borderRadius: 10, fontFamily: F.sans, fontSize: 13, cursor: "pointer" }}>
              Add more cars to shortlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 6: Dealership Brief ───────────────────────────────────────────────
function DealershipBriefScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: C.cream, display: "flex", flexDirection: "column", fontFamily: F.sans }}>
      <NavBar />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", justifyContent: "center", padding: "22px 48px" }}>
        <div style={{ width: "100%", maxWidth: 840, background: C.white, borderRadius: 16, border: `1px solid ${C.sand}`, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 32px rgba(26,24,20,0.06)" }}>
          <div style={{ background: C.ink, padding: "22px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 1, marginBottom: 6 }}>
                <span style={{ fontFamily: F.serif, fontSize: 12, color: C.stone }}>Car</span>
                <span style={{ fontFamily: F.sans, fontSize: 9, fontWeight: 700, color: C.gold, letterSpacing: "0.04em" }}>DB</span>
                <span style={{ fontFamily: F.sans, fontSize: 9, color: C.stone, marginLeft: 8, letterSpacing: "0.1em" }}>· DEALERSHIP BRIEF</span>
              </div>
              <div style={{ fontFamily: F.serif, fontSize: 20, color: C.cream }}>Honda CR-V Hybrid 2024</div>
              <div style={{ fontFamily: F.sans, fontSize: 12, color: C.stone, marginTop: 2 }}>EX-L trim · Prepared by Sarah Chen · May 5, 2026</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ padding: "9px 18px", background: "transparent", color: C.stone, border: "1px solid #2E2A25", borderRadius: 8, fontFamily: F.sans, fontSize: 13, cursor: "pointer" }}>Share</button>
              <button style={{ padding: "9px 18px", background: C.gold, color: C.ink, border: "none", borderRadius: 8, fontFamily: F.sans, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Print</button>
            </div>
          </div>
          <div style={{ flex: 1, padding: "22px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.stone, marginBottom: 10 }}>RECOMMENDED CONFIGURATION</div>
                <div style={{ background: C.cream, borderRadius: 10, padding: "14px 16px", border: `1px solid ${C.sand}` }}>
                  <div style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 600, color: C.ink, marginBottom: 6 }}>EX-L with AWD</div>
                  <div style={{ fontFamily: F.sans, fontSize: 12, color: C.stone, lineHeight: 1.6 }}>AWD worth the $1,500 premium given your climate. EX-L adds leather + heated seats — meaningful resale difference. Skip Sport Touring; panoramic roof adds cost without utility for your use case.</div>
                </div>
              </div>
              <div>
                <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.stone, marginBottom: 10 }}>FAIR PRICE RANGE</div>
                <div style={{ background: C.cream, borderRadius: 10, padding: "14px 16px", border: `1px solid ${C.sand}` }}>
                  <div style={{ fontFamily: F.serif, fontSize: 22, color: C.ink }}>$36,800 – $38,400</div>
                  <div style={{ fontFamily: F.sans, fontSize: 12, color: C.stone, marginTop: 4, lineHeight: 1.5 }}>MSRP is $38,650. Market: $800–1,500 under MSRP typical for this trim. Honda financing at 2.9% APR available.</div>
                </div>
              </div>
              <div>
                <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.stone, marginBottom: 10 }}>SARAH'S NOTE</div>
                <div style={{ background: C.goldTint, borderRadius: 10, padding: "14px 16px", border: `1px solid ${C.gold}40` }}>
                  <div style={{ fontFamily: F.serif, fontSize: 14, fontStyle: "italic", color: C.ink, lineHeight: 1.65 }}>"This is a strong match for your profile. The hybrid drivetrains on the 2024 CR-V have a cleaner reliability record than the 2022–23 models. I'd suggest test-driving the EX-L first — the interior feel matters more than the spec sheet suggests."</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.stone, marginBottom: 10 }}>QUESTIONS TO ASK</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["What are the current incentives for the EX-L trim this month?", "Can I get the out-the-door price in writing before the test drive?", "What's the dealer's history with CR-V Hybrid warranty claims?"].map((q, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "12px 14px", background: C.cream, borderRadius: 8, border: `1px solid ${C.sand}` }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.ink, color: C.cream, fontFamily: F.sans, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ fontFamily: F.sans, fontSize: 12.5, color: C.ink, lineHeight: 1.5 }}>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.stone, marginBottom: 10 }}>WATCH FOR</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Extended warranty upsell — Honda Care is good value; dealer warranties rarely are", "Add-ons at signing: paint protection, fabric guard, key insurance — all markup"].map((w, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "12px 14px", background: C.rustTint, borderRadius: 8, border: `1px solid ${C.rustLight}` }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                        <path d="M7 1L13 12H1L7 1Z" stroke={C.rust} strokeWidth="1.2" fill="none"/>
                        <path d="M7 5v3M7 10v.5" stroke={C.rust} strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      <span style={{ fontFamily: F.sans, fontSize: 12.5, color: C.ink, lineHeight: 1.5 }}>{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 7: Animation Glow (square) ───────────────────────────────────────
function AnimationGlowScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: C.inkMid, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: F.sans, position: "relative" }}>
      <div style={{ position: "absolute", top: 20, left: 20, fontFamily: F.sans, fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", color: C.stone }}>AI THINKING · CHOSEN DIRECTION</div>
      {[320, 240, 168, 108, 62].map((size, i) => (
        <div key={i} style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: `1px solid ${C.gold}`, opacity: 0.04 + i * 0.055 }} />
      ))}
      <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}28 0%, transparent 70%)` }} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", border: `1.5px solid ${C.gold}70`, background: `${C.gold}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
            <path d="M3 10 Q3 3 13 3 Q23 3 23 10 Q23 17 13 17 Q3 17 3 10Z" stroke={C.gold} strokeWidth="1.5" fill="none"/>
            <path d="M9 10 L12 13 L17 7" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: F.serif, fontSize: 20, color: C.cream, marginBottom: 8 }}>Finding your match</div>
          <div style={{ display: "flex", gap: 7, justifyContent: "center" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i === 0 ? C.gold : C.stone, opacity: i === 0 ? 1 : 0.35 }} />
            ))}
          </div>
        </div>
        <div style={{ background: `${C.gold}18`, borderRadius: 999, padding: "6px 18px", border: `1px solid ${C.gold}30` }}>
          <span style={{ fontFamily: F.sans, fontSize: 11, color: C.gold, letterSpacing: "0.06em" }}>A glow says "working on something"</span>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 8: Animation Rejected (square) ────────────────────────────────────
function AnimationRejectedScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: C.paper, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: F.sans, position: "relative" }}>
      <div style={{ position: "absolute", top: 20, left: 20, fontFamily: F.sans, fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", color: C.mist }}>REJECTED APPROACH</div>
      <div style={{ position: "absolute", top: 18, right: 20, background: C.rustTint, borderRadius: 4, padding: "4px 10px", fontFamily: F.sans, fontSize: 9, fontWeight: 700, color: C.rust, letterSpacing: "0.08em" }}>✕ NOT USED</div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, opacity: 0.55 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", border: `4px solid ${C.sand}`, borderTopColor: C.stone, position: "relative" }}>
          <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "4px solid transparent", borderTopColor: C.mist, transform: "rotate(60deg)" }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: F.sans, fontSize: 16, color: C.ink }}>Loading results…</div>
          <div style={{ fontFamily: F.sans, fontSize: 12, color: C.stone, marginTop: 4 }}>Please wait</div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 28, fontFamily: F.sans, fontSize: 12, color: C.mist, textAlign: "center", padding: "0 40px", lineHeight: 1.6 }}>
        A spinner says "wait" — it makes no promise<br/>and signals nothing about what's happening
      </div>
    </div>
  );
}

// ─── Screen 9: Journey Map ────────────────────────────────────────────────────
function JourneyMapScreen() {
  const phases = ["Awareness", "Research", "Selection", "Expert Review", "Dealership", "Ownership"];
  const emotions = [2, 1, 0, 2, 1, 3];
  const emoColors = ["#CC5544", "#C49A4A", "#8A7F76", "#5A8A5A"];
  const emoLabels = ["Frustrated", "Uncertain", "Overwhelmed", "Confident"];

  return (
    <div style={{ width: "100%", height: "100%", background: C.white, display: "flex", flexDirection: "column", fontFamily: F.sans }}>
      <NavBar />
      <div style={{ flex: 1, padding: "24px 40px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontFamily: F.serif, fontSize: 22, color: C.ink, margin: 0 }}>Car Buyer Journey Map</h2>
            <p style={{ fontFamily: F.sans, fontSize: 13, color: C.stone, margin: "4px 0 0" }}>Emotions & touchpoints · First-time buyer · Upgrading family · Replacing</p>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {emoLabels.map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: emoColors[i] }} />
                <span style={{ fontFamily: F.sans, fontSize: 11, color: C.stone }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
          {phases.map((phase, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: emoColors[emotions[i]] + "20", border: `1.5px solid ${emoColors[emotions[i]]}60`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: emoColors[emotions[i]] }} />
                </div>
              </div>
              <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700, color: i === 3 ? C.gold : C.inkMid, textAlign: "center", marginBottom: 10, letterSpacing: "0.06em", background: i === 3 ? C.goldTint : C.cream, padding: "5px 6px", borderRadius: 6, border: i === 3 ? `1px solid ${C.gold}50` : "none" }}>
                {phase.toUpperCase()}
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                {[
                  ["TV ads", "Word of mouth", "Google search"],
                  ["Comparison sites", "40+ attributes", "Reddit forums"],
                  ["Test drives", "Price confusion", "Overwhelm"],
                  ["CarDB AI", "Expert Sarah", "Shortlist sent"],
                  ["Salesperson", "Pressure tactics", "Brief in hand"],
                  ["No regret", "Tells friends", "Returns"],
                ][i].map((item, j) => (
                  <div key={j} style={{ background: i === 3 ? C.goldTint : C.cream, border: `1px solid ${i === 3 ? C.gold + "50" : C.sand}`, borderRadius: 6, padding: "7px 10px", fontFamily: F.sans, fontSize: 11, color: C.inkMid, lineHeight: 1.3 }}>{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen registry ──────────────────────────────────────────────────────────
const screens = [
  { id: "screen-onboarding",       label: "Onboarding",        sub: "Question 8 of 15 · driving habits",     component: OnboardingScreen,       aspect: "16:9" },
  { id: "ai-glow",                 label: "AI Thinking",       sub: "Warm glow — chosen direction",           component: AIGlowScreen,           aspect: "16:9" },
  { id: "screen-results",          label: "Results",           sub: "4 car match cards with reasoning",       component: ResultsScreen,          aspect: "16:9" },
  { id: "screen-car-detail",       label: "Car Detail",        sub: "Translated specs — Honda CR-V",          component: CarDetailScreen,        aspect: "16:9" },
  { id: "screen-expert-handoff",   label: "Expert Handoff",    sub: "Advisor profile · reviewing state",      component: ExpertHandoffScreen,    aspect: "16:9" },
  { id: "screen-dealership-brief", label: "Dealership Brief",  sub: "Generated visit brief",                  component: DealershipBriefScreen,  aspect: "16:9" },
  { id: "animation-glow",          label: "Animation · Glow",  sub: "AI thinking state detail",               component: AnimationGlowScreen,    aspect: "1:1" },
  { id: "animation-rejected",      label: "Animation · ✕ Spin",sub: "Standard spinner — why we rejected",     component: AnimationRejectedScreen, aspect: "1:1" },
  { id: "journey-map",             label: "Journey Map",       sub: "3 user types · emotions + touchpoints",  component: JourneyMapScreen,       aspect: "16:9" },
];

// ─── Viewer ───────────────────────────────────────────────────────────────────
export default function WireframeViewer() {
  useFonts();
  const [current, setCurrent] = useState(0);
  const s = screens[current];
  const Screen = s.component;
  const isSquare = s.aspect === "1:1";
  const scale = isSquare ? 1 : 0.88;
  const W = isSquare ? 640 : 1280;
  const H = isSquare ? 640 : 720;

  return (
    <div style={{ minHeight: "100vh", background: "#F0EBE2", display: "flex", flexDirection: "column", alignItems: "center", padding: "36px 24px 44px", boxSizing: "border-box", fontFamily: F.sans }}>
      {/* Top bar */}
      <div style={{ width: "100%", maxWidth: 1360, display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 1, marginBottom: 8 }}>
            <span style={{ fontFamily: F.serif, fontSize: 11, color: C.stone }}>Car</span>
            <span style={{ fontFamily: F.sans, fontSize: 9, fontWeight: 700, color: C.gold, letterSpacing: "0.06em" }}>DB</span>
            <span style={{ fontFamily: F.sans, fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.mist, marginLeft: 8 }}>· WIREFRAMES</span>
          </div>
          <div style={{ fontFamily: F.serif, fontSize: 26, color: C.ink }}>{s.label}</div>
          <div style={{ fontFamily: F.sans, fontSize: 13, color: C.stone, marginTop: 3 }}>{s.sub}</div>
        </div>
        <div style={{ fontFamily: F.sans, fontSize: 12, color: C.sandDeep, paddingTop: 4 }}>
          {String(current + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
        </div>
      </div>

      {/* Frame */}
      <div
        data-screen={s.id}
        style={{ width: W, height: H, borderRadius: 14, overflow: "hidden", boxShadow: "0 0 0 1px rgba(26,24,20,0.08), 0 24px 64px rgba(26,24,20,0.12)", flexShrink: 0, transform: `scale(${scale})`, transformOrigin: "top center" }}
      >
        <Screen />
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: isSquare ? 32 : 4 }}>
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} style={{ width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${C.sandDeep}`, background: "transparent", color: current === 0 ? C.sand : C.ink, cursor: current === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ display: "flex", gap: 7 }}>
          {screens.map((sc, i) => (
            <button key={sc.id} onClick={() => setCurrent(i)} title={sc.label} style={{ width: i === current ? 22 : 7, height: 7, borderRadius: 4, background: i === current ? C.rust : C.sandDeep, border: "none", cursor: "pointer", transition: "all 0.25s ease", padding: 0 }} />
          ))}
        </div>
        <button onClick={() => setCurrent(c => Math.min(screens.length - 1, c + 1))} disabled={current === screens.length - 1} style={{ width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${C.sandDeep}`, background: "transparent", color: current === screens.length - 1 ? C.sand : C.ink, cursor: current === screens.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: "flex", gap: 8, marginTop: 22, overflowX: "auto", paddingBottom: 4, width: "100%", maxWidth: 1360, justifyContent: "center" }}>
        {screens.map((sc, i) => (
          <button key={sc.id} onClick={() => setCurrent(i)} style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${i === current ? C.rust : C.sandDeep}`, background: i === current ? C.rustTint : "transparent", color: i === current ? C.rust : C.stone, cursor: "pointer", textAlign: "left" as const }}>
            <div style={{ fontFamily: F.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 2 }}>{sc.label.toUpperCase()}</div>
            <div style={{ fontFamily: F.sans, fontSize: 10, opacity: 0.5 }}>{sc.aspect}</div>
          </button>
        ))}
      </div>

      <p style={{ fontFamily: F.sans, fontSize: 10, color: C.sandDeep, marginTop: 20, textAlign: "center", letterSpacing: "0.08em" }}>
        CARDB · localhost:3000/wireframes/cardb
      </p>
    </div>
  );
}

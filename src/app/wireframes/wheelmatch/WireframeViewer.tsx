"use client";
import { useState } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const WM = {
  ice: "#E8EDF5",
  navy: "#1A2744",
  navyDeep: "#0F1A2E",
  navyMid: "#253660",
  white: "#FFFFFF",
  lime: "#C8F135",
  limeMid: "#A8CE1A",
  slate: "#6B7A99",
  border: "#D0D8E8",
  borderSoft: "#E4EAF4",
  muted: "#8A96B0",
  bg: "#0A0F1A",
  font: '"Inter", "Helvetica Neue", system-ui, sans-serif',
  mono: '"JetBrains Mono", "Fira Code", monospace',
};

// ─── Shared: Browser chrome wrapper ──────────────────────────────────────────
function Browser({ children, url = "wheelmatch.app", dark = false }: { children: React.ReactNode; url?: string; dark?: boolean }) {
  return (
    <div style={{ width: 1280, height: 720, display: "flex", flexDirection: "column", background: dark ? WM.navyDeep : WM.ice, overflow: "hidden" }}>
      {/* Browser bar */}
      <div style={{ height: 40, background: dark ? "#1A1F2E" : "#F0F4FA", borderBottom: `1px solid ${dark ? "#2A3050" : WM.border}`, display: "flex", alignItems: "center", padding: "0 16px", gap: 12, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ background: dark ? "#252B40" : WM.white, border: `1px solid ${dark ? "#3A4260" : WM.border}`, borderRadius: 6, padding: "4px 16px", fontFamily: WM.font, fontSize: 12, color: dark ? WM.muted : WM.slate, minWidth: 280, textAlign: "center" }}>
            {url}
          </div>
        </div>
        <div style={{ width: 72 }} />
      </div>
      {/* Page content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Shared: Nav bar ──────────────────────────────────────────────────────────
function NavBar({ step }: { step?: number }) {
  return (
    <div style={{ height: 56, background: WM.navy, display: "flex", alignItems: "center", padding: "0 32px", justifyContent: "space-between", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke={WM.lime} strokeWidth="2"/>
          <path d="M8 12l3 3 5-5" stroke={WM.lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontFamily: WM.font, fontSize: 15, fontWeight: 700, color: WM.white, letterSpacing: "-0.02em" }}>WheelMatch</span>
      </div>
      {step !== undefined && (
        <span style={{ fontFamily: WM.font, fontSize: 13, color: WM.slate }}>
          Question {step} of 15
        </span>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ fontFamily: WM.font, fontSize: 13, color: WM.slate, cursor: "pointer" }}>Save progress</span>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: WM.navyMid, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: WM.font, fontSize: 13, color: WM.white }}>M</span>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 1: Onboarding (Q8/15) ────────────────────────────────────────────
function OnboardingScreen() {
  const options = [
    { label: "Under 100 miles/week", sub: "Mostly local errands and short trips" },
    { label: "100–300 miles/week", sub: "Regular commuter, some weekend drives" },
    { label: "300–500 miles/week", sub: "Frequent driver, highway miles" },
    { label: "500+ miles/week", sub: "Road warrior — mileage is a key factor" },
  ];
  const selected = 1;

  return (
    <div style={{ width: "100%", height: "100%", background: WM.ice, display: "flex", flexDirection: "column", fontFamily: WM.font }}>
      <NavBar step={8} />

      {/* Progress bar — fills from left */}
      <div style={{ height: 3, background: WM.border, flexShrink: 0 }}>
        <div style={{ height: "100%", width: "53%", background: WM.lime, transition: "width 0.4s ease" }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 160px" }}>
        <div style={{ width: "100%", maxWidth: 640 }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontFamily: WM.font, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: WM.slate }}>
              Driving habits
            </span>
          </div>
          <h2 style={{ fontFamily: WM.font, fontSize: 32, fontWeight: 700, color: WM.navyDeep, margin: "0 0 8px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            How many miles do you drive each week?
          </h2>
          <p style={{ fontFamily: WM.font, fontSize: 16, color: WM.slate, margin: "0 0 36px", lineHeight: 1.5 }}>
            This helps us prioritise fuel efficiency and range. Approximate is fine.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {options.map((o, i) => (
              <div key={i} style={{ padding: "18px 24px", background: i === selected ? WM.navy : WM.white, border: i === selected ? `2px solid ${WM.navy}` : `1.5px solid ${WM.border}`, borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: WM.font, fontSize: 15, fontWeight: i === selected ? 600 : 500, color: i === selected ? WM.white : WM.navyDeep }}>
                    {o.label}
                  </div>
                  <div style={{ fontFamily: WM.font, fontSize: 13, color: i === selected ? "rgba(255,255,255,0.6)" : WM.slate, marginTop: 2 }}>
                    {o.sub}
                  </div>
                </div>
                {i === selected && (
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: WM.lime, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path d="M1 4.5L4.5 8L11 1" stroke={WM.navyDeep} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36 }}>
            <button style={{ fontFamily: WM.font, fontSize: 14, color: WM.slate, background: "none", border: "none", cursor: "pointer", padding: "12px 0" }}>
              ← Back
            </button>
            <button style={{ fontFamily: WM.font, fontSize: 15, fontWeight: 600, color: WM.navyDeep, background: WM.lime, border: "none", borderRadius: 8, padding: "14px 36px", cursor: "pointer" }}>
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 2: AI Glow (thinking state) ──────────────────────────────────────
function AIGlowScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: WM.navyDeep, display: "flex", flexDirection: "column", fontFamily: WM.font }}>
      <NavBar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {/* Background glow rings */}
        {[360, 280, 200, 130, 72].map((size, i) => (
          <div key={i} style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: `1px solid ${WM.lime}`, opacity: 0.06 + i * 0.04, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
        ))}
        {/* Core glow */}
        <div style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${WM.lime}55 0%, ${WM.lime}00 70%)`, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />

        {/* Center icon */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${WM.lime}18`, border: `1.5px solid ${WM.lime}60`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1" stroke={WM.lime} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: WM.font, fontSize: 22, fontWeight: 600, color: WM.white, marginBottom: 8, letterSpacing: "-0.02em" }}>
              Finding your perfect match
            </div>
            <div style={{ fontFamily: WM.font, fontSize: 14, color: WM.slate }}>
              Analysing 200+ models against your criteria…
            </div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 20 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: WM.lime, opacity: i === 1 ? 1 : 0.4 }} />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 8 }}>
            {["Budget", "Usage", "Family", "Features"].map((label, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, opacity: i < 3 ? 1 : 0.5 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: i < 3 ? WM.lime : WM.slate }} />
                <span style={{ fontFamily: WM.font, fontSize: 12, color: i < 3 ? WM.slate : "#3A4560", letterSpacing: "0.06em" }}>
                  {label.toUpperCase()}
                </span>
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
    { name: "Honda CR-V Hybrid", year: "2024", score: 94, reasons: ["Fits your 100–300 mi/week pattern perfectly", "Hybrid saves ~$180/month at your mileage", "Seating for 5 with cargo room for weekend trips"], price: "$32,400 – $38,600", badge: "BEST MATCH" },
    { name: "Toyota RAV4 Hybrid", year: "2024", score: 89, reasons: ["Proven reliability — avg 180k miles before major work", "AWD standard — good for your climate", "Strong resale value at 3 and 5 years"], price: "$33,100 – $40,200", badge: null },
    { name: "Mazda CX-5", year: "2024", score: 84, reasons: ["Best driving feel in class — matters on long commutes", "Premium interior without the premium badge price", "Below your budget ceiling with room to add features"], price: "$29,800 – $35,500", badge: null },
    { name: "Subaru Outback", year: "2024", score: 79, reasons: ["Standard AWD — best ground clearance in class", "Larger cargo area — 75.7 cu ft vs avg 40", "Fuel economy is lower than hybrids at this range"], price: "$30,100 – $36,800", badge: null },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: WM.ice, display: "flex", flexDirection: "column", fontFamily: WM.font }}>
      <NavBar />

      {/* Results header */}
      <div style={{ padding: "20px 40px 16px", background: WM.white, borderBottom: `1px solid ${WM.border}`, flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ fontFamily: WM.font, fontSize: 22, fontWeight: 700, color: WM.navyDeep, margin: 0, letterSpacing: "-0.02em" }}>Your matches</h1>
            <p style={{ fontFamily: WM.font, fontSize: 13, color: WM.slate, margin: "4px 0 0" }}>4 cars matched your profile. Ranked by fit, not commission.</p>
          </div>
          <button style={{ fontFamily: WM.font, fontSize: 14, fontWeight: 600, color: WM.navyDeep, background: WM.lime, border: "none", borderRadius: 8, padding: "11px 24px", cursor: "pointer" }}>
            Send to expert →
          </button>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          {["All matches", "New only", "Under $35k", "Hybrid / EV", "More filters"].map((f, i) => (
            <div key={i} style={{ padding: "6px 14px", borderRadius: 6, background: i === 0 ? WM.navy : WM.white, border: `1px solid ${i === 0 ? WM.navy : WM.border}`, fontFamily: WM.font, fontSize: 12, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? WM.white : WM.slate, cursor: "pointer" }}>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ flex: 1, padding: "20px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, overflow: "hidden" }}>
        {cars.map((car, i) => (
          <div key={i} style={{ background: WM.white, borderRadius: 12, border: i === 0 ? `2px solid ${WM.navy}` : `1px solid ${WM.border}`, padding: "20px 22px", display: "flex", flexDirection: "column", cursor: "pointer", position: "relative", overflow: "hidden" }}>
            {car.badge && (
              <div style={{ position: "absolute", top: 0, right: 0, background: WM.lime, color: WM.navyDeep, fontFamily: WM.font, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", padding: "4px 10px", borderBottomLeftRadius: 8 }}>
                {car.badge}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontFamily: WM.font, fontSize: 16, fontWeight: 700, color: WM.navyDeep }}>{car.name}</div>
                <div style={{ fontFamily: WM.font, fontSize: 12, color: WM.slate, marginTop: 2 }}>{car.year} model year</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
                <div style={{ fontFamily: WM.font, fontSize: 26, fontWeight: 800, color: WM.lime, lineHeight: 1 }}>{car.score}<span style={{ fontSize: 13, fontWeight: 600, color: WM.slate }}>%</span></div>
                <div style={{ fontFamily: WM.font, fontSize: 10, color: WM.slate, letterSpacing: "0.08em" }}>MATCH</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {car.reasons.map((r, j) => (
                <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: WM.lime, marginTop: 5, flexShrink: 0 }} />
                  <span style={{ fontFamily: WM.font, fontSize: 12.5, color: WM.navyDeep, lineHeight: 1.45 }}>{r}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, paddingTop: 12, borderTop: `1px solid ${WM.borderSoft}` }}>
              <span style={{ fontFamily: WM.font, fontSize: 13, fontWeight: 600, color: WM.navyDeep }}>{car.price}</span>
              <span style={{ fontFamily: WM.font, fontSize: 12, color: WM.slate }}>View details →</span>
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
    { raw: "5 adults (188cm headroom front/rear)", plain: "Fits 5 full-size adults — no one folded in the back", icon: "👥" },
    { raw: "43 mpg city / 37 mpg highway (hybrid)", plain: "~$130/month in fuel at your weekly mileage", icon: "⛽" },
    { raw: "33.2 cu ft cargo (72.8 folded)", plain: "Costco run + carry-on + dog in the back, no problem", icon: "📦" },
    { raw: "AWD optional / FWD standard", plain: "Add AWD for $1,500 if you drive in rain or snow often", icon: "🛞" },
    { raw: "Honda Sensing standard", plain: "Automatic braking, lane assist, adaptive cruise — all included", icon: "🛡️" },
    { raw: "0–60 mph: 7.8s (hybrid)", plain: "Brisk enough for highway merges — not sporty, not slow", icon: "⚡" },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: WM.ice, display: "flex", flexDirection: "column", fontFamily: WM.font }}>
      <NavBar />
      <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
        {/* Left panel */}
        <div style={{ width: 380, background: WM.white, borderRight: `1px solid ${WM.border}`, padding: "28px 28px", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <button style={{ fontFamily: WM.font, fontSize: 13, color: WM.slate, background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, marginBottom: 24 }}>
            ← Back to results
          </button>
          {/* Car illustration placeholder */}
          <div style={{ background: WM.ice, borderRadius: 12, height: 160, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, border: `1px solid ${WM.border}` }}>
            <svg width="160" height="80" viewBox="0 0 160 80" fill="none">
              <rect x="20" y="30" width="120" height="36" rx="8" fill={WM.navy} opacity="0.15"/>
              <rect x="35" y="18" width="90" height="30" rx="8" fill={WM.navy} opacity="0.1"/>
              <circle cx="42" cy="68" r="10" fill={WM.navy} opacity="0.25"/>
              <circle cx="118" cy="68" r="10" fill={WM.navy} opacity="0.25"/>
              <rect x="52" y="22" width="56" height="20" rx="4" fill={WM.lime} opacity="0.3"/>
            </svg>
          </div>
          <div style={{ marginBottom: 4 }}>
            <div style={{ fontFamily: WM.font, fontSize: 20, fontWeight: 700, color: WM.navyDeep }}>Honda CR-V Hybrid</div>
            <div style={{ fontFamily: WM.font, fontSize: 13, color: WM.slate, marginTop: 2 }}>2024 · EX-L trim · from $35,450</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "16px 0" }}>
            <div style={{ background: WM.lime, borderRadius: 6, padding: "4px 12px", fontFamily: WM.font, fontSize: 24, fontWeight: 800, color: WM.navyDeep }}>94%</div>
            <span style={{ fontFamily: WM.font, fontSize: 13, color: WM.slate }}>match to your profile</span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button style={{ padding: "14px", background: WM.navy, color: WM.white, border: "none", borderRadius: 8, fontFamily: WM.font, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Send to expert →
            </button>
            <button style={{ padding: "13px", background: "transparent", color: WM.navy, border: `1.5px solid ${WM.navy}`, borderRadius: 8, fontFamily: WM.font, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              Add to shortlist
            </button>
          </div>
        </div>

        {/* Right: translated specs */}
        <div style={{ flex: 1, padding: "28px 36px", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <h2 style={{ fontFamily: WM.font, fontSize: 18, fontWeight: 700, color: WM.navyDeep, margin: 0 }}>What this car actually means for you</h2>
            <div style={{ background: `${WM.lime}25`, borderRadius: 999, padding: "3px 10px", fontFamily: WM.font, fontSize: 11, fontWeight: 600, color: WM.limeMid }}>AI translated</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {specs.map((s, i) => (
              <div key={i} style={{ background: WM.white, borderRadius: 10, border: `1px solid ${WM.border}`, padding: "18px 18px" }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontFamily: WM.font, fontSize: 14, fontWeight: 600, color: WM.navyDeep, lineHeight: 1.4, marginBottom: 6 }}>{s.plain}</div>
                <div style={{ fontFamily: WM.font, fontSize: 11, color: WM.muted, lineHeight: 1.4 }}>Spec: {s.raw}</div>
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
  const statuses = ["Waiting", "Expert reviewing", "Response received"];
  const current = 1;

  return (
    <div style={{ width: "100%", height: "100%", background: WM.ice, display: "flex", flexDirection: "column", fontFamily: WM.font }}>
      <NavBar />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "28px 64px" }}>
        <div style={{ width: "100%", maxWidth: 880, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 32 }}>
          {/* Expert card */}
          <div style={{ background: WM.white, borderRadius: 14, border: `1px solid ${WM.border}`, padding: "28px 28px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: WM.font, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: WM.slate, marginBottom: 18 }}>YOUR ADVISOR</div>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
              {/* Avatar */}
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${WM.navy} 0%, ${WM.navyMid} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: WM.font, fontSize: 22, color: WM.white, fontWeight: 700 }}>S</span>
              </div>
              <div>
                <div style={{ fontFamily: WM.font, fontSize: 17, fontWeight: 700, color: WM.navyDeep }}>Sarah Chen</div>
                <div style={{ fontFamily: WM.font, fontSize: 13, color: WM.slate, marginTop: 2 }}>Certified Automotive Advisor</div>
                <div style={{ fontFamily: WM.font, fontSize: 12, color: WM.muted, marginTop: 1 }}>8 years · 1,400+ clients</div>
                <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={WM.lime}><path d="M6 1l1.5 3.1L11 4.6l-2.5 2.4.6 3.4L6 9l-3.1 1.4.6-3.4L1 4.6l3.5-.5L6 1z"/></svg>
                  ))}
                  <span style={{ fontFamily: WM.font, fontSize: 11, color: WM.slate, marginLeft: 4 }}>4.9 (312)</span>
                </div>
              </div>
            </div>

            <div style={{ background: WM.ice, borderRadius: 8, padding: "12px 14px", marginBottom: 16 }}>
              <div style={{ fontFamily: WM.font, fontSize: 12, color: WM.slate, marginBottom: 2 }}>Expected response</div>
              <div style={{ fontFamily: WM.font, fontSize: 14, fontWeight: 600, color: WM.navyDeep }}>Within 2 hours</div>
            </div>

            {/* Status track */}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: WM.font, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: WM.slate, marginBottom: 14 }}>STATUS</div>
              {statuses.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: i <= current ? (i === current ? WM.lime : WM.navy) : WM.borderSoft, border: i === current ? "none" : `2px solid ${i < current ? WM.navy : WM.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {i < current && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      )}
                    </div>
                    {i < statuses.length - 1 && (
                      <div style={{ width: 1, height: 18, background: i < current ? WM.navy : WM.border, marginTop: 3 }} />
                    )}
                  </div>
                  <div style={{ paddingTop: 1 }}>
                    <div style={{ fontFamily: WM.font, fontSize: 13, fontWeight: i === current ? 700 : 400, color: i <= current ? WM.navyDeep : WM.muted }}>{s}</div>
                    {i === current && (
                      <div style={{ fontFamily: WM.font, fontSize: 11, color: WM.slate, marginTop: 2 }}>Sarah is reviewing your shortlist now</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shortlist summary */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={{ fontFamily: WM.font, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: WM.slate, marginBottom: 14 }}>YOUR SHORTLIST</div>
              {[
                { name: "Honda CR-V Hybrid 2024", score: 94 },
                { name: "Toyota RAV4 Hybrid 2024", score: 89 },
              ].map((car, i) => (
                <div key={i} style={{ background: WM.white, borderRadius: 10, border: `1px solid ${WM.border}`, padding: "16px 18px", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: WM.font, fontSize: 14, fontWeight: 600, color: WM.navyDeep }}>{car.name}</div>
                    <div style={{ fontFamily: WM.font, fontSize: 12, color: WM.slate, marginTop: 2 }}>In your shortlist</div>
                  </div>
                  <div style={{ fontFamily: WM.font, fontSize: 20, fontWeight: 800, color: WM.lime }}>{car.score}<span style={{ fontSize: 11, color: WM.slate }}>%</span></div>
                </div>
              ))}
            </div>

            <div style={{ background: WM.white, borderRadius: 10, border: `1px solid ${WM.border}`, padding: "18px 20px" }}>
              <div style={{ fontFamily: WM.font, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: WM.slate, marginBottom: 10 }}>WHAT SARAH WILL CHECK</div>
              {["Current incentives and regional pricing for your area", "Known reliability issues flagged in the last 18 months", "Which trim level gives the best value at your budget"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: WM.lime, marginTop: 5, flexShrink: 0 }} />
                  <span style={{ fontFamily: WM.font, fontSize: 12.5, color: WM.navyDeep, lineHeight: 1.45 }}>{item}</span>
                </div>
              ))}
            </div>

            <button style={{ padding: "16px", background: WM.ice, color: WM.slate, border: `1.5px solid ${WM.border}`, borderRadius: 8, fontFamily: WM.font, fontSize: 14, cursor: "pointer" }}>
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
    <div style={{ width: "100%", height: "100%", background: WM.ice, display: "flex", flexDirection: "column", fontFamily: WM.font }}>
      <NavBar />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", justifyContent: "center", padding: "24px 48px" }}>
        <div style={{ width: "100%", maxWidth: 860, background: WM.white, borderRadius: 14, border: `1px solid ${WM.border}`, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Brief header */}
          <div style={{ background: WM.navy, padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: WM.font, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: WM.slate, marginBottom: 4 }}>WHEELMATCH · DEALERSHIP BRIEF</div>
              <div style={{ fontFamily: WM.font, fontSize: 18, fontWeight: 700, color: WM.white }}>Honda CR-V Hybrid 2024</div>
              <div style={{ fontFamily: WM.font, fontSize: 13, color: WM.slate, marginTop: 2 }}>EX-L trim · Prepared by Sarah Chen · Apr 29, 2026</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ padding: "9px 18px", background: "transparent", color: WM.slate, border: `1px solid ${WM.navyMid}`, borderRadius: 6, fontFamily: WM.font, fontSize: 13, cursor: "pointer" }}>Share</button>
              <button style={{ padding: "9px 18px", background: WM.lime, color: WM.navyDeep, border: "none", borderRadius: 6, fontFamily: WM.font, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Print</button>
            </div>
          </div>

          {/* Brief content */}
          <div style={{ flex: 1, padding: "24px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, overflow: "hidden" }}>
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <div style={{ fontFamily: WM.font, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: WM.slate, marginBottom: 10 }}>RECOMMENDED CONFIGURATION</div>
                <div style={{ background: WM.ice, borderRadius: 8, padding: "14px 16px" }}>
                  <div style={{ fontFamily: WM.font, fontSize: 14, fontWeight: 600, color: WM.navyDeep, marginBottom: 6 }}>EX-L with AWD</div>
                  <div style={{ fontFamily: WM.font, fontSize: 12, color: WM.slate, lineHeight: 1.5 }}>
                    AWD worth the $1,500 premium given your climate. EX-L adds leather + heated seats vs EX — meaningful resale difference. Skip Sport touring — panoramic roof adds cost without utility for your use case.
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontFamily: WM.font, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: WM.slate, marginBottom: 10 }}>FAIR PRICE RANGE</div>
                <div style={{ background: WM.ice, borderRadius: 8, padding: "14px 16px" }}>
                  <div style={{ fontFamily: WM.font, fontSize: 20, fontWeight: 800, color: WM.navyDeep }}>$36,800 – $38,400</div>
                  <div style={{ fontFamily: WM.font, fontSize: 12, color: WM.slate, marginTop: 4 }}>MSRP is $38,650. Current market: $800–1,500 under MSRP typical for this trim. Honda financing at 2.9% APR available through April.</div>
                </div>
              </div>

              <div>
                <div style={{ fontFamily: WM.font, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: WM.slate, marginBottom: 10 }}>SARAH'S NOTE</div>
                <div style={{ background: `${WM.lime}15`, borderRadius: 8, padding: "14px 16px", border: `1px solid ${WM.lime}40` }}>
                  <div style={{ fontFamily: WM.font, fontSize: 13, color: WM.navyDeep, lineHeight: 1.5, fontStyle: "italic" }}>
                    "This is a strong match for your profile. The hybrid drivetrains on the 2024 CR-V have a cleaner reliability record than the 2022–23 models. I'd suggest test-driving the EX-L first — the interior feel matters more than the spec sheet suggests."
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <div style={{ fontFamily: WM.font, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: WM.slate, marginBottom: 10 }}>QUESTIONS TO ASK</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "What are the current incentives for the EX-L trim this month?",
                    "Can I get the out-the-door price in writing before the test drive?",
                    "What's the dealer's history with CR-V Hybrid warranty claims?",
                  ].map((q, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "12px 14px", background: WM.ice, borderRadius: 8 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: WM.navy, color: WM.white, fontFamily: WM.font, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ fontFamily: WM.font, fontSize: 12.5, color: WM.navyDeep, lineHeight: 1.4 }}>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: WM.font, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: WM.slate, marginBottom: 10 }}>WATCH FOR</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "Extended warranty upsell — Honda Care is good value; dealer warranties rarely are",
                    "Add-ons at signing: paint protection, fabric guard, key insurance — all markup",
                  ].map((w, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "12px 14px", background: "#FFF5F5", borderRadius: 8, border: "1px solid #FFD8D8" }}>
                      <span style={{ color: "#CC4444", fontSize: 14, flexShrink: 0 }}>⚠</span>
                      <span style={{ fontFamily: WM.font, fontSize: 12.5, color: WM.navyDeep, lineHeight: 1.4 }}>{w}</span>
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

// ─── Screen 7: AI Glow (square — animation study) ─────────────────────────────
function AnimationGlowScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: WM.navyDeep, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: WM.font, position: "relative" }}>
      <div style={{ position: "absolute", top: 20, left: 20, fontFamily: WM.font, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: WM.slate }}>AI THINKING · CHOSEN DIRECTION</div>

      {/* Glow rings */}
      {[320, 240, 170, 110, 64].map((size, i) => (
        <div key={i} style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: `1px solid ${WM.lime}`, opacity: 0.05 + i * 0.055 }} />
      ))}
      <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${WM.lime}40 0%, transparent 70%)` }} />

      {/* Core */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${WM.lime}20`, border: `1.5px solid ${WM.lime}80`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1" stroke={WM.lime} strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: WM.font, fontSize: 18, fontWeight: 600, color: WM.white, marginBottom: 6 }}>Finding your match</div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: WM.lime, opacity: i === 0 ? 1 : 0.35 }} />
            ))}
          </div>
        </div>
        <div style={{ marginTop: 8, background: `${WM.lime}15`, borderRadius: 999, padding: "6px 16px" }}>
          <span style={{ fontFamily: WM.font, fontSize: 11, color: WM.lime, letterSpacing: "0.08em" }}>A glow says "working on something"</span>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 8: Rejected spinner (square) ─────────────────────────────────────
function AnimationRejectedScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#F5F5F5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: WM.font, position: "relative" }}>
      <div style={{ position: "absolute", top: 20, left: 20, fontFamily: WM.font, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "#999" }}>REJECTED APPROACH</div>
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <div style={{ background: "#FFEEEE", borderRadius: 999, padding: "4px 10px", fontFamily: WM.font, fontSize: 10, fontWeight: 700, color: "#CC4444", letterSpacing: "0.08em" }}>✕ NOT USED</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, opacity: 0.6 }}>
        {/* Standard spinner */}
        <div style={{ width: 48, height: 48, borderRadius: "50%", border: "4px solid #E0E0E0", borderTopColor: "#999", position: "relative" }}>
          <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "4px solid transparent", borderTopColor: "#BBB", transform: "rotate(60deg)" }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: WM.font, fontSize: 16, color: "#555" }}>Loading results…</div>
          <div style={{ fontFamily: WM.font, fontSize: 12, color: "#999", marginTop: 4 }}>Please wait</div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 28, fontFamily: WM.font, fontSize: 12, color: "#888", textAlign: "center", padding: "0 40px", lineHeight: 1.5 }}>
        A spinner says "wait" — it makes no promise<br />and signals nothing about what's happening
      </div>
    </div>
  );
}

// ─── Screen 9: Journey Map ─────────────────────────────────────────────────────
function JourneyMapScreen() {
  const phases = ["Awareness", "Research", "Selection", "Expert Review", "Dealership", "Ownership"];
  const emotions = [2, 1, 0, 2, 1, 3]; // 0=frustrated, 1=uncertain, 2=hopeful, 3=confident
  const emoColors = ["#E85555", "#E8A055", "#5588CC", "#44BB77"];
  const emoLabels = ["Frustrated", "Uncertain", "Hopeful", "Confident"];

  return (
    <div style={{ width: "100%", height: "100%", background: WM.white, display: "flex", flexDirection: "column", fontFamily: WM.font }}>
      <NavBar />
      <div style={{ flex: 1, padding: "24px 40px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontFamily: WM.font, fontSize: 20, fontWeight: 700, color: WM.navyDeep, margin: 0 }}>Car Buyer Journey Map</h2>
            <p style={{ fontFamily: WM.font, fontSize: 13, color: WM.slate, margin: "4px 0 0" }}>Emotions & touchpoints across 3 user types · First-time · Upgrading · Replacing</p>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {emoLabels.map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: emoColors[i] }} />
                <span style={{ fontFamily: WM.font, fontSize: 11, color: WM.slate }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase columns */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
          {phases.map((phase, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column" }}>
              {/* Emotion dot */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: emoColors[emotions[i]], display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 14 }}>
                    {["😤", "😟", "🙂", "😊"][emotions[i]]}
                  </span>
                </div>
              </div>

              {/* Phase label */}
              <div style={{ fontFamily: WM.font, fontSize: 11, fontWeight: 700, color: i === 3 ? WM.lime : WM.navyDeep, textAlign: "center", marginBottom: 12, letterSpacing: "0.04em", background: i === 3 ? WM.navy : WM.ice, padding: "6px 8px", borderRadius: 6 }}>
                {phase.toUpperCase()}
              </div>

              {/* Pain points / touchpoints */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["TV ads", "Word of mouth", "Google search"],
                  ["Car sites", "40+ attributes", "Reddit forums", "Dealer sites"],
                  ["Test drives", "Price confusion", "Overwhelm"],
                  ["WheelMatch AI", "Expert Sarah", "Shortlist sent"],
                  ["Salesperson", "Pressure tactics", "Brief in hand"],
                  ["No regret", "Tells friends", "Returns for next car"],
                ][i].map((item, j) => (
                  <div key={j} style={{ background: i === 3 ? `${WM.lime}20` : WM.ice, border: i === 3 ? `1px solid ${WM.lime}50` : `1px solid ${WM.border}`, borderRadius: 6, padding: "7px 10px", fontFamily: WM.font, fontSize: 11, color: WM.navyDeep, lineHeight: 1.3 }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Connection line */}
        <div style={{ marginTop: 16, position: "relative", height: 2 }}>
          <div style={{ position: "absolute", left: "8.33%", right: "8.33%", top: 0, height: 2, background: `linear-gradient(to right, ${emoColors[0]}, ${emoColors[1]}, ${emoColors[2]}, ${emoColors[3]}, ${emoColors[1]}, ${emoColors[3]})` }} />
        </div>
      </div>
    </div>
  );
}

// ─── Screen registry ──────────────────────────────────────────────────────────
const screens = [
  { id: "screen-onboarding",     label: "Onboarding",       sub: "Question 8 of 15 · driving habits",    component: OnboardingScreen,     aspect: "16:9" },
  { id: "ai-glow",               label: "AI Thinking",      sub: "Glow state — chosen direction",         component: AIGlowScreen,         aspect: "16:9" },
  { id: "screen-results",        label: "Results",          sub: "4 car match cards with reasoning",      component: ResultsScreen,        aspect: "16:9" },
  { id: "screen-car-detail",     label: "Car Detail",       sub: "Translated specs — Honda CR-V",         component: CarDetailScreen,      aspect: "16:9" },
  { id: "screen-expert-handoff", label: "Expert Handoff",   sub: "Advisor profile · reviewing state",     component: ExpertHandoffScreen,  aspect: "16:9" },
  { id: "screen-dealership-brief",label:"Dealership Brief", sub: "Generated visit brief",                 component: DealershipBriefScreen,aspect: "16:9" },
  { id: "animation-glow",        label: "Animation · Glow", sub: "AI thinking state detail",              component: AnimationGlowScreen,  aspect: "1:1" },
  { id: "animation-rejected",    label: "Animation · Rejected", sub: "Standard spinner — why we rejected", component: AnimationRejectedScreen, aspect: "1:1" },
  { id: "journey-map",           label: "Journey Map",      sub: "3 user types · emotions + touchpoints", component: JourneyMapScreen,     aspect: "16:9" },
];

// ─── Viewer ───────────────────────────────────────────────────────────────────
export default function WireframeViewer() {
  const [current, setCurrent] = useState(0);
  const s = screens[current];
  const Screen = s.component;
  const isSquare = s.aspect === "1:1";

  return (
    <div style={{ minHeight: "100vh", background: "#080C14", display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 24px 40px", boxSizing: "border-box", fontFamily: WM.font }}>
      {/* Top bar */}
      <div style={{ width: "100%", maxWidth: 1360, display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: WM.font, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: WM.lime, marginBottom: 5 }}>
            WHEELMATCH · WIREFRAMES
          </div>
          <div style={{ fontFamily: WM.font, fontSize: 22, fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
            {s.label}
          </div>
          <div style={{ fontFamily: WM.font, fontSize: 13, color: WM.slate, marginTop: 3 }}>
            {s.sub}
          </div>
        </div>
        <div style={{ fontFamily: WM.font, fontSize: 12, color: "#2A3550", paddingTop: 4 }}>
          {String(current + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
        </div>
      </div>

      {/* Browser / frame */}
      <div
        data-screen={s.id}
        style={{
          width: isSquare ? 640 : 1280,
          height: isSquare ? 640 : 680,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 0 0 1px #1A2540, 0 32px 80px rgba(0,0,0,0.7)",
          flexShrink: 0,
          transform: isSquare ? "scale(1)" : "scale(0.88)",
          transformOrigin: "top center",
        }}
      >
        <Screen />
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: isSquare ? 32 : 0 }}>
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid #1A2540", background: current === 0 ? "transparent" : "#0E1628", color: current === 0 ? "#1A2540" : "#FFF", cursor: current === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="7" height="13" viewBox="0 0 7 13" fill="none"><path d="M6 1L1 6.5L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ display: "flex", gap: 7 }}>
          {screens.map((sc, i) => (
            <button key={sc.id} onClick={() => setCurrent(i)} title={sc.label} style={{ width: i === current ? 22 : 7, height: 7, borderRadius: 4, background: i === current ? WM.lime : "#1A2540", border: "none", cursor: "pointer", transition: "all 0.25s ease", padding: 0 }} />
          ))}
        </div>
        <button onClick={() => setCurrent(c => Math.min(screens.length - 1, c + 1))} disabled={current === screens.length - 1} style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid #1A2540", background: current === screens.length - 1 ? "transparent" : "#0E1628", color: current === screens.length - 1 ? "#1A2540" : "#FFF", cursor: current === screens.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="7" height="13" viewBox="0 0 7 13" fill="none"><path d="M1 1L6 6.5L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: "flex", gap: 8, marginTop: 24, overflowX: "auto", paddingBottom: 4, width: "100%", maxWidth: 1360, justifyContent: "center" }}>
        {screens.map((sc, i) => (
          <button key={sc.id} onClick={() => setCurrent(i)} style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 8, border: i === current ? `1.5px solid ${WM.lime}` : "1px solid #1A2540", background: i === current ? "#0C1828" : "#080C14", color: i === current ? WM.lime : "#2A3550", cursor: "pointer", textAlign: "left" as const }}>
            <div style={{ fontFamily: WM.font, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 2 }}>{sc.label.toUpperCase()}</div>
            <div style={{ fontFamily: WM.font, fontSize: 10, opacity: 0.5 }}>{sc.aspect}</div>
          </button>
        ))}
      </div>

      <p style={{ fontFamily: WM.font, fontSize: 10, color: "#1A2540", marginTop: 20, textAlign: "center", letterSpacing: "0.08em" }}>
        IMPORT TO FIGMA VIA html.to.design · localhost:3000/wireframes/wheelmatch
      </p>
    </div>
  );
}

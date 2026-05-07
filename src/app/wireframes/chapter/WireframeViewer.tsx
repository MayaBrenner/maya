"use client";
import { useEffect, useState, useCallback } from "react";

// ─── Fonts ────────────────────────────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    if (document.getElementById("home-again-fonts")) return;
    const link = document.createElement("link");
    link.id = "home-again-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap";
    document.head.appendChild(link);
  }, []);
}

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#F9F8F6",
  cream: "#FBF5E7",
  ink: "#000000",
  muted: "#6B6863",
  orange: "#FF962C",
  lime: "#D3D742",
  blue: "#8FA6EC",
  border: "#EEEAE0",
  soft: "#F2EEE3",
  surface: "#FFFFFF",
  viewerBg: "#EAE6DC",
};

const F = {
  serif: '"Lora", Georgia, serif',
  sans: '"DM Sans", system-ui, -apple-system, sans-serif',
};

// ─── Status ───────────────────────────────────────────────────────────────────
type StatusKey = "available" | "on-hold" | "sold" | "back-on-market";
const STATUS: Record<StatusKey, { label: string; bg: string; fg: string; dot: string }> = {
  "available":      { label: "Available",       bg: "#E8EAB6", fg: "#3D4500", dot: "#D3D742" },
  "on-hold":        { label: "On hold · 48h",   bg: "#FFE3C4", fg: "#7A3D00", dot: "#FF962C" },
  "sold":           { label: "Sold",             bg: "#F0EEE8", fg: "#000000", dot: "#000000" },
  "back-on-market": { label: "Back on market",  bg: "#DCE3F7", fg: "#1F356E", dot: "#8FA6EC" },
};

// ─── Phone dimensions ─────────────────────────────────────────────────────────
const PW = 390;
const PH = 844;

// ─── Shared micro-components ──────────────────────────────────────────────────

function StatusPill({ s, size = "sm" }: { s: StatusKey; size?: "sm" | "lg" }) {
  const cfg = STATUS[s];
  const padY = size === "lg" ? 6 : 3;
  const padX = size === "lg" ? 12 : 9;
  const fs   = size === "lg" ? 13 : 11;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: `${padY}px ${padX}px`,
      borderRadius: 999,
      background: cfg.bg, color: cfg.fg,
      fontFamily: F.sans, fontSize: fs, fontWeight: 600,
      letterSpacing: 0.2, lineHeight: 1, whiteSpace: "nowrap" as const,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
}

function Wordmark({ size = 20 }: { size?: number }) {
  return (
    <span style={{ fontFamily: F.serif, fontSize: size, fontWeight: 500, letterSpacing: -0.3, color: C.ink }}>
      Home<span style={{ fontStyle: "italic" }}> again</span>
      <span style={{ color: C.orange, marginLeft: 1 }}>.</span>
    </span>
  );
}

function Avatar({ initials, bg, img, size = 40 }: { initials: string; bg: string; img?: string; size?: number }) {
  const fs = size <= 24 ? 9 : size <= 36 ? 11 : 14;
  return (
    <div style={{
      width: size, height: size, borderRadius: 999, flexShrink: 0,
      background: bg, overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: F.sans, fontSize: fs, fontWeight: 700, color: "#fff",
    }}>
      {img
        ? <img src={img} alt={initials} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : initials}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 500, letterSpacing: 1.2, textTransform: "uppercase" as const, color: C.muted }}>
      {children}
    </div>
  );
}

function Btn({
  children, variant = "primary", full, onClick
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "accent" | "lime";
  full?: boolean;
  onClick?: () => void;
}) {
  const style = {
    primary: { bg: C.ink,    fg: "#fff",  border: "transparent" },
    ghost:   { bg: "transparent", fg: C.ink, border: C.border  },
    accent:  { bg: C.orange, fg: "#000",  border: "transparent" },
    lime:    { bg: C.lime,   fg: "#000",  border: "transparent" },
  }[variant];
  return (
    <button onClick={onClick} style={{
      width: full ? "100%" : "auto",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      padding: "14px 18px", borderRadius: 12,
      background: style.bg, color: style.fg,
      border: `1px solid ${style.border}`,
      fontFamily: F.sans, fontSize: 15, fontWeight: 600, letterSpacing: 0.1,
      cursor: "pointer",
    }}>
      {children}
    </button>
  );
}

function SmallBtn({ children, variant = "ghost" }: { children: React.ReactNode; variant?: "primary" | "ghost" | "accent" }) {
  const style = {
    primary: { bg: C.ink,    fg: "#fff" },
    ghost:   { bg: "transparent", fg: C.ink },
    accent:  { bg: C.orange, fg: "#000" },
  }[variant];
  return (
    <button style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      padding: "8px 14px", borderRadius: 9,
      background: style.bg, color: style.fg,
      border: `1px solid ${C.border}`,
      fontFamily: F.sans, fontSize: 13, fontWeight: 600,
      cursor: "pointer",
    }}>
      {children}
    </button>
  );
}

function TabBar({ active }: { active: string }) {
  const tabs = [
    { id: "browse", label: "Browse",  icon: "grid" },
    { id: "search", label: "Search",  icon: "lens" },
    { id: "post",   label: "Post",    icon: "plus" },
    { id: "inbox",  label: "Inbox",   icon: "chat" },
    { id: "me",     label: "Me",      icon: "user" },
  ];
  function Icon({ k, color }: { k: string; color: string }) {
    const s = { stroke: color, strokeWidth: 1.6, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    if (k === "grid") return <svg width="20" height="20" viewBox="0 0 20 20"><rect x="3" y="3" width="6" height="6" rx="1.2" {...s}/><rect x="11" y="3" width="6" height="6" rx="1.2" {...s}/><rect x="3" y="11" width="6" height="6" rx="1.2" {...s}/><rect x="11" y="11" width="6" height="6" rx="1.2" {...s}/></svg>;
    if (k === "lens") return <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="9" cy="9" r="5.5" {...s}/><path d="M13 13l4 4" {...s}/></svg>;
    if (k === "plus") return <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="9" {...s}/><path d="M11 7v8M7 11h8" {...s}/></svg>;
    if (k === "chat") return <svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H8l-4 3v-3H5a2 2 0 01-2-2V5z" {...s}/></svg>;
    if (k === "user") return <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="7" r="3" {...s}/><path d="M3 17c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" {...s}/></svg>;
    return null;
  }
  return (
    <div style={{
      display: "flex", alignItems: "stretch", justifyContent: "space-around",
      padding: "8px 8px 20px", background: C.surface,
      borderTop: `0.5px solid ${C.border}`,
    }}>
      {tabs.map(t => {
        const isActive = t.id === active;
        const color = isActive ? C.ink : C.muted;
        return (
          <div key={t.id} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            padding: "6px 4px",
          }}>
            <Icon k={t.icon} color={color} />
            <span style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 600, letterSpacing: 0.3, color }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: 34, height: 34, borderRadius: 999,
      background: C.surface, border: `0.5px solid ${C.border}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

function BackBtn() {
  return (
    <IconBtn>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M12 4l-7 6 7 6" stroke={C.ink} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </IconBtn>
  );
}

function Stars({ n = 5, size = 12 }: { n?: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 12 12" fill={i <= n ? C.orange : "rgba(0,0,0,0.12)"}>
          <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 8.8 3 10.5l.5-3.5L1 4.5 4.5 4z"/>
        </svg>
      ))}
    </span>
  );
}

// ─── Listing card ─────────────────────────────────────────────────────────────
function ListingCard({
  title, price, priceSuffix, status, sellerName, sellerTo, category, image, imgBg = C.cream
}: {
  title: string; price: number; priceSuffix?: string; status: StatusKey;
  sellerName: string; sellerTo: string; category: string;
  image?: string; imgBg?: string;
}) {
  const fmt = (n: number) => n >= 1000 ? `₪${(n/1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `₪${n}`;
  return (
    <div style={{
      background: C.surface, borderRadius: 14,
      border: `0.5px solid ${C.border}`, overflow: "hidden",
    }}>
      <div style={{ height: 116, background: imgBg, position: "relative", overflow: "hidden" }}>
        {image
          ? <img src={`/case-studies/chapter/${image}`} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{
              width: "100%", height: "100%",
              background: `repeating-linear-gradient(135deg, ${imgBg} 0 14px, rgba(0,0,0,0.04) 14px 28px)`,
            }} />
        }
        <div style={{ position: "absolute", top: 7, left: 7 }}>
          <StatusPill s={status} />
        </div>
      </div>
      <div style={{ padding: "10px 10px 12px" }}>
        <div style={{ fontFamily: F.sans, fontSize: 12.5, fontWeight: 500, color: C.ink, lineHeight: 1.3, marginBottom: 4 }}>{title}</div>
        <div style={{ fontFamily: F.serif, fontSize: 16, fontWeight: 500, color: C.ink, marginBottom: 5 }}>
          {fmt(price)}{priceSuffix || ""}
        </div>
        <div style={{ fontFamily: F.sans, fontSize: 11, color: C.muted }}>{sellerName} → {sellerTo}</div>
      </div>
    </div>
  );
}

// ─── Seller rail card ─────────────────────────────────────────────────────────
function SellerRailCard({
  name, from, to, moveDate, listingCount, initials, bg, img
}: {
  name: string; from: string; to: string; moveDate: string;
  listingCount: number; initials: string; bg: string; img?: string;
}) {
  return (
    <div style={{
      flexShrink: 0, width: 170,
      background: C.surface, borderRadius: 14,
      border: `0.5px solid ${C.border}`, padding: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <Avatar initials={initials} bg={bg} img={img} size={32} />
        <div>
          <div style={{ fontFamily: F.sans, fontSize: 12.5, fontWeight: 600, color: C.ink }}>{name}</div>
          <div style={{ fontFamily: F.sans, fontSize: 11, color: C.muted }}>{from} → {to}</div>
        </div>
      </div>
      <div style={{
        padding: "6px 10px", borderRadius: 8,
        background: C.cream, border: `0.5px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: F.sans, fontSize: 11, color: C.muted }}>leaving {moveDate}</span>
        <span style={{
          fontFamily: F.sans, fontSize: 11, fontWeight: 600, color: C.ink,
          background: C.lime, padding: "2px 6px", borderRadius: 5,
        }}>{listingCount} items</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCREENS
// ═══════════════════════════════════════════════════════════════════════════════

function ScreenOnboarding() {
  return (
    <div data-screen="screen-onboarding" style={{
      width: PW, height: PH, background: C.bg, fontFamily: F.sans,
      display: "flex", flexDirection: "column", padding: "60px 24px 32px", boxSizing: "border-box",
    }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Wordmark size={26} />
        <div style={{ height: 24 }} />
        <h1 style={{
          margin: 0, fontFamily: F.serif, fontSize: 38, fontWeight: 500,
          lineHeight: 1.05, letterSpacing: -0.6, color: C.ink,
        }}>Between<br/>two homes.</h1>
        <p style={{
          margin: "20px 0 0", fontFamily: F.sans, fontSize: 14.5, lineHeight: 1.55,
          color: C.muted, maxWidth: 280,
        }}>A calmer marketplace for people in transit. Sell what you can&apos;t take. Find what you need where you&apos;re landing.</p>
        <div style={{ marginTop: 32 }}>
          {[
            { num: "1", c: C.orange, head: "Whole sellers, not just listings.", body: "See everything one mover is selling — buy a few things, save on the trip." },
            { num: "2", c: C.blue,   head: "Search by city.",                  body: "Coming to Jerusalem? Filter to Jerusalem. Pickup is the whole point." },
            { num: "3", c: C.lime,   head: "Status you can trust.",            body: 'Available, on hold, sold — and an honest "back on market" when a deal lapses.' },
          ].map(row => (
            <div key={row.num} style={{
              display: "flex", gap: 14, alignItems: "flex-start",
              padding: "12px 0", borderTop: `0.5px solid ${C.border}`,
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: 999,
                background: row.c, color: "#000",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: F.sans, fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2,
              }}>{row.num}</span>
              <div>
                <div style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 600, color: C.ink }}>{row.head}</div>
                <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, marginTop: 2, lineHeight: 1.5 }}>{row.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Btn variant="primary" full>Get started</Btn>
        <Btn variant="ghost" full>I have an account</Btn>
      </div>
    </div>
  );
}

function ScreenBrowse() {
  return (
    <div data-screen="screen-browse" style={{ width: PW, height: PH, background: C.bg, overflow: "hidden", position: "relative" as const }}>
      {/* Top bar */}
      <div style={{ padding: "52px 16px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Wordmark size={20} />
        <div style={{ display: "flex", gap: 8 }}>
          <IconBtn>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5.5" stroke={C.ink} strokeWidth="1.6"/><path d="M13 13l4 4" stroke={C.ink} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </IconBtn>
          <IconBtn>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M5 10h10M8 15h4" stroke={C.ink} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </IconBtn>
        </div>
      </div>

      {/* Hero heading */}
      <div style={{ padding: "4px 16px 10px" }}>
        <h1 style={{ margin: 0, fontFamily: F.serif, fontSize: 28, lineHeight: 1.05, fontWeight: 500, letterSpacing: -0.5, color: C.ink }}>
          People leaving<br/>tel aviv<span style={{ color: C.orange }}>.</span>
        </h1>
        <div style={{
          marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8,
          padding: "7px 12px", borderRadius: 999,
          background: C.surface, border: `1px solid ${C.ink}`,
        }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1c-2.5 0-4.5 2-4.5 4.5C2.5 8.5 7 13 7 13s4.5-4.5 4.5-7.5C11.5 3 9.5 1 7 1z" stroke="#000" strokeWidth="1.4" fill="none"/><circle cx="7" cy="5.5" r="1.4" fill="#000"/></svg>
          <span style={{ fontFamily: F.sans, fontSize: 12.5, fontWeight: 600, color: C.ink }}>Tel Aviv</span>
          <span style={{ fontFamily: F.sans, fontSize: 11, color: C.muted }}>· change</span>
        </div>
        <div style={{ fontFamily: F.sans, fontSize: 11.5, color: C.muted, marginTop: 6 }}>
          10 active listings · 4 sellers in town
        </div>
      </div>

      {/* Sellers rail */}
      <div style={{ paddingBottom: 12 }}>
        <div style={{ padding: "0 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Label>Sellers leaving soon</Label>
          <span style={{ fontFamily: F.sans, fontSize: 11, color: C.muted }}>Buy multiple → save on transport</span>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto" as const, padding: "0 16px", scrollbarWidth: "none" as const }}>
          <SellerRailCard name="Lynne Itelson" from="Tel Aviv" to="Berlin" moveDate="Mar 28" listingCount={5} initials="LI" bg={C.blue} img="lynne-avatar.png" />
          <SellerRailCard name="Daniel Ofir" from="Tel Aviv" to="NYC" moveDate="Apr 4" listingCount={2} initials="DO" bg={C.blue} />
          <SellerRailCard name="Noa Harel" from="Tel Aviv" to="Lisbon" moveDate="May 1" listingCount={1} initials="NH" bg={C.blue} />
        </div>
      </div>

      {/* Category chips */}
      <div style={{ padding: "0 16px 10px", display: "flex", gap: 7, overflowX: "hidden" as const }}>
        {["All", "Furniture", "Vehicles", "Apartments", "Kitchen"].map((chip, i) => (
          <div key={chip} style={{
            padding: "6px 13px", borderRadius: 999, flexShrink: 0,
            background: i === 0 ? C.ink : "transparent",
            border: i === 0 ? `1px solid ${C.ink}` : `1px solid ${C.border}`,
            color: i === 0 ? "#fff" : C.ink,
            fontFamily: F.sans, fontSize: 12.5, fontWeight: i === 0 ? 600 : 400,
          }}>
            {chip}
          </div>
        ))}
      </div>

      {/* Card grid */}
      <div style={{ padding: "2px 14px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <ListingCard title="Linen 3-seater sofa" price={1450} status="available" sellerName="Lynne" sellerTo="Berlin" category="Furniture" image="listing-sofa.png" imgBg={C.cream} />
        <ListingCard title="Vespa Primavera 50" price={21500} status="on-hold" sellerName="Daniel" sellerTo="NYC" category="Vehicle" image="listing-vespa.png" imgBg={C.cream} />
        <ListingCard title="2-room sublease · Old North" price={6300} priceSuffix="/mo" status="available" sellerName="Noa" sellerTo="Lisbon" category="Apartment" image="listing-apt-3.png" imgBg={C.cream} />
        <ListingCard title="Oak writing desk" price={540} status="available" sellerName="Inbar" sellerTo="London" category="Furniture" image="listing-desk-1.png" imgBg={C.cream} />
      </div>

      {/* Tab bar */}
      <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0 }}>
        <TabBar active="browse" />
      </div>
    </div>
  );
}

function ScreenSearch() {
  const cities = [
    { label: "Tel Aviv", count: 10, color: C.lime },
    { label: "Jerusalem", count: 6, color: C.blue },
    { label: "Ramat Gan", count: 1, color: C.orange },
    { label: "Haifa", count: 0, color: C.border },
  ];
  return (
    <div data-screen="screen-search" style={{ width: PW, height: PH, background: C.bg, overflow: "hidden" }}>
      <div style={{ padding: "52px 16px 16px" }}>
        <h1 style={{ margin: "0 0 16px", fontFamily: F.serif, fontSize: 26, fontWeight: 500, letterSpacing: -0.4, color: C.ink }}>Where are you landing?</h1>
        {/* Search input */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "12px 14px", borderRadius: 12,
          background: C.surface, border: `1px solid ${C.border}`,
          marginBottom: 20,
        }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5.5" stroke={C.muted} strokeWidth="1.6"/><path d="M13 13l4 4" stroke={C.muted} strokeWidth="1.6" strokeLinecap="round"/></svg>
          <span style={{ fontFamily: F.sans, fontSize: 14, color: C.muted }}>City or neighbourhood…</span>
        </div>

        <Label>Cities with active listings</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
          {cities.map(city => (
            <div key={city.label} style={{
              padding: "18px 14px",
              borderRadius: 14,
              background: city.count > 0 ? C.surface : C.soft,
              border: `0.5px solid ${C.border}`,
              opacity: city.count > 0 ? 1 : 0.5,
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: 999,
                background: city.color, marginBottom: 10,
              }} />
              <div style={{ fontFamily: F.serif, fontSize: 17, fontWeight: 500, color: C.ink, marginBottom: 4 }}>{city.label}</div>
              <div style={{ fontFamily: F.sans, fontSize: 11.5, color: C.muted }}>
                {city.count > 0 ? `${city.count} active listings` : "No listings yet"}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          <Label>Popular categories</Label>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginTop: 10 }}>
            {["Furniture", "Vehicles", "Apartments", "Kitchen", "Electronics"].map(cat => (
              <div key={cat} style={{
                padding: "8px 14px", borderRadius: 999,
                background: C.surface, border: `0.5px solid ${C.border}`,
                fontFamily: F.sans, fontSize: 13, color: C.ink,
              }}>{cat}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0 }}>
        <TabBar active="search" />
      </div>
    </div>
  );
}

function ScreenListing() {
  const imgs = ["listing-apt-3.png","listing-apt-1.png","listing-apt-2.png","listing-apt-6.png","listing-apt-4.png"];
  return (
    <div data-screen="screen-listing" style={{ width: PW, height: PH, background: C.bg, overflow: "hidden", position: "relative" as const }}>
      {/* Gallery */}
      <div style={{ height: 260, background: C.cream, position: "relative" as const, overflow: "hidden" }}>
        <img src={`/case-studies/chapter/${imgs[0]}`} alt="Apartment" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {/* Overlay top buttons */}
        <div style={{ position: "absolute" as const, top: 52, left: 12, display: "flex", gap: 8 }}>
          <BackBtn />
        </div>
        {/* Thumbnail row */}
        <div style={{ position: "absolute" as const, bottom: 8, left: 0, right: 0, display: "flex", gap: 6, padding: "0 12px", overflowX: "auto" as const, scrollbarWidth: "none" as const }}>
          {imgs.map((img, i) => (
            <div key={i} style={{
              flexShrink: 0, width: 44, height: 44, borderRadius: 8, overflow: "hidden",
              border: i === 0 ? `2px solid #fff` : `1px solid rgba(255,255,255,0.4)`,
            }}>
              <img src={`/case-studies/chapter/${img}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
          <div style={{
            flexShrink: 0, width: 44, height: 44, borderRadius: 8,
            background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: F.sans, fontSize: 11, fontWeight: 600, color: "#fff",
          }}>+1</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 0", overflowY: "auto" as const, height: "calc(100% - 260px - 100px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <StatusPill s="available" />
          <span style={{ fontFamily: F.sans, fontSize: 11, color: C.muted }}>5d ago</span>
        </div>
        <h2 style={{ margin: "8px 0 4px", fontFamily: F.serif, fontSize: 22, fontWeight: 500, letterSpacing: -0.2, color: C.ink }}>
          2-room sublease · Old North
        </h2>
        <div style={{ fontFamily: F.serif, fontSize: 24, fontWeight: 500, color: C.ink, marginBottom: 6 }}>₪6,300<span style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 400 }}>/mo</span></div>
        <div style={{ fontFamily: F.sans, fontSize: 12.5, color: C.muted, marginBottom: 14 }}>53 m² · boutique building · furnished · May–Oct</div>

        {/* Seller strip */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderTop: `0.5px solid ${C.border}`, borderBottom: `0.5px solid ${C.border}`, marginBottom: 14 }}>
          <Avatar initials="NH" bg={C.blue} size={38} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 600, color: C.ink }}>Noa Harel</div>
            <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted }}>Old North → Lisbon · May 1</div>
          </div>
          <span style={{ fontFamily: F.sans, fontSize: 12, color: C.blue, fontWeight: 600 }}>View seller ›</span>
        </div>

        <p style={{ margin: 0, fontFamily: F.sans, fontSize: 13, lineHeight: 1.6, color: C.ink }}>
          For rent in Tel Aviv in the old north, in a boutique project, designed down to the last detail, secluded and quiet. Large balcony + storage room. Central air conditioning, real hardwood floors, luxurious kitchen. Building has a lobby, 2 elevators, patio and bicycle storage.
        </p>
      </div>

      {/* Actions */}
      <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0, padding: "12px 16px 30px", background: C.surface, borderTop: `0.5px solid ${C.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          <SmallBtn variant="ghost">Ask</SmallBtn>
          <SmallBtn variant="ghost">Meet</SmallBtn>
          <SmallBtn variant="primary">Reserve</SmallBtn>
        </div>
      </div>
    </div>
  );
}

function ScreenChat() {
  const messages = [
    { from: "them", text: "Hi! Is the sofa still around? I'm moving in next week.", time: "13:42" },
    { from: "me",   text: "Yes — still available. Happy to answer anything.", time: "13:48" },
    { from: "them", text: "Could I come by Wednesday evening to see it?", time: "14:02" },
  ];
  return (
    <div data-screen="screen-chat" style={{ width: PW, height: PH, background: C.bg, display: "flex", flexDirection: "column" as const, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "52px 16px 12px", background: C.surface, borderBottom: `0.5px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BackBtn />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 600, color: C.ink }}>Linen 3-seater sofa</div>
            <div style={{ fontFamily: F.sans, fontSize: 11.5, color: C.muted }}>Lynne Itelson · ₪1,450</div>
          </div>
          <StatusPill s="available" />
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: "16px 14px", display: "flex", flexDirection: "column" as const, gap: 10, overflowY: "auto" as const }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column" as const, alignItems: msg.from === "me" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "78%",
              padding: "10px 14px",
              borderRadius: msg.from === "me" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: msg.from === "me" ? C.ink : C.surface,
              color: msg.from === "me" ? "#fff" : C.ink,
              border: msg.from === "them" ? `0.5px solid ${C.border}` : "none",
              fontFamily: F.sans, fontSize: 14, lineHeight: 1.5,
            }}>{msg.text}</div>
            <span style={{ fontFamily: F.sans, fontSize: 10, color: C.muted, marginTop: 3 }}>{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Quick replies */}
      <div style={{ padding: "8px 14px", display: "flex", gap: 7, overflowX: "auto" as const, scrollbarWidth: "none" as const }}>
        {["Is this still available?", "Can I come see it?", "Will you hold it?"].map(q => (
          <div key={q} style={{
            flexShrink: 0,
            padding: "7px 12px", borderRadius: 999,
            background: C.surface, border: `0.5px solid ${C.border}`,
            fontFamily: F.sans, fontSize: 12, color: C.ink,
          }}>{q}</div>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: "8px 14px 30px", background: C.surface, borderTop: `0.5px solid ${C.border}`, display: "flex", gap: 10 }}>
        <div style={{
          flex: 1, padding: "11px 14px", borderRadius: 12,
          background: C.bg, border: `0.5px solid ${C.border}`,
          fontFamily: F.sans, fontSize: 14, color: C.muted,
        }}>Message…</div>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: C.ink, display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M2 10l16-8-8 16-2-6-6-2z" fill="#fff"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ScreenSellerPage() {
  const listings = [
    { title: "Linen 3-seater sofa", price: 1450, status: "available" as StatusKey, image: "listing-sofa.png" },
    { title: "White pendant lamp", price: 320, status: "available" as StatusKey, image: "listing-lamp.png" },
    { title: "Wool rug, 200 × 290 cm", price: 680, status: "available" as StatusKey, image: "listing-rug.png" },
    { title: "Pair of dining chairs", price: 240, status: "available" as StatusKey, image: "listing-chairs.png" },
  ];
  const reviews = [
    { from: "Asher P.", item: "Mid-century armchair", text: "Showed up exactly when she said she would. The story about why she was selling stuck with me — felt human.", stars: 5 },
    { from: "Tomer S.", item: "Vintage radio", text: "Fair price, easy handoff. The escrow took the awkwardness out.", stars: 5 },
  ];
  return (
    <div data-screen="screen-seller" style={{ width: PW, height: PH, background: C.bg, overflow: "hidden", position: "relative" as const }}>
      {/* Banner */}
      <div style={{ height: 130, background: C.blue, position: "relative" as const }}>
        <div style={{ position: "absolute" as const, top: 52, left: 12 }}>
          <div style={{ background: "rgba(255,255,255,0.9)", borderRadius: 999, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M12 4l-7 6 7 6" stroke="#000" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
        </div>
        {/* Avatar overlapping */}
        <div style={{ position: "absolute" as const, bottom: -34, left: 18 }}>
          <div style={{
            width: 68, height: 68, borderRadius: 16, overflow: "hidden",
            border: `3px solid ${C.bg}`,
          }}>
            <img src="/case-studies/chapter/lynne-avatar.png" alt="Lynne" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        <div style={{ position: "absolute" as const, bottom: 10, right: 14, fontFamily: F.sans, fontSize: 11, color: "rgba(0,0,0,0.7)" }}>
          Member since 2023
        </div>
      </div>

      <div style={{ padding: "46px 18px 0", overflowY: "auto" as const, height: "calc(100% - 130px)" }}>
        <h1 style={{ margin: 0, fontFamily: F.serif, fontSize: 24, fontWeight: 500, letterSpacing: -0.3, color: C.ink }}>Lynne Itelson</h1>
        <div style={{ marginTop: 4, fontFamily: F.sans, fontSize: 12.5, color: C.muted, display: "flex", alignItems: "center", gap: 6 }}>
          <span>Florentin, Tel Aviv</span>
          <span>·</span>
          <Stars n={5} size={11} />
          <span>5.0 (3 reviews)</span>
        </div>

        {/* Journey strip */}
        <div style={{ marginTop: 14, padding: 14, background: C.cream, borderRadius: 14, border: `0.5px solid ${C.border}` }}>
          <Label>Their chapter</Label>
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: F.sans, fontSize: 10, color: C.muted, textTransform: "uppercase" as const, letterSpacing: 1 }}>Leaving</div>
              <div style={{ fontFamily: F.serif, fontSize: 16, fontWeight: 500, color: C.ink, marginTop: 2 }}>Tel Aviv</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: C.orange }} />
              <span style={{ width: 20, height: 1, background: C.ink }} />
              <span style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 600, color: C.ink }}>Mar 28</span>
              <span style={{ width: 20, height: 1, background: C.ink }} />
              <span style={{ width: 6, height: 6, borderRadius: 999, background: C.lime }} />
            </div>
            <div style={{ flex: 1, textAlign: "right" as const }}>
              <div style={{ fontFamily: F.sans, fontSize: 10, color: C.muted, textTransform: "uppercase" as const, letterSpacing: 1 }}>Going</div>
              <div style={{ fontFamily: F.serif, fontSize: 16, fontWeight: 500, color: C.ink, marginTop: 2 }}>Berlin</div>
            </div>
          </div>
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: `0.5px dashed ${C.border}`, fontFamily: F.sans, fontSize: 12.5, lineHeight: 1.55, color: C.ink }}>
            &ldquo;Closing the chapter on a four-year stretch in Tel Aviv. Heading to Berlin at the end of March — clearing out the apartment by then.&rdquo;
          </div>
        </div>

        {/* Bundle CTA */}
        <div style={{ marginTop: 12, padding: 14, background: C.ink, borderRadius: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <div>
              <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 600, color: C.lime, textTransform: "uppercase" as const, letterSpacing: 0.8, marginBottom: 4 }}>Bundle deal</div>
              <div style={{ fontFamily: F.serif, fontSize: 16, fontWeight: 500, color: "#fff" }}>Whole apartment — ₪4,200</div>
            </div>
            <div style={{ background: C.lime, color: "#000", padding: "4px 9px", borderRadius: 7, fontFamily: F.sans, fontSize: 11, fontWeight: 700 }}>Save ₪380</div>
          </div>
          <div style={{ fontFamily: F.sans, fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 10 }}>Sofa, lamp, dining table, chairs, rug — one pickup, one price.</div>
          <div style={{ background: C.lime, color: "#000", padding: "10px", borderRadius: 9, textAlign: "center" as const, fontFamily: F.sans, fontSize: 13.5, fontWeight: 600 }}>View bundle</div>
        </div>

        {/* Listings */}
        <div style={{ marginTop: 14 }}>
          <Label>Their listings</Label>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 8, marginTop: 8 }}>
            {listings.map(l => (
              <div key={l.title} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: C.surface, borderRadius: 12, border: `0.5px solid ${C.border}` }}>
                <div style={{ width: 48, height: 48, borderRadius: 9, overflow: "hidden", background: C.cream, flexShrink: 0 }}>
                  <img src={`/case-studies/chapter/${l.image}`} alt={l.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 500, color: C.ink }}>{l.title}</div>
                  <div style={{ fontFamily: F.serif, fontSize: 14, fontWeight: 500, color: C.ink }}>₪{l.price.toLocaleString()}</div>
                </div>
                <StatusPill s={l.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div style={{ marginTop: 16, paddingBottom: 40 }}>
          <Label>Reviews</Label>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, marginTop: 8 }}>
            {reviews.map(r => (
              <div key={r.from} style={{ padding: "12px 14px", background: C.surface, borderRadius: 12, border: `0.5px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: C.ink }}>{r.from}</div>
                  <Stars n={r.stars} />
                </div>
                <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, marginBottom: 4 }}>{r.item}</div>
                <div style={{ fontFamily: F.sans, fontSize: 13, lineHeight: 1.5, color: C.ink }}>&ldquo;{r.text}&rdquo;</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenBundle() {
  const items = [
    { title: "Linen 3-seater sofa", price: 1450, image: "listing-sofa.png" },
    { title: "White pendant lamp", price: 320, image: "listing-lamp.png" },
    { title: "Wool rug, 200 × 290 cm", price: 680, image: "listing-rug.png" },
    { title: "Pair of dining chairs", price: 240, image: "listing-chairs.png" },
  ];
  const totalSeparate = items.reduce((s, i) => s + i.price, 0);
  const bundlePrice = 4200;
  return (
    <div data-screen="screen-bundle" style={{ width: PW, height: PH, background: C.bg, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "52px 16px 12px", background: C.ink, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 999, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M12 4l-7 6 7 6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </div>
        <div>
          <div style={{ fontFamily: F.serif, fontSize: 18, fontWeight: 500, color: "#fff" }}>Whole apartment</div>
          <div style={{ fontFamily: F.sans, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Lynne Itelson · Tel Aviv → Berlin</div>
        </div>
      </div>

      {/* Image gallery strip */}
      <div style={{ display: "flex", height: 140, gap: 2, background: C.ink }}>
        {["whole-apt-1.png","whole-apt-2.png","whole-apt-3.png","whole-apt-4.png"].map((img, i) => (
          <div key={i} style={{ flex: i === 0 ? 2 : 1, overflow: "hidden" }}>
            <img src={`/case-studies/chapter/${img}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>

      <div style={{ padding: "16px 16px 0", overflowY: "auto" as const, height: "calc(100% - 52px - 52px - 140px - 90px)" }}>
        {/* Price summary */}
        <div style={{ padding: "14px 16px", background: C.lime, borderRadius: 14, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 600, color: "#3D4500", textTransform: "uppercase" as const, letterSpacing: 0.8 }}>Bundle price</div>
            <div style={{ fontFamily: F.serif, fontSize: 28, fontWeight: 500, color: "#000", lineHeight: 1.1 }}>₪{bundlePrice.toLocaleString()}</div>
          </div>
          <div style={{ textAlign: "right" as const }}>
            <div style={{ fontFamily: F.sans, fontSize: 11, color: "#5A6400", textDecoration: "line-through" }}>₪{totalSeparate.toLocaleString()} separately</div>
            <div style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 700, color: "#3D4500" }}>Save ₪{(totalSeparate - bundlePrice).toLocaleString()}</div>
          </div>
        </div>

        <Label>What&apos;s included</Label>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 8, marginTop: 8 }}>
          {items.map(item => (
            <div key={item.title} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: C.surface, borderRadius: 12, border: `0.5px solid ${C.border}` }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, overflow: "hidden", background: C.cream, flexShrink: 0 }}>
                <img src={`/case-studies/chapter/${item.image}`} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 500, color: C.ink }}>{item.title}</div>
                <div style={{ fontFamily: F.sans, fontSize: 11.5, color: C.muted }}>₪{item.price.toLocaleString()} individually</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, padding: 12, background: C.cream, borderRadius: 12, border: `0.5px solid ${C.border}` }}>
          <div style={{ fontFamily: F.sans, fontSize: 12.5, color: C.muted, lineHeight: 1.5 }}>
            One pickup, one price. Coordinate a single trip with Lynne before Mar 28 — all 4 items, one handoff.
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0, padding: "12px 16px 30px", background: C.surface, borderTop: `0.5px solid ${C.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8 }}>
          <SmallBtn variant="ghost">Ask</SmallBtn>
          <SmallBtn variant="primary">Reserve bundle · ₪{bundlePrice.toLocaleString()}</SmallBtn>
        </div>
      </div>
    </div>
  );
}

function ScreenMeet() {
  const slots = [
    { day: "Wed Mar 19", time: "5:00 – 7:00 pm" },
    { day: "Thu Mar 20", time: "12:00 – 2:00 pm" },
    { day: "Sat Mar 22", time: "10:00 am – 12:00 pm" },
  ];
  return (
    <div data-screen="screen-meet" style={{ width: PW, height: PH, background: C.bg, overflow: "hidden" }}>
      <div style={{ padding: "52px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <BackBtn />
        </div>

        <h2 style={{ margin: "0 0 6px", fontFamily: F.serif, fontSize: 24, fontWeight: 500, letterSpacing: -0.3, color: C.ink }}>Propose a meetup</h2>
        <div style={{ fontFamily: F.sans, fontSize: 13.5, color: C.muted, marginBottom: 6 }}>Linen 3-seater sofa · Lynne Itelson</div>
        <div style={{ fontFamily: F.sans, fontSize: 12.5, color: C.muted, marginBottom: 20 }}>
          Choose 3 slots — Lynne will pick one. Area: <strong style={{ color: C.ink }}>Florentin, Tel Aviv</strong>. Exact address after confirmation.
        </div>

        <Label>Your proposed times</Label>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, marginTop: 10 }}>
          {slots.map((slot, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 16px", borderRadius: 14,
              background: i === 0 ? C.ink : C.surface,
              border: `0.5px solid ${i === 0 ? C.ink : C.border}`,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 999,
                background: i === 0 ? C.lime : C.border,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: F.sans, fontSize: 11, fontWeight: 700, color: i === 0 ? "#000" : C.muted, flexShrink: 0,
              }}>{i + 1}</div>
              <div>
                <div style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 600, color: i === 0 ? "#fff" : C.ink }}>{slot.day}</div>
                <div style={{ fontFamily: F.sans, fontSize: 12.5, color: i === 0 ? "rgba(255,255,255,0.65)" : C.muted, marginTop: 2 }}>{slot.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, padding: 12, background: C.cream, borderRadius: 12, border: `0.5px solid ${C.border}` }}>
          <div style={{ fontFamily: F.sans, fontSize: 12.5, color: C.muted, lineHeight: 1.5 }}>
            Optional: request a video call first for large items.
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <Btn variant="primary" full>Send proposals</Btn>
        </div>
      </div>
    </div>
  );
}

function ScreenReserve() {
  return (
    <div data-screen="screen-reserve" style={{ width: PW, height: PH, background: C.bg, overflow: "hidden" }}>
      <div style={{ padding: "52px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <BackBtn />
        </div>

        <h2 style={{ margin: "0 0 4px", fontFamily: F.serif, fontSize: 24, fontWeight: 500, letterSpacing: -0.3, color: C.ink }}>Reserve & pay</h2>
        <div style={{ fontFamily: F.sans, fontSize: 13.5, color: C.muted, marginBottom: 20 }}>Linen 3-seater sofa · Lynne Itelson</div>

        {/* Item summary */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", background: C.surface, borderRadius: 14, border: `0.5px solid ${C.border}`, marginBottom: 16 }}>
          <div style={{ width: 60, height: 60, borderRadius: 10, overflow: "hidden", background: C.cream, flexShrink: 0 }}>
            <img src="/case-studies/chapter/listing-sofa.png" alt="Sofa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 600, color: C.ink }}>Linen 3-seater sofa</div>
            <div style={{ fontFamily: F.serif, fontSize: 20, fontWeight: 500, color: C.ink }}>₪1,450</div>
          </div>
          <StatusPill s="available" />
        </div>

        {/* Escrow explanation */}
        <div style={{ padding: 16, background: C.cream, borderRadius: 14, border: `0.5px solid ${C.border}`, marginBottom: 16 }}>
          <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 6 }}>How this works</div>
          <div style={{ fontFamily: F.sans, fontSize: 13, color: C.ink, lineHeight: 1.6 }}>
            A <strong>20% deposit (₪290)</strong> holds the item for 48 hours. Held in escrow until handoff. <strong>Full refund if the meetup doesn&apos;t happen.</strong>
          </div>
        </div>

        {/* Payment breakdown */}
        <div style={{ padding: "14px 16px", background: C.surface, borderRadius: 14, border: `0.5px solid ${C.border}`, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontFamily: F.sans, fontSize: 13, color: C.muted }}>
            <span>Item price</span>
            <span>₪1,450</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontFamily: F.sans, fontSize: 13, color: C.muted }}>
            <span>Deposit (20%) — due now</span>
            <span style={{ color: C.ink, fontWeight: 600 }}>₪290</span>
          </div>
          <div style={{ height: 0.5, background: C.border, margin: "10px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.sans, fontSize: 13, color: C.muted }}>
            <span>Balance due at handoff</span>
            <span>₪1,160</span>
          </div>
        </div>

        <Btn variant="accent" full>Pay deposit · ₪290</Btn>
        <div style={{ marginTop: 10, fontFamily: F.sans, fontSize: 11.5, color: C.muted, textAlign: "center" as const, lineHeight: 1.5 }}>
          Full refund if the meetup doesn&apos;t happen.
        </div>
      </div>
    </div>
  );
}

function ScreenHandoff() {
  const steps = [
    { label: "Reserved",      done: true,    note: "Mar 16 · ₪290 deposit held in escrow" },
    { label: "Meetup set",    done: true,    note: "Wed Mar 19 · 5:00 pm · Florentin" },
    { label: "Item inspected",done: true,    note: "Both parties confirmed at pickup" },
    { label: "Funds released",done: false,   note: "Confirm handoff to release payment" },
  ];
  return (
    <div data-screen="screen-handoff" style={{ width: PW, height: PH, background: C.bg, overflow: "hidden" }}>
      <div style={{ padding: "52px 16px 0" }}>
        <div style={{ marginBottom: 20 }}>
          <BackBtn />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, overflow: "hidden", background: C.cream }}>
            <img src="/case-studies/chapter/listing-sofa.png" alt="Sofa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontFamily: F.serif, fontSize: 20, fontWeight: 500, color: C.ink }}>Handoff tracker</h2>
            <div style={{ fontFamily: F.sans, fontSize: 13, color: C.muted }}>Linen 3-seater sofa · Lynne Itelson</div>
          </div>
        </div>

        {/* Progress steps */}
        <div style={{ position: "relative" as const }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < steps.length - 1 ? 0 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 999, flexShrink: 0,
                  background: step.done ? C.ink : C.soft,
                  border: `2px solid ${step.done ? C.ink : C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {step.done && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l4 4 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: 2, flex: 1, minHeight: 24, background: step.done ? C.ink : C.border, margin: "3px 0" }} />
                )}
              </div>
              <div style={{ paddingBottom: 20 }}>
                <div style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 600, color: step.done ? C.ink : C.muted }}>{step.label}</div>
                <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, marginTop: 2, lineHeight: 1.5 }}>{step.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 8 }}>
          <Btn variant="lime" full>Confirm handoff — release ₪1,160</Btn>
          <div style={{ marginTop: 10, fontFamily: F.sans, fontSize: 11.5, color: C.muted, textAlign: "center" as const }}>
            Both buyer and seller must confirm. Escrow releases on match.
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenInbox() {
  const threads = [
    { listing: "Linen 3-seater sofa", who: "Asher P.", last: "Could I come by Wednesday evening?", time: "14:02", unread: true, status: "available" as StatusKey },
    { listing: "Vespa Primavera 50", who: "Inbar R.", last: "You're #2 on the waitlist.", time: "11:40", unread: false, status: "on-hold" as StatusKey },
    { listing: "2-room sublease · Old North", who: "Tomer S.", last: "Thanks — sending the deposit.", time: "Yesterday", unread: false, status: "available" as StatusKey },
    { listing: "Cannondale road bike", who: "Lior M.", last: "It's back — still interested?", time: "2d", unread: true, status: "back-on-market" as StatusKey },
    { listing: "Oak dining table, seats 6", who: "Family up the block", last: "Picked up — thank you!", time: "3d", unread: false, status: "sold" as StatusKey },
  ];
  return (
    <div data-screen="screen-inbox" style={{ width: PW, height: PH, background: C.bg, display: "flex", flexDirection: "column" as const, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "52px 16px 12px", background: C.surface, borderBottom: `0.5px solid ${C.border}` }}>
        <h1 style={{ margin: 0, fontFamily: F.serif, fontSize: 24, fontWeight: 500, color: C.ink }}>Inbox</h1>
        <div style={{ fontFamily: F.sans, fontSize: 12.5, color: C.muted, marginTop: 2 }}>2 unread</div>
      </div>

      {/* Thread list */}
      <div style={{ flex: 1, overflowY: "auto" as const }}>
        {threads.map((t, i) => (
          <div key={i} style={{
            padding: "14px 16px",
            borderBottom: `0.5px solid ${C.border}`,
            background: t.unread ? C.surface : C.bg,
            display: "flex", gap: 12, alignItems: "center",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: C.cream,
              border: `0.5px solid ${C.border}`, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: F.sans, fontSize: 10, fontWeight: 600, color: C.muted,
            }}>
              {t.listing[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 }}>
                <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: t.unread ? 700 : 500, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const, maxWidth: "60%" }}>{t.listing}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {t.unread && <div style={{ width: 7, height: 7, borderRadius: 999, background: C.orange }} />}
                  <span style={{ fontFamily: F.sans, fontSize: 11, color: C.muted }}>{t.time}</span>
                </div>
              </div>
              <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const, marginBottom: 5 }}>
                {t.who}: {t.last}
              </div>
              <StatusPill s={t.status} />
            </div>
          </div>
        ))}
      </div>

      <TabBar active="inbox" />
    </div>
  );
}

function ScreenStatusSystem() {
  return (
    <div data-screen="screen-status" style={{ width: PW, height: PH, background: C.bg, padding: "52px 20px 24px", boxSizing: "border-box" as const, overflow: "hidden" }}>
      <Wordmark size={18} />
      <h2 style={{ margin: "16px 0 6px", fontFamily: F.serif, fontSize: 24, fontWeight: 500, letterSpacing: -0.3, color: C.ink }}>Status system</h2>
      <p style={{ margin: "0 0 20px", fontFamily: F.sans, fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
        Every listing lives in one of four states. Status is ambient — visible before price, before tapping in.
      </p>

      {(["available","on-hold","sold","back-on-market"] as StatusKey[]).map(s => {
        const cfg = STATUS[s];
        const desc: Record<string, string> = {
          "available":      "Listed, active, all actions open. The default state.",
          "on-hold":        "Someone has deposited. The seller is committed to them for 48 hours. Others can join the waitlist.",
          "sold":           "The item has a new home. Listing is archived. No ambiguity about whether to message.",
          "back-on-market": "The hold lapsed or deal fell through. Available again — with full context. The most honest state.",
        };
        return (
          <div key={s} style={{ marginBottom: 12, padding: "14px 16px", background: C.surface, borderRadius: 14, border: `0.5px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <StatusPill s={s} size="lg" />
            </div>
            <div style={{ fontFamily: F.sans, fontSize: 12.5, color: C.muted, lineHeight: 1.5 }}>{desc[s]}</div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIEWER SHELL
// ═══════════════════════════════════════════════════════════════════════════════

const SCREENS = [
  { id: "screen-onboarding", label: "Onboarding",  component: ScreenOnboarding },
  { id: "screen-browse",     label: "Browse",       component: ScreenBrowse },
  { id: "screen-search",     label: "City Search",  component: ScreenSearch },
  { id: "screen-listing",    label: "Listing",      component: ScreenListing },
  { id: "screen-chat",       label: "Chat",         component: ScreenChat },
  { id: "screen-seller",     label: "Seller Page",  component: ScreenSellerPage },
  { id: "screen-bundle",     label: "Bundle",       component: ScreenBundle },
  { id: "screen-meet",       label: "Meet",         component: ScreenMeet },
  { id: "screen-reserve",    label: "Reserve",      component: ScreenReserve },
  { id: "screen-handoff",    label: "Handoff",      component: ScreenHandoff },
  { id: "screen-inbox",      label: "Inbox",        component: ScreenInbox },
  { id: "screen-status",     label: "Status System",component: ScreenStatusSystem },
];

const SCALE = 0.72;

export default function WireframeViewer() {
  useFonts();
  const [active, setActive] = useState(0);

  const ActiveScreen = SCREENS[active].component;

  return (
    <div style={{ background: C.viewerBg, minHeight: "100vh", display: "flex", flexDirection: "column" as const, alignItems: "center", padding: "32px 16px 48px", fontFamily: F.sans }}>

      {/* Dot nav */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {SCREENS.map((sc, i) => (
          <button
            key={sc.id}
            title={sc.label}
            onClick={() => setActive(i)}
            style={{
              width: 8, height: 8, borderRadius: 999, border: "none", padding: 0,
              background: i === active ? C.ink : "rgba(0,0,0,0.2)",
              cursor: "pointer", transition: "background 0.2s",
            }}
          />
        ))}
      </div>

      {/* Screen label */}
      <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase" as const, marginBottom: 16 }}>
        {SCREENS[active].label}
      </div>

      {/* Phone frame */}
      <div style={{
        width: PW * SCALE,
        height: PH * SCALE,
        borderRadius: 40 * SCALE,
        background: "#1a1a1a",
        padding: 10 * SCALE,
        boxSizing: "border-box" as const,
        boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 2px 12px rgba(0,0,0,0.14)",
        position: "relative" as const,
        marginBottom: 32,
      }}>
        {/* Screen area */}
        <div style={{
          width: (PW - 20) * SCALE,
          height: (PH - 20) * SCALE,
          borderRadius: 32 * SCALE,
          overflow: "hidden",
          position: "relative" as const,
        }}>
          <div style={{
            width: PW - 20,
            height: PH - 20,
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
          }}>
            <div style={{ marginBottom: ((PH - 20) * SCALE - (PH - 20)) }}>
              <ActiveScreen />
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const, justifyContent: "center", maxWidth: 700 }}>
        {SCREENS.map((sc, i) => {
          const Thumb = sc.component;
          const TSCALE = 0.12;
          const isActive = i === active;
          return (
            <button
              key={sc.id}
              onClick={() => setActive(i)}
              style={{
                width: PW * TSCALE,
                height: PH * TSCALE,
                borderRadius: 8,
                overflow: "hidden",
                border: isActive ? `2px solid ${C.ink}` : `1px solid ${C.border}`,
                padding: 0, cursor: "pointer", background: C.cream, flexShrink: 0,
                position: "relative" as const,
              }}
            >
              <div style={{
                width: PW,
                height: PH,
                transform: `scale(${TSCALE})`,
                transformOrigin: "top left",
                pointerEvents: "none",
                position: "absolute" as const, top: 0, left: 0,
              }}>
                <Thumb />
              </div>
            </button>
          );
        })}
      </div>

      {/* Screen name labels under thumbnails */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const, justifyContent: "center", maxWidth: 700, marginTop: 8 }}>
        {SCREENS.map((sc, i) => (
          <div key={sc.id} style={{
            width: PW * 0.12,
            fontFamily: F.sans, fontSize: 9, color: C.muted,
            textAlign: "center" as const, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const,
          }}>
            {sc.label}
          </div>
        ))}
      </div>

    </div>
  );
}

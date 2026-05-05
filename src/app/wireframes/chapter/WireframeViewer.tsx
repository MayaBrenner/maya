"use client";
import { useEffect, useState } from "react";

// ─── Load fonts ───────────────────────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    if (document.getElementById("chapter-fonts")) return;
    const link = document.createElement("link");
    link.id = "chapter-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  linen:    "#F5F2ED",
  bark:     "#28251F",
  sage:     "#6B8A73",
  sand:     "#C4A882",
  driftwood:"#8C8478",
  cream:    "#FAF8F4",
  stone:    "#9E9890",
  hairline: "rgba(40,37,31,0.10)",
  hairlineStrong: "rgba(40,37,31,0.18)",
  // status colors
  statusAvailableColor: "#4A9B6F",
  statusAvailableBg:    "#EDF7F2",
  statusOnHoldColor:    "#B5880C",
  statusOnHoldBg:       "#FBF4E0",
  statusSoldColor:      "#8C8478",
  statusSoldBg:         "#EDEBE7",
  statusBackColor:      "#3D72B0",
  statusBackBg:         "#EBF2FA",
  bg: "#EBE6DC",
};

const TF = {
  serif: '"Lora", Georgia, serif',
  sans:  '"DM Sans", system-ui, sans-serif',
};

// ─── StatusPill ───────────────────────────────────────────────────────────────
type Status = "available" | "on-hold" | "sold" | "back-on-market";
const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string }> = {
  "available":      { label: "Available",     color: T.statusAvailableColor, bg: T.statusAvailableBg },
  "on-hold":        { label: "On Hold",        color: T.statusOnHoldColor,    bg: T.statusOnHoldBg    },
  "sold":           { label: "Sold",           color: T.statusSoldColor,      bg: T.statusSoldBg      },
  "back-on-market": { label: "Back on Market", color: T.statusBackColor,      bg: T.statusBackBg      },
};

function StatusPill({ status, small = false }: { status: Status; small?: boolean }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: small ? 4 : 5,
      padding: small ? "3px 8px" : "4px 10px",
      borderRadius: 9999,
      background: cfg.bg,
      color: cfg.color,
      fontFamily: TF.sans,
      fontSize: small ? 11 : 12,
      fontWeight: 500,
    }}>
      <div style={{ width: small ? 5 : 6, height: small ? 5 : 6, borderRadius: 9999, background: cfg.color, flexShrink: 0 }} />
      {cfg.label}
    </div>
  );
}

// ─── SellerStrip ──────────────────────────────────────────────────────────────
function SellerStrip({ name, context }: { name: string; context: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width: 24, height: 24, borderRadius: 9999,
        background: T.sage, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: TF.sans, fontSize: 10, fontWeight: 600,
        flexShrink: 0,
      }}>
        {name[0]}
      </div>
      <span style={{ fontFamily: TF.sans, fontSize: 12, color: T.stone }}>
        {name} · {context}
      </span>
    </div>
  );
}

// ─── Shared ───────────────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ height: 1, background: T.hairline, width: "100%" }} />;
}

// ─── Phone screens (390 × 844) ────────────────────────────────────────────────
const PW = 390, PH = 844;

// Furniture SVG icon (simple table silhouette)
function FurnitureIcon({ color = "#fff", size = 40 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="4" y="14" width="32" height="5" rx="2" fill={color} opacity="0.9"/>
      <rect x="6" y="19" width="4" height="12" rx="1.5" fill={color} opacity="0.7"/>
      <rect x="30" y="19" width="4" height="12" rx="1.5" fill={color} opacity="0.7"/>
      <rect x="12" y="19" width="4" height="12" rx="1.5" fill={color} opacity="0.7"/>
      <rect x="24" y="19" width="4" height="12" rx="1.5" fill={color} opacity="0.7"/>
    </svg>
  );
}

function CarIcon({ color = "#fff", size = 40 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="4" y="18" width="32" height="10" rx="3" fill={color} opacity="0.8"/>
      <path d="M8 18l4-7h16l4 7" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.9"/>
      <circle cx="10" cy="30" r="4" fill={color} opacity="0.7"/>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.7"/>
    </svg>
  );
}

function ShelfIcon({ color = "#fff", size = 40 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="4" y="8" width="32" height="3" rx="1.5" fill={color} opacity="0.9"/>
      <rect x="4" y="18" width="32" height="3" rx="1.5" fill={color} opacity="0.9"/>
      <rect x="4" y="28" width="32" height="3" rx="1.5" fill={color} opacity="0.9"/>
      <rect x="4" y="8" width="3" height="23" rx="1.5" fill={color} opacity="0.7"/>
      <rect x="33" y="8" width="3" height="23" rx="1.5" fill={color} opacity="0.7"/>
    </svg>
  );
}

function MugIcon({ color = "#fff", size = 36 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="5" y="14" width="18" height="14" rx="2" fill={color} opacity="0.8"/>
      <path d="M23 17h4a3 3 0 010 6h-4" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8"/>
      <path d="M9 10c0-2 4-3 4-6M15 10c0-2 4-3 4-6" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
    </svg>
  );
}

// Listing card for home screen
function ListingCard({
  title, price, status, sellerName, sellerContext, icon, iconBg, muted = false,
}: {
  title: string; price: string; status: Status;
  sellerName: string; sellerContext: string;
  icon: React.ReactNode; iconBg: string; muted?: boolean;
}) {
  return (
    <div style={{
      background: "#fff", borderRadius: 12,
      border: `1px solid ${T.hairline}`,
      overflow: "hidden",
      opacity: muted ? 0.6 : 1,
    }}>
      {/* Image area */}
      <div style={{
        height: 110, background: iconBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        {icon}
        <div style={{ position: "absolute", top: 8, left: 8 }}>
          <StatusPill status={status} small />
        </div>
      </div>
      {/* Info */}
      <div style={{ padding: "10px 10px 12px" }}>
        <div style={{ fontFamily: TF.sans, fontSize: 13, fontWeight: 500, color: T.bark, lineHeight: 1.3, marginBottom: 4 }}>{title}</div>
        <div style={{ fontFamily: TF.serif, fontSize: 16, fontWeight: 600, color: T.bark, marginBottom: 5 }}>{price}</div>
        <div style={{ fontFamily: TF.sans, fontSize: 11, color: T.stone, lineHeight: 1.3 }}>{sellerName} · {sellerContext}</div>
      </div>
    </div>
  );
}

function ScreenHome() {
  return (
    <div style={{ width: PW, height: PH, background: T.linen, fontFamily: TF.sans, overflow: "hidden", position: "relative" }}>
      {/* Top bar */}
      <div style={{ background: T.sage, paddingTop: 52, paddingBottom: 12, paddingLeft: 16, paddingRight: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: TF.serif, fontStyle: "italic", fontSize: 22, color: T.cream, letterSpacing: "-0.01em" }}>Chapter</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              padding: "5px 11px", borderRadius: 9999,
              background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.28)",
              fontFamily: TF.sans, fontSize: 13, color: "#fff", display: "flex", alignItems: "center", gap: 5,
            }}>
              Tel Aviv
              <span style={{ fontSize: 10, opacity: 0.8 }}>▾</span>
            </div>
            {/* Bell icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2.5a6 6 0 016 6v3l1.5 2H2.5L4 11.5v-3a6 6 0 016-6z" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
              <path d="M8 16.5c0 1.1.9 2 2 2s2-.9 2-2" stroke="#fff" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div style={{ padding: "12px 16px 8px", background: "#fff" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px", borderRadius: 10,
          background: T.linen, border: `1px solid ${T.hairline}`,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke={T.driftwood} strokeWidth="1.4"/>
            <path d="M9.5 9.5L12 12" stroke={T.driftwood} strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: TF.sans, fontSize: 14, color: T.stone }}>Search items…</span>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ padding: "6px 16px 10px", background: "#fff", display: "flex", gap: 7, overflowX: "hidden" as const }}>
        {[
          { label: "All", active: true },
          { label: "Furniture", active: false },
          { label: "Vehicles", active: false },
          { label: "Electronics", active: false },
          { label: "Housing", active: false },
        ].map((chip) => (
          <div key={chip.label} style={{
            padding: "6px 14px", borderRadius: 9999, flexShrink: 0,
            background: chip.active ? T.sage : "transparent",
            border: chip.active ? `1px solid ${T.sage}` : `1px solid ${T.hairlineStrong}`,
            color: chip.active ? "#fff" : T.bark,
            fontFamily: TF.sans, fontSize: 13, fontWeight: chip.active ? 500 : 400,
          }}>
            {chip.label}
          </div>
        ))}
      </div>

      <Divider />

      {/* Card grid */}
      <div style={{ padding: "14px 14px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, overflowY: "auto" as const, height: "calc(100% - 200px)" }}>
        <ListingCard
          title="Solid wood dining table"
          price="₪ 480"
          status="available"
          sellerName="Maya"
          sellerContext="Moving to Berlin"
          iconBg="linear-gradient(135deg, #8FAF97 0%, #6B8A73 100%)"
          icon={<FurnitureIcon color="#fff" size={42} />}
        />
        <ListingCard
          title="IKEA Kallax shelf 4×4"
          price="₪ 220"
          status="on-hold"
          sellerName="David"
          sellerContext="Returning from NYC"
          iconBg="linear-gradient(135deg, #C9B99A 0%, #A89070 100%)"
          icon={<ShelfIcon color="#fff" size={42} />}
        />
        <ListingCard
          title="Honda Civic 2019"
          price="₪ 42,000"
          status="back-on-market"
          sellerName="Yael"
          sellerContext="Ending lease"
          iconBg="linear-gradient(135deg, #7A9CC0 0%, #5080A8 100%)"
          icon={<CarIcon color="#fff" size={42} />}
        />
        <ListingCard
          title="French press + mug set"
          price="₪ 90"
          status="sold"
          sellerName="Tomer"
          sellerContext="Moving next week"
          iconBg="linear-gradient(135deg, #B8AFA5 0%, #9A9088 100%)"
          icon={<MugIcon color="#fff" size={36} />}
          muted
        />
      </div>

      {/* Bottom tab bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 80, background: "#fff", borderTop: `1px solid ${T.hairline}`,
        display: "flex", alignItems: "center", justifyContent: "space-around",
        paddingBottom: 14,
      }}>
        {[
          { icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="7" height="7" rx="1.5" stroke={T.sage} strokeWidth="1.5" fill="none"/>
              <rect x="11" y="2" width="7" height="7" rx="1.5" stroke={T.driftwood} strokeWidth="1.5" fill="none"/>
              <rect x="2" y="11" width="7" height="7" rx="1.5" stroke={T.driftwood} strokeWidth="1.5" fill="none"/>
              <rect x="11" y="11" width="7" height="7" rx="1.5" stroke={T.driftwood} strokeWidth="1.5" fill="none"/>
            </svg>
          ), label: "Browse", active: true },
          { icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 16.5l-1.2-1C5 12.5 2 9.8 2 6.5a4 4 0 018-0c.4-.7 1.1-1.3 2-1.5" stroke={T.driftwood} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
            </svg>
          ), label: "Saved", active: false },
          { icon: (
            <div style={{ width: 44, height: 44, borderRadius: 9999, background: T.bark, display: "flex", alignItems: "center", justifyContent: "center", marginTop: -8 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M4 10h12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          ), label: "Sell", active: false },
          { icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h9M3 15h6" stroke={T.driftwood} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ), label: "Messages", active: false },
          { icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3.5" stroke={T.driftwood} strokeWidth="1.5" fill="none"/>
              <path d="M3 18c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke={T.driftwood} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
          ), label: "Me", active: false },
        ].map((tab) => (
          <div key={tab.label} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 4 }}>
            {tab.icon}
            {tab.label !== "Sell" && (
              <span style={{ fontFamily: TF.sans, fontSize: 10, color: tab.active ? T.sage : T.driftwood, fontWeight: tab.active ? 500 : 400 }}>
                {tab.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenListing() {
  return (
    <div style={{ width: PW, height: PH, background: T.linen, fontFamily: TF.sans, overflow: "hidden", position: "relative" }}>
      {/* Top bar */}
      <div style={{
        paddingTop: 52, paddingBottom: 12, paddingLeft: 16, paddingRight: 16,
        background: "#fff",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4L7 10l6 6" stroke={T.bark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div style={{ display: "flex", gap: 16 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 16.5l-1.2-1C5 12.5 2 9.8 2 6.5a4 4 0 018 0 4 4 0 018 0c0 3.3-3 6-6.8 9l-1.2 1z" stroke={T.bark} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
          </svg>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="5" cy="10" r="1.5" fill={T.bark}/>
            <circle cx="10" cy="10" r="1.5" fill={T.bark}/>
            <circle cx="15" cy="10" r="1.5" fill={T.bark}/>
          </svg>
        </div>
      </div>

      {/* Image area */}
      <div style={{
        height: 240,
        background: `linear-gradient(160deg, ${T.sage} 0%, #557560 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <FurnitureIcon color="rgba(255,255,255,0.85)" size={72} />
      </div>

      {/* Content */}
      <div style={{ background: "#fff", padding: "16px 20px", flex: 1 }}>
        <div style={{ marginBottom: 10 }}>
          <StatusPill status="available" />
        </div>
        <div style={{ fontFamily: TF.serif, fontSize: 22, fontWeight: 500, color: T.bark, lineHeight: 1.25, marginBottom: 8 }}>
          Solid wood dining table + 4 chairs
        </div>
        <div style={{ fontFamily: TF.serif, fontSize: 28, fontWeight: 600, color: T.bark, marginBottom: 14 }}>
          ₪ 480
        </div>
        <SellerStrip name="Maya" context="Moving to Berlin · listing ends Mar 15" />
        <Divider />
        <div style={{ paddingTop: 12, paddingBottom: 12 }}>
          <div style={{ fontFamily: TF.sans, fontSize: 14, color: T.driftwood, lineHeight: 1.6, marginBottom: 8 }}>
            Solid acacia wood, seats 6 comfortably. Minor scratches on one leg — not visible when seated. Needs to be gone by March 10.
          </div>
          <div style={{ fontFamily: TF.sans, fontSize: 13, color: T.stone }}>180 × 90 cm · seats 6</div>
        </div>
        <Divider />
      </div>

      {/* Action buttons */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", padding: "12px 20px 36px", display: "flex", flexDirection: "column" as const, gap: 10 }}>
        {/* Ask a question */}
        <div style={{
          padding: "14px 20px", borderRadius: 12,
          border: `1.5px solid ${T.sage}`,
          color: T.sage, fontFamily: TF.sans, fontSize: 15, fontWeight: 500,
          textAlign: "center" as const,
        }}>
          Ask a question
        </div>
        {/* Propose a meetup */}
        <div style={{
          padding: "14px 20px", borderRadius: 12,
          background: T.linen, border: `1px solid ${T.sand}`,
          color: T.bark, fontFamily: TF.sans, fontSize: 15, fontWeight: 500,
          textAlign: "center" as const,
        }}>
          Propose a meetup
        </div>
        {/* Reserve & Pay */}
        <div style={{
          padding: "14px 20px", borderRadius: 12,
          background: T.bark, color: T.cream,
          fontFamily: TF.sans, fontSize: 15, fontWeight: 500,
          textAlign: "center" as const,
        }}>
          Reserve &amp; Pay
          <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 400, marginTop: 2 }}>holds for 48 hours</div>
        </div>
      </div>
    </div>
  );
}

function ScreenChat() {
  return (
    <div style={{ width: PW, height: PH, background: T.linen, fontFamily: TF.sans, overflow: "hidden", position: "relative" }}>
      {/* Header */}
      <div style={{ paddingTop: 52, paddingBottom: 12, paddingLeft: 16, paddingRight: 16, background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 4L7 10l6 6" stroke={T.bark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: TF.sans, fontSize: 14, fontWeight: 500, color: T.bark }}>Wooden dining table</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
              <StatusPill status="available" small />
              <span style={{ fontFamily: TF.serif, fontSize: 13, fontWeight: 600, color: T.bark }}>₪ 480</span>
            </div>
          </div>
        </div>
      </div>
      <Divider />

      {/* Messages */}
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column" as const, gap: 12, height: 460, overflowY: "auto" as const }}>
        {/* Received */}
        <div style={{ alignSelf: "flex-start" as const, maxWidth: "75%" }}>
          <div style={{
            padding: "10px 14px", borderRadius: "16px 16px 16px 4px",
            background: "#EDF3EF", fontFamily: TF.sans, fontSize: 13, color: T.bark, lineHeight: 1.5,
          }}>
            Is it still available?
          </div>
          <div style={{ fontFamily: TF.sans, fontSize: 10, color: T.stone, marginTop: 4, marginLeft: 4 }}>David · 10:34</div>
        </div>

        {/* Sent */}
        <div style={{ alignSelf: "flex-end" as const, maxWidth: "75%" }}>
          <div style={{
            padding: "10px 14px", borderRadius: "16px 16px 4px 16px",
            background: T.bark, color: T.cream, fontFamily: TF.sans, fontSize: 13, lineHeight: 1.5,
          }}>
            Yes! I&apos;m moving Mar 15.
          </div>
          <div style={{ fontFamily: TF.sans, fontSize: 10, color: T.stone, marginTop: 4, textAlign: "right" as const, marginRight: 4 }}>10:41</div>
        </div>

        {/* Received */}
        <div style={{ alignSelf: "flex-start" as const, maxWidth: "75%" }}>
          <div style={{
            padding: "10px 14px", borderRadius: "16px 16px 16px 4px",
            background: "#EDF3EF", fontFamily: TF.sans, fontSize: 13, color: T.bark, lineHeight: 1.5,
          }}>
            What are the dimensions?
          </div>
          <div style={{ fontFamily: TF.sans, fontSize: 10, color: T.stone, marginTop: 4, marginLeft: 4 }}>10:41</div>
        </div>

        {/* Sent */}
        <div style={{ alignSelf: "flex-end" as const, maxWidth: "75%" }}>
          <div style={{
            padding: "10px 14px", borderRadius: "16px 16px 4px 16px",
            background: T.bark, color: T.cream, fontFamily: TF.sans, fontSize: 13, lineHeight: 1.5,
          }}>
            180×90cm, seats 6 comfortably.
          </div>
          <div style={{ fontFamily: TF.sans, fontSize: 10, color: T.stone, marginTop: 4, textAlign: "right" as const, marginRight: 4 }}>10:43</div>
        </div>

        {/* Received */}
        <div style={{ alignSelf: "flex-start" as const, maxWidth: "75%" }}>
          <div style={{
            padding: "10px 14px", borderRadius: "16px 16px 16px 4px",
            background: "#EDF3EF", fontFamily: TF.sans, fontSize: 13, color: T.bark, lineHeight: 1.5,
          }}>
            Is the price negotiable?
          </div>
          <div style={{ fontFamily: TF.sans, fontSize: 10, color: T.stone, marginTop: 4, marginLeft: 4 }}>10:45</div>
        </div>

        {/* Sent */}
        <div style={{ alignSelf: "flex-end" as const, maxWidth: "80%" }}>
          <div style={{
            padding: "10px 14px", borderRadius: "16px 16px 4px 16px",
            background: T.bark, color: T.cream, fontFamily: TF.sans, fontSize: 13, lineHeight: 1.5,
          }}>
            I can do ₪450 — need it gone by Mar 10.
          </div>
          <div style={{ fontFamily: TF.sans, fontSize: 10, color: T.stone, marginTop: 4, textAlign: "right" as const, marginRight: 4 }}>10:46</div>
        </div>
      </div>

      {/* Quick reply chips */}
      <div style={{ padding: "10px 16px 8px", display: "flex", gap: 8 }}>
        {["What's the condition?", "Can we meet?"].map((q) => (
          <div key={q} style={{
            padding: "7px 14px", borderRadius: 9999,
            border: `1px solid ${T.hairlineStrong}`,
            background: "#fff",
            fontFamily: TF.sans, fontSize: 12, color: T.bark,
          }}>
            {q}
          </div>
        ))}
      </div>

      {/* Compose */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: `1px solid ${T.hairline}`, padding: "12px 16px 36px", display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{
          flex: 1, padding: "11px 16px", borderRadius: 24,
          background: T.linen, border: `1px solid ${T.hairline}`,
          fontFamily: TF.sans, fontSize: 14, color: T.stone,
        }}>
          Ask anything…
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: 9999, background: T.sage,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ScreenReserve() {
  return (
    <div style={{ width: PW, height: PH, background: T.linen, fontFamily: TF.sans, overflow: "hidden", position: "relative" }}>
      {/* Header */}
      <div style={{ paddingTop: 52, paddingBottom: 14, paddingLeft: 16, paddingRight: 16, background: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4L7 10l6 6" stroke={T.bark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontFamily: TF.sans, fontSize: 16, fontWeight: 600, color: T.bark }}>Reserve this item</span>
      </div>

      <div style={{ padding: "16px 16px 140px", display: "flex", flexDirection: "column" as const, gap: 14, overflowY: "auto" as const, height: "100%" }}>
        {/* Item mini-card */}
        <div style={{
          background: "#fff", borderRadius: 12, border: `1px solid ${T.hairline}`,
          padding: 14, display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ width: 48, height: 48, borderRadius: 8, background: `linear-gradient(135deg, ${T.sage}, #557560)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <FurnitureIcon color="#fff" size={28} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: TF.sans, fontSize: 13, fontWeight: 500, color: T.bark, marginBottom: 4 }}>Solid wood dining table</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: TF.serif, fontSize: 15, fontWeight: 600, color: T.bark }}>₪ 480</span>
              <StatusPill status="available" small />
            </div>
          </div>
        </div>

        {/* Payment breakdown */}
        <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${T.hairline}`, padding: 16 }}>
          <div style={{ fontFamily: TF.sans, fontSize: 13, fontWeight: 600, color: T.bark, marginBottom: 12 }}>Payment breakdown</div>
          {[
            ["Deposit to hold (48h)", "₪ 96"],
            ["Remaining at pickup", "₪ 384"],
          ].map(([label, amount]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontFamily: TF.sans, fontSize: 14, color: T.driftwood }}>{label}</span>
              <span style={{ fontFamily: TF.sans, fontSize: 14, color: T.bark }}>{amount}</span>
            </div>
          ))}
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <span style={{ fontFamily: TF.sans, fontSize: 14, fontWeight: 600, color: T.bark }}>Total</span>
            <span style={{ fontFamily: TF.serif, fontSize: 16, fontWeight: 600, color: T.bark }}>₪ 480</span>
          </div>
        </div>

        {/* Escrow info */}
        <div style={{
          background: "#EDF3EF", borderRadius: 12, border: `1px solid rgba(107,138,115,0.3)`,
          padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <rect x="3" y="8" width="12" height="8" rx="2" stroke={T.sage} strokeWidth="1.5" fill="none"/>
            <path d="M6 8V6a3 3 0 016 0v2" stroke={T.sage} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <circle cx="9" cy="12" r="1.2" fill={T.sage}/>
          </svg>
          <div style={{ fontFamily: TF.sans, fontSize: 13, color: "#4A6B55", lineHeight: 1.5 }}>
            Held in escrow until handoff. Full refund if the meetup doesn't happen.
          </div>
        </div>

        {/* Payment method */}
        <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${T.hairline}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
            <rect x="0.5" y="0.5" width="27" height="19" rx="3.5" stroke={T.hairlineStrong} fill="white"/>
            <rect x="0" y="6" width="28" height="5" fill={T.sand} opacity="0.5"/>
          </svg>
          <span style={{ fontFamily: TF.sans, fontSize: 14, color: T.driftwood }}>•••• •••• •••• 4242</span>
          <span style={{ marginLeft: "auto", fontFamily: TF.sans, fontSize: 12, color: T.sage }}>Change</span>
        </div>
      </div>

      {/* Bottom action */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: `1px solid ${T.hairline}`, padding: "14px 20px 36px" }}>
        <div style={{
          height: 52, borderRadius: 12, background: T.bark, color: T.cream,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: TF.sans, fontSize: 16, fontWeight: 500,
        }}>
          Pay ₪ 96 to reserve
        </div>
        <div style={{ fontFamily: TF.sans, fontSize: 11, color: T.stone, textAlign: "center" as const, marginTop: 10 }}>
          By reserving, you agree to meet within 48 hours.
        </div>
      </div>
    </div>
  );
}

function ScreenMeet() {
  return (
    <div style={{ width: PW, height: PH, background: T.linen, fontFamily: TF.sans, overflow: "hidden", position: "relative" }}>
      {/* Header */}
      <div style={{ paddingTop: 52, paddingBottom: 14, paddingLeft: 16, paddingRight: 16, background: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4L7 10l6 6" stroke={T.bark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontFamily: TF.sans, fontSize: 16, fontWeight: 600, color: T.bark }}>Propose a meetup</span>
      </div>

      <div style={{ padding: "16px 16px 140px", display: "flex", flexDirection: "column" as const, gap: 14, overflowY: "auto" as const, height: "100%" }}>
        {/* Item mini-card */}
        <div style={{
          background: "#fff", borderRadius: 12, border: `1px solid ${T.hairline}`,
          padding: 14, display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ width: 48, height: 48, borderRadius: 8, background: `linear-gradient(135deg, ${T.sage}, #557560)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <FurnitureIcon color="#fff" size={28} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: TF.sans, fontSize: 13, fontWeight: 500, color: T.bark, marginBottom: 4 }}>Solid wood dining table</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: TF.serif, fontSize: 15, fontWeight: 600, color: T.bark }}>₪ 480</span>
              <StatusPill status="on-hold" small />
            </div>
          </div>
        </div>

        {/* Time slots */}
        <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${T.hairline}`, padding: 16 }}>
          <div style={{ fontFamily: TF.sans, fontSize: 13, fontWeight: 600, color: T.bark, marginBottom: 14 }}>Propose 3 time slots</div>
          {[
            ["Wed, Mar 8", "4:00 PM"],
            ["Thu, Mar 9", "10:00 AM"],
            ["Sat, Mar 11", "12:00 PM"],
          ].map(([day, time], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 2 ? 10 : 0 }}>
              <div style={{
                flex: 1, padding: "10px 12px", borderRadius: 8,
                background: T.linen, border: `1px solid ${T.hairline}`,
                fontFamily: TF.sans, fontSize: 13, color: T.bark,
              }}>{day}</div>
              <div style={{
                width: 90, padding: "10px 12px", borderRadius: 8,
                background: T.linen, border: `1px solid ${T.hairline}`,
                fontFamily: TF.sans, fontSize: 13, color: T.bark,
                textAlign: "center" as const,
              }}>{time}</div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke={T.driftwood} strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
          ))}
          <div style={{ fontFamily: TF.sans, fontSize: 13, color: T.sage, marginTop: 14, fontWeight: 500 }}>+ Add another slot</div>
        </div>

        {/* Location */}
        <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${T.hairline}`, padding: 16 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 16, marginTop: 1 }}>📍</span>
            <div>
              <div style={{ fontFamily: TF.sans, fontSize: 13, fontWeight: 600, color: T.bark, marginBottom: 4 }}>
                Address shared after Maya confirms.
              </div>
              <div style={{ fontFamily: TF.sans, fontSize: 13, color: T.driftwood }}>Area: Florentin, Tel Aviv.</div>
            </div>
          </div>
        </div>

        {/* Video call toggle */}
        <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${T.hairline}`, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: TF.sans, fontSize: 14, fontWeight: 500, color: T.bark, marginBottom: 4 }}>Add a quick video call first?</div>
              <div style={{ fontFamily: TF.sans, fontSize: 12, color: T.stone, lineHeight: 1.4 }}>Useful for large items — inspect remotely before committing to meet</div>
            </div>
            {/* Toggle off */}
            <div style={{ width: 44, height: 26, borderRadius: 13, background: T.hairlineStrong, position: "relative", flexShrink: 0 }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, background: "#fff", position: "absolute", top: 3, left: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: `1px solid ${T.hairline}`, padding: "14px 20px 36px" }}>
        <div style={{
          height: 52, borderRadius: 12, background: T.bark, color: T.cream,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: TF.sans, fontSize: 16, fontWeight: 500,
        }}>
          Send proposal to Maya
        </div>
      </div>
    </div>
  );
}

// ─── Wide artboards (1280 × 720) ─────────────────────────────────────────────
const AW = 1280, AH = 720;

function ArtStatusSystem() {
  return (
    <div style={{ width: AW, height: AH, background: "#fff", fontFamily: TF.sans, padding: "52px 64px", position: "relative", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: TF.serif, fontSize: 32, fontWeight: 500, color: T.bark, letterSpacing: "-0.015em", marginBottom: 8 }}>
          The Status System
        </div>
        <div style={{ fontFamily: TF.sans, fontSize: 15, color: T.stone, maxWidth: 600, lineHeight: 1.5 }}>
          Every listing has a living state. Buyers always know where they stand.
        </div>
      </div>

      {/* 4 state cards */}
      <div style={{ display: "flex", gap: 20, marginBottom: 36 }}>
        {/* AVAILABLE */}
        <div style={{ flex: 1, borderRadius: 16, border: `2px solid ${T.statusAvailableColor}`, overflow: "hidden" }}>
          <div style={{ background: T.statusAvailableBg, padding: "16px 20px 14px" }}>
            <StatusPill status="available" />
            <div style={{ fontFamily: TF.serif, fontSize: 16, fontWeight: 500, color: T.bark, marginTop: 10, lineHeight: 1.3 }}>Solid wood dining table</div>
            <div style={{ fontFamily: TF.serif, fontSize: 18, fontWeight: 600, color: T.bark, marginTop: 4 }}>₪ 480</div>
            <div style={{ marginTop: 10 }}>
              <SellerStrip name="Maya" context="Moving to Berlin" />
            </div>
          </div>
          <div style={{ padding: "14px 20px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
            {["Ask a question", "Propose a meetup", "Reserve & Pay"].map((action, i) => (
              <div key={action} style={{
                padding: "9px 14px", borderRadius: 8, textAlign: "center" as const,
                fontFamily: TF.sans, fontSize: 13, fontWeight: 500,
                background: i === 2 ? T.bark : i === 1 ? T.linen : "transparent",
                border: i === 0 ? `1.5px solid ${T.sage}` : i === 1 ? `1px solid ${T.sand}` : "none",
                color: i === 2 ? T.cream : i === 0 ? T.sage : T.bark,
              }}>{action}</div>
            ))}
          </div>
        </div>

        {/* ON HOLD */}
        <div style={{ flex: 1, borderRadius: 16, border: `2px solid ${T.statusOnHoldColor}`, overflow: "hidden" }}>
          <div style={{ background: T.statusOnHoldBg, padding: "16px 20px 14px" }}>
            <StatusPill status="on-hold" />
            <div style={{ fontFamily: TF.serif, fontSize: 16, fontWeight: 500, color: T.bark, marginTop: 10, lineHeight: 1.3 }}>Solid wood dining table</div>
            <div style={{ fontFamily: TF.serif, fontSize: 18, fontWeight: 600, color: T.bark, marginTop: 4 }}>₪ 480</div>
            <div style={{ marginTop: 10 }}>
              <SellerStrip name="Maya" context="Moving to Berlin" />
            </div>
            <div style={{ fontFamily: TF.sans, fontSize: 11, color: T.statusOnHoldColor, marginTop: 8 }}>2 people watching</div>
          </div>
          <div style={{ padding: "14px 20px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
            {["Ask a question", "Join waitlist"].map((action, i) => (
              <div key={action} style={{
                padding: "9px 14px", borderRadius: 8, textAlign: "center" as const,
                fontFamily: TF.sans, fontSize: 13, fontWeight: 500,
                background: i === 1 ? T.statusOnHoldBg : "transparent",
                border: i === 0 ? `1.5px solid ${T.sage}` : `1px solid ${T.statusOnHoldColor}`,
                color: i === 1 ? T.statusOnHoldColor : T.sage,
              }}>{action}</div>
            ))}
          </div>
        </div>

        {/* SOLD */}
        <div style={{ flex: 1, borderRadius: 16, border: `2px solid ${T.statusSoldColor}`, overflow: "hidden", opacity: 0.8 }}>
          <div style={{ background: T.statusSoldBg, padding: "16px 20px 14px" }}>
            <StatusPill status="sold" />
            <div style={{ fontFamily: TF.serif, fontSize: 16, fontWeight: 500, color: T.bark, marginTop: 10, lineHeight: 1.3, opacity: 0.5 }}>Solid wood dining table</div>
            <div style={{ fontFamily: TF.serif, fontSize: 18, fontWeight: 600, color: T.bark, marginTop: 4, opacity: 0.5 }}>₪ 480</div>
            <div style={{ marginTop: 10, opacity: 0.5 }}>
              <SellerStrip name="Maya" context="Moving to Berlin" />
            </div>
          </div>
          <div style={{ padding: "14px 20px" }}>
            <div style={{
              padding: "12px 14px", borderRadius: 8,
              background: T.statusSoldBg, border: `1px solid ${T.statusSoldColor}`,
              fontFamily: TF.sans, fontSize: 13, color: T.statusSoldColor, textAlign: "center" as const,
            }}>
              This item has a new home
            </div>
          </div>
        </div>

        {/* BACK ON MARKET */}
        <div style={{ flex: 1, borderRadius: 16, border: `2px solid ${T.statusBackColor}`, overflow: "hidden" }}>
          <div style={{ background: T.statusBackBg, padding: "16px 20px 14px" }}>
            <StatusPill status="back-on-market" />
            <div style={{ fontFamily: TF.serif, fontSize: 16, fontWeight: 500, color: T.bark, marginTop: 10, lineHeight: 1.3 }}>Solid wood dining table</div>
            <div style={{ fontFamily: TF.serif, fontSize: 18, fontWeight: 600, color: T.bark, marginTop: 4 }}>₪ 480</div>
            <div style={{ marginTop: 10 }}>
              <SellerStrip name="Maya" context="Moving to Berlin" />
            </div>
            <div style={{ fontFamily: TF.sans, fontSize: 11, color: T.statusBackColor, marginTop: 8, lineHeight: 1.4 }}>
              The deal fell through — it&apos;s available again.
            </div>
          </div>
          <div style={{ padding: "14px 20px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
            {["Ask a question", "Propose a meetup", "Reserve & Pay"].map((action, i) => (
              <div key={action} style={{
                padding: "9px 14px", borderRadius: 8, textAlign: "center" as const,
                fontFamily: TF.sans, fontSize: 13, fontWeight: 500,
                background: i === 2 ? T.bark : i === 1 ? T.linen : "transparent",
                border: i === 0 ? `1.5px solid ${T.sage}` : i === 1 ? `1px solid ${T.sand}` : "none",
                color: i === 2 ? T.cream : i === 0 ? T.sage : T.bark,
              }}>{action}</div>
            ))}
          </div>
        </div>
      </div>

      {/* State flow diagram */}
      <div style={{ padding: "20px 24px", background: T.linen, borderRadius: 12, border: `1px solid ${T.hairline}` }}>
        <div style={{ fontFamily: TF.sans, fontSize: 12, fontWeight: 600, color: T.driftwood, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 16 }}>State Flow</div>
        <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" as const, rowGap: 12 }}>
          {/* Available */}
          <StatusPill status="available" />
          <span style={{ margin: "0 12px", color: T.driftwood, fontFamily: TF.sans, fontSize: 16 }}>→</span>
          {/* On Hold */}
          <StatusPill status="on-hold" />
          <span style={{ margin: "0 12px", color: T.driftwood, fontFamily: TF.sans, fontSize: 16 }}>→</span>
          {/* Sold */}
          <StatusPill status="sold" />

          <span style={{ margin: "0 32px", color: T.hairlineStrong, fontFamily: TF.sans, fontSize: 14 }}>|</span>

          {/* On Hold again with down arrow */}
          <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 4 }}>
            <StatusPill status="on-hold" />
            <span style={{ color: T.driftwood, fontSize: 14 }}>↓</span>
            <StatusPill status="back-on-market" />
          </div>

          <span style={{ margin: "0 12px", color: T.driftwood, fontFamily: TF.sans, fontSize: 16 }}>→</span>
          <StatusPill status="on-hold" />
          <span style={{ fontFamily: TF.sans, fontSize: 12, color: T.stone, marginLeft: 8 }}>(or Available)</span>
        </div>
      </div>
    </div>
  );
}

function ArtResearchBoard() {
  return (
    <div style={{ width: AW, height: AH, background: "#fff", fontFamily: TF.sans, padding: "52px 64px", position: "relative", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: TF.serif, fontSize: 28, fontWeight: 500, color: T.bark, letterSpacing: "-0.015em", marginBottom: 6 }}>Research</div>
          <div style={{ fontFamily: TF.sans, fontSize: 14, color: T.stone }}>12 interviews · people relocating in and out of cities</div>
        </div>
        <div style={{ fontFamily: TF.sans, fontSize: 11, color: T.stone, letterSpacing: "0.08em" }}>2026 · TEL AVIV, BERLIN, NYC</div>
      </div>

      {/* 3 user type cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        {[
          {
            title: "The Leavers",
            color: "#C46B4A",
            bg: "#FBF0EC",
            desc: "Need to clear everything before their key date. Driven by urgency. Every item still in the apartment a week before they leave is anxiety.",
          },
          {
            title: "The Arrivers",
            color: T.sage,
            bg: "#EDF3EF",
            desc: "Moving in, need to furnish fast, unfamiliar with local options. Trust-sensitive more than price-sensitive. Will pay more to someone whose story they can read.",
          },
          {
            title: "The Betweens",
            color: T.statusBackColor,
            bg: T.statusBackBg,
            desc: "Selling in one city while buying in another simultaneously. Most stressed of all. Managing two timelines at once, need reliable status from both markets.",
          },
        ].map(({ title, color, bg, desc }) => (
          <div key={title} style={{ background: bg, borderRadius: 12, border: `1.5px solid ${color}`, padding: "18px 20px" }}>
            <div style={{ fontFamily: TF.serif, fontSize: 18, fontWeight: 500, color: T.bark, marginBottom: 10 }}>{title}</div>
            <div style={{ fontFamily: TF.sans, fontSize: 13, color: T.driftwood, lineHeight: 1.55 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* 4 insight cards in 2x2 grid + pull quotes */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: 264 }}>
        {/* Left: 2x2 grid of insight cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            "Timing is the crisis — most need to move everything in a 2–4 week window",
            "Trust matters more than price — they pay more to someone they can read",
            "Existing apps fail them — FB Marketplace has no context, Craigslist feels unsafe",
            "The natural match — a leaver's items are an arriver's starting inventory",
          ].map((insight, i) => (
            <div key={i} style={{ background: T.linen, borderRadius: 10, border: `1px solid ${T.hairline}`, padding: "14px 16px", display: "flex", flexDirection: "column" as const, justifyContent: "space-between" }}>
              <div style={{ fontFamily: TF.sans, fontSize: 11, color: T.stone, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8 }}>0{i + 1}</div>
              <div style={{ fontFamily: TF.sans, fontSize: 13, color: T.bark, lineHeight: 1.5 }}>{insight}</div>
            </div>
          ))}
        </div>

        {/* Right: pull quotes + key insight */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
          {[
            { q: "I need my sofa gone before my flight. I'll take ₪200 less if it's someone I trust.", who: "Maya, 31 · Moving to Berlin" },
            { q: "I landed with two suitcases. I needed a whole apartment's worth of stuff in two weeks.", who: "David, 28 · Arriving from NYC" },
            { q: "Facebook Marketplace felt like a dark alley. Nobody tells you why they're selling.", who: "Yael, 35 · Between cities" },
          ].map(({ q, who }) => (
            <div key={who} style={{ background: T.linen, borderRadius: 10, border: `1px solid ${T.hairline}`, padding: "12px 16px" }}>
              <div style={{ fontFamily: TF.serif, fontStyle: "italic", fontSize: 14, color: T.bark, lineHeight: 1.45, marginBottom: 6 }}>"{q}"</div>
              <div style={{ fontFamily: TF.sans, fontSize: 11, color: T.stone }}>— {who}</div>
            </div>
          ))}

          {/* Key insight */}
          <div style={{ background: "#EDF3EF", borderRadius: 10, border: `1.5px solid ${T.sage}`, padding: "12px 16px" }}>
            <div style={{ fontFamily: TF.sans, fontSize: 11, color: T.sage, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 6 }}>KEY INSIGHT</div>
            <div style={{ fontFamily: TF.sans, fontSize: 13, color: "#3A5C43", lineHeight: 1.5 }}>
              The leaver and the arriver need each other. The marketplace already works — it just has no way for them to find each other in time.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArtVisualDirection() {
  return (
    <div style={{ width: AW, height: AH, background: "#fff", fontFamily: TF.sans, padding: "52px 64px", position: "relative", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: TF.serif, fontSize: 28, fontWeight: 500, color: T.bark, letterSpacing: "-0.015em", marginBottom: 6 }}>Visual Direction</div>
        <div style={{ fontFamily: TF.sans, fontSize: 14, color: T.stone }}>Palette · typography · components</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        {/* Left column */}
        <div>
          {/* Color swatches — brand */}
          <div style={{ fontFamily: TF.sans, fontSize: 11, fontWeight: 600, color: T.driftwood, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 12 }}>Brand Palette</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {[
              { hex: T.linen,     name: "Linen",     usage: "Background" },
              { hex: T.bark,      name: "Bark",      usage: "Text · CTA" },
              { hex: T.sage,      name: "Sage",      usage: "Brand" },
              { hex: T.sand,      name: "Sand",      usage: "Secondary" },
              { hex: T.driftwood, name: "Driftwood", usage: "Muted" },
            ].map(({ hex, name, usage }) => (
              <div key={name} style={{ flex: 1 }}>
                <div style={{ height: 52, borderRadius: 8, background: hex, border: hex === T.linen ? `1px solid ${T.hairline}` : "none", marginBottom: 6 }} />
                <div style={{ fontFamily: TF.sans, fontSize: 12, fontWeight: 500, color: T.bark }}>{name}</div>
                <div style={{ fontFamily: TF.sans, fontSize: 10, color: T.stone, marginTop: 1 }}>{hex}</div>
                <div style={{ fontFamily: TF.sans, fontSize: 10, color: T.stone, marginTop: 1 }}>{usage}</div>
              </div>
            ))}
          </div>

          {/* Status colors */}
          <div style={{ fontFamily: TF.sans, fontSize: 11, fontWeight: 600, color: T.driftwood, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 12 }}>Status Colors</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {([
              ["available", "Available"],
              ["on-hold", "On Hold"],
              ["sold", "Sold"],
              ["back-on-market", "Back"],
            ] as [Status, string][]).map(([status, label]) => (
              <div key={status} style={{ flex: 1, padding: "10px 12px", borderRadius: 8, background: STATUS_CONFIG[status].bg, border: `1px solid ${STATUS_CONFIG[status].color}`, textAlign: "center" as const }}>
                <div style={{ fontFamily: TF.sans, fontSize: 11, fontWeight: 600, color: STATUS_CONFIG[status].color }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Typography */}
          <div style={{ fontFamily: TF.sans, fontSize: 11, fontWeight: 600, color: T.driftwood, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 12 }}>Typography</div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontFamily: TF.serif, fontSize: 36, fontWeight: 600, color: T.bark, lineHeight: 1, letterSpacing: "-0.02em" }}>Lora</div>
            <div style={{ fontFamily: TF.serif, fontStyle: "italic", fontSize: 18, color: T.bark, marginTop: 4 }}>Display · Prices · Moments that matter</div>
          </div>
          <div>
            <div style={{ fontFamily: TF.sans, fontSize: 26, fontWeight: 500, color: T.bark, lineHeight: 1 }}>DM Sans</div>
            <div style={{ fontFamily: TF.sans, fontSize: 14, color: T.stone, marginTop: 4 }}>Body · Labels · Everything functional</div>
          </div>
        </div>

        {/* Right column — components */}
        <div>
          <div style={{ fontFamily: TF.sans, fontSize: 11, fontWeight: 600, color: T.driftwood, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 16 }}>Components</div>

          {/* Status pills */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: TF.sans, fontSize: 12, color: T.stone, marginBottom: 8 }}>StatusPill — all 4 states</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
              {(["available", "on-hold", "sold", "back-on-market"] as Status[]).map(s => (
                <StatusPill key={s} status={s} />
              ))}
            </div>
          </div>

          {/* SellerStrip */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: TF.sans, fontSize: 12, color: T.stone, marginBottom: 8 }}>SellerStrip</div>
            <div style={{ background: T.linen, borderRadius: 8, padding: "12px 14px", border: `1px solid ${T.hairline}` }}>
              <SellerStrip name="Maya" context="Moving to Berlin · listing ends Mar 15" />
            </div>
          </div>

          {/* Listing card example */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: TF.sans, fontSize: 12, color: T.stone, marginBottom: 8 }}>ListingCard — two states</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${T.hairline}`, overflow: "hidden" }}>
                <div style={{ height: 60, background: `linear-gradient(135deg, ${T.sage}, #557560)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <FurnitureIcon color="#fff" size={28} />
                  <div style={{ position: "absolute", top: 6, left: 6 }}><StatusPill status="available" small /></div>
                </div>
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontFamily: TF.sans, fontSize: 12, fontWeight: 500, color: T.bark }}>Dining table</div>
                  <div style={{ fontFamily: TF.serif, fontSize: 14, fontWeight: 600, color: T.bark }}>₪ 480</div>
                </div>
              </div>
              <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${T.hairline}`, overflow: "hidden", opacity: 0.55 }}>
                <div style={{ height: 60, background: "linear-gradient(135deg, #B8AFA5, #9A9088)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <MugIcon color="#fff" size={26} />
                  <div style={{ position: "absolute", top: 6, left: 6 }}><StatusPill status="sold" small /></div>
                </div>
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontFamily: TF.sans, fontSize: 12, fontWeight: 500, color: T.bark }}>French press</div>
                  <div style={{ fontFamily: TF.serif, fontSize: 14, fontWeight: 600, color: T.bark }}>₪ 90</div>
                </div>
              </div>
            </div>
          </div>

          {/* Button styles */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: TF.sans, fontSize: 12, color: T.stone, marginBottom: 8 }}>Buttons</div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, padding: "10px 0", borderRadius: 8, background: T.bark, color: T.cream, fontFamily: TF.sans, fontSize: 13, fontWeight: 500, textAlign: "center" as const }}>Primary</div>
              <div style={{ flex: 1, padding: "10px 0", borderRadius: 8, background: T.linen, border: `1px solid ${T.sand}`, color: T.bark, fontFamily: TF.sans, fontSize: 13, fontWeight: 500, textAlign: "center" as const }}>Secondary</div>
              <div style={{ flex: 1, padding: "10px 0", borderRadius: 8, background: "transparent", border: `1.5px solid ${T.sage}`, color: T.sage, fontFamily: TF.sans, fontSize: 13, fontWeight: 500, textAlign: "center" as const }}>Outline</div>
            </div>
          </div>

          {/* Chat bubbles */}
          <div>
            <div style={{ fontFamily: TF.sans, fontSize: 12, color: T.stone, marginBottom: 8 }}>Chat bubbles</div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
              <div style={{ alignSelf: "flex-start" as const, padding: "8px 14px", borderRadius: "14px 14px 14px 4px", background: "#EDF3EF", fontFamily: TF.sans, fontSize: 13, color: T.bark }}>Is it still available?</div>
              <div style={{ alignSelf: "flex-end" as const, padding: "8px 14px", borderRadius: "14px 14px 4px 14px", background: T.bark, color: T.cream, fontFamily: TF.sans, fontSize: 13 }}>Yes! Moving Mar 15.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Registry ─────────────────────────────────────────────────────────────────
const screens = [
  { id: "screen-home",        label: "Browse",          sub: "Listing feed · 4 status states visible",      component: ScreenHome,         type: "phone" },
  { id: "screen-listing",     label: "Listing",         sub: "Item detail · seller context · 3 actions",    component: ScreenListing,      type: "phone" },
  { id: "screen-chat",        label: "Ask",             sub: "Per-listing chat with quick replies",          component: ScreenChat,         type: "phone" },
  { id: "screen-reserve",     label: "Reserve",         sub: "Deposit + escrow payment flow",                component: ScreenReserve,      type: "phone" },
  { id: "screen-meet",        label: "Meet",            sub: "Meetup proposal · 3 time slots",              component: ScreenMeet,         type: "phone" },
  { id: "status-system",      label: "Status System",   sub: "4 states · Available → On Hold → Sold",       component: ArtStatusSystem,    type: "wide"  },
  { id: "research-board",     label: "Research Board",  sub: "12 interviews · 3 user types · key insights", component: ArtResearchBoard,   type: "wide"  },
  { id: "visual-direction",   label: "Visual Direction",sub: "Palette · type · components",                 component: ArtVisualDirection, type: "wide"  },
] as const;

type SType = "phone" | "wide";
const DIMS: Record<SType, { w: number; h: number }> = {
  phone: { w: PW, h: PH },
  wide:  { w: AW, h: AH },
};

// ─── Viewer ───────────────────────────────────────────────────────────────────
export default function WireframeViewer() {
  useFonts();
  const [current, setCurrent] = useState(0);
  const s = screens[current];
  const Screen = s.component;
  const { w, h } = DIMS[s.type as SType];
  const isPhone = s.type === "phone";
  const scale = 0.72;

  return (
    <div style={{
      minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column" as const,
      alignItems: "center", padding: "32px 24px 40px", fontFamily: TF.sans, boxSizing: "border-box" as const,
    }}>
      {/* Header bar */}
      <div style={{ width: "100%", maxWidth: 1320, display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: TF.sans, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: T.sage, marginBottom: 4, textTransform: "uppercase" as const }}>CHAPTER · WIREFRAMES</div>
          <div style={{ fontFamily: TF.serif, fontStyle: "italic", fontSize: 24, color: T.bark, letterSpacing: "-0.01em" }}>{s.label}</div>
          <div style={{ fontFamily: TF.sans, fontSize: 13, color: T.driftwood, marginTop: 3 }}>{s.sub}</div>
        </div>
        <div style={{ fontFamily: TF.sans, fontSize: 12, color: T.driftwood, paddingTop: 4 }}>
          {String(current + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
        </div>
      </div>

      {/* Scale wrapper (display only — data-screen goes on the inner exact-size div) */}
      <div style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        flexShrink: 0,
        marginBottom: `${(h * scale - h) + 24}px`,
      }}>
        <div
          data-screen={s.id}
          style={{
            width: w,
            height: h,
            borderRadius: isPhone ? 56 : 4,
            overflow: "hidden",
            boxShadow: isPhone
              ? "0 0 0 12px #1A140E, 0 0 0 14px #261A10, 0 32px 80px rgba(0,0,0,0.70)"
              : "0 0 0 1px #C8BFB2, 0 32px 80px rgba(0,0,0,0.30)",
          }}
        >
          <Screen />
        </div>
      </div>

      {/* Dot nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8 }}>
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          style={{
            width: 40, height: 40, borderRadius: "50%",
            border: `1px solid ${T.hairlineStrong}`,
            background: current === 0 ? "transparent" : T.linen,
            color: current === 0 ? T.hairlineStrong : T.bark,
            cursor: current === 0 ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
            <path d="M5 1L1 6l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div style={{ display: "flex", gap: 7 }}>
          {screens.map((sc, i) => (
            <button
              key={sc.id}
              onClick={() => setCurrent(i)}
              title={sc.label}
              style={{
                width: i === current ? 22 : 7,
                height: 7,
                borderRadius: 4,
                background: i === current ? T.sage : T.hairlineStrong,
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s",
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrent(c => Math.min(screens.length - 1, c + 1))}
          disabled={current === screens.length - 1}
          style={{
            width: 40, height: 40, borderRadius: "50%",
            border: `1px solid ${T.hairlineStrong}`,
            background: current === screens.length - 1 ? "transparent" : T.linen,
            color: current === screens.length - 1 ? T.hairlineStrong : T.bark,
            cursor: current === screens.length - 1 ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
            <path d="M1 1l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div style={{
        display: "flex", gap: 8, marginTop: 20, overflowX: "auto" as const,
        paddingBottom: 4, width: "100%", maxWidth: 1320, justifyContent: "center",
      }}>
        {screens.map((sc, i) => (
          <button
            key={sc.id}
            onClick={() => setCurrent(i)}
            style={{
              flexShrink: 0, padding: "8px 14px", borderRadius: 8,
              border: i === current ? `1.5px solid ${T.sage}` : `1px solid ${T.hairlineStrong}`,
              background: i === current ? "rgba(107,138,115,0.08)" : T.bg,
              color: i === current ? T.sage : T.driftwood,
              cursor: "pointer", textAlign: "left" as const,
            }}
          >
            <div style={{ fontFamily: TF.sans, fontSize: 9.5, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 2, textTransform: "uppercase" as const }}>
              {sc.label}
            </div>
            <div style={{ fontFamily: TF.sans, fontSize: 10, opacity: 0.6 }}>
              {sc.type === "phone" ? "portrait" : "16:9"}
            </div>
          </button>
        ))}
      </div>

      <p style={{ fontFamily: TF.sans, fontSize: 10, color: T.driftwood, marginTop: 20, textAlign: "center" as const, letterSpacing: "0.08em" }}>
        CHAPTER · WIREFRAMES · localhost:3000/wireframes/chapter
      </p>
    </div>
  );
}

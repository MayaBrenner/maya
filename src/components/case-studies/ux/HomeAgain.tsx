"use client";

/* Home Again — annotated specimens.
   Ported 1:1 from home-again-ux/specimens.jsx. */

import React from "react";
import {
  Z,
  SStage,
  SKicker,
  STitle,
  SAnnote,
  SLeaders,
  SFooter,
  sCardEdge,
} from "./shared";

const S = Z;

type StatusKind = "available" | "on-hold" | "sold" | "back-on-market";

function HAStatusPill({ kind, size = "sm" }: { kind: StatusKind; size?: "sm" | "lg" }) {
  const meta: Record<StatusKind, { label: string; bg: string; fg: string; dot: string }> = {
    available:        { label: "Available",       bg: "#E8EAB6", fg: "#3D4500", dot: "#D3D742" },
    "on-hold":        { label: "On hold · 48h",   bg: "#FFE3C4", fg: "#7A3D00", dot: "#FF962C" },
    sold:             { label: "Sold",            bg: "#F0EEE8", fg: "#000000", dot: "#000000" },
    "back-on-market": { label: "Back on market",  bg: "#DCE3F7", fg: "#1F356E", dot: "#8FA6EC" },
  };
  const m = meta[kind];
  const fs = size === "lg" ? 12.5 : 11;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: m.bg,
        color: m.fg,
        fontFamily: S.appBody,
        fontSize: fs,
        fontWeight: 700,
        padding: "4px 10px",
        borderRadius: 999,
        whiteSpace: "nowrap",
        letterSpacing: 0.1,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: m.dot }} />
      {m.label}
    </span>
  );
}

/* The listing card with a seller strip across the bottom */
function ListingSellerCard() {
  return (
    <div
      style={{
        width: 300,
        background: S.paper,
        borderRadius: 16,
        overflow: "hidden",
        border: "0.5px solid rgba(0,0,0,0.10)",
        boxShadow: "0 16px 38px rgba(26,23,20,0.13)",
        fontFamily: S.appBody,
      }}
    >
      <div style={{ position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/case-studies/ux-specimens/listing-sofa.png"
          alt=""
          style={{ width: "100%", height: 142, objectFit: "cover", background: S.appCream, display: "block" }}
        />
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <HAStatusPill kind="available" />
        </div>
      </div>
      <div style={{ padding: "13px 15px 6px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontFamily: S.appHead, fontSize: 16.5, fontWeight: 500, color: "#000", letterSpacing: "-0.01em" }}>
            Linen 3-seater sofa
          </span>
          <span style={{ fontFamily: S.appHead, fontSize: 17, color: "#000" }}>₪1,450</span>
        </div>
        <div style={{ fontSize: 12, color: "#908A7E", marginTop: 3 }}>210 × 92 × 78 cm · Very good</div>
      </div>
      <div style={{ height: 1, background: "#EEEAE0", margin: "8px 15px 0" }} />
      {/* SELLER STRIP */}
      <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 15px 15px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/case-studies/ux-specimens/lynne-avatar.png"
          alt=""
          style={{ width: 40, height: 40, borderRadius: 999, objectFit: "cover", background: "#8FA6EC", flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: S.appBody, fontSize: 13.5, fontWeight: 600, color: "#000" }}>Lynne Itelson</div>
          <div style={{ fontFamily: S.appBody, fontSize: 12, color: "#6B6863", marginTop: 1 }}>
            Tel Aviv → Berlin · Mar 28
          </div>
        </div>
        <span style={{ color: "#C1BDB3", fontSize: 19 }}>›</span>
      </div>
    </div>
  );
}

/* ════════════════ SPECIMEN 1 — seller strip ════════════════ */
export function HASellerStrip() {
  return (
    <SStage w={760} h={600}>
      <div style={{ position: "absolute", left: 28, top: 26 }}>
        <SKicker accent={S.cobalt}>Decision · 01</SKicker>
        <STitle style={{ marginTop: 11, maxWidth: 210 }}>The seller strip.</STitle>
      </div>

      <div style={{ position: "absolute", left: 252, top: 150 }}>
        <ListingSellerCard />
      </div>

      <SLeaders
        w={760}
        h={600}
        lines={[
          { d: "M 232 408 L 264 408", ax: 264, ay: 408 },
          { d: "M 560 402 L 470 408", ax: 470, ay: 408 },
          { d: "M 402 470 L 402 442", ax: 402, ay: 442 },
        ]}
      />

      <SAnnote
        x={20}
        y={356}
        w={208}
        side="left"
        accent={S.red}
        label="Real name + face"
        body="I tested anonymous-until-meet. Every mover wanted identity before committing — not after."
      />
      <SAnnote
        x={560}
        y={352}
        w={186}
        side="right"
        accent={S.red}
        label="Where + by when"
        body="A dated, one-way move. The urgency is real: she flies to Berlin in three weeks."
      />
      <div style={{ position: "absolute", left: 300, top: 482, width: 210, textAlign: "center" }}>
        <span style={{ fontFamily: S.serif, fontSize: 16, color: S.inkSoft, lineHeight: 1.25 }}>
          Sorted by move-out date, soonest first — the strip <em>is</em> the ranking signal.
        </span>
      </div>

      <SFooter>Real listing card · annotated</SFooter>
    </SStage>
  );
}

/* ════════════════ SPECIMEN 2 — status object ════════════════ */
function StatusRow({
  kind,
  title,
  sub,
  hero,
}: {
  kind: StatusKind;
  title: string;
  sub: string;
  hero?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 13px",
        background: S.paper,
        borderRadius: 12,
        border: `1px solid ${hero ? "#8FA6EC" : "#EEEAE0"}`,
        boxShadow: hero ? "0 0 0 3px rgba(143,166,236,0.18)" : "none",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/case-studies/ux-specimens/listing-sofa.png"
        alt=""
        style={{ width: 42, height: 42, borderRadius: 9, objectFit: "cover", flexShrink: 0, background: S.appCream }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: S.appBody,
            fontSize: 13.5,
            fontWeight: 600,
            color: "#000",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>
        <div style={{ fontFamily: S.appBody, fontSize: 11.5, color: "#908A7E", marginTop: 2 }}>{sub}</div>
      </div>
      <HAStatusPill kind={kind} />
    </div>
  );
}

export function HAStatus() {
  return (
    <SStage w={760} h={600}>
      <div style={{ position: "absolute", left: 28, top: 26 }}>
        <SKicker accent={S.orange}>Decision · 03</SKicker>
        <STitle style={{ marginTop: 11 }}>
          Status as a<br />first-class object.
        </STitle>
      </div>

      <div
        style={{
          position: "absolute",
          left: 232,
          top: 116,
          width: 326,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <StatusRow kind="available" title="Linen 3-seater sofa" sub="Florentin · posted 3d ago" />
        <StatusRow kind="on-hold" title="Vespa Primavera 50" sub="Neve Tzedek · 2 on waitlist" />
        <StatusRow kind="back-on-market" title="Cannondale road bike" sub="Re-listed · reservation expired" hero />
        <StatusRow kind="sold" title="Oak dining table" sub="Found a new home up the block" />
      </div>

      <svg width="760" height="600" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <g stroke={S.ink} strokeWidth="1" fill="none">
          <path d="M 216 120 L 210 120 L 210 388 L 216 388" opacity="0.5" />
          <path d="M 210 254 L 196 254" strokeDasharray="2 4" />
        </g>
        <g stroke={S.ink} strokeWidth="1" strokeDasharray="2 4" fill="none">
          <path d="M 586 219 L 548 219" />
          <path d="M 586 291 L 548 291" />
        </g>
        <circle cx="548" cy="291" r="3.2" fill={S.red} className="ux-dot" />
        <circle cx="548" cy="219" r="3.2" fill={S.red} className="ux-dot" />
      </svg>

      <div style={{ position: "absolute", left: 18, top: 210, width: 176, textAlign: "right" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span
            style={{
              fontFamily: S.mono,
              fontSize: 9.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: S.red,
              borderBottom: `1.5px solid ${S.red}`,
              paddingBottom: 3,
            }}
          >
            Silence → a status
          </span>
        </div>
        <div style={{ fontFamily: S.serif, fontSize: 16.5, lineHeight: 1.24, color: S.ink, marginTop: 9 }}>
          Every chat has a visible state: asked, reserved, scheduled, done. No more mystery ghosting.
        </div>
      </div>

      <SAnnote
        x={588}
        y={150}
        w={166}
        side="right"
        accent={S.orange}
        label="On hold · 48h"
        body="A public 48-hour countdown — buyers always know where they stand."
      />
      <SAnnote
        x={588}
        y={286}
        w={166}
        side="right"
        accent={S.cobalt}
        label="Back on market"
        body="Most apps hide a deal that fell through. Surfacing it makes ‘Available’ believable."
      />

      <SFooter>Four states · one feed</SFooter>
    </SStage>
  );
}

/* ════════════════ SPECIMEN 3 — mutual handoff ════════════════ */
function HandoffPhone({
  role,
  confirmed,
  accent,
}: {
  role: string;
  confirmed: boolean;
  accent: string;
}) {
  return (
    <div
      style={{
        width: 156,
        background: S.paper,
        borderRadius: 20,
        overflow: "hidden",
        border: "0.5px solid rgba(0,0,0,0.12)",
        boxShadow: "0 14px 34px rgba(26,23,20,0.14)",
        fontFamily: S.appBody,
      }}
    >
      <div
        style={{
          padding: "11px 13px",
          borderBottom: "1px solid #F0EEE8",
          display: "flex",
          alignItems: "center",
          gap: 7,
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: 999, background: accent }} />
        <span style={{ fontFamily: S.appBody, fontSize: 11.5, fontWeight: 700, color: "#000", letterSpacing: 0.2 }}>
          {role}
        </span>
      </div>
      <div style={{ padding: "13px" }}>
        <div style={{ fontFamily: S.appHead, fontSize: 14, color: "#000" }}>Linen sofa</div>
        <div style={{ fontFamily: S.appBody, fontSize: 11, color: "#908A7E", marginTop: 2 }}>
          Handoff at Florentin
        </div>
        <div
          style={{
            marginTop: 12,
            padding: "11px",
            borderRadius: 11,
            textAlign: "center",
            background: confirmed ? "#E8EAB6" : "#000",
            color: confirmed ? "#3D4500" : "#fff",
            fontFamily: S.appBody,
            fontSize: 12.5,
            fontWeight: 700,
            transition: "all 300ms",
          }}
        >
          {confirmed ? "✓ Confirmed" : "Tap to confirm"}
        </div>
      </div>
    </div>
  );
}

export function HAHandoff() {
  return (
    <SStage w={760} h={560}>
      {(on) => (
        <>
          <div style={{ position: "absolute", left: 28, top: 26 }}>
            <SKicker accent={S.green}>Decision · 04</SKicker>
            <STitle style={{ marginTop: 11, maxWidth: 200 }}>Mutual handoff.</STitle>
          </div>

          <div style={{ position: "absolute", left: 250, top: 150 }}>
            <HandoffPhone role="BUYER" confirmed={on} accent={S.orange} />
          </div>
          <div style={{ position: "absolute", left: 430, top: 150 }}>
            <HandoffPhone role="SELLER" confirmed={on} accent={S.cobalt} />
          </div>

          <div
            style={{
              position: "absolute",
              left: 250,
              top: 392,
              width: 336,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                ...sCardEdge,
                background: on ? S.green : S.paper,
                color: on ? "#fff" : S.inkSoft,
                padding: "9px 16px",
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                fontFamily: S.mono,
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: "0.06em",
                transition: "all 320ms",
                boxShadow: on ? `4px 4px 0 ${S.green}` : `4px 4px 0 ${S.outline}`,
              }}
            >
              <span style={{ fontSize: 13 }}>{on ? "🔓" : "🔒"}</span>
              {on ? "PAYMENT RELEASED → SELLER · ₪1,450" : "ESCROW HELD · ₪1,450"}
            </span>
          </div>

          <SLeaders
            w={760}
            h={560}
            lines={[
              { d: "M 232 286 L 262 286", ax: 262, ay: 286 },
              { d: "M 614 286 L 580 286", ax: 580, ay: 286 },
            ]}
          />

          <SAnnote
            x={20}
            y={236}
            w={208}
            side="left"
            accent={S.red}
            label="Both, in person"
            body="Payment releases only when both people tap Done — together, at the swap."
          />
          <SAnnote
            x={616}
            y={236}
            w={132}
            side="right"
            accent={S.red}
            label="No ghosting"
            body="Neither side can vanish after the fact. Safer than cash-on-Facebook."
          />

          <SFooter>Hover · both confirm → escrow release</SFooter>
        </>
      )}
    </SStage>
  );
}

"use client";

/* I DO — annotated specimens.
   Ported 1:1 from home-again-ux/ido.jsx. */

import React from "react";
import { Z, SStage, SKicker, STitle, SAnnote, SLeaders, SFooter, sCardEdge } from "./shared";

const ID = {
  bg: "#FAF8F4",
  surface: "#FFFFFF",
  surfaceAlt: "#F4F1EB",
  ink: "#1B1A1E",
  ink70: "#4C4A52",
  muted: "#8C8992",
  faint: "#B6B2BA",
  border: "#ECE8E1",
  borderStrong: "#DFDAD1",
  gold: "#A9802F",
  goldText: "#8A6A28",
  goldSoft: "#F0E6CF",
  goldLine: "#E4D3A8",
  dark: "#15141A",
  darkPanel: "#1E1C24",
  darkLine: "#322F3A",
  cream: "#F3EEE4",
  flowers: { bg: "#F9E7ED", ink: "#BA5E7C", dot: "#D2789A" },
  venue: { bg: "#E7F0E9", ink: "#557F61", dot: "#6F9C7B" },
  catering: { bg: "#FBEEDC", ink: "#B07F3C", dot: "#D29A4B" },
  photo: { bg: "#E6EEF7", ink: "#4671A8", dot: "#5E8AC4" },
  serif: "'EB Garamond', Georgia, serif",
  sans: "'Hanken Grotesk', system-ui, sans-serif",
};

const iEyebrow = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: ID.sans,
  fontSize: 9.5,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: 600,
  color: ID.muted,
  ...extra,
});

/* ════════════════ SPECIMEN 1 — One workspace ════════════════ */
function StatTile({
  label,
  big,
  sub,
  pct,
  color,
}: {
  label: string;
  big: string;
  sub: string;
  pct: number;
  color: string;
}) {
  return (
    <div
      style={{
        background: ID.surface,
        border: `1px solid ${ID.border}`,
        borderRadius: 12,
        padding: "11px 13px",
      }}
    >
      <div style={iEyebrow()}>{label}</div>
      <div style={{ fontFamily: ID.serif, fontSize: 25, color: ID.ink, lineHeight: 1, marginTop: 5 }}>
        {big}
      </div>
      <div style={{ fontFamily: ID.sans, fontSize: 10.5, color: ID.muted, marginTop: 3 }}>{sub}</div>
      <div
        style={{
          height: 4,
          borderRadius: 999,
          background: ID.surfaceAlt,
          marginTop: 8,
          overflow: "hidden",
        }}
      >
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 999 }} />
      </div>
    </div>
  );
}

function MiniDashboard() {
  return (
    <div
      style={{
        width: 344,
        ...sCardEdge,
        border: `1.5px solid ${ID.ink}`,
        boxShadow: `5px 5px 0 ${ID.ink}`,
        borderRadius: 18,
        overflow: "hidden",
        fontFamily: ID.sans,
      }}
    >
      <div style={{ background: ID.dark, padding: "18px 20px 16px", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            right: -34,
            top: -34,
            width: 120,
            height: 120,
            borderRadius: 999,
            border: `1px solid ${ID.darkLine}`,
          }}
        />
        <div style={iEyebrow({ color: ID.gold })}>Maya &amp; Daniel · the countdown</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 11, marginTop: 9, position: "relative" }}>
          <span
            style={{
              fontFamily: ID.serif,
              fontStyle: "italic",
              fontSize: 56,
              lineHeight: 0.8,
              color: ID.cream,
            }}
          >
            127
          </span>
          <div>
            <div style={{ fontFamily: ID.serif, fontSize: 20, color: ID.cream, lineHeight: 1 }}>days</div>
            <div style={iEyebrow({ color: "rgba(243,238,228,0.55)", marginTop: 4 })}>until “I do”</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          {([
            ["Date", "Sep 12 2026"],
            ["Venue", "Olive Grove"],
            ["Guests", "350 invited"],
          ] as Array<[string, string]>).map(([k, v]) => (
            <div key={k}>
              <div style={iEyebrow({ color: "rgba(243,238,228,0.42)", fontSize: 8.5 })}>{k}</div>
              <div
                style={{ fontFamily: ID.sans, fontSize: 11.5, color: ID.cream, fontWeight: 500, marginTop: 3 }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          padding: 13,
          background: ID.bg,
        }}
      >
        <StatTile label="Budget used" big="62%" sub="₪148k of ₪240k" pct={62} color={ID.gold} />
        <StatTile label="RSVPs in" big="9" sub="7 awaiting" pct={56} color={ID.flowers.dot} />
        <StatTile label="Vendors booked" big="4/6" sub="2 in review" pct={66} color={ID.photo.dot} />
        <StatTile label="Tasks this week" big="4" sub="1 due today" pct={25} color={ID.venue.dot} />
      </div>
    </div>
  );
}

export function IDOWorkspace() {
  const tools = ["WhatsApp", "Google Sheets", "PDFs", "Email", "Notes app", "Seating site", "Budget.xls"];
  return (
    <SStage w={760} h={640} bg={ID.bg}>
      <div style={{ position: "absolute", left: 28, top: 26 }}>
        <SKicker accent={ID.gold}>Decision · 01</SKicker>
        <STitle style={{ marginTop: 11, maxWidth: 210 }}>One workspace, not seven tabs.</STitle>
      </div>

      <div style={{ position: "absolute", left: 232, top: 110 }}>
        <MiniDashboard />
      </div>

      <SLeaders
        w={760}
        h={640}
        dotColor={ID.gold}
        lines={[
          { d: "M 222 250 L 256 250", ax: 256, ay: 250 },
          { d: "M 578 430 L 540 430", ax: 540, ay: 430 },
        ]}
      />

      <div style={{ position: "absolute", left: 18, top: 196, width: 200, textAlign: "right" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span
            style={{
              fontFamily: Z.mono,
              fontSize: 9.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: Z.red,
              borderBottom: `1.5px solid ${Z.red}`,
              paddingBottom: 3,
            }}
          >
            Seven tools, zero handoffs
          </span>
        </div>
        <div style={{ fontFamily: Z.serif, fontSize: 16.5, lineHeight: 1.24, color: Z.ink, marginTop: 9 }}>
          Couples juggle a pile of apps that never talk. The whole bet is one surface where they finally do.
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            justifyContent: "flex-end",
            marginTop: 11,
          }}
        >
          {tools.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: ID.sans,
                fontSize: 10,
                fontWeight: 600,
                color: ID.faint,
                border: `1px solid ${ID.border}`,
                borderRadius: 999,
                padding: "3px 8px",
                textDecoration: "line-through",
                textDecorationColor: Z.outlineSoft,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <SAnnote
        x={578}
        y={388}
        w={168}
        side="right"
        accent={ID.gold}
        label="‘Are we okay?’ in one look"
        body="Budget, RSVPs, vendors, this week — the home screen answers the only question that matters at a glance."
      />

      <SFooter>Real dashboard · annotated</SFooter>
    </SStage>
  );
}

/* ════════════════ SPECIMEN 2 — The seating chart that warns ════════════════ */
function SeatAvatar({
  initials,
  color,
  conflict,
}: {
  initials: string;
  color: string;
  conflict?: boolean;
}) {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: ID.sans,
        fontSize: 11,
        fontWeight: 700,
        flexShrink: 0,
        boxShadow: conflict
          ? `0 0 0 2px ${ID.surface}, 0 0 0 4px ${ID.flowers.dot}`
          : `0 0 0 2px ${ID.surface}`,
      }}
    >
      {initials}
    </div>
  );
}

function SeatTable({ on }: { on: boolean }) {
  const seats: Array<{ i: string; c: string; name?: string; dropped?: boolean }> = [
    { i: "SL", c: ID.venue.dot, name: "Sam" },
    { i: "NF", c: ID.venue.dot },
    { i: "RC", c: ID.venue.dot },
    { i: "ML", c: ID.photo.dot, name: "Maria", dropped: true },
    { i: "DC", c: ID.venue.dot },
    { i: "EC", c: ID.venue.dot },
  ];
  const R = 86, cx = 110, cy = 110;
  return (
    <div style={{ position: "relative", width: 220, height: 220 }}>
      <div
        style={{
          position: "absolute",
          left: cx - 56,
          top: cy - 56,
          width: 112,
          height: 112,
          borderRadius: "50%",
          background: on ? ID.flowers.bg : ID.surface,
          border: `1.5px solid ${on ? ID.flowers.dot : ID.borderStrong}`,
          boxShadow: on ? "0 0 0 5px rgba(210,120,154,0.18)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          transition: "all 280ms",
        }}
      >
        <span style={{ fontFamily: ID.serif, fontSize: 17, color: ID.ink }}>Table 4</span>
        {on && (
          <span
            style={{
              fontFamily: ID.sans,
              fontSize: 8.5,
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: ID.flowers.ink,
              marginTop: 2,
            }}
          >
            ⚠ CONFLICT
          </span>
        )}
      </div>
      {seats.map((s, i) => {
        const a = ((-90 + i * 60) * Math.PI) / 180;
        const x = cx + R * Math.cos(a) - 15,
          y = cy + R * Math.sin(a) - 15;
        const isConf = !!on && (s.name === "Sam" || s.name === "Maria");
        if (s.dropped && !on) return null;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, transition: "all 280ms" }}>
            <SeatAvatar initials={s.i} color={s.c} conflict={isConf} />
          </div>
        );
      })}
    </div>
  );
}

export function IDOSeating() {
  return (
    <SStage w={760} h={600} bg={ID.surface}>
      {(on) => (
        <>
          <div style={{ position: "absolute", left: 28, top: 26 }}>
            <SKicker accent={ID.flowers.dot}>Decision · 02</SKicker>
            <STitle style={{ marginTop: 11, maxWidth: 220 }}>
              The seating chart that warns you.
            </STitle>
            <div
              style={{
                fontFamily: Z.mono,
                fontSize: 10.5,
                color: Z.faint,
                letterSpacing: "0.04em",
                marginTop: 14,
                textTransform: "none",
              }}
            >
              Hover to drop Maria in
            </div>
          </div>

          <div style={{ position: "absolute", left: 300, top: 150 }}>
            <SeatTable on={on} />
          </div>

          {!on ? (
            <div
              style={{
                position: "absolute",
                left: 360,
                top: 392,
                display: "flex",
                alignItems: "center",
                gap: 9,
                background: ID.surface,
                border: `1.5px solid ${ID.borderStrong}`,
                borderRadius: 999,
                padding: "7px 13px 7px 7px",
                boxShadow: "0 8px 20px rgba(27,26,30,0.12)",
              }}
            >
              <SeatAvatar initials="ML" color={ID.photo.dot} />
              <span style={{ fontFamily: ID.sans, fontSize: 12.5, fontWeight: 600, color: ID.ink }}>
                Maria Lopez
              </span>
              <span style={{ fontFamily: ID.sans, fontSize: 11, color: ID.muted }}>
                · drag to a table
              </span>
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                left: 318,
                top: 388,
                width: 246,
                background: ID.surface,
                border: `1.5px solid ${ID.flowers.dot}`,
                borderRadius: 14,
                padding: "12px 14px",
                boxShadow: "0 12px 28px rgba(186,94,124,0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13 }}>⚠️</span>
                <span
                  style={{
                    fontFamily: ID.sans,
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: ID.flowers.ink,
                  }}
                >
                  Heads up — you flagged this pair
                </span>
              </div>
              <div
                style={{
                  fontFamily: ID.sans,
                  fontSize: 12,
                  color: ID.ink70,
                  marginTop: 6,
                  lineHeight: 1.4,
                }}
              >
                <b style={{ color: ID.ink }}>Sam &amp; Maria</b> shouldn’t share a table (history).
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <span
                  style={{
                    fontFamily: ID.sans,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                    background: ID.ink,
                    borderRadius: 999,
                    padding: "5px 11px",
                  }}
                >
                  Move elsewhere
                </span>
                <span
                  style={{
                    fontFamily: ID.sans,
                    fontSize: 11,
                    fontWeight: 700,
                    color: ID.ink70,
                    border: `1px solid ${ID.borderStrong}`,
                    borderRadius: 999,
                    padding: "5px 11px",
                  }}
                >
                  Seat anyway
                </span>
              </div>
            </div>
          )}

          <SLeaders
            w={760}
            h={600}
            dotColor={ID.flowers.dot}
            lines={[
              { d: "M 232 250 L 304 230", ax: 304, ay: 230 },
              { d: "M 576 430 L 540 430", ax: 540, ay: 430 },
            ]}
          />

          <SAnnote
            x={20}
            y={196}
            w={206}
            side="left"
            accent={Z.red}
            label="Caught on drop, not after"
            body="Seating is political. The app flags the landmine the moment you place the guest — before the invites go out."
          />
          <SAnnote
            x={576}
            y={250}
            w={170}
            side="right"
            accent={ID.flowers.ink}
            label="A warning, not a wall"
            body="You can still ‘Seat anyway’ — it’s your wedding. We surface the risk; you stay in charge."
          />

          <SFooter>Real seating builder · annotated</SFooter>
        </>
      )}
    </SStage>
  );
}

/* ════════════════ SPECIMEN 3 — An invitation, not a dashboard ════════════════ */
export function IDOType() {
  return (
    <SStage w={760} h={560} bg={ID.bg}>
      <div style={{ position: "absolute", left: 28, top: 26 }}>
        <SKicker accent={ID.gold}>Decision · 03</SKicker>
        <STitle style={{ marginTop: 11, maxWidth: 220 }}>
          An invitation,<br />not a dashboard.
        </STitle>
      </div>

      <div
        style={{
          position: "absolute",
          left: 252,
          top: 120,
          width: 332,
          ...sCardEdge,
          border: `1.5px solid ${ID.ink}`,
          boxShadow: `5px 5px 0 ${ID.ink}`,
          padding: "22px 24px 24px",
        }}
      >
        <div style={{ position: "relative", opacity: 0.6 }}>
          <span
            style={{
              fontFamily: Z.mono,
              fontSize: 9.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: ID.muted,
            }}
          >
            Productivity SaaS
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 9 }}>
            <span style={{ width: 22, height: 22, borderRadius: 6, background: "#2A6FDB" }} />
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: "#2B2B2B",
                letterSpacing: "-0.02em",
              }}
            >
              WeddingFlow
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 12,
              color: "#7A7A7A",
              marginTop: 6,
            }}
          >
            Projects · Tasks · Sprints · Analytics
          </div>
          <span
            className="ux-stamp"
            style={{
              position: "absolute",
              top: -2,
              right: 0,
              fontFamily: Z.mono,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: Z.red,
              border: `1.5px solid ${Z.red}`,
              borderRadius: 4,
              padding: "3px 6px",
              transform: "rotate(-7deg)",
              background: ID.bg,
            }}
          >
            NOPE
          </span>
        </div>

        <div style={{ height: 1, background: ID.border, margin: "22px 0" }} />

        <div>
          <span
            style={{
              fontFamily: Z.mono,
              fontSize: 9.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: ID.goldText,
            }}
          >
            I DO · shipped
          </span>
          <div style={{ textAlign: "center", padding: "6px 0 2px" }}>
            <div style={iEyebrow({ color: ID.gold, letterSpacing: "0.22em" })}>together with joy</div>
            <div
              style={{
                fontFamily: ID.serif,
                fontStyle: "italic",
                fontSize: 34,
                color: ID.ink,
                lineHeight: 1.05,
                marginTop: 6,
              }}
            >
              Maya <span style={{ color: ID.gold }}>&amp;</span> Daniel
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
                marginTop: 8,
              }}
            >
              <span style={{ width: 22, height: 1, background: ID.goldLine }} />
              <span style={iEyebrow({ color: ID.muted })}>Sep 12 2026</span>
              <span style={{ width: 22, height: 1, background: ID.goldLine }} />
            </div>
          </div>
        </div>
      </div>

      <SLeaders
        w={760}
        h={560}
        dotColor={ID.gold}
        lines={[
          { d: "M 234 196 L 268 196", ax: 268, ay: 196 },
          { d: "M 598 330 L 566 330", ax: 566, ay: 330 },
        ]}
      />

      <SAnnote
        x={20}
        y={170}
        w={208}
        side="left"
        accent={Z.red}
        label="A sprint board kills the joy"
        body="A wedding is an emotional event, not a project to ship. The SaaS look is the exact stress we’re removing."
      />
      <SAnnote
        x={598}
        y={290}
        w={150}
        side="right"
        accent={ID.gold}
        label="A printed invitation"
        body="EB Garamond + champagne feels hand-set and warm. Hanken keeps the UI crisp underneath."
      />

      <SFooter>Same header · two feelings</SFooter>
    </SStage>
  );
}

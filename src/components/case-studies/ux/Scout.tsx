"use client";

/* Scout (My Buddy) — annotated specimens.
   Ported 1:1 from home-again-ux/mybuddy.jsx. */

import React from "react";
import { Z, SStage, SKicker, STitle, SAnnote, SLeaders, SFooter, sCardEdge } from "./shared";

const MB = {
  bg: "#FBF3EF",
  surface: "#FFFFFF",
  inkD: "#2A1322",
  ink: "#3A1D2E",
  muted: "#8B8088",
  border: "#DDD5DC",
  soft: "#F4EAEA",
  primary: "#FF5C7A",
  primaryD: "#E04565",
  primarySoft: "#FFE0E7",
  accent: "#FFB778",
  accentSoft: "#FFE3CE",
  coral: "#FF5C7A",
  sky: "#C49BEC",
  headline: "#3A1D2E",
  sel: "#FF5C7A",
  selSoft: "#FFE0E7",
  head: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, system-ui, sans-serif",
  body: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, system-ui, sans-serif",
  mono: "'Geist Mono', ui-monospace, monospace",
};

/* ════════════════ SPECIMEN 1 — Privacy by design ════════════════ */
function BeaconComposer() {
  const Chip = ({ children, sans }: { children: React.ReactNode; sans?: boolean }) => (
    <span
      style={{
        color: MB.primaryD,
        borderBottom: `2px solid ${MB.primary}`,
        paddingBottom: 1,
        fontWeight: sans ? 600 : 500,
        fontFamily: sans ? MB.body : "inherit",
        fontSize: sans ? 18 : "inherit",
      }}
    >
      {children}
    </span>
  );
  return (
    <div
      style={{
        width: 322,
        background: MB.surface,
        borderRadius: 22,
        overflow: "hidden",
        border: `1px solid ${MB.border}`,
        boxShadow: "0 16px 38px rgba(22,38,29,0.13)",
        fontFamily: MB.body,
      }}
    >
      <div style={{ padding: "16px 18px 4px" }}>
        <span
          style={{
            fontFamily: MB.mono,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: MB.primary,
          }}
        >
          New beacon
        </span>
        <div
          style={{
            fontFamily: MB.head,
            fontWeight: 500,
            fontSize: 21,
            lineHeight: 1.28,
            color: MB.inkD,
            marginTop: 11,
            letterSpacing: "-0.01em",
          }}
        >
          I’m heading to <Chip>Guitar Playground</Chip> at <Chip sans>4 PM</Chip>.
        </div>
      </div>

      <div style={{ height: 1, background: MB.border, margin: "16px 18px 0" }} />

      <div style={{ padding: "14px 18px 4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <svg width="13" height="13" viewBox="0 0 22 22" fill="none">
            <circle cx="8" cy="9" r="3" stroke={MB.muted} strokeWidth="1.7" />
            <circle cx="15" cy="8" r="2.4" stroke={MB.muted} strokeWidth="1.7" />
            <path
              d="M3 18c.5-2.6 2.6-4.2 5-4.2s4.5 1.6 5 4.2M14 14c2.5 0 4.5 1.4 5 3.6"
              stroke={MB.muted}
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 600, color: MB.muted, letterSpacing: "0.01em" }}>
            Who can see this
          </span>
        </div>
        <div style={{ display: "flex", gap: 7, marginTop: 10 }}>
          {([
            ["My circle", true],
            ["Close friends", false],
            ["Just Noa", false],
          ] as Array<[string, boolean]>).map(([t, on]) => (
            <span
              key={t}
              style={{
                padding: "7px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                background: on ? MB.selSoft : MB.surface,
                color: on ? MB.headline : MB.ink,
                border: `1px solid ${on ? MB.sel : MB.border}`,
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {on && <span style={{ color: MB.headline }}>✓</span>}
              {t}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "14px 18px 0", color: MB.muted }}>
        <span style={{ fontSize: 13, color: MB.primary }}>◷</span>
        <span style={{ fontFamily: MB.body, fontSize: 11.5, fontWeight: 500 }}>
          Expires at 6 PM · auto-clears
        </span>
      </div>

      <div style={{ padding: "14px 18px 18px" }}>
        <div
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 14,
            background: MB.primary,
            color: "#fff",
            textAlign: "center",
            fontFamily: MB.body,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.01em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <span>◎</span> Drop beacon
        </div>
      </div>
    </div>
  );
}

export function ScoutPrivacy() {
  return (
    <SStage w={760} h={620} bg={MB.bg}>
      <div style={{ position: "absolute", left: 28, top: 26 }}>
        <SKicker accent={MB.primary}>Decision · 01</SKicker>
        <STitle style={{ marginTop: 11, maxWidth: 200 }}>Privacy by design.</STitle>
      </div>

      <div style={{ position: "absolute", left: 240, top: 96 }}>
        <BeaconComposer />
      </div>

      <SLeaders
        w={760}
        h={620}
        dotColor={MB.coral}
        lines={[
          { d: "M 224 178 L 262 178", ax: 262, ay: 178 },
          { d: "M 562 330 L 524 330", ax: 524, ay: 330 },
          { d: "M 400 470 L 400 432", ax: 400, ay: 432 },
        ]}
      />

      <SAnnote
        x={20}
        y={120}
        w={206}
        side="left"
        accent={MB.coral}
        label="Intent, not GPS"
        body="A sentence about where you’ll be — never a live location dot. You share a plan, not your position."
      />
      <SAnnote
        x={560}
        y={284}
        w={186}
        side="right"
        accent={MB.coral}
        label="Audience is first-class"
        body="Who can see this lives in the compose flow — never buried in a settings page."
      />
      <div style={{ position: "absolute", left: 296, top: 474, width: 210, textAlign: "center" }}>
        <span style={{ fontFamily: Z.serif, fontSize: 16, color: Z.inkSoft, lineHeight: 1.25 }}>
          Every beacon <em>auto-expires</em> — no permanent map of where your kid plays.
        </span>
      </div>

      <SFooter>Real beacon composer · annotated</SFooter>
    </SStage>
  );
}

/* ════════════════ SPECIMEN 2 — Why a serif, not a sans ════════════════ */
export function ScoutType() {
  const line = "The park is better with a friend.";
  return (
    <SStage w={760} h={560} bg={MB.surface}>
      <div style={{ position: "absolute", left: 28, top: 26 }}>
        <SKicker accent={MB.primary}>Decision · 02</SKicker>
        <STitle style={{ marginTop: 11, maxWidth: 230 }}>
          Italic does<br />the heavy lifting.
        </STitle>
      </div>

      <div
        style={{
          position: "absolute",
          left: 252,
          top: 120,
          width: 330,
          ...sCardEdge,
          padding: "24px 24px 26px",
        }}
      >
        <div style={{ position: "relative", opacity: 0.62 }}>
          <span
            style={{
              fontFamily: MB.mono,
              fontSize: 9.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: MB.muted,
            }}
          >
            All-bold sans
          </span>
          <div
            style={{
              fontFamily: MB.head,
              fontWeight: 700,
              fontSize: 22,
              lineHeight: 1.18,
              color: "#3A3A3A",
              marginTop: 8,
              letterSpacing: "-0.02em",
            }}
          >
            {line}
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
              background: MB.surface,
            }}
          >
            NOPE
          </span>
        </div>

        <div style={{ height: 1, background: MB.border, margin: "22px 0" }} />

        <div>
          <span
            style={{
              fontFamily: MB.mono,
              fontSize: 9.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: MB.primary,
            }}
          >
            SF Pro · weighted + italic · shipped
          </span>
          <div
            style={{
              fontFamily: MB.head,
              fontWeight: 600,
              fontSize: 24,
              lineHeight: 1.16,
              color: MB.inkD,
              marginTop: 8,
              letterSpacing: "-0.01em",
            }}
          >
            The park is better{" "}
            <span style={{ fontStyle: "italic", color: MB.primary, fontWeight: 700 }}>
              with a friend.
            </span>
          </div>
        </div>
      </div>

      <SLeaders
        w={760}
        h={560}
        dotColor={MB.coral}
        lines={[
          { d: "M 234 196 L 268 196", ax: 268, ay: 196 },
          { d: "M 596 330 L 566 330", ax: 566, ay: 330 },
        ]}
      />

      <SAnnote
        x={20}
        y={170}
        w={208}
        side="left"
        accent={Z.red}
        label="Reads like a dashboard"
        body="Full-bold sans flattens emphasis. Every word shouts equally — productivity register, wrong feeling."
      />
      <SAnnote
        x={596}
        y={290}
        w={150}
        side="right"
        accent={MB.primary}
        label="Italic carries the meaning"
        body="The same SF Pro family — but italic + colour on 'with a friend' makes the sentence whisper the point."
      />

      <SFooter>Same line · two voices</SFooter>
    </SStage>
  );
}

/* ════════════════ SPECIMEN 3 — Why the button looks like this ════════════════ */
export function ScoutButton() {
  return (
    <SStage w={760} h={560} bg={MB.bg}>
      {(on) => (
        <>
          <div style={{ position: "absolute", left: 28, top: 26 }}>
            <SKicker accent={MB.primary}>Decision · 03</SKicker>
            <STitle style={{ marginTop: 11, maxWidth: 220 }}>
              Why the button<br />looks like this.
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
              Hover to press
            </div>
          </div>

          <div style={{ position: "absolute", left: 224, top: 200, width: 276 }}>
            <div
              style={{
                width: "100%",
                height: 58,
                borderRadius: 16,
                background: MB.primary,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
                fontFamily: MB.body,
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.01em",
                boxShadow: on
                  ? "0 2px 8px rgba(57,159,115,0.3)"
                  : "0 8px 20px rgba(57,159,115,0.32)",
                transform: on ? "translateY(2px)" : "none",
                transition: "all 180ms",
              }}
            >
              <span style={{ fontSize: 17 }}>◎</span>
              <span style={{ whiteSpace: "nowrap" }}>Drop a beacon</span>
            </div>
            <div
              style={{
                width: "100%",
                height: 50,
                borderRadius: 14,
                marginTop: 12,
                background: MB.surface,
                color: MB.primaryD,
                border: `1.5px solid ${MB.primary}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontFamily: MB.body,
                fontSize: 14.5,
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              👋 Wave &amp; join
            </div>
          </div>

          <svg width="760" height="560" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <g stroke={Z.ink} strokeWidth="1" fill="none" opacity="0.45">
              <path d="M 510 200 L 522 200 M 510 258 L 522 258 M 516 200 L 516 258" />
            </g>
          </svg>
          <div
            style={{
              position: "absolute",
              left: 524,
              top: 222,
              fontFamily: Z.mono,
              fontSize: 10,
              fontWeight: 600,
              color: Z.inkSoft,
            }}
          >
            58px
          </div>

          <SLeaders
            w={760}
            h={560}
            dotColor={MB.coral}
            lines={[
              { d: "M 216 229 L 224 229", ax: 224, ay: 229 },
              { d: "M 560 229 L 500 229", ax: 500, ay: 229 },
              { d: "M 560 295 L 500 295", ax: 500, ay: 295 },
            ]}
          />

          <SAnnote
            x={20}
            y={194}
            w={196}
            side="left"
            accent={MB.primary}
            label="Thumb-sized · full-width"
            body="One-handed while you’re holding a toddler. A 58px target you can hit without looking."
          />
          <SAnnote
            x={562}
            y={192}
            w={194}
            side="right"
            accent={Z.red}
            label="Green = go"
            body="The only green action on the screen — the next step needs no thought."
          />
          <SAnnote
            x={562}
            y={318}
            w={194}
            side="right"
            accent={MB.coral}
            label="A verb, not ‘Add friend’"
            body={
              <>
                ‘Wave &amp; join’ posts a beacon, not a friend request. Lower stakes to show up.
              </>
            }
          />

          <SFooter>Primary CTA · anatomy</SFooter>
        </>
      )}
    </SStage>
  );
}

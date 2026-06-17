"use client";

/* CarDB - annotated specimens.
   Ported 1:1 from home-again-ux/cardb.jsx. */

import React from "react";
import { Z, SStage, SKicker, STitle, SAnnote, SLeaders, SFooter, sCardEdge } from "./shared";

const CD = {
  cream: "#FBF8F1",
  paper: "#FFFFFF",
  ink: "#0E0D0C",
  stone: "#6E6A60",
  pink: "#F7C8DC",
  pinkSoft: "#FCE4EE",
  blue: "#B7DCF8",
  blueSoft: "#DCEEFB",
  green: "#C7EFB7",
  greenSoft: "#E5F7DD",
  butter: "#FFE3A8",
  butterSoft: "#FFF0D9",
  disp: "'Cabinet Grotesk', 'Archivo', sans-serif",
  body: "'DM Sans', system-ui, sans-serif",
  ital: "'Gambarino', Georgia, serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

const cdEyebrow = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: CD.body,
  fontSize: 10.5,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  fontWeight: 700,
  color: CD.stone,
  ...extra,
});

/* ════════════════ SPECIMEN 1 - Plain language ════════════════ */
function SpecsCard() {
  const rows: Array<[string, string]> = [
    ["Cabin space", "5 adults, comfortable"],
    ["Trunk", "2 car-seats + groceries"],
    ["Parking", "Self-parks · 4.2m+ ok"],
    ["Fuel use", "~52 mpg combined"],
  ];
  return (
    <div style={{ width: 320, fontFamily: CD.body }}>
      <div
        style={{
          border: `1.5px dashed ${Z.outlineSoft}`,
          borderRadius: 14,
          padding: "13px 16px",
          background: "#FBFAF7",
        }}
      >
        <div style={cdEyebrow({ color: CD.stone, marginBottom: 8 })}>What every other site shows</div>
        <div
          style={{
            fontFamily: CD.mono,
            fontSize: 12.5,
            color: "#9A958A",
            lineHeight: 1.6,
            letterSpacing: "0.01em",
          }}
        >
          147&nbsp;hp · 7-speed&nbsp;DSG · 1.5L&nbsp;turbo · 1,320&nbsp;kg · 5.2&nbsp;L/100km
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: "11px 0 12px" }}>
        <span style={{ height: 1, flex: 1, background: Z.outlineFaint }} />
        <span style={{ fontFamily: CD.ital, fontStyle: "italic", fontSize: 14, color: CD.ink }}>
          CarDB translates
        </span>
        <span style={{ color: CD.ink, fontSize: 15 }}>↓</span>
        <span style={{ height: 1, flex: 1, background: Z.outlineFaint }} />
      </div>

      <div
        style={{
          ...sCardEdge,
          border: `1.5px solid ${CD.ink}`,
          boxShadow: `4px 4px 0 ${CD.ink}`,
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: CD.ink,
            color: CD.cream,
            padding: "9px 16px",
            ...cdEyebrow({ color: CD.cream }),
          }}
        >
          Specs · translated
        </div>
        {rows.map(([k, v], i) => (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "11px 16px",
              borderBottom: i < rows.length - 1 ? "1px dashed #E0DBCD" : "none",
              fontSize: 13.5,
            }}
          >
            <span style={{ color: CD.stone }}>{k}</span>
            <span style={{ fontWeight: 700, color: CD.ink }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CDSpecs() {
  return (
    <SStage w={760} h={620} bg={CD.cream}>
      <div style={{ position: "absolute", left: 28, top: 26 }}>
        <SKicker accent={CD.green}>Decision · 01</SKicker>
        <STitle style={{ marginTop: 11, maxWidth: 210 }}>
          Plain language, not spec sheets.
        </STitle>
      </div>

      <div style={{ position: "absolute", left: 244, top: 96 }}>
        <SpecsCard />
      </div>

      <SLeaders
        w={760}
        h={620}
        dotColor={CD.ink}
        lines={[
          { d: "M 226 184 L 256 152", ax: 256, ay: 152 },
          { d: "M 576 380 L 540 380", ax: 540, ay: 380 },
        ]}
      />

      <SAnnote
        x={20}
        y={178}
        w={206}
        side="left"
        accent={CD.ink}
        label="‘200hp’ means nothing"
        body="First-time buyers don’t speak horsepower. The pain point was access, not data."
      />
      <SAnnote
        x={574}
        y={338}
        w={172}
        side="right"
        accent={CD.ink}
        label="Re-written, not hidden"
        body="Each spec becomes what it means for your everyday. The raw numbers stay one tap away."
      />

      <SFooter>Real ‘specs · translated’ panel</SFooter>
    </SStage>
  );
}

/* ════════════════ SPECIMEN 2 - Honest reasons ════════════════ */
function MatchCard() {
  const reasons: Array<[string, boolean]> = [
    ["Big trunk for groceries + a stroller", true],
    ["Higher seat height - easier for parents", true],
    ["Slightly thirstier in the city", false],
  ];
  return (
    <div
      style={{
        width: 286,
        ...sCardEdge,
        border: `1.5px solid ${CD.ink}`,
        boxShadow: `5px 5px 0 ${CD.ink}`,
        borderRadius: 22,
        overflow: "hidden",
        fontFamily: CD.body,
      }}
    >
      <div
        style={{
          aspectRatio: "16/10",
          background: CD.blueSoft,
          borderBottom: `1.5px solid ${CD.ink}`,
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/case-studies/ux-specimens/crossover.avif"
          alt=""
          style={{ width: "94%", height: "94%", objectFit: "contain", objectPosition: "center bottom" }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: CD.ink,
            color: CD.cream,
            fontFamily: CD.disp,
            fontWeight: 900,
            fontSize: 19,
            padding: "5px 10px",
            borderRadius: 9,
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "baseline",
            gap: 2,
          }}
        >
          88<span style={{ fontSize: 10, fontWeight: 700 }}>%</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: CD.green,
            border: `1px solid ${CD.ink}`,
            borderRadius: 999,
            padding: "4px 9px",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          2nd pick
        </div>
      </div>
      <div style={{ padding: "15px 18px" }}>
        <div
          style={{
            fontFamily: CD.disp,
            fontWeight: 900,
            fontSize: 19,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: CD.ink,
          }}
        >
          The roomy crossover
        </div>
        <div style={{ fontSize: 12.5, color: CD.stone, marginTop: 4 }}>
          Mid-size · 5-door · 2023 · Hybrid
        </div>
        <ul
          style={{
            margin: "11px 0 0",
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 7,
          }}
        >
          {reasons.map(([r, good], j) => (
            <li
              key={j}
              style={{
                fontSize: 12.5,
                lineHeight: 1.4,
                display: "flex",
                gap: 7,
                alignItems: "flex-start",
                color: good ? CD.ink : "#9A6B2E",
                paddingLeft: 0,
              }}
            >
              <span style={{ fontSize: 10, marginTop: 2 }}>{good ? "✦" : "⚠"}</span>
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          borderTop: `1px solid ${CD.ink}`,
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontFamily: CD.disp, fontWeight: 900, fontSize: 17, color: CD.ink }}>
          $31,900
        </span>
        <span
          style={{
            background: CD.pink,
            border: `1px solid ${CD.ink}`,
            borderRadius: 999,
            padding: "4px 11px",
            fontSize: 11.5,
            fontWeight: 700,
          }}
        >
          View ›
        </span>
      </div>
    </div>
  );
}

export function CDReasons() {
  return (
    <SStage w={760} h={620} bg={CD.paper}>
      <div style={{ position: "absolute", left: 28, top: 26 }}>
        <SKicker accent={CD.pink}>Decision · 02</SKicker>
        <STitle style={{ marginTop: 11, maxWidth: 220 }}>
          Honest reasons,<br />not a lonely score.
        </STitle>
      </div>

      <div style={{ position: "absolute", left: 262, top: 120 }}>
        <MatchCard />
      </div>

      <SLeaders
        w={760}
        h={620}
        dotColor={CD.ink}
        lines={[
          { d: "M 252 192 L 280 174", ax: 280, ay: 174 },
          { d: "M 560 432 L 470 432", ax: 470, ay: 432 },
        ]}
      />

      <SAnnote
        x={20}
        y={184}
        w={222}
        side="left"
        accent={CD.ink}
        label="A score is a black box"
        body="‘88%’ anchors the glance - but a number alone convinces no one. The plain reasons below it do the work."
      />
      <SAnnote
        x={560}
        y={392}
        w={186}
        side="right"
        accent={CD.ink}
        label="It names its flaw"
        body="Every match lists what’s wrong with it, not just what’s right. Admitting the downside is what makes the pick trustworthy."
      />

      <SFooter>Real match card · annotated</SFooter>
    </SStage>
  );
}

/* ════════════════ SPECIMEN 3 - Human in the loop ════════════════ */
function AdvisorPanel() {
  return (
    <div style={{ width: 330, fontFamily: CD.body, display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          ...sCardEdge,
          border: `1.5px solid ${CD.ink}`,
          boxShadow: `5px 5px 0 ${CD.ink}`,
          borderRadius: 20,
          padding: "18px 18px",
          display: "flex",
          gap: 15,
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: `1.5px solid ${CD.ink}`,
            background: "radial-gradient(circle at 35% 30%,#FFD9C2 0%,#E89C77 60%,#A26747 100%)",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: CD.disp,
              fontWeight: 900,
              fontSize: 21,
              letterSpacing: "-0.01em",
              color: CD.ink,
            }}
          >
            Noa Berger
          </div>
          <div style={{ fontSize: 11.5, color: CD.stone, margin: "2px 0 9px" }}>
            Independent advisor · 11 yrs
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["VETTED", "NO DEALER PAY", "★ 4.9"].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  background: CD.green,
                  border: `1px solid ${CD.ink}`,
                  borderRadius: 999,
                  padding: "3px 8px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          background: CD.ink,
          color: CD.cream,
          borderRadius: 16,
          padding: "15px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontFamily: CD.disp, fontWeight: 900, fontSize: 15.5, lineHeight: 1.15 }}>
          Send shortlist to Noa
          <div style={{ fontFamily: CD.body, fontSize: 11, fontWeight: 500, color: "#bdb6a6", marginTop: 3 }}>
            3 cars · reviewed in &lt; 24h
          </div>
        </div>
        <div
          style={{
            background: CD.green,
            color: CD.ink,
            borderRadius: "50%",
            width: 38,
            height: 38,
            display: "grid",
            placeItems: "center",
            fontSize: 17,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          →
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {(
          [
            ["AI", CD.blue],
            ["Human", CD.green],
            ["Dealer", CD.butter],
          ] as Array<[string, string]>
        ).map(([t, c], i) => (
          <React.Fragment key={t}>
            <span
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 10.5,
                fontWeight: 700,
                padding: "7px 4px",
                borderRadius: 8,
                background: c,
                border: `1px solid ${CD.ink}`,
                color: CD.ink,
                fontFamily: CD.body,
                letterSpacing: "0.02em",
              }}
            >
              {t}
            </span>
            {i < 2 && <span style={{ color: CD.ink, fontSize: 13 }}>›</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function CDExpert() {
  return (
    <SStage w={760} h={600} bg={CD.cream}>
      <div style={{ position: "absolute", left: 28, top: 26 }}>
        <SKicker accent={CD.green}>Decision · 03</SKicker>
        <STitle style={{ marginTop: 11, maxWidth: 210 }}>
          A human confirms<br />before you buy.
        </STitle>
      </div>

      <div style={{ position: "absolute", left: 238, top: 120 }}>
        <AdvisorPanel />
      </div>

      <SLeaders
        w={760}
        h={600}
        dotColor={CD.ink}
        lines={[
          { d: "M 230 196 L 262 196", ax: 262, ay: 196 },
          { d: "M 582 300 L 552 300", ax: 552, ay: 300 },
          { d: "M 400 470 L 400 430", ax: 400, ay: 430 },
        ]}
      />

      <SAnnote
        x={20}
        y={162}
        w={206}
        side="left"
        accent={CD.ink}
        label="‘No dealer pay’ is load-bearing"
        body="The advisor’s incentive is you, not the sale. That single line is what makes the human worth trusting."
      />
      <SAnnote
        x={582}
        y={258}
        w={164}
        side="right"
        accent={CD.ink}
        label="Before, not after"
        body="The review sits in front of the dealership - while it can still change the outcome."
      />
      <div style={{ position: "absolute", left: 286, top: 476, width: 230, textAlign: "center" }}>
        <span style={{ fontFamily: Z.serif, fontSize: 16, color: Z.inkSoft, lineHeight: 1.25 }}>
          AI narrows 240 → 3. Nobody bets <em>$27k</em> on a robot’s word alone.
        </span>
      </div>

      <SFooter>Real expert-handoff · annotated</SFooter>
    </SStage>
  );
}

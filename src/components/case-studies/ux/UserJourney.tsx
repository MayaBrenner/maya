"use client";

/* UserJourney — narrates one persona walking through a product end-to-end.
   Vertical zine timeline: persona card up top, then a sequence of moments,
   each with WHEN · MOOD · WHAT THEY SAW · WHAT THEY THOUGHT · WHAT THEY DID.

   Reusable across case studies via a config prop. */

import React from "react";
import { Z, sCardEdge } from "./shared";

interface MoodToken {
  label: string;
  color: string;
}

export interface JourneyStep {
  phase: string;      // "01 · Discover"
  when: string;       // "Tuesday · 9:42 PM"
  screen: string;     // "Browse feed"  — short label for the right vignette
  vignette?: React.ReactNode; // optional small visual; falls back to a screen label card
  thought: React.ReactNode;   // italic pull-quote, the inner voice
  did: React.ReactNode;       // what they actually tapped / did
  /** One-line UX-decision footnote linking the moment to the call that made it work. */
  designNote?: React.ReactNode;
  mood: MoodToken;
}

export interface UserJourneyConfig {
  bg?: string;
  accent: string;
  persona: {
    name: string;
    meta: string;     // "Tomer, 29 · The Arrival"
    color: string;    // avatar bg
    initials?: string;
    avatar?: string;
    situation: React.ReactNode; // italic frame: "Three workdays to furnish an empty flat."
  };
  steps: JourneyStep[];
  closing?: React.ReactNode; // optional final caption ("After: the apartment was furnished in one Saturday.")
}

const mono = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: Z.mono,
  fontSize: 10.5,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontWeight: 500,
  color: Z.mute,
  ...extra,
});

function PersonaHeader({ persona, accent }: { persona: UserJourneyConfig["persona"]; accent: string }) {
  return (
    <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          background: persona.color,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: Z.body,
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "0.02em",
          border: `1.5px solid ${Z.outline}`,
          boxShadow: `4px 4px 0 ${Z.outline}`,
        }}
      >
        {persona.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={persona.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          persona.initials
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={mono({ color: accent, fontSize: 10 })}>The walkthrough · meet</span>
        <div
          style={{
            fontFamily: Z.serif,
            fontStyle: "italic",
            fontSize: 32,
            fontWeight: 500,
            color: Z.ink,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            marginTop: 6,
          }}
        >
          {persona.name}
        </div>
        <div style={mono({ color: Z.inkSoft, fontSize: 10, marginTop: 6 })}>{persona.meta}</div>
        <div
          style={{
            fontFamily: Z.serif,
            fontStyle: "italic",
            fontSize: 17,
            color: Z.inkSoft,
            lineHeight: 1.35,
            marginTop: 12,
            maxWidth: 540,
          }}
        >
          {persona.situation}
        </div>
      </div>
    </div>
  );
}

function StepRow({
  step,
  accent,
  last,
}: {
  step: JourneyStep;
  accent: string;
  last: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "172px 1fr 200px",
        gap: 22,
        padding: "26px 0",
        borderBottom: last ? "none" : `1px solid ${Z.outlineFaint}`,
        position: "relative",
      }}
    >
      {/* LEFT RAIL — phase + when + mood */}
      <div style={{ position: "relative", paddingLeft: 20 }}>
        {/* anchor dot */}
        <span
          className="ux-dot"
          style={{
            position: "absolute",
            left: 0,
            top: 6,
            width: 9,
            height: 9,
            borderRadius: 999,
            background: accent,
          }}
        />
        {/* vertical rule below the dot to the next step */}
        {!last && (
          <span
            style={{
              position: "absolute",
              left: 4,
              top: 22,
              bottom: -26,
              width: 1,
              borderLeft: `1px dashed ${Z.outlineSoft}`,
            }}
          />
        )}
        <span style={mono({ color: Z.inkSoft, fontSize: 10.5 })}>{step.phase}</span>
        <div
          style={{
            fontFamily: Z.serif,
            fontStyle: "italic",
            fontSize: 18,
            fontWeight: 500,
            color: Z.ink,
            lineHeight: 1.1,
            marginTop: 8,
            letterSpacing: "-0.01em",
          }}
        >
          {step.when}
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 12,
            padding: "3px 9px 3px 7px",
            borderRadius: 999,
            background: Z.paper,
            border: `1px solid ${Z.outlineFaint}`,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: step.mood.color,
              flexShrink: 0,
            }}
          />
          <span style={mono({ color: Z.inkSoft, fontSize: 9.5 })}>{step.mood.label}</span>
        </div>
      </div>

      {/* MIDDLE — thought + action */}
      <div>
        <div
          style={{
            fontFamily: Z.serif,
            fontStyle: "italic",
            fontSize: 22,
            fontWeight: 500,
            color: Z.ink,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            paddingLeft: 14,
            borderLeft: `2px solid ${accent}`,
          }}
        >
          {step.thought}
        </div>
        <div
          style={{
            fontFamily: Z.body,
            fontSize: 14,
            color: Z.inkSoft,
            lineHeight: 1.55,
            marginTop: 12,
          }}
        >
          {step.did}
        </div>
        {step.designNote && (
          <div
            style={{
              marginTop: 14,
              paddingTop: 11,
              borderTop: `1px dashed ${Z.outlineFaint}`,
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                ...mono({ color: accent, fontSize: 9.5, letterSpacing: "0.14em" }),
                borderBottom: `1.5px solid ${accent}`,
                paddingBottom: 2,
                whiteSpace: "nowrap",
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              Design call
            </span>
            <span
              style={{
                fontFamily: Z.serif,
                fontStyle: "italic",
                fontSize: 15,
                color: Z.inkSoft,
                lineHeight: 1.35,
                letterSpacing: "-0.005em",
              }}
            >
              {step.designNote}
            </span>
          </div>
        )}
      </div>

      {/* RIGHT — screen vignette */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            ...sCardEdge,
            width: 184,
            background: Z.paper,
            padding: "14px 14px 16px",
          }}
        >
          <div style={mono({ color: Z.mute, fontSize: 9, letterSpacing: "0.14em" })}>
            What they saw
          </div>
          <div
            style={{
              fontFamily: Z.serif,
              fontStyle: "italic",
              fontSize: 17,
              fontWeight: 500,
              color: Z.ink,
              lineHeight: 1.15,
              marginTop: 8,
              letterSpacing: "-0.01em",
            }}
          >
            {step.screen}
          </div>
          {step.vignette && (
            <div style={{ marginTop: 10 }}>{step.vignette}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UserJourney({ cfg }: { cfg: UserJourneyConfig }) {
  return (
    <div
      className="not-prose"
      style={{
        background: cfg.bg || "#F9F8F6",
        border: `1px solid ${Z.outlineFaint}`,
        borderRadius: 10,
        padding: "32px 34px 28px",
        margin: "2.5rem 0",
      }}
    >
      <PersonaHeader persona={cfg.persona} accent={cfg.accent} />

      <div style={{ height: 1, background: Z.outlineFaint, margin: "26px 0 6px" }} />

      <div>
        {cfg.steps.map((step, i) => (
          <StepRow key={i} step={step} accent={cfg.accent} last={i === cfg.steps.length - 1} />
        ))}
      </div>

      {cfg.closing && (
        <>
          <div style={{ height: 1, background: Z.outlineFaint, margin: "8px 0 22px" }} />
          <div
            style={{
              fontFamily: Z.serif,
              fontStyle: "italic",
              fontSize: 20,
              fontWeight: 500,
              color: Z.ink,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              maxWidth: 720,
            }}
          >
            {cfg.closing}
          </div>
        </>
      )}
    </div>
  );
}

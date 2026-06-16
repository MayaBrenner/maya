"use client";

import React from "react";
import { Z, SStage, sCardEdge, sMono } from "./shared";

interface Persona {
  name: string;
  meta: string;
  color: string;
  avatar?: string;
  initials?: string;
  line: string;
  quote?: string;
}

interface FontEntry {
  role: string;
  name: string;
  family: string;
  weight?: number;
  sampleWeight?: number;
  italic?: boolean;
  tracking?: string;
  sample: string;
}

export interface ContextConfig {
  bg: string;
  accent: string;
  h?: number;
  idea: React.ReactNode;
  support: string;
  personas: Persona[];
  fonts: FontEntry[];
  typeNote: string;
}

const cxMono = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: Z.mono,
  fontSize: 10.5,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontWeight: 500,
  color: Z.mute,
  ...extra,
});

function CxKicker({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <span style={{ width: 7, height: 7, borderRadius: 999, background: accent }} />
      <span style={cxMono({ color: Z.inkSoft })}>{children}</span>
    </div>
  );
}

function PersonaCard({ p, accent }: { p: Persona; accent: string }) {
  return (
    <div style={{ ...sCardEdge, padding: "15px 16px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            background: p.color,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: Z.body,
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.02em",
          }}
        >
          {p.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            p.initials
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: Z.serif,
              fontSize: 20,
              fontWeight: 600,
              color: Z.ink,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            {p.name}
          </div>
          <div style={cxMono({ color: accent, fontSize: 9.5, marginTop: 4 })}>{p.meta}</div>
        </div>
      </div>
      <div
        style={{
          fontFamily: Z.body,
          fontSize: 13,
          color: Z.inkSoft,
          lineHeight: 1.5,
          marginTop: 11,
        }}
      >
        {p.line}
      </div>
      {p.quote && (
        <div
          style={{
            fontFamily: Z.serif,
            fontStyle: "italic",
            fontSize: 15.5,
            color: Z.ink,
            lineHeight: 1.25,
            marginTop: 11,
            paddingLeft: 11,
            borderLeft: `2px solid ${accent}`,
          }}
        >
          {p.quote}
        </div>
      )}
    </div>
  );
}

function TypeRow({ f, last }: { f: FontEntry; last: boolean }) {
  return (
    <div
      style={{
        padding: "12px 0",
        borderBottom: last ? "none" : `1px solid ${Z.outlineFaint}`,
      }}
    >
      <span style={cxMono({ color: Z.mute, fontSize: 9 })}>{f.role}</span>
      <div
        style={{
          fontFamily: f.family,
          fontStyle: f.italic ? "italic" : "normal",
          fontWeight: f.weight || 500,
          fontSize: 20,
          color: Z.ink,
          lineHeight: 1.1,
          letterSpacing: f.tracking || "-0.01em",
          marginTop: 4,
          whiteSpace: "nowrap",
        }}
      >
        {f.name}
      </div>
      <div
        style={{
          fontFamily: f.family,
          fontStyle: f.italic ? "italic" : "normal",
          fontWeight: f.sampleWeight || 400,
          fontSize: 13.5,
          color: Z.inkSoft,
          marginTop: 4,
          lineHeight: 1.25,
        }}
      >
        {f.sample}
      </div>
    </div>
  );
}

export default function ContextBoard({ cfg }: { cfg: ContextConfig }) {
  return (
    <SStage w={760} h={cfg.h || 720} bg={cfg.bg} grid={false}>
      <div style={{ padding: "30px 34px" }}>
        {/* The idea */}
        <div>
          <CxKicker accent={cfg.accent}>The idea</CxKicker>
          <div
            style={{
              fontFamily: Z.serif,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 27,
              lineHeight: 1.16,
              letterSpacing: "-0.01em",
              color: Z.ink,
              marginTop: 13,
              maxWidth: 660,
            }}
          >
            {cfg.idea}
          </div>
          <div
            style={{
              fontFamily: Z.body,
              fontSize: 13.5,
              color: Z.inkSoft,
              lineHeight: 1.5,
              marginTop: 12,
              maxWidth: 600,
            }}
          >
            {cfg.support}
          </div>
        </div>

        <div style={{ height: 1, background: Z.outlineFaint, margin: "22px 0 20px" }} />

        {/* Who it's for + Type system */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
          <div>
            <span style={cxMono({ color: Z.inkSoft })}>Who it’s for</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 13 }}>
              {cfg.personas.map((p, i) => (
                <PersonaCard key={i} p={p} accent={cfg.accent} />
              ))}
            </div>
          </div>
          <div>
            <span style={cxMono({ color: Z.inkSoft })}>The type system</span>
            <div style={{ ...sCardEdge, padding: "4px 18px 14px", marginTop: 13 }}>
              {cfg.fonts.map((f, i) => (
                <TypeRow key={i} f={f} last={i === cfg.fonts.length - 1} />
              ))}
            </div>
            <div
              style={{
                fontFamily: Z.serif,
                fontStyle: "italic",
                fontSize: 14.5,
                color: Z.inkSoft,
                lineHeight: 1.3,
                marginTop: 12,
              }}
            >
              {cfg.typeNote}
            </div>
          </div>
        </div>
      </div>
    </SStage>
  );
}

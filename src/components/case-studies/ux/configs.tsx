/* Per-case-study Context-board configs.
   Ported 1:1 from home-again-ux/context.jsx. */

import React from "react";
import { ContextConfig } from "./ContextBoard";

const F = {
  gambarino: "'Gambarino', Georgia, serif",
  dmsans: "'DM Sans', system-ui, sans-serif",
  jbmono: "'JetBrains Mono', monospace",
  mackinac: "'P22 Mackinac', Georgia, serif",
  montserrat: "'Montserrat', system-ui, sans-serif",
  geistmono: "'Geist Mono', monospace",
  cabinet: "'Cabinet Grotesk', 'Archivo', sans-serif",
  ebgaramond: "'EB Garamond', Georgia, serif",
  hanken: "'Hanken Grotesk', system-ui, sans-serif",
};

export const HA_CFG: ContextConfig = {
  bg: "#F9F8F6",
  accent: "#FF962C",
  h: 740,
  idea: (
    <>
      Relocation isn’t a supply problem — it’s a <em>trust</em> problem. Buy a whole apartment from one
      person who’s actually leaving: one pickup, zero ghosting.
    </>
  ),
  support:
    "Built from 12 interviews with recent movers — 10 of 12 called Facebook Marketplace “a lottery,” and 8 would pay 20–30% more for a handoff that’s actually guaranteed.",
  personas: [
    {
      name: "Lynne, 34",
      meta: "The Leaver · Tel Aviv → Berlin",
      color: "#8FA6EC",
      avatar: "/case-studies/ux-specimens/lynne-avatar.png",
      line: "Flies out in three weeks. Wants a whole apartment’s worth of furniture gone — without babysitting twenty flaky buyers.",
      quote: "“Honestly? Just take it all.”",
    },
    {
      name: "Tomer, 29",
      meta: "The Arrival · new in the city",
      color: "#FF962C",
      initials: "TM",
      line: "Furnishing fast, knows no one, sensitive to trust over price. Would rather take everything from one seller in a single trip.",
      quote: "“I’ll pay more to not gamble my Saturday.”",
    },
  ],
  fonts: [
    { role: "Display", name: "Gambarino", family: F.gambarino, weight: 500, sample: "Home again." },
    { role: "Body", name: "DM Sans", family: F.dmsans, weight: 600, sample: "Linen 3-seater sofa · ₪1,450" },
    { role: "Labels", name: "JetBrains Mono", family: F.jbmono, weight: 500, tracking: "0.04em", sample: "ON HOLD · 48H" },
  ],
  typeNote:
    "A warm humanist serif for headings keeps it human; DM Sans does the calm, legible UI work.",
};

export const MB_CFG: ContextConfig = {
  bg: "#FBF5F5",
  accent: "#399F73",
  h: 720,
  idea: (
    <>
      Picking a park is a <em>social</em> decision, not a logistics one. A great park alone is a
      15-minute visit; a so-so park with a friend is two hours.
    </>
  ),
  support:
    "Eight parents of toddlers in Ra’anana — and 8 of 8 texted “you home?” before leaving the house. Six changed parks mid-route once they knew where friends were headed.",
  personas: [
    {
      name: "Mira, 33",
      meta: "Parent of Talia (2y)",
      color: "#399F73",
      initials: "M",
      line: "Texts the group “you home?” before every outing. The park is only worth the trip if someone she knows is already there.",
      quote: "“A shitty park with a friend beats a great one alone.”",
    },
  ],
  fonts: [
    { role: "Display", name: "P22 Mackinac", family: F.mackinac, weight: 500, sample: "The park, with a friend" },
    { role: "Body", name: "Montserrat", family: F.montserrat, weight: 600, sample: "Who can see this" },
    { role: "Labels", name: "Geist Mono", family: F.geistmono, weight: 500, tracking: "0.06em", sample: "NEW BEACON" },
  ],
  typeNote:
    "Mackinac’s bookish warmth keeps it neighbourly; Montserrat stays crisp under the map UI.",
};

export const CD_CFG: ContextConfig = {
  bg: "#FBF8F1",
  accent: "#D2789A",
  h: 740,
  idea: (
    <>
      Buying a car is paralyzing when you don’t speak “car.” Translate the specs into your life —
      then let a <em>real human</em> confirm before you spend.
    </>
  ),
  support:
    "Comparison sites stack 40+ attributes per car and prioritise none of them. Across three user types mapped, zero existing tools optimised for confidence over information volume.",
  personas: [
    {
      name: "The first-timer, 26",
      meta: "Never bought a car",
      color: "#5E8AC4",
      initials: "FT",
      line: "Drowning in horsepower, trims and DSG jargon. Doesn’t want forty numbers — wants to know it’s the right car for her life.",
      quote: "“Just tell me it fits, and that I’m not being played.”",
    },
  ],
  fonts: [
    { role: "Display", name: "Cabinet Grotesk", family: F.cabinet, weight: 900, tracking: "-0.03em", sample: "Your matches." },
    { role: "Accent", name: "Gambarino", family: F.gambarino, italic: true, sample: "buying with confidence" },
    { role: "Body", name: "DM Sans", family: F.dmsans, weight: 600, sample: "The roomy crossover" },
    { role: "Labels", name: "JetBrains Mono", family: F.jbmono, weight: 500, tracking: "0.04em", sample: "SPECS · TRANSLATED" },
  ],
  typeNote:
    "A heavy grotesk shouts the confident answer; a Gambarino italic softens it so it never feels like a spec sheet.",
};

export const ID_CFG: ContextConfig = {
  bg: "#FAF8F4",
  accent: "#A9802F",
  h: 760,
  idea: (
    <>
      Couples plan a wedding across <em>seven</em> disconnected tools that never talk to each other.
      Make it one calm workspace — and joyful again.
    </>
  ),
  support:
    "Couples used 7 tools on average — WhatsApp, Sheets, email, PDFs and more. 4 of 5 felt overwhelmed by the fragmentation, not by the decisions themselves.",
  personas: [
    {
      name: "Maya & Daniel",
      meta: "Engaged · 127 days out",
      color: "#A9802F",
      initials: "M&D",
      line: "Planning across WhatsApp, a budget spreadsheet, vendor PDFs and a seating website. Excited about the wedding, drowning in tabs.",
      quote: "“Can one place just hold all of this?”",
    },
  ],
  fonts: [
    { role: "Display", name: "EB Garamond", family: F.ebgaramond, italic: true, sample: "Maya & Daniel" },
    { role: "UI", name: "Hanken Grotesk", family: F.hanken, weight: 600, sample: "This week’s focus" },
  ],
  typeNote:
    "EB Garamond gives headings the feel of a printed invitation; Hanken Grotesk keeps the dashboard crisp.",
};

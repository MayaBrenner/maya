/* Scout / My Buddy — Mira's full afternoon walkthrough.
   Vignettes are small Sorbet-themed UI fragments (not full phone mockups) —
   each one isolates the single interface element being discussed in that step,
   the same pattern Home Again and CarDB use. */

import React from "react";
import { UserJourneyConfig } from "../UserJourney";

const MB = {
  bg: "#FBF3EF",
  surface: "#FFFFFF",
  card: "rgba(255,255,255,0.85)",
  cardEdge: "rgba(255,255,255,0.7)",
  ink: "#3A1D2E",
  inkD: "#2A1322",
  inkSoft: "rgba(58,29,46,0.62)",
  inkFaint: "rgba(58,29,46,0.40)",
  line: "rgba(58,29,46,0.10)",
  muted: "#8B8088",
  border: "#DDD5DC",
  primary: "#FF5C7A",
  primaryD: "#E04565",
  accent: "#FFB778",
  peach: "#FFB778",
  pink: "#FF89AE",
  lavender: "#C49BEC",
  yellow: "#FFD98A",
  yellowD: "#F2B33D",
  green: "#4FB98A",
  head: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, system-ui, sans-serif",
  body: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, system-ui, sans-serif",
  serif: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
  mono: "'Geist Mono', ui-monospace, monospace",
};

/* small frosted card base shared by every vignette */
const sCard = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: MB.card,
  border: `1px solid ${MB.cardEdge}`,
  borderRadius: 14,
  padding: "10px 12px",
  fontFamily: MB.body,
  boxShadow: "0 6px 14px -8px rgba(58,29,46,0.18)",
  ...extra,
});

/* tiny avatar pip */
function Pip({ letter, color, size = 18 }: { letter: string; color: string; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: MB.body,
        fontSize: size * 0.46,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {letter}
    </span>
  );
}

/* 01 · MAP — a single park pin with pulse ring + buddies-here stack */
function MapPinMini() {
  return (
    <div
      style={{
        ...sCard({
          padding: "14px 12px 12px",
          background: "linear-gradient(160deg, #FFE6CE 0%, #F6D2E0 100%)",
        }),
      }}
    >
      <div
        style={{
          fontFamily: MB.mono,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: MB.inkSoft,
        }}
      >
        Map · live now
      </div>
      <div style={{ position: "relative", height: 64, marginTop: 8 }}>
        {/* pulse ring */}
        <span
          style={{
            position: "absolute",
            left: 22,
            top: 12,
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: `1.5px solid ${MB.primary}`,
            opacity: 0.55,
          }}
        />
        <span
          style={{
            position: "absolute",
            left: 14,
            top: 4,
            width: 58,
            height: 58,
            borderRadius: "50%",
            border: `1.5px solid ${MB.primary}`,
            opacity: 0.25,
          }}
        />
        {/* pin */}
        <div
          style={{
            position: "absolute",
            left: 24,
            top: 18,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 8px",
            borderRadius: 16,
            background: "#fff",
            boxShadow: "0 3px 8px rgba(58,29,46,0.14)",
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: MB.peach }} />
          <Pip letter="N" color={MB.peach} size={16} />
          <Pip letter="T" color={MB.green} size={16} />
        </div>
      </div>
      <div
        style={{
          fontFamily: MB.serif,
          fontStyle: "italic",
          fontSize: 13,
          color: MB.ink,
          lineHeight: 1.2,
          marginTop: 2,
        }}
      >
        Guitar Playground
      </div>
      <div style={{ fontFamily: MB.body, fontSize: 10, color: MB.inkSoft, marginTop: 2 }}>
        2 buddies · 4 min walk
      </div>
    </div>
  );
}

/* 02 · CROWD CHART — 24-hour shape with NOW marker */
function CrowdChartMini() {
  const bars = [0, 0, 0, 0, 1, 2, 3, 2, 1, 2, 3, 4, 3, 2, 1, 1, 1, 2, 3, 2, 1, 1, 0, 0];
  const colors = ["#dcd5db", MB.green, MB.green, MB.peach, MB.primary];
  const nowIdx = 16;
  return (
    <div style={sCard({ padding: "12px 12px 10px" })}>
      <div
        style={{
          fontFamily: MB.mono,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: MB.inkSoft,
        }}
      >
        Crowd · today
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 44, marginTop: 8 }}>
        {bars.map((v, i) => {
          const now = i === nowIdx;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${Math.max(8, (v / 4) * 100)}%`,
                borderRadius: 2,
                background: now ? MB.primary : colors[v],
                opacity: now ? 1 : 0.85,
                position: "relative",
              }}
            >
              {now && (
                <span
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontFamily: MB.body,
                    fontSize: 7.5,
                    fontWeight: 800,
                    color: MB.primary,
                  }}
                >
                  NOW
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 5,
          fontFamily: MB.body,
          fontSize: 8.5,
          color: MB.inkFaint,
        }}
      >
        <span>6a</span>
        <span>12p</span>
        <span>6p</span>
        <span>10p</span>
      </div>
    </div>
  );
}

/* 03 · BUDDIES HERE — two stacked named cards */
function BuddiesHereMini() {
  const rows = [
    { letter: "N", color: MB.peach, parent: "Noa", kid: "Ella, 2.5y", since: "4 min" },
    { letter: "T", color: MB.green, parent: "Tom", kid: "Ido, 3y", since: "17 min" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <div
        style={{
          fontFamily: MB.mono,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: MB.inkSoft,
          paddingLeft: 2,
        }}
      >
        Buddies here · 2
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          style={sCard({
            padding: "8px 10px",
            display: "flex",
            alignItems: "center",
            gap: 9,
          })}
        >
          <Pip letter={r.letter} color={r.color} size={26} />
          <div style={{ minWidth: 0, lineHeight: 1.15 }}>
            <div style={{ fontFamily: MB.body, fontSize: 11, fontWeight: 700, color: MB.ink }}>
              {r.parent}{" "}
              <span style={{ fontWeight: 500, color: MB.inkSoft }}>· {r.kid}</span>
            </div>
            <div style={{ fontFamily: MB.body, fontSize: 9.5, color: MB.inkSoft, marginTop: 1 }}>
              Beacon on · {r.since}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* 04 · BEACON SENTENCE composer */
function BeaconSentenceMini() {
  return (
    <div style={sCard({ padding: "12px 12px 11px" })}>
      <div
        style={{
          fontFamily: MB.mono,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: MB.inkSoft,
        }}
      >
        The plan
      </div>
      <div
        style={{
          fontFamily: MB.serif,
          fontStyle: "normal",
          fontSize: 14,
          lineHeight: 1.3,
          color: MB.ink,
          marginTop: 6,
        }}
      >
        I&apos;m heading to{" "}
        <span style={{ fontStyle: "italic", color: MB.primary, borderBottom: `1.5px dashed ${MB.primary}` }}>
          Guitar Playground
        </span>{" "}
        at{" "}
        <span style={{ fontStyle: "italic", color: MB.primary, borderBottom: `1.5px dashed ${MB.primary}` }}>
          4 PM
        </span>
        .
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 9,
          paddingTop: 8,
          borderTop: `1px solid ${MB.line}`,
        }}
      >
        <span style={{ fontFamily: MB.body, fontSize: 9.5, color: MB.inkSoft }}>
          My circle · expires 6 PM
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontFamily: MB.body,
            fontSize: 9.5,
            fontWeight: 700,
            color: MB.primary,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: MB.primary }} />
          Live
        </span>
      </div>
    </div>
  );
}

/* 05 · WAVE & JOIN — buddy match card with the action button */
function WaveJoinMini() {
  return (
    <div style={sCard({ padding: "11px 12px" })}>
      <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
        <Pip letter="T" color={MB.green} size={28} />
        <div style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>
          <div style={{ fontFamily: MB.body, fontSize: 11, fontWeight: 700, color: MB.ink }}>
            Tom S.
          </div>
          <div style={{ fontFamily: MB.body, fontSize: 9.5, color: MB.inkSoft, marginTop: 1 }}>
            Ido, 3y · Guitar · 4:15
          </div>
        </div>
      </div>
      <button
        type="button"
        style={{
          width: "100%",
          marginTop: 10,
          padding: "8px 0",
          border: "none",
          borderRadius: 10,
          background: MB.yellowD,
          color: MB.ink,
          fontFamily: MB.body,
          fontSize: 11,
          fontWeight: 700,
          cursor: "default",
        }}
      >
        Wave &amp; join
      </button>
    </div>
  );
}

/* 07 · COMMUNITY REPORT card with category pill + sentence + expires */
function ReportCardMini() {
  return (
    <div style={sCard({ padding: "11px 12px" })}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            fontFamily: MB.body,
            fontSize: 8.5,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: 999,
            background: "rgba(255,92,122,0.14)",
            color: MB.primaryD,
          }}
        >
          Cleanliness
        </span>
        <span style={{ fontFamily: MB.body, fontSize: 9.5, color: MB.inkSoft }}>just now</span>
      </div>
      <div
        style={{
          fontFamily: MB.serif,
          fontSize: 13,
          color: MB.ink,
          lineHeight: 1.35,
          marginTop: 7,
        }}
      >
        Trash overflowing near the south bench.
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 9,
          paddingTop: 8,
          borderTop: `1px solid ${MB.line}`,
        }}
      >
        <span style={{ fontFamily: MB.body, fontSize: 9.5, color: MB.inkSoft }}>
          Mira · expires 24h
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontFamily: MB.body,
            fontSize: 9.5,
            fontWeight: 700,
            color: MB.primary,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: MB.primary }} />
          Live
        </span>
      </div>
    </div>
  );
}

/* The journey */
export const MB_JOURNEY: UserJourneyConfig = {
  bg: MB.bg,
  accent: MB.primary,
  persona: {
    name: "Mira, 33",
    meta: "Parent of Talia (2y) · Ra'anana",
    color: MB.primary,
    initials: "M",
    situation: (
      <>
        Nap just ended. Talia is restless and bouncing off the walls. Mira needs the park —
        but the park alone is a 15-minute visit. The park <em>with a friend</em> is two hours
        of peace.
      </>
    ),
  },
  steps: [
    {
      phase: "01 · Open",
      when: "Thursday · 3:42 PM",
      mood: { label: "A bit anxious", color: MB.accent },
      screen: "The map",
      vignette: <MapPinMini />,
      thought: <>“Please let someone be at Guitar Playground.”</>,
      did: (
        <>
          Opens the app from the kitchen. The map shows nearby parks; one has a soft pulse ring
          — someone she knows is already there. She doesn&apos;t need a list of every park in
          Ra&apos;anana, she needs <b>this</b> one piece of information.
        </>
      ),
      designNote: (
        <>
          The map prioritises one signal — <em>who from your circle is there</em> — above all
          others. A pulse ring, not a popularity score. The product respects the actual question.
        </>
      ),
    },
    {
      phase: "02 · Decide",
      when: "Thursday · 3:43 PM",
      mood: { label: "Curious", color: MB.accent },
      screen: "Park detail",
      vignette: <CrowdChartMini />,
      thought: (
        <>“Busy — but the good kind of busy. Talia loves a crowd at that age.”</>
      ),
      did: (
        <>
          Taps Guitar Playground. The 24-hour crowd chart says it&apos;s climbing toward
          &ldquo;busy&rdquo; right now — peak around 4 PM, then it empties by 6. She has a 90-minute
          window before dinner.
        </>
      ),
      designNote: (
        <>
          A 24-hour rhythm chart, not a single &ldquo;crowd-level&rdquo; number. Parents plan
          around nap windows, not averages — the shape of the day matters more than the headline.
        </>
      ),
    },
    {
      phase: "03 · Confirm",
      when: "Thursday · 3:44 PM",
      mood: { label: "Relieved", color: MB.primary },
      screen: "Buddies on the park page",
      vignette: <BuddiesHereMini />,
      thought: <>“Noa <em>and</em> Ella. That seals it.”</>,
      did: (
        <>
          Scrolls past the chart to Buddies. Noa is already there with Ella — Talia&apos;s favourite
          two-year-old human. This is the moment the trip stops being a maybe and becomes a yes.
          She gets Talia&apos;s shoes on.
        </>
      ),
      designNote: (
        <>
          Buddies surface as named cards with kid + age, not anonymous pins. The kid&apos;s name
          is the deciding factor; the design promotes it accordingly.
        </>
      ),
    },
    {
      phase: "04 · Signal",
      when: "Thursday · 3:48 PM",
      mood: { label: "Connected", color: MB.primary },
      screen: "Drop a beacon",
      vignette: <BeaconSentenceMini />,
      thought: <>“If anyone else is on the fence, this is the push.”</>,
      did: (
        <>
          Composes a beacon as a sentence —{" "}
          <em>&ldquo;I&apos;m heading to Guitar Playground at 4 PM.&rdquo;</em> Audience defaults
          to her circle. Never a live location dot. The beacon auto-expires at 6 PM so nothing
          lingers as a permanent record of where her kid plays.
        </>
      ),
      designNote: (
        <>
          Intent, not GPS — and audience is a first-class control inside the compose flow, never
          buried in a settings page. Privacy is the UI, not a toggle.
        </>
      ),
    },
    {
      phase: "05 · Match",
      when: "Thursday · 3:52 PM",
      mood: { label: "Light social pull", color: MB.accent },
      screen: "Tom dropped a beacon too — Wave & join?",
      vignette: <WaveJoinMini />,
      thought: (
        <>“Wave &amp; join — not &lsquo;add friend.&rsquo; That&apos;s the right vibe.”</>
      ),
      did: (
        <>
          A notification: Tom (school-dad acquaintance) just dropped a beacon for 4:15 at the
          same park. She taps <b>Wave &amp; join</b> — which posts her own beacon, not a friend
          request. The stakes are deliberately tiny: showing up, not committing to a relationship.
        </>
      ),
      designNote: (
        <>
          The verb is &ldquo;Wave &amp; join,&rdquo; not &ldquo;Add friend.&rdquo; The label
          encodes the relationship — a one-afternoon meet, not a permanent connection. Lower
          stakes, higher show-up rates.
        </>
      ),
    },
    {
      phase: "06 · The visit",
      when: "Thursday · 4:08 PM",
      mood: { label: "Fulfilled", color: MB.primary },
      screen: "(Phone goes in pocket)",
      vignette: (
        <div
          style={{
            fontFamily: MB.head,
            fontStyle: "italic",
            fontSize: 16,
            color: MB.inkD,
            lineHeight: 1.25,
          }}
        >
          Three families. Two hours. Talia plays until her cheeks are red.
        </div>
      ),
      thought: <>“This is the version of the afternoon I actually wanted.”</>,
      did: (
        <>
          Walks in to find Noa &amp; Ella already on the slides; Tom &amp; Ido arrive ten minutes
          later. The kids form a temporary toddler-republic. The phone stays in her pocket — the
          app did its work before she left the house. That is the goal.
        </>
      ),
      designNote: (
        <>
          No live tracking, no &ldquo;you&apos;ve arrived&rdquo; ping, no engagement loop. Once the
          beacon&apos;s set the product disappears — by design. Success is the phone going dark.
        </>
      ),
    },
    {
      phase: "07 · Give back",
      when: "Thursday · 6:04 PM",
      mood: { label: "Generous", color: MB.lavender },
      screen: "Community report",
      vignette: <ReportCardMini />,
      thought: <>“Someone going at noon tomorrow will care about the shade.”</>,
      did: (
        <>
          On the walk home she taps <b>Add a heads-up</b> — three categories, one sentence,
          severity. Notes that the new climbing structures are great and the shade in the
          afternoon is better than in the morning. Auto-expires in 24h so the feed never silts up
          with stale notes.
        </>
      ),
      designNote: (
        <>
          Reports expire by default. Most park apps drown in three-year-old complaints; an
          expiry-first feed stays useful at the cost of looking emptier.
        </>
      ),
    },
  ],
  closing: (
    <>
      The whole product collapses to one promise: stop a parent from going to a park alone. Every
      screen — the map pulse, the crowd chart, the beacon sentence, the wave-and-join verb —
      exists to push <span style={{ color: MB.primary }}>that one moment of social confidence</span>{" "}
      from &lsquo;you home?&rsquo; group-chats into a tool that just works.
    </>
  ),
};

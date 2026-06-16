/* Scout / My Buddy — Mira's full afternoon walkthrough.
   Same UserJourney component as Home Again; vignettes match the My Buddy
   app vocabulary (sage/green Bright palette, Mackinac display, Montserrat UI). */

import React from "react";
import { UserJourneyConfig } from "../UserJourney";

const MB = {
  bg: "#FBF5F5",
  surface: "#FFFFFF",
  ink: "#1F3328",
  inkD: "#16261D",
  muted: "#7E8A82",
  border: "#ECE1E1",
  primary: "#399F73",
  primaryD: "#2A7D59",
  primarySoft: "#D4ECE0",
  coral: "#F15E3C",
  accent: "#FABF3E",
  accentSoft: "#FDEBBE",
  sky: "#9CC4E8",
  skySoft: "#DCEBF7",
  headline: "#0566AB",
  head: "'P22 Mackinac', Georgia, serif",
  body: "'Montserrat', system-ui, sans-serif",
  mono: "'Geist Mono', ui-monospace, monospace",
};

/* ── tiny vignettes ──────────────────────────────────────── */

/* park pin with a pulse ring + "Noa is here" label */
function PinMini() {
  return (
    <div
      style={{
        position: "relative",
        height: 78,
        background: "#EFF5EE",
        borderRadius: 8,
        border: `1px solid ${MB.border}`,
        overflow: "hidden",
      }}
    >
      {/* faux park terrain rows */}
      <svg width="100%" height="100%" viewBox="0 0 156 78" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="mb-park" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0H0V14" stroke="rgba(57,159,115,0.10)" strokeWidth="0.5" fill="none" />
          </pattern>
        </defs>
        <rect width="156" height="78" fill="url(#mb-park)" />
        <circle cx="86" cy="42" r="18" fill="rgba(57,159,115,0.12)" />
        <circle cx="86" cy="42" r="11" fill="rgba(57,159,115,0.22)" />
      </svg>
      {/* the pin */}
      <div
        style={{
          position: "absolute",
          left: 78,
          top: 34,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: MB.primary,
          border: "2px solid #fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.18)",
        }}
      />
      {/* label */}
      <div
        style={{
          position: "absolute",
          left: 12,
          bottom: 8,
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: "#fff",
          border: `1px solid ${MB.border}`,
          borderRadius: 999,
          padding: "3px 8px",
          fontFamily: MB.body,
          fontSize: 9.5,
          fontWeight: 700,
          color: MB.inkD,
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: 999, background: MB.coral }} />
        Noa is here
      </div>
    </div>
  );
}

/* miniature crowd chart (24-hour bars) */
function CrowdMini() {
  const hours = [0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 4, 4, 3, 3, 3, 3, 3, 4, 4, 3, 2, 1, 1, 0];
  const now = 10; // "now" at 4 PM in the source-data is index ~10 when chart starts at 6a
  const max = 4;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 1.5, height: 38 }}>
        {hours.map((v, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${(v / max) * 100}%`,
              minHeight: 2,
              background:
                i === now
                  ? MB.primary
                  : v >= 4
                  ? "#F15E3C"
                  : v >= 3
                  ? MB.accent
                  : MB.primarySoft,
              borderRadius: 1.5,
              opacity: i === now ? 1 : 0.85,
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 5,
          fontFamily: MB.mono,
          fontSize: 8.5,
          color: MB.muted,
        }}
      >
        <span>6a</span>
        <span>12p</span>
        <span style={{ color: MB.primary, fontWeight: 700 }}>NOW</span>
        <span>10p</span>
      </div>
    </div>
  );
}

/* beacon-composer mini (sentence with one chip filled in) */
function BeaconMini() {
  return (
    <div
      style={{
        background: MB.surface,
        border: `1px solid ${MB.border}`,
        borderRadius: 8,
        padding: "9px 10px",
      }}
    >
      <div
        style={{
          fontFamily: MB.mono,
          fontSize: 8.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 700,
          color: MB.primary,
          marginBottom: 6,
        }}
      >
        New beacon
      </div>
      <div
        style={{
          fontFamily: MB.head,
          fontWeight: 500,
          fontSize: 13.5,
          lineHeight: 1.3,
          color: MB.inkD,
          letterSpacing: "-0.01em",
        }}
      >
        I&apos;m heading to{" "}
        <span style={{ color: MB.primaryD, borderBottom: `1.5px solid ${MB.primary}` }}>
          Guitar Playground
        </span>{" "}
        at{" "}
        <span
          style={{
            color: MB.primaryD,
            borderBottom: `1.5px solid ${MB.primary}`,
            fontFamily: MB.body,
            fontWeight: 700,
            fontSize: 12.5,
          }}
        >
          4 PM
        </span>
        .
      </div>
      <div style={{ marginTop: 8, display: "flex", gap: 4 }}>
        {(["My circle", "Close fr.", "Just Noa"] as const).map((t, i) => (
          <span
            key={t}
            style={{
              fontFamily: MB.body,
              fontSize: 8.5,
              fontWeight: 600,
              padding: "3px 7px",
              borderRadius: 999,
              background: i === 0 ? MB.skySoft : MB.surface,
              color: i === 0 ? MB.headline : MB.ink,
              border: `1px solid ${i === 0 ? MB.sky : MB.border}`,
            }}
          >
            {i === 0 && "✓ "}
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* buddy card (avatar + name + "with Talia") */
function BuddyMini() {
  return (
    <div
      style={{
        background: MB.surface,
        border: `1px solid ${MB.border}`,
        borderRadius: 8,
        padding: "9px 10px",
        display: "flex",
        alignItems: "center",
        gap: 9,
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: MB.coral,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: MB.body,
          fontWeight: 700,
          fontSize: 11,
          flexShrink: 0,
        }}
      >
        N
      </div>
      <div style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>
        <div style={{ fontFamily: MB.body, fontSize: 11.5, fontWeight: 700, color: MB.inkD }}>
          Noa B.
        </div>
        <div style={{ fontFamily: MB.body, fontSize: 9.5, color: MB.muted, marginTop: 1 }}>
          with Ella (2y) · here now
        </div>
      </div>
      <span
        style={{
          fontFamily: MB.mono,
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: MB.primary,
        }}
      >
        BEACON
      </span>
    </div>
  );
}

/* Wave & join CTA mini */
function WaveJoinMini() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          background: MB.primary,
          color: "#fff",
          fontFamily: MB.body,
          fontSize: 11,
          fontWeight: 700,
          padding: "9px 8px",
          borderRadius: 9,
          textAlign: "center",
          letterSpacing: 0.2,
        }}
      >
        👋 Wave &amp; join
      </div>
      <div
        style={{
          fontFamily: MB.mono,
          fontSize: 8.5,
          color: MB.muted,
          letterSpacing: "0.08em",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        Posts a beacon · no friend request
      </div>
    </div>
  );
}

/* community report tile */
function ReportMini() {
  return (
    <div
      style={{
        background: MB.surface,
        border: `1px solid ${MB.border}`,
        borderRadius: 8,
        padding: "8px 10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            fontFamily: MB.mono,
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: "0.1em",
            background: MB.accentSoft,
            color: "#7A5A1F",
            padding: "2px 6px",
            borderRadius: 999,
          }}
        >
          HEADS-UP
        </span>
        <span style={{ fontFamily: MB.mono, fontSize: 8.5, color: MB.muted }}>4:32 PM</span>
      </div>
      <div
        style={{
          fontFamily: MB.body,
          fontSize: 11,
          color: MB.ink,
          lineHeight: 1.35,
          marginTop: 5,
        }}
      >
        Two new climbing structures · great afternoon shade.
      </div>
      <div style={{ fontFamily: MB.mono, fontSize: 8, color: MB.muted, marginTop: 5 }}>
        Expires in 24h
      </div>
    </div>
  );
}

/* The journey */
export const MB_JOURNEY: UserJourneyConfig = {
  bg: "#FBF5F5",
  accent: "#399F73",
  persona: {
    name: "Mira, 33",
    meta: "Parent of Talia (2y) · Ra'anana",
    color: "#399F73",
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
      mood: { label: "A bit anxious", color: "#F15E3C" },
      screen: "The map",
      vignette: <PinMini />,
      thought: (
        <>“Please let someone be at Guitar Playground.”</>
      ),
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
      mood: { label: "Curious", color: "#FABF3E" },
      screen: "Park detail",
      vignette: <CrowdMini />,
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
      mood: { label: "Relieved", color: "#1F9963" },
      screen: "Buddies on the park page",
      vignette: <BuddyMini />,
      thought: (
        <>“Noa <em>and</em> Ella. That seals it.”</>
      ),
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
      mood: { label: "Connected", color: "#399F73" },
      screen: "Drop a beacon",
      vignette: <BeaconMini />,
      thought: (
        <>“If anyone else is on the fence, this is the push.”</>
      ),
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
      mood: { label: "Light social pull", color: "#FABF3E" },
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
      mood: { label: "Fulfilled", color: "#399F73" },
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
      thought: (
        <>“This is the version of the afternoon I actually wanted.”</>
      ),
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
      mood: { label: "Generous", color: "#9CC4E8" },
      screen: "Community report",
      vignette: <ReportMini />,
      thought: (
        <>“Someone going at noon tomorrow will care about the shade.”</>
      ),
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
      exists to push <span style={{ color: "#399F73" }}>that one moment of social confidence</span>{" "}
      from &lsquo;you home?&rsquo; group-chats into a tool that just works.
    </>
  ),
};

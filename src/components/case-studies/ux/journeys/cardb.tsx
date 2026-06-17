/* CarDB - Yael's full first-car walkthrough.
   Vignettes match CarDB's soft-pastel + ink system (Cabinet Grotesk display,
   DM Sans body, Gambarino italic, JetBrains Mono labels). */

import React from "react";
import { UserJourneyConfig } from "../UserJourney";

const CD = {
  cream: "#FBF8F1",
  paper: "#FFFFFF",
  ink: "#0E0D0C",
  stone: "#6E6A60",
  pink: "#F7C8DC",
  blueSoft: "#DCEEFB",
  green: "#C7EFB7",
  butter: "#FFE3A8",
  butterSoft: "#FFF0D9",
  disp: "'Cabinet Grotesk', 'Archivo', sans-serif",
  body: "'DM Sans', system-ui, sans-serif",
  ital: "'Gambarino', Georgia, serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

/* ── vignettes ──────────────────────────────────────────── */

/* the wall-of-specs frustration */
function SpecsWallMini() {
  return (
    <div
      style={{
        background: "#FBFAF7",
        border: `1px dashed ${CD.stone}33`,
        borderRadius: 8,
        padding: "8px 10px",
        fontFamily: CD.mono,
        fontSize: 9.5,
        color: "#9A958A",
        lineHeight: 1.5,
        letterSpacing: "0.01em",
      }}
    >
      147 hp · 7-speed DSG · 1.5L turbo
      <br />
      1,320 kg · 5.2 L/100km · MQB platform
      <br />
      <span style={{ color: "#C0BAA8" }}>+ 38 more</span>
    </div>
  );
}

/* onboarding question - plain-language */
function QuestionMini() {
  return (
    <div
      style={{
        background: CD.paper,
        border: `1.5px solid ${CD.ink}`,
        boxShadow: `3px 3px 0 ${CD.ink}`,
        borderRadius: 10,
        padding: "10px 12px",
      }}
    >
      <div
        style={{
          fontFamily: CD.mono,
          fontSize: 8.5,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: CD.stone,
        }}
      >
        Question 3 of 8
      </div>
      <div
        style={{
          fontFamily: CD.disp,
          fontWeight: 900,
          fontSize: 14,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          color: CD.ink,
          marginTop: 5,
        }}
      >
        Where will you mostly drive?
      </div>
      <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
        {(["City", "Highway", "Both"] as const).map((t, i) => (
          <span
            key={t}
            style={{
              fontFamily: CD.body,
              fontSize: 9.5,
              fontWeight: 700,
              padding: "4px 8px",
              borderRadius: 999,
              background: i === 0 ? CD.ink : CD.paper,
              color: i === 0 ? CD.cream : CD.ink,
              border: `1px solid ${CD.ink}`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* four matches as a stacked mini */
function MatchesMini() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {(
        [
          ["The roomy crossover", "88%", CD.blueSoft, "1st"],
          ["The efficient hatch", "84%", CD.green, "2nd"],
          ["The reliable sedan", "79%", CD.butter, "3rd"],
          ["The thrifty hybrid", "75%", CD.pink, "4th"],
        ] as Array<[string, string, string, string]>
      ).map(([t, p, bg, rank]) => (
        <div
          key={t}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "6px 8px",
            background: bg,
            border: `1px solid ${CD.ink}`,
            borderRadius: 7,
            fontFamily: CD.body,
            fontSize: 10,
          }}
        >
          <span
            style={{
              fontFamily: CD.disp,
              fontWeight: 900,
              fontSize: 11,
              color: CD.ink,
              background: "#fff",
              padding: "2px 5px",
              borderRadius: 4,
              border: `1px solid ${CD.ink}`,
              minWidth: 30,
              textAlign: "center",
            }}
          >
            {p}
          </span>
          <span style={{ flex: 1, fontWeight: 700, color: CD.ink }}>{t}</span>
          <span style={{ fontSize: 8.5, fontWeight: 700, color: CD.ink, opacity: 0.7 }}>
            {rank}
          </span>
        </div>
      ))}
    </div>
  );
}

/* a single reason card highlighting the downside */
function ReasonMini() {
  return (
    <div
      style={{
        background: CD.paper,
        border: `1px solid ${CD.ink}`,
        borderRadius: 7,
        padding: "8px 10px",
        fontFamily: CD.body,
      }}
    >
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {(
          [
            ["Trunk fits the stroller", true],
            ["Higher seat - easy for parents", true],
            ["Slightly thirstier in the city", false],
          ] as Array<[string, boolean]>
        ).map(([r, good], i) => (
          <li
            key={i}
            style={{
              fontSize: 10,
              lineHeight: 1.35,
              display: "flex",
              gap: 6,
              marginBottom: 4,
              color: good ? CD.ink : "#9A6B2E",
              paddingLeft: 0,
            }}
          >
            <span style={{ fontSize: 9, marginTop: 1.5 }}>{good ? "✦" : "⚠"}</span>
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Send to Noa CTA */
function SendNoaMini() {
  return (
    <div
      style={{
        background: CD.ink,
        color: CD.cream,
        borderRadius: 9,
        padding: "10px 12px",
        fontFamily: CD.disp,
        fontWeight: 900,
        fontSize: 11,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      Send to Noa
      <span
        style={{
          background: CD.green,
          color: CD.ink,
          borderRadius: "50%",
          width: 22,
          height: 22,
          display: "grid",
          placeItems: "center",
          fontSize: 12,
        }}
      >
        →
      </span>
    </div>
  );
}

/* Dealership prep brief mini */
function PrepMini() {
  return (
    <div
      style={{
        background: CD.cream,
        border: `1.5px solid ${CD.ink}`,
        boxShadow: `3px 3px 0 ${CD.ink}`,
        borderRadius: 8,
        padding: "8px 10px",
        fontFamily: CD.body,
      }}
    >
      <div
        style={{
          fontFamily: CD.mono,
          fontSize: 8.5,
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: CD.stone,
          marginBottom: 5,
        }}
      >
        AT THE DEALERSHIP
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 9.5 }}>
        <div>· Ask for the lower trim - same engine</div>
        <div>· Fair price: ₪127–134k</div>
        <div>· Don&apos;t add the &ldquo;protection package&rdquo;</div>
      </div>
    </div>
  );
}

export const CD_JOURNEY: UserJourneyConfig = {
  bg: "#FBF8F1",
  accent: "#D2789A",
  persona: {
    name: "Yael, 26",
    meta: "First-time car buyer · Tel Aviv",
    color: "#5E8AC4",
    initials: "Y",
    situation: (
      <>
        Started a new job in Herzliya. Needs a car for the commute. Has never bought a car
        before and doesn&rsquo;t care about the &ldquo;important&rdquo; stuff. Does not know
        which questions to ask - she&rsquo;s one bad afternoon away from buying a shitty car
        at a dealership just because they say so.
      </>
    ),
  },
  steps: [
    {
      phase: "01 · The wall",
      when: "Sunday · 11:14 AM",
      mood: { label: "Overwhelmed", color: "#F15E3C" },
      screen: "Yad2 · listing #3 of 240",
      vignette: <SpecsWallMini />,
      thought: (
        <>“What does any of this even <em>mean</em>?”</>
      ),
      did: (
        <>
          Got on Yad2. Every listing throws the same info at her - DSG, MQB, hp, kg, L/100km.
          She closes the tab, opens another, closes that one too. There has to be a better way
          to do this.
        </>
      ),
      designNote: (
        <>
          The whole brief starts from this screen - let&rsquo;s make things easier for Yael.
        </>
      ),
    },
    {
      phase: "02 · Onboard",
      when: "Sunday · 11:32 AM",
      mood: { label: "Curious", color: "#FABF3E" },
      screen: "Tell us about you",
      vignette: <QuestionMini />,
      thought: (
        <>“Finally - questions about <em>me</em>, not the car.”</>
      ),
      did: (
        <>
          Opens CarDB. Eight questions, in plain language. Budget. Where she drives. How often
          she carries passengers. Whether she parallel-parks daily. The whole onboarding is
          built around her life - not the engine&apos;s.
        </>
      ),
      designNote: (
        <>
          Plain language, not spec sheets. The questions ask about <em>life</em> - passengers,
          parking, commute - and CarDB does the translation into engine talk on the buyer&apos;s
          behalf.
        </>
      ),
    },
    {
      phase: "03 · The matches",
      when: "Sunday · 11:40 AM",
      mood: { label: "Cautious optimism", color: "#9CC4E8" },
      screen: "Your four matches",
      vignette: <MatchesMini />,
      thought: (
        <>“Four. Not forty. That alone makes the day possible.”</>
      ),
      did: (
        <>
          Four cards. Not a leaderboard of 240 - four. The 88% on top makes a glance easy;
          the real work happens once she taps one open. She tries the second pick first because
          the budget on the first one made her flinch.
        </>
      ),
      designNote: (
        <>
          Hard-capped to 3–5 matches. Choice is fatigue at this price point - a leaderboard of
          240 is the FB-Marketplace failure mode in another wrapper.
        </>
      ),
    },
    {
      phase: "04 · Read the reasons",
      when: "Sunday · 11:52 AM",
      mood: { label: "Trusting", color: "#1F9963" },
      screen: "Why it's a match",
      vignette: <ReasonMini />,
      thought: (
        <>“It told me what was <em>wrong</em> with it. Now I trust the rest.”</>
      ),
      did: (
        <>
          Reads the three plain-language reasons. The third one is a downside - &lsquo;Slightly
          thirstier in the city&rsquo; - flagged in amber, not hidden. That single ⚠ row is
          why she doesn&apos;t close the app and Google a forum for second opinions.
        </>
      ),
      designNote: (
        <>
          Honest reasons, not a lonely score. Every match must surface a downside; the system
          refuses to render a card without one. Admitting the flaw is what builds the trust.
        </>
      ),
    },
    {
      phase: "05 · Send to a human",
      when: "Sunday · 12:08 PM",
      mood: { label: "Reassured", color: "#399F73" },
      screen: "Hand off to Noa",
      vignette: <SendNoaMini />,
      thought: (
        <>“A real person, paid by me - not by the dealer.”</>
      ),
      did: (
        <>
          Sends her shortlist of four to Noa Berger (vetted independent advisor · no dealer
          pay). The brief says &lt; 24h. Yael notices the &lsquo;no dealer pay&rsquo; line
          twice - that is the part that lets her sleep on it.
        </>
      ),
      designNote: (
        <>
          Human in the loop - <em>before</em> the dealership, not after. &ldquo;No dealer
          pay&rdquo; is load-bearing: the advisor&apos;s incentive is the buyer, not the sale.
        </>
      ),
    },
    {
      phase: "06 · Noa replies",
      when: "Monday · 9:14 AM",
      mood: { label: "Confident", color: "#FF962C" },
      screen: "Noa's note + prep brief",
      vignette: <PrepMini />,
      thought: (
        <>“I walk in knowing more than the salesperson expects.”</>
      ),
      did: (
        <>
          Noa picks #2 over #1 for her budget, flags a known clutch issue on #1 (which Yael
          had no way of finding), and generates a one-page prep brief: trim to ask for, fair
          price range, line items to refuse. The dealership stops being a negotiation; it
          becomes a checklist.
        </>
      ),
      designNote: (
        <>
          A generated prep brief - not just a chat reply. The dealership is a hostile environment
          for first-timers; she walks in with a paper checklist that turns it into a script.
        </>
      ),
    },
    {
      phase: "07 · Drive home",
      when: "Wednesday · 6:47 PM",
      mood: { label: "Quiet satisfaction", color: "#D2789A" },
      screen: "(Phone is in the cup-holder)",
      vignette: (
        <div
          style={{
            fontFamily: CD.ital,
            fontStyle: "italic",
            fontSize: 16,
            color: CD.ink,
            lineHeight: 1.25,
          }}
        >
          Paid ₪131k. Got the lower trim. Refused the protection package.
        </div>
      ),
      thought: (
        <>“I bought the right car. I know exactly why.”</>
      ),
      did: (
        <>
          Drives the new car off the lot Wednesday evening. The app, the matches, the human, the
          brief - collapsed into one calm decision instead of forty browser tabs. Cost of the
          advisor: ₪240. Cost of the wrong car: a few thousand more, easy.
        </>
      ),
      designNote: (
        <>
          Pricing names the value: ₪240 against a ₪131k purchase is rounding. The advisor fee is
          framed against the <em>cost of the wrong car</em>, not against free comparison sites.
        </>
      ),
    },
  ],
  closing: (
    <>
      The whole product exists for the moment a first-time buyer would otherwise have signed for
      the wrong car. CarDB doesn&apos;t replace the dealership -{" "}
      <span style={{ color: "#D2789A" }}>it puts the right person in the room first</span>, and
      hands her a brief that makes the dealership the easy part.
    </>
  ),
};

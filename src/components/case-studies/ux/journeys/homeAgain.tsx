/* Home Again — Tomer's full buyer journey, end-to-end.
   The vignettes are small, schematic Home Again UI fragments that match
   the real app's status-pill / seller-strip / deposit vocabulary. */

import React from "react";
import { UserJourneyConfig } from "../UserJourney";

const HA = {
  ink: "#000000",
  paper: "#FFFFFF",
  cream: "#FBF5E7",
  muted: "#6B6863",
  outline: "#EEEAE0",
  orange: "#FF962C",
  blue: "#8FA6EC",
  lime: "#D3D742",
  limeBg: "#E8EAB6",
  limeFg: "#3D4500",
  orangeBg: "#FFE3C4",
  orangeFg: "#7A3D00",
  blueBg: "#DCE3F7",
  blueFg: "#1F356E",
  body: "'DM Sans', system-ui, sans-serif",
  head: "'Gambarino', Georgia, serif",
};

/* tiny status pill (matches the real app) */
function Pill({ kind }: { kind: "available" | "on-hold" | "reserved" | "sold" }) {
  const meta = {
    available: { label: "Available", bg: HA.limeBg, fg: HA.limeFg, dot: HA.lime },
    "on-hold": { label: "On hold · 48h", bg: HA.orangeBg, fg: HA.orangeFg, dot: HA.orange },
    reserved: { label: "Reserved", bg: HA.blueBg, fg: HA.blueFg, dot: HA.blue },
    sold: { label: "Sold", bg: "#F0EEE8", fg: "#000", dot: "#000" },
  }[kind];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: meta.bg,
        color: meta.fg,
        fontFamily: HA.body,
        fontSize: 10,
        fontWeight: 700,
        padding: "3px 8px",
        borderRadius: 999,
        letterSpacing: 0.1,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: 999, background: meta.dot }} />
      {meta.label}
    </span>
  );
}

/* seller strip mini */
function StripMini() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/case-studies/ux-specimens/lynne-avatar.png"
        alt=""
        style={{
          width: 26,
          height: 26,
          borderRadius: 999,
          objectFit: "cover",
          background: HA.blue,
          flexShrink: 0,
        }}
      />
      <div style={{ minWidth: 0, lineHeight: 1.1 }}>
        <div style={{ fontFamily: HA.body, fontSize: 10.5, fontWeight: 700, color: "#000" }}>
          Lynne Itelson
        </div>
        <div style={{ fontFamily: HA.body, fontSize: 9.5, color: HA.muted, marginTop: 1 }}>
          Tel Aviv → Berlin · Mar 28
        </div>
      </div>
    </div>
  );
}

/* feed-card mini: image strip + title row */
function CardMini() {
  return (
    <div
      style={{
        border: `1px solid ${HA.outline}`,
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/case-studies/ux-specimens/listing-sofa.png"
          alt=""
          style={{ width: "100%", height: 60, objectFit: "cover", display: "block", background: HA.cream }}
        />
        <div style={{ position: "absolute", top: 5, left: 5 }}>
          <Pill kind="available" />
        </div>
      </div>
      <div
        style={{
          padding: "6px 8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontFamily: HA.head,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 500, color: "#000" }}>Linen sofa</span>
        <span style={{ fontSize: 11, color: "#000" }}>₪1,450</span>
      </div>
    </div>
  );
}

/* bundle banner mini */
function BundleMini() {
  return (
    <div
      style={{
        border: `1.2px solid ${HA.lime}`,
        background: "#F4F6CC",
        borderRadius: 8,
        padding: "8px 10px",
        fontFamily: HA.body,
      }}
    >
      <div style={{ fontSize: 9.5, color: HA.limeFg, fontWeight: 700, letterSpacing: 0.4 }}>
        BUNDLE · 4 ITEMS
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginTop: 4,
        }}
      >
        <span style={{ fontFamily: HA.head, fontSize: 13, color: "#000" }}>₪2,900</span>
        <span style={{ fontSize: 10, color: HA.limeFg, fontWeight: 700 }}>save ₪380</span>
      </div>
    </div>
  );
}

/* deposit / escrow chip mini */
function DepositMini() {
  return (
    <div
      style={{
        border: `1px solid ${HA.outline}`,
        borderRadius: 8,
        padding: "8px 10px",
        fontFamily: HA.body,
        background: HA.paper,
      }}
    >
      <div style={{ fontSize: 9.5, color: HA.muted, fontWeight: 700, letterSpacing: 0.4 }}>
        DEPOSIT · 20%
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginTop: 4,
        }}
      >
        <span style={{ fontFamily: HA.head, fontSize: 13, color: "#000" }}>₪580</span>
        <Pill kind="on-hold" />
      </div>
    </div>
  );
}

/* meetup slots mini */
function SlotsMini() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {[
        ["Sat", "14", "14:00", true],
        ["Sat", "14", "18:00", false],
        ["Sun", "15", "11:00", false],
      ].map(([day, n, time, on], i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "5px 6px",
            border: `1px solid ${on ? HA.ink : HA.outline}`,
            borderRadius: 6,
            fontFamily: HA.body,
            background: on ? "#FFF8EE" : HA.paper,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 4,
              background: on ? HA.ink : HA.cream,
              color: on ? "#fff" : "#000",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: HA.body,
              fontSize: 6.5,
              fontWeight: 700,
              letterSpacing: 0.4,
            }}
          >
            <span style={{ fontSize: 6 }}>{day as string}</span>
            <span style={{ fontFamily: HA.head, fontSize: 8.5 }}>{n as string}</span>
          </div>
          <span style={{ fontSize: 10.5, color: "#000", fontWeight: 600 }}>{time as string}</span>
          {on && (
            <span
              style={{
                marginLeft: "auto",
                fontSize: 9,
                color: HA.orange,
                fontWeight: 700,
              }}
            >
              picked
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* handoff: two ticks side by side */
function HandoffMini() {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {(["BUYER", "SELLER"] as const).map((r, i) => (
        <div
          key={r}
          style={{
            flex: 1,
            padding: "8px 6px",
            background: HA.limeBg,
            color: HA.limeFg,
            border: `1px solid ${HA.lime}`,
            borderRadius: 6,
            fontFamily: HA.body,
            fontSize: 9.5,
            fontWeight: 700,
            textAlign: "center",
            letterSpacing: 0.3,
          }}
        >
          <div style={{ fontSize: 8, marginBottom: 2, opacity: 0.7 }}>{r}</div>
          <div>✓ Confirmed</div>
        </div>
      ))}
    </div>
  );
}

/* The journey */
export const HA_JOURNEY: UserJourneyConfig = {
  bg: "#F9F8F6",
  accent: "#FF962C",
  persona: {
    name: "Tomer, 29",
    meta: "The Arrival · new in Tel Aviv",
    color: "#FF962C",
    initials: "TM",
    situation: (
      <>
        Three workdays to furnish an empty flat. Knows no one, hates negotiating,
        has a moving van booked for one Saturday — and one Saturday only.
      </>
    ),
  },
  steps: [
    {
      phase: "01 · Discover",
      when: "Tuesday · 9:42 PM",
      mood: { label: "Curious", color: "#FFD200" },
      screen: "The browse feed",
      vignette: <CardMini />,
      thought: <>“Oh — these are grouped by <em>person</em>, not by item.”</>,
      did: (
        <>
          Opens the app from his Airbnb. Feed leads with movers leaving soon — not a wall of
          unrelated listings. Taps Lynne&apos;s tile because her dates line up with his move-in week.
        </>
      ),
      designNote: (
        <>
          Feed grouped by <em>person</em>, not by item — so one pickup is even possible. Sorted by
          move-out date, soonest first.
        </>
      ),
    },
    {
      phase: "02 · Read",
      when: "Tuesday · 9:50 PM",
      mood: { label: "Relieved", color: "#1F9963" },
      screen: "The listing",
      vignette: <StripMini />,
      thought: <>“She&apos;s actually <em>going</em>. This won&apos;t drag on for weeks.”</>,
      did: (
        <>
          Scrolls the listing to the seller strip. <b>Tel Aviv → Berlin · Mar 28</b> tells him the
          urgency is real — eleven days. The neighbourhood (Florentin) shows; the exact address
          stays private until they agree on a meet.
        </>
      ),
      designNote: (
        <>
          Staged location reveal — neighbourhood in the listing, exact address only after both
          sides confirm a slot. Trust before address.
        </>
      ),
    },
    {
      phase: "03 · Ask",
      when: "Tuesday · 10:03 PM",
      mood: { label: "Tentative trust", color: "#8FA6EC" },
      screen: "Per-listing chat",
      vignette: (
        <div style={{ fontFamily: HA.body, fontSize: 10, color: "#000", lineHeight: 1.5 }}>
          <div style={{ color: HA.muted }}>You:</div>
          <div style={{ paddingLeft: 6 }}>Any pet hair? Allergic.</div>
          <div style={{ color: HA.muted, marginTop: 6 }}>Lynne · 12m later:</div>
          <div style={{ paddingLeft: 6 }}>None — no pets here. ✨</div>
        </div>
      ),
      thought: <>“If she doesn&apos;t reply tonight, I&apos;m moving on.”</>,
      did: (
        <>
          Taps <b>Ask</b>, sends a one-line message about pet hair. Twelve minutes later: reply.
          The conversation is scoped to this listing only — no separate inbox to manage.
        </>
      ),
      designNote: (
        <>
          Chat scoped per listing, with quick-reply chips covering the questions buyers always
          ask first. Reply time becomes a status, not a guess.
        </>
      ),
    },
    {
      phase: "04 · Bundle",
      when: "Wednesday · 7:18 AM",
      mood: { label: "Decisive", color: "#FF962C" },
      screen: "Lynne's seller page",
      vignette: <BundleMini />,
      thought: <>“One van. One apartment&apos;s worth. One trip.”</>,
      did: (
        <>
          Opens the app first thing — Lynne&apos;s seller page shows the sofa plus a rug and two
          lamps as a bundle. <b>Save ₪380</b> if he takes all four. The whole point of grouping by
          person is right here: one pickup, one decision.
        </>
      ),
      designNote: (
        <>
          Bundle discount is the only price lever in the app — no bidding, no negotiation. It
          rewards the exact behaviour that helps the leaver: take more, in one trip.
        </>
      ),
    },
    {
      phase: "05 · Reserve",
      when: "Wednesday · 7:25 AM",
      mood: { label: "Committed", color: "#E33A1A" },
      screen: "Reserve & escrow",
      vignette: <DepositMini />,
      thought: <>“I&apos;m in. 48 hours to make it happen — and a full refund if it doesn&apos;t.”</>,
      did: (
        <>
          Taps <b>Reserve</b>. 20% deposit (<b>₪580</b>) goes to escrow — not to Lynne, not yet. The
          listing flips to <b>On hold · 48h</b>. Lynne stops replying to other buyers; Tomer is
          enough on the hook to actually show up.
        </>
      ),
      designNote: (
        <>
          Deposit, not full payment. 20% to escrow is small enough not to feel like buying blind,
          and large enough that nobody no-shows. Full refund if the meet falls through.
        </>
      ),
    },
    {
      phase: "06 · Meet",
      when: "Wednesday · 11:12 AM",
      mood: { label: "In control", color: "#1F9963" },
      screen: "Propose a meetup",
      vignette: <SlotsMini />,
      thought: <>“Saturday is happening. I can book the moving van now.”</>,
      did: (
        <>
          Proposes three pickup slots across Saturday. Lynne picks 14:00. The exact address
          (Levinsky 42, Apt 6) pops in only after both sides confirm the slot.
        </>
      ),
      designNote: (
        <>
          Three slots, not a calendar — small enough to keep the back-and-forth short, big enough
          to absorb one mismatch. Address shares only when both sides agree.
        </>
      ),
    },
    {
      phase: "07 · Handoff",
      when: "Saturday · 14:08",
      mood: { label: "Quiet relief", color: "#D3D742" },
      screen: "Mutual handoff",
      vignette: <HandoffMini />,
      thought: <>“That was actually… fine.”</>,
      did: (
        <>
          Meets Lynne at the apartment. Loads four pieces of furniture into the van in twenty
          minutes. Both tap <b>Done</b> in the app. Escrow releases to Lynne; the listing flips to
          <b> Sold</b>; the chat archives. No follow-up, no money to wire, no awkward goodbye.
        </>
      ),
      designNote: (
        <>
          Mutual handoff confirmation. Payment releases only when both tap Done — together, in
          person. Neither side can ghost after the fact.
        </>
      ),
    },
  ],
  closing: (
    <>
      After: the apartment is furnished by Saturday night. The full FB-Marketplace
      &lsquo;will-they-won&apos;t-they&rsquo; ritual got replaced by{" "}
      <span style={{ color: "#FF962C" }}>one weekend, one van, one seller, one tap to confirm</span>
      . The 20% he paid above market price was, in his words, the cheapest thing he bought all
      month.
    </>
  ),
};

/* I DO — Maya & Daniel's full wedding-planning walkthrough.
   Vignettes match I DO's champagne + cream + dark-luxe system
   (EB Garamond display, Hanken Grotesk UI). */

import React from "react";
import { UserJourneyConfig } from "../UserJourney";

const ID = {
  bg: "#FAF8F4",
  surface: "#FFFFFF",
  ink: "#1B1A1E",
  ink70: "#4C4A52",
  muted: "#8C8992",
  border: "#ECE8E1",
  gold: "#A9802F",
  goldText: "#8A6A28",
  goldSoft: "#F0E6CF",
  goldLine: "#E4D3A8",
  dark: "#15141A",
  cream: "#F3EEE4",
  flowersDot: "#D2789A",
  venueDot: "#6F9C7B",
  photoDot: "#5E8AC4",
  serif: "'EB Garamond', Georgia, serif",
  sans: "'Hanken Grotesk', system-ui, sans-serif",
};

/* ── vignettes ──────────────────────────────────────────── */

/* the chaos — seven tools struck through */
function ChaosMini() {
  const tools = ["WhatsApp", "Sheets", "PDFs", "Email", "Notes", "Seating site", "Budget.xls"];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
      {tools.map((t) => (
        <span
          key={t}
          style={{
            fontFamily: ID.sans,
            fontSize: 9,
            fontWeight: 600,
            color: ID.muted,
            border: `1px solid ${ID.border}`,
            borderRadius: 999,
            padding: "3px 7px",
            textDecoration: "line-through",
            textDecorationColor: "rgba(27,26,30,0.4)",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* onboarding 5-step progress */
function OnboardMini() {
  return (
    <div
      style={{
        background: ID.surface,
        border: `1px solid ${ID.border}`,
        borderRadius: 8,
        padding: "9px 11px",
      }}
    >
      <div
        style={{
          fontFamily: ID.sans,
          fontSize: 8.5,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 700,
          color: ID.gold,
          marginBottom: 6,
        }}
      >
        Setup · 3 of 5
      </div>
      <div
        style={{
          fontFamily: ID.serif,
          fontStyle: "italic",
          fontSize: 14,
          color: ID.ink,
          lineHeight: 1.15,
        }}
      >
        When&apos;s the big day?
      </div>
      <div style={{ display: "flex", gap: 3, marginTop: 7 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 999,
              background: i <= 3 ? ID.gold : ID.border,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* mini countdown — the dark hero */
function CountdownMini() {
  return (
    <div
      style={{
        background: ID.dark,
        color: ID.cream,
        borderRadius: 8,
        padding: "10px 12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -16,
          top: -16,
          width: 56,
          height: 56,
          borderRadius: 999,
          border: "1px solid #322F3A",
        }}
      />
      <div
        style={{
          fontFamily: ID.sans,
          fontSize: 8,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: ID.gold,
          fontWeight: 700,
        }}
      >
        Maya &amp; Daniel
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
        <span
          style={{
            fontFamily: ID.serif,
            fontStyle: "italic",
            fontSize: 28,
            lineHeight: 0.85,
            color: ID.cream,
          }}
        >
          127
        </span>
        <div
          style={{
            fontFamily: ID.serif,
            fontSize: 11,
            color: ID.cream,
            lineHeight: 1,
          }}
        >
          days
        </div>
      </div>
      <div
        style={{
          fontFamily: ID.sans,
          fontSize: 7.5,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(243,238,228,0.55)",
          fontWeight: 700,
          marginTop: 3,
        }}
      >
        until &ldquo;I do&rdquo;
      </div>
    </div>
  );
}

/* timeline mini — three tasks grouped by horizon */
function TimelineMini() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {(
        [
          ["This week", "Book florist", true],
          ["Within a month", "Confirm menu", false],
          ["3 months out", "Send save-the-dates", false],
        ] as Array<[string, string, boolean]>
      ).map(([horizon, task, on], i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 7px",
            border: `1px solid ${on ? ID.gold : ID.border}`,
            background: on ? ID.goldSoft : ID.surface,
            borderRadius: 6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: on ? ID.gold : ID.border,
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>
            <div
              style={{
                fontFamily: ID.sans,
                fontSize: 7.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: ID.muted,
              }}
            >
              {horizon}
            </div>
            <div style={{ fontFamily: ID.sans, fontSize: 10.5, fontWeight: 600, color: ID.ink }}>
              {task}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* vendor workspace mini — one card */
function VendorMini() {
  return (
    <div
      style={{
        background: ID.surface,
        border: `1px solid ${ID.border}`,
        borderRadius: 8,
        padding: "9px 11px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: ID.flowersDot,
          }}
        />
        <span
          style={{
            fontFamily: ID.sans,
            fontSize: 8,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: ID.muted,
          }}
        >
          Florist
        </span>
      </div>
      <div
        style={{
          fontFamily: ID.serif,
          fontStyle: "italic",
          fontSize: 14,
          color: ID.ink,
          marginTop: 4,
          lineHeight: 1.1,
        }}
      >
        Aperture &amp; Vine
      </div>
      <div
        style={{
          display: "flex",
          gap: 6,
          marginTop: 7,
          fontFamily: ID.sans,
          fontSize: 9,
          color: ID.muted,
        }}
      >
        <span>Contract ✓</span>
        <span>·</span>
        <span>Payment 50%</span>
      </div>
    </div>
  );
}

/* seating conflict toast mini */
function SeatingMini() {
  return (
    <div
      style={{
        background: ID.surface,
        border: `1.5px solid ${ID.flowersDot}`,
        borderRadius: 8,
        padding: "8px 10px",
        boxShadow: "0 6px 14px rgba(186,94,124,0.18)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11 }}>⚠</span>
        <span
          style={{
            fontFamily: ID.sans,
            fontSize: 10,
            fontWeight: 700,
            color: "#BA5E7C",
          }}
        >
          You flagged this pair
        </span>
      </div>
      <div
        style={{
          fontFamily: ID.sans,
          fontSize: 9.5,
          color: ID.ink70,
          lineHeight: 1.35,
          marginTop: 4,
        }}
      >
        <b style={{ color: ID.ink }}>Sam &amp; Maria</b> shouldn&apos;t share a table.
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: 7 }}>
        <span
          style={{
            fontFamily: ID.sans,
            fontSize: 9,
            fontWeight: 700,
            color: "#fff",
            background: ID.ink,
            borderRadius: 999,
            padding: "3px 8px",
          }}
        >
          Move elsewhere
        </span>
        <span
          style={{
            fontFamily: ID.sans,
            fontSize: 9,
            fontWeight: 700,
            color: ID.ink70,
            border: `1px solid ${ID.border}`,
            borderRadius: 999,
            padding: "3px 8px",
          }}
        >
          Seat anyway
        </span>
      </div>
    </div>
  );
}

/* day-of: dashboard green across the board */
function DayOfMini() {
  return (
    <div
      style={{
        background: ID.surface,
        border: `1px solid ${ID.border}`,
        borderRadius: 8,
        padding: "9px 11px",
      }}
    >
      <div
        style={{
          fontFamily: ID.sans,
          fontSize: 7.5,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 700,
          color: ID.gold,
        }}
      >
        Today · Sep 12
      </div>
      <div
        style={{
          fontFamily: ID.serif,
          fontStyle: "italic",
          fontSize: 16,
          color: ID.ink,
          lineHeight: 1.1,
          marginTop: 3,
        }}
      >
        Everything is ready.
      </div>
      <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
        {(["Vendors", "Guests", "Budget", "Day-of"] as const).map((t) => (
          <span
            key={t}
            style={{
              flex: 1,
              padding: "4px 0",
              background: "#E7F0E9",
              border: `1px solid ${ID.venueDot}`,
              borderRadius: 5,
              fontFamily: ID.sans,
              fontSize: 7.5,
              fontWeight: 700,
              color: "#557F61",
              textAlign: "center",
              letterSpacing: 0.2,
            }}
          >
            ✓ {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export const ID_JOURNEY: UserJourneyConfig = {
  bg: "#FAF8F4",
  accent: "#A9802F",
  persona: {
    name: "Maya & Daniel",
    meta: "Engaged · 127 days to Sep 12",
    color: "#A9802F",
    initials: "M&D",
    situation: (
      <>
        Excited about the wedding, drowning in tabs. Planning across WhatsApp, a budget
        spreadsheet, four vendor PDFs and a seating website. Every weekend they sit down to
        plan and spend the first hour figuring out <em>where things are</em>.
      </>
    ),
  },
  steps: [
    {
      phase: "01 · The pile",
      when: "Saturday · 10:14 AM",
      mood: { label: "Drowning", color: "#F15E3C" },
      screen: "Seven tools, zero handoffs",
      vignette: <ChaosMini />,
      thought: (
        <>“We&apos;ve had three meetings about which tab the catering quote is in.”</>
      ),
      did: (
        <>
          Coffee on the table. Two laptops. They open WhatsApp, then Sheets, then a vendor PDF
          someone emailed three weeks ago. Forty-five minutes in they have not made a single
          decision — they&apos;ve just reconstructed where their decisions live.
        </>
      ),
      designNote: (
        <>
          This screen is the brief. The product&apos;s only job is to remove the forty-five
          minutes of &lsquo;where is the thing&rsquo; before any real decision-making can start.
        </>
      ),
    },
    {
      phase: "02 · Onboard",
      when: "Saturday · 11:02 AM",
      mood: { label: "Hopeful", color: "#FABF3E" },
      screen: "Setup, 5 quick steps",
      vignette: <OnboardMini />,
      thought: (
        <>“If this is more spreadsheets, we&apos;re out.”</>
      ),
      did: (
        <>
          A friend mentioned I DO. They give it five minutes. Five quick questions: names,
          date, venue, budget, invite each other. No project-management vocabulary, no sprints,
          no boards. By question four they&apos;re already moving the budget from the
          spreadsheet in.
        </>
      ),
      designNote: (
        <>
          Five steps, not fifteen — and zero SaaS vocabulary. Onboarding asks for the things a
          couple actually has on the wedding website, in the wedding language.
        </>
      ),
    },
    {
      phase: "03 · The dashboard",
      when: "Saturday · 11:07 AM",
      mood: { label: "Grounded", color: "#A9802F" },
      screen: "127 days · the dashboard",
      vignette: <CountdownMini />,
      thought: (
        <>“Oh. Everything we&apos;ve been juggling — in one look.”</>
      ),
      did: (
        <>
          The dashboard opens with a calm dark countdown — <b>127 days</b> — and four tiles
          underneath: budget used, RSVPs in, vendors booked, tasks this week. The whole question
          they ask each other every Sunday morning (<em>&ldquo;are we okay?&rdquo;</em>) is
          answered above the fold.
        </>
      ),
      designNote: (
        <>
          One workspace, not seven tabs. The home screen answers the only question that matters
          at a glance — &lsquo;are we okay?&rsquo; — across budget, RSVPs, vendors and the week.
        </>
      ),
    },
    {
      phase: "04 · Plan the week",
      when: "Sunday · 8:43 AM",
      mood: { label: "Focused", color: "#1F9963" },
      screen: "The timeline",
      vignette: <TimelineMini />,
      thought: (
        <>“Three things. Not three hundred.”</>
      ),
      did: (
        <>
          The timeline groups tasks by horizon — <em>this week</em>, <em>within a month</em>,{" "}
          <em>three months out</em>. Sunday morning becomes a five-minute scan instead of a
          two-hour reconstruction. Book the florist; everything past March can wait.
        </>
      ),
      designNote: (
        <>
          Tasks grouped by <em>distance to the wedding</em>, not by date. The unit of attention
          is &lsquo;how far out&rsquo;; calendar dates only matter once a task is this-week.
        </>
      ),
    },
    {
      phase: "05 · Work a vendor",
      when: "Tuesday · 7:21 PM",
      mood: { label: "In control", color: "#A9802F" },
      screen: "Aperture & Vine — florist workspace",
      vignette: <VendorMini />,
      thought: (
        <>“Contract, payments, what we still owe — all on one page.”</>
      ),
      did: (
        <>
          The florist replies with a revised quote. Daniel opens the Aperture &amp; Vine page —
          contract attached, payment 50% paid, three open questions, last message visible. No
          digging through email, no asking Maya which thread it&apos;s in.
        </>
      ),
      designNote: (
        <>
          Per-vendor workspace, not per-task. Contract, payments, notes, open questions live
          together because that&apos;s the unit of attention — &lsquo;the florist,&rsquo; not
          &lsquo;florist task #4.&rsquo;
        </>
      ),
    },
    {
      phase: "06 · Seating",
      when: "Saturday · 3:38 PM",
      mood: { label: "Reassured", color: "#D2789A" },
      screen: "Seating chart · conflict catch",
      vignette: <SeatingMini />,
      thought: (
        <>“The app remembered so we wouldn&apos;t have to.”</>
      ),
      did: (
        <>
          Maya drags Maria onto Table 4. The chart immediately flags{" "}
          <b>Sam &amp; Maria shouldn&apos;t share a table</b> — a note Daniel had typed into a
          vendor PDF months ago, surfaced now, at the exact moment it matters. They move Maria
          to Table 7 in ten seconds. Crisis averted before invites print.
        </>
      ),
      designNote: (
        <>
          A warning, not a wall — &lsquo;Seat anyway&rsquo; is one tap away. The app surfaces
          the risk at the moment of action; the couple keeps the final call.
        </>
      ),
    },
    {
      phase: "07 · The day",
      when: "Sep 12 · 8:02 AM",
      mood: { label: "Joyful", color: "#1F9963" },
      screen: "Day-of runbook",
      vignette: <DayOfMini />,
      thought: (
        <>“Everything is ready. We just need to show up.”</>
      ),
      did: (
        <>
          Wedding morning. Maya opens the dashboard one last time. Vendors confirmed, guests
          green, budget green, day-of runbook shared with the photographer, the planner, and
          their parents. They close the laptop. The app is finally allowed to stop.
        </>
      ),
      designNote: (
        <>
          The mobile day-of runbook is the only screen designed for someone <em>not</em> sitting
          at a desk. The whole app collapses into a live, glance-friendly timeline the planner
          can follow on their phone.
        </>
      ),
    },
  ],
  closing: (
    <>
      I DO never tries to make the planning <em>fun</em> — weddings are work. What it does is
      remove the second-order work: <span style={{ color: "#A9802F" }}>finding where things are,
      remembering what was decided, surfacing the right detail at the right moment</span>. So
      the couple gets to spend their decision-energy on the decisions.
    </>
  ),
};

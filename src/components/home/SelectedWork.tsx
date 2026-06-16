"use client";

/* SelectedWork — five editorial case-study spreads.
   Each row alternates sides (media left, then text left, repeat). The
   media block is a soft brand-tinted field with a giant Caprasimo
   watermark numeral, a sticker tag, and the real device frame (phone,
   browser, or poster). Scroll-reveal via framer-motion in-view; device
   lifts on hover, arrow translates. */

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

type Device = "phone" | "browser" | "poster";

type Spread = {
  slug: string;
  num: string;
  caseKicker: string;
  dot: string;
  title: string;
  body: string;
  tags: string[];
  bg: string;
  watermarkColor: string;
  watermarkOpacity: number;
  stickerLabel: string;
  stickerRotate: number;
  device: Device;
  media: string;
  mediaAlt: string;
  posterBg?: string;
  reverse?: boolean;
};

const SPREADS: Spread[] = [
  {
    slug: "chapter",
    num: "01",
    caseKicker: "CASE 01 · iOS · 2023",
    dot: "var(--green)",
    title: "Home Again",
    body:
      "A marketplace for selling the home of someone you've lost — built as one quiet act of permission. Slow, warm, trustable, never pushy.",
    tags: ["PRODUCT DESIGN", "0 → 1", "RESEARCH"],
    bg: "#E6F0EA",
    watermarkColor: "var(--green)",
    watermarkOpacity: 0.13,
    stickerLabel: "BROWSE · iOS",
    stickerRotate: -4,
    device: "phone",
    media: "/case-studies/chapter/screen-browse-tlv.png",
    mediaAlt: "Home Again — browse feed of people leaving Tel Aviv with featured seller Lynne Itelson",
  },
  {
    slug: "scout",
    num: "02",
    caseKicker: "CASE 02 · iOS · 2024",
    dot: "var(--red)",
    title: "My Buddy",
    body:
      "A neighbourhood app for parents — plan a playdate in two taps. Same park, same hour, fewer group chats.",
    tags: ["UX · UI", "iOS", "COMMUNITY"],
    bg: "#FBF1CC",
    watermarkColor: "var(--red)",
    watermarkOpacity: 0.13,
    stickerLabel: "PLAN A PLAYDATE · iOS",
    stickerRotate: 4,
    device: "phone",
    media: "/case-studies/my-buddy/screen-plan-playdate.png",
    mediaAlt: "My Buddy — plan a playdate sheet with park, time, and visibility options",
    reverse: true,
  },
  {
    slug: "cardb",
    num: "03",
    caseKicker: "CASE 03 · WEB · 2024",
    dot: "var(--cobalt)",
    title: "CarDB",
    body:
      "The car-buying flow rebuilt around what a car means for your life — kid-seat fit, Costco runs, snow days — not trim levels nobody reads.",
    tags: ["PRODUCT", "WEB APP", "0 → 1"],
    bg: "#E4EBF7",
    watermarkColor: "var(--cobalt)",
    watermarkOpacity: 0.13,
    stickerLabel: "MATCH · WEB APP",
    stickerRotate: -4,
    device: "browser",
    media: "/case-studies/cardb/screen-match-suv.png",
    mediaAlt: "CarDB — weekend-friendly SUV match with 76% fit and translated specs",
  },
  {
    slug: "i-do",
    num: "04",
    caseKicker: "CASE 04 · BRAND · 2023",
    dot: "var(--pink)",
    title: "I Do",
    body:
      "A wedding-planning OS — a soft, editorial brand wrapped around a calm tool. For couples who want neither a spreadsheet nor a spectacle.",
    tags: ["BRAND", "IDENTITY", "PLANNING"],
    bg: "#FBE6EF",
    watermarkColor: "var(--pink)",
    watermarkOpacity: 0.16,
    stickerLabel: "DASHBOARD · WEB",
    stickerRotate: 4,
    device: "browser",
    media: "/case-studies/i-do/screen-dashboard.png",
    mediaAlt: "I Do — Maya & Daniel dashboard, 127 days until 'I do' with vendor and task progress",
    reverse: true,
  },
  {
    slug: "mayul-studio",
    num: "05",
    caseKicker: "CASE 05 · ECOM · 2020",
    dot: "var(--orange)",
    title: "Mayul Studio",
    body:
      "My own studio — hand-made objects, hand-built site, hand-set type. Five years of selling slowly and learning what people actually keep.",
    tags: ["BRAND", "ECOMMERCE", "OWN STUDIO"],
    bg: "#F7E8D7",
    watermarkColor: "var(--orange)",
    watermarkOpacity: 0.16,
    stickerLabel: "SHOP · WEB",
    stickerRotate: -4,
    device: "browser",
    media: "/case-studies/mayul-studio/screen-notebook-shop.png",
    mediaAlt: "Mayul Studio — Hebrew shop homepage with the pasta-illustrated Notebook product hero",
  },
];

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="case-device"
      style={{
        position: "relative",
        zIndex: 2,
        width: 206,
        background: "#0F0E0C",
        borderRadius: 36,
        padding: 6,
        boxShadow: "0 36px 66px -22px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          borderRadius: 30,
          overflow: "hidden",
          background: "#fff",
          height: 402,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>
    </div>
  );
}

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="case-device"
      style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: 540,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 30px 60px -24px rgba(0,0,0,0.45)",
        border: "1px solid rgba(0,0,0,0.12)",
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 6,
          padding: "9px 13px",
          background: "#EDEAE3",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#FF5F57" }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#FEBC2E" }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#28C840" }} />
      </div>
      <div style={{ height: 300, overflow: "hidden", background: "#fff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top left",
          }}
        />
      </div>
    </div>
  );
}

function PosterFrame({
  src,
  alt,
  posterBg,
}: {
  src: string;
  alt: string;
  posterBg: string;
}) {
  return (
    <div
      className="case-device"
      style={{
        position: "relative",
        zIndex: 2,
        width: 236,
        aspectRatio: "3 / 4",
        border: "1.5px solid var(--ink)",
        boxShadow: "8px 8px 0 var(--ink)",
        background: posterBg,
        padding: 12,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

function CaseRow({ spread, first }: { spread: Spread; first: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      href={`/work/${spread.slug}`}
      className="case-row group"
      data-reverse={spread.reverse ? "true" : undefined}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "clamp(26px, 4vw, 56px)",
        alignItems: "center",
        padding: first ? "clamp(20px, 3vw, 36px) 0 clamp(40px, 6vw, 76px)" : "clamp(40px, 6vw, 76px) 0",
        borderTop: first ? "none" : "1.5px solid var(--ink)",
        textDecoration: "none",
        color: "var(--ink)",
      }}
    >
      {/* MEDIA */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="case-media"
        style={{
          position: "relative",
          display: "grid",
          placeItems: "center",
          padding: "clamp(30px, 4vw, 56px)",
          background: spread.bg,
          borderRadius: 22,
          border: "1px solid rgba(26,23,20,0.1)",
          overflow: "hidden",
          minHeight: 360,
          order: spread.reverse ? 2 : 1,
        }}
      >
        {/* Watermark numeral */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(150px, 20vw, 260px)",
            lineHeight: 1,
            color: spread.watermarkColor,
            opacity: spread.watermarkOpacity,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {spread.num}
        </span>

        {/* Sticker tag */}
        <span
          className="mono"
          style={{
            position: "absolute",
            top: 18,
            left: 18,
            zIndex: 3,
            transform: `rotate(${spread.stickerRotate}deg)`,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.14em",
            background: "var(--paper)",
            border: "1.5px solid var(--ink)",
            boxShadow: "3px 3px 0 var(--ink)",
            padding: "5px 10px",
            whiteSpace: "nowrap",
            color: "var(--ink)",
          }}
        >
          {spread.stickerLabel}
        </span>

        {spread.device === "phone" && (
          <PhoneFrame src={spread.media} alt={spread.mediaAlt} />
        )}
        {spread.device === "browser" && (
          <BrowserFrame src={spread.media} alt={spread.mediaAlt} />
        )}
        {spread.device === "poster" && (
          <PosterFrame
            src={spread.media}
            alt={spread.mediaAlt}
            posterBg={spread.posterBg ?? "var(--cream)"}
          />
        )}
      </motion.div>

      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          order: spread.reverse ? 1 : 2,
        }}
      >
        <div
          className="mono"
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "var(--mute)",
            display: "flex",
            alignItems: "center",
            gap: 9,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: spread.dot,
              display: "inline-block",
            }}
          />
          {spread.caseKicker}
        </div>
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "clamp(2.2rem, 4.6vw, 3.7rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            color: "var(--ink)",
          }}
        >
          {spread.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--ink-soft)",
            fontWeight: 500,
            maxWidth: 440,
          }}
        >
          {spread.body}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {spread.tags.map((tag) => (
            <span
              key={tag}
              className="mono"
              style={{
                fontSize: 9.5,
                fontWeight: 600,
                letterSpacing: "0.12em",
                border: "1.2px solid rgba(26,23,20,0.3)",
                borderRadius: 999,
                padding: "5px 11px",
                whiteSpace: "nowrap",
                color: "var(--ink)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            fontWeight: 600,
            fontSize: 15,
            marginTop: 4,
            color: "var(--ink)",
          }}
        >
          Read the case study
          <span
            className="case-arrow"
            style={{
              display: "inline-grid",
              placeItems: "center",
              width: 34,
              height: 34,
              borderRadius: 999,
              border: "1.5px solid var(--ink)",
              fontSize: 15,
              transition:
                "transform .3s cubic-bezier(.22,1,.36,1), background .3s, color .3s",
            }}
          >
            →
          </span>
        </span>
      </motion.div>
    </Link>
  );
}

export default function SelectedWork() {
  return (
    <section
      id="work"
      style={{
        borderTop: "1.5px solid var(--ink)",
        padding: "clamp(56px, 7vw, 104px) clamp(20px, 4vw, 56px)",
        background: "var(--paper)",
      }}
    >
      <style>{`
        @media (min-width: 860px) {
          .case-row { grid-template-columns: 1.06fr 0.94fr !important; }
        }
        @media (max-width: 859px) {
          .case-row .case-media { order: 1 !important; }
          .case-row > div:last-child { order: 2 !important; }
        }
        .case-row .case-device { transition: transform .45s cubic-bezier(.22,1,.36,1); }
        .case-row:hover .case-device { transform: translateY(-7px); }
        .case-row:hover .case-arrow { transform: translate(4px, -4px); background: var(--ink); color: var(--cream); }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: "clamp(28px, 4vw, 46px)",
          }}
        >
          <div>
            <div
              className="mono"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.24em",
                color: "var(--mute)",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: "var(--red)",
                }}
              />
              THE INDEX · 2020—2026
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "clamp(2.4rem, 6.4vw, 5rem)",
                letterSpacing: "-0.045em",
                lineHeight: 0.88,
                color: "var(--ink)",
              }}
            >
              Selected work
              <span style={{ color: "var(--red)" }}>.</span>
            </h2>
          </div>
          <p
            style={{
              maxWidth: 320,
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--ink-soft)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Five products — grief, discovery, cars, weddings, and a studio of
            my own. Open any one to read the case study.
          </p>
        </div>

        {/* Spreads */}
        <div style={{ marginTop: "clamp(20px, 3vw, 40px)" }}>
          {SPREADS.map((spread, i) => (
            <CaseRow key={spread.slug} spread={spread} first={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

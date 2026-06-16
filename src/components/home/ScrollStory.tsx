"use client";

/* ScrollStory — Cash.app-style scrollytelling.
   The center device stays pinned in the viewport; the inner screen,
   the left headline, the right body+CTA, and the background color all
   swap per scene as the user scrolls. Five scenes, one per case study.
   Real screens from each project, displayed in the right device frame
   (phone for mobile work, laptop for web work, poster for brand work). */

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Scene definitions ─────────────────────────────────────── */
type Device = "phone" | "laptop" | "poster";

type Scene = {
  key: string;
  num: string;
  name: string;
  tag: string;
  bg: string;
  ink: string;
  inkSoft: string;
  accent: string;
  headline: React.ReactNode;
  body: string;
  cta: { label: string; href: string };
  device: Device;
  media: string;
  mediaAlt: string;
  mediaCaption: string;
  posterBg?: string;
};

const SCENES: Scene[] = [
  {
    key: "home-again",
    num: "01",
    name: "Home Again",
    tag: "GRIEF · PEER MARKETPLACE · iOS",
    bg: "var(--cream)",
    ink: "var(--ink)",
    inkSoft: "var(--ink-soft)",
    accent: "var(--green)",
    headline: (
      <>
        Design for the things people don&rsquo;t have words for
        <span style={{ color: "var(--red)" }}>.</span>
      </>
    ),
    body:
      "Home Again helps people sell the home of someone they've lost. The whole product had to be one quiet act of permission — slow, warm, trustable, never pushy.",
    cta: { label: "Read the case study", href: "/work/chapter" },
    device: "phone",
    media: "/case-studies/chapter/screen-home.png",
    mediaAlt: "Home Again — home feed showing listings from people moving on",
    mediaCaption: "HOME FEED · iOS",
  },
  {
    key: "scout",
    num: "02",
    name: "Scout",
    tag: "PLACE DISCOVERY · iOS",
    bg: "var(--yellow)",
    ink: "var(--ink)",
    inkSoft: "var(--ink-soft)",
    accent: "var(--red)",
    headline: (
      <>
        Find your city
        <br />
        through the
        <br />
        people who live in it
        <span style={{ color: "var(--red)" }}>.</span>
      </>
    ),
    body:
      "Scout is a place-discovery app where the recommendations come from your neighbours, not algorithms. Locals drop pins; visitors find the spots only locals know.",
    cta: { label: "Read the case study", href: "/work/scout" },
    device: "phone",
    media: "/case-studies/scout/screen-place-card.png",
    mediaAlt: "Scout — place card for Suzanna restaurant with a local's note",
    mediaCaption: "PLACE CARD · iOS",
  },
  {
    key: "cardb",
    num: "03",
    name: "CarDB",
    tag: "AUTOMOTIVE · DECISION SUPPORT · WEB",
    bg: "var(--cobalt)",
    ink: "var(--cream)",
    inkSoft: "rgba(250, 247, 238, 0.7)",
    accent: "var(--yellow)",
    headline: (
      <>
        Buying a car
        <br />
        in language
        <br />
        that fits your life
        <span style={{ color: "var(--yellow)" }}>.</span>
      </>
    ),
    body:
      "CarDB rebuilds the car-buying flow around what the car actually means for you — kid-seat fit, costco runs, snow days — not horsepower and trim levels nobody reads.",
    cta: { label: "Read the case study", href: "/work/cardb" },
    device: "laptop",
    media: "/case-studies/cardb/screen-car-detail.png",
    mediaAlt: "CarDB — Honda CR-V detail page with plain-English fit cards",
    mediaCaption: "CAR DETAIL · WEB APP",
  },
  {
    key: "i-do",
    num: "04",
    name: "I Do",
    tag: "WEDDINGS · BRAND + PLANNING · iOS",
    bg: "var(--green)",
    ink: "var(--cream)",
    inkSoft: "rgba(250, 247, 238, 0.7)",
    accent: "var(--yellow)",
    headline: (
      <>
        Where &ldquo;someday&rdquo;
        <br />
        becomes
        <br />
        a plan
        <span style={{ color: "var(--yellow)" }}>.</span>
      </>
    ),
    body:
      "I Do is a wedding planning OS — a soft, editorial brand wrapped around a calm tool. Built for couples who don't want a spreadsheet and don't want a spectacle either.",
    cta: { label: "Read the case study", href: "/work/i-do" },
    device: "poster",
    media: "/case-studies/i-do/cover.png",
    mediaAlt: "I Do — brand cover with wedding rings monogram",
    mediaCaption: "BRAND COVER",
    posterBg: "#F2EBDA",
  },
  {
    key: "mayul",
    num: "05",
    name: "Mayul Studio",
    tag: "BRAND · ECOMMERCE · OWN STUDIO",
    bg: "var(--orange)",
    ink: "var(--ink)",
    inkSoft: "var(--ink-soft)",
    accent: "var(--cobalt)",
    headline: (
      <>
        Make for the
        <br />
        joy of making
        <span style={{ color: "var(--cobalt)" }}>.</span>
      </>
    ),
    body:
      "Mayul Studio is my own brand — hand-made objects, hand-built site, hand-set type. Five years of selling slowly, learning what people actually keep on their shelves.",
    cta: { label: "Read the case study", href: "/work/mayul-studio" },
    device: "laptop",
    media: "/case-studies/mayul-studio/digital-website.png",
    mediaAlt: "Mayul Studio — shop home page with new-season products",
    mediaCaption: "SHOP · WEB",
  },
];

/* ── Device frames ────────────────────────────────────────── */

/* Phone bezel — minimal, since the source screens already have their
   own rounded corners and content. Just a thin black border + shadow. */
function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative"
      style={{
        width: "min(310px, 80vw)",
        aspectRatio: "564 / 1218",
        background: "#0F0E0C",
        borderRadius: 44,
        padding: 6,
        boxShadow:
          "0 50px 100px -24px rgba(0,0,0,0.4), 0 18px 50px -10px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 38,
          background: "#FFF",
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
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

/* Laptop — Mac-style top bar with traffic lights + URL chip, screen
   below, thin stand. Designed to feel "shown on a wall" not "on a
   desk" — keeps the silhouette tall enough to balance the column. */
function LaptopFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative flex flex-col items-center"
      style={{ width: "min(440px, 90vw)" }}
    >
      <div
        style={{
          width: "100%",
          background: "#0F0E0C",
          borderRadius: 14,
          padding: "10px 10px 10px",
          boxShadow:
            "0 40px 80px -20px rgba(0,0,0,0.4), 0 12px 36px -8px rgba(0,0,0,0.25)",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            background: "#0F0E0C",
            borderRadius: "8px 8px 0 0",
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#FF5F57" }} />
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#FEBC2E" }} />
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#28C840" }} />
        </div>
        {/* Screen */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "100%",
            aspectRatio: "16 / 10",
            background: "#FFF",
            borderRadius: "0 0 6px 6px",
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
              objectPosition: "top left",
              display: "block",
            }}
          />
        </div>
      </div>
      {/* Stand */}
      <div
        aria-hidden
        style={{
          width: "30%",
          height: 8,
          background: "#0F0E0C",
          borderRadius: "0 0 6px 6px",
          marginTop: -1,
        }}
      />
      <div
        aria-hidden
        style={{
          width: "60%",
          height: 3,
          background: "rgba(15,14,12,0.4)",
          borderRadius: 2,
          marginTop: 4,
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}

/* Poster — a generous frame card with a thick border. Used for brand
   covers (I Do) where the deliverable was a flat brand artefact, not
   a screen. */
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
      className="relative"
      style={{
        width: "min(360px, 86vw)",
        aspectRatio: "3 / 4",
        background: posterBg,
        border: "1.5px solid var(--ink)",
        boxShadow:
          "10px 10px 0 var(--ink), 0 40px 80px -20px rgba(0,0,0,0.3)",
        padding: 14,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          background: posterBg,
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

/* DeviceStage — sticky wrapper that swaps the frame per scene with
   a soft cross-fade. */
function DeviceStage({ scene }: { scene: Scene }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ minHeight: 540 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.key}
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -28, scale: 0.97 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-col items-center"
          style={{ gap: 18 }}
        >
          {scene.device === "phone" && (
            <PhoneFrame src={scene.media} alt={scene.mediaAlt} />
          )}
          {scene.device === "laptop" && (
            <LaptopFrame src={scene.media} alt={scene.mediaAlt} />
          )}
          {scene.device === "poster" && (
            <PosterFrame
              src={scene.media}
              alt={scene.mediaAlt}
              posterBg={scene.posterBg ?? "var(--cream)"}
            />
          )}
          <div
            className="mono flex items-center gap-2"
            style={{
              fontSize: 9.5,
              letterSpacing: "0.24em",
              fontWeight: 700,
              color: scene.inkSoft,
              marginTop: 4,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                background: scene.accent,
                display: "inline-block",
              }}
            />
            {scene.mediaCaption}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Sticky progress rail — right side, all scenes always visible ── */
function ProgressRail({
  active,
  ink,
  inkSoft,
  accent,
}: {
  active: number;
  ink: string;
  inkSoft: string;
  accent: string;
}) {
  return (
    <div
      className="hidden lg:flex absolute right-7 top-1/2 -translate-y-1/2 flex-col gap-4 z-30"
      style={{ writingMode: "horizontal-tb" }}
    >
      <div
        className="mono"
        style={{
          fontSize: 9.5,
          letterSpacing: "0.28em",
          color: inkSoft,
          fontWeight: 700,
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          alignSelf: "center",
          marginBottom: 6,
        }}
      >
        THE STORY · 05 SCENES
      </div>
      {SCENES.map((s, i) => {
        const on = i === active;
        return (
          <div key={s.key} className="flex items-center justify-end gap-3">
            <motion.span
              animate={{ opacity: on ? 1 : 0, x: on ? 0 : 8 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                fontWeight: 600,
                color: ink,
                whiteSpace: "nowrap",
              }}
            >
              {s.num} · {s.name.toUpperCase()}
            </motion.span>
            <motion.span
              animate={{
                width: on ? 14 : 8,
                height: on ? 14 : 8,
                background: on ? accent : "transparent",
                borderColor: on ? accent : inkSoft,
              }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{
                borderRadius: 999,
                border: "1.5px solid",
                display: "block",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ── Main component ────────────────────────────────────────── */
export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const sceneIndex = useTransform(scrollYProgress, (p) => {
    const idx = Math.floor(Math.min(0.9999, p) * SCENES.length);
    return Math.max(0, Math.min(SCENES.length - 1, idx));
  });

  const [active, setActive] = useState(0);
  useMotionValueEvent(sceneIndex, "change", (v) => {
    const i = Math.round(v);
    if (i !== active) setActive(i);
  });

  const scene = SCENES[active];

  return (
    <section
      ref={containerRef}
      aria-label="Selected work — scroll story"
      style={{
        height: `${SCENES.length * 100}vh`,
        position: "relative",
      }}
    >
      <motion.div
        className="sticky top-0 w-full overflow-hidden"
        animate={{ background: scene.bg }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          height: "100vh",
          borderTop: "1.5px solid var(--ink)",
          borderBottom: "1.5px solid var(--ink)",
        }}
      >
        {/* Grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            backgroundSize: "240px 240px",
          }}
        />

        {/* Scene tag — top-left of stage */}
        <div
          className="absolute z-30 hidden md:flex items-center gap-3"
          style={{ top: 32, left: "clamp(20px, 4vw, 56px)" }}
        >
          <motion.span
            className="mono"
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: scene.ink,
            }}
            animate={{ color: scene.ink }}
            transition={{ duration: 0.6 }}
          >
            SCENE {scene.num} / 05
          </motion.span>
          <AnimatePresence mode="wait">
            <motion.span
              key={scene.key}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mono"
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: scene.inkSoft,
              }}
            >
              · {scene.tag}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Progress rail */}
        <ProgressRail
          active={active}
          ink={scene.ink}
          inkSoft={scene.inkSoft}
          accent={scene.accent}
        />

        {/* MAIN 3-col grid */}
        <div
          className="relative z-10 h-full grid items-center mx-auto"
          style={{
            gridTemplateColumns: "1fr",
            padding: "84px clamp(20px, 4vw, 56px) 80px",
            gap: 32,
            maxWidth: 1480,
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .story-grid { grid-template-columns: 1fr minmax(360px, 460px) 1fr !important; gap: clamp(28px, 4vw, 64px) !important; }
              .story-copy { text-align: left !important; align-items: flex-start !important; }
              .story-head { text-align: left !important; }
            }
          `}</style>
          <div
            className="story-grid grid items-center w-full"
            style={{ gap: 40 }}
          >
            {/* LEFT — headline */}
            <div
              className="story-head flex flex-col"
              style={{ textAlign: "center" }}
            >
              <AnimatePresence mode="wait">
                <motion.h2
                  key={scene.key + "-h"}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -28 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "clamp(2.4rem, 5.4vw, 4.8rem)",
                    lineHeight: 0.94,
                    letterSpacing: "-0.045em",
                    color: scene.ink,
                    margin: 0,
                    maxWidth: 600,
                  }}
                >
                  {scene.headline}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* CENTER — pinned device stage */}
            <div className="flex justify-center">
              <DeviceStage scene={scene} />
            </div>

            {/* RIGHT — body + cta + meta */}
            <div
              className="story-copy flex flex-col"
              style={{
                gap: 24,
                maxWidth: 340,
                textAlign: "center",
                alignItems: "center",
                justifySelf: "center",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={scene.key + "-b"}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -28 }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
                  className="flex flex-col gap-5"
                  style={{ alignItems: "inherit", textAlign: "inherit" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(15px, 1.05vw, 17px)",
                      lineHeight: 1.5,
                      color: scene.ink,
                      margin: 0,
                      fontWeight: 500,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {scene.body}
                  </p>

                  <Link
                    href={scene.cta.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      height: 50,
                      padding: "0 22px",
                      background: scene.ink,
                      color: scene.bg,
                      borderRadius: 999,
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: 14.5,
                      letterSpacing: "-0.005em",
                      textDecoration: "none",
                      width: "fit-content",
                    }}
                  >
                    {scene.cta.label}
                    <span aria-hidden style={{ fontSize: 13 }}>
                      →
                    </span>
                  </Link>

                  <div
                    className="mono flex items-center gap-2 mt-1"
                    style={{
                      fontSize: 10.5,
                      letterSpacing: "0.22em",
                      fontWeight: 600,
                      color: scene.inkSoft,
                    }}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: scene.accent }}
                    />
                    SCROLL FOR NEXT SCENE
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

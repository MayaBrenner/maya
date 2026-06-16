"use client";

/* Guided Tour — a 4-chapter, host-narrated walkthrough between the hero and
   the project grid. Each chapter is a full-width stop; Maya's voice does the
   guiding. A small right-edge progress indicator floats while the tour is on
   screen so the visitor always knows where they are. */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkle4, Daisy, Star8, Dot } from "@/components/ui/Shapes";

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_BACK = [0.34, 1.4, 0.6, 1] as const;

interface Chapter {
  id: string;
  num: string;
  label: string;
  accent: string;
  bg: string;       // band background (the per-section bold color)
  ink: string;      // text color on that bg
  inkSoft: string;  // muted text on that bg
  title: React.ReactNode;
  body?: React.ReactNode;
  visual: React.ReactNode;
  cta?: { label: string; href: string; external?: boolean };
  nextLabel: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: "tour-01",
    num: "01",
    label: "Welcome",
    accent: "var(--red)",
    bg: "var(--yellow)",
    ink: "var(--ink)",
    inkSoft: "rgba(26,23,20,0.7)",
    title: (
      <>
        This page is the tour. <em>Three minutes</em>, four stops — then the case studies if you
        want the long read.
      </>
    ),
    body: (
      <>
        I&apos;m Maya — a product &amp; brand designer in Tel Aviv. Rather than dropping you into
        a wall of projects, let me show you the work the way I&apos;d show it in person.
      </>
    ),
    visual: (
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(4rem, 11vw, 9rem)",
          fontWeight: 500,
          fontStyle: "italic",
          lineHeight: 0.85,
          color: "var(--ink)",
          letterSpacing: "-0.03em",
        }}
      >
        Hi.
      </div>
    ),
    nextLabel: "What I've actually shipped",
  },
  {
    id: "tour-02",
    num: "02",
    label: "The real one",
    accent: "var(--red)",
    bg: "var(--cream)",
    ink: "var(--ink)",
    inkSoft: "var(--ink-soft)",
    title: (
      <>
        The proof first: I built a stationery brand from scratch. It&apos;s in{" "}
        <em>30+ stores</em> across two continents.
      </>
    ),
    body: (
      <>
        Mayul Studio — 2020 to now. I do the design, manufacturing, the website, the photography,
        and the late-night packing. It&apos;s the only thing on this site you can actually buy.
      </>
    ),
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/case-studies/mayul-studio/cover.png"
        alt="Mayul Studio — stationery brand cover"
        style={{
          width: "100%",
          maxWidth: 520,
          aspectRatio: "4/5",
          objectFit: "cover",
          border: "1.5px solid var(--outline)",
          boxShadow: "5px 5px 0 var(--outline)",
          background: "var(--cream)",
        }}
      />
    ),
    cta: { label: "Read the Mayul case", href: "/work/mayul-studio" },
    nextLabel: "How I actually think about design",
  },
  {
    id: "tour-03",
    num: "03",
    label: "How I think",
    accent: "var(--yellow)",
    bg: "var(--cobalt)",
    ink: "var(--cream)",
    inkSoft: "rgba(250,247,238,0.78)",
    title: (
      <>
        Every decision in a product can be traced back to a <em>single sentence</em>. That&apos;s
        what the case studies are for.
      </>
    ),
    body: (
      <>
        Pulled from three of the speculative projects — each line is one design call that shaped
        the rest of the screen around it. The case studies show all of them, annotated against
        the real UI.
      </>
    ),
    visual: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          maxWidth: 540,
        }}
      >
        {[
          { quote: "Trust before address.", src: "Home Again · staged location reveal", color: "var(--orange)" },
          { quote: "Intent, not GPS.", src: "Scout · privacy by design", color: "var(--green)" },
          { quote: "A warning, not a wall.", src: "I DO · the seating-conflict toast", color: "var(--red)" },
        ].map((d) => (
          <div
            key={d.quote}
            style={{
              background: "var(--paper)",
              border: "1.5px solid var(--outline)",
              boxShadow: "4px 4px 0 var(--outline)",
              padding: "18px 22px 16px",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                color: d.color,
                marginBottom: 8,
                fontWeight: 700,
              }}
            >
              DESIGN CALL
            </div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)",
                lineHeight: 1.15,
                color: "var(--ink)",
                letterSpacing: "-0.015em",
              }}
            >
              {d.quote}
            </div>
            <div
              className="mono"
              style={{
                marginTop: 10,
                fontSize: 9.5,
                letterSpacing: "0.14em",
                color: "var(--ink-soft)",
              }}
            >
              {d.src.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    ),
    nextLabel: "All five case studies",
  },
  {
    id: "tour-04",
    num: "04",
    label: "The work",
    accent: "var(--red)",
    bg: "var(--green)",
    ink: "var(--cream)",
    inkSoft: "rgba(250,247,238,0.85)",
    title: (
      <>
        Five projects below — one shipped, four speculative. Each is its own{" "}
        <em>little universe</em>.
      </>
    ),
    body: (
      <>
        End of tour. From here it&apos;s the index — open whichever cover pulls you. Mayul Studio
        first (the real one), then the speculative product work in order of how much I love it.
      </>
    ),
    visual: (
      <div className="flex flex-col items-center gap-5">
        <Sparkle4 size={80} fill="var(--green)" strokeWidth={1.5} />
        <div
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--ink-soft)",
            fontWeight: 500,
          }}
        >
          KEEP SCROLLING — THE INDEX BEGINS
        </div>
      </div>
    ),
    nextLabel: "Open the index ↓",
  },
];

/* ── Sticky right-side progress indicator ───────────────── */
function TourProgress({ activeId }: { activeId: string | null }) {
  return (
    <AnimatePresence>
      {activeId && (
        <motion.div
          className="hidden lg:flex fixed flex-col gap-3 z-40 select-none"
          style={{
            right: 28,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div
            className="mono"
            style={{
              fontSize: 9,
              letterSpacing: "0.22em",
              color: "var(--ink-soft)",
              fontWeight: 600,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            THE TOUR
          </div>
          {CHAPTERS.map((c) => {
            const on = c.id === activeId;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="group flex items-center justify-end gap-3"
                style={{ textDecoration: "none" }}
              >
                <span
                  className="mono opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: "0.16em",
                    color: "var(--ink)",
                    fontWeight: 600,
                    background: "var(--paper)",
                    border: "1px solid var(--outline)",
                    padding: "3px 7px",
                    borderRadius: 4,
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.num} · {c.label.toUpperCase()}
                </span>
                <span
                  style={{
                    width: on ? 14 : 8,
                    height: on ? 14 : 8,
                    borderRadius: 999,
                    background: on ? c.accent : "var(--paper)",
                    border: `1.5px solid ${on ? c.accent : "var(--outline)"}`,
                    transition: "all 280ms cubic-bezier(0.22,1,0.36,1)",
                    boxShadow: on ? `0 0 0 3px var(--paper), 0 0 0 4.5px ${c.accent}33` : "none",
                  }}
                />
              </a>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── A single chapter band ──────────────────────────────── */
function ChapterBand({
  chapter,
  isLast,
  onActive,
  decoration,
}: {
  chapter: Chapter;
  isLast: boolean;
  onActive: (id: string) => void;
  decoration: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(chapter.id);
  }, [inView, chapter.id, onActive]);

  const nextId = isLast ? "projects" : `tour-${String(parseInt(chapter.num) + 1).padStart(2, "0")}`;

  return (
    <section
      ref={ref}
      id={chapter.id}
      className="relative"
      style={{
        background: chapter.bg,
        borderBottom: "2px solid var(--ink)",
        minHeight: "92vh",
        paddingTop: 96,
        paddingBottom: 110,
        overflow: "hidden",
        scrollMarginTop: 80,
        color: chapter.ink,
      }}
    >
      {decoration}

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-12 items-center">
          {/* LEFT — chapter copy */}
          <div className="lg:col-span-6">
            <motion.div
              className="mono mb-8 flex items-center gap-2.5"
              style={{ fontSize: 11, color: chapter.inkSoft, letterSpacing: "0.22em", fontWeight: 500 }}
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: chapter.accent }}
              />
              CHAPTER {chapter.num} · {chapter.label.toUpperCase()}
            </motion.div>

            <motion.h2
              className="leading-[1.0]"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                fontSize: "clamp(2.4rem, 5.2vw, 4.6rem)",
                color: chapter.ink,
                letterSpacing: "-0.02em",
              }}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE_BACK, delay: 0.1 }}
            >
              {chapter.title}
            </motion.h2>

            {chapter.body && (
              <motion.p
                className="mt-7 max-w-[52ch]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.15rem, 1.7vw, 1.4rem)",
                  fontWeight: 400,
                  lineHeight: 1.45,
                  color: chapter.inkSoft,
                  letterSpacing: "-0.005em",
                  fontStyle: "italic",
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.28 }}
              >
                {chapter.body}
              </motion.p>
            )}

            {chapter.cta && (
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.42 }}
              >
                <Link
                  href={chapter.cta.href}
                  className="btn-sticker"
                  {...(chapter.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {chapter.cta.label}{" "}
                  <span style={{ color: chapter.accent }}>→</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* RIGHT — visual */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: EASE_BACK, delay: 0.18 }}
            >
              {chapter.visual}
            </motion.div>
          </div>
        </div>

        {/* CONTINUE — connector to the next chapter */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span
            className="block w-px"
            style={{ height: 36, background: chapter.inkSoft, opacity: 0.4 }}
          />
          <a
            href={`#${nextId}`}
            className="group inline-flex items-center gap-3"
            style={{ textDecoration: "none" }}
          >
            <span
              className="mono"
              style={{
                fontSize: 10.5,
                letterSpacing: "0.18em",
                color: chapter.inkSoft,
                fontWeight: 500,
              }}
            >
              {isLast ? "OPEN THE INDEX" : "CONTINUE"}
            </span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 18,
                color: chapter.ink,
                letterSpacing: "-0.005em",
                borderBottom: `1.5px solid ${chapter.ink}`,
                paddingBottom: 2,
              }}
              className="group-hover:translate-y-0.5 transition-transform"
            >
              {chapter.nextLabel} ↓
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── decorations per chapter (kept light — 1–2 shapes each) ── */
const DECORATIONS = [
  <>
    <div className="absolute float-y pointer-events-none" style={{ top: "14%", right: "12%" }}>
      <Daisy size={64} fill="var(--red)" strokeWidth={1.5} />
    </div>
  </>,
  <>
    <div className="absolute spin-slow pointer-events-none" style={{ top: "20%", left: "8%" }}>
      <Star8 size={56} fill="var(--pink)" strokeWidth={1.5} />
    </div>
    <div className="absolute float-y pointer-events-none" style={{ bottom: "20%", right: "10%" }}>
      <Dot size={36} fill="var(--cobalt)" />
    </div>
  </>,
  <>
    <div className="absolute wiggle pointer-events-none" style={{ top: "18%", right: "10%" }}>
      <Sparkle4 size={64} fill="var(--cobalt)" strokeWidth={1.5} />
    </div>
  </>,
  <>
    <div className="absolute spin-slow pointer-events-none" style={{ top: "20%", left: "10%" }}>
      <Daisy size={70} fill="var(--green)" strokeWidth={1.5} />
    </div>
    <div className="absolute float-y pointer-events-none" style={{ bottom: "22%", right: "14%" }}>
      <Star8 size={48} fill="var(--yellow)" strokeWidth={1.5} />
    </div>
  </>,
];

export default function GuidedTour() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <TourProgress activeId={active} />
      {CHAPTERS.map((c, i) => (
        <ChapterBand
          key={c.id}
          chapter={c}
          isLast={i === CHAPTERS.length - 1}
          onActive={setActive}
          decoration={DECORATIONS[i]}
        />
      ))}
    </>
  );
}

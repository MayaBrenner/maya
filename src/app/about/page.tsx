"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkle4, Daisy, Star8 } from "@/components/ui/Shapes";

const EASE_BACK = [0.34, 1.4, 0.6, 1] as const;

const STRIP = ["var(--orange)", "var(--pink)", "var(--cobalt)", "var(--green)", "var(--yellow)", "var(--orange)", "var(--red)"];

const TOOLS = ["Figma", "Photoshop", "Illustrator", "InDesign", "After Effects", "HTML & CSS", "JavaScript"];

type TimelineEntry = {
  year: string; color: string; role: string; place: string; note: string; current?: boolean;
};
const TIMELINE: TimelineEntry[] = [
  { year: "2020 — Now",  color: "var(--pink)",   role: "Founder & Designer",      place: "Mayul Studio · Raanana",        note: "Designed, manufactured & shipped paper goods sold in the US, IL, and online.", current: true },
  { year: "2023 — 2024", color: "var(--green)",  role: "Product Manager",         place: "Cyber Unit, IDF (Reserve)",     note: "Strategy, requirements, analysis." },
  { year: "2018 — 2019", color: "var(--cobalt)", role: "QA Specialist",           place: "Giraffic · Tel Aviv",            note: "Video optimization technology." },
  { year: "2014 — 2017", color: "var(--yellow)", role: "Aerial Imagery Analyst",  place: "Military Intelligence · IL",     note: "Mandatory service. Pattern recognition at scale." },
];

export default function AboutPage() {
  return (
    <article>
      {/* Top color strip */}
      <div style={{ borderBottom: "1.5px solid var(--outline)" }}>
        <div className="color-strip">
          {STRIP.map((c, i) => (<span key={i} style={{ background: c }} />))}
        </div>
      </div>

      {/* Hero */}
      <section className="container graph relative" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <motion.div
          className="absolute float-y pointer-events-none"
          style={{ top: "18%", right: "8%" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Daisy size={70} fill="var(--orange)" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          className="absolute spin-slow pointer-events-none"
          style={{ bottom: "20%", right: "22%" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          <Sparkle4 size={48} fill="var(--cobalt)" strokeWidth={1.5} />
        </motion.div>

        <div className="max-w-4xl">
          <div className="mono mb-6" style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.2em" }}>
            BIOGRAPHY · CHAPTER II
          </div>
          <motion.h1
            className="leading-[0.92]"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(3rem, 9vw, 9rem)",
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE_BACK, delay: 0.1 }}
          >
            Hi, I'm <em className="italic" style={{ color: "var(--red)" }}>Maya</em>.
          </motion.h1>

          <motion.p
            className="mt-8 max-w-[44ch]"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
              lineHeight: 1.25,
              color: "var(--ink-soft)",
              letterSpacing: "-0.005em",
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            A graphic designer, stationery brand owner, and problem solver.
          </motion.p>
        </div>
      </section>

      {/* The story */}
      <section className="graph" style={{ background: "var(--paper)", borderTop: "1.5px solid var(--outline)", paddingTop: 80, paddingBottom: 80 }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-8">
            <div className="md:col-span-3">
              <span className="label" style={{ color: "var(--red)" }}>The Story</span>
            </div>
            <div className="md:col-span-9 md:col-start-4 max-w-[60ch]">
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)",
                  fontWeight: 400,
                  lineHeight: 1.25,
                  color: "var(--ink)",
                  letterSpacing: "-0.005em",
                }}
              >
                I've been making things people can hold since 2020. My studio{" "}
                <Link href="/work/mayul-studio" style={{ color: "var(--pink)", borderBottom: "1.5px solid var(--pink)" }}>
                  Mayul
                </Link>{" "}
                is the long-form proof — paper goods designed, manufactured, and sold across three countries. The product work is the newer chapter — apps and systems built with the same instincts: type that breathes, color that means something, components that hold their weight on the smallest screen.
              </p>
              <p className="mt-5" style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink)" }}>
                Trained at <strong>Shenkar</strong>, currently in <strong>Tel Aviv</strong>, currently <strong style={{ color: "var(--red)" }}>open to work</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="graph"
        style={{
          background: "var(--paper)",
          paddingTop: 100,
          paddingBottom: 100,
          borderTop: "1.5px solid var(--outline)",
        }}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
            <div className="md:col-span-3">
              <span className="label" style={{ color: "var(--red)" }}>Timeline</span>
              <h2
                className="mt-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "var(--ink)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1,
                }}
              >
                A working <em className="italic">biography</em>
              </h2>
            </div>

            <ol className="md:col-span-9 md:col-start-4">
              {TIMELINE.map((entry, i) => (
                <motion.li
                  key={entry.year}
                  className="grid grid-cols-12 gap-x-4 items-baseline py-7"
                  style={{ borderTop: i === 0 ? "1.5px solid var(--outline)" : "1px solid var(--outline-soft)" }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: EASE_BACK, delay: i * 0.06 }}
                >
                  <div className="col-span-12 sm:col-span-3 mono flex items-center gap-2 mb-3 sm:mb-0"
                    style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.16em", fontWeight: 500 }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
                    {entry.year}
                  </div>
                  <div className="col-span-12 sm:col-span-9">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontWeight: 500,
                          fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
                          color: "var(--ink)",
                          letterSpacing: "-0.015em",
                          lineHeight: 1.1,
                        }}
                      >
                        {entry.role}
                      </h3>
                      {entry.current && (
                        <span className="mono px-2 py-0.5 rounded-full"
                          style={{
                            background: "var(--red)",
                            color: "var(--paper)",
                            fontSize: 9.5,
                            letterSpacing: "0.18em",
                            fontWeight: 500,
                          }}>
                          NOW
                        </span>
                      )}
                    </div>
                    <div className="mono mt-1.5" style={{ fontSize: 10.5, color: "var(--ink-soft)", letterSpacing: "0.1em" }}>
                      {entry.place.toUpperCase()}
                    </div>
                    <p className="mt-3" style={{ fontSize: 15.5, color: "var(--ink)", lineHeight: 1.6, maxWidth: "48ch" }}>
                      {entry.note}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Education + Languages + Tools */}
      <section className="graph" style={{ background: "var(--paper)", paddingTop: 80, paddingBottom: 80, borderTop: "1.5px solid var(--outline)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
            <div className="md:col-span-4">
              <span className="label" style={{ color: "var(--red)" }}>Education</span>
              <h3 className="mt-3" style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.015em", lineHeight: 1.1 }}>
                Bachelor of <em className="italic">Design</em>
              </h3>
              <div className="mono mt-3" style={{ fontSize: 11, color: "var(--red)", letterSpacing: "0.18em", fontWeight: 500 }}>2019 — 2023</div>
              <div className="mono mt-1" style={{ fontSize: 10.5, color: "var(--ink-soft)", letterSpacing: "0.1em" }}>SHENKAR · TEL AVIV</div>
            </div>
            <div className="md:col-span-3 md:col-start-6">
              <span className="label" style={{ color: "var(--red)" }}>Languages</span>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li className="flex items-baseline justify-between pb-2" style={{ borderBottom: "1px solid var(--outline-soft)" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 22 }}>Hebrew</span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--ink-soft)", letterSpacing: "0.16em" }}>NATIVE</span>
                </li>
                <li className="flex items-baseline justify-between pb-2" style={{ borderBottom: "1px solid var(--outline-soft)" }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 22 }}>English</span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--ink-soft)", letterSpacing: "0.16em" }}>FLUENT</span>
                </li>
              </ul>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <span className="label" style={{ color: "var(--red)" }}>Tools</span>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {TOOLS.map((t) => (
                  <li
                    key={t}
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 500,
                      fontSize: 20,
                      color: "var(--ink)",
                      borderBottom: "1.5px solid var(--outline)",
                      paddingBottom: 2,
                    }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Write a letter — big email sticker */}
      <section className="graph" style={{ background: "var(--paper)", paddingTop: 100, paddingBottom: 40, borderTop: "1.5px solid var(--outline)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <Sparkle4 size={36} fill="var(--red)" className="mx-auto mb-4 spin-slow" />
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                fontSize: "clamp(2.4rem, 6vw, 4.4rem)",
                color: "var(--ink)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              Write a <em className="italic" style={{ color: "var(--red)" }}>letter</em>.
            </h2>
            <p
              className="mt-5 mx-auto"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                lineHeight: 1.3,
                color: "var(--ink-soft)",
                maxWidth: "48ch",
              }}
            >
              Currently open to full-time product roles and select consulting.
            </p>
          </div>

          <a
            href="mailto:mayabrenner8@gmail.com"
            className="group block mx-auto text-center transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              background: "var(--yellow)",
              border: "1.5px solid var(--ink)",
              padding: "32px 24px",
              maxWidth: 1080,
              transform: "rotate(-0.8deg)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                fontSize: "clamp(1.8rem, 6vw, 5.4rem)",
                color: "var(--ink)",
                letterSpacing: "-0.025em",
                lineHeight: 1,
                wordBreak: "break-word",
              }}
            >
              mayabrenner8@gmail.com
            </span>
            <div className="mt-5">
              <span
                className="mono inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: "var(--paper)",
                  border: "1.5px solid var(--ink)",
                  fontSize: 11,
                  color: "var(--ink)",
                  letterSpacing: "0.14em",
                  fontWeight: 500,
                }}
              >
                CLICK TO COMPOSE <span style={{ color: "var(--red)" }}>↗</span>
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* Other channels */}
      <section className="graph" style={{ background: "var(--paper)", paddingTop: 70, paddingBottom: 120 }}>
        <div className="container">
          <div className="text-center mb-10">
            <span className="label">Other Channels</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { label: "LinkedIn",  value: "/in/maya-brenner-717a43184", href: "https://www.linkedin.com/in/maya-brenner-717a43184", color: "var(--cobalt)", external: true,  onDark: true },
              { label: "Instagram", value: "@mayul.studio",              href: "https://instagram.com/mayul.studio",                color: "var(--pink)",   external: true,  onDark: false },
              { label: "Email",     value: "mayabrenner8@gmail.com",     href: "mailto:mayabrenner8@gmail.com",                     color: "var(--red)",    external: false, onDark: true },
            ].map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group block p-6 transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ background: l.color, border: "1.5px solid var(--ink)", color: l.onDark ? "var(--paper)" : "var(--ink)" }}
                >
                  <span
                    className="mono inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-full"
                    style={{
                      background: "var(--paper)",
                      border: "1.5px solid var(--ink)",
                      fontSize: 10,
                      color: "var(--ink)",
                      letterSpacing: "0.16em",
                      fontWeight: 500,
                    }}
                  >
                    {l.label.toUpperCase()}
                  </span>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 500,
                      fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                      wordBreak: "break-word",
                    }}
                  >
                    {l.value}
                  </div>
                  <div
                    className="mt-3 transition-transform duration-300 group-hover:translate-x-1"
                    style={{ fontSize: 18 }}
                  >
                    →
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}

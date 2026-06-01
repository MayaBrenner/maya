"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/types";
import { getProjectTheme } from "@/lib/project-theme";
import { Star8, Sparkle4, Daisy, SHAPE_BY_NAME } from "@/components/ui/Shapes";

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_BACK = [0.34, 1.4, 0.6, 1] as const;

/* For each project, generate a color-strip that highlights its own color */
function stripFor(slug: string): string[] {
  const all = ["var(--cobalt)", "var(--pink)", "var(--orange)", "var(--green)", "var(--yellow)", "var(--red)"];
  const own = getProjectTheme(slug).color;
  // Generate 7 squares: scattered with own color appearing twice for emphasis
  const result = [...all];
  // Make sure project color is present
  if (!result.includes(own)) result[0] = own;
  return result.slice(0, 7);
}

export default function ProjectGrid({ studies }: { studies: CaseStudy[] }) {
  return (
    <section id="projects">
      {/* Opener band — quiet, refined */}
      <div
        className="relative graph"
        style={{ background: "var(--paper)", paddingTop: 96, paddingBottom: 80, borderBottom: "1.5px solid var(--outline)" }}
      >
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="mono mb-6" style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.2em" }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block mr-2 align-middle" style={{ background: "var(--red)" }} />
              I — THE INDEX · 05 CASES
            </div>
            <h2
              className="leading-[0.95]"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
                color: "var(--ink)",
                letterSpacing: "-0.015em",
              }}
            >
              Five projects, each<br />
              its own <em className="italic" style={{ color: "var(--red)" }}>tiny universe</em>.
            </h2>
          </div>
        </div>
      </div>

      {studies.map((study, i) => (
        <ProjectSpread key={study.slug} study={study} index={i} isLast={i === studies.length - 1} />
      ))}
    </section>
  );
}

function ProjectSpread({
  study,
  index,
  isLast,
}: {
  study: CaseStudy;
  index: number;
  isLast: boolean;
}) {
  const theme = getProjectTheme(study.slug);
  const num = String(index + 1).padStart(2, "0");
  const Shape = SHAPE_BY_NAME[theme.shape];
  const strip = stripFor(study.slug);
  const flip = index % 2 === 1;

  return (
    <section
      className="relative graph"
      style={{
        background: "var(--paper)",
        minHeight: "92vh",
        paddingTop: 96,
        paddingBottom: 96,
        borderBottom: isLast ? "1.5px solid var(--outline)" : "1.5px solid var(--outline)",
        overflow: "hidden",
      }}
    >
      {/* Top color strip — project's color emphasized */}
      <div className="absolute top-0 left-0 right-0" style={{ borderBottom: "1.5px solid var(--outline)" }}>
        <div className="color-strip">
          {strip.map((c, i) => (
            <span key={i} style={{ background: c }} />
          ))}
        </div>
      </div>

      {/* 2 scattered shapes max */}
      <motion.div
        className="absolute pointer-events-none float-y"
        style={{ top: "16%", [flip ? "right" : "left"]: "8%" } as React.CSSProperties}
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.3, ease: EASE_BACK }}
      >
        <Sparkle4 size={50} fill={theme.color} strokeWidth={1.5} />
      </motion.div>
      <motion.div
        className="absolute pointer-events-none spin-slow"
        style={{ bottom: "14%", [flip ? "left" : "right"]: "10%" } as React.CSSProperties}
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE_BACK }}
      >
        <Shape size={60} fill={theme.contrast} strokeWidth={1.5} />
      </motion.div>

      <div className="container relative h-full">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-14 items-center min-h-[68vh]`}
        >
          {/* LEFT or RIGHT — meta + title */}
          <div className={`lg:col-span-5 ${flip ? "lg:col-start-8 lg:order-2" : ""}`}>
            <motion.div
              className="inline-flex items-center gap-2.5 mb-7 sticker"
              style={{ background: "var(--paper)" }}
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: EASE_BACK }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.color }} />
              CASE № {num}
            </motion.div>

            {/* Refined Cormorant title */}
            <motion.h2
              className="leading-[0.92]"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                fontSize: "clamp(3rem, 7vw, 6.5rem)",
                color: "var(--ink)",
                letterSpacing: "-0.02em",
              }}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.75, ease: EASE_BACK, delay: 0.1 }}
            >
              {study.title}
              <span style={{ color: theme.color }}>.</span>
            </motion.h2>

            <motion.div
              className="mt-6 mono flex flex-wrap gap-x-3 gap-y-1"
              style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.18em", fontWeight: 500 }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.28 }}
            >
              <span>{study.type.toUpperCase()}</span>
              <span style={{ color: "var(--faint)" }}>·</span>
              <span>{study.year}</span>
              {study.status !== "Real" && (
                <>
                  <span style={{ color: "var(--faint)" }}>·</span>
                  <span>{study.status.toUpperCase()}</span>
                </>
              )}
            </motion.div>

            <motion.p
              className="mt-7 max-w-[46ch]"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)",
                lineHeight: 1.3,
                color: "var(--ink)",
                letterSpacing: "-0.005em",
              }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.38 }}
            >
              {study.tldrSub ?? study.tldr}
            </motion.p>

            <motion.div
              className="mt-9"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.52 }}
            >
              <Link href={`/work/${study.slug}`} className="btn-sticker">
                Open the case <span style={{ color: theme.color }}>→</span>
              </Link>
            </motion.div>
          </div>

          {/* Cover image — clean, no tilt, soft shadow */}
          <div className={`lg:col-span-7 ${flip ? "lg:col-start-1 lg:row-start-1 lg:order-1" : ""}`}>
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.85, ease: EASE_BACK, delay: 0.18 }}
            >
              <Link href={`/work/${study.slug}`} className="group block card-edge" style={{ background: "var(--paper)" }}>
                <div
                  className="overflow-hidden"
                  style={{
                    aspectRatio: "4 / 3",
                    background: theme.color,
                  }}
                >
                  {study.coverImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={study.coverImage}
                      alt={study.title}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[--ease-glide] group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <span
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "10rem",
                          color: "var(--ink)",
                          opacity: 0.18,
                        }}
                      >
                        {study.title[0]}
                      </span>
                    </div>
                  )}
                </div>
                {/* Caption strip */}
                <div
                  className="flex items-baseline justify-between px-4 py-3 mono"
                  style={{ borderTop: "1.5px solid var(--outline)", fontSize: 10, color: "var(--ink)", letterSpacing: "0.18em" }}
                >
                  <span>№ {num} · {study.title.toUpperCase()}</span>
                  <span style={{ color: "var(--mute)" }}>{study.year}</span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

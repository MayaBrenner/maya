"use client";

import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/types";
import { getProjectTheme } from "@/lib/project-theme";
import { SHAPE_BY_NAME, Sparkle4 } from "@/components/ui/Shapes";

const EASE_BACK = [0.34, 1.4, 0.6, 1] as const;
const EASE = [0.16, 1, 0.3, 1] as const;

function stripFor(slug: string): string[] {
  const theme = getProjectTheme(slug);
  const all = ["var(--cobalt)", "var(--pink)", "var(--orange)", "var(--green)", "var(--yellow)", "var(--red)", "var(--cobalt)"];
  // ensure project color appears
  if (!all.includes(theme.color)) all[0] = theme.color;
  return all;
}

export default function CaseStudyHeader({ meta }: { meta: CaseStudy }) {
  const theme = getProjectTheme(meta.slug);
  const Shape = SHAPE_BY_NAME[theme.shape];
  const banner = meta.bannerImage ?? meta.coverImage;
  const num = String(meta.order ?? 0).padStart(3, "0");
  const strip = stripFor(meta.slug);

  return (
    <header>
      {/* Top color strip */}
      <div style={{ borderBottom: "1.5px solid var(--outline)" }}>
        <div className="color-strip">
          {strip.map((c, i) => (<span key={i} style={{ background: c }} />))}
        </div>
      </div>

      {/* Hero — white with project shape */}
      <section className="container graph relative" style={{ paddingTop: 100, paddingBottom: 80 }}>
        <motion.div
          className="absolute spin-slow pointer-events-none"
          style={{ top: "16%", right: "8%" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Shape size={84} fill={theme.color} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          className="absolute float-y pointer-events-none"
          style={{ bottom: "22%", right: "22%" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          <Sparkle4 size={42} fill={theme.contrast} strokeWidth={1.5} />
        </motion.div>

        <div className="max-w-5xl">
          <motion.div
            className="mono mb-6 flex items-center gap-2"
            style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.2em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.color }} />
            CASE № {num} · {meta.type.toUpperCase()} · {meta.year}
          </motion.div>

          <motion.h1
            className="leading-[0.92]"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(3.5rem, 11vw, 11rem)",
              letterSpacing: "-0.025em",
              color: "var(--ink)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE_BACK, delay: 0.1 }}
          >
            {meta.title}
            <span style={{ color: theme.color }}>.</span>
          </motion.h1>

          {meta.subtitle && (
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
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            >
              {meta.subtitle}
            </motion.p>
          )}
        </div>
      </section>

      {/* Full-bleed banner — clean, refined card. Skipped when hideBanner is set. */}
      {!meta.hideBanner && (
        <div className="graph" style={{ background: "var(--paper)", padding: "40px 0 80px", borderTop: "1.5px solid var(--outline)" }}>
          <motion.div
            className="container"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_BACK, delay: 0.4 }}
          >
            <div className="mx-auto card-edge overflow-hidden"
              style={{
                maxWidth: 1280,
                background: theme.color,
                aspectRatio: "16 / 8",
                position: "relative",
              }}
            >
              {banner ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={banner}
                  alt={meta.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 select-none italic leading-none"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--ink)",
                    fontSize: "clamp(14rem, 32vw, 24rem)",
                    opacity: 0.1,
                  }}
                >
                  {meta.title}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Meta strip */}
      <div className="graph" style={{ background: "var(--paper)", paddingTop: 20, paddingBottom: 60 }}>
        <div className="container">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-6 pb-10"
            style={{ borderBottom: "1.5px solid var(--outline)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
          >
            <MetaCell label="Role"     value={meta.role} />
            <MetaCell label="Timeline" value={meta.timeline} />
            <MetaCell label="Status"   value={meta.status} />
            <MetaCell label="Year"     value={String(meta.year)} />
            <MetaCell label="Tools"    value={meta.tools.join(", ")} cols={2} />
            <MetaCell label="Tags"     value={meta.tags.join(" · ")} cols={2} />
          </motion.div>

          {meta.tldrSub && !meta.hideSynopsis && (
            <motion.div
              className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-x-8"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
            >
              <div className="md:col-span-3">
                <span className="label" style={{ color: "var(--red)" }}>Synopsis</span>
              </div>
              <p
                className="md:col-span-9"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                  maxWidth: "56ch",
                }}
              >
                {meta.tldrSub}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

function MetaCell({ label, value, cols = 1 }: { label: string; value: string; cols?: 1 | 2 }) {
  return (
    <div className={cols === 2 ? "col-span-2 md:col-span-3" : "col-span-1 md:col-span-2"}>
      <span className="mono block mb-1.5" style={{ fontSize: 10, color: "var(--ink-soft)", letterSpacing: "0.18em", fontWeight: 500 }}>
        {label.toUpperCase()}
      </span>
      <span style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 18, color: "var(--ink)", lineHeight: 1.2 }}>
        {value}
      </span>
    </div>
  );
}

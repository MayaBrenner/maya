"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkle4, Daisy, Star8 } from "@/components/ui/Shapes";

const VERBS = ["alive", "joyful", "specific", "tactile"];
const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_BACK = [0.34, 1.4, 0.6, 1] as const;

const STRIP_COLORS = [
  "var(--green)", "var(--pink)", "var(--orange)", "var(--cobalt)",
  "var(--green)", "var(--pink)", "var(--orange)",
];

export default function HeroSection() {
  const [verbIdx, setVerbIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setVerbIdx((i) => (i + 1) % VERBS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative w-full graph"
      style={{
        background: "var(--paper)",
        minHeight: "100vh",
        paddingTop: 130,
        paddingBottom: 96,
        borderBottom: "1.5px solid var(--outline)",
        overflow: "hidden",
      }}
    >
      {/* Top color strip — the inspo signature */}
      <div className="absolute top-0 left-0 right-0" style={{ borderBottom: "1.5px solid var(--outline)" }}>
        <div className="color-strip">
          {STRIP_COLORS.map((c, i) => (
            <span key={i} style={{ background: c }} />
          ))}
        </div>
      </div>

      {/* Scattered decorative shapes — only 3, well-spaced */}
      <motion.div
        className="absolute float-y pointer-events-none"
        style={{ top: "20%", right: "28%" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE_BACK }}
      >
        <Sparkle4 size={62} fill="var(--orange)" strokeWidth={1.5} />
      </motion.div>
      <motion.div
        className="absolute wiggle pointer-events-none"
        style={{ top: "30%", right: "10%" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.75, ease: EASE_BACK }}
      >
        <Star8 size={70} fill="var(--yellow)" strokeWidth={1.5} />
      </motion.div>
      <motion.div
        className="absolute spin-slow pointer-events-none"
        style={{ bottom: "16%", right: "18%" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: EASE_BACK }}
      >
        <Daisy size={56} fill="var(--red)" strokeWidth={1.5} />
      </motion.div>

      {/* Content — left-aligned, generous space */}
      <div className="container relative">
        <div className="max-w-5xl">
          {/* Top mono kicker */}
          <motion.div
            className="flex items-center gap-3 mb-10 mono"
            style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.18em" }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--red)" }} />
            PORTFOLIO · 2026 — 2027 · TEL AVIV
          </motion.div>

          {/* Display name — Caprasimo, big but quieter (no text shadow) */}
          <h1
            className="leading-[0.88]"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(3rem, 9vw, 9rem)",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_BACK, delay: 0.15 }}
            >
              Maya
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_BACK, delay: 0.28 }}
            >
              Brenner<span style={{ color: "var(--red)" }}>.</span>
            </motion.span>
          </h1>

          {/* Refined Cormorant subtitle with cycling italic verb */}
          <motion.p
            className="mt-8 max-w-[44ch]"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
              fontWeight: 400,
              lineHeight: 1.25,
              color: "var(--ink-soft)",
              letterSpacing: "-0.005em",
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
          >
            A product designer making things that feel{" "}
            <span style={{ position: "relative", display: "inline-block", minWidth: "5em" }}>
              <AnimatePresence mode="wait">
                <motion.em
                  key={verbIdx}
                  className="italic"
                  style={{ color: "var(--red)", fontWeight: 500 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.36, ease: EASE }}
                >
                  {VERBS[verbIdx]}
                </motion.em>
              </AnimatePresence>
            </span>
            .
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-12 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
          >
            <Link href="#projects" className="btn-sticker">
              See the work <span style={{ color: "var(--red)" }}>↓</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Quiet scroll indicator */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ bottom: 30 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <span className="mono" style={{ fontSize: 9.5, color: "var(--ink-soft)", letterSpacing: "0.25em" }}>
          SCROLL
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <span style={{ color: "var(--ink-soft)", fontSize: 18 }}>↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

const WORDS = ["crafted", "playful", "right", "human", "childish", "luxury"];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="container pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Top label row */}
      <motion.div
        className="flex items-center justify-between mb-16 lg:mb-24"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="label">Product Designer · Tel Aviv</span>
        <motion.span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
          style={{ background: "var(--color-accent)", color: "var(--color-ink)" }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.08 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          Open to work
        </motion.span>
      </motion.div>

      {/* Name — editorial scale */}
      <motion.h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(4.5rem, 14vw, 12rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      >
        Maya<br />
        <em className="not-italic" style={{ color: "var(--color-accent)" }}>Brenner.</em>
      </motion.h1>

      {/* Bottom row — cycling description + CTAs */}
      <motion.div
        className="mt-12 pt-8 border-t border-[--color-border] flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
      >
        <p className="text-lg leading-snug" style={{ color: "var(--color-muted)", maxWidth: "34ch" }}>
          Designing things that feel{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              className="font-medium"
              style={{ color: "var(--color-ink)" }}
              initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(3px)" }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {WORDS[wordIdx]}
            </motion.span>
          </AnimatePresence>
          {" "}- both in print<br />and digital.
        </p>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Button href="/work">View my work</Button>
          <Button href="/about" variant="secondary">About me</Button>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Daisy, Sparkle4 } from "@/components/ui/Shapes";

const EASE_BACK = [0.34, 1.4, 0.6, 1] as const;

const STRIP = ["var(--cobalt)", "var(--pink)", "var(--orange)", "var(--green)", "var(--yellow)", "var(--red)", "var(--cobalt)"];

export default function CTASection() {
  return (
    <section
      className="relative graph overflow-hidden"
      style={{
        background: "var(--paper)",
        borderBottom: "1.5px solid var(--outline)",
        paddingTop: 140,
        paddingBottom: 140,
      }}
    >
      {/* Top color strip */}
      <div className="absolute top-0 left-0 right-0" style={{ borderBottom: "1.5px solid var(--outline)" }}>
        <div className="color-strip">
          {STRIP.map((c, i) => (<span key={i} style={{ background: c }} />))}
        </div>
      </div>

      {/* Scattered shapes — only 2 */}
      <div className="absolute spin-slow pointer-events-none" style={{ top: "18%", left: "10%" }}>
        <Daisy size={80} fill="var(--yellow)" strokeWidth={1.5} />
      </div>
      <div className="absolute float-y pointer-events-none" style={{ bottom: "18%", right: "12%" }}>
        <Sparkle4 size={56} fill="var(--red)" strokeWidth={1.5} />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="mono mb-8"
            style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.2em" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            II — THE LETTER · CURRENTLY OPEN
          </motion.div>

          <motion.h2
            className="leading-[0.95]"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: EASE_BACK }}
          >
            Let's make<br />
            <em className="italic" style={{ color: "var(--red)" }}>something</em> together.
          </motion.h2>

          <motion.a
            href="mailto:mayabrenner8@gmail.com"
            className="mt-12 inline-block"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)",
              color: "var(--ink)",
              borderBottom: "1.5px solid var(--ink)",
              paddingBottom: 4,
              letterSpacing: "-0.005em",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -2 }}
          >
            mayabrenner8@gmail.com
          </motion.a>

          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_BACK, delay: 0.4 }}
          >
            <Link href="/about" className="btn-sticker">
              More about me <span style={{ color: "var(--red)" }}>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

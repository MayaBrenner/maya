"use client";

/* Marquee — oversized italic serif word band flowing horizontally.
   Replaces the small shape strip. This is the "between the hero and the
   work" moment that creates the second WOW on the page. */

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Word {
  label: string;
  href?: string;
  accent?: string;
}

const WORDS: Word[] = [
  { label: "Mayul Studio", href: "/work/mayul-studio", accent: "var(--pink)" },
  { label: "Home Again",   href: "/work/chapter",      accent: "var(--orange)" },
  { label: "Scout",        href: "/work/scout",        accent: "var(--green)" },
  { label: "CarDB",        href: "/work/cardb",        accent: "var(--cobalt)" },
  { label: "I Do",         href: "/work/i-do",         accent: "var(--yellow)" },
];

/* One full cycle of words, with separators */
function Strip({ hovered, onHover, dim }: {
  hovered: number | null;
  onHover: (i: number | null) => void;
  dim?: boolean;
}) {
  return (
    <div className="flex items-center" style={{ gap: 56, paddingRight: 56 }}>
      {WORDS.map((w, i) => (
        <div key={i} className="flex items-center" style={{ gap: 56 }}>
          <Link
            href={w.href || "#"}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(4rem, 10vw, 11rem)",
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              color: dim && hovered !== null && hovered !== i ? "var(--mute)" : "var(--ink)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "color 320ms cubic-bezier(0.16,1,0.3,1)",
              position: "relative",
              display: "inline-block",
            }}
          >
            {w.label}
            {/* Hover accent dot */}
            <span
              aria-hidden
              style={{
                position: "absolute",
                bottom: "0.14em",
                right: "-0.35em",
                width: 14,
                height: 14,
                borderRadius: 999,
                background: w.accent,
                transform: hovered === i ? "scale(1)" : "scale(0)",
                transition: "transform 320ms cubic-bezier(0.34,1.4,0.6,1)",
              }}
            />
          </Link>
          {/* asterisk separator */}
          <span
            aria-hidden
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(2.6rem, 6vw, 6rem)",
              color: "var(--red)",
              lineHeight: 1,
              transform: "translateY(-0.15em)",
            }}
          >
            *
          </span>
        </div>
      ))}
    </div>
  );
}

export default function MarqueeStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden select-none"
      style={{
        background: "var(--paper)",
        borderTop: "1.5px solid var(--outline)",
        borderBottom: "1.5px solid var(--outline)",
        paddingTop: "clamp(36px, 6vh, 80px)",
        paddingBottom: "clamp(36px, 6vh, 80px)",
      }}
    >
      {/* Section eyebrow above the marquee */}
      <div
        className="container flex items-center justify-between mb-8 lg:mb-12"
      >
        <motion.div
          className="mono flex items-center gap-2.5"
          style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.22em", fontWeight: 600 }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--red)" }}
          />
          THE INDEX · 05 CASE STUDIES
        </motion.div>
        <motion.span
          className="mono hidden md:inline"
          style={{ fontSize: 10.5, color: "var(--ink-soft)", letterSpacing: "0.22em", fontWeight: 500 }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          HOVER A NAME ·  CLICK TO OPEN ↗
        </motion.span>
      </div>

      {/* Two strips animated with the same keyframes, second is duplicate for seamless loop */}
      <div
        className="flex"
        style={{
          animation: inView && hovered === null
            ? "marquee-words 36s linear infinite"
            : "none",
          willChange: "transform",
        }}
      >
        <Strip hovered={hovered} onHover={setHovered} dim />
        <Strip hovered={hovered} onHover={setHovered} dim />
      </div>

      <style>{`
        @keyframes marquee-words {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee-words"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

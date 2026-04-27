"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  return (
    <section className="container pt-16 pb-12 lg:pt-24 lg:pb-16">
      {/* Gold rule — animates in left to right */}
      <motion.div
        className="mb-8"
        style={{
          height: 1,
          background: "var(--color-accent)",
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
      />

      {/* Label */}
      <motion.span
        className="label block mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
      >
        Product Designer · Tel Aviv
      </motion.span>

      {/* Heading — editorial scale */}
      <motion.h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(2.8rem, 7.5vw, 6rem)",
          lineHeight: 1.02,
          letterSpacing: "-0.03em",
          maxWidth: "16ch",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
      >
        Designing experiences that feel as considered as something{" "}
        <em className="not-italic" style={{ color: "var(--color-accent)" }}>
          you&apos;d hold in your hands.
        </em>
      </motion.h1>

      {/* Bottom row — description + CTAs */}
      <motion.div
        className="mt-12 flex flex-col gap-6 border-t border-[--color-border] pt-8 sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
      >
        <p
          className="max-w-xs text-base leading-relaxed"
          style={{ color: "var(--color-muted)" }}
        >
          Craft precision of print design applied to digital product — where
          every detail is intentional.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/work">View my work</Button>
          <Button href="/about" variant="secondary">
            About me
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

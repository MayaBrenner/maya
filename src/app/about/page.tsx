"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const TOOLS = [
  { label: "Photoshop",    bg: "#FCE4EE" },
  { label: "Illustrator",  bg: "#FFE3A8" },
  { label: "InDesign",     bg: "#DCEEFB" },
  { label: "After Effects",bg: "#C7EFB7" },
  { label: "HTML & CSS",   bg: "#FCE4EE" },
  { label: "JavaScript",   bg: "#FFE3A8" },
  { label: "Figma",        bg: "#DCEEFB" },
];

const TIMELINE = [
  { year: "2020–present",    role: "Founder & Designer",                         place: "Mayul Studio, Raanana",       dim: false },
  { year: "Oct 2023–Oct 2024", role: "Got reserved as a product manager & analyst", place: "Cyber Unit, IDF",           dim: true  },
  { year: "2018–2019",       role: "Quality Assurance Specialist",                place: "Giraffic, Tel Aviv",          dim: false },
  { year: "2014–2017",       role: "Aerial Imagery Analyst",                      place: "Military Intelligence, Israel", dim: false },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AboutPage() {
  return (
    <div className="overflow-hidden">

      {/* ── Hero bio ─────────────────────────────── */}
      <section className="container pt-16 pb-20 lg:pt-24 lg:pb-28 relative">
        {/* decorative sparks */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-12 right-24 text-3xl select-none"
          animate={{ rotate: [0, 15, -10, 0], y: [0, -6, 4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >✦</motion.span>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute bottom-16 right-1/3 text-lg select-none opacity-40"
          animate={{ rotate: [0, -20, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >✦</motion.span>

        <motion.p
          className="label mb-8"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          About
        </motion.p>

        {/* Big bio */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: "20ch",
            }}
          >
            Hi, I&apos;m{" "}
            <em className="not-italic" style={{ color: "var(--color-accent)" }}>Maya</em>
            {" "}- a graphic designer, stationery brand owner, and problem solver.
          </h1>
        </motion.div>

        {/* CTA row */}
        <motion.div
          className="mt-12 flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        >
          <Button href="/contact">Get in touch</Button>
          <Button href="/resume-maya-brenner-2026.pdf" variant="secondary" external>
            Download resume ↓
          </Button>
        </motion.div>
      </section>

      {/* ── Timeline + Sidebar ───────────────────── */}
      <section className="border-t border-[--color-border]">
        <div className="container py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 lg:gap-20 items-start">

            {/* Left — Experience */}
            <div>
              <ScrollReveal>
                <span className="label block mb-12">Experience</span>
              </ScrollReveal>

              <div className="relative">
                {/* Vertical connecting line — z-0 so dots (z-[1]) render on top */}
                <div
                  className="absolute left-[11px] top-3 bottom-3 w-px hidden sm:block z-0"
                  style={{ background: "var(--color-border)" }}
                />

                <div className="flex flex-col gap-10">
                  {TIMELINE.map(({ year, role, place, dim }, i) => (
                    <ScrollReveal key={year} delay={i * 0.07}>
                      <div className="flex gap-6 sm:gap-10 items-start group">
                        {/* Dot — relative z-[1] so it renders above the absolute line */}
                        <div
                          className="hidden sm:flex relative z-[1] mt-1.5 w-6 h-6 rounded-full border-2 items-center justify-center shrink-0 transition-colors duration-300"
                          style={{
                            borderColor: dim ? "var(--color-border)" : "var(--color-accent)",
                            background: i === 0 ? "var(--color-accent)" : "var(--color-bg)",
                          }}
                        >
                          {i === 0 && (
                            <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-ink)" }} />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-2">
                          <span
                            className="label block mb-2"
                            style={{ color: dim ? "var(--color-muted)" : "var(--color-accent-dark)" }}
                          >
                            {year}
                          </span>
                          <div
                            className={`${dim ? "text-base font-semibold" : "text-xl font-medium"} leading-tight mb-1`}
                            style={{
                              fontFamily: "var(--font-display)",
                              color: dim ? "var(--color-muted)" : "var(--color-ink)",
                            }}
                          >
                            {role}
                          </div>
                          <div className="text-sm" style={{ color: "var(--color-muted)" }}>
                            {place}
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Education + Languages */}
            <div className="flex flex-col gap-12">

              {/* Education */}
              <ScrollReveal delay={0.1}>
                <span className="label block mb-12">Education</span>
                <div>
                  <div className="label mb-2" style={{ color: "var(--color-accent-dark)" }}>
                    Oct 2019 – Aug 2023
                  </div>
                  <div
                    className="text-lg font-medium leading-tight mb-1"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                  >
                    Bachelor of Design
                  </div>
                  <div className="text-sm" style={{ color: "var(--color-muted)" }}>
                    Shenkar, Tel Aviv
                  </div>
                </div>
              </ScrollReveal>

              {/* Languages */}
              <ScrollReveal delay={0.18}>
                <span className="label block mb-6">Languages</span>
                <div className="flex flex-col gap-4">
                  {[
                    { lang: "Hebrew", level: "Native Speaker" },
                    { lang: "English", level: "Highly Proficient" },
                  ].map(({ lang, level }) => (
                    <div key={lang} className="flex items-baseline justify-between gap-4">
                      <span
                        className="text-base font-medium"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                      >
                        {lang}
                      </span>
                      <span className="text-sm" style={{ color: "var(--color-muted)" }}>
                        {level}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

            </div>
          </div>
        </div>
      </section>

      {/* ── Tools ────────────────────────────────── */}
      <section className="border-t border-[--color-border]">
        <div className="container py-16 lg:py-20">
          <ScrollReveal>
            <span className="label block mb-10">Tools</span>
          </ScrollReveal>

          <div className="flex flex-wrap gap-3">
            {TOOLS.map(({ label, bg }, i) => (
              <ScrollReveal key={label} delay={i * 0.05}>
                <motion.span
                  className="inline-block rounded-full border border-[--color-border] px-5 py-2 text-sm font-medium cursor-default"
                  style={{ background: bg, color: "var(--color-ink)" }}
                  whileHover={{ scale: 1.06, y: -2, boxShadow: "3px 3px 0 var(--color-ink)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {label}
                </motion.span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

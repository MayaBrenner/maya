"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTASection() {
  return (
    <section className="section border-t border-[--color-border]">
      <div className="container">
        <ScrollReveal>
          <div
            className="relative overflow-hidden rounded-3xl px-10 py-20 lg:px-20 lg:py-28"
            style={{ background: "var(--color-ink)" }}
          >
            {/* Ghost watermark */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-12 -bottom-20 select-none leading-none"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-bg)",
                fontSize: "clamp(16rem, 38vw, 30rem)",
                fontWeight: 500,
                opacity: 0.04,
              }}
            >
              M
            </span>

            {/* Decorative accent ring */}
            <motion.div
              className="pointer-events-none absolute top-10 right-16 w-32 h-32 rounded-full border opacity-10"
              style={{ borderColor: "var(--color-accent)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="pointer-events-none absolute top-12 right-18 w-20 h-20 rounded-full border opacity-10"
              style={{ borderColor: "var(--color-accent)", top: "3.5rem", right: "5rem" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative">
              <motion.span
                className="label block mb-6"
                style={{ color: "var(--color-accent)" }}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Open to work · 2026
              </motion.span>

              <motion.h2
                className="mb-10"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-bg)",
                  fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                  fontWeight: 500,
                  maxWidth: "18ch",
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Available for product design roles and select freelance.
              </motion.h2>

              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.22 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                  style={{ background: "var(--color-accent)", color: "var(--color-ink)" }}
                >
                  Get in touch →
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-200 hover:bg-white/10"
                  style={{ borderColor: "rgba(247,245,240,0.2)", color: "var(--color-bg)" }}
                >
                  About me
                </Link>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

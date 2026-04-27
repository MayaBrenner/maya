"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTASection() {
  return (
    <section className="section border-t border-[--color-border]">
      <div className="container">
        <ScrollReveal>
          <div
            className="relative overflow-hidden rounded-2xl px-10 py-16 lg:px-16 lg:py-20"
            style={{ background: "var(--color-ink)" }}
          >
            {/* Ghost watermark */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-8 -bottom-16 select-none leading-none opacity-[0.045]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-bg)",
                fontSize: "clamp(16rem, 35vw, 28rem)",
                fontWeight: 500,
              }}
            >
              M
            </span>

            <div className="relative">
              <span
                className="label block mb-5"
                style={{ color: "var(--color-accent)" }}
              >
                Open to work · 2026
              </span>
              <h2
                className="mb-8 max-w-2xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-bg)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  fontWeight: 500,
                }}
              >
                Available for product design roles and select freelance projects.
              </h2>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-[--duration-base] hover:opacity-90"
                  style={{ background: "var(--color-accent)", color: "var(--color-ink)" }}
                >
                  Get in touch
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-[--duration-base] hover:bg-white/10"
                  style={{
                    borderColor: "rgba(247,245,240,0.2)",
                    color: "var(--color-bg)",
                  }}
                >
                  About me
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

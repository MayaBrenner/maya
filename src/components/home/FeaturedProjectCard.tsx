"use client";

import Link from "next/link";
import type { CaseStudy } from "@/lib/types";

export default function FeaturedProjectCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/work/${study.slug}`} className="group block">
      {/* Top index row */}
      <div
        className="flex items-baseline justify-between pb-4 mb-6"
        style={{ borderBottom: "1px solid var(--ink)" }}
      >
        <div className="flex items-baseline gap-4">
          <span className="mono" style={{ fontSize: 11, color: "var(--tomato)", letterSpacing: "0.18em" }}>
            FEATURED · № 001
          </span>
          <span className="mono" style={{ fontSize: 11, color: "var(--mute)" }}>
            {study.type.toUpperCase()} · {study.year}
          </span>
        </div>
        <span
          className="mono opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ fontSize: 11, color: "var(--tomato)" }}
        >
          OPEN CASE →
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16 / 7", background: study.accentColor }}
      >
        {study.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={study.coverImage}
            alt={study.title}
            className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[--ease-glide] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-end pr-12">
            <span
              className="italic leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(10rem, 28vw, 22rem)",
                color: "var(--ink)",
                opacity: 0.06,
              }}
            >
              {study.title[0]}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-x-6">
        <div className="md:col-span-7">
          <h3
            className="transition-colors duration-300 group-hover:italic"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
            }}
          >
            {study.title}
          </h3>
        </div>
        <p
          className="md:col-span-4 md:col-start-9"
          style={{ color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.6 }}
        >
          {study.tldrSub ?? study.tldr}
        </p>
      </div>
    </Link>
  );
}

"use client";

import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedLink from "@/components/ui/AnimatedLink";

function ProjectCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <ScrollReveal delay={index * 0.07}>
      <Link
        href={`/work/${study.slug}`}
        className="group block"
      >
        {/* Image */}
        <div
          className="relative w-full overflow-hidden rounded-2xl mb-5"
          style={{ aspectRatio: "4 / 3" }}
        >
          {study.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={study.coverImage}
              alt={study.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-[--ease-out] group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className="h-full w-full flex items-center justify-center"
              style={{ background: study.accentColor }}
            >
              <span
                className="select-none font-medium leading-none opacity-[0.07]"
                style={{ fontFamily: "var(--font-display)", fontSize: "8rem", color: "var(--color-ink)" }}
              >
                {study.title[0]}
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-end opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "rgba(0,0,0,0.55)" }}>
            <p className="p-6 text-sm leading-relaxed text-white">
              {study.tldrSub ?? study.tldr}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-xs font-semibold tabular-nums"
            style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="label" style={{ color: "var(--color-muted)" }}>{study.type}</span>
          <span className="label" style={{ color: "var(--color-muted)" }}>{study.year}</span>
          {study.status !== "Real" && (
            <span className="label opacity-50">{study.status}</span>
          )}
        </div>

        {/* Title */}
        <h3
          className="leading-tight transition-colors duration-200 group-hover:text-[--color-accent]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)",
            letterSpacing: "-0.02em",
            color: "var(--color-ink)",
          }}
        >
          {study.title}
        </h3>

      </Link>
    </ScrollReveal>
  );
}

export default function ProjectGrid({ studies }: { studies: CaseStudy[] }) {
  return (
    <section className="section">
      <div className="container">
        {/* Section header */}
        <div className="mb-8 flex items-center justify-between">
          <span className="label">Selected Work</span>
          <AnimatedLink
            href="/work"
            className="label text-[--color-muted] transition-colors hover:text-[--color-ink]"
          >
            All projects →
          </AnimatedLink>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {studies.map((study, i) => (
            <ProjectCard key={study.slug} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

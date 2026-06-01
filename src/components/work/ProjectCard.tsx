import Link from "next/link";
import type { CaseStudy } from "@/lib/types";

export default function ProjectCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group block"
    >
      <div
        className="flex items-baseline justify-between pb-3 mb-4"
        style={{ borderBottom: "1px solid var(--rule)" }}
      >
        <span className="mono" style={{ fontSize: 10, color: "var(--mute)" }}>
          {study.type.toUpperCase()} · {study.year}
        </span>
        <span
          className="mono opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ fontSize: 10, color: "var(--tomato)" }}
        >
          OPEN →
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4 / 3", background: study.accentColor }}
      >
        {study.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={study.coverImage}
            alt={study.title}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[--ease-glide] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span
              className="select-none italic leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(5rem, 10vw, 8rem)",
                color: "var(--ink)",
                opacity: 0.08,
              }}
            >
              {study.title[0]}
            </span>
          </div>
        )}
      </div>

      <h3
        className="mt-5 transition-colors duration-300 group-hover:italic"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: "var(--ink)",
        }}
      >
        {study.title}
      </h3>

      <div
        className="mt-3 h-px origin-left transition-transform duration-[700ms] ease-[--ease-glide] scale-x-0 group-hover:scale-x-100"
        style={{ background: "var(--tomato)" }}
      />
    </Link>
  );
}

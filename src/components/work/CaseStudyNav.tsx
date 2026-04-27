import Link from "next/link";
import type { CaseStudy } from "@/lib/types";

function NavCard({
  study,
  direction,
}: {
  study: CaseStudy;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/work/${study.slug}`}
      className={`group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_-10px_rgba(26,23,20,0.14)] ${
        isPrev ? "" : "col-start-2 text-right"
      }`}
      style={{ background: study.accentColor }}
    >
      {/* Ghost letter */}
      <span
        aria-hidden
        className={`pointer-events-none absolute ${
          isPrev ? "-right-3 -bottom-5" : "-left-3 -bottom-5"
        } select-none font-medium leading-none opacity-[0.08]`}
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-ink)",
          fontSize: "clamp(5rem, 12vw, 9rem)",
        }}
      >
        {study.title[0]}
      </span>

      <span className="label block mb-4">
        {isPrev ? "← Previous" : "Next →"}
      </span>
      <span
        className="block text-xl font-medium leading-tight"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
      >
        {study.title}
      </span>
      <span className="mt-1.5 block text-sm text-[--color-muted]">
        {study.type}
      </span>
    </Link>
  );
}

export default function CaseStudyNav({
  prev,
  next,
}: {
  prev: CaseStudy | null;
  next: CaseStudy | null;
}) {
  return (
    <div className="border-t border-[--color-border]">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-4">
          {prev ? <NavCard study={prev} direction="prev" /> : <div />}
          {next ? <NavCard study={next} direction="next" /> : <div />}
        </div>
      </div>
    </div>
  );
}

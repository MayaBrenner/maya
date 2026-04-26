import Link from "next/link";
import type { CaseStudy } from "@/lib/types";

interface CaseStudyNavProps {
  prev: CaseStudy | null;
  next: CaseStudy | null;
}

export default function CaseStudyNav({ prev, next }: CaseStudyNavProps) {
  return (
    <div className="border-t border-[--color-border]">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group rounded-xl border border-[--color-border] p-6 transition-colors hover:border-[--color-ink]"
            >
              <span className="label block mb-2">← Previous</span>
              <span
                className="text-lg font-medium transition-colors group-hover:text-[--color-accent]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {prev.title}
              </span>
              <span className="block text-sm text-[--color-muted]">{prev.type}</span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group rounded-xl border border-[--color-border] p-6 text-right transition-colors hover:border-[--color-ink] col-start-2"
            >
              <span className="label block mb-2">Next →</span>
              <span
                className="text-lg font-medium transition-colors group-hover:text-[--color-accent]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {next.title}
              </span>
              <span className="block text-sm text-[--color-muted]">{next.type}</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

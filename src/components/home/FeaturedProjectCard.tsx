import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import Tag from "@/components/ui/Tag";

export default function FeaturedProjectCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group relative block overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(26,23,20,0.14)]"
      style={{ background: study.accentColor }}
    >
      <div className="relative aspect-video w-full overflow-hidden lg:aspect-[16/7]">
        {study.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={study.coverImage}
            alt={study.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden select-none"
          >
            <span
              className="translate-x-12 font-medium leading-none opacity-[0.06]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink)",
                fontSize: "clamp(14rem, 30vw, 22rem)",
              }}
            >
              {study.title[0]}
            </span>
          </span>
        )}

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
          <div className="mb-3 flex items-center gap-3">
            <Tag variant="accent">{study.type}</Tag>
            <span className="label">{study.year}</span>
          </div>
          <h3
            className="mb-2 font-medium leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-ink)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
            }}
          >
            {study.title}
          </h3>
          <p
            className="max-w-lg text-base line-clamp-2"
            style={{ color: "var(--color-muted)" }}
          >
            {study.tldr}
          </p>
          <div
            className="mt-5 flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-4"
            style={{ color: "var(--color-accent-dark)" }}
          >
            <span>View case study</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

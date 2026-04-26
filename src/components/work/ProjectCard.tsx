import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import Tag from "@/components/ui/Tag";

interface ProjectCardProps {
  study: CaseStudy;
}

export default function ProjectCard({ study }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group block overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1"
      style={{ background: study.accentColor }}
    >
      {/* Cover image placeholder */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden"
        style={{ background: study.accentColor }}
      >
        {study.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={study.coverImage}
            alt={study.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center opacity-30">
            <span
              className="text-6xl font-medium"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
            >
              {study.title[0]}
            </span>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2">
          <Tag>{study.type}</Tag>
          <span className="label">{study.year}</span>
        </div>
        <h3
          className="mb-1 text-xl font-medium"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
        >
          {study.title}
        </h3>
        <p className="text-sm text-[--color-muted] line-clamp-2">{study.tldr}</p>
      </div>
    </Link>
  );
}

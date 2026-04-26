import type { CaseStudy } from "@/lib/types";
import Tag from "@/components/ui/Tag";

interface CaseStudyHeaderProps {
  meta: CaseStudy;
}

const META_FIELDS = [
  { key: "role", label: "Role" },
  { key: "timeline", label: "Timeline" },
  { key: "status", label: "Status" },
] as const;

export default function CaseStudyHeader({ meta }: CaseStudyHeaderProps) {
  return (
    <div className="border-b border-[--color-border]">
      {/* Cover */}
      <div
        className="relative flex min-h-[55vh] items-end"
        style={{ background: meta.accentColor }}
      >
        {meta.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={meta.coverImage}
            alt={meta.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="relative container pb-12 pt-24">
          <div className="mb-4 flex flex-wrap gap-2">
            <Tag variant="accent">{meta.type}</Tag>
            {meta.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <h1
            className="max-w-3xl"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
          >
            {meta.title}
          </h1>
          <p className="mt-3 max-w-2xl text-xl text-[--color-muted]">{meta.subtitle}</p>
        </div>
      </div>

      {/* Meta strip */}
      <div className="container py-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {META_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <span className="label block mb-1">{label}</span>
              <span className="text-sm font-medium">{meta[key]}</span>
            </div>
          ))}
          <div>
            <span className="label block mb-1">Tools</span>
            <span className="text-sm font-medium">{meta.tools.join(", ")}</span>
          </div>
        </div>

        {/* TL;DR */}
        <div className="mt-8 rounded-xl border border-[--color-border] p-6">
          <span className="label block mb-2">TL;DR</span>
          <p className="text-lg leading-relaxed">{meta.tldr}</p>
        </div>
      </div>
    </div>
  );
}

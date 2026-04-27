"use client";

import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/types";
import Tag from "@/components/ui/Tag";

const EASE = [0.16, 1, 0.3, 1] as const;

const META_FIELDS = [
  { key: "role", label: "Role" },
  { key: "timeline", label: "Timeline" },
  { key: "status", label: "Status" },
] as const;

export default function CaseStudyHeader({ meta }: { meta: CaseStudy }) {
  return (
    <div className="border-b border-[--color-border]">
      {/* Cover */}
      <motion.div
        className="relative flex min-h-[55vh] items-end overflow-hidden"
        style={{ background: meta.accentColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {meta.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={meta.coverImage}
            alt={meta.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 select-none font-medium leading-none opacity-[0.055]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-ink)",
              fontSize: "clamp(12rem, 28vw, 22rem)",
            }}
          >
            {meta.title}
          </span>
        )}

        <motion.div
          className="relative container pb-12 pt-24"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
        >
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
        </motion.div>
      </motion.div>

      {/* Meta strip */}
      <motion.div
        className="container py-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}
      >
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

        <div className="mt-8 rounded-xl border border-[--color-border] p-6">
          <span className="label block mb-2">TL;DR</span>
          <p className="text-lg leading-relaxed">{meta.tldr}</p>
        </div>
      </motion.div>
    </div>
  );
}

import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import { getProjectTheme } from "@/lib/project-theme";
import { SHAPE_BY_NAME } from "@/components/ui/Shapes";

function NavCard({ study, direction }: { study: CaseStudy; direction: "prev" | "next" }) {
  const isPrev = direction === "prev";
  const theme = getProjectTheme(study.slug);
  const Shape = SHAPE_BY_NAME[theme.shape];
  return (
    <Link
      href={`/work/${study.slug}`}
      className={`group relative block overflow-hidden p-8 lg:p-10 card-edge ${isPrev ? "" : "md:col-start-2 md:text-right"}`}
      style={{ background: "var(--paper)" }}
    >
      <div className={`mono flex items-center gap-2 mb-5 ${isPrev ? "" : "md:justify-end"}`}
        style={{ fontSize: 11, color: theme.color, letterSpacing: "0.18em", fontWeight: 500 }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.color }} />
        {isPrev ? "← PREVIOUS" : "NEXT →"}
      </div>

      <div className={`flex items-end gap-4 flex-wrap ${isPrev ? "" : "md:justify-end"}`}>
        {!isPrev && <span><Shape size={32} fill={theme.color} strokeWidth={1.5} /></span>}
        <h3
          className={isPrev ? "text-left" : "md:text-right"}
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 500,
            fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
            color: "var(--ink)",
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
          }}
        >
          {study.title}
        </h3>
        {isPrev && <span><Shape size={32} fill={theme.color} strokeWidth={1.5} /></span>}
      </div>

      <div className={`mt-4 mono ${isPrev ? "" : "md:text-right"}`}
        style={{ fontSize: 10.5, color: "var(--ink-soft)", letterSpacing: "0.18em", fontWeight: 500 }}>
        {study.type.toUpperCase()} · {study.year}
      </div>
    </Link>
  );
}

function AllWorkCard({ direction }: { direction: "prev" | "next" }) {
  const isPrev = direction === "prev";
  return (
    <Link
      href="/work"
      className={`group flex flex-col justify-between p-8 lg:p-10 ${isPrev ? "" : "md:col-start-2 md:text-right"}`}
      style={{
        background: "var(--paper)",
        border: "1.5px solid var(--outline-soft)",
      }}
    >
      <span className="mono mb-5"
        style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.18em", fontWeight: 500 }}>
        {isPrev ? "← BACK" : "ALL →"}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
          color: "var(--ink)",
          letterSpacing: "-0.02em",
          lineHeight: 0.95,
        }}
      >
        Back to the <em className="italic" style={{ color: "var(--red)" }}>index</em>
      </h3>
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
    <section className="graph" style={{ background: "var(--paper)", borderTop: "1.5px solid var(--outline)", paddingTop: 80, paddingBottom: 80 }}>
      <div className="container">
        <div className="text-center mb-12">
          <span className="label" style={{ color: "var(--red)" }}>§ Continue Reading</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prev ? <NavCard study={prev} direction="prev" /> : <AllWorkCard direction="prev" />}
          {next ? <NavCard study={next} direction="next" /> : <AllWorkCard direction="next" />}
        </div>
      </div>
    </section>
  );
}

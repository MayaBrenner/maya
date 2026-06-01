import type { Metadata } from "next";
import Link from "next/link";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getProjectTheme } from "@/lib/project-theme";
import { SHAPE_BY_NAME } from "@/components/ui/Shapes";

export const metadata: Metadata = {
  title: "Work",
  description: "Product design case studies by Maya Brenner.",
};

const STRIP = ["var(--cobalt)", "var(--pink)", "var(--orange)", "var(--green)", "var(--yellow)", "var(--red)", "var(--cobalt)"];

export default function WorkPage() {
  const studies = getAllCaseStudies();
  return (
    <>
      {/* Top color strip */}
      <div style={{ borderBottom: "1.5px solid var(--outline)" }}>
        <div className="color-strip">
          {STRIP.map((c, i) => (<span key={i} style={{ background: c }} />))}
        </div>
      </div>

      {/* Page header */}
      <section className="container graph" style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div className="max-w-4xl">
          <div className="mono mb-6" style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.2em" }}>
            THE INDEX · {String(studies.length).padStart(2, "0")} CASES
          </div>
          <h1
            className="leading-[0.92]"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(3.5rem, 11vw, 11rem)",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            Selected <em className="italic" style={{ color: "var(--red)" }}>work</em>.
          </h1>
          <p
            className="mt-8 max-w-[44ch]"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
              lineHeight: 1.25,
              color: "var(--ink-soft)",
              letterSpacing: "-0.005em",
            }}
          >
            Five colored chapters across mobile, web, and brand — each a tiny universe.
          </p>
        </div>
      </section>

      {/* Card grid */}
      <section
        className="graph"
        style={{
          background: "var(--paper)",
          paddingTop: 60,
          paddingBottom: 130,
          borderTop: "1.5px solid var(--outline)",
        }}
      >
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {studies.map((study, i) => (
              <IndexCard key={study.slug} study={study} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function IndexCard({ study, index }: { study: ReturnType<typeof getAllCaseStudies>[number]; index: number }) {
  const theme = getProjectTheme(study.slug);
  const Shape = SHAPE_BY_NAME[theme.shape];
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link href={`/work/${study.slug}`} className="group block">
      {/* Top meta */}
      <div className="flex items-center justify-between pb-3 mb-4" style={{ borderBottom: "1.5px solid var(--outline)" }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--red)", letterSpacing: "0.18em", fontWeight: 500 }}>
          № {num}
        </span>
        <Shape size={20} fill={theme.color} strokeWidth={1.5} />
      </div>

      {/* Cover */}
      <div
        className="overflow-hidden card-edge"
        style={{ background: theme.color, aspectRatio: "4 / 3" }}
      >
        {study.coverImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={study.coverImage}
            alt={study.title}
            className="h-full w-full object-cover transition-transform duration-[1100ms] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "7rem", color: "var(--ink)", opacity: 0.16 }}>
              {study.title[0]}
            </span>
          </div>
        )}
      </div>

      {/* Title + meta */}
      <div className="mt-5">
        <h3
          className="transition-colors duration-300 group-hover:text-[--red]"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 500,
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            color: "var(--ink)",
            letterSpacing: "-0.015em",
            lineHeight: 1,
          }}
        >
          {study.title}
        </h3>
        <div
          className="mt-2 mono flex gap-2"
          style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.16em", fontWeight: 500 }}
        >
          <span>{study.type.toUpperCase()}</span>
          <span style={{ color: "var(--faint)" }}>·</span>
          <span>{study.year}</span>
        </div>
      </div>
    </Link>
  );
}

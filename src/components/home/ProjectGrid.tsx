import type { CaseStudy } from "@/lib/types";
import ProjectCard from "@/components/work/ProjectCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProjectGridProps {
  studies: CaseStudy[];
}

export default function ProjectGrid({ studies }: ProjectGridProps) {
  return (
    <section className="section border-t border-[--color-border]">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <h2
            className="text-3xl font-medium"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Selected Work
          </h2>
          <a
            href="/work"
            className="label text-[--color-muted] underline-offset-4 hover:text-[--color-ink] hover:underline"
          >
            All projects →
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {studies.map((study, i) => (
            <ScrollReveal key={study.slug} delay={i * 0.08}>
              <ProjectCard study={study} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

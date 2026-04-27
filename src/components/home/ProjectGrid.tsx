import type { CaseStudy } from "@/lib/types";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AnimatedLink from "@/components/ui/AnimatedLink";
import FeaturedProjectCard from "@/components/home/FeaturedProjectCard";
import ProjectCard from "@/components/work/ProjectCard";

interface ProjectGridProps {
  studies: CaseStudy[];
}

export default function ProjectGrid({ studies }: ProjectGridProps) {
  const [featured, ...rest] = studies;

  return (
    <section className="section border-t border-[--color-border]">
      <div className="container">
        {/* Section header */}
        <div className="mb-10 flex items-center justify-between">
          <span className="label">Selected Work</span>
          <AnimatedLink
            href="/work"
            className="label text-[--color-muted] transition-colors hover:text-[--color-ink]"
          >
            All projects →
          </AnimatedLink>
        </div>

        <div className="flex flex-col gap-5">
          {/* Featured card — full width */}
          {featured && (
            <ScrollReveal>
              <FeaturedProjectCard study={featured} />
            </ScrollReveal>
          )}

          {/* Remaining cards — 3-col grid */}
          {rest.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((study, i) => (
                <ScrollReveal key={study.slug} delay={(i + 1) * 0.07}>
                  <ProjectCard study={study} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

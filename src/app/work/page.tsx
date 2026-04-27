import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import FeaturedProjectCard from "@/components/home/FeaturedProjectCard";
import ProjectCard from "@/components/work/ProjectCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Work",
  description: "Product design case studies by Maya Brenner — mobile apps, web platforms, and brand identity.",
};

export default function WorkPage() {
  const studies = getAllCaseStudies();
  const [featured, ...rest] = studies;

  return (
    <div className="section container">
      <div className="mb-12">
        <span className="label block mb-4">Portfolio</span>
        <h1 style={{ fontFamily: "var(--font-display)" }}>Selected Work</h1>
        <p className="mt-4 max-w-xl text-lg text-[--color-muted]">
          Case studies spanning mobile apps, AI-powered web experiences, and brand identity systems.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {featured && (
          <ScrollReveal>
            <FeaturedProjectCard study={featured} />
          </ScrollReveal>
        )}

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
  );
}

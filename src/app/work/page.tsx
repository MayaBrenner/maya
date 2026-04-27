import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import FeaturedProjectCard from "@/components/home/FeaturedProjectCard";
import ProjectCard from "@/components/work/ProjectCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Work",
  description: "Product design case studies by Maya Brenner — mobile apps, web platforms, and brand identity.",
};

export default function WorkPage() {
  const studies = getAllCaseStudies();
  const [featured, ...rest] = studies;

  return (
    <>
      <PageHeader
        label="Portfolio"
        title="Selected Work"
        description="Case studies spanning mobile apps, AI-powered web experiences, and brand identity systems."
      />

      <div className="container pb-16 lg:pb-24">
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
    </>
  );
}

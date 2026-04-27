import HeroSection from "@/components/home/HeroSection";
import ProjectGrid from "@/components/home/ProjectGrid";
import AnimatedLink from "@/components/ui/AnimatedLink";
import { getAllCaseStudies } from "@/lib/case-studies";

export default function HomePage() {
  const studies = getAllCaseStudies();
  return (
    <>
      <HeroSection />

      <section className="border-y border-[--color-border] py-7">
        <div className="container flex flex-wrap items-center gap-x-10 gap-y-3 text-sm text-[--color-muted]">
          <span>
            <strong className="font-medium text-[--color-ink]">4 years</strong> running a design-led brand
          </span>
          <span className="hidden sm:inline text-[--color-border]">·</span>
          <span>
            <strong className="font-medium text-[--color-ink]">{studies.length} case studies</strong> across mobile, web &amp; brand
          </span>
          <span className="hidden sm:inline text-[--color-border]">·</span>
          <span>Tel Aviv &mdash; <AnimatedLink href="/about" className="text-[--color-ink]">open to remote</AnimatedLink></span>
        </div>
      </section>

      <ProjectGrid studies={studies} />
    </>
  );
}

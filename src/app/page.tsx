import HeroSection from "@/components/home/HeroSection";
import ProjectGrid from "@/components/home/ProjectGrid";
import CTASection from "@/components/home/CTASection";
import { getAllCaseStudies } from "@/lib/case-studies";

export default function HomePage() {
  const studies = getAllCaseStudies();
  return (
    <>
      <HeroSection />
      <ProjectGrid studies={studies} />
      <CTASection />
    </>
  );
}

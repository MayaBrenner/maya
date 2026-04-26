import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCaseStudies, getCaseStudyBySlug, getAdjacentCaseStudies } from "@/lib/case-studies";
import CaseStudyHeader from "@/components/work/CaseStudyHeader";
import CaseStudyNav from "@/components/work/CaseStudyNav";
import { mdxComponents } from "@/components/mdx/MDXComponents";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCaseStudies().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = getCaseStudyBySlug(slug);
  if (!result) return {};
  return {
    title: result.meta.title,
    description: result.meta.tldr,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const result = getCaseStudyBySlug(slug);
  if (!result) notFound();

  const { meta, content } = result;
  const { prev, next } = getAdjacentCaseStudies(slug);

  return (
    <article>
      <CaseStudyHeader meta={meta} />

      <div className="container py-16">
        <div className="prose mx-auto max-w-3xl">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </div>

      <CaseStudyNav prev={prev} next={next} />
    </article>
  );
}

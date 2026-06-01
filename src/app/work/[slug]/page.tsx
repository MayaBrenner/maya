import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { getAllCaseStudies, getCaseStudyBySlug, getAdjacentCaseStudies } from "@/lib/case-studies";
import CaseStudyHeader from "@/components/work/CaseStudyHeader";
import CaseStudyNav from "@/components/work/CaseStudyNav";
import ReadingProgress from "@/components/ui/ReadingProgress";
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
  return { title: result.meta.title, description: result.meta.tldr };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const result = getCaseStudyBySlug(slug);
  if (!result) notFound();

  const { meta, content } = result;
  const { prev, next } = getAdjacentCaseStudies(slug);

  return (
    <article>
      <ReadingProgress />

      {/* Back link */}
      <div className="container pt-6 pb-2">
        <Link
          href="/work"
          className="mono inline-flex items-center gap-2"
          style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.18em", fontWeight: 500 }}
        >
          <span style={{ color: "var(--red)" }}>←</span> BACK TO INDEX
        </Link>
      </div>

      <CaseStudyHeader meta={meta} />

      {/* Prose body */}
      <section className="graph" style={{ background: "var(--paper)", paddingTop: 40, paddingBottom: 120 }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">
            <div className="md:col-span-9 md:col-start-3 prose">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <CaseStudyNav prev={prev} next={next} />
    </article>
  );
}

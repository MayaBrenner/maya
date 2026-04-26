import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CaseStudy } from "./types";

const CASE_STUDIES_DIR = path.join(process.cwd(), "src/content/case-studies");

export function getAllCaseStudies(): CaseStudy[] {
  const files = fs.readdirSync(CASE_STUDIES_DIR).filter((f) => f.endsWith(".mdx"));

  const studies = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(CASE_STUDIES_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return { slug, ...(data as Omit<CaseStudy, "slug">) };
  });

  return studies.sort((a, b) => a.order - b.order);
}

export function getCaseStudyBySlug(slug: string): { meta: CaseStudy; content: string } | null {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: { slug, ...(data as Omit<CaseStudy, "slug">) },
    content,
  };
}

export function getAdjacentCaseStudies(
  slug: string
): { prev: CaseStudy | null; next: CaseStudy | null } {
  const all = getAllCaseStudies();
  const idx = all.findIndex((s) => s.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

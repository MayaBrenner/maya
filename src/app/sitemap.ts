import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";

const BASE = "https://mayabrenner.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const studies = getAllCaseStudies();

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    ...studies.map((s) => ({
      url: `${BASE}/work/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  type: string;
  status: "Speculative" | "Real" | "Concept";
  year: number;
  role: string;
  timeline: string;
  tools: string[];
  coverImage: string;
  bannerImage?: string;
  accentColor: string;
  order: number;
  tldr: string;
  tldrSub?: string;
  tags: string[];
}

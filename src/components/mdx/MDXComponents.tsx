import Callout from "./Callout";
import ProcessTimeline, { Step } from "./ProcessTimeline";
import ArtifactGrid from "./ArtifactGrid";

export const mdxComponents = {
  Callout,
  ProcessTimeline,
  Step,
  ArtifactGrid,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="mt-12 mb-4 text-2xl font-medium"
      style={{ fontFamily: "var(--font-display)" }}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className="mt-8 mb-3 text-xl font-medium"
      style={{ fontFamily: "var(--font-display)" }}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mb-6 text-[17px] leading-[1.75] text-[--color-ink]" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mb-6 list-disc pl-6 space-y-2" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="mb-6 list-decimal pl-6 space-y-2" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 pl-5 text-lg italic text-[--color-muted]"
      style={{ borderColor: "var(--color-accent)" }}
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ""}
      className="my-8 w-full rounded-xl border border-[--color-border]"
      loading="lazy"
    />
  ),
  hr: () => <hr className="my-12 border-[--color-border]" />,
};

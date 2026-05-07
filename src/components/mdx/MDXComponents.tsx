import Callout from "./Callout";
import ProcessTimeline, { Step } from "./ProcessTimeline";
import ArtifactGrid from "./ArtifactGrid";
import ArtifactImage from "./ArtifactImage";
import ImageGrid from "./ImageGrid";
import Metrics, { Metric } from "./Metrics";
import ColorPalette, { Swatch } from "./ColorPalette";
import SplitView from "./SplitView";
import InteractivePrototype from "./InteractivePrototype";
import PhonePair from "./PhonePair";

export const mdxComponents = {
  // Custom MDX components
  Callout,
  ProcessTimeline,
  Step,
  ArtifactGrid,
  ArtifactImage,
  ImageGrid,
  Metrics,
  Metric,
  ColorPalette,
  Swatch,
  SplitView,
  InteractivePrototype,
  PhonePair,

  // HTML element overrides
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <div className="mt-14 mb-5">
      <div className="mb-3 h-px w-8" style={{ background: "var(--color-accent)" }} />
      <h2 {...props} className="text-2xl font-medium" style={{ fontFamily: "var(--font-display)" }}>
        {children}
      </h2>
    </div>
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
    <ul
      {...props}
      className="mb-6 space-y-2 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.6em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-[--color-accent] [&>li]:before:content-['']"
      style={{ listStyle: "none" }}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="mb-6 list-decimal pl-6 space-y-2 marker:text-[--color-accent]" />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-semibold text-[--color-ink]" />
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

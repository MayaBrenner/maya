import Callout from "./Callout";
import CoreFlowGrid, { CoreFlowStep } from "./CoreFlowGrid";
import ProcessTimeline, { Step } from "./ProcessTimeline";
import ArtifactGrid from "./ArtifactGrid";
import ArtifactImage from "./ArtifactImage";
import ImageGrid from "./ImageGrid";
import Metrics, { Metric } from "./Metrics";
import ColorPalette, { Swatch } from "./ColorPalette";
import SplitView from "./SplitView";
import InteractivePrototype from "./InteractivePrototype";
import FlowSwitcher, { Flow } from "./FlowSwitcher";
import PhonePair from "./PhonePair";
import Carousel, { CarouselSlide } from "./Carousel";
import MasonryGrid, { MasonryImage } from "./MasonryGrid";
import PainPoints, { PainPoint } from "./PainPoints";
import {
  HAContext, HASellerStrip, HAStatus, HAHandoff, HAJourney,
  MBContext, ScoutPrivacy, ScoutType, ScoutButton, MBJourney,
  CDContext, CDSpecs, CDReasons, CDExpert, CDJourney,
  IDContext, IDOWorkspace, IDOSeating, IDOType, IDJourney,
} from "@/components/case-studies/ux";

export const mdxComponents = {
  /* UX-decision annotated specimens + walk-throughs (one set per case study) */
  HAContext, HASellerStrip, HAStatus, HAHandoff, HAJourney,
  MBContext, ScoutPrivacy, ScoutType, ScoutButton, MBJourney,
  CDContext, CDSpecs, CDReasons, CDExpert, CDJourney,
  IDContext, IDOWorkspace, IDOSeating, IDOType, IDJourney,
  Callout,
  CoreFlowGrid,
  CoreFlowStep,
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
  FlowSwitcher,
  Flow,
  PhonePair,
  Carousel,
  CarouselSlide,
  MasonryGrid,
  MasonryImage,
  PainPoints,
  PainPoint,

  /* H2 — just the italic Cormorant heading text */
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
        fontWeight: 500,
        fontStyle: "italic",
        letterSpacing: "-0.015em",
        lineHeight: 1,
        color: "var(--ink)",
        marginTop: "5rem",
        marginBottom: "1.25rem",
      }}
    >
      {children}
    </h2>
  ),

  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className="mt-10 mb-3"
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        lineHeight: 1.1,
        color: "var(--ink)",
      }}
    />
  ),

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className="mb-6"
      style={{
        fontSize: 18,
        lineHeight: 1.7,
        color: "var(--ink)",
      }}
    />
  ),

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mb-6 space-y-1 pl-0" style={{ listStyle: "none" }} />
  ),

  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="mb-6 space-y-1 pl-0" style={{ counterReset: "ol-counter" }} />
  ),

  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} style={{ fontWeight: 600, color: "var(--ink)" }} />
  ),

  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="italic" style={{ fontFamily: "var(--font-serif)", color: "var(--ink)" }} />
  ),

  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="my-10"
      style={{
        borderLeft: "2px solid var(--red)",
        padding: "0.1em 0 0.1em 1.5rem",
        fontFamily: "var(--font-serif)",
        fontStyle: "italic",
        fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)",
        fontWeight: 400,
        lineHeight: 1.25,
        color: "var(--ink)",
        letterSpacing: "-0.01em",
      }}
    />
  ),

  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      style={{
        color: "var(--red)",
        backgroundImage: "linear-gradient(currentColor, currentColor)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 100%",
        backgroundSize: "100% 1px",
        transition: "background-size 220ms var(--ease-glide)",
      }}
    />
  ),

  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      {...props}
      alt={props.alt ?? ""}
      className="my-10 w-full"
      loading="lazy"
      style={{
        border: "1.5px solid var(--outline)",
        borderRadius: 4,
      }}
    />
  ),

  hr: () => (
    <hr
      style={{
        border: "none",
        margin: "3.5em auto",
        height: 16,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 16'><g stroke='%231A1714' stroke-width='1'><circle cx='84' cy='8' r='3' fill='%23E33A1A'/><circle cx='100' cy='8' r='3' fill='%23F5C518'/><circle cx='116' cy='8' r='3' fill='%232E66C8'/></g></svg>\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "200px 16px",
      }}
    />
  ),
};

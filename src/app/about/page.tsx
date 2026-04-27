import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "About",
  description: "Maya Brenner — product designer based in Tel Aviv, bridging print craft with digital UX.",
};

const TOOLS = ["Figma", "Framer", "Protopie", "Spline", "Principle", "After Effects", "Illustrator", "Photoshop"];

const TIMELINE = [
  { year: "2020", event: "Founded Mayul Studio — a premium stationery brand in Tel Aviv" },
  { year: "2021", event: "Grew Mayul Studio to an internationally shipping online brand" },
  { year: "2022–24", event: "Deepened expertise in brand identity, print production, and visual systems" },
  { year: "2025", event: "Began transition to product design — studying UX methodology, mobile and web platforms" },
  { year: "2026", event: "Seeking product design roles at tech companies" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="From tactile to digital — with the same precision."
      />

      <div className="container pb-16 lg:pb-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_360px]">
          {/* Left — narrative */}
          <div>
            <ScrollReveal>
              <div className="prose">
                <p>
                  I spent years building Mayul Studio into a premium stationery brand — designing
                  for humans who hold things, touch things, and feel things. That work trained me
                  to think about information hierarchy, tactile feedback loops, and emotional
                  resonance in ways that translate directly to digital products.
                </p>
                <p>
                  Print design taught me that every millimeter is a decision. That constraint
                  produces a certain kind of rigor — and I bring that same rigor to every screen
                  I design.
                </p>
                <p>
                  Now I channel that precision into digital product design: building apps, systems,
                  and experiences where craft and function are inseparable. I design for people
                  who deserve thoughtful, considered products — not just functional ones.
                </p>
              </div>
            </ScrollReveal>

            {/* Timeline */}
            <ScrollReveal delay={0.1}>
              <h2
                className="mt-16 mb-8"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 500 }}
              >
                Timeline
              </h2>
              <div className="space-y-0 divide-y divide-[--color-border]">
                {TIMELINE.map(({ year, event }) => (
                  <div key={year} className="flex gap-8 py-5">
                    <span className="label w-16 shrink-0 pt-0.5">{year}</span>
                    <span className="text-[--color-ink]">{event}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Tools */}
            <ScrollReveal delay={0.15}>
              <h2
                className="mt-16 mb-6"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 500 }}
              >
                Tools
              </h2>
              <div className="flex flex-wrap gap-3">
                {TOOLS.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-[--color-border] px-4 py-1.5 text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right — sidebar */}
          <ScrollReveal delay={0.05}>
            <div className="rounded-2xl border border-[--color-border] bg-[--color-surface] p-8">
              {/* Photo placeholder */}
              <div
                className="relative mb-6 aspect-square w-full overflow-hidden rounded-xl bg-[--color-mayul]"
                aria-label="Portrait placeholder"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-4 -right-4 select-none text-[8rem] font-medium leading-none opacity-[0.07]"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
                >
                  M
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-end p-5 select-none"
                >
                  <span
                    className="text-xs text-[--color-muted] opacity-60 leading-snug"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    photo coming soon
                  </span>
                </span>
              </div>

              <h3
                className="mb-1 text-xl font-medium"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Maya Brenner
              </h3>
              <p className="mb-2 text-sm text-[--color-muted]">Product Designer</p>
              <p className="mb-6 text-sm text-[--color-muted] flex items-center gap-1.5">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--color-accent)" }}
                />
                Tel Aviv, Israel
              </p>

              <div className="space-y-3">
                <Button href="/contact" className="w-full justify-center">
                  Get in touch
                </Button>
                <Button
                  href="/resume-maya-brenner-2026.pdf"
                  variant="secondary"
                  external
                  className="w-full justify-center"
                >
                  Download resume ↓
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}

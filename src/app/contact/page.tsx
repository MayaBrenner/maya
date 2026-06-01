import type { Metadata } from "next";
import Link from "next/link";
import { Daisy, Sparkle4, Star8 } from "@/components/ui/Shapes";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Maya Brenner, product designer based in Tel Aviv.",
};

const EMAIL = "mayabrenner8@gmail.com";

const LINKS = [
  { label: "Email",     value: EMAIL,                       href: `mailto:${EMAIL}`,                                  color: "var(--red)" },
  { label: "LinkedIn",  value: "/in/maya-brenner-717a43184", href: "https://www.linkedin.com/in/maya-brenner-717a43184", color: "var(--cobalt)", external: true },
  { label: "Instagram", value: "@mayul.studio",              href: "https://instagram.com/mayul.studio",                color: "var(--pink)",   external: true },
];

const STRIP = ["var(--pink)", "var(--yellow)", "var(--cobalt)", "var(--green)", "var(--orange)", "var(--red)", "var(--pink)"];

export default function ContactPage() {
  return (
    <article>
      {/* Top color strip */}
      <div style={{ borderBottom: "1.5px solid var(--outline)" }}>
        <div className="color-strip">
          {STRIP.map((c, i) => (<span key={i} style={{ background: c }} />))}
        </div>
      </div>

      {/* Hero */}
      <section className="container graph relative" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="absolute spin-slow pointer-events-none" style={{ top: "16%", right: "8%" }}>
          <Daisy size={84} fill="var(--pink)" strokeWidth={1.5} />
        </div>
        <div className="absolute wiggle pointer-events-none" style={{ bottom: "20%", left: "8%" }}>
          <Star8 size={56} fill="var(--yellow)" strokeWidth={1.5} />
        </div>

        <div className="max-w-4xl">
          <div className="mono mb-6" style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.2em" }}>
            CORRESPONDENCE · CHAPTER III
          </div>
          <h1
            className="leading-[0.92]"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(3.5rem, 11vw, 11rem)",
              color: "var(--ink)",
              letterSpacing: "-0.025em",
            }}
          >
            Write a <em className="italic" style={{ color: "var(--red)" }}>letter</em>.
          </h1>
          <p
            className="mt-8 max-w-[44ch]"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
              lineHeight: 1.25,
              color: "var(--ink-soft)",
            }}
          >
            Currently open to full-time product roles and select consulting. Quietly chatty about brand, type, and the right radius for a button.
          </p>
        </div>
      </section>

      {/* Big email — minimal, refined */}
      <section className="graph" style={{ background: "var(--paper)", paddingTop: 60, paddingBottom: 60, borderTop: "1.5px solid var(--outline)" }}>
        <div className="container">
          <div className="text-center">
            <span className="label" style={{ color: "var(--red)" }}>§ Write to</span>
          </div>
          <a
            href={`mailto:${EMAIL}`}
            className="group block mt-6 text-center under-tomato"
          >
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                fontSize: "clamp(2rem, 6.5vw, 6rem)",
                color: "var(--ink)",
                letterSpacing: "-0.025em",
                lineHeight: 1,
                wordBreak: "break-word",
                borderBottom: "2px solid var(--ink)",
                paddingBottom: 4,
                transition: "color 280ms",
              }}
            >
              {EMAIL}
            </span>
          </a>
          <div className="text-center mt-5">
            <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-soft)", letterSpacing: "0.18em" }}>
              CLICK TO COMPOSE ↗
            </span>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="graph" style={{ background: "var(--paper)", paddingTop: 80, paddingBottom: 100, borderTop: "1.5px solid var(--outline)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <Sparkle4 size={28} fill="var(--red)" className="mx-auto mb-3" />
            <span className="label">Other Channels</span>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group block p-7 card-edge transition-colors"
                  style={{ background: "var(--paper)" }}
                >
                  <span
                    className="mono inline-flex items-center gap-2 mb-4"
                    style={{ fontSize: 10.5, color: l.color, letterSpacing: "0.18em", fontWeight: 500 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: l.color }} />
                    {l.label.toUpperCase()}
                  </span>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 500,
                      fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                      color: "var(--ink)",
                      wordBreak: "break-word",
                    }}
                  >
                    {l.value}
                  </div>
                  <div className="mt-4 transition-transform duration-300 group-hover:translate-x-1"
                    style={{ fontSize: 18, color: l.color }}>
                    →
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Studio */}
      <section className="graph" style={{ background: "var(--paper)", paddingTop: 80, paddingBottom: 120, borderTop: "1.5px solid var(--outline)" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              color: "var(--ink)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}
          >
            Working at <em className="italic" style={{ color: "var(--red)" }}>GMT+2</em>. Replies usually within a day.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 mono"
            style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.18em" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--red)" }} />
            OPEN TO WORK · 2026
          </div>
        </div>
      </section>
    </article>
  );
}

import Link from "next/link";
import { Sparkle4 } from "@/components/ui/Shapes";

const NAV = [
  { label: "Work",    href: "/work" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/maya-brenner-717a43184" },
  { label: "Instagram", href: "https://instagram.com/mayul.studio" },
  { label: "Email",     href: "mailto:mayabrenner8@gmail.com" },
];

const STRIP = ["var(--green)", "var(--pink)", "var(--orange)", "var(--cobalt)", "var(--green)", "var(--pink)", "var(--orange)"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative mt-auto"
      style={{
        background: "var(--paper)",
        color: "var(--ink)",
        borderTop: "1.5px solid var(--outline)",
        overflow: "hidden",
      }}
    >
      {/* Top color strip */}
      <div style={{ borderBottom: "1.5px solid var(--outline)" }}>
        <div className="color-strip">
          {STRIP.map((c, i) => (<span key={i} style={{ background: c }} />))}
        </div>
      </div>

      {/* Wordmark */}
      <div className="container pt-20 pb-10">
        <div className="flex items-center gap-5">
          <span className="spin-slow inline-block">
            <Sparkle4 size={42} fill="var(--red)" strokeWidth={1.5} />
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(3.5rem, 12vw, 13rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            Maya <em className="italic">Brenner</em><span style={{ color: "var(--red)" }}>.</span>
          </h2>
        </div>
      </div>

      {/* Index */}
      <div className="container">
        <div
          className="grid grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-6 pt-12 pb-10"
          style={{ borderTop: "1.5px solid var(--outline)" }}
        >
          {/* Studio */}
          <div className="col-span-2 md:col-span-5">
            <span className="label" style={{ color: "var(--ink-soft)" }}>§ Studio</span>
            <p
              className="mt-4"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "var(--ink)",
                letterSpacing: "-0.01em",
                maxWidth: "32ch",
              }}
            >
              An independent practice in <em className="italic">Tel Aviv</em>, drawing things that feel alive.
            </p>
          </div>

          {/* Pages */}
          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <span className="label" style={{ color: "var(--ink-soft)" }}>§ Pages</span>
            <nav className="mt-4 flex flex-col gap-2">
              {NAV.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="group inline-block w-fit transition-colors duration-300 hover:text-[--red]"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 22, lineHeight: 1.3, color: "var(--ink)" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="col-span-1 md:col-span-2">
            <span className="label" style={{ color: "var(--ink-soft)" }}>§ Connect</span>
            <nav className="mt-4 flex flex-col gap-2">
              {SOCIAL.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="group inline-block w-fit transition-colors duration-300 hover:text-[--red]"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 22, lineHeight: 1.3, color: "var(--ink)" }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Status */}
          <div className="col-span-2 md:col-span-3 md:col-start-11">
            <span className="label" style={{ color: "var(--ink-soft)" }}>§ Now</span>
            <div className="mt-4 flex items-center gap-2 mono" style={{ fontSize: 11, color: "var(--ink)", letterSpacing: "0.16em" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--red)" }} />
              OPEN TO WORK · 2026
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="container">
        <div
          className="mono flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between py-5"
          style={{
            borderTop: "1.5px solid var(--outline)",
            fontSize: 10,
            color: "var(--ink-soft)",
            letterSpacing: "0.16em",
          }}
        >
          <span>© {year} MAYA BRENNER · ALL RIGHTS RESERVED</span>
          <span>TEL AVIV — 32°N 34°E</span>
        </div>
      </div>
    </footer>
  );
}

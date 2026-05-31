import Link from "next/link";
import AnimatedLink from "@/components/ui/AnimatedLink";

const NAV = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/maya-brenner-717a43184" },
  { label: "Instagram", href: "https://instagram.com/mayul.studio" },
  { label: "Email", href: "mailto:mayabrenner8@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[--color-border] pt-12 pb-8">
      <div className="container">
        {/* Top row */}
        <div className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="block text-lg font-medium tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Maya Brenner
            </Link>
            <p className="mt-2 max-w-[22ch] text-sm text-[--color-muted]">
              Product designer.<br />Digital product.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex gap-16">
            <div>
              <span className="label block mb-4">Pages</span>
              <nav className="flex flex-col gap-3">
                {NAV.map(({ label, href }) => (
                  <AnimatedLink
                    key={href}
                    href={href}
                    className="text-sm text-[--color-muted] hover:text-[--color-ink]"
                  >
                    {label}
                  </AnimatedLink>
                ))}
              </nav>
            </div>
            <div>
              <span className="label block mb-4">Connect</span>
              <nav className="flex flex-col gap-3">
                {SOCIAL.map(({ label, href }) => (
                  <AnimatedLink
                    key={href}
                    href={href}
                    external={!href.startsWith("mailto")}
                    className="text-sm text-[--color-muted] hover:text-[--color-ink]"
                  >
                    {label}
                  </AnimatedLink>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-2 border-t border-[--color-border] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-[--color-muted]">
            © {new Date().getFullYear()} Maya Brenner. All rights reserved.
          </span>
          <span className="text-xs text-[--color-muted]">
            Tel Aviv, Israel
          </span>
        </div>
      </div>
    </footer>
  );
}

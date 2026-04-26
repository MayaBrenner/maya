"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedLink from "@/components/ui/AnimatedLink";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[--color-border] bg-[--color-bg]/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Maya Brenner
        </Link>

        <nav className="flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <AnimatedLink
              key={href}
              href={href}
              className={`text-sm transition-colors ${
                pathname.startsWith(href)
                  ? "text-[--color-ink]"
                  : "text-[--color-muted] hover:text-[--color-ink]"
              }`}
            >
              {label}
            </AnimatedLink>
          ))}
          <a
            href="/resume-maya-brenner-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="label rounded-full border border-[--color-border] px-4 py-1.5 transition-colors hover:border-[--color-ink] hover:text-[--color-ink]"
          >
            Resume ↓
          </a>
        </nav>
      </div>
    </header>
  );
}

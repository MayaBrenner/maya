"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLink from "@/components/ui/AnimatedLink";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[--color-border] bg-[--color-bg]/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-lg font-medium tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
          onClick={() => setMobileOpen(false)}
        >
          Maya Brenner
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[6px] p-2 -mr-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            className="block h-px w-6 bg-[--color-ink]"
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: "50%", originY: "50%" }}
          />
          <motion.span
            className="block h-px w-6 bg-[--color-ink]"
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block h-px w-6 bg-[--color-ink]"
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: "50%", originY: "50%" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden overflow-hidden border-t border-[--color-border] bg-[--color-bg]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="container flex flex-col gap-1 py-4">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 text-xl font-medium transition-colors ${
                    pathname.startsWith(href)
                      ? "text-[--color-ink]"
                      : "text-[--color-muted] hover:text-[--color-ink]"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {label}
                </Link>
              ))}
              <a
                href="/resume-maya-brenner-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="label mt-3 self-start rounded-full border border-[--color-border] px-4 py-1.5 transition-colors hover:border-[--color-ink] hover:text-[--color-ink]"
                onClick={() => setMobileOpen(false)}
              >
                Resume ↓
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

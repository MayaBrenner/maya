"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle4 } from "@/components/ui/Shapes";

const NAV_LINKS = [
  { label: "Home",  href: "/",      color: "var(--red)"    },
  { label: "Work",  href: "/work",  color: "var(--cobalt)" },
  { label: "About", href: "/about", color: "var(--orange)" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4">
      <div
        className="mx-auto flex items-center justify-between gap-4 transition-all duration-500"
        style={{
          maxWidth: 1280,
          background: "var(--paper)",
          border: "1.5px solid var(--outline)",
          borderRadius: 999,
          padding: "8px 14px 8px 22px",
          boxShadow: scrolled ? "0 6px 20px rgba(26,23,20,0.08)" : "none",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3 group leading-none"
          onClick={() => setMobileOpen(false)}
        >
          <span className="spin-slow inline-block">
            <Sparkle4 size={22} fill="var(--red)" strokeWidth={1.5} />
          </span>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: 22,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              lineHeight: 1,
            }}
          >
            Maya Brenner
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href, color }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <NavPill key={href} href={href} color={color} active={active}>
                {label}
              </NavPill>
            );
          })}
          {/* Open-to-work indicator */}
          <span
            className="ml-2 flex items-center gap-2 mono px-3 py-1.5 rounded-full"
            style={{
              background: "var(--yellow)",
              border: "1.5px solid var(--ink)",
              fontSize: 10,
              color: "var(--ink)",
              fontWeight: 500,
              letterSpacing: "0.14em",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--red)" }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            OPEN · 2026
          </span>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <motion.span className="block h-[1.5px] w-6" style={{ background: "var(--ink)" }}
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} initial={false} />
          <motion.span className="block h-[1.5px] w-6" style={{ background: "var(--ink)" }}
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} initial={false} />
          <motion.span className="block h-[1.5px] w-6" style={{ background: "var(--ink)" }}
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} initial={false} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden mt-3 mx-auto overflow-hidden"
            style={{
              maxWidth: 1280,
              background: "var(--paper)",
              border: "1.5px solid var(--outline)",
              borderRadius: 18,
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map(({ label, href, color }, i) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-4 px-5 py-4 rounded-xl"
                      style={{
                        background: active ? color : "transparent",
                        color: active && (color === "var(--cobalt)") ? "var(--paper)" : "var(--ink)",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 32, lineHeight: 1 }}>
                        {label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavPill({
  href,
  children,
  color,
  active,
}: {
  href: string;
  children: React.ReactNode;
  color: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className="relative inline-flex items-center px-4 py-2 rounded-full transition-colors duration-300"
      style={{
        background: active ? color : "transparent",
        color: active && color === "var(--cobalt)" ? "var(--paper)" : "var(--ink)",
      }}
    >
      <motion.span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: color, opacity: 0 }}
        whileHover={{ opacity: active ? 1 : 0.15 }}
        transition={{ duration: 0.2 }}
      />
      <span
        className="relative"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          fontStyle: active ? "italic" : "normal",
          fontSize: 18,
          letterSpacing: "-0.005em",
          lineHeight: 1,
        }}
      >
        {children}
      </span>
    </Link>
  );
}

import AnimatedLink from "@/components/ui/AnimatedLink";

export default function Footer() {
  return (
    <footer className="border-t border-[--color-border] py-10">
      <div className="container flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <span
          className="text-sm text-[--color-muted]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          © {new Date().getFullYear()} Maya Brenner
        </span>

        <nav className="flex items-center gap-6 text-sm text-[--color-muted]">
          <AnimatedLink href="https://linkedin.com/in/mayabrenner" external className="hover:text-[--color-ink]">
            LinkedIn
          </AnimatedLink>
          <AnimatedLink href="https://instagram.com/mayul.studio" external className="hover:text-[--color-ink]">
            Instagram
          </AnimatedLink>
          <AnimatedLink href="mailto:hello@mayabrenner.com" className="hover:text-[--color-ink]">
            Email
          </AnimatedLink>
        </nav>
      </div>
    </footer>
  );
}

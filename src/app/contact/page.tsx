import type { Metadata } from "next";
import AnimatedLink from "@/components/ui/AnimatedLink";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Maya Brenner, product designer based in Tel Aviv.",
};

const LINKS = [
  { label: "Email", value: "hello@mayabrenner.com", href: "mailto:hello@mayabrenner.com" },
  { label: "LinkedIn", value: "linkedin.com/in/mayabrenner", href: "https://linkedin.com/in/mayabrenner" },
  { label: "Instagram", value: "@mayul.studio", href: "https://instagram.com/mayul.studio" },
];

export default function ContactPage() {
  return (
    <div className="section container">
      <div className="max-w-2xl">
        <span className="label block mb-6">Contact</span>
        <h1 className="mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Let's work together.
        </h1>
        <p className="mb-12 text-lg text-[--color-muted]">
          I'm currently open to full-time product design roles and select freelance projects.
          Whether you have a role in mind or just want to chat — reach out.
        </p>

        <div className="space-y-6">
          {LINKS.map(({ label, value, href }) => (
            <div
              key={label}
              className="flex items-center justify-between border-b border-[--color-border] pb-6"
            >
              <span className="label">{label}</span>
              <AnimatedLink
                href={href}
                external={!href.startsWith("mailto")}
                className="text-lg font-medium text-[--color-ink] hover:text-[--color-accent]"
              >
                {value}
              </AnimatedLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

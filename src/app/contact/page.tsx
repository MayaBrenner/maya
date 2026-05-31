import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Maya Brenner, product designer based in Tel Aviv.",
};

const LINKS = [
  {
    label: "Email",
    value: "mayabrenner8@gmail.com",
    href: "mailto:mayabrenner8@gmail.com",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/maya-brenner-717a43184",
    href: "https://www.linkedin.com/in/maya-brenner-717a43184",
    external: true,
  },
  {
    label: "Instagram",
    value: "@mayul.studio",
    href: "https://instagram.com/mayul.studio",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's work together."
        description="I'm currently open to full-time product design roles and select freelance projects."
      />

      <div className="container pb-16 lg:pb-24">
        <div className="max-w-2xl">
          <div className="divide-y divide-[--color-border]">
            {LINKS.map(({ label, value, href, external }) => (
              <Link
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center justify-between py-6 transition-colors hover:text-[--color-accent]"
              >
                <span className="label transition-colors group-hover:text-[--color-accent]">
                  {label}
                </span>
                <span className="flex items-center gap-3 text-lg font-medium" style={{ fontFamily: "var(--font-display)" }}>
                  {value}
                  <span className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-12 text-sm text-[--color-muted]">
            Prefer to send a message? Whether you have a role in mind or just want to chat —
            reach out directly at{" "}
            <Link
              href="mailto:mayabrenner8@gmail.com"
              className="text-[--color-ink] underline underline-offset-4 decoration-[--color-border] hover:decoration-[--color-accent] transition-colors"
            >
              mayabrenner8@gmail.com
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}

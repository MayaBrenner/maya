"use client";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
}

export default function Tag({ children, variant = "default" }: TagProps) {
  return (
    <span
      className="label inline-block rounded-full px-3 py-1"
      style={{
        background: variant === "accent" ? "var(--color-accent)" : "var(--color-border)",
        color: variant === "accent" ? "var(--color-surface)" : "var(--color-muted)",
      }}
    >
      {children}
    </span>
  );
}

"use client";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
}

export default function Tag({ children, variant = "default" }: TagProps) {
  return (
    <span
      className="mono inline-flex items-center px-3 py-1 rounded-full"
      style={{
        background: variant === "accent" ? "var(--red)" : "var(--cream)",
        color: variant === "accent" ? "var(--cream)" : "var(--ink)",
        border: "2px solid var(--ink)",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

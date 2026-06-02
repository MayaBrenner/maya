import React from "react";

interface PainPointProps {
  number: string;
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}

export function PainPoint({ number, title, children, isLast }: PainPointProps) {
  return (
    <div
      style={{
        flex: 1,
        padding: "1.5rem",
        borderRight: isLast ? undefined : "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--color-muted)",
          marginBottom: "0.75rem",
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          fontSize: "1.35rem",
          letterSpacing: "-0.01em",
          lineHeight: 1.15,
          color: "var(--ink)",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}

export default function PainPoints({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children);
  return (
    <div className="not-prose" style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          border: "1px solid var(--color-border)",
          borderRadius: "0.75rem",
          overflow: "hidden",
        }}
      >
        {items.map((child, i) =>
          React.cloneElement(child as React.ReactElement<PainPointProps>, {
            isLast: i === items.length - 1,
          })
        )}
      </div>
    </div>
  );
}

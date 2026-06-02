interface CalloutProps {
  children: React.ReactNode;
  type?: "insight" | "quote" | "note";
}

const STYLES = {
  insight: { accent: "var(--red)",    bg: "var(--yellow-soft)", label: "Insight" },
  quote:   { accent: "var(--pink)",   bg: "var(--pink-soft)",   label: "Quote" },
  note:    { accent: "var(--cobalt)", bg: "var(--paper)",       label: "Note" },
};

export default function Callout({ children, type = "note" }: CalloutProps) {
  const s = STYLES[type];
  return (
    <aside
      className="my-10 p-6 md:p-7"
      style={{
        background: s.bg,
        border: "1.5px solid var(--outline-soft)",
        borderLeft: `3px solid ${s.accent}`,
        borderRadius: 6,
      }}
    >
      <span className="label mb-3 block" style={{ color: s.accent }}>{s.label}</span>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          fontSize: "clamp(1.2rem, 1.9vw, 1.55rem)",
          lineHeight: 1.3,
          color: "var(--ink)",
          fontStyle: type === "quote" ? "italic" : "normal",
          letterSpacing: "-0.005em",
        }}
      >
        {children}
      </div>
    </aside>
  );
}

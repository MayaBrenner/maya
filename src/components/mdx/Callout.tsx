interface CalloutProps {
  children: React.ReactNode;
  type?: "insight" | "quote" | "note";
}

const styles = {
  insight: {
    border: "2px solid var(--color-accent)",
    background: "color-mix(in srgb, var(--color-accent) 8%, transparent)",
    label: "Insight",
  },
  quote: {
    border: "2px solid var(--color-border)",
    background: "var(--color-surface)",
    label: "Quote",
  },
  note: {
    border: "2px solid var(--color-border)",
    background: "var(--color-surface)",
    label: "Note",
  },
};

export default function Callout({ children, type = "note" }: CalloutProps) {
  const s = styles[type];
  return (
    <div className="my-8 rounded-xl p-6" style={{ border: s.border, background: s.background }}>
      <div className="text-base leading-relaxed">{children}</div>
    </div>
  );
}

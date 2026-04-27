interface MetricProps {
  value: string;
  label: string;
  sublabel?: string;
}

export function Metric({ value, label, sublabel }: MetricProps) {
  return (
    <div className="flex flex-col gap-1 px-6 py-6">
      <span
        className="leading-none"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          fontWeight: 500,
          color: "var(--color-ink)",
        }}
      >
        {value}
      </span>
      <span className="label mt-1">{label}</span>
      {sublabel && (
        <span className="text-xs text-[--color-muted] leading-snug">{sublabel}</span>
      )}
    </div>
  );
}

interface MetricsProps {
  children: React.ReactNode;
}

export default function Metrics({ children }: MetricsProps) {
  const items = Array.isArray(children) ? children : [children];
  const count = items.length;
  const gridCols =
    count === 2
      ? "grid-cols-2"
      : count === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-4";

  return (
    <div
      className={`my-10 grid divide-y divide-[--color-border] overflow-hidden rounded-xl border border-[--color-border] sm:divide-x sm:divide-y-0 ${gridCols}`}
    >
      {items}
    </div>
  );
}

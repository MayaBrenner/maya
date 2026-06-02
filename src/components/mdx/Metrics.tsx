interface MetricProps {
  value: string;
  label: string;
  sublabel?: string;
}

export function Metric({ value, label, sublabel }: MetricProps) {
  return (
    <div className="flex flex-col gap-1 py-7 px-5">
      <span
        className="leading-none"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2.6rem, 4.5vw, 3.8rem)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: "var(--red)",
        }}
      >
        {value}
      </span>
      {label && (
        <span
          className="mono mt-3"
          style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.16em", fontWeight: 500 }}
        >
          {label.toUpperCase()}
        </span>
      )}
      {sublabel && (
        <span
          className="mt-1.5"
          style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5, maxWidth: "32ch" }}
        >
          {sublabel}
        </span>
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
  const cols =
    count === 2 ? "grid-cols-1 sm:grid-cols-2"
    : count === 3 ? "grid-cols-1 sm:grid-cols-3"
    : "grid-cols-2 sm:grid-cols-4";
  return (
    <div
      className={`my-12 grid ${cols} divide-x divide-y-0 sm:divide-y-0 divide-[--outline-soft]`}
      style={{
        border: "1.5px solid var(--outline-soft)",
        borderRadius: 6,
      }}
    >
      {items}
    </div>
  );
}

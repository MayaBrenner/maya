"use client";

const ITEMS = [
  "Product Design", "✦", "Brand Identity", "✦", "AI Products", "✦",
  "Tel Aviv", "✦", "Open to work · 2026", "✦", "Stationery", "✦",
  "UX Research", "✦", "Mayul Studio", "✦", "CarDB", "✦",
  "Motion", "✦", "Systems Thinking", "✦",
];

const track = [...ITEMS, ...ITEMS];

export default function MarqueeStrip() {
  return (
    <div
      className="relative w-full overflow-hidden border-y border-[--color-border] py-3 select-none"
      style={{ background: "var(--color-surface)" }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="mx-5 text-sm font-medium shrink-0"
            style={{ color: item === "✦" ? "var(--color-accent)" : "var(--color-muted)" }}
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

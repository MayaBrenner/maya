"use client";

import { Star8, Sparkle4, Daisy, TripleCircle, Dot } from "@/components/ui/Shapes";

const COLORS = ["var(--cobalt)", "var(--orange)", "var(--pink)", "var(--green)", "var(--yellow)"];

const SHAPES = (color: string) => [
  <Star8 key="s" size={26} fill="var(--paper)" stroke="var(--ink)" strokeWidth={1.4} />,
  <Sparkle4 key="p" size={24} fill="var(--paper)" stroke="var(--ink)" strokeWidth={1.4} />,
  <Daisy key="d" size={26} fill="var(--paper)" stroke="var(--ink)" strokeWidth={1.4} />,
  <TripleCircle key="t" size={26} fill="var(--paper)" stroke="var(--ink)" strokeWidth={1.4} />,
  <Dot key="o" size={16} fill="var(--paper)" stroke="var(--ink)" strokeWidth={1.4} />,
];

const CELL_COUNT = 40;

export default function MarqueeStrip() {
  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        background: "var(--paper)",
        borderTop: "1.5px solid var(--outline)",
        borderBottom: "1.5px solid var(--outline)",
      }}
    >
      <div className="flex" style={{ animation: "checker-scroll 42s linear infinite" }}>
        {[...Array(CELL_COUNT * 2)].map((_, i) => {
          const color = COLORS[i % COLORS.length];
          const shapeSet = SHAPES(color);
          const shape = shapeSet[i % shapeSet.length];
          return (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center"
              style={{
                width: 56,
                height: 56,
                background: color,
                borderRight: "1px solid var(--outline)",
              }}
            >
              {shape}
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes checker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

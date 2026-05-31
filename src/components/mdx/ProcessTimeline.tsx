import React from "react";

interface StepProps {
  phase: string;
  title: string;
  children: React.ReactNode;
  index?: number;
  total?: number;
  compact?: boolean;
}

export function Step({ phase, title, children, index = 0, total = 1, compact = false }: StepProps) {
  if (compact) {
    return (
      <div className="flex gap-3 rounded-xl border border-[--color-border] bg-[--color-surface] p-4">
        <span
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
          style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}
        >
          {index + 1}
        </span>
        <div>
          <span className="label block mb-0.5">{phase}</span>
          <p className="mb-1 text-sm font-medium leading-snug" style={{ fontFamily: "var(--font-display)" }}>{title}</p>
          <div className="text-xs text-[--color-muted] leading-relaxed [&>p]:mb-0">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex gap-6 pb-8 last:pb-0">
      {index < total - 1 && (
        <div className="absolute left-5 top-10 h-full w-px bg-[--color-border]" />
      )}
      <div
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold"
        style={{
          borderColor: "var(--color-accent)",
          background: "var(--color-bg)",
          color: "var(--color-accent)",
        }}
      >
        {index + 1}
      </div>
      <div className="pt-1">
        <span className="label block mb-1">{phase}</span>
        <h4
          className="mb-1 text-base font-medium"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h4>
        <div className="text-sm text-[--color-muted] [&>p]:mb-0">{children}</div>
      </div>
    </div>
  );
}

interface ProcessTimelineProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3;
}

export default function ProcessTimeline({ children, cols = 1 }: ProcessTimelineProps) {
  const steps = Array.isArray(children) ? children : [children];
  const total = steps.length;
  const compact = cols > 1;

  const gridStyle: React.CSSProperties = compact
    ? { display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "12px" }
    : {};

  return (
    <div className="my-10" style={gridStyle}>
      {steps.map((child, i) => {
        if (!child) return null;
        return (
          <Step
            key={i}
            phase={(child as React.ReactElement<StepProps>).props?.phase ?? ""}
            title={(child as React.ReactElement<StepProps>).props?.title ?? ""}
            index={i}
            total={total}
            compact={compact}
          >
            {(child as React.ReactElement<StepProps>).props?.children}
          </Step>
        );
      })}
    </div>
  );
}

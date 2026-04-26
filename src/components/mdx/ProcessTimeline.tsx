interface StepProps {
  phase: string;
  title: string;
  children: React.ReactNode;
  index?: number;
  total?: number;
}

export function Step({ phase, title, children, index = 0, total = 1 }: StepProps) {
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
        <p className="text-sm text-[--color-muted]">{children}</p>
      </div>
    </div>
  );
}

interface ProcessTimelineProps {
  children: React.ReactNode;
}

export default function ProcessTimeline({ children }: ProcessTimelineProps) {
  const steps = Array.isArray(children) ? children : [children];
  const total = steps.length;

  return (
    <div className="my-10">
      {steps.map((child, i) => {
        if (!child) return null;
        return (
          <Step
            key={i}
            phase={(child as React.ReactElement<StepProps>).props?.phase ?? ""}
            title={(child as React.ReactElement<StepProps>).props?.title ?? ""}
            index={i}
            total={total}
          >
            {(child as React.ReactElement<StepProps>).props?.children}
          </Step>
        );
      })}
    </div>
  );
}

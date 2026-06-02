import React from "react";

interface CoreFlowStepProps {
  phase: string;
  title: string;
  children: React.ReactNode;
}

export function CoreFlowStep(_props: CoreFlowStepProps) {
  return null;
}

const ACCENTS = ["var(--pink)", "var(--cobalt)", "var(--orange)", "var(--green)", "var(--yellow)", "var(--red)"];

export default function CoreFlowGrid({ children }: { children?: React.ReactNode }) {
  const steps = children
    ? React.Children.toArray(children)
        .filter((c): c is React.ReactElement<CoreFlowStepProps> => React.isValidElement(c))
        .map((c) => ({ phase: c.props.phase, title: c.props.title, body: c.props.children }))
    : [];

  return (
    <div className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0" style={{ borderTop: "1.5px solid var(--outline)" }}>
      {steps.map(({ phase, title, body }, i) => {
        const accent = ACCENTS[i % ACCENTS.length];
        return (
          <div
            key={i}
            className="flex gap-5 py-6"
            style={{ borderBottom: "1px solid var(--outline-soft)" }}
          >
            <div className="flex flex-col items-center gap-2 shrink-0">
              <span
                className="mono"
                style={{ fontSize: 10, color: accent, letterSpacing: "0.18em", fontWeight: 600 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="label block mb-1" style={{ color: "var(--ink-soft)" }}>{phase}</span>
              <h4 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.3rem, 2.1vw, 1.7rem)",
                fontWeight: 500,
                color: "var(--ink)",
                letterSpacing: "-0.01em",
                lineHeight: 1.15,
                marginBottom: 4,
              }}>
                {title}
              </h4>
              <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.55 }}>
                {body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

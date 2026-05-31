import React from "react";

interface CoreFlowStepProps {
  phase: string;
  title: string;
  children: React.ReactNode;
}

export function CoreFlowStep(_props: CoreFlowStepProps) {
  return null;
}

const DEFAULT_STEPS = [
  { phase: "Browse", title: "The feed", body: "Status visible before price. A seller rail groups movers by departure so buyers can coordinate a single pickup." },
  { phase: "Read", title: "The listing", body: "Item, gallery, dimensions, and a seller strip showing name, destination, and timeline. Three action buttons in order of commitment." },
  { phase: "Ask", title: "Per-listing chat", body: "Chat scoped to one listing. Quick-reply chips surface the three questions buyers always ask." },
  { phase: "Reserve", title: "Deposit + escrow", body: "A 20% deposit holds the item for 48 hours in escrow. Full refund if the meetup does not happen." },
  { phase: "Meet", title: "Meetup proposal", body: "Buyer proposes 3 time slots. Area shown before address — exact location shared only after the seller confirms." },
  { phase: "Handoff", title: "Release funds", body: "Both parties confirm in-app. Escrow releases to the seller. Listing moves to Sold." },
];

export default function CoreFlowGrid({ children }: { children?: React.ReactNode }) {
  const steps = children
    ? React.Children.toArray(children)
        .filter((c): c is React.ReactElement<CoreFlowStepProps> => React.isValidElement(c))
        .map((c) => ({ phase: c.props.phase, title: c.props.title, body: c.props.children }))
    : DEFAULT_STEPS;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px",
        margin: "2rem 0",
      }}
    >
      {steps.map(({ phase, title, body }, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: "12px",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20px",
              height: "20px",
              minWidth: "20px",
              borderRadius: "999px",
              background: "var(--color-accent)",
              color: "var(--color-bg)",
              fontSize: "10px",
              fontWeight: 700,
              marginTop: "2px",
              flexShrink: 0,
            }}
          >
            {i + 1}
          </span>
          <div>
            <span
              style={{
                display: "block",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: "2px",
              }}
            >
              {phase}
            </span>
            <span
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "var(--font-display)",
                marginBottom: "4px",
                color: "var(--color-ink)",
              }}
            >
              {title}
            </span>
            <span
              style={{
                display: "block",
                fontSize: "12px",
                color: "var(--color-muted)",
                lineHeight: 1.5,
              }}
            >
              {body}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

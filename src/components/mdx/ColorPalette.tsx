interface SwatchProps {
  hex: string;
  name: string;
  usage?: string;
}

export function Swatch({ hex, name, usage }: SwatchProps) {
  return (
    <div>
      <div
        className="w-full"
        style={{
          background: hex,
          aspectRatio: "1 / 1",
          border: "1.5px solid var(--outline-soft)",
          borderRadius: 4,
        }}
      />
      <span
        className="block mt-3"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          fontSize: 18,
          color: "var(--ink)",
          letterSpacing: "-0.005em",
          lineHeight: 1.1,
        }}
      >
        {name}
      </span>
      <span className="mono block mt-1" style={{ fontSize: 11, color: "var(--red)", letterSpacing: "0.06em", fontWeight: 500 }}>
        {hex.toUpperCase()}
      </span>
      {usage && (
        <span className="block mt-1.5" style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
          {usage}
        </span>
      )}
    </div>
  );
}

interface ColorPaletteProps {
  children: React.ReactNode;
  caption?: string;
}

export default function ColorPalette({ children, caption }: ColorPaletteProps) {
  const items = Array.isArray(children) ? children : [children];
  const count = items.length;
  const cols =
    count <= 3 ? "grid-cols-3"
    : count === 4 ? "grid-cols-2 sm:grid-cols-4"
    : count === 5 ? "grid-cols-2 sm:grid-cols-5"
    : count === 6 ? "grid-cols-3 sm:grid-cols-6"
    : "grid-cols-3 sm:grid-cols-5";

  return (
    <figure className="my-12">
      <div className={`grid gap-x-5 gap-y-8 ${cols}`}>{items}</div>
      {caption && (
        <figcaption className="mt-5 mono text-center" style={{ fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.16em" }}>
          {caption.toUpperCase()}
        </figcaption>
      )}
    </figure>
  );
}

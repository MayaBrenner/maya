interface SwatchProps {
  hex: string;
  name: string;
  usage?: string;
}

export function Swatch({ hex, name, usage }: SwatchProps) {
  return (
    <div>
      <div
        className="mb-3 w-full rounded-xl border border-black/[0.06]"
        style={{ background: hex, aspectRatio: "1 / 1" }}
      />
      <span
        className="block text-sm font-medium"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
      >
        {name}
      </span>
      <code className="block text-xs text-[--color-muted] mt-0.5">{hex}</code>
      {usage && (
        <span className="block text-xs text-[--color-muted] mt-0.5 leading-snug">
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
    : count === 4 ? "grid-cols-4"
    : count === 5 ? "grid-cols-5"
    : count === 6 ? "grid-cols-6"
    : "grid-cols-3 sm:grid-cols-5";

  return (
    <figure className="my-8">
      <div className={`grid gap-4 ${cols}`}>{items}</div>
      {caption && (
        <figcaption className="mt-4 text-xs text-[--color-muted]">{caption}</figcaption>
      )}
    </figure>
  );
}

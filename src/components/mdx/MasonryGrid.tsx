interface MasonryImageProps {
  src: string;
  alt?: string;
  aspectRatio?: string;
}

export function MasonryImage({ src, alt, aspectRatio }: MasonryImageProps) {
  return (
    <div
      className="mb-3 overflow-hidden rounded-xl break-inside-avoid border border-[--color-border]"
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="block"
        style={aspectRatio ? { width: "100%", height: "100%", objectFit: "cover" } : { width: "100%", height: "auto" }}
      />
    </div>
  );
}

interface MasonryGridProps {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
  caption?: string;
}

export default function MasonryGrid({ children, cols = 3, caption }: MasonryGridProps) {
  const colClass = { 2: "columns-2", 3: "columns-2 sm:columns-3", 4: "columns-2 sm:columns-4" }[cols];

  return (
    <div className="my-10">
      <div className={`${colClass} gap-3`}>
        {children}
      </div>
      {caption && (
        <p className="text-[13px] text-center mt-4 m-0" style={{ color: "var(--color-muted)" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

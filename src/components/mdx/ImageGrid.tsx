interface ImageGridProps {
  children: React.ReactNode;
  cols?: 2 | 3;
  caption?: string;
}

export default function ImageGrid({ children, cols = 2, caption }: ImageGridProps) {
  return (
    <figure className="my-8">
      <div
        className={`grid gap-3 ${cols === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}
      >
        {children}
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-[--color-muted]">{caption}</figcaption>
      )}
    </figure>
  );
}

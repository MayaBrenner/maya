interface ArtifactGridProps {
  images: { src: string; alt: string; caption?: string }[];
  columns?: 2 | 3;
}

export default function ArtifactGrid({ images, columns = 2 }: ArtifactGridProps) {
  return (
    <div
      className={`my-10 grid gap-4 ${columns === 3 ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}
    >
      {images.map((img, i) => (
        <figure key={i} className="overflow-hidden rounded-xl border border-[--color-border]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
          {img.caption && (
            <figcaption className="px-4 py-2 text-xs text-[--color-muted]">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

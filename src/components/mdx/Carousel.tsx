"use client";
import { useState, Children, isValidElement } from "react";

interface SlideProps {
  src: string;
  alt?: string;
}

export function CarouselSlide(_props: SlideProps) {
  return null; // data-only — Carousel reads props directly
}

interface CarouselProps {
  children: React.ReactNode;
  caption?: string;
  aspect?: "portrait" | "square" | "video";
}

const ASPECT: Record<string, string> = {
  portrait: "aspect-[3/4]",
  square:   "aspect-square",
  video:    "aspect-video",
};

export default function Carousel({ children, caption, aspect = "portrait" }: CarouselProps) {
  const slides = Children.toArray(children)
    .filter((c): c is React.ReactElement<SlideProps> => isValidElement(c))
    .map(c => ({ src: c.props.src, alt: c.props.alt ?? "" }));

  const [current, setCurrent] = useState(0);
  const total = slides.length;
  if (total === 0) return null;

  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);

  return (
    <div className="my-10">
      <div className={`relative w-full overflow-hidden rounded-2xl border border-[--color-border] bg-[--color-surface] ${ASPECT[aspect]}`}>
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt={slide.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
          />
        ))}

        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid var(--color-border)", boxShadow: "2px 2px 0 rgba(0,0,0,0.12)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid var(--color-border)", boxShadow: "2px 2px 0 rgba(0,0,0,0.12)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div
          className="absolute bottom-4 right-4 z-10 text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.88)", border: "1px solid var(--color-border)" }}
        >
          {current + 1} / {total}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to ${i + 1}`}
            className="rounded-full transition-all duration-200 cursor-pointer"
            style={{
              width: i === current ? 20 : 7,
              height: 7,
              background: i === current ? "var(--color-ink)" : "var(--color-border)",
              border: "none",
              padding: 0,
            }}
          />
        ))}
      </div>

      {caption && (
        <p className="text-[13px] text-center mt-3 m-0" style={{ color: "var(--color-muted)" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

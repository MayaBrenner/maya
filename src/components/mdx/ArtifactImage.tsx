"use client";

import { useState } from "react";

type Aspect = "video" | "wide" | "square" | "portrait" | "auto";

const ASPECT: Record<Aspect, string> = {
  video: "aspect-video",
  wide: "aspect-[16/7]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  auto: "",
};

interface ArtifactImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspect?: Aspect;
  className?: string;
}

export default function ArtifactImage({
  src,
  alt,
  caption,
  aspect = "video",
  className = "",
}: ArtifactImageProps) {
  const [failed, setFailed] = useState(false);
  const aspectClass = ASPECT[aspect];

  return (
    <figure className={`my-8 ${className}`}>
      <div
        className={`${aspectClass} relative overflow-hidden rounded-xl border border-[--color-border] bg-[--color-surface]`}
      >
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full min-h-[14rem] flex-col items-center justify-center gap-3 p-8 text-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="opacity-30"
              style={{ color: "var(--color-accent)" }}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <div>
              <span
                className="label block mb-1"
                style={{ color: "var(--color-accent)" }}
              >
                Figma export needed
              </span>
              <code className="text-xs text-[--color-muted] break-all">{src}</code>
            </div>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-[--color-muted]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

"use client";

import { useState } from "react";

interface SplitViewProps {
  src: string;
  alt: string;
  caption?: string;
  flip?: boolean;
  children: React.ReactNode;
}

export default function SplitView({
  src,
  alt,
  caption,
  flip = false,
  children,
}: SplitViewProps) {
  const [failed, setFailed] = useState(false);

  const imageEl = (
    <div className="flex flex-col gap-2">
      <div className="relative overflow-hidden rounded-xl border border-[--color-border] bg-[--color-surface]">
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex min-h-[12rem] flex-col items-center justify-center gap-2 p-6 text-center">
            <span className="label" style={{ color: "var(--color-accent)" }}>
              Figma export needed
            </span>
            <code className="text-xs text-[--color-muted] break-all">{src}</code>
          </div>
        )}
      </div>
      {caption && <p className="text-xs text-[--color-muted]">{caption}</p>}
    </div>
  );

  const textEl = (
    <div className="flex flex-col justify-center gap-4 text-base leading-relaxed text-[--color-ink]">
      {children}
    </div>
  );

  return (
    <div className="my-10 grid items-start gap-8 sm:grid-cols-2">
      {flip ? (
        <>
          {imageEl}
          {textEl}
        </>
      ) : (
        <>
          {textEl}
          {imageEl}
        </>
      )}
    </div>
  );
}

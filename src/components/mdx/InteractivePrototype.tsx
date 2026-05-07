"use client";

interface Props {
  src: string;
  height?: number;
  caption?: string;
  label?: string;
}

export default function InteractivePrototype({
  src,
  height = 900,
  caption,
  label = "Interactive prototype",
}: Props) {
  return (
    <div className="my-10 -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-20">
      {/* Label bar */}
      <div className="flex items-center gap-3 px-4 sm:px-8 md:px-12 lg:px-20 mb-3">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#FF962C" }}
          />
          <span
            className="text-[11px] font-semibold tracking-[0.08em] uppercase"
            style={{ color: "#FF962C" }}
          >
            {label}
          </span>
        </div>
        {caption && (
          <span className="text-[13px] text-[--color-muted]">{caption}</span>
        )}
      </div>

      {/* iframe */}
      <div
        className="w-full overflow-hidden rounded-2xl border border-[--color-border] shadow-sm"
        style={{ height }}
      >
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: "none", display: "block" }}
          title={label}
          loading="lazy"
        />
      </div>
    </div>
  );
}

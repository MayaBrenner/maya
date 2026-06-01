/* ════════════════════════════════════════════════════════════
   The Zine — Decorative Shape Library
   Pop-art / 70s mod / hand-cut sticker forms with black outlines
   ════════════════════════════════════════════════════════════ */

type ShapeProps = {
  size?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
};

const defaults = {
  fill: "var(--yellow)",
  stroke: "var(--ink)",
  strokeWidth: 2,
};

/* 10-point burst — the BIG energetic star */
export function Star10({ size = 80, fill = defaults.fill, stroke = defaults.stroke, strokeWidth = defaults.strokeWidth, className, style }: ShapeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
      <path
        d="M50 2 L57 28 L78 12 L70 38 L98 38 L74 53 L93 75 L65 68 L65 96 L50 73 L35 96 L35 68 L7 75 L26 53 L2 38 L30 38 L22 12 L43 28 Z"
        fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round"
      />
    </svg>
  );
}

/* 8-point burst — slightly softer */
export function Star8({ size = 80, fill = defaults.fill, stroke = defaults.stroke, strokeWidth = defaults.strokeWidth, className, style }: ShapeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
      <path
        d="M50 4 L60 32 L88 24 L72 48 L96 60 L68 64 L74 92 L50 76 L26 92 L32 64 L4 60 L28 48 L12 24 L40 32 Z"
        fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round"
      />
    </svg>
  );
}

/* 4-point sparkle — twinkle */
export function Sparkle4({ size = 60, fill = defaults.fill, stroke = defaults.stroke, strokeWidth = defaults.strokeWidth, className, style }: ShapeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
      <path
        d="M50 0 Q55 40 100 50 Q55 60 50 100 Q45 60 0 50 Q45 40 50 0 Z"
        fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round"
      />
    </svg>
  );
}

/* 6-petal daisy / asterisk flower */
export function Daisy({ size = 90, fill = defaults.fill, stroke = defaults.stroke, strokeWidth = defaults.strokeWidth, className, style }: ShapeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
      <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="50" cy="22" rx="11" ry="22"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="6" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      </g>
    </svg>
  );
}

/* Half-circle / semicircle (mountains, hills) */
export function Semicircle({ size = 80, fill = defaults.fill, stroke = defaults.stroke, strokeWidth = defaults.strokeWidth, className, style }: ShapeProps) {
  return (
    <svg width={size} height={size / 2} viewBox="0 0 100 50" className={className} style={style}>
      <path
        d="M2 48 A48 48 0 0 1 98 48 Z"
        fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round"
      />
    </svg>
  );
}

/* Triple circle cluster (clover) */
export function TripleCircle({ size = 70, fill = defaults.fill, stroke = defaults.stroke, strokeWidth = defaults.strokeWidth, className, style }: ShapeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
      <g fill={fill} stroke={stroke} strokeWidth={strokeWidth}>
        <circle cx="50" cy="28" r="22" />
        <circle cx="28" cy="66" r="22" />
        <circle cx="72" cy="66" r="22" />
      </g>
    </svg>
  );
}

/* Sunburst rays — radiating from center */
export function Sunburst({
  size = 400,
  colors = ["#E865A0", "#E68330", "#F5C518", "#1F9963", "#2E66C8"],
  stroke = "var(--ink)",
  strokeWidth = 1.5,
  className,
  style,
}: { colors?: string[] } & ShapeProps) {
  const slices = 16;
  const rays = Array.from({ length: slices }, (_, i) => {
    const angle1 = (i / slices) * 360;
    const angle2 = ((i + 1) / slices) * 360;
    const a1 = (angle1 - 90) * (Math.PI / 180);
    const a2 = (angle2 - 90) * (Math.PI / 180);
    const r = 200;
    const x1 = 100 + r * Math.cos(a1);
    const y1 = 100 + r * Math.sin(a1);
    const x2 = 100 + r * Math.cos(a2);
    const y2 = 100 + r * Math.sin(a2);
    return {
      d: `M100 100 L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2} Z`,
      fill: colors[i % colors.length],
    };
  });
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className} style={style}>
      {rays.map((ray, i) => (
        <path key={i} d={ray.d} fill={ray.fill} stroke={stroke} strokeWidth={strokeWidth} />
      ))}
    </svg>
  );
}

/* Single dot */
export function Dot({ size = 30, fill = defaults.fill, stroke = defaults.stroke, strokeWidth = defaults.strokeWidth, className, style }: ShapeProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
      <circle cx="50" cy="50" r="46" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}

/* Checkerboard tile pattern strip */
export function CheckerStrip({
  height = 56,
  cell = 56,
  colors = ["#2E66C8", "#E68330", "#E865A0", "#1F9963"],
  count = 30,
  className,
}: { height?: number; cell?: number; colors?: string[]; count?: number; className?: string }) {
  return (
    <div className={`flex ${className ?? ""}`} style={{ height }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            width: cell,
            height,
            background: colors[i % colors.length],
            borderRight: "1.5px solid var(--ink)",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

/* Helper: pick a shape by name */
export const SHAPE_BY_NAME = {
  star10: Star10,
  star8: Star8,
  sparkle: Sparkle4,
  daisy: Daisy,
  semicircle: Semicircle,
  triple: TripleCircle,
  dot: Dot,
} as const;

export type ShapeName = keyof typeof SHAPE_BY_NAME;

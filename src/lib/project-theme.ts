import type { ShapeName } from "@/components/ui/Shapes";

/* ════════════════════════════════════════════════════════════
   Project theme map — signature color + shape per case study
   ════════════════════════════════════════════════════════════ */

export type ProjectTheme = {
  color: string;        // signature background color
  ink: string;          // text color used on top of color
  contrast: string;     // a complementary accent for sparkles/highlights
  shape: ShapeName;     // signature shape glyph
  label: string;        // color name (used in mono captions)
};

export const PROJECT_THEMES: Record<string, ProjectTheme> = {
  "mayul-studio": {
    color: "#E865A0",   // hot pink
    ink: "#1A1714",
    contrast: "#F5C518", // yellow
    shape: "daisy",
    label: "Hot Pink",
  },
  "cardb": {
    color: "#2E66C8",   // cobalt
    ink: "#FBF6E8",
    contrast: "#F5C518", // yellow
    shape: "star10",
    label: "Cobalt",
  },
  "scout": {
    color: "#1F9963",   // kelly green (My Buddy)
    ink: "#FBF6E8",
    contrast: "#F5C518", // yellow
    shape: "triple",
    label: "Kelly Green",
  },
  "chapter": {
    color: "#F5C518",   // sunshine yellow (Home Again)
    ink: "#1A1714",
    contrast: "#2E66C8", // cobalt
    shape: "sparkle",
    label: "Sunshine",
  },
  "i-do": {
    color: "#E68330",   // burnt orange
    ink: "#1A1714",
    contrast: "#E865A0", // pink
    shape: "star8",
    label: "Burnt Orange",
  },
};

export const FALLBACK_THEME: ProjectTheme = {
  color: "#E33A1A",
  ink: "#FBF6E8",
  contrast: "#F5C518",
  shape: "star10",
  label: "Fire Red",
};

export function getProjectTheme(slug: string): ProjectTheme {
  return PROJECT_THEMES[slug] ?? FALLBACK_THEME;
}

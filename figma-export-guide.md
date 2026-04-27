# Figma Export Guide

Every image in the case studies is an `ArtifactImage` component. When a file is missing, the site shows a placeholder with this file's exact path. Once you export from Figma and drop the file here, it appears automatically — no code change needed.

---

## Setup: Import tokens into Figma

1. Install **Tokens Studio** plugin in Figma
2. Open the plugin → Import → select `figma-tokens.json` from this repo root
3. Apply the token set — Figma Variables will match the site's color/type system exactly

## Setup: Import live pages into Figma

1. Run `npm run dev` locally (or use the deployed URL)
2. Install **html.to.design** plugin in Figma (by Builder.io — free)
3. Paste `http://localhost:3000/work/[slug]` into the plugin
4. The plugin creates editable Figma frames that match the current layout
5. Use these as your base — redesign, add screens, prototype between them

---

## Export settings (apply to all frames)

- Format: **PNG**
- Scale: **2×** (retina)
- Suffix: none
- Destination: `public/case-studies/[slug]/[filename].png`

---

## Case Study 1 — Mayul Studio (`/case-studies/mayul-studio/`)

Accent color: `#F4EFEA` · Type: Brand Identity · Status: Real

| File | Frame name in Figma | Aspect | Notes |
|---|---|---|---|
| `color-system.png` | Color System | 16:9 | Color palette applied across materials — not just swatches |
| `logo-primary.png` | Logo — Primary Wordmark | 16:9 | On parchment background |
| `logo-secondary.png` | Logo — Secondary Mark | 16:9 | Standalone M mark, centered |
| `logo-scale.png` | Logo — Scale Test | 16:7 | Show logo from 5mm emboss to 120px digital |
| `typography-specimen.png` | Typography Specimen | 4:3 | Show both typefaces with sample text at scale |
| `packaging-hero.png` | Packaging — Full Lineup | 16:7 | All packaging together — boxes, tags, wrapping |
| `packaging-envelope.png` | Packaging — Envelope Detail | 1:1 | Envelope liner close-up |
| `packaging-label.png` | Packaging — Label System | 1:1 | Product label variety |
| `stationery-set.png` | Stationery Set | 16:9 | Full set — notecards, envelopes, wax seals |
| `digital-instagram.png` | Digital — Instagram Templates | 16:9 | Grid view + story template |
| `digital-website.png` | Digital — Website Homepage | 16:9 | Browser mockup of the online store |

**Suggested Figma page structure:**
```
Mayul Studio
  ├── 01 Color System
  ├── 02 Logo System
  ├── 03 Typography
  ├── 04 Packaging
  └── 05 Digital Application
```

---

## Case Study 2 — Root (`/case-studies/root/`)

Accent color: `#EDF5E8` · Type: Mobile App · Status: Speculative

Design in **iPhone 14 Pro frame** (393 × 852px) for portrait screens.

| File | Frame name in Figma | Aspect | Notes |
|---|---|---|---|
| `research-synthesis.png` | Research — Synthesis Board | 16:9 | Affinity map / key themes from interviews |
| `screen-home.png` | Screen — Home | 3:4 (portrait) | Catalog + search, no onboarding splash |
| `quiz-step-1.png` | Quiz — Step 1 | 3:4 (portrait) | "What are you making?" |
| `quiz-step-2.png` | Quiz — Step 2 | 3:4 (portrait) | "When will you cook it?" |
| `quiz-result.png` | Quiz — Result | 3:4 (portrait) | Ripeness recommendation |
| `screen-produce-detail.png` | Screen — Produce Detail | 3:4 (portrait) | Avocado guide — illustrated ripeness spectrum |
| `screen-feedback.png` | Screen — Feedback | 3:4 (portrait) | "Good pick?" prompt after cooking |
| `screen-streak.png` | Screen — Streak | 3:4 (portrait) | Streak/intuition tracker |
| `illustration-comparison.png` | Illustration vs Photo | 16:9 | Side by side — same info, different format |
| `visual-direction.png` | Visual Direction | 16:9 | Full component overview — colors, type, components |

**Suggested Figma page structure:**
```
Root
  ├── 00 Research
  ├── 01 Home
  ├── 02 Quiz Flow (3 frames)
  ├── 03 Produce Detail
  ├── 04 Feedback Loop
  ├── 05 Illustration Style
  └── 06 Visual Direction
```

---

## Case Study 3 — WheelMatch (`/case-studies/wheelmatch/`)

Accent color: `#E8EDF5` · Type: Web App · Status: Speculative

Design in **1440px desktop frame** for main screens. Use **iPhone 14 Pro** for any mobile-responsive views.

| File | Frame name in Figma | Aspect | Notes |
|---|---|---|---|
| `journey-map.png` | Journey Map | 16:7 (wide) | Emotions + touchpoints across all 3 user types |
| `screen-onboarding.png` | Screen — Onboarding | 16:9 | Question flow at mid-progress, full viewport |
| `screen-results.png` | Screen — Results | 16:9 | 4 car match cards with match % |
| `screen-car-detail.png` | Screen — Car Detail | 16:9 | Spec card with translated plain-language specs |
| `screen-expert-handoff.png` | Screen — Expert Handoff | 16:9 | Advisor profile + status states (3 variants) |
| `screen-dealership-brief.png` | Screen — Dealership Brief | 16:9 | Generated printable brief |
| `animation-glow.png` | AI Thinking — Glow State | 1:1 | The pulsing glow animation (capture at peak) |
| `animation-rejected.png` | AI Thinking — Spinner (rejected) | 1:1 | Show the rejected approach for comparison |
| `visual-direction.png` | Visual Direction | 16:9 | Full component library overview |

**Suggested Figma page structure:**
```
WheelMatch
  ├── 00 Journey Map
  ├── 01 Onboarding Flow
  ├── 02 Results + Car Detail
  ├── 03 Expert Handoff
  ├── 04 Dealership Brief
  ├── 05 AI States
  └── 06 Visual Direction
```

---

## Case Study 4 — Scout (`/case-studies/scout/`)

Accent color: `#F5EDE2` · Type: Mobile App · Status: Speculative

Design in **iPhone 14 Pro frame** (393 × 852px). The map view is the most complex — use Mapbox's Figma integration or a custom illustrated style on top of a screenshot.

| File | Frame name in Figma | Aspect | Notes |
|---|---|---|---|
| `research-board.png` | Research — Board | 16:9 | Key quotes + themes from 15 interviews |
| `vibe-taxonomy.png` | Vibe Taxonomy | 16:9 | All 12 vibes with icons and example place types |
| `screen-map.png` | Screen — Map View | 3:4 (portrait) | Main map, vibe filter tabs, custom illustrated pins |
| `screen-vibe-filter.png` | Screen — Vibe Filter Active | 3:4 (portrait) | "Quiet" selected, map filtered |
| `screen-place-card.png` | Screen — Place Card | 3:4 (portrait) | Full place card — tip, contributor identity, vibes |
| `screen-add-place.png` | Screen — Add Place | 3:4 (portrait) | 3-step flow, step 2 (the tip entry screen) |
| `screen-personal-map.png` | Screen — Personal Map | 3:4 (portrait) | Shareable personal map view |
| `map-style.png` | Map Style | 16:9 | Custom Mapbox style — terracotta/sand illustrated |
| `visual-direction.png` | Visual Direction | 16:9 | Full component overview |

**Suggested Figma page structure:**
```
Scout
  ├── 00 Research
  ├── 01 Vibe System
  ├── 02 Map View
  ├── 03 Place Card + Vibe Filter
  ├── 04 Add a Place
  ├── 05 Personal Map
  ├── 06 Map Style
  └── 07 Visual Direction
```

---

## Workflow per case study

```
1. npm run dev → localhost:3000/work/[slug]
2. html.to.design → import the page as Figma frames
3. Design each frame listed above in the same Figma file
4. Select frame → Export → PNG 2× → save to public/case-studies/[slug]/
5. The site updates immediately — no code changes needed
6. Repeat per case study
```

## Updating existing images

Just re-export from Figma with the same filename. The browser cache will update on next hard refresh (Cmd+Shift+R).

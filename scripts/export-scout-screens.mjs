// Export Scout wireframe screens as PNG images.
// Usage: node scripts/export-scout-screens.mjs
// Requires dev server running on localhost:3000.

import { chromium } from "/Users/gnarly/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../public/case-studies/scout");
mkdirSync(OUT_DIR, { recursive: true });

const SCREENS = [
  { id: "screen-map",          title: "Map",              file: "screen-map.png"          },
  { id: "screen-vibe-filter",  title: "Vibe Filter",      file: "screen-vibe-filter.png"  },
  { id: "screen-place-card",   title: "Place Card",       file: "screen-place-card.png"   },
  { id: "screen-add-place",    title: "Add a Place",      file: "screen-add-place.png"    },
  { id: "screen-personal-map", title: "Personal Map",     file: "screen-personal-map.png" },
  { id: "research-board",      title: "Research Board",   file: "research-board.png"      },
  { id: "vibe-taxonomy",       title: "Vibe Taxonomy",    file: "vibe-taxonomy.png"       },
  { id: "map-style",           title: "Map Style",        file: "map-style.png"           },
  { id: "visual-direction",    title: "Visual Direction", file: "visual-direction.png"    },
];

async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1600, height: 960 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  console.log("→ Opening Scout wireframe viewer…");
  await page.goto("http://localhost:3000/wireframes/scout", { waitUntil: "networkidle" });
  await page.waitForSelector("[data-screen]", { timeout: 10000 });

  for (const { id, title, file } of SCREENS) {
    await page.locator(`button[title="${title}"]`).click();
    await page.waitForTimeout(400);
    await page.waitForSelector(`[data-screen="${id}"]`, { timeout: 5000 });

    const outPath = `${OUT_DIR}/${file}`;
    await page.locator(`[data-screen="${id}"]`).screenshot({ path: outPath });
    console.log(`  ✓  ${file}`);
  }

  await browser.close();
  console.log(`\nDone — ${SCREENS.length} images saved to public/case-studies/scout/`);
}

run().catch(err => { console.error(err); process.exit(1); });

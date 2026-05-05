// Export CarDB wireframe screens as PNG images.
// Usage: node scripts/export-cardb-screens.mjs
// Requires dev server running on localhost:3000.

import { chromium } from "/Users/gnarly/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../public/case-studies/cardb");
mkdirSync(OUT_DIR, { recursive: true });

const SCREENS = [
  { id: "screen-onboarding",       title: "Onboarding",         file: "screen-onboarding.png"      },
  { id: "screen-results",          title: "Results",            file: "screen-results.png"          },
  { id: "screen-car-detail",       title: "Car Detail",         file: "screen-car-detail.png"       },
  { id: "screen-expert-handoff",   title: "Expert Handoff",     file: "screen-expert-handoff.png"   },
  { id: "screen-dealership-brief", title: "Dealership Brief",   file: "screen-dealership-brief.png" },
  { id: "animation-glow",          title: "Animation · Glow",   file: "animation-glow.png"          },
  { id: "animation-rejected",      title: "Animation · ✕ Spin", file: "animation-rejected.png"      },
  { id: "journey-map",             title: "Journey Map",        file: "journey-map.png"             },
];

async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 960 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  console.log("→ Opening CarDB wireframe viewer…");
  await page.goto("http://localhost:3000/wireframes/cardb", { waitUntil: "networkidle" });
  await page.waitForSelector("[data-screen]", { timeout: 10000 });
  await page.waitForTimeout(1000); // let DM Serif + DM Sans load

  for (const { id, title, file } of SCREENS) {
    await page.locator(`button[title="${title}"]`).click();
    await page.waitForTimeout(500);
    await page.waitForSelector(`[data-screen="${id}"]`, { timeout: 5000 });

    const outPath = `${OUT_DIR}/${file}`;
    await page.locator(`[data-screen="${id}"]`).screenshot({ path: outPath });
    console.log(`  ✓  ${file}`);
  }

  await browser.close();
  console.log(`\nDone — 8 images saved to public/case-studies/cardb/`);
}

run().catch(err => { console.error(err); process.exit(1); });

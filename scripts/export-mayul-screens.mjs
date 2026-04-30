// Export Mayul Studio brand identity artboards as PNG images.
// Usage: node scripts/export-mayul-screens.mjs
// Requires dev server running on localhost:3000.

import { chromium } from "/Users/gnarly/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../public/case-studies/mayul-studio");
mkdirSync(OUT_DIR, { recursive: true });

const SCREENS = [
  { id: "color-system",        title: "Colour System",       file: "color-system.png"        },
  { id: "logo-primary",        title: "Primary Wordmark",    file: "logo-primary.png"        },
  { id: "logo-secondary",      title: "Secondary Mark",      file: "logo-secondary.png"      },
  { id: "logo-scale",          title: "Scale Test",          file: "logo-scale.png"          },
  { id: "typography-specimen", title: "Typography",          file: "typography-specimen.png" },
  { id: "packaging-hero",      title: "Packaging System",    file: "packaging-hero.png"      },
  { id: "packaging-envelope",  title: "Envelope Detail",     file: "packaging-envelope.png"  },
  { id: "packaging-label",     title: "Label System",        file: "packaging-label.png"     },
  { id: "stationery-set",      title: "Stationery Set",      file: "stationery-set.png"      },
  { id: "digital-instagram",   title: "Instagram Templates", file: "digital-instagram.png"   },
  { id: "digital-website",     title: "Website",             file: "digital-website.png"     },
];

async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1600, height: 960 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  console.log("→ Opening Mayul Studio brand viewer…");
  await page.goto("http://localhost:3000/wireframes/mayul-studio", { waitUntil: "networkidle" });
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
  console.log(`\nDone — ${SCREENS.length} images saved to public/case-studies/mayul-studio/`);
}

run().catch(err => { console.error(err); process.exit(1); });

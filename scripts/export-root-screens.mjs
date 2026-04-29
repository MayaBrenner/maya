// Export Root wireframe screens as PNG images.
// Usage: node scripts/export-root-screens.mjs
// Requires the dev server to be running on localhost:3000.

import { chromium } from "/Users/gnarly/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import { existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../public/case-studies/root");

mkdirSync(OUT_DIR, { recursive: true });

const SCREENS = [
  { id: "home",        file: "screen-home.png" },
  { id: "chef",        file: "screen-chef.png" },
  { id: "pairing",     file: "screen-pairing.png" },
  { id: "variety",     file: "screen-variety.png" },
  { id: "store",       file: "screen-store.png" },
  { id: "scanner",     file: "screen-scanner.png" },
  { id: "scan-result", file: "screen-scan-result.png" },
  { id: "debrief",     file: "screen-debrief.png" },
  { id: "cellar",      file: "screen-cellar.png" },
];

async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1400, height: 960 },
    deviceScaleFactor: 2, // retina
  });
  const page = await ctx.newPage();

  console.log("→ Opening wireframe viewer…");
  await page.goto("http://localhost:3000/wireframes/root", { waitUntil: "networkidle" });

  // Wait for React to render the first screen
  await page.waitForSelector("[data-phone]", { timeout: 10000 });

  for (let i = 0; i < SCREENS.length; i++) {
    const { id, file } = SCREENS[i];

    // Click the thumbnail strip button for this screen
    const btn = page.locator(`button[title]`).nth(i);
    await btn.click();
    await page.waitForTimeout(300);

    // Confirm the correct screen is showing
    await page.waitForSelector(`[data-phone="${id}"]`, { timeout: 5000 });

    // Screenshot the phone element only (no viewer chrome)
    const phone = page.locator(`[data-phone="${id}"]`);
    const outPath = `${OUT_DIR}/${file}`;
    await phone.screenshot({ path: outPath });

    console.log(`  ✓  ${file}`);
  }

  await browser.close();
  console.log(`\nDone — ${SCREENS.length} images saved to public/case-studies/root/`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

// Export Home Again wireframe screens as PNG images.
// Usage: node scripts/export-chapter-screens.mjs
// Requires dev server running on localhost:3000.

import { chromium } from "/Users/gnarly/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../public/case-studies/chapter");
mkdirSync(OUT_DIR, { recursive: true });

const SCREENS = [
  { id: "screen-onboarding", title: "Onboarding",   file: "screen-onboarding.png" },
  { id: "screen-browse",     title: "Browse",        file: "screen-browse.png"     },
  { id: "screen-search",     title: "City Search",   file: "screen-search.png"     },
  { id: "screen-listing",    title: "Listing",       file: "screen-listing.png"    },
  { id: "screen-chat",       title: "Chat",          file: "screen-chat.png"       },
  { id: "screen-seller",     title: "Seller Page",   file: "screen-seller.png"     },
  { id: "screen-bundle",     title: "Bundle",        file: "screen-bundle.png"     },
  { id: "screen-meet",       title: "Meet",          file: "screen-meet.png"       },
  { id: "screen-reserve",    title: "Reserve",       file: "screen-reserve.png"    },
  { id: "screen-handoff",    title: "Handoff",       file: "screen-handoff.png"    },
  { id: "screen-inbox",      title: "Inbox",         file: "screen-inbox.png"      },
  { id: "screen-status",     title: "Status System", file: "screen-status.png"     },
];

async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1600, height: 960 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  console.log("→ Opening Home Again wireframe viewer…");
  await page.goto("http://localhost:3000/wireframes/chapter", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000); // wait for Lora + DM Sans font load
  await page.waitForSelector("[data-screen]", { timeout: 10000 });

  for (const { id, title, file } of SCREENS) {
    await page.locator(`button[title="${title}"]`).click();
    await page.waitForTimeout(500);
    await page.waitForSelector(`[data-screen="${id}"]`, { timeout: 5000 });

    const outPath = `${OUT_DIR}/${file}`;
    await page.locator(`[data-screen="${id}"]`).first().screenshot({ path: outPath });
    console.log(`  ✓  ${file}`);
  }

  await browser.close();
  console.log(`\nDone — ${SCREENS.length} images saved to public/case-studies/chapter/`);
}

run().catch(err => { console.error(err); process.exit(1); });

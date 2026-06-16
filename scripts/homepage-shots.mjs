import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const outDir = '/tmp/maya-home-build';
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.4 });
const page = await ctx.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() =>
  page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 60000 })
);
await page.waitForTimeout(2600);
await page.screenshot({ path: `${outDir}/hero.png`, fullPage: false });
console.log('  ✓ hero.png');

const pageHeight = await page.evaluate(() => document.body.scrollHeight);
console.log('page height:', pageHeight);

// Scroll through work spreads
const positions = [900, 1500, 2200, 2900, 3600, 4300];
for (let i = 0; i < positions.length; i++) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), positions[i]);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${outDir}/scroll-${i}.png`, fullPage: false });
  console.log('  ✓ scroll-' + i + '.png at y=' + positions[i]);
}

await browser.close();

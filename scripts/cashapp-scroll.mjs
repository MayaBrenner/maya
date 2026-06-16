import { chromium } from 'playwright';
const url = 'https://cash.app/';
const outDir = '/tmp/cashapp-scroll';
import { mkdirSync } from 'fs';
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.4,
  reducedMotion: 'no-preference',
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(async () => {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
});
await page.waitForTimeout(3000);
const fullH = await page.evaluate(() => document.documentElement.scrollHeight);
const vp = page.viewportSize();
console.log(`full height: ${fullH}, vp: ${vp.width}x${vp.height}`);
// Capture every 250px of scroll for first 6000px
const stops = [];
for (let y = 0; y <= Math.min(fullH - vp.height, 6500); y += 350) stops.push(y);
for (const [i, y] of stops.entries()) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
  await page.waitForTimeout(550);
  const tag = String(i).padStart(2, '0');
  await page.screenshot({ path: `${outDir}/scroll-${tag}-y${y}.png`, fullPage: false });
  console.log(`  ✓ scroll-${tag}-y${y}.png`);
}
await browser.close();
console.log('Done.');

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const url = 'http://localhost:3000/';
const outDir = '/tmp/maya-story';
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.4 });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }));
await page.waitForTimeout(2200);
const storyTop = await page.evaluate(() => {
  const s = document.querySelector('[aria-label="Selected work — scroll story"]');
  if (!s) return null;
  const r = s.getBoundingClientRect();
  return window.scrollY + r.top;
});
const sectionH = await page.evaluate(() => {
  const s = document.querySelector('[aria-label="Selected work — scroll story"]');
  return s ? s.getBoundingClientRect().height : null;
});
const vp = 900;
const pinRange = sectionH - vp;
const sceneH = pinRange / 5;
console.log('storyTop:', storyTop, 'sectionH:', sectionH, 'pinRange:', pinRange, 'sceneH:', sceneH);
for (let i = 0; i < 5; i++) {
  const y = Math.round(storyTop + (i + 0.5) * sceneH);
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${outDir}/scene-${i}.png`, fullPage: false });
  console.log('  ✓ scene-' + i + '.png at y=' + y);
}
await browser.close();

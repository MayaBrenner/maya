import { chromium } from 'playwright';

const url = process.argv[2] || 'https://nicee.com.ua/';
const outDir = '/tmp/nicee-shots';

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: 'no-preference',
});
const page = await ctx.newPage();
page.on('console', (msg) => {
  if (msg.type() === 'error') console.log('  page console error:', msg.text().slice(0, 200));
});

console.log(`Navigating to ${url}…`);
await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 }).catch(async (e) => {
  console.log('  networkidle timeout — falling back to domcontentloaded:', e.message.slice(0, 100));
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
});

// Give animations / lazy fonts time to settle
await page.waitForTimeout(3500);

// Capture height
const fullH = await page.evaluate(() => document.documentElement.scrollHeight);
const vp = page.viewportSize();
console.log(`  full height: ${fullH}px, viewport: ${vp.width}x${vp.height}`);

// 1) Top of page (hero)
await page.screenshot({ path: `${outDir}/01-hero.png`, fullPage: false });
console.log('  ✓ 01-hero.png');

// 2-N) Scrolled views at 1.0, 2.0, 3.0, 4.0 viewport heights
const stops = [1.0, 2.0, 3.0, 4.0];
for (const [i, mul] of stops.entries()) {
  const y = Math.min(Math.floor(vp.height * mul), fullH - vp.height);
  if (y <= 0) break;
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
  await page.waitForTimeout(900);
  const idx = String(i + 2).padStart(2, '0');
  await page.screenshot({ path: `${outDir}/${idx}-scroll-${y}.png`, fullPage: false });
  console.log(`  ✓ ${idx}-scroll-${y}.png`);
}

// Full page (constrained to first ~6000px so the file isn't huge)
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(600);
const clipH = Math.min(fullH, 6000);
await page.screenshot({
  path: `${outDir}/00-fullpage.png`,
  clip: { x: 0, y: 0, width: vp.width, height: clipH },
});
console.log(`  ✓ 00-fullpage.png (clipped to ${clipH}px)`);

// Hero hover state — hover the center of viewport, in case there's cursor magic
await page.mouse.move(vp.width / 2, vp.height / 2);
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/01b-hero-hovered.png`, fullPage: false });
console.log('  ✓ 01b-hero-hovered.png');

await browser.close();
console.log('Done.');

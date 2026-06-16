import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:3000/';
const outDir = '/tmp/maya-shots';
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.5,
  reducedMotion: 'no-preference',
});
const page = await ctx.newPage();
page.on('console', (m) => { if (m.type() === 'error') console.log('err:', m.text().slice(0,200)); });
page.on('pageerror', (e) => console.log('pageerror:', e.message.slice(0,200)));
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(async (e) => {
  console.log('networkidle fallback:', e.message.slice(0,80));
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
});
await page.waitForTimeout(2500);
await page.screenshot({ path: `${outDir}/hero.png`, fullPage: false });
console.log('saved hero.png');
await browser.close();

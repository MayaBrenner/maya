import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text().slice(0, 200)); });
page.on('pageerror', (e) => errs.push('pageerror: ' + e.message.slice(0, 200)));
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' }));
await page.waitForTimeout(1800);
// Scroll through the entire story to fire all scene transitions
for (let y = 1280; y <= 5000; y += 200) {
  await page.evaluate((y) => window.scrollTo({ top: y }), y);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(800);
if (errs.length) errs.forEach((e) => console.log('ERR:', e));
else console.log('no errors during scroll-story');
await browser.close();

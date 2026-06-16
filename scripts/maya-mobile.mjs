import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' }));
await page.waitForTimeout(2000);
await page.screenshot({ path: '/tmp/maya-shots/hero-mobile.png', fullPage: false });
console.log('saved hero-mobile.png');
await browser.close();

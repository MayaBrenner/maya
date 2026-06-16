import { chromium } from 'playwright';

const url = process.argv[2] || 'https://nicee.com.ua/';
const outDir = '/tmp/nicee-motion';
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
// Settle
await page.waitForTimeout(3000);

console.log('Capturing temporal frames…');
// 1) Frames over time — see what auto-animates
for (let i = 0; i < 8; i++) {
  const tag = String(i).padStart(2, '0');
  await page.screenshot({ path: `${outDir}/t-${tag}.png`, fullPage: false });
  console.log('  ✓ t-' + tag + '.png');
  await page.waitForTimeout(450);
}

// 2) Cursor positions — see what moves with the cursor
console.log('Capturing cursor positions…');
const cursorStops = [
  { name: 'topL', x: 240, y: 200 },
  { name: 'topR', x: 1200, y: 200 },
  { name: 'mid',  x: 720, y: 450 },
  { name: 'botL', x: 240, y: 700 },
  { name: 'botR', x: 1200, y: 700 },
];
for (const s of cursorStops) {
  await page.mouse.move(s.x, s.y, { steps: 12 });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${outDir}/cursor-${s.name}.png`, fullPage: false });
  console.log('  ✓ cursor-' + s.name + '.png');
}

await browser.close();
console.log('Done.');

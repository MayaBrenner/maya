import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
const out = '/tmp/mybuddy-all-screens';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
// embed size, matching scout.mdx height=880 width=420
const ctx = await browser.newContext({ viewport: { width: 420, height: 880 }, deviceScaleFactor: 1.5 });

const ORDER = [
  'welcome','setup','home','map','park','plan','planDone','buddy','inbox','thread',
  'me','meEdit','meSettings','compose','report','reportDone','feed'
];

const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (msg) => { if (msg.type() === 'error') errors.push('console.error: ' + msg.text().slice(0, 240)); });

await page.goto('http://localhost:3000/interactive/my-buddy/index.html', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2500);

for (let i = 0; i < ORDER.length; i++) {
  // navigate via the global App state — call the React shell's go()
  await page.evaluate((kind) => {
    // find App by walking the React root; simpler: dispatch keyboard events
  }, ORDER[i]);
  await page.screenshot({ path: `${out}/${String(i+1).padStart(2,'0')}-${ORDER[i]}.png`, fullPage: false });
  console.log(`  ✓ ${i+1}/${ORDER.length} ${ORDER[i]}`);
  if (i < ORDER.length - 1) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
  }
}

console.log('errors:', errors.slice(0, 8));
await browser.close();

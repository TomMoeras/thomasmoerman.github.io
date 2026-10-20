// Screenshots of rendered site pages for a visual check: node shot.mjs <relative docs path> [out name]
import { chromium } from 'playwright-core';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const DIR = path.dirname(fileURLToPath(import.meta.url));
const rel = process.argv[2], name = process.argv[3] || rel.replace(/[\/.]/g, '_');
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
  await page.goto(pathToFileURL(path.join(DIR, '..', 'docs', rel)).href, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.screenshot({ path: path.join(DIR, 'out', `${name}.png`), fullPage: false });
  console.log(`out/${name}.png`);
} finally { await browser.close(); }

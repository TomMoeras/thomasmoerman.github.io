// Render every paper's figures: node render.mjs
// Writes out/contact.html (all figures at card size and full size, for review) and, through Chrome,
// ../images/papers/<slug>-<n>.png at 1200 x 660 for the site. Quarto ignores this folder (leading underscore).
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(DIR, 'out'), IMG = path.join(DIR, '..', 'images', 'papers');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(IMG, { recursive: true });

const files = fs.readdirSync(path.join(DIR, 'papers')).filter(f => f.endsWith('.mjs')).sort().reverse();
const papers = [];
for (const f of files) {
  const m = await import(pathToFileURL(path.join(DIR, 'papers', f)).href);
  papers.push({ slug: f.replace(/\.mjs$/, ''), title: m.title, figures: m.default() });
}

const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;
const cards = papers.map(p => `<section><h2>${p.title} <span class="slug">${p.slug}</span></h2>
  <div class="row">${p.figures.map((f, i) => `<figure class="card"><div class="cardimg">${f.svg}</div><figcaption>${i + 1}. ${f.caption || ''}</figcaption></figure>`).join('')}</div>
  <div class="full">${p.figures.map((f, i) => `<div class="figwrap" data-slug="${p.slug}" data-n="${i + 1}">${f.svg}</div>`).join('')}</div></section>`).join('\n');

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Publication figures, contact sheet</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap">
<style>
body{font-family:"Source Sans 3",sans-serif;margin:24px;color:#1b1f24;background:#eef0f3}
h2{font-size:18px;margin:28px 0 8px;border-bottom:3px solid #FFD200;padding-bottom:4px} .slug{color:#6b7280;font-weight:400;font-size:14px;margin-left:8px}
.row{display:flex;gap:16px;flex-wrap:wrap} .card{margin:0;width:430px;background:#fff;border:1px solid #DEE2E6;border-radius:8px;overflow:hidden}
.cardimg{height:240px;overflow:hidden} .cardimg svg{width:100%;height:240px;object-fit:cover} figcaption{font-size:13px;color:#6b7280;padding:6px 10px}
.full{display:flex;gap:16px;flex-wrap:wrap;margin-top:12px} .figwrap{width:1200px;height:660px;background:#fff;box-shadow:0 1px 6px rgba(0,0,0,.15)} .figwrap svg{display:block}
</style></head><body><h1 style="font-size:22px">Publication figures, ${papers.length} papers, ${papers.reduce((a, p) => a + p.figures.length, 0)} figures</h1>
<p style="color:#6b7280">Top row of each paper is the card size on the Publications page (430 x 240). Below it the full 1200 x 660 figures.</p>
${cards}</body></html>`;
fs.writeFileSync(path.join(OUT, 'contact.html'), html);

const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(path.join(OUT, 'contact.html')).href, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { await document.fonts.ready; });
  const fonts = await page.evaluate(() => [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family))].join(', '));
  let n = 0;
  for (const el of await page.$$('.figwrap')) {
    const slug = await el.getAttribute('data-slug'), k = await el.getAttribute('data-n');
    if (only && slug !== only) continue;
    await el.screenshot({ path: path.join(IMG, `${slug}-${k}.png`), type: 'png' });
    n += 1;
  }
  console.log(`fonts: ${fonts}`);
  console.log(`rendered ${n} figures -> images/papers/<slug>-<n>.png, contact sheet -> _figures/out/contact.html`);
} finally { await browser.close(); }

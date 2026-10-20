// Put the figures on the site: node install.mjs
// For every paper with figures, sets the page's `image:` to its first figure (the listing card) and writes
// the figure strip block into the page body between <!-- figstrip --> markers (idempotent).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PUB = path.join(DIR, '..', 'publications');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
let n = 0;
for (const f of fs.readdirSync(path.join(DIR, 'papers')).filter(f => f.endsWith('.mjs')).sort()) {
  const slug = f.replace(/\.mjs$/, '');
  const qmd = path.join(PUB, `${slug}.qmd`);
  if (!fs.existsSync(qmd)) { console.log(`no page for ${slug}`); continue; }
  const m = await import(pathToFileURL(path.join(DIR, 'papers', f)).href);
  const figs = m.default();
  const items = figs.map((fig, i) => `<figure><img src="../images/papers/${slug}-${i + 1}.png" alt="${esc(fig.caption)}" loading="lazy"><figcaption>${esc(fig.caption)}</figcaption></figure>`).join('\n');
  const block = `<!-- figstrip -->\n<div class="figstrip" aria-label="Figures from the paper">\n${items}\n</div>\n<!-- /figstrip -->`;
  let text = fs.readFileSync(qmd, 'utf8');
  // front matter image
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) { console.log(`no front matter in ${slug}`); continue; }
  let head = fm[1];
  const img = `image: ../images/papers/${slug}-1.png`;
  head = /^image:.*$/m.test(head) ? head.replace(/^image:.*$/m, img) : `${img}\n${head}`;
  let body = text.slice(fm[0].length);
  body = /<!-- figstrip -->[\s\S]*?<!-- \/figstrip -->\n?/.test(body) ? body.replace(/<!-- figstrip -->[\s\S]*?<!-- \/figstrip -->\n?/, block + '\n') : `\n${block}\n${body.replace(/^\n+/, '')}`;
  fs.writeFileSync(qmd, `---\n${head}\n---\n${body}`);
  n += 1;
}
console.log(`installed figure strips on ${n} pages`);

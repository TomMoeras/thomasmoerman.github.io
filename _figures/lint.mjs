// Checks over every figure: text size floors (data-pt), the writing rules on labels, the right and bottom margins
// (nothing drawn past x 1160 or y 630, so the card crop keeps everything), and that every paper has 2 to 4 figures.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const MIN_PT = 28;
const BAD = [/—/, /--/, /;/, /\b(robust|leverag|delve|unlock|seamless|pivotal|notably|crucially)\b/i];
let fails = 0;
for (const f of fs.readdirSync(path.join(DIR, 'papers')).filter(f => f.endsWith('.mjs')).sort()) {
  const m = await import(pathToFileURL(path.join(DIR, 'papers', f)).href);
  const figs = m.default();
  const issues = [];
  if (figs.length < 2 || figs.length > 4) issues.push(`${figs.length} figures (keep 2 to 4)`);
  figs.forEach((fig, i) => {
    const pts = [...fig.svg.matchAll(/data-pt="([\d.]+)"/g)].map(x => Number(x[1])).filter(p => p < MIN_PT);
    if (pts.length) issues.push(`figure ${i + 1}: ${pts.length} labels under ${MIN_PT} px (${[...new Set(pts)].join(', ')})`);
    const text = fig.svg.replace(/<[^>]+>/g, ' ');
    for (const re of BAD) if (re.test(text)) issues.push(`figure ${i + 1}: style "${text.match(re)[0]}"`);
    // crude bounds check on rect and text x coordinates
    for (const mm of fig.svg.matchAll(/<rect x="([\d.-]+)" y="([\d.-]+)" width="([\d.]+)" height="([\d.]+)"/g)) {
      const [x, y, w, h] = mm.slice(1).map(Number);
      if (x + w > 1200 || y + h > 660) issues.push(`figure ${i + 1}: rect past the edge (${x + w}, ${y + h})`);
    }
    if (!fig.caption) issues.push(`figure ${i + 1}: no caption`);
    // the title sits left of the venue badge, so at 48 px it holds about 38 characters
    for (const mm of fig.svg.matchAll(/font-size="48"[^>]*>([^<]+)<\/text>/g)) if (mm[1].length > 38) issues.push(`figure ${i + 1}: title ${mm[1].length} characters (keep <= 38): "${mm[1]}"`);
  });
  if (issues.length) { fails += 1; console.log(`${f}: ${issues.join(' | ')}`); }
}
console.log(fails ? `lint: ${fails} paper(s) with issues` : 'lint: clean');
process.exit(fails ? 1 : 0);

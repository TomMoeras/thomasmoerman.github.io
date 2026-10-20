// CLIN 36 poster, SanreMello Corpus. Numbers from the dataset card (huggingface.co/datasets/sanremello/smlc-features)
// and the anglicism counts in the project's poster notes, see numbers.md.
import { svgWrap, T, nodeBox, box, arrowH, arrowPath, chain, FS, BLUE, ORANGE, TEAL, PURPLE, GREEN, GREY, LGREY, LN, MUT, INKD, FILL } from '../lib/fig.mjs';

export const title = 'CLIN 36, SanreMello Corpus';
const V = 'CLIN 36';

function corpus() {
  let s = T(60, 96, 'Seven decades of two song contests', { a: 'start', fs: FS.title, w: 1 });
  const col = (x, name, years, entries, editions, rule, c, f) => {
    s += box(x, 150, 520, 400, f, c);
    s += T(x + 260, 212, name, { fs: 44, w: 1, c: INKD }) + T(x + 260, 256, years, { fs: FS.sub, c: MUT });
    s += T(x + 260, 350, entries, { fs: 72, w: 700, c }) + T(x + 260, 392, 'entries', { fs: FS.sub, c: MUT });
    s += T(x + 260, 450, editions, { fs: FS.sub, c: MUT });
    s += T(x + 260, 510, rule, { fs: FS.sub, c: INKD, w: 1 });
  };
  col(60, 'Sanremo', 'Italy, 1951 to 2026', '2,220', '76 editions', 'Italian lyrics required', GREEN, FILL.green);
  col(620, 'Melodifestivalen', 'Sweden, 1958 to 2026', '1,149', '66 editions', 'Swedish until 2002, then free', BLUE, FILL.blue);
  s += T(600, 610, '3,369 entries with lyrics, metadata, votes and audio features', { fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'Two national contests, 3,369 entries in all' };
}

function method() {
  let s = T(60, 96, 'From lyrics and votes to what wins', { a: 'start', fs: FS.title, w: 1 });
  const src = [['Lyrics', TEAL, FILL.teal], ['Metadata and credits', GREY, '#f1f3f5'], ['Jury and televote', ORANGE, FILL.orange], ['Audio', PURPLE, FILL.purple]];
  src.forEach(([t, c, f], i) => { const y = 150 + i * 104; s += nodeBox(60, y, 300, 84, t, '', { fill: f, stroke: c, tfs: 32 }); s += arrowPath(`M366,${y + 42} C420,${y + 42} 420,350 470,350`, c); });
  const an = ['language and anglicisms', 'code-switching', 'topics over time', 'songwriter networks', 'emotion arcs'];
  s += box(476, 170, 400, 360, '#fff', LN);
  s += T(676, 216, 'Analyses', { fs: FS.node, w: 1, c: INKD });
  an.forEach((t, i) => s += T(676, 268 + i * 52, t, { fs: FS.sub, c: MUT }));
  s += arrowH(882, 940, 350, MUT);
  s += nodeBox(946, 280, 194, 140, 'Placement', 'in the final', { fill: FILL.green, stroke: GREEN, tfs: 34 });
  return { svg: svgWrap(s, V), caption: 'Four sources, five analyses, one outcome to explain' };
}

function anglicisms() {
  let s = T(60, 96, 'English words in the national lyrics', { a: 'start', fs: FS.title, w: 1 });
  const bars = (x0, name, items, c) => {
    s += T(x0, 170, name, { a: 'start', fs: FS.node, w: 1, c });
    const max = 115, w = 300;
    items.forEach(([l, v], i) => {
      const y = 200 + i * 70, bw = v / max * w;
      s += T(x0 + 150, y + 34, l, { a: 'end', fs: FS.sub, c: INKD });
      s += `<rect x="${x0 + 170}" y="${y}" width="${bw}" height="44" rx="6" fill="${c}"/>`;
      s += T(x0 + 170 + bw + 14, y + 33, String(v), { a: 'start', fs: FS.sub, c: INKD });
    });
  };
  bars(60, 'Sanremo, in Italian', [['bar', 101], ['film', 87], ['baby', 84], ['star', 38], ['boom', 37]], GREEN);
  bars(620, 'Melodifestivalen, in Swedish', [['baby', 111], ['hit', 57], ['singel', 56], ['rock', 32], ['okej', 23]], BLUE);
  s += T(60, 610, 'occurrences in majority-language entries from 1960 on', { a: 'start', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'The most frequent English loans in each contest' };
}

export default () => [corpus(), method(), anglicisms()];

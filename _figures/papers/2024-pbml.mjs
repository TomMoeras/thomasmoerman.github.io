// PBML 2024, Improving Fuzzy Match Augmented NMT through Synthetic Data. Numbers from Table 5, see numbers.md.
import { svgWrap, T, nodeBox, box, arrowH, arrowPath, groupedBars, FS, BLUE, ORANGE, TEAL, PURPLE, GREY, LGREY, LN, MUT, INKD, FILL } from '../lib/fig.mjs';

export const title = 'PBML 2024, back-translation plus Neural Fuzzy Repair';
const V = 'PBML 2024';

function method() {
  let s = T(60, 96, 'Back-translation feeds the memory', { a: 'start', fs: FS.title, w: 1 });
  s += nodeBox(60, 160, 330, 130, 'Bilingual pairs', 'limited', { fill: FILL.blue, stroke: BLUE });
  s += nodeBox(60, 400, 330, 130, 'Monolingual text', 'ample', { fill: FILL.teal, stroke: TEAL });
  s += arrowH(396, 460, 225, MUT) + T(428, 205, 'train', { fs: FS.micro, c: MUT });
  s += nodeBox(466, 160, 300, 130, 'Reverse model', '', { fill: FILL.blue, stroke: BLUE });
  s += arrowPath('M396,465 C440,465 440,300 462,250', TEAL, 'aht');
  s += arrowH(772, 826, 225, PURPLE, 'ahp');
  s += nodeBox(832, 160, 308, 130, 'Synthetic pairs', 'real target side', { fill: FILL.purple, stroke: PURPLE });
  s += arrowPath('M986,296 L986,392', PURPLE, 'ahp');
  s += nodeBox(832, 400, 308, 130, 'Memory + training', 'Neural Fuzzy Repair', { fill: FILL.orange, stroke: ORANGE, tfs: 36 });
  return { svg: svgWrap(s, V), caption: 'Back-translated pairs enlarge both the retrieval memory and the training data' };
}

function systems() {
  let s = T(60, 96, 'Four systems, the data each one uses', { a: 'start', fs: FS.title, w: 1 });
  const cols = [['Bilingual pairs', BLUE], ['Fuzzy matches', ORANGE], ['Back-translated pairs', PURPLE]];
  const rows = [['BASE', 1, 0, 0], ['NFR', 1, 1, 0], ['BT', 1, 0, 1], ['BT + NFR, ours', 1, 1, 1]];
  const x0 = 420, cw = 240, y0 = 150, rh = 100;
  cols.forEach(([l, c], i) => s += T(x0 + i * cw + cw / 2, y0 + 10, l, { fs: FS.micro, c, w: 1 }));
  rows.forEach((r, ri) => {
    const y = y0 + 50 + ri * rh;
    if (ri === 3) s += `<rect x="60" y="${y - 10}" width="1080" height="${rh - 10}" rx="12" fill="${FILL.orange}"/>`;
    s += T(80, y + 52, r[0], { a: 'start', fs: FS.node, w: ri === 3 ? 1 : 0, c: INKD });
    cols.forEach(([l, c], i) => { if (r[i + 1]) s += `<circle cx="${x0 + i * cw + cw / 2}" cy="${y + 40}" r="20" fill="${c}"/>`; });
  });
  return { svg: svgWrap(s, V), caption: 'The systems compared, each trained from scratch' };
}

function result() {
  let s = T(60, 96, '6.6 to 7.7 BLEU over the best baseline', { a: 'start', fs: FS.title, w: 1 });
  s += groupedBars(
    [{ l: 'EN to UK', a: 54.85, b: 60.39, c: 66.95 }, { l: 'EN to FR', a: 51.50, b: 54.88, c: 61.91 }, { l: 'FR to EN', a: 53.95, b: 56.99, c: 64.69 }],
    [{ k: 'a', l: 'BASE', c: LGREY }, { k: 'b', l: 'best baseline', c: GREY }, { k: 'c', l: 'BT + NFR', c: ORANGE }],
    { max: 72, yt: 200, yb: 536, legendY: 160, dec: 2, maxBw: 110 });
  s += T(60, 630, 'BLEU, legal and EU texts', { a: 'start', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'BLEU in three directions, Table 5' };
}

export default () => [method(), systems(), result()];

// PSLT 2025, Tailoring MT for Scientific Literature through Topic Filtering and Fuzzy Match Augmentation.
// Numbers from the PSLT 2025 talk slides 21 and 31 (the paper's NMT table and the NMT against LLM comparison), see numbers.md.
import { svgWrap, T, nodeBox, box, arrowH, arrowPath, groupedBars, hBars, FS, BLUE, ORANGE, TEAL, GREEN, PURPLE, GREY, LGREY, LN, MUT, INKD, FILL } from '../lib/fig.mjs';

export const title = 'PSLT 2025, scientific MT';
const V = 'PSLT 2025';

function method() {
  let s = T(60, 96, 'Filter by topic, add fuzzy matches', { a: 'start', fs: FS.title, w: 1 });
  const corpora = ['ParaCrawl', 'EuroPat', 'SciPar'];
  corpora.forEach((c, i) => s += box(60, 170 + i * 110, 240, 80, '#fff', LN, { rx: 12, sw: 3 }) + T(180, 222 + i * 110, c, { fs: FS.sub, c: INKD }));
  corpora.forEach((c, i) => s += arrowPath(`M306,${210 + i * 110} C360,${210 + i * 110} 360,330 420,330`, MUT));
  // the filter as a funnel
  s += `<path d="M426,250 L626,250 L556,360 L556,420 L496,420 L496,360 Z" fill="${FILL.green}" stroke="${GREEN}" stroke-width="4" stroke-linejoin="round"/>`;
  s += T(526, 470, 'FastText topic filter', { fs: FS.micro, c: GREEN, w: 1 });
  s += arrowH(632, 690, 330, GREEN, 'ahg');
  s += nodeBox(696, 260, 200, 140, 'In-domain', 'parallel data', { fill: FILL.teal, stroke: TEAL, tfs: 34 });
  s += arrowH(902, 960, 330, ORANGE, 'aho');
  s += nodeBox(966, 260, 174, 140, 'Fuzzy', 'matches', { fill: FILL.orange, stroke: ORANGE, tfs: 34 });
  s += T(600, 580, 'Neuroscience, climatology and mobility, EN to FR', { fs: FS.sub, c: MUT });
  return { svg: svgWrap(s, V), caption: 'Topic filtering selects in-domain data before fuzzy-match augmentation' };
}

function nmt() {
  let s = T(60, 96, 'Filtered data with fuzzy matches wins', { a: 'start', fs: FS.title, w: 1 });
  s += groupedBars(
    [{ l: 'Neuroscience', a: 39.11, b: 44.40, c: 46.33 }, { l: 'Climatology', a: 29.57, b: 35.70, c: 36.97 }, { l: 'Mobility', a: 30.14, b: 36.11, c: 37.68 }],
    [{ k: 'a', l: 'in-domain only', c: LGREY }, { k: 'b', l: 'plus extra data', c: GREY }, { k: 'c', l: 'filtered + fuzzy matches', c: ORANGE }],
    { max: 50, yt: 200, yb: 536, legendY: 160, dec: 2, maxBw: 110 });
  s += T(60, 630, 'BLEU, EN to FR', { a: 'start', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'BLEU per domain, the filtered data with fuzzy matches wins everywhere' };
}

function llms() {
  let s = T(60, 96, 'The NMT system beats smaller LLMs', { a: 'start', fs: FS.title, w: 1 });
  s += hBars([
    { l: 'Mistral 7B, fuzzy matches', v: 40.50, c: LGREY },
    { l: 'Nemo 13B, fuzzy matches', v: 40.81, c: LGREY },
    { l: 'Tower 7B, fuzzy matches', v: 43.17, c: GREY },
    { l: 'Mistral Small 24B, fuzzy matches', v: 45.05, c: GREY },
    { l: 'NMT, filtered with fuzzy matches', v: 46.33, c: ORANGE, w: 1 },
  ], { x0: 640, x1: 1060, y0: 150, rowH: 84, barH: 50, max: 48, dec: 2 });
  s += T(1140, 600, 'BLEU, neuroscience', { a: 'end', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'BLEU on neuroscience, NMT against four LLMs with fuzzy matches' };
}

export default () => [method(), nmt(), llms()];

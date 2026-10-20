// KeMT 2024, Leveraging Synthetic Monolingual Data for Fuzzy-Match Augmentation. Numbers from Table 4, see numbers.md.
import { svgWrap, T, chain, hBars, FS, BLUE, ORANGE, TEAL, PURPLE, GREY, LGREY, MUT, FILL } from '../lib/fig.mjs';

export const title = 'KeMT 2024, LLM-generated monolingual data';
const V = 'KeMT 2024';

function method() {
  let s = T(60, 96, 'An LLM writes the monolingual text', { a: 'start', fs: FS.title, w: 1 });
  const { s: c } = chain([
    { t: 'LLM', s: 'writes French legal text', fill: FILL.purple, stroke: PURPLE },
    { t: 'Back-translation', s: 'French to English', fill: FILL.blue, stroke: BLUE, ac: PURPLE, am: 'ahp' },
    { t: 'Synthetic pairs', s: 'added to the training data', fill: FILL.purple, stroke: PURPLE, ac: PURPLE, am: 'ahp' },
    { t: 'Neural Fuzzy Repair', s: 'EN to FR legal MT', fill: FILL.orange, stroke: ORANGE, ac: ORANGE, am: 'aho' },
  ], { y: 230, h: 180, gap: 40, tfs: 36 });
  s += c;
  s += T(600, 530, 'No real monolingual text in the domain, so the LLM generates it', { fs: FS.sub, c: MUT });
  return { svg: svgWrap(s, V), caption: 'LLM-generated French text, back-translated, then fuzzy-match augmentation' };
}

function result() {
  let s = T(60, 96, 'Both together beat either alone', { a: 'start', fs: FS.title, w: 1 });
  s += hBars([
    { l: 'Baseline NMT', v: 45.76, c: LGREY },
    { l: 'Back-translation (1:2)', v: 45.79, c: GREY },
    { l: 'Neural Fuzzy Repair', v: 45.61, c: GREY },
    { l: 'BT (1:2) + NFR', v: 47.20, c: ORANGE, w: 1 },
  ], { x0: 520, x1: 1040, y0: 170, rowH: 96, barH: 56, max: 50, dec: 2 });
  s += T(1140, 600, 'BLEU, EN to FR legal', { a: 'end', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'BLEU on EN to FR legal text, Table 4' };
}

export default () => [method(), result()];

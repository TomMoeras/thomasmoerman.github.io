// EAMT 2026, Multilingual Communication in the Asylum Context. Numbers from Figure 2 (tiers) and Table 4, see numbers.md.
import { svgWrap, T, nodeBox, box, arrowH, groupedBars, hBars, FS, BLUE, ORANGE, TEAL, PURPLE, GREY, LGREY, LN, MUT, INKD, FILL } from '../lib/fig.mjs';

export const title = 'EAMT 2026, asylum context';
const V = 'EAMT 2026';

function memory() {
  let s = T(60, 96, 'A 358-sentence memory, 14 languages', { a: 'start', fs: FS.title, w: 1 });
  s += nodeBox(60, 250, 300, 160, 'Memory', '358 sentences', { fill: FILL.orange, stroke: ORANGE });
  s += arrowH(366, 424, 330, ORANGE, 'aho');
  s += nodeBox(430, 250, 300, 160, 'LLM', '15 fuzzy matches', { fill: FILL.blue, stroke: BLUE });
  s += arrowH(736, 794, 330, MUT);
  const tiers = [['High resource', 8, BLUE, FILL.blue], ['Mid', 3, TEAL, FILL.teal], ['Low', 3, ORANGE, FILL.orange]];
  let y = 170;
  tiers.forEach(([l, n, c, f]) => {
    s += T(800, y + 24, `${l}, ${n}`, { a: 'start', fs: FS.micro, c, w: 1 });
    for (let i = 0; i < n; i++) s += `<rect x="${800 + i * 46}" y="${y + 40}" width="38" height="38" rx="8" fill="${f}" stroke="${c}" stroke-width="3"/>`;
    y += 130;
  });
  s += T(60, 560, 'English source, 14 target languages', { a: 'start', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'Fuzzy matches from a 358-sentence memory into an LLM, 14 languages in three tiers' };
}

function tiers() {
  let s = T(60, 96, 'Biggest gains when resources are low', { a: 'start', fs: FS.title, w: 1 });
  s += groupedBars(
    [{ l: 'High resource', z: 61.7, r: 64.9, f: 67.0 }, { l: 'Mid resource', z: 59.7, r: 61.2, f: 63.8 }, { l: 'Low resource', z: 36.1, r: 41.6, f: 47.2 }],
    [{ k: 'z', l: 'zero-shot', c: LGREY }, { k: 'r', l: '15 random examples', c: GREY }, { k: 'f', l: '15 fuzzy matches', c: ORANGE }],
    { max: 72, yt: 200, yb: 536, legendY: 160, dec: 1, maxBw: 110 });
  s += T(60, 630, 'chrF, TranslateGemma 27B', { a: 'start', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'chrF by tier, fuzzy matches against random and zero-shot' };
}

function tigrinya() {
  let s = T(60, 96, 'Tigrinya, an LLM beats the deployed MT', { a: 'start', fs: FS.title, w: 1 });
  s += hBars([
    { l: 'TranslateGemma, zero-shot', v: 14.04, c: LGREY },
    { l: 'TranslateGemma, fuzzy matches', v: 29.99, c: ORANGE },
    { l: 'ModernMT, deployed', v: 34.29, c: BLUE },
    { l: 'Gemini 2.5 Pro, fuzzy matches', v: 43.00, c: PURPLE, w: 1 },
  ], { x0: 560, x1: 1040, y0: 170, rowH: 96, barH: 56, max: 46, dec: 2 });
  s += T(1140, 600, 'chrF', { a: 'end', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'Tigrinya chrF, fuzzy matches more than double the zero-shot score' };
}

export default () => [memory(), tiers(), tigrinya()];

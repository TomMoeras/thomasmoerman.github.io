// WMT 2026, Getting More from Small LLMs and Limited Data. Numbers from Table 10 (official results), see numbers.md.
import { svgWrap, T, nodeBox, box, arrowPath, chain, groupedBars, FS, BLUE, ORANGE, PURPLE, GREY, LN, MUT, INKD, FILL, W } from '../lib/fig.mjs';

export const title = 'WMT 2026, Sorbian multitask';
const V = 'WMT 2026';

function oneModel() {
  const tasks = ['Machine translation', 'Question answering', 'Spell checking', 'Grammar checking', 'Maths reasoning'];
  let s = T(60, 96, 'One 2B model, five Sorbian tasks', { a: 'start', fs: FS.title, w: 1 });
  s += nodeBox(60, 230, 420, 200, 'Qwen3.5-2B', ['one QLoRA model,', 'little data'], { fill: FILL.blue, stroke: BLUE, tfs: 52 });
  tasks.forEach((t, i) => {
    const y = 150 + i * 92;
    s += box(760, y, 380, 66, '#fff', LN, { rx: 12, sw: 3 }) + T(950, y + 44, t, { fs: FS.sub, c: INKD });
    s += arrowPath(`M484,330 C600,330 620,${y + 33} ${752},${y + 33}`, ORANGE, 'aho');
  });
  return { svg: svgWrap(s, V), caption: 'One 2B model serves five Sorbian tasks' };
}

function components() {
  let s = T(60, 96, 'Three components', { a: 'start', fs: FS.title, w: 1 });
  const { s: c } = chain([
    { t: 'Fuzzy matches', s: ['0 or 1 in fine-tuning,', '3 at inference'], fill: FILL.orange, stroke: ORANGE },
    { t: 'Synthetic task data', s: ['typos, paradigm swaps,', 'cloze items'], fill: FILL.purple, stroke: PURPLE },
    { t: 'Score, do not write', s: ['rank candidates', 'by likelihood'], fill: FILL.blue, stroke: BLUE },
  ], { y: 210, h: 200, gap: 50, tfs: 30 });
  s += c;
  s += T(600, 520, 'Authentic pairs 1.07M, plus 0.67M back-translated for retrieval at inference', { fs: FS.sub, c: MUT });
  return { svg: svgWrap(s, V), caption: 'Fuzzy matches by stage, synthetic task data, scoring instead of writing' };
}

function result() {
  let s = T(60, 96, 'Joint winner, first on QA and maths', { a: 'start', fs: FS.title, w: 1 });
  s += groupedBars(
    [{ l: 'MT chrF++', a: 69.57, b: 72.75 }, { l: 'QA acc.', a: 65.05, b: 57.33 }, { l: 'Spelling', a: 76.11, b: 78.03 }, { l: 'Grammar', a: 78.32, b: 79.52 }, { l: 'Maths acc.', a: 30.40, b: 29.00 }],
    [{ k: 'a', l: 'LT3, one 2B model', c: ORANGE }, { k: 'b', l: 'best other team', c: GREY }],
    { max: 82, yt: 200, yb: 536, legendY: 160, dec: 1, maxBw: 90 });
  return { svg: svgWrap(s, V), caption: 'Official results, 22 rank points, first or second on every task' };
}

export default () => [oneModel(), components(), result()];

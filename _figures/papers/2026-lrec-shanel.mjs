// LREC 2026, ShAnEL-2. Numbers from Section 3 (dataset) and Table 2 (performance, 27b-it overall), see numbers.md.
import { svgWrap, T, nodeBox, box, arrowH, arrowPath, groupedBars, bigNum, FS, BLUE, ORANGE, TEAL, PURPLE, GREEN, RED, GREY, LGREY, LN, MUT, INKD, FILL } from '../lib/fig.mjs';

export const title = 'LREC 2026, ShAnEL-2 dataset';
const V = 'LREC 2026';

function dataset() {
  let s = T(60, 96, 'ShAnEL-2, a dataset for L2 exercises', { a: 'start', fs: FS.title, w: 1 });
  s += bigNum(260, 330, '1,185', 'learner responses', BLUE);
  s += T(260, 430, '237 exercises, 9 grammar topics', { fs: FS.sub, c: MUT });
  s += T(260, 470, '15 learners, 3 teachers', { fs: FS.sub, c: MUT });
  const langs = [['English', BLUE, FILL.blue], ['Spanish', TEAL, FILL.teal], ['Dutch', PURPLE, FILL.purple]];
  langs.forEach(([l, c, f], i) => s += nodeBox(560 + i * 200, 190, 180, 100, l, '', { fill: f, stroke: c, tfs: 34 }));
  // correct against incorrect, one stacked bar
  const x0 = 560, w = 580, y = 380;
  s += `<rect x="${x0}" y="${y}" width="${w * 847 / 1185}" height="56" rx="8" fill="${GREEN}"/><rect x="${x0 + w * 847 / 1185}" y="${y}" width="${w * 338 / 1185}" height="56" rx="8" fill="${RED}"/>`;
  s += T(x0 + w * 847 / 1185 / 2, y + 38, '847 correct', { fs: FS.sub, c: '#fff', w: 1 }) + T(x0 + w * 847 / 1185 + w * 338 / 1185 / 2, y + 38, '338', { fs: FS.sub, c: '#fff', w: 1 });
  s += T(x0, y + 100, 'teacher labels, errors annotated', { a: 'start', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: '1,185 authentic learner responses in three languages with teacher corrections' };
}

function setups() {
  let s = T(60, 96, 'Three ways to ask Gemma 3', { a: 'start', fs: FS.title, w: 1 });
  const rows = [['Off-the-shelf', 'the exercise and the response', GREY, '#f1f3f5'], ['Textbook RAG', 'plus coursebook theory', PURPLE, FILL.purple], ['Few-shot RAG', 'plus corrected responses', ORANGE, FILL.orange]];
  rows.forEach(([t, sub, c, f], i) => {
    const y = 150 + i * 150;
    s += nodeBox(60, y, 460, 120, t, sub, { fill: f, stroke: c, tfs: 36 });
    s += arrowPath(`M526,${y + 60} C600,${y + 60} 600,330 660,330`, c, c === ORANGE ? 'aho' : c === PURPLE ? 'ahp' : 'ah');
  });
  s += nodeBox(666, 260, 240, 140, 'Gemma 3', '4B or 27B', { fill: FILL.blue, stroke: BLUE });
  s += arrowH(912, 966, 330, MUT);
  s += nodeBox(972, 260, 168, 140, 'correct', 'or incorrect', { fill: FILL.green, stroke: GREEN, tfs: 34 });
  return { svg: svgWrap(s, V), caption: 'Off-the-shelf, textbook RAG and few-shot RAG, benchmarked on the dataset' };
}

function result() {
  let s = T(60, 96, 'Few-shot RAG, 90% accuracy, 95% recall', { a: 'start', fs: FS.title, w: 1 });
  s += groupedBars(
    [{ l: 'Off-the-shelf', a: 83, r: 90 }, { l: 'Textbook RAG', a: 83, r: 92 }, { l: 'Few-shot RAG', a: 90, r: 95 }],
    [{ k: 'a', l: 'accuracy', c: GREY }, { k: 'r', l: 'recall of the incorrect class', c: ORANGE }],
    { max: 100, yt: 200, yb: 536, legendY: 160, dec: 0, maxBw: 120 });
  s += T(60, 630, 'Gemma 3 27B, overall, percent', { a: 'start', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'Examples beat theory, Table 2' };
}

export default () => [dataset(), setups(), result()];

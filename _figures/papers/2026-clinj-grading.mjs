// CLiN Journal 2026, Fuzzy Semantic Retrieval Strategies for Automated Short-Answer Grading.
// Numbers from the abstract, Section 5.1 and Table (shot count), see numbers.md.
import { svgWrap, T, chain, lineInner, FS, BLUE, ORANGE, GREEN, PURPLE, GREY, LGREY, LN, MUT, INKD, FILL } from '../lib/fig.mjs';

export const title = 'CLiN Journal 2026, fuzzy retrieval for grading';
const V = 'CLiN Journal 2026';

function method() {
  let s = T(60, 96, 'Grading with similar corrected answers', { a: 'start', fs: FS.title, w: 1 });
  const { s: c } = chain([
    { t: 'Student response', s: 'to a grammar exercise', fill: FILL.blue, stroke: BLUE },
    { t: 'Similar responses', s: 'already corrected, fuzzy retrieval', fill: FILL.orange, stroke: ORANGE, ac: ORANGE, am: 'aho' },
    { t: 'LLM', s: 'examples in the prompt', fill: FILL.blue, stroke: BLUE },
    { t: 'Correct', s: 'or incorrect', fill: FILL.green, stroke: GREEN, ac: GREEN, am: 'ahg' },
  ], { y: 230, h: 180, gap: 40, tfs: 36 });
  s += c;
  s += T(600, 530, 'Translation-memory fuzzy matching, applied to grading', { fs: FS.sub, c: MUT });
  return { svg: svgWrap(s, V), caption: 'Fuzzy matching from translation memories, applied to automated grading' };
}

function strategies() {
  let s = T(60, 96, 'Ten strategies, 306 experiments', { a: 'start', fs: FS.title, w: 1 });
  const items = [
    ['Zero-shot', 82.8, LGREY], ['Textbook RAG', 83.1, LGREY], ['Exercise-level RAG', 88.4, GREY], ['Sentence-level RAG', 89.2, GREY],
    ['KB + response similarity', 87.2, ORANGE], ['Exercise similarity', 89.4, ORANGE],
  ];
  const x0 = 560, x1 = 1060, vmin = 80, vmax = 91;
  const xOf = v => x0 + (v - vmin) / (vmax - vmin) * (x1 - x0);
  items.forEach(([l, v, c], i) => {
    const y = 150 + i * 68;
    s += T(x0 - 20, y + 36, l, { a: 'end', fs: FS.sub, c: INKD, w: c === ORANGE ? 1 : 0 });
    s += `<rect x="${x0}" y="${y}" width="${xOf(v) - x0}" height="46" rx="6" fill="${c}"/>`;
    s += T(xOf(v) + 14, y + 34, v.toFixed(1), { a: 'start', fs: FS.sub, c: INKD, w: c === ORANGE ? 1 : 0 });
  });
  s += T(x0, 584, 'accuracy, axis starts at 80', { a: 'start', fs: FS.micro, c: MUT });
  s += T(x0, 618, 'orange, semantic similarity retrieval', { a: 'start', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'Accuracy per strategy, best shot count per topic' };
}

function tradeoff() {
  let s = T(60, 96, 'More examples, more recall', { a: 'start', fs: FS.title, w: 1 });
  s += lineInner(['1', '2', '3', '4', '6', '8'], [
    { l: 'recall', c: ORANGE, w: 1, v: [85.4, 88.3, 89.5, 90.4, 90.6, 91.1], lo: -6 },
    { l: 'accuracy', c: BLUE, w: 1, v: [87.8, 84.7, 84.4, 84.1, 82.9, 82.5], lo: 10 },
  ], { x0: 160, x1: 820, yb: 540, yt: 170, vmin: 80, vmax: 92, tick: 4 });
  s += T(490, 630, 'examples in the prompt', { fs: FS.sub, c: MUT });
  return { svg: svgWrap(s, V), caption: 'The accuracy and recall trade-off by shot count' };
}

export default () => [method(), strategies(), tradeoff()];

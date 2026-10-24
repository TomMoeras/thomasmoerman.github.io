// EMNLP 2026, ContraGAND. Numbers from Table 1 (splits), Tables 4 and 5 (closed and open task) and Table 8 (fine-tuning), see numbers.md.
import { svgWrap, T, nodeBox, chain, arrowPath, groupedBars, bigNum, FS, BLUE, ORANGE, TEAL, PURPLE, GREY, MUT, FILL } from '../lib/fig.mjs';

export const title = 'EMNLP 2026, ContraGAND';
const V = 'EMNLP 2026';

function dataset() {
  let s = T(60, 96, 'A contrastive corpus, 4,852 triples', { a: 'start', fs: FS.title, w: 1 });
  s += bigNum(260, 330, '4,852', 'ambiguous source sentences', BLUE);
  s += T(260, 430, '14,556 rows, three per sentence', { fs: FS.sub, c: MUT });
  s += T(260, 470, '465 test sentences, two annotators', { fs: FS.sub, c: MUT });
  const rows = [
    ['ambiguous', 'Oh, right, you are a cook.', GREY, '#f1f3f5'],
    ['masculine', 'Oh, right, sir, you are a cook.', BLUE, FILL.blue],
    ['feminine', 'Oh, right, madam, you are a cook.', TEAL, FILL.teal],
  ];
  rows.forEach(([t, sub, c, f], i) => s += nodeBox(560, 160 + i * 140, 580, 120, t, sub, { fill: f, stroke: c, tfs: 36 }));
  s += T(60, 630, 'one annotated referent per sentence, nine cue strategies', { a: 'start', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: '4,852 gender-ambiguous sentences, each with a masculine and a feminine minimal pair, Table 1' };
}

function pipeline() {
  let s = T(60, 96, 'Neurosymbolic generation pipeline', { a: 'start', fs: FS.title, w: 1 });
  const { s: c } = chain([
    { t: 'Symbolic router', s: 'picks one of nine strategies', fill: FILL.blue, stroke: BLUE },
    { t: 'LLM proposes', s: 'masculine and feminine variants', fill: FILL.orange, stroke: ORANGE },
    { t: 'LLM judge', s: 'scores five rubric dimensions', fill: FILL.purple, stroke: PURPLE },
    { t: 'Symbolic checks', s: 'edit distance, format, POS, veto', fill: FILL.blue, stroke: BLUE },
  ], { y: 210, h: 200, gap: 40, tfs: 34 });
  s += c;
  // failed rows loop back to the proposer
  s += arrowPath('M1020,414 L1020,500 L460,500 L460,420', MUT, 'ah');
  s += T(740, 548, 'failed rows go round again, up to five rounds', { fs: FS.sub, c: MUT });
  s += T(60, 630, 'Claude Opus proposes, Gemma 31B distils for the open task', { a: 'start', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'A symbolic router, an LLM proposer, an LLM judge and symbolic validators with a repair loop, Figure 1' };
}

function gap() {
  let s = T(60, 96, 'Closed task solved, open task not', { a: 'start', fs: FS.title, w: 1 });
  s += groupedBars(
    [
      { l: 'Gemma 31B', a: 98, b: 95 }, { l: 'Qwen 27B', a: 97, b: 74 }, { l: 'Magistral', a: 88, b: 72 },
      { l: 'Gemma 4B', a: 95, b: 59 }, { l: 'Qwen 4B', a: 93, b: 24 }, { l: 'Ministral', a: 69, b: 32 },
    ],
    [{ k: 'a', l: 'closed task, referent given', c: GREY }, { k: 'b', l: 'open task, referent not given', c: ORANGE }],
    { max: 100, yt: 200, yb: 536, legendY: 160, dec: 0, maxBw: 70 });
  s += T(60, 630, 'zero-shot accuracy, percent, Tables 4 and 5', { a: 'start', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'Every model drops when it must find the referent itself, most of all the small ones, Tables 4 and 5' };
}

function finetune() {
  let s = T(60, 96, 'Contrastive variants close the gap', { a: 'start', fs: FS.title, w: 1 });
  s += groupedBars(
    [{ l: 'Zero-shot', q: 24, g: 59 }, { l: 'FT-GAND', q: 33, g: 33 }, { l: 'FT-CONTRA', q: 96, g: 97 }, { l: 'FT-MULTI', q: 98, g: 98 }],
    [{ k: 'q', l: 'Qwen 4B', c: ORANGE }, { k: 'g', l: 'Gemma 4B', c: BLUE }],
    { max: 100, yt: 200, yb: 536, legendY: 160, dec: 0, maxBw: 110 });
  s += T(60, 630, 'open-task accuracy, percent, Table 8, teacher Gemma 31B zero-shot 95', { a: 'start', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'Fine-tuning on the contrastive variants lifts two 4B students past the 31B teacher, Table 8' };
}

export default () => [dataset(), pipeline(), gap(), finetune()];

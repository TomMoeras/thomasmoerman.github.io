// CLIN 35, Retrieval-augmented Generation for Automated Written Corrective Feedback. Schematic only, no numbers.
import { svgWrap, T, chain, nodeBox, arrowH, FS, BLUE, ORANGE, GREEN, PURPLE, MUT, FILL } from '../lib/fig.mjs';

export const title = 'CLIN 35, corrective feedback';
const V = 'CLIN 35';

function method() {
  let s = T(60, 96, 'Feedback from similar corrections', { a: 'start', fs: FS.title, w: 1 });
  const { s: c } = chain([
    { t: 'Learner sentence', s: 'with an error', fill: FILL.blue, stroke: BLUE },
    { t: 'Similar corrections', s: 'retrieved from a database', fill: FILL.orange, stroke: ORANGE, ac: ORANGE, am: 'aho' },
    { t: 'LLM', s: 'reads both', fill: FILL.blue, stroke: BLUE },
    { t: 'Feedback', s: 'written correction', fill: FILL.green, stroke: GREEN, ac: GREEN, am: 'ahg' },
  ], { y: 230, h: 180, gap: 40, tfs: 36 });
  s += c;
  return { svg: svgWrap(s, V), caption: 'Retrieval-augmented generation of written corrective feedback' };
}

function stages() {
  let s = T(60, 96, 'From dataset to human evaluation', { a: 'start', fs: FS.title, w: 1 });
  const { s: c } = chain([
    { t: 'Dataset', s: 'learner responses and corrections', fill: FILL.purple, stroke: PURPLE },
    { t: 'Feedback generation', s: 'retrieval-augmented LLM', fill: FILL.blue, stroke: BLUE },
    { t: 'Human evaluation', s: 'teachers rate the feedback', fill: FILL.green, stroke: GREEN },
  ], { y: 230, h: 180, gap: 56, tfs: 38 });
  s += c;
  return { svg: svgWrap(s, V), caption: 'The three stages of the study' };
}

export default () => [method(), stages()];

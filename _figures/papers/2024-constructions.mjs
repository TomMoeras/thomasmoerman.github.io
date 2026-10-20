// Constructions 2024, Evaluating Large-Scale Construction Grammars. Numbers from Table 4 (CPS) and Section 4, see numbers.md.
import { svgWrap, T, nodeBox, box, arrowH, FS, BLUE, ORANGE, GREEN, RED, PURPLE, GREY, LN, MUT, INKD, FILL } from '../lib/fig.mjs';

export const title = 'Constructions 2024, construction grammars for frames and roles';
const V = 'Constructions 2024';

function method() {
  let s = T(60, 96, 'From sentence to frames and roles', { a: 'start', fs: FS.title, w: 1 });
  s += nodeBox(60, 250, 320, 160, 'Sentence', 'I tell my sister a story', { fill: FILL.blue, stroke: BLUE, tfs: 40 });
  s += arrowH(386, 440, 330, MUT);
  // a small construction network
  const nodes = [[560, 250], [660, 200], [760, 250], [610, 400], [710, 420], [810, 380], [660, 320]];
  const edges = [[0, 1], [1, 2], [0, 6], [6, 2], [3, 6], [6, 4], [4, 5], [2, 5], [0, 3]];
  s += `<rect x="470" y="160" width="400" height="340" rx="16" fill="${PNL_()}" stroke="${LN}" stroke-width="4"/>`;
  edges.forEach(([a, b]) => { s += `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="${GREY}" stroke-width="4"/>`; });
  nodes.forEach(([x, y], i) => { s += `<circle cx="${x}" cy="${y}" r="${i === 6 ? 22 : 16}" fill="${i === 6 ? ORANGE : BLUE}"/>`; });
  s += T(670, 540, 'construction network', { fs: FS.micro, c: MUT });
  s += arrowH(876, 930, 330, MUT);
  s += box(936, 200, 204, 260, FILL.green, GREEN) + T(1038, 262, 'TELL', { fs: 40, w: 1, c: INKD });
  s += T(1038, 320, 'Agent', { fs: FS.sub, c: MUT }) + T(1038, 362, 'Recipient', { fs: FS.sub, c: MUT }) + T(1038, 404, 'Theme', { fs: FS.sub, c: MUT });
  return { svg: svgWrap(s, V), caption: 'A construction grammar extracts the semantic frame and its roles' };
}
const PNL_ = () => '#f3f6fa';

function heuristics() {
  let s = T(60, 96, 'Which heuristic helps comprehension', { a: 'start', fs: FS.title, w: 1 });
  const items = [['Local dependency preference', 17.7, GREEN], ['Network connection strength', 7.1, GREEN], ['Frequency-based priority', -63.6, RED]];
  const x0 = 760, scale = 4.4;
  s += `<line x1="${x0}" y1="150" x2="${x0}" y2="560" stroke="${LN}" stroke-width="3"/>`;
  items.forEach(([l, v, c], i) => {
    const y = 190 + i * 120, w = Math.abs(v) * scale;
    s += T(60, y + 36, l, { a: 'start', fs: FS.sub, c: INKD, w: 1 });
    s += `<rect x="${v < 0 ? x0 - w : x0}" y="${y}" width="${w}" height="52" rx="6" fill="${c}"/>`;
    s += T(v < 0 ? x0 + 16 : x0 + w + 16, y + 38, (v > 0 ? '+' : '') + v.toFixed(1), { a: 'start', fs: FS.value, c, w: 1 });
  });
  s += T(1140, 600, 'composite performance score, F1', { a: 'end', fs: FS.micro, c: MUT });
  return { svg: svgWrap(s, V), caption: 'The frequency-based heuristic hurts, the network heuristic helps' };
}

export default () => [method(), heuristics()];

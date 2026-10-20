// Figure primitives for the publication thumbnails, in the house style of the talk figures (figures.mjs of the
// ugent-presentation kit): UGent blue as the structural colour, orange as the single accent, fixed concept colours,
// no top or right spines, one muted baseline, the value on every bar, direct labels, no chartjunk.
//
// Every figure is a 1200 x 660 SVG (the Publications card shows it at about 430 x 240, so everything must read at
// 36 percent). Text sizes are in pixels of the 1200-wide canvas and recorded as data-pt so lint can enforce the
// floors: 28 for micro labels, 32 for sub-labels, 40 for node labels. The site font is Source Sans 3.

export const BLUE = '#1E64C8', ORANGE = '#F1A42B', INK = '#1b1f24', INKD = '#212529', MUT = '#6b7280', LN = '#d9dee6', PNL = '#f3f6fa';
export const TEAL = '#2D8CA8', PURPLE = '#7E6BA8', PURPLE2 = '#a493c6', GREEN = '#2E8B57', RED = '#C0524C', GREY = '#9aa3af', LGREY = '#c3c9d2', DGREY = '#6b7280', GRID = '#DEE2E6', AXISC = '#495057';
export const FILL = { blue: '#eef4fd', teal: '#e7f1f4', orange: '#fdf3e3', purple: '#f3f0f8', green: '#eaf5ee', red: '#fbeeed' };
export const FS = { title: 48, node: 40, value: 36, axis: 34, sub: 32, micro: 28 };
export const W = 1200, H = 660;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const T = (x, y, s, o = {}) => {
  const px = o.fs || FS.sub;
  return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-family="'Source Sans 3',sans-serif" font-size="${px}" data-pt="${px}" fill="${o.c || INK}"${o.w ? ` font-weight="${o.w === 1 ? 600 : o.w}"` : ''}${o.ls ? ` letter-spacing="${o.ls}"` : ''}${o.st ? ` style="${o.st}"` : ''}>${esc(s)}</text>`;
};
// rich text: parts are strings or {t, c, w}
export const TR = (x, y, parts, o = {}) => {
  const px = o.fs || FS.sub;
  return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-family="'Source Sans 3',sans-serif" font-size="${px}" data-pt="${px}" fill="${o.c || INK}">${parts.map(p => typeof p === 'string' ? esc(p) : `<tspan fill="${p.c || INK}"${p.w ? ' font-weight="600"' : ''}>${esc(p.t)}</tspan>`).join('')}</text>`;
};
const DEFS = `<defs>${[['ah', MUT], ['aho', ORANGE], ['ahp', PURPLE], ['aht', TEAL], ['ahb', BLUE], ['ahg', GREEN]].map(([id, c]) => `<marker id="${id}" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,4 L0,8 Z" fill="${c}"/></marker>`).join('')}</defs>`;

// The venue badge, top right, small and muted.
export const badge = (text) => {
  const w = Math.round(text.length * 15.5 + 44);
  return `<rect x="${W - 40 - w}" y="28" width="${w}" height="46" rx="23" fill="${PNL}" stroke="${LN}" stroke-width="2"/>${T(W - 40 - w / 2, 60, text, { fs: FS.micro, c: MUT, w: 1, ls: 0.5 })}`;
};

export const svgWrap = (inner, venue) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" class="fig"><rect width="${W}" height="${H}" fill="#fff"/>${DEFS}${inner}${venue ? badge(venue) : ''}</svg>`;

export const box = (x, y, w, h, fill, stroke, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 16}" fill="${fill}" stroke="${stroke}" stroke-width="${o.sw ?? 4}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
// Text fitting. Source Sans 3 averages about 0.5 em per character (0.53 for semibold), so a label is shrunk,
// down to a floor, until it fits the width, and a sub-label is wrapped onto up to two lines first.
export const fit = (text, fs, maxW, min = 28, k = 0.5) => Math.max(min, Math.min(fs, Math.floor(maxW / (k * Math.max(1, text.length)))));
export const wrap = (text, maxChars) => {
  const words = String(text).split(' '), lines = [];
  let cur = '';
  for (const wd of words) { if (cur && (cur + ' ' + wd).length > maxChars) { lines.push(cur); cur = wd; } else cur = cur ? cur + ' ' + wd : wd; }
  if (cur) lines.push(cur);
  return lines;
};
// a labelled node, title and optional sub-label (string, wrapped to two lines, or an array of lines) centred
export const nodeBox = (x, y, w, h, title, sub, o = {}) => {
  const inner = w - 28;
  const tfs = fit(title, o.tfs || FS.node, inner, 30, 0.53);
  const sfs0 = o.sfs || FS.sub;
  let lines = Array.isArray(sub) ? sub : (sub ? wrap(sub, Math.floor(inner / (0.5 * sfs0))) : []);
  if (lines.length > 2 && !Array.isArray(sub)) lines = wrap(sub, Math.ceil(String(sub).length / 2) + 2);
  const sfs = lines.length ? Math.min(sfs0, ...lines.map(l => fit(l, sfs0, inner, 28))) : sfs0;
  const lh = sfs * 1.15, total = tfs + lines.length * lh;
  const top = y + h / 2 - total / 2;
  let s = box(x, y, w, h, o.fill || '#fff', o.stroke || LN, o) + T(x + w / 2, top + tfs * 0.82, title, { fs: tfs, w: 1, c: o.tc || INKD });
  lines.forEach((l, i) => { s += T(x + w / 2, top + tfs + (i + 1) * lh - lh * 0.22, l, { fs: sfs, c: o.sc || MUT }); });
  return `<g>${s}</g>`;
};
export const arrowH = (x1, x2, y, col = MUT, mk = 'ah') => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${col}" stroke-width="5" marker-end="url(#${mk})"/>`;
export const arrowV = (x, y1, y2, col = MUT, mk = 'ah') => `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${col}" stroke-width="5" marker-end="url(#${mk})"/>`;
export const arrowPath = (d, col = MUT, mk = 'ah') => `<path d="${d}" fill="none" stroke="${col}" stroke-width="5" marker-end="url(#${mk})"/>`;
// a row of nodes joined by arrows, each {t, s, fill, stroke}; returns the SVG and the x positions
export const chain = (items, { y = 240, h = 140, x0 = 60, x1 = W - 60, gap = 56, tfs } = {}) => {
  const n = items.length, w = (x1 - x0 - gap * (n - 1)) / n;
  let s = '';
  items.forEach((it, i) => {
    const x = x0 + i * (w + gap);
    s += nodeBox(x, y, w, h, it.t, it.s, { fill: it.fill, stroke: it.stroke, tfs, sc: it.sc });
    if (i) s += arrowH(x - gap + 6, x - 6, y + h / 2, it.ac || MUT, it.am || 'ah');
  });
  return { s, w };
};

// Grouped bars inside a region. cats [{l, a, b, ...}], series [{k, l, c}]. The value sits on every bar.
export function groupedBars(cats, series, { x0 = 80, x1 = W - 80, yb = H - 110, yt = 150, max, vmin = 0, dec = 1, sg = 18, maxBw = 150, legend = series.length > 1, legendY = 60, catFs = FS.axis, valFs = FS.value } = {}) {
  const dom = (max || Math.max(...cats.flatMap(c => series.map(s => c[s.k]).filter(v => v != null)))) * 1.14;
  const yOf = v => yb - ((v - vmin) / (dom - vmin)) * (yb - yt);
  const gap = (x1 - x0) / cats.length, bw = Math.min(maxBw, (gap * 0.8 - sg * (series.length - 1)) / series.length);
  let s = `<line x1="${x0}" y1="${yb}" x2="${x1}" y2="${yb}" stroke="${GRID}" stroke-width="3"/>`;
  cats.forEach((c, ci) => {
    const cx = x0 + gap * (ci + 0.5), tot = series.length * bw + (series.length - 1) * sg;
    series.forEach((sr, si) => {
      const v = c[sr.k]; if (v == null) return;
      const bx = cx - tot / 2 + si * (bw + sg), by = yOf(v);
      s += `<rect x="${bx}" y="${by}" width="${bw}" height="${yb - by}" rx="6" fill="${sr.c}"/>`;
      s += T(bx + bw / 2, by - 16, v.toFixed(dec), { fs: valFs, c: INKD, w: 1 });
    });
    s += T(cx, yb + 46, c.l, { fs: catFs, c: AXISC });
  });
  if (legend) {
    const lw = (x1 - x0) / series.length;
    series.forEach((sr, si) => { s += `<rect x="${x0 + si * lw}" y="${legendY - 24}" width="26" height="26" rx="5" fill="${sr.c}"/>` + T(x0 + si * lw + 40, legendY, sr.l, { a: 'start', fs: FS.sub, c: sr.c, w: 1 }); });
  }
  if (vmin) s += T(x0, yt - 24, `axis starts at ${vmin}`, { a: 'start', fs: FS.micro, c: MUT });
  return s;
}

// Horizontal bars, one per item {l, v, c}, value at the end. Good for rankings.
export function hBars(items, { x0 = 420, x1 = W - 170, y0 = 110, rowH = 64, barH = 40, max, dec = 1, lfs = FS.sub } = {}) {
  const dom = (max || Math.max(...items.map(i => i.v))) * 1.05;
  let s = '';
  items.forEach((it, i) => {
    const y = y0 + i * rowH, w = (it.v / dom) * (x1 - x0);
    s += T(x0 - 20, y + barH / 2 + 11, it.l, { a: 'end', fs: lfs, c: it.lc || INKD, w: it.w ? 1 : 0 });
    s += `<rect x="${x0}" y="${y}" width="${w}" height="${barH}" rx="6" fill="${it.c}"/>`;
    s += T(x0 + w + 16, y + barH / 2 + 12, it.v.toFixed(dec) + (it.unit || ''), { a: 'start', fs: FS.sub, c: INKD, w: it.w ? 1 : 0 });
  });
  return s;
}

// Lines over ordered categories, direct labels at the right end. series [{l, c, v: [...], lo, w}]
export function lineInner(xs, series, { x0 = 140, x1 = 760, yb = H - 120, yt = 120, vmin, vmax, tick = 0, ylab = '' } = {}) {
  const xOf = i => x0 + (x1 - x0) * (xs.length === 1 ? 0.5 : i / (xs.length - 1));
  const yOf = v => yb - (v - vmin) / (vmax - vmin) * (yb - yt);
  let s = `<line x1="${x0}" y1="${yb}" x2="${x1}" y2="${yb}" stroke="${GRID}" stroke-width="3"/>`;
  xs.forEach((x, i) => { s += T(xOf(i), yb + 48, x, { fs: FS.axis, c: AXISC }); });
  if (ylab) s += T(x0 - 24, yt - 30, ylab, { a: 'end', fs: FS.axis, c: AXISC });
  if (tick) for (let v = vmin; v <= vmax + 1e-9; v += tick) {
    if (v > vmin) s += `<line x1="${x0}" y1="${yOf(v)}" x2="${x1}" y2="${yOf(v)}" stroke="${GRID}" stroke-width="2" stroke-dasharray="6 8"/>`;
    s += T(x0 - 24, yOf(v) + 11, String(v), { a: 'end', fs: FS.sub, c: MUT });
  }
  series.forEach(sr => {
    const pts = sr.v.map((v, i) => [xOf(i), yOf(v)]);
    s += `<path d="${pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ',' + p[1]).join(' ')}" fill="none" stroke="${sr.c}" stroke-width="7"${sr.dash ? ' stroke-dasharray="14 10"' : ''}/>`;
    pts.forEach(p => { s += `<circle cx="${p[0]}" cy="${p[1]}" r="11" fill="${sr.c}"/>`; });
    const last = pts[pts.length - 1];
    s += T(last[0] + 26, last[1] + 11 + (sr.lo || 0), `${sr.l}  ${sr.v[sr.v.length - 1].toFixed(sr.dec ?? 1)}`, { a: 'start', fs: FS.sub, c: sr.c, w: sr.w ? 1 : 0 });
  });
  return s;
}

// A big number with a label under it, for a headline tile.
export const bigNum = (x, y, value, label, col = ORANGE) => T(x, y, value, { fs: 96, c: col, w: 700 }) + T(x, y + 48, label, { fs: FS.sub, c: MUT });

// Small squares as pictograms of data: n squares of colour c in a row from (x, y).
export const squares = (x, y, n, c, { size = 26, gap = 8, stroke } = {}) => Array.from({ length: n }, (_, i) => `<rect x="${x + i * (size + gap)}" y="${y}" width="${size}" height="${size}" rx="5" fill="${c}"${stroke ? ` stroke="${stroke}" stroke-width="3"` : ''}/>`).join('');

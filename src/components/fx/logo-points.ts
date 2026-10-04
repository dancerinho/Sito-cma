import { pentagonPaths } from "@/components/brand/logo-mark";

/**
 * Punti distribuiti lungo il pentagono del marchio, usati dalle particelle
 * per comporre il logo. I tracciati usano solo M, L, Q e Z in
 * coordinate assolute (viewBox 200×200), quindi basta un campionatore
 * minimo invece di appoggiarsi al DOM.
 */

type Pt = [number, number];

function flatten(d: string): Pt[] {
  const tokens = d.match(/[MLQZ]|-?\d*\.?\d+/g) ?? [];
  const pts: Pt[] = [];
  let i = 0;
  let start: Pt = [0, 0];
  let cur: Pt = [0, 0];
  const num = () => parseFloat(tokens[i++] ?? "0");

  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (cmd === "M") {
      cur = [num(), num()];
      start = cur;
      pts.push(cur);
    } else if (cmd === "L") {
      cur = [num(), num()];
      pts.push(cur);
    } else if (cmd === "Q") {
      const c: Pt = [num(), num()];
      const end: Pt = [num(), num()];
      for (let s = 1; s <= 16; s++) {
        const t = s / 16;
        const u = 1 - t;
        pts.push([u * u * cur[0] + 2 * u * t * c[0] + t * t * end[0], u * u * cur[1] + 2 * u * t * c[1] + t * t * end[1]]);
      }
      cur = end;
    } else if (cmd === "Z") {
      pts.push(start);
      cur = start;
    }
  }
  return pts;
}

/**
 * `count` punti in ordine casuale (così anche i primi n sono distribuiti in
 * modo uniforme) lungo il pentagono esterno del marchio: x e y normalizzati
 * con il centro in 0 e gli spigoli a raggio 1. z dice a quale dei tre
 * pentagoni appartiene il punto (metà al primo, un quarto agli altri due):
 * rotazione e scala di ognuno si applicano nello shader, così il marchio
 * può aprirsi a stella.
 */
export function sampleLogo(count: number, random: () => number = Math.random) {
  const pts = flatten(pentagonPaths.outer);
  const lengths = [0];
  for (let k = 1; k < pts.length; k++) {
    const a = pts[k - 1]!;
    const b = pts[k]!;
    lengths.push(lengths[k - 1]! + Math.hypot(b[0] - a[0], b[1] - a[1]));
  }
  const total = lengths[lengths.length - 1]!;

  const out = new Float32Array(count * 3);
  // Centro e raggio del pentagono esterno nel viewBox 200×200.
  const cx = 100;
  const cy = 100;
  const scale = 1 / 78;

  for (let n = 0; n < count; n++) {
    const pick = random() * total;
    let lo = 0;
    let hi = lengths.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (lengths[mid]! < pick) lo = mid;
      else hi = mid;
    }
    const from = pts[lo]!;
    const to = pts[hi]!;
    const span = lengths[hi]! - lengths[lo]! || 1;
    const t = Math.min(1, Math.max(0, (pick - lengths[lo]!) / span));
    const r = random();
    out[n * 3] = (from[0] + (to[0] - from[0]) * t - cx) * scale;
    out[n * 3 + 1] = -(from[1] + (to[1] - from[1]) * t - cy) * scale;
    out[n * 3 + 2] = r < 0.5 ? 0 : r < 0.75 ? 1 : 2;
  }
  return out;
}

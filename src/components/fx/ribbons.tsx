"use client";

import { useEffect, useRef } from "react";
import { TICK, addTick } from "@/components/fx/ticker";

/**
 * Sfondo del sito: un unico nastro di centinaia di fili di luce che scorre
 * lungo tutta la pagina con un percorso a S, disegnato in WebGL2.
 *
 * Il percorso è ancorato al documento: ogni sezione dichiara con
 * `data-path="0.7"` dove deve passare il nastro alla sua altezza (0 = bordo
 * sinistro, 1 = bordo destro), e l'hero con `data-path="hero"` disegna la
 * curva incandescente iniziale. Scorrendo, il nastro si muove insieme ai
 * contenuti, pixel per pixel, senza mai cambiare forma o staccarsi.
 *
 * Il canvas copre lo schermo più un piccolo margine sopra e sotto, sta nel
 * livello che scorre con la pagina e viene riposizionato a ogni fotogramma,
 * subito dopo lo scroll morbido: anche se il telefono scorre più veloce del
 * disegno, il nastro resta attaccato ai contenuti.
 *
 * Pipeline per fotogramma: fili e scintille sommati in una texture HDR,
 * bagliore su cinque livelli, composizione con profondità di campo, tone
 * mapping e dithering.
 */

type Anchor = {
  /** Posizione verticale nel documento, in pixel. */
  y: number;
  /** Posizione orizzontale: 0 bordo sinistro, 1 bordo destro. */
  x: number;
  /** Mezza larghezza del nastro, in altezze di schermo. */
  w: number;
  /** Luminosità. */
  i: number;
  /** Incandescenza: 1 sulla curva dell'hero. */
  g: number;
  /** Sezione che ha dichiarato l'ancoraggio. */
  sec?: number;
  /** Ingresso o uscita dell'hero: cede il posto se si scontra con la sezione vicina. */
  soft?: boolean;
};

/**
 * Pendenza massima del nastro tra due sezioni, in pixel orizzontali per
 * pixel verticali: oltre, il percorso diventerebbe quasi orizzontale.
 */
const MAX_SLOPE = 1.4;

const STRAND = /* glsl */ `
uniform highp sampler2D u_path;
uniform float u_seg;
uniform float u_time;
uniform float u_aspect;
uniform vec2 u_m;
uniform float u_mStr;
uniform vec2 u_mVel;
uniform vec2 u_par;

float g_f;
vec4 g_b;

// Punto del filo s alla posizione fj lungo il percorso visibile.
vec2 strand(float fj, vec4 s) {
  int j = int(clamp(floor(fj + 0.5), 0.0, u_seg));
  vec4 A = texelFetch(u_path, ivec2(j, 0), 0);
  vec4 B = texelFetch(u_path, ivec2(j, 1), 0);
  g_b = B;
  // Y è la posizione lungo la pagina in altezze di schermo: torsione e
  // ondulazioni sono legate al documento e scorrono insieme a lui.
  float Y = B.w;
  // Il nastro respira (si stringe e si allarga) ma non si ribalta mai, e
  // tutti i fili lo fanno insieme.
  float spread = B.x * (0.6 + 0.4 * cos(Y * 2.3 + u_time * 0.16)) + 0.008;
  // Le onde cambiano fase in modo continuo da un bordo all'altro del nastro,
  // mai a caso da un filo al vicino. La variazione di fase è limitata così
  // che lo spostamento cresca sempre con s.x: l'ordine dei fili non cambia
  // e non si incrociano.
  float amp = 0.05 * (0.2 + B.x);
  float phase = min(1.6, 0.6 * spread / amp);
  float off = s.x * spread;
  off += (sin(Y * 9.0 + u_time * 0.6 + s.x * phase) * 0.05 + sin(Y * 23.0 - u_time * 0.9 + s.x * phase * 1.5) * 0.012) * (0.2 + B.x);
  // Spostamento orizzontale invece che lungo la normale: ogni filo è una
  // curva x = f(y) e nelle curve strette non si ripiega su se stesso. La
  // correzione con la pendenza mantiene la larghezza dove il nastro è obliquo.
  float slope = max(-A.w, 0.4);
  vec2 p = A.xy + vec2(off / slope, 0.0);

  // Parallasse: i fili più vicini si spostano di più col puntatore.
  p += u_par * (s.w - 0.35) * 0.05;

  // Interazione: da lontano i fili si allungano verso il puntatore, da
  // vicino gli si aprono attorno come una lente, e se lo trascinano dietro.
  vec2 dm = p - u_m;
  float r2 = dot(dm, dm);
  float pull = exp(-r2 / 0.22) * u_mStr;
  float f = exp(-r2 / 0.04) * u_mStr;
  g_f = f;
  p -= dm * pull * 0.22;
  p += dm / (sqrt(r2) + 0.025) * f * 0.11;
  p += u_mVel * (f + pull * 0.4) * 0.04;
  return p;
}
`;

const LINE_VERT = /* glsl */ `#version 300 es
precision highp float;
layout(location = 0) in vec2 a_vert;
layout(location = 1) in vec4 a_seed;
uniform vec2 u_res;
uniform float u_dpr;
uniform float u_gain;
uniform float u_intensity;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
out float v_side;
out vec3 v_col;
${STRAND}
void main() {
  float fj = a_vert.x * u_seg;
  vec2 p = strand(fj, a_seed);
  float f = g_f;
  vec4 B = g_b;
  vec2 d = fj < u_seg ? strand(fj + 1.0, a_seed) - p : p - strand(fj - 1.0, a_seed);
  float L = length(d);
  d = L > 1e-6 ? d / L : vec2(0.0, 1.0);
  vec2 n = vec2(-d.y, d.x);

  // Larghezza in pixel del dispositivo: quasi tutti i fili sono sotto il
  // pixel; li disegno larghi almeno 1.5 px e abbasso la luminosità in
  // proporzione, così restano sottili ma senza scalettature.
  float depth = a_seed.w;
  float wDev = (0.45 + 3.2 * pow(depth, 10.0)) * u_dpr;
  float wDraw = max(wDev, 1.5);
  p += n * a_vert.y * wDraw / u_res.y;
  gl_Position = vec4(p.x / u_aspect, p.y, 0.0, 1.0);

  float hot = B.z * B.z * B.z;
  float b = 0.1 + 0.9 * pow(a_seed.z, 2.6);
  float nearDim = mix(1.0, 0.3, smoothstep(0.86, 1.0, depth));
  float shimmer = 0.7 + 0.3 * sin(B.w * 16.0 - u_time * 1.4 + a_seed.y * 40.0);
  vec3 col = mix(u_c1, u_c2, smoothstep(0.45, 0.9, a_seed.y));
  col = mix(col, u_c3, step(0.84, fract(a_seed.z * 7.13)) * 0.9);
  col = mix(col, vec3(0.92, 1.0, 1.0), hot * 0.3);
  float cover = wDev / wDraw;
  v_col = col * b * nearDim * shimmer * cover * B.y * (1.0 + 2.6 * hot + 3.0 * f) * u_gain * u_intensity;
  v_side = a_vert.y;
}
`;

const LINE_FRAG = /* glsl */ `#version 300 es
precision highp float;
in float v_side;
in vec3 v_col;
out vec4 o;
void main() {
  float d = abs(v_side);
  float a = 1.0 - d * d;
  o = vec4(v_col * a * a, 1.0);
}
`;

const POINT_VERT = /* glsl */ `#version 300 es
precision highp float;
layout(location = 0) in vec4 a_seed;
layout(location = 1) in vec2 a_extra;
uniform float u_dpr;
uniform float u_intensity;
uniform vec3 u_c1;
out vec3 v_col;
out float v_kind;
${STRAND}
void main() {
  float kind = a_extra.y;
  // Le scintille scorrono lungo i fili; le bolle sfocate fluttuano piano.
  float speed = mix(0.02, 0.06, a_seed.z) * (kind > 0.5 ? 0.15 : 1.0);
  float fj = fract(a_extra.x + u_time * speed) * u_seg;
  vec2 p = mix(strand(floor(fj), a_seed), strand(floor(fj) + 1.0, a_seed), fract(fj));
  vec4 B = g_b;
  float k = a_seed.y * 6.2831;
  p += vec2(sin(u_time * 0.3 + k), cos(u_time * 0.27 + k * 1.3)) * (kind > 0.5 ? 0.14 : 0.005);
  gl_Position = vec4(p.x / u_aspect, p.y, 0.0, 1.0);
  vec3 col = mix(u_c1, vec3(1.0), 0.55);
  if (kind > 0.5) {
    gl_PointSize = (10.0 + 46.0 * a_seed.w) * u_dpr;
    v_col = u_c1 * 0.05 * B.y * u_intensity;
  } else {
    gl_PointSize = (1.4 + 2.4 * a_seed.w) * u_dpr;
    float tw = pow(0.5 + 0.5 * sin(u_time * (1.2 + 3.0 * a_seed.z) + k * 5.0), 3.0);
    v_col = col * (0.25 + 1.8 * tw) * B.y * (1.0 + 2.0 * g_f) * 0.8 * u_intensity;
  }
  v_kind = kind;
}
`;

const POINT_FRAG = /* glsl */ `#version 300 es
precision highp float;
in vec3 v_col;
in float v_kind;
out vec4 o;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  float a = v_kind > 0.5
    ? (1.0 - smoothstep(0.7, 1.0, d)) * (0.55 + 0.45 * smoothstep(0.4, 0.95, d))
    : exp(-d * d * 5.0);
  o = vec4(v_col * a, 1.0);
}
`;

const QUAD_VERT = /* glsl */ `#version 300 es
layout(location = 0) in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const DOWN_FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D u_tex;
uniform vec2 u_texel;
in vec2 v_uv;
out vec4 o;
void main() {
  vec2 h = u_texel;
  vec3 c = texture(u_tex, v_uv).rgb * 4.0;
  c += texture(u_tex, v_uv - h).rgb;
  c += texture(u_tex, v_uv + h).rgb;
  c += texture(u_tex, v_uv + vec2(h.x, -h.y)).rgb;
  c += texture(u_tex, v_uv - vec2(h.x, -h.y)).rgb;
  o = vec4(c / 8.0, 1.0);
}
`;

const UP_FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D u_tex;
uniform sampler2D u_base;
uniform vec2 u_texel;
in vec2 v_uv;
out vec4 o;
void main() {
  vec2 h = u_texel;
  vec3 c = texture(u_tex, v_uv + vec2(-h.x * 2.0, 0.0)).rgb;
  c += texture(u_tex, v_uv + vec2(-h.x, h.y)).rgb * 2.0;
  c += texture(u_tex, v_uv + vec2(0.0, h.y * 2.0)).rgb;
  c += texture(u_tex, v_uv + vec2(h.x, h.y)).rgb * 2.0;
  c += texture(u_tex, v_uv + vec2(h.x * 2.0, 0.0)).rgb;
  c += texture(u_tex, v_uv + vec2(h.x, -h.y)).rgb * 2.0;
  c += texture(u_tex, v_uv + vec2(0.0, -h.y * 2.0)).rgb;
  c += texture(u_tex, v_uv + vec2(-h.x, -h.y)).rgb * 2.0;
  o = vec4(c / 12.0 + texture(u_base, v_uv).rgb, 1.0);
}
`;

const COMPOSITE_FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D u_scene;
uniform sampler2D u_bloom;
uniform sampler2D u_soft;
uniform float u_dof;
uniform float u_view;
uniform float u_bloomGain;
uniform float u_softGain;
uniform float u_exposure;
uniform vec3 u_bg;
in vec2 v_uv;
out vec4 o;
void main() {
  vec3 s = texture(u_scene, v_uv).rgb;
  vec3 soft = texture(u_soft, v_uv).rgb * u_softGain;
  vec3 b = texture(u_bloom, v_uv).rgb;
  // A fuoco al centro dello schermo, più morbido verso l'alto e il basso.
  float dist = abs(v_uv.y - 0.5) / u_view;
  float blur = clamp(u_dof * smoothstep(0.15, 0.95, dist), 0.0, 1.0);
  vec3 c = mix(s, soft, blur) + b * u_bloomGain;
  c = 1.0 - exp(-c * u_exposure);
  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) / 255.0;
  o = vec4(u_bg + c, 1.0);
}
`;

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as [number, number, number];

const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * Percorso orizzontale x(y) che passa esattamente per gli ancoraggi senza
 * mai superarli (interpolazione cubica monotona di Fritsch–Carlson): le
 * curve della S sono morbide e i punti più esterni restano dove li vuole
 * la pagina.
 */
function buildPath(anchors: Anchor[]) {
  const n = anchors.length;
  const slopes: number[] = [];
  for (let k = 0; k < n - 1; k++) {
    const a = anchors[k]!;
    const b = anchors[k + 1]!;
    slopes.push((b.x - a.x) / Math.max(b.y - a.y, 1));
  }
  const tangents: number[] = new Array(n).fill(0);
  tangents[0] = slopes[0] ?? 0;
  tangents[n - 1] = slopes[n - 2] ?? 0;
  for (let k = 1; k < n - 1; k++) {
    const d0 = slopes[k - 1]!;
    const d1 = slopes[k]!;
    tangents[k] = d0 * d1 <= 0 ? 0 : (2 * d0 * d1) / (d0 + d1);
  }

  return (y: number) => {
    const first = anchors[0]!;
    const last = anchors[n - 1]!;
    if (y <= first.y) return { x: first.x, w: first.w, i: first.i, g: first.g };
    if (y >= last.y) return { x: last.x, w: last.w, i: last.i, g: last.g };
    let k = 0;
    while (k < n - 2 && y > anchors[k + 1]!.y) k++;
    const a = anchors[k]!;
    const b = anchors[k + 1]!;
    const h = Math.max(b.y - a.y, 1);
    const t = (y - a.y) / h;
    const t2 = t * t;
    const t3 = t2 * t;
    const x =
      (2 * t3 - 3 * t2 + 1) * a.x +
      (t3 - 2 * t2 + t) * h * tangents[k]! +
      (-2 * t3 + 3 * t2) * b.x +
      (t3 - t2) * h * tangents[k + 1]!;
    const s = smooth(t);
    return { x, w: a.w + (b.w - a.w) * s, i: a.i + (b.i - a.i) * s, g: a.g + (b.g - a.g) * s };
  };
}

type Target = { fb: WebGLFramebuffer; tex: WebGLTexture; w: number; h: number };

export function Ribbons() {
  const hostRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const probe = probeRef.current;
    if (!host || !probe) return;
    // Un canvas nuovo a ogni montaggio: un canvas che ha già un contesto
    // WebGL non può darne un altro, e resterebbe fermo alla versione vecchia.
    const canvas = document.createElement("canvas");
    canvas.className =
      "absolute inset-0 block h-full w-full opacity-0 transition-opacity duration-[1500ms] group-data-[state=ready]:opacity-100";
    host.prepend(canvas);
    const fail = () => {
      host.dataset.state = "fallback";
      host.style.position = "fixed";
      host.style.height = "100lvh";
      host.style.transform = "";
      canvas.remove();
    };

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) return fail();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;
    const STRANDS = small ? 240 : 460;
    const SEG = small ? 200 : 260;
    const SPARKS = small ? 140 : 260;
    const BOKEH = small ? 18 : 36;
    const LEVELS = 5;
    // Margine sopra e sotto lo schermo, in altezze di schermo. Su touch è
    // più ampio: lo scroll nativo può correre avanti di qualche fotogramma.
    const OVERSCAN = coarse ? 0.3 : 0.1;

    // --- Programmi --------------------------------------------------------
    const compile = (vert: string, frag: string) => {
      const make = (type: number, src: string) => {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          throw new Error(gl.getShaderInfoLog(shader) ?? "shader");
        }
        return shader;
      };
      const program = gl.createProgram()!;
      gl.attachShader(program, make(gl.VERTEX_SHADER, vert));
      gl.attachShader(program, make(gl.FRAGMENT_SHADER, frag));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) ?? "program");
      }
      const cache = new Map<string, WebGLUniformLocation | null>();
      const u = (name: string) => {
        if (!cache.has(name)) cache.set(name, gl.getUniformLocation(program, name));
        return cache.get(name) ?? null;
      };
      return { program, u };
    };

    type Program = ReturnType<typeof compile>;
    let line: Program;
    let points: Program;
    let down: Program;
    let up: Program;
    let composite: Program;
    try {
      line = compile(LINE_VERT, LINE_FRAG);
      points = compile(POINT_VERT, POINT_FRAG);
      down = compile(QUAD_VERT, DOWN_FRAG);
      up = compile(QUAD_VERT, UP_FRAG);
      composite = compile(QUAD_VERT, COMPOSITE_FRAG);
    } catch (error) {
      console.warn("[ribbons]", error);
      return fail();
    }

    // --- Geometria --------------------------------------------------------
    let seed = 11;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    // Un solo filo modello (posizione, lato), ripetuto per istanze.
    const template = new Float32Array((SEG + 1) * 4);
    for (let j = 0; j <= SEG; j++) {
      const t = j / SEG;
      template.set([t, -1, t, 1], j * 4);
    }
    const index = new Uint16Array(SEG * 6);
    for (let j = 0; j < SEG; j++) {
      const b = j * 2;
      index.set([b, b + 1, b + 2, b + 1, b + 3, b + 2], j * 6);
    }

    // Seme di ogni filo: posizione nel nastro, fase/colore, luminosità, profondità.
    const strandSeeds = new Float32Array(STRANDS * 4);
    for (let s = 0; s < STRANDS; s++) {
      const o = (s / (STRANDS - 1)) * 2 - 1 + (rand() - 0.5) * 0.03;
      strandSeeds.set([o, rand(), rand(), Math.pow(rand(), 1.4)], s * 4);
    }

    const pointData = new Float32Array((SPARKS + BOKEH) * 6);
    for (let i = 0; i < SPARKS + BOKEH; i++) {
      const bokeh = i >= SPARKS ? 1 : 0;
      pointData.set([rand() * 2 - 1, rand(), rand(), rand(), rand(), bokeh], i * 6);
    }

    const lineVao = gl.createVertexArray();
    gl.bindVertexArray(lineVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, template, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, strandSeeds, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 16, 0);
    gl.vertexAttribDivisor(1, 1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, index, gl.STATIC_DRAW);

    const pointVao = gl.createVertexArray();
    gl.bindVertexArray(pointVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, pointData, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 24, 16);

    const quadVao = gl.createVertexArray();
    gl.bindVertexArray(quadVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 8, 0);
    gl.bindVertexArray(null);

    // Percorso della parte visibile, ricalcolato a ogni fotogramma:
    // riga 0 = posizione e direzione, riga 1 = larghezza, luce, incandescenza, quota.
    const pathData = new Float32Array((SEG + 1) * 2 * 4);
    const pathTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, pathTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, SEG + 1, 2, 0, gl.RGBA, gl.FLOAT, null);

    // --- Render target HDR ------------------------------------------------
    let useHalf = !!gl.getExtension("EXT_color_buffer_float") || !!gl.getExtension("EXT_color_buffer_half_float");

    const makeTarget = (w: number, h: number): Target => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      if (useHalf) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
      else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      const fb = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return { fb, tex, w, h };
    };

    let scene: Target | null = null;
    let downs: Target[] = [];
    let ups: Target[] = [];

    const freeTargets = () => {
      for (const t of [scene, ...downs, ...ups]) {
        if (!t) continue;
        gl.deleteFramebuffer(t.fb);
        gl.deleteTexture(t.tex);
      }
      scene = null;
      downs = [];
      ups = [];
    };

    const buildTargets = (w: number, h: number) => {
      freeTargets();
      scene = makeTarget(w, h);
      if (useHalf && gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        // Alcuni dispositivi non sanno disegnare in mezza precisione.
        useHalf = false;
        freeTargets();
        scene = makeTarget(w, h);
      }
      for (let i = 0; i < LEVELS; i++) {
        const dw = Math.max(1, Math.round(w / 2 ** (i + 1)));
        const dh = Math.max(1, Math.round(h / 2 ** (i + 1)));
        downs.push(makeTarget(dw, dh));
        if (i < LEVELS - 1) ups.push(makeTarget(dw, dh));
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };

    // --- Stato ------------------------------------------------------------
    const c1 = hex("#6FE0FF");
    const c2 = hex("#1FA2FF");
    const c3 = hex("#25E0C8");
    const bg = [4 / 255, 5 / 255, 6 / 255] as const;

    /** Altezza dello schermo (100lvh): l'unità di misura del percorso. */
    let unit = window.innerHeight;
    let cssW = 0;
    let cssH = 0;
    let dpr = 1;
    let quality = 1;
    let last = 0;
    let time = 4;
    let frameCount = 0;
    let lastTop = Number.NaN;
    let fade = 0;
    let pathname = window.location.pathname;
    let evalPath = buildPath([
      { y: 0, x: 0.8, w: 0.3, i: 1, g: 0 },
      { y: 1, x: 0.8, w: 0.3, i: 1, g: 0 },
    ]);

    const pointer = { cx: -1, cy: -1, sx: 0, sy: 0, vx: 0, vy: 0, str: 0, lastMove: -1e9, inside: false };
    const par = { x: 0, y: 0 };

    /**
     * Dimensiona il canvas sui pixel reali dello schermo: larghezza della
     * pagina, altezza 100lvh più il margine. Su telefono non cambia quando
     * la barra degli indirizzi compare o sparisce.
     */
    const resize = (deviceW?: number, deviceH?: number) => {
      unit = probe.clientHeight || window.innerHeight;
      const hostH = Math.round(unit * (1 + 2 * OVERSCAN));
      if (host.style.height !== `${hostH}px`) host.style.height = `${hostH}px`;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      cssW = w;
      cssH = h;
      const native = window.devicePixelRatio || 1;
      const budget = small ? 3.6e6 : 9e6;
      dpr = Math.min(native, 2) * quality;
      if (w * h * dpr * dpr > budget) dpr = Math.sqrt(budget / (w * h));
      // A risoluzione piena usa i pixel esatti del dispositivo, così il
      // browser non deve riscalare l'immagine.
      const bw0 = Math.round(w * dpr);
      const bh0 = Math.round(h * dpr);
      const exact =
        dpr === native && deviceW && deviceH && Math.abs(deviceW - bw0) <= 2 && Math.abs(deviceH - bh0) <= 2;
      const bw = exact ? deviceW : bw0;
      const bh = exact ? deviceH : bh0;
      lastTop = Number.NaN;
      if (bw === canvas.width && bh === canvas.height && scene) return;
      canvas.width = bw;
      canvas.height = bh;
      buildTargets(bw, bh);
    };

    /**
     * Legge dalla pagina dove deve passare il nastro. Su schermi verticali
     * la S attraversa tutta la larghezza come da computer, solo un po' più
     * raccolta verso il centro, con un nastro più stretto e più tenue.
     */
    const readAnchors = () => {
      const U = unit;
      const portrait = cssW / U < 0.8;
      const mapX = (x: number) => (portrait ? 0.5 + (x - 0.5) * 0.9 : x);
      const list: Anchor[] = [];
      let sec = 0;
      const tops = new Set<number>();
      for (const el of document.querySelectorAll<HTMLElement>("[data-path]")) {
        const r = el.getBoundingClientRect();
        if (!r.height) continue;
        const top = r.top + window.scrollY;
        // Sezioni affiancate alla stessa altezza (le slide di un carosello):
        // conta solo la prima, così il percorso non cambia scorrendo le slide.
        if (tops.has(Math.round(top))) continue;
        tops.add(Math.round(top));
        sec++;
        const h = r.height;
        const kind = el.dataset.path;
        if (kind === "hero") {
          // Il nastro entra in alto a destra, gira stretto e incandescente
          // a sinistra delle card e riparte verso il basso a destra.
          const span = Math.min(h, U);
          if (portrait) {
            // In verticale il testo occupa tutta la larghezza: il nastro scende
            // tenue lungo il bordo destro, poi sotto ai pulsanti attraversa lo
            // schermo, gira incandescente a sinistra in fondo e torna al centro.
            list.push({ y: top - 0.45 * U, x: 1.15, w: 0.2, i: 0.55, g: 0, sec, soft: true });
            list.push({ y: top + span * 0.6, x: 0.95, w: 0.07, i: 0.45, g: 0.1, sec });
            // L'uscita resta abbastanza lontana dalla curva da non essere
            // scartata: è lei che allarga e spegne il nastro prima del testo.
            const turn = top + span * 0.97;
            list.push({ y: turn, x: 0.3, w: 0.012, i: 1, g: 1, sec });
            list.push({ y: Math.max(top + h + 0.12 * U, turn + 0.2 * U), x: 0.62, w: 0.18, i: 0.3, g: 0, sec, soft: true });
          } else {
            list.push({ y: top - 0.45 * U, x: 1.3, w: 0.5, i: 1, g: 0, sec, soft: true });
            list.push({ y: top + span * 0.66, x: 0.4, w: 0.02, i: 1, g: 1, sec });
            list.push({ y: top + h + 0.12 * U, x: 1.05, w: 0.38, i: 1, g: 0, sec, soft: true });
          }
        } else if (kind === "page") {
          const span = Math.min(h, U);
          const k = portrait ? 0.4 : 1;
          list.push({ y: top - 0.45 * U, x: 1.3, w: 0.45 * k, i: 0.9, g: 0, sec, soft: true });
          const turn = top + span * (portrait ? 0.9 : 0.55);
          list.push({ y: turn, x: portrait ? 0.88 : 0.8, w: 0.025 * k, i: 0.9, g: 0.8, sec });
          list.push({ y: Math.max(top + h + 0.1 * U, turn + 0.2 * U), x: 1.05, w: 0.32 * k, i: 0.9, g: 0, sec, soft: true });
        } else {
          const x = Number(kind);
          if (Number.isNaN(x)) continue;
          list.push({
            y: top + h / 2,
            x: mapX(x),
            w: Number(el.dataset.pathW ?? 0.28) * (portrait ? 0.32 : 1),
            i: Number(el.dataset.pathI ?? 1) * (portrait ? 0.6 : 1),
            g: 0,
            sec,
          });
        }
      }
      list.sort((a, b) => a.y - b.y);
      // Ancoraggi troppo vicini creerebbero curve strette, e tra due sezioni
      // un salto laterale troppo corto renderebbe il nastro quasi orizzontale.
      // In conflitto cede l'ingresso o l'uscita dell'hero; altrimenti resta il
      // primo e il secondo si avvicina quanto basta.
      const anchors: Anchor[] = [];
      for (const raw of list) {
        const a = { ...raw };
        let keep = true;
        while (anchors.length) {
          const prev = anchors[anchors.length - 1]!;
          const dy = a.y - prev.y;
          const close = dy <= 0.18 * U;
          const steep = prev.sec !== a.sec && Math.abs(a.x - prev.x) * cssW > MAX_SLOPE * dy;
          if (!close && !steep) break;
          if (prev.soft && !a.soft) {
            anchors.pop();
            continue;
          }
          if (close || a.soft) {
            keep = false;
            break;
          }
          a.x = prev.x + Math.sign(a.x - prev.x) * ((MAX_SLOPE * dy) / cssW);
          break;
        }
        if (keep) anchors.push(a);
      }
      if (anchors.length < 2) {
        const docH = document.documentElement.scrollHeight;
        anchors.splice(0, anchors.length, { y: 0, x: 0.85, w: 0.3, i: 0.8, g: 0 }, { y: docH, x: 0.85, w: 0.3, i: 0.8, g: 0 });
      }
      evalPath = buildPath(anchors);
    };

    /** Campiona il percorso nella parte di pagina coperta dal canvas. */
    const samplePath = (top: number) => {
      const aspect = cssW / cssH;
      const margin = 0.35 * unit;
      const step = (cssH + 2 * margin) / SEG;
      // Campioni fissati alla pagina: scorrendo non "scivolano" sul nastro.
      const start = Math.floor((top - margin) / step) * step;
      for (let j = 0; j <= SEG; j++) {
        const y = start + j * step;
        const e = evalPath(y);
        const o0 = j * 4;
        const o1 = (SEG + 1 + j) * 4;
        pathData[o0] = (e.x * 2 - 1) * aspect;
        pathData[o0 + 1] = 1 - (2 * (y - top)) / cssH;
        pathData[o1] = (e.w * unit * 2) / cssH;
        pathData[o1 + 1] = e.i;
        pathData[o1 + 2] = e.g;
        pathData[o1 + 3] = y / unit;
      }
      for (let j = 0; j <= SEG; j++) {
        const a = Math.max(j - 1, 0) * 4;
        const b = Math.min(j + 1, SEG) * 4;
        const dx = pathData[b]! - pathData[a]!;
        const dy = pathData[b + 1]! - pathData[a + 1]!;
        const len = Math.hypot(dx, dy) || 1;
        pathData[j * 4 + 2] = dx / len;
        pathData[j * 4 + 3] = dy / len;
      }
      gl.bindTexture(gl.TEXTURE_2D, pathTex);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, SEG + 1, 2, gl.RGBA, gl.FLOAT, pathData);
    };

    const onPointer = (e: PointerEvent) => {
      if (!pointer.inside) {
        pointer.sx = e.clientX;
        pointer.sy = e.clientY;
      }
      pointer.cx = e.clientX;
      pointer.cy = e.clientY;
      pointer.inside = true;
      pointer.lastMove = performance.now();
    };
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      if (!pointer.inside) {
        pointer.sx = touch.clientX;
        pointer.sy = touch.clientY;
      }
      pointer.cx = touch.clientX;
      pointer.cy = touch.clientY;
      pointer.inside = true;
      pointer.lastMove = performance.now();
    };
    const onLeave = () => {
      pointer.inside = false;
    };

    // --- Disegno ----------------------------------------------------------
    const shared = (u: Program["u"], top: number) => {
      const aspect = cssW / cssH;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pathTex);
      gl.uniform1i(u("u_path"), 0);
      gl.uniform1f(u("u_seg"), SEG);
      gl.uniform1f(u("u_time"), time);
      gl.uniform1f(u("u_aspect"), aspect);
      // Il puntatore è in coordinate dello schermo: lo porto in quelle del canvas.
      const mx = ((pointer.sx / cssW) * 2 - 1) * aspect;
      const my = 1 - (2 * (pointer.sy + window.scrollY - top)) / cssH;
      gl.uniform2f(u("u_m"), mx, my);
      gl.uniform1f(u("u_mStr"), pointer.str);
      gl.uniform2f(u("u_mVel"), pointer.vx, pointer.vy);
      gl.uniform2f(u("u_par"), par.x, par.y);
      gl.uniform1f(u("u_dpr"), dpr);
      gl.uniform1f(u("u_intensity"), fade);
      gl.uniform3fv(u("u_c1"), c1);
    };

    const pass = (program: Program, dst: Target | null, bind: (u: Program["u"]) => void) => {
      gl.useProgram(program.program);
      gl.bindFramebuffer(gl.FRAMEBUFFER, dst ? dst.fb : null);
      gl.viewport(0, 0, dst ? dst.w : canvas.width, dst ? dst.h : canvas.height);
      bind(program.u);
      gl.bindVertexArray(quadVao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const texture = (unitIndex: number, tex: WebGLTexture, loc: WebGLUniformLocation | null) => {
      gl.activeTexture(gl.TEXTURE0 + unitIndex);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(loc, unitIndex);
    };

    const draw = (top: number) => {
      if (!scene) return;
      samplePath(top);

      // 1. Scena: fili e scintille sommati in HDR.
      gl.bindFramebuffer(gl.FRAMEBUFFER, scene.fb);
      gl.viewport(0, 0, scene.w, scene.h);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);

      gl.useProgram(line.program);
      shared(line.u, top);
      gl.uniform2f(line.u("u_res"), scene.w, scene.h);
      gl.uniform1f(line.u("u_gain"), small ? 1.0 : 0.75);
      gl.uniform3fv(line.u("u_c2"), c2);
      gl.uniform3fv(line.u("u_c3"), c3);
      gl.bindVertexArray(lineVao);
      gl.drawElementsInstanced(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0, STRANDS);

      gl.useProgram(points.program);
      shared(points.u, top);
      gl.bindVertexArray(pointVao);
      gl.drawArrays(gl.POINTS, 0, SPARKS + BOKEH);
      gl.disable(gl.BLEND);

      // 2. Bagliore: riduzione e ricomposizione su più livelli.
      let src: Target = scene;
      for (const dst of downs) {
        const from = src;
        pass(down, dst, (u) => {
          texture(0, from.tex, u("u_tex"));
          gl.uniform2f(u("u_texel"), 1 / from.w, 1 / from.h);
        });
        src = dst;
      }
      for (let i = ups.length - 1; i >= 0; i--) {
        const from = i === ups.length - 1 ? downs[i + 1] : ups[i + 1];
        const base = downs[i];
        const dst = ups[i];
        if (!from || !base || !dst) continue;
        pass(up, dst, (u) => {
          texture(0, from.tex, u("u_tex"));
          texture(1, base.tex, u("u_base"));
          gl.uniform2f(u("u_texel"), 1 / from.w, 1 / from.h);
        });
      }

      // 3. Composizione finale sul canvas.
      const sceneTex = scene.tex;
      const bloom = ups[0];
      const soft = ups[1];
      if (!bloom || !soft) return;
      const scrolled = Math.min(Math.max(window.scrollY / unit, 0), 1);
      pass(composite, null, (u) => {
        texture(0, sceneTex, u("u_scene"));
        texture(1, bloom.tex, u("u_bloom"));
        texture(2, soft.tex, u("u_soft"));
        gl.uniform1f(u("u_dof"), 0.12 + 0.2 * scrolled);
        gl.uniform1f(u("u_view"), (0.5 * unit) / cssH);
        gl.uniform1f(u("u_bloomGain"), 0.55);
        gl.uniform1f(u("u_softGain"), 0.8);
        gl.uniform1f(u("u_exposure"), 1.35);
        gl.uniform3f(u("u_bg"), bg[0], bg[1], bg[2]);
      });
      gl.bindVertexArray(null);
    };

    // Qualità adattiva: se i primi secondi vanno lenti, riduce la risoluzione.
    let samples = 0;
    let sampleTime = 0;

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      frameCount++;

      // Cambio pagina: rilegge il percorso e il nastro riappare dolcemente.
      if (window.location.pathname !== pathname) {
        pathname = window.location.pathname;
        fade = 0;
        readAnchors();
      } else if (frameCount % 15 === 0) {
        readAnchors();
      }
      fade += (1 - fade) * (1 - Math.exp(-dt * 3));

      // Il canvas copre lo schermo più il margine; lo riposiziono nella
      // pagina in modo che lo schermo ne sia sempre al centro.
      const top = Math.round(window.scrollY - OVERSCAN * unit);
      if (top !== lastTop) {
        host.style.transform = `translate3d(0, ${top}px, 0)`;
      }

      if (!reduce) {
        // Puntatore: posizione morbida, velocità e forza che si spegne da fermo.
        const px = pointer.sx;
        const py = pointer.sy;
        const follow = 1 - Math.exp(-dt * 14);
        pointer.sx += (pointer.cx - pointer.sx) * follow;
        pointer.sy += (pointer.cy - pointer.sy) * follow;
        if (dt > 0) {
          const aspect = cssW / cssH;
          const kv = 1 - Math.exp(-dt * 8);
          const vx = (((pointer.sx - px) / cssW) * 2 * aspect) / dt;
          const vy = -((((pointer.sy - py) / cssH) * 2) / dt);
          pointer.vx += (vx - pointer.vx) * kv;
          pointer.vy += (vy - pointer.vy) * kv;
          const speed = Math.hypot(pointer.vx, pointer.vy);
          // Limite di velocità: oltre, la scia del puntatore ripiegherebbe i fili.
          if (speed > 2.5) {
            pointer.vx *= 2.5 / speed;
            pointer.vy *= 2.5 / speed;
          }
        }
        const awake = pointer.inside && now - pointer.lastMove < 2200;
        pointer.str += ((awake ? 1 : 0) - pointer.str) * (1 - Math.exp(-dt * (awake ? 5 : 1.4)));
        const tx = pointer.inside ? (pointer.sx / cssW) * 2 - 1 : 0;
        const ty = pointer.inside ? 1 - (pointer.sy / window.innerHeight) * 2 : 0;
        par.x += (tx - par.x) * (1 - Math.exp(-dt * 2));
        par.y += (ty - par.y) * (1 - Math.exp(-dt * 2));
        time += dt;
      } else if (top === lastTop && fade > 0.999) {
        return;
      }

      lastTop = top;
      draw(top);

      if (!reduce && samples < 120) {
        samples++;
        if (samples > 30) sampleTime += dt;
        if (samples === 120 && sampleTime / 90 > 0.024 && quality > 0.6) {
          quality = 0.7;
          resize();
        }
      }
    };

    const onLost = (e: Event) => {
      e.preventDefault();
      stopTick();
      fail();
    };

    const observer = new ResizeObserver((entries) => {
      const entry = entries.find((en) => en.target === canvas);
      const box = entry?.devicePixelContentBoxSize?.[0];
      resize(box?.inlineSize, box?.blockSize);
      readAnchors();
    });

    resize();
    readAnchors();
    host.dataset.state = "ready";
    const stopTick = addTick(tick, TICK.background);

    try {
      observer.observe(canvas, { box: "device-pixel-content-box" });
    } catch {
      observer.observe(canvas);
    }
    observer.observe(probe);
    if (!reduce) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("touchstart", onTouch, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
    }
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      stopTick();
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("webglcontextlost", onLost);
      freeTargets();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
      host.dataset.state = "loading";
      host.style.transform = "";
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Il canvas viene inserito qui dallo script e spostato insieme alla
          pagina. Senza WebGL2 resta un alone statico nei colori del marchio. */}
      <div ref={hostRef} data-state="loading" className="group absolute inset-x-0 top-0 h-lvh bg-ink-1000">
        <div className="absolute inset-0 hidden bg-[radial-gradient(60%_50%_at_75%_30%,rgba(31,162,255,0.22),transparent_70%),radial-gradient(50%_40%_at_20%_80%,rgba(37,224,200,0.12),transparent_70%)] group-data-[state=fallback]:block" />
        {/* Vignettatura laterale: scurisce i bordi e dà profondità ai fili. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,5,6,0.55),transparent_16%,transparent_84%,rgba(4,5,6,0.55))]" />
      </div>
      {/* Misura 100lvh: l'altezza dello schermo senza la barra del browser. */}
      <div ref={probeRef} className="pointer-events-none fixed left-0 top-0 h-lvh w-px" />
    </div>
  );
}

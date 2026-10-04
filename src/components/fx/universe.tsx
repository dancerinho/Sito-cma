"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { TICK, addTick } from "@/components/fx/ticker";
import { sampleLogo } from "@/components/fx/logo-points";
import { SHAPE, universe, type Placement, type ShapeId, type UniverseTarget } from "@/components/fx/universe-state";

/**
 * Sfondo del sito: decine di migliaia di particelle di luce blu, disegnate in
 * WebGL2, che si ricompongono in forme diverse. Le forme sono funzioni pure
 * di (particella, tempo): la scheda video calcola tutto, la CPU passa solo
 * quale forma mostrare, dove e quanto è avanzato il passaggio.
 *
 *   warp    stelle che corrono verso lo schermo (caricamento)
 *   ring    anello orbitale inclinato (hero)
 *   core    nucleo incandescente con raggi (servizi)
 *   shell   globo di paralleli e meridiani (approccio)
 *   vortex  disco di accrescimento attorno a un centro nero (metodo)
 *   logo    i pentagoni del marchio, che si aprono a stella (contatti)
 *
 * Ogni particella è un piccolo quad allungato tra la posizione attuale e
 * quella del fotogramma prima: le scie del warp e delle esplosioni sono
 * sfocatura di movimento vera. Pipeline: particelle sommate in una texture
 * HDR, bagliore su due livelli, tone mapping, alone di fondo e dithering.
 */

const QUALITY = {
  desktop: { count: 110000, px: 1.05, dpr: 2 },
  mobile: { count: 36000, px: 1.15, dpr: 2 },
};

/** Numero di particelle su cui è tarata la luminosità. */
const REFERENCE_COUNT = 72000;

const PARTICLE_VS = /* glsl */ `#version 300 es
precision highp float;
precision highp int;

layout(location = 0) in vec2 a_corner;
layout(location = 1) in vec3 a_logo;

uniform vec2 u_res;
uniform float u_aspect;
uniform float u_px;
uniform float u_gain;
uniform vec4 u_st;
uniform vec4 u_stP;
uniform vec3 u_pa;
uniform vec3 u_pb;
uniform vec3 u_paP;
uniform vec3 u_pbP;
uniform vec2 u_cam;
uniform vec2 u_camP;
uniform vec4 u_mouse;
uniform vec4 u_mouseP;
uniform vec2 u_mvel;
uniform vec2 u_mvelP;
uniform vec4 u_pulse;
uniform vec4 u_pulseP;
uniform float u_fan;
uniform float u_fanP;

out vec2 v_uv;
out float v_half;
out vec3 v_col;

const float TAU = 6.28318530718;
const float PI = 3.14159265359;

uint hash(uint x) {
  x ^= x >> 16; x *= 0x7feb352du;
  x ^= x >> 15; x *= 0x846ca68bu;
  x ^= x >> 16;
  return x;
}
float hf(uint k) { return float(hash(k) >> 8) / 16777216.0; }

float rr[16];
bool g_dust;
float g_fan;

float gauss(float u, float v) { return sqrt(-2.0 * log(max(u, 1e-6))) * cos(TAU * v); }
vec3 sphere(float u, float v) {
  float z = 2.0 * u - 1.0;
  float s = sqrt(max(0.0, 1.0 - z * z));
  float p = TAU * v;
  return vec3(s * cos(p), s * sin(p), z);
}
vec3 rotX(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z); }
vec3 rotY(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z); }
vec3 rotZ(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c * p.x - s * p.y, s * p.x + c * p.y, p.z); }

// Stelle che corrono verso lo schermo, centrate sulla finestra.
vec4 warp(float t) {
  float ang = rr[0] * TAU;
  float rad = 0.1 + pow(rr[1], 0.6) * 3.0;
  float speed = 5.0 + rr[2] * 8.0;
  float z = mod(rr[3] * 26.0 + t * speed, 26.0) - 23.0;
  float fade = smoothstep(-23.0, -14.0, z);
  return vec4(cos(ang) * rad * max(u_aspect, 1.0), sin(ang) * rad, z, 7.0 * fade);
}

// Polvere di stelle fissa, uguale in tutte le forme.
vec4 dust(float t) {
  vec3 p = vec3((rr[0] * 2.0 - 1.0) * max(u_aspect, 1.0) * 1.15, (rr[1] * 2.0 - 1.0) * 1.15, (rr[2] - 0.5) * 2.0);
  p.y += sin(t * 0.05 + rr[3] * TAU) * 0.02;
  return vec4(p, 0.12 + 0.22 * rr[4]);
}

// Anello orbitale inclinato: P.z è il raggio.
vec4 ring(vec3 P, float t) {
  float ang = rr[0] * TAU;
  float halo = step(rr[9], 0.2);
  float th = (0.02 + 0.035 * (0.5 + 0.5 * sin(ang * 2.0 + 0.6))) * (1.0 + halo * 2.8);
  // Metà delle particelle corre su filamenti sottili affiancati, come
  // le scie di una galassia; le altre fanno da velo.
  float lane = floor(rr[10] * 7.0) - 3.0;
  bool laned = rr[11] < 0.55 && halo < 0.5;
  float off = laned
    ? lane * 0.011 + 0.006 * sin(ang * 5.0 + lane * 1.7) + gauss(rr[1], rr[2]) * 0.0035
    : gauss(rr[1], rr[2]) * th;
  float rad = P.z * (1.0 + off);
  float a = ang + t * 0.06 * pow(P.z / rad, 1.5);
  vec3 p = vec3(cos(a) * rad, gauss(rr[3], rr[4]) * (laned ? 0.004 : th * 0.3) * P.z, sin(a) * rad);
  p = rotX(p, 0.32);
  p = rotZ(p, 0.2);
  float clump = sin(ang * 7.0 + 1.3) * sin(ang * 3.0 + 0.4);
  float inten = (1.0 + 0.5 * clump) * (laned ? 1.15 : 1.0) * (1.0 - 0.65 * halo);
  return vec4(p + vec3(P.xy, 0.0), inten);
}

// Nucleo denso con raggi che si allontanano: P.z è il raggio del nucleo.
vec4 core(vec3 P, float t) {
  vec3 p;
  float inten;
  if (rr[2] < 0.3) {
    uint ray = uint(floor(rr[3] * 48.0)) * 7u + 99991u;
    vec3 d = normalize(sphere(hf(ray), hf(ray + 1u)) + sphere(rr[4], rr[5]) * 0.05);
    float l = 0.25 + pow(rr[6], 1.3) * 2.8;
    p = d * l * P.z;
    inten = 2.2 * (1.1 - min(l / 3.1, 1.0));
  } else {
    float l = pow(rr[6], 2.2) * 1.4;
    p = sphere(rr[4], rr[5]) * l * P.z;
    inten = 3.0;
  }
  p *= 1.0 + 0.04 * sin(t * 1.3 + rr[7] * TAU);
  p = rotY(p, t * 0.15);
  p = rotX(p, 0.35);
  return vec4(p + vec3(P.xy, 0.0), inten);
}

// Globo di paralleli e meridiani che ruota piano: P.z è il raggio.
vec4 shell(vec3 P, float t) {
  vec3 p;
  float inten;
  if (rr[2] < 0.6) {
    float lat = ((floor(rr[3] * 9.0) + 0.5) / 9.0 - 0.5) * PI * 0.92;
    float lon = rr[0] * TAU;
    p = vec3(cos(lat) * cos(lon), sin(lat), cos(lat) * sin(lon));
    inten = 0.45 + 0.75 * cos(lat);
  } else if (rr[2] < 0.9) {
    float lon = floor(rr[3] * 10.0) / 10.0 * PI;
    float a = rr[0] * TAU;
    p = vec3(cos(a) * cos(lon), sin(a), cos(a) * sin(lon));
    inten = 1.0;
  } else {
    p = sphere(rr[4], rr[5]) * pow(rr[6], 0.6) * 0.9;
    inten = 0.3;
  }
  p = (p + sphere(rr[7], rr[8]) * 0.01) * P.z;
  p = rotY(p, t * 0.12);
  p = rotX(p, 0.4);
  // La metà dietro è più tenue, così il globo ha profondità.
  inten *= 0.45 + 0.55 * smoothstep(-P.z, P.z, p.z);
  return vec4(p + vec3(P.xy, 0.0), 1.3 * inten);
}

// Disco che vortica attorno a un centro nero: P.z è il raggio del centro.
vec4 vortex(vec3 P, float t) {
  float H = P.z;
  float rad = H * (1.03 + pow(rr[1], 1.6) * 4.2);
  float omega = 0.55 * pow(H / rad, 1.5);
  bool arm = rr[2] < 0.5;
  float a = arm
    ? floor(rr[3] * 2.0) * PI + gauss(rr[4], rr[5]) * 0.32 + 2.3 * log(rad / H)
    : rr[0] * TAU;
  a += t * omega;
  vec3 p = vec3(cos(a) * rad, sin(a) * rad, gauss(rr[6], rr[7]) * 0.035 * rad);
  float beam = pow(0.5 + 0.5 * cos(a + 0.8), 3.0);
  float inner = exp(-(rad / H - 1.0) * 2.0);
  float inten = (0.3 + 2.2 * beam) * (0.4 + 2.6 * inner) * (arm ? 2.0 : 1.0);
  p = rotX(p, 0.38);
  p = rotZ(p, -0.3);
  // Il centro nasconde la parte di disco che gli passa dietro.
  float proj = length(p.xy) * 4.0 / (4.0 - p.z);
  if (p.z < 0.0 && proj < H * 1.02) inten = 0.0;
  return vec4(p + vec3(P.xy, 0.0), inten);
}

// Il marchio: tre pentagoni ruotati di 9° l'uno dall'altro, sempre più
// piccoli. Con g_fan = 0 sono un solo pentagono; aprendosi diventano il
// marchio e continuano a respirare, aprendosi e richiudendosi come i due
// triangoli che si incrociano. P.z è il raggio.
vec4 logo(vec3 P, float t) {
  float k = a_logo.z;
  float fan = g_fan * (0.78 + 0.2 * sin(t * 0.55));
  float ang = -k * 0.2443 * fan;
  float sc = 1.0 - k * 0.16 * fan;
  vec2 q = a_logo.xy * sc;
  float c = cos(ang), s = sin(ang);
  q = vec2(c * q.x - s * q.y, s * q.x + c * q.y);
  float halo = step(rr[2], 0.14);
  float j = mix(0.015, 0.12, halo);
  vec3 p = vec3(
    q + vec2(gauss(rr[3], rr[4]), gauss(rr[5], rr[6])) * j,
    (k - 1.0) * 0.06 * fan + gauss(rr[7], rr[8]) * 0.02
  ) * P.z;
  p = rotY(p, sin(t * 0.42) * 0.42);
  p = rotX(p, sin(t * 0.3) * 0.24);
  return vec4(p + vec3(P.xy, 0.0), 2.1 * mix(1.0, 0.25, halo));
}

vec4 shapeAt(float k, vec3 P, float t) {
  if (k < 0.5) return warp(t);
  if (g_dust) return dust(t);
  if (k < 1.5) return ring(P, t);
  if (k < 2.5) return core(P, t);
  if (k < 3.5) return shell(P, t);
  if (k < 4.5) return vortex(P, t);
  return logo(P, t);
}

// Stato completo: forma A, forma B, avanzamento con nube a metà strada.
vec4 evalState(vec4 st, vec3 pa, vec3 pb) {
  float t = st.w;
  if (st.z <= 0.0001 || st.x == st.y) return shapeAt(st.x, pa, t);
  if (st.z >= 0.9999) return shapeAt(st.y, pb, t);
  vec4 A = shapeAt(st.x, pa, t);
  vec4 B = shapeAt(st.y, pb, t);
  float m = smoothstep(0.0, 1.0, clamp((st.z - rr[10] * 0.35) / 0.65, 0.0, 1.0));
  float burst = sin(m * PI) * (g_dust ? 0.0 : 1.0);
  vec3 c = vec3(mix(pa.xy, pb.xy, m), 0.0);
  vec3 p = mix(A.xyz, B.xyz, m);
  // A metà strada le particelle si raccolgono in una nube attorno al centro.
  vec3 cloud = c + sphere(rr[8], rr[11]) * (0.05 + pow(rr[9], 1.8) * 0.75) * (0.7 + 0.3 * min(u_aspect, 1.6));
  p = mix(p, cloud, pow(burst, 0.6) * 0.9);
  p = c + rotY(p - c, burst * 0.9);
  return vec4(p, mix(A.w, B.w, m) * (1.0 + burst * 0.9));
}

// Il puntatore come un piccolo campo gravitazionale: accende le particelle
// vicine e le sposta appena (spinta, vortice, scia), senza deformare la
// forma. Il click manda un'onda di luce che si allarga. m = (x, y, forza, raggio).
vec4 field(vec4 cur, vec4 m, vec2 vel, vec4 pulse) {
  vec2 d = cur.xy - m.xy;
  float r2 = dot(d, d);
  float f = exp(-r2 / (m.w * m.w)) * m.z;
  vec2 n = d * inversesqrt(r2 + 1e-4);
  cur.xy += n * f * 0.045 + vec2(-n.y, n.x) * f * 0.03 + vel * f * 0.02;
  cur.z += f * 0.04;
  cur.w *= 1.0 + f * 2.4;
  if (pulse.w > 0.0) {
    vec2 e = cur.xy - pulse.xy;
    float dist = length(e);
    float band = exp(-pow((dist - pulse.z * 1.5) / 0.14, 2.0)) * pulse.w;
    cur.xy += e / max(dist, 1e-3) * band * 0.04;
    cur.w *= 1.0 + band * 2.6;
  }
  return cur;
}

vec4 project(vec3 p, vec2 cam) {
  p = rotY(p, cam.x);
  p = rotX(p, cam.y);
  return vec4(p.x * 4.0 / u_aspect, p.y * 4.0, 0.0, 4.0 - p.z);
}

void main() {
  uint id = uint(gl_InstanceID) * 16u;
  for (int i = 0; i < 16; i++) rr[i] = hf(id + uint(i));
  g_dust = rr[12] < 0.05;

  g_fan = u_fan;
  vec4 cur = field(evalState(u_st, u_pa, u_pb), u_mouse, u_mvel, u_pulse);
  g_fan = u_fanP;
  vec4 prv = field(evalState(u_stP, u_paP, u_pbP), u_mouseP, u_mvelP, u_pulseP);
  vec4 c = project(cur.xyz, u_cam);
  vec4 q = project(prv.xyz, u_camP);

  if (c.w < 0.25 || cur.w <= 0.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    v_uv = vec2(0.0);
    v_half = 0.0;
    v_col = vec3(0.0);
    return;
  }
  if (q.w < 0.25) q = c;

  vec2 sc = (c.xy / c.w * 0.5 + 0.5) * u_res;
  vec2 sq = (q.xy / q.w * 0.5 + 0.5) * u_res;
  float size = u_px * (0.55 + rr[15] * 1.0) * clamp(4.0 / c.w, 0.4, 5.0);
  // Sotto il pixel il quad sparirebbe a intermittenza: lo teniamo a 0.75 px
  // e ne abbassiamo l'energia in proporzione.
  float energy = 1.0;
  if (size < 0.75) { energy = (size * size) / 0.5625; size = 0.75; }

  vec2 d = sc - sq;
  float len = length(d);
  if (len > u_res.y * 0.2) { d = vec2(0.0); len = 0.0; sq = sc; }
  vec2 dir = len > 0.001 ? d / len : vec2(1.0, 0.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  float halfLen = len * 0.5;
  const float EXT = 1.5;
  vec2 mid = (sc + sq) * 0.5;
  vec2 pos = mid + dir * a_corner.x * (halfLen + size * EXT) + nrm * a_corner.y * size * EXT;
  gl_Position = vec4(pos / u_res * 2.0 - 1.0, 0.0, 1.0);

  v_half = halfLen / size;
  v_uv = vec2(a_corner.x * (v_half + EXT), a_corner.y * EXT);

  vec3 col = mix(vec3(0.09, 0.18, 1.0), vec3(0.3, 0.48, 1.0), rr[13]);
  if (rr[14] > 0.93) col = vec3(0.5, 0.78, 1.0);
  // Il marchio è più bianco, con riflessi ciano nella parte bassa.
  float logoW = (u_st.x > 4.5 ? 1.0 - u_st.z : 0.0) + (u_st.y > 4.5 && u_st.x < 4.5 ? u_st.z : 0.0);
  if (logoW > 0.0) {
    vec3 tint = mix(vec3(0.5, 0.64, 1.0), vec3(0.25, 0.85, 1.0), smoothstep(0.0, -0.45, cur.y - mix(u_pa.y, u_pb.y, u_st.z)));
    col = mix(col, tint, logoW * 0.8);
  }
  v_col = col * cur.w * u_gain * energy / (1.0 + v_half * 0.8);
}
`;

const PARTICLE_FS = /* glsl */ `#version 300 es
precision highp float;
in vec2 v_uv;
in float v_half;
in vec3 v_col;
out vec4 o;
void main() {
  float dx = max(abs(v_uv.x) - v_half, 0.0);
  float d2 = dx * dx + v_uv.y * v_uv.y;
  o = vec4(v_col * exp(-d2 * 2.6), 1.0);
}
`;

const FULLSCREEN_VS = /* glsl */ `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;

const DOWN_FS = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D u_src;
uniform vec2 u_texel;
uniform vec2 u_res;
out vec4 o;
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec3 c = texture(u_src, uv + u_texel * vec2(-1.0, -1.0)).rgb
         + texture(u_src, uv + u_texel * vec2(1.0, -1.0)).rgb
         + texture(u_src, uv + u_texel * vec2(-1.0, 1.0)).rgb
         + texture(u_src, uv + u_texel * vec2(1.0, 1.0)).rgb;
  o = vec4(c * 0.25, 1.0);
}
`;

const BLUR_FS = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D u_src;
uniform vec2 u_dir;
uniform vec2 u_res;
out vec4 o;
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec3 c = texture(u_src, uv).rgb * 0.227027;
  c += texture(u_src, uv + u_dir * 1.3846153846).rgb * 0.3162162162;
  c += texture(u_src, uv - u_dir * 1.3846153846).rgb * 0.3162162162;
  c += texture(u_src, uv + u_dir * 3.2307692308).rgb * 0.0702702703;
  c += texture(u_src, uv - u_dir * 3.2307692308).rgb * 0.0702702703;
  o = vec4(c, 1.0);
}
`;

const COMPOSITE_FS = /* glsl */ `#version 300 es
precision highp float;
uniform sampler2D u_scene;
uniform sampler2D u_b1;
uniform sampler2D u_b2;
uniform vec2 u_res;
uniform float u_time;
uniform float u_haze;
uniform vec3 u_light;
out vec4 o;

float blob(vec2 p, vec2 c, vec2 r, float a) {
  vec2 d = p - c;
  float cs = cos(a), sn = sin(a);
  d = vec2(cs * d.x - sn * d.y, sn * d.x + cs * d.y) / r;
  return exp(-dot(d, d));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec3 c = texture(u_scene, uv).rgb + texture(u_b1, uv).rgb * 0.6 + texture(u_b2, uv).rgb * 0.75;
  c = 1.0 - exp(-c * 1.3);

  // Alone blu in alto a sinistra e uno più debole in basso a destra, che
  // si spostano piano: la "luce" dello spazio.
  float asp = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * asp, uv.y);
  float t = u_time;
  float g1 = blob(p, vec2((0.2 + 0.05 * sin(t * 0.06)) * asp, 0.93 + 0.02 * sin(t * 0.09)), vec2(0.36 * max(asp, 0.8), 0.085), -0.12 + 0.05 * sin(t * 0.05));
  float g2 = blob(p, vec2(0.86 * asp, 0.04), vec2(0.34 * max(asp, 0.8), 0.07), 0.1);
  vec3 bg = vec3(0.004, 0.005, 0.014)
    + vec3(0.07, 0.13, 1.0) * g1 * 0.34 * u_haze
    + vec3(0.06, 0.1, 0.9) * g2 * 0.16 * u_haze
    + vec3(0.08, 0.14, 1.0) * blob(p, vec2(u_light.x * asp, u_light.y), vec2(0.2), 0.0) * 0.07 * u_light.z;

  vec3 col = 1.0 - (1.0 - bg) * (1.0 - c);
  float n = fract(sin(dot(gl_FragCoord.xy + fract(t) * 61.0, vec2(12.9898, 78.233))) * 43758.5453);
  o = vec4(col + (n - 0.5) / 255.0, 1.0);
}
`;

type Target = { tex: WebGLTexture; fbo: WebGLFramebuffer; w: number; h: number };

function compile(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const make = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
    return s;
  };
  const p = gl.createProgram()!;
  gl.attachShader(p, make(gl.VERTEX_SHADER, vs));
  gl.attachShader(p, make(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? "program");
  const uniforms = new Map<string, WebGLUniformLocation | null>();
  const count = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS) as number;
  for (let i = 0; i < count; i++) {
    const name = gl.getActiveUniform(p, i)!.name;
    uniforms.set(name, gl.getUniformLocation(p, name));
  }
  return { p, u: (name: string) => uniforms.get(name) ?? null };
}

/** Forma mostrata nelle pagine interne, scelta in base all'indirizzo. */
const PAGE_SHAPES: Record<string, ShapeId> = {
  servizi: SHAPE.core,
  studio: SHAPE.vortex,
  contatti: SHAPE.logo,
};

function pageTarget(pathname: string, w: number, h: number): UniverseTarget {
  const key = pathname.split("/").filter(Boolean)[0] ?? "";
  const shape = PAGE_SHAPES[key] ?? SHAPE.ring;
  const wide = w >= 1024;
  let p: Placement;
  if (shape === SHAPE.ring) {
    p = { x: w * 0.5, y: h * (wide ? 0.62 : 0.55), r: Math.max(w * 0.5, 320) };
  } else {
    const base = shape === SHAPE.vortex ? 0.1 : shape === SHAPE.core ? 0.2 : 0.17;
    p = wide
      ? { x: w * 0.76, y: h * (shape === SHAPE.logo ? 0.42 : 0.5), r: h * base }
      : { x: w * 0.8, y: h * 0.17, r: Math.min(w, h) * base * 0.7 };
  }
  return { key: `page:${shape}`, a: shape, b: shape, m: 0, pa: p, pb: p, gain: wide ? 0.62 : 0.36 };
}

const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export function Universe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const pathRef = useRef(pathname);

  useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "high-performance" });
    if (!gl) {
      canvas.dataset.fallback = "true";
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = Math.min(window.innerWidth, window.innerHeight) < 700 || (navigator.hardwareConcurrency ?? 8) <= 4;
    const quality = small ? QUALITY.mobile : QUALITY.desktop;
    const hdr = !!gl.getExtension("EXT_color_buffer_float");
    gl.getExtension("OES_texture_float_linear");

    let particles: ReturnType<typeof compile>;
    let down: ReturnType<typeof compile>;
    let blur: ReturnType<typeof compile>;
    let composite: ReturnType<typeof compile>;
    try {
      particles = compile(gl, PARTICLE_VS, PARTICLE_FS);
      down = compile(gl, FULLSCREEN_VS, DOWN_FS);
      blur = compile(gl, FULLSCREEN_VS, BLUR_FS);
      composite = compile(gl, FULLSCREEN_VS, COMPOSITE_FS);
    } catch (error) {
      console.warn("[universe]", error);
      canvas.dataset.fallback = "true";
      return;
    }

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const logoBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, logoBuf);
    gl.bufferData(gl.ARRAY_BUFFER, sampleLogo(quality.count), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(1, 1);
    gl.bindVertexArray(null);
    const emptyVao = gl.createVertexArray();

    const makeTarget = (w: number, h: number): Target => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      if (hdr) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
      else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return { tex, fbo, w, h };
    };
    const freeTarget = (t?: Target) => {
      if (!t) return;
      gl.deleteTexture(t.tex);
      gl.deleteFramebuffer(t.fbo);
    };

    let W = 0;
    let H = 0;
    let cssW = 0;
    let cssH = 0;
    let dpr = 1;
    let dprCap = quality.dpr;
    let scene: Target | undefined;
    let b1: Target | undefined;
    let t1: Target | undefined;
    let b2: Target | undefined;
    let t2: Target | undefined;

    const resize = () => {
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const w = Math.max(1, Math.round(cssW * dpr));
      const h = Math.max(1, Math.round(cssH * dpr));
      if (w === W && h === H) return;
      W = w;
      H = h;
      canvas.width = W;
      canvas.height = H;
      [scene, b1, t1, b2, t2].forEach(freeTarget);
      scene = makeTarget(W, H);
      const w1 = Math.max(1, W >> 2);
      const h1 = Math.max(1, H >> 2);
      b1 = makeTarget(w1, h1);
      t1 = makeTarget(w1, h1);
      b2 = makeTarget(Math.max(1, w1 >> 1), Math.max(1, h1 >> 1));
      t2 = makeTarget(Math.max(1, w1 >> 1), Math.max(1, h1 >> 1));
    };
    resize();
    let resizeQueued = false;
    const onResize = () => {
      resizeQueued = true;
    };
    window.addEventListener("resize", onResize);

    // Puntatore: la scena ruota appena seguendolo, e attorno al cursore (o
    // al dito) le particelle si spostano, vorticano e si accendono. Il click
    // manda un'onda che si allarga.
    const pointer = { x: 0, y: 0, wx: 0, wy: 0, seen: false, on: 0, moved: 0, touch: false };
    const mouse = { x: 0, y: 0, str: 0, vx: 0, vy: 0 };
    let pulse = { x: 0, y: 0, start: -1e9 };
    const setPointer = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
      pointer.wx = (e.clientX - window.innerWidth / 2) / (window.innerHeight / 2);
      pointer.wy = (window.innerHeight / 2 - e.clientY) / (window.innerHeight / 2);
      pointer.touch = e.pointerType !== "mouse";
      if (!pointer.seen) {
        mouse.x = pointer.wx;
        mouse.y = pointer.wy;
        pointer.seen = true;
      }
      pointer.on = 1;
      pointer.moved = performance.now();
    };
    const onPointer = (e: PointerEvent) => setPointer(e);
    const onDown = (e: PointerEvent) => {
      setPointer(e);
      pulse = { x: pointer.wx, y: pointer.wy, start: performance.now() };
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") pointer.on = 0;
    };
    const onLeave = () => {
      pointer.on = 0;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    // Conversione da pixel della finestra a coordinate del mondo (altezza
    // visibile = 2 sul piano z = 0).
    const toWorld = (p: Placement): [number, number, number] => [
      (p.x - cssW / 2) / (cssH / 2),
      (cssH / 2 - p.y) / (cssH / 2),
      p.r / (cssH / 2),
    ];

    type Display = Omit<UniverseTarget, "key">;
    let display: Display | null = null;
    let displayKey = "";
    let morph: { from: ShapeId; fromP: Placement; fromGain: number; start: number } | null = null;
    const prev = {
      st: [0, 0, 0, 0],
      pa: [0, 0, 0],
      pb: [0, 0, 0],
      cam: [0, 0],
      mouse: [0, 0, 0, 0.3],
      mvel: [0, 0],
      pulse: [0, 0, 0, 0],
      fan: 0,
    };
    let lastScroll = window.scrollY;
    // Apertura a stella del marchio: parte poco dopo che il logo si è formato.
    let fan = 0;
    let logoSince = -1;
    const cam = { x: 0, y: 0 };
    let simTime = 0;
    let last = performance.now();
    let drawCount = quality.count;
    let slowFrames = 0;
    let sampled = 0;
    let first = true;

    const frame = (now: number) => {
      if (resizeQueued) {
        resizeQueued = false;
        resize();
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // Scorrendo, il tempo delle particelle accelera: le forme girano più
      // veloci finché la pagina si muove.
      const scrollSpeed = dt > 0 ? Math.abs(window.scrollY - lastScroll) / dt / Math.max(cssH, 1) : 0;
      lastScroll = window.scrollY;
      if (!reduce) simTime += dt * (1 + Math.min(scrollSpeed * 1.2, 2.5));

      // Qualità adattiva: se i primi secondi sono lenti, meno particelle e
      // risoluzione più bassa.
      if (sampled < 120 && dt > 0) {
        sampled++;
        if (dt > 1 / 40) slowFrames++;
        if (sampled === 120 && slowFrames > 50) {
          drawCount = Math.round(quality.count * 0.6);
          dprCap = Math.min(dprCap, 1.35);
          resize();
        }
      }

      const desired = universe.target ?? pageTarget(pathRef.current, cssW, cssH);
      if (!display) {
        display = { ...desired };
        displayKey = desired.key;
      }
      if (desired.key !== displayKey && !morph) {
        const settledB = display.m >= 0.5;
        morph = {
          from: settledB ? display.b : display.a,
          fromP: settledB ? display.pb : display.pa,
          fromGain: display.gain,
          start: now,
        };
        displayKey = desired.key;
      }
      if (morph) {
        const k = Math.min(1, (now - morph.start) / 1500);
        const to = desired.m >= 0.5 ? desired.b : desired.a;
        const toP = desired.m >= 0.5 ? desired.pb : desired.pa;
        display = {
          a: morph.from,
          b: to,
          m: morph.from === to ? 0 : ease(k),
          pa: morph.fromP,
          pb: toP,
          gain: morph.fromGain + (desired.gain - morph.fromGain) * ease(k),
        };
        if (k >= 1) morph = null;
      } else {
        display = { ...desired };
      }

      cam.x += (pointer.x * 0.09 - cam.x) * (1 - Math.exp(-dt * 2.5));
      cam.y += (pointer.y * 0.055 - cam.y) * (1 - Math.exp(-dt * 2.5));

      // Il campo del puntatore insegue il cursore con un filo di ritardo e si
      // spegne piano quando il mouse resta fermo a lungo o esce dalla finestra.
      const idle = now - pointer.moved > 2600;
      const targetStr = reduce ? 0 : pointer.on * (idle ? 0.45 : 1);
      mouse.str += (targetStr - mouse.str) * (1 - Math.exp(-dt * (targetStr > mouse.str ? 6 : 1.5)));
      const k = 1 - Math.exp(-dt * 12);
      const nx = mouse.x + (pointer.wx - mouse.x) * k;
      const ny = mouse.y + (pointer.wy - mouse.y) * k;
      if (dt > 0) {
        const vk = 1 - Math.exp(-dt * 8);
        mouse.vx += ((nx - mouse.x) / dt - mouse.vx) * vk;
        mouse.vy += ((ny - mouse.y) / dt - mouse.vy) * vk;
        const vl = Math.hypot(mouse.vx, mouse.vy);
        if (vl > 4) {
          mouse.vx *= 4 / vl;
          mouse.vy *= 4 / vl;
        }
      }
      mouse.x = nx;
      mouse.y = ny;
      const radius = (pointer.touch ? 0.3 : 0.26) * (1 + Math.min(Math.hypot(mouse.vx, mouse.vy) * 0.08, 0.35));
      const mouseNow = [mouse.x, mouse.y, mouse.str, radius];

      const logoW =
        (display.a === SHAPE.logo ? 1 - display.m : 0) + (display.b === SHAPE.logo && display.a !== SHAPE.logo ? display.m : 0);
      if (logoW > 0.97) {
        if (logoSince < 0) logoSince = now;
      } else {
        logoSince = -1;
      }
      const fanTarget = logoSince >= 0 && now - logoSince > 500 ? 1 : 0;
      fan += (fanTarget - fan) * (1 - Math.exp(-dt * (fanTarget > fan ? 1.8 : 5)));
      if (reduce) fan = fanTarget;
      const mvelNow = [mouse.vx, mouse.vy];
      const age = (now - pulse.start) / 1000;
      const pulseNow = reduce || age > 1.6 ? [0, 0, 0, 0] : [pulse.x, pulse.y, age, Math.pow(1 - age / 1.6, 1.5)];

      const st = [display.a, display.b, display.m, simTime];
      const pa = toWorld(display.pa);
      const pb = toWorld(display.pb);
      const camNow = [cam.x, cam.y];
      if (first) {
        prev.st = st;
        prev.pa = pa;
        prev.pb = pb;
        prev.cam = camNow;
        prev.mouse = mouseNow;
        prev.mvel = mvelNow;
        prev.pulse = pulseNow;
        prev.fan = fan;
        first = false;
      }

      // Particelle, sommate nella texture HDR.
      gl.bindFramebuffer(gl.FRAMEBUFFER, scene!.fbo);
      gl.viewport(0, 0, W, H);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.useProgram(particles.p);
      const u = particles.u;
      gl.uniform2f(u("u_res"), W, H);
      gl.uniform1f(u("u_aspect"), W / H);
      gl.uniform1f(u("u_px"), quality.px * dpr);
      gl.uniform1f(u("u_gain"), display.gain * (hdr ? 0.085 : 0.05) * (REFERENCE_COUNT / drawCount) * (small ? 1.5 : 1));
      gl.uniform4fv(u("u_st"), st);
      gl.uniform4fv(u("u_stP"), prev.st);
      gl.uniform3fv(u("u_pa"), pa);
      gl.uniform3fv(u("u_pb"), pb);
      gl.uniform3fv(u("u_paP"), prev.pa);
      gl.uniform3fv(u("u_pbP"), prev.pb);
      gl.uniform2fv(u("u_cam"), camNow);
      gl.uniform2fv(u("u_camP"), prev.cam);
      gl.uniform4fv(u("u_mouse"), mouseNow);
      gl.uniform4fv(u("u_mouseP"), prev.mouse);
      gl.uniform2fv(u("u_mvel"), mvelNow);
      gl.uniform2fv(u("u_mvelP"), prev.mvel);
      gl.uniform4fv(u("u_pulse"), pulseNow);
      gl.uniform4fv(u("u_pulseP"), prev.pulse);
      gl.uniform1f(u("u_fan"), fan);
      gl.uniform1f(u("u_fanP"), prev.fan);
      gl.bindVertexArray(vao);
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, drawCount);
      gl.disable(gl.BLEND);

      prev.st = st;
      prev.pa = pa;
      prev.pb = pb;
      prev.cam = camNow;
      prev.mouse = mouseNow;
      prev.mvel = mvelNow;
      prev.pulse = pulseNow;
      prev.fan = fan;

      // Bagliore: due livelli sfocati a un quarto e a un ottavo.
      gl.bindVertexArray(emptyVao);
      const pass = (src: Target, dst: Target, prog: ReturnType<typeof compile>, setup: () => void) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fbo);
        gl.viewport(0, 0, dst.w, dst.h);
        gl.useProgram(prog.p);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, src.tex);
        gl.uniform1i(prog.u("u_src"), 0);
        gl.uniform2f(prog.u("u_res"), dst.w, dst.h);
        setup();
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };
      pass(scene!, b1!, down, () => gl.uniform2f(down.u("u_texel"), 1 / W, 1 / H));
      pass(b1!, t1!, blur, () => gl.uniform2f(blur.u("u_dir"), 1 / b1!.w, 0));
      pass(t1!, b1!, blur, () => gl.uniform2f(blur.u("u_dir"), 0, 1 / b1!.h));
      pass(b1!, b2!, down, () => gl.uniform2f(down.u("u_texel"), 1 / b1!.w, 1 / b1!.h));
      pass(b2!, t2!, blur, () => gl.uniform2f(blur.u("u_dir"), 1 / b2!.w, 0));
      pass(t2!, b2!, blur, () => gl.uniform2f(blur.u("u_dir"), 0, 1 / b2!.h));

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, W, H);
      gl.useProgram(composite.p);
      const textures: [string, Target][] = [["u_scene", scene!], ["u_b1", b1!], ["u_b2", b2!]];
      textures.forEach(([name, t], i) => {
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(gl.TEXTURE_2D, t.tex);
        gl.uniform1i(composite.u(name), i);
      });
      gl.uniform2f(composite.u("u_res"), W, H);
      gl.uniform1f(composite.u("u_time"), simTime);
      gl.uniform1f(composite.u("u_haze"), 0.6 + 0.4 * Math.min(1, display.gain));
      gl.uniform3f(composite.u("u_light"), (mouse.x * (cssH / 2) + cssW / 2) / Math.max(cssW, 1), (mouse.y + 1) / 2, mouse.str);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (canvas.dataset.ready !== "true") canvas.dataset.ready = "true";
    };

    const stop = addTick(frame, TICK.background);
    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
      canvas.dataset.fallback = "true";
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("webglcontextlost", onLost);
      [scene, b1, t1, b2, t2].forEach(freeTarget);
      gl.deleteBuffer(quad);
      gl.deleteBuffer(logoBuf);
      gl.deleteVertexArray(vao);
      gl.deleteVertexArray(emptyVao);
      [particles, down, blur, composite].forEach(({ p }) => gl.deleteProgram(p));
    };
  }, []);

  return (
    <div aria-hidden className="universe pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

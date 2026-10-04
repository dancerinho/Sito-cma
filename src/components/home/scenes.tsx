"use client";

import { CSSProperties, ElementType, ReactNode, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { TICK, addTick } from "@/components/fx/ticker";
import { setScrollLocked } from "@/components/fx/smooth-scroll";
import { SHAPE, universe, type Placement, type ShapeId } from "@/components/fx/universe-state";
import { QuickRequest } from "@/components/home/quick-request";
import {
  contactConfig,
  contactLinks,
  methodSteps,
  services,
  servicesDisclaimer,
  skillItems,
  socialLinks,
} from "@/config/site";

/**
 * Home a scene: un palco fisso (sticky) alto quanto lo schermo, sopra lo
 * sfondo a particelle. Scorrendo, le particelle passano da una forma
 * all'altra e i testi della scena attiva entrano dai lati; tra una scena e
 * l'altra restano solo le particelle che esplodono e si ricompongono.
 *
 * L'ordine dei contenuti è quello del sito precedente:
 *
 *   hero      chi siamo e richiesta rapida       anello attorno al marchio
 *   servizi   i sei servizi ai due lati          nucleo incandescente
 *   approccio da zero, e cosa trovi in ogni progetto   globo
 *   metodo    le fasi di lavoro in orizzontale   vortice
 *   contatti  richiesta e canali diretti         il marchio che si apre a stella
 */

/** Quanto resta ferma ogni scena e quanto dura ogni passaggio, in schermi. */
const PLAN = {
  desktop: { hold: [0.6, 1, 1, 1.6, 0.7], trans: 0.85 },
  mobile: { hold: [0.35, 0.7, 0.7, 1.2, 0.4], trans: 0.6 },
};

/** Indice della scena del metodo, che fa scorrere le fasi. */
const METHOD = 3;

const span = (p: { hold: number[]; trans: number }) =>
  p.hold.reduce((sum, h) => sum + h, 0) + p.trans * (p.hold.length - 1);

const SHAPES: ShapeId[] = [SHAPE.ring, SHAPE.core, SHAPE.shell, SHAPE.vortex, SHAPE.logo];

const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/** Posizione continua nella sequenza di scene (1.5 = a metà tra la seconda e la terza). */
function locate(u: number, plan: { hold: number[]; trans: number }) {
  let start = 0;
  for (let i = 0; i < plan.hold.length; i++) {
    const endHold = start + plan.hold[i]!;
    if (u <= endHold || i === plan.hold.length - 1) return i;
    if (u < endHold + plan.trans) return i + (u - endHold) / plan.trans;
    start = endHold + plan.trans;
  }
  return plan.hold.length - 1;
}

/** Istanze montate: serve a non chiudere il caricamento durante un rimontaggio. */
let mounted = 0;

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/** Il titolo si decodifica da lettere casuali fino al testo vero. */
function scramble(el: HTMLElement) {
  const text = el.dataset.text ?? el.textContent ?? "";
  const token = String(Number(el.dataset.token ?? 0) + 1);
  el.dataset.token = token;
  const start = performance.now();
  const step = (now: number) => {
    if (el.dataset.token !== token) return;
    const k = Math.min(1, (now - start) / 750);
    const shown = Math.floor(k * text.length);
    let out = text.slice(0, shown);
    for (let i = shown; i < text.length; i++) {
      out += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** Titolo su due righe: la prima entra da sinistra, la seconda da destra. */
function Title({ as: Tag = "h2", a, b }: { as?: ElementType; a: string; b: string }) {
  return (
    <Tag className="scene-title">
      <span className="scene-line scene-line-a">
        <span>{a}</span>
      </span>{" "}
      <span className="scene-line scene-line-b">
        <span>{b}</span>
      </span>
    </Tag>
  );
}

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** Voce laterale: titolo, una riga di dettaglio e un filo che sfuma. */
function SideItem({
  title,
  detail,
  href,
  mark,
  side,
  delay,
}: {
  title: string;
  detail: string;
  href?: string;
  mark?: boolean;
  side: "left" | "right";
  delay: number;
}) {
  const body = (
    <>
      <span className="block text-[15px] font-medium leading-tight text-paper transition-colors group-hover:text-[#AFC0FF] lg:text-[22px] lg:font-normal">
        {title}
        {mark ? <sup className="ml-0.5 text-[0.6em] text-ink-400">*</sup> : null}
      </span>
      <span className="mt-1 line-clamp-2 block text-[11px] leading-snug text-ink-400 lg:text-[12px]">{detail}</span>
      <span
        aria-hidden
        className={`absolute bottom-0 h-px w-full max-w-[240px] lg:w-[240px] ${
          side === "right" ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"
        } from-white/25 to-transparent`}
      />
    </>
  );
  const cls = `group relative block py-2.5 lg:py-3 ${side === "right" ? "lg:text-right" : ""}`;
  return (
    <li className={side === "left" ? "scene-from-left" : "scene-from-right"} style={d(delay)}>
      {href ? (
        <Link href={href} className={cls}>
          {body}
        </Link>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </li>
  );
}

type Side = { title: string; detail: string; href?: string; mark?: boolean };

/**
 * Due colonne ai lati della forma su desktop (sinistra più in basso, destra
 * più in alto, o il contrario), griglia a due colonne sotto la forma su
 * telefono.
 */
function SideLists({ items, flip = false, anchorClass }: { items: Side[]; flip?: boolean; anchorClass: string }) {
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);
  return (
    <>
      <div className="relative w-full flex-1">
        <div data-anchor className={`absolute left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 ${anchorClass}`} />
        <ul className={`absolute left-0 hidden w-[340px] text-left lg:block ${flip ? "bottom-[16%]" : "bottom-[4%]"}`}>
          {left.map((item, i) => (
            <SideItem key={item.title} {...item} side="left" delay={0.3 + i * 0.08} />
          ))}
        </ul>
        <ul className={`absolute right-0 hidden w-[340px] lg:block ${flip ? "bottom-[4%]" : "bottom-[16%]"}`}>
          {right.map((item, i) => (
            <SideItem key={item.title} {...item} side="right" delay={0.36 + i * 0.08} />
          ))}
        </ul>
      </div>
      <ul className="grid w-full grid-cols-2 gap-x-4 text-left lg:hidden">
        {items.map((item, i) => (
          <SideItem key={item.title} {...item} side={i % 2 ? "right" : "left"} delay={0.25 + i * 0.05} />
        ))}
      </ul>
    </>
  );
}

/** Riga sotto il titolo. */
function Lead({ children, delay = 0.3 }: { children: ReactNode; delay?: number }) {
  return (
    <p className="scene-fade mx-auto mt-3 max-w-md text-pretty text-[12.5px] leading-relaxed text-ink-300 sm:text-[13px] lg:mt-4" style={d(delay)}>
      {children}
    </p>
  );
}

const serviceSides: Side[] = services.map((service) => ({
  title: service.title,
  detail: service.short,
  href: `/servizi/#${service.id}`,
  mark: service.id === "trading-bot",
}));

const skillSides: Side[] = skillItems.map((item) => ({ title: item.title, detail: item.description }));

const socials = [
  { label: "Instagram", href: socialLinks.instagram },
  { label: "TikTok", href: socialLinks.tiktok },
].filter((s) => s.href);

export function Scenes() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!wrap || !stage || !track || !fill) return;

    const html = document.documentElement;
    mounted++;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layers = Array.from(stage.querySelectorAll<HTMLElement>("[data-scene]"));
    const anchors = layers.map((layer) => layer.querySelector<HTMLElement>("[data-anchor]"));
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));

    let plan = PLAN.mobile;
    let vh = 1;
    let vw = 1;
    let wrapTop = 0;
    let places: Placement[] = [];
    let maxShift = 0;
    let cardGeo: { x: number; w: number }[] = [];

    const measure = () => {
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      plan = wide ? PLAN.desktop : PLAN.mobile;
      vh = stage.clientHeight || window.innerHeight;
      vw = stage.clientWidth || window.innerWidth;
      wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
      const s = stage.getBoundingClientRect();
      places = anchors.map((el) => {
        if (!el) return { x: vw / 2, y: vh / 2, r: vh * 0.15 };
        const r = el.getBoundingClientRect();
        return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2, r: r.width / 2 };
      });
      // L'anello dell'hero è molto più largo del cerchio con il marchio.
      places[0] = { ...places[0]!, r: wide ? Math.max(vw * 0.45, 420) : vw * 0.6 };
      maxShift = Math.max(0, track.offsetWidth - (track.parentElement?.clientWidth ?? vw));
      cardGeo = cards.map((c) => ({ x: c.offsetLeft, w: c.offsetWidth }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    ro.observe(document.body);
    document.fonts?.ready.then(measure).catch(() => {});

    // Caricamento: contatore e stelle che corrono, solo alla prima visita.
    let phase: "loading" | "intro" | "done" = html.dataset.intro === "loading" && !reduce ? "loading" : "done";
    if (html.dataset.intro === "loading" && phase === "done") html.dataset.intro = "done";
    let loadStart = performance.now();
    let introStart = 0;
    let readyAt = 0;
    let loaded = document.readyState === "complete";
    let fontsReady = false;
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(() => {
      fontsReady = true;
    });
    if (!document.fonts) fontsReady = true;
    if (phase === "loading") {
      setScrollLocked(true);
      window.scrollTo(0, 0);
      loadStart = performance.now();
    }

    let sSmooth = 0;
    let active = -1;
    let last = performance.now();
    const cardOn = cards.map(() => false);

    const setActive = (index: number) => {
      if (index === active) return;
      active = index;
      layers.forEach((layer, i) => {
        layer.dataset.active = String(i === index);
      });
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const u = (window.scrollY - wrapTop) / vh;
      const s = locate(Math.max(0, u), plan);
      sSmooth = reduce ? s : sSmooth + (s - sSmooth) * (1 - Math.exp(-dt * 9));

      if (phase === "loading") {
        const elapsed = now - loadStart;
        const cap = loaded && fontsReady ? 1 : 0.9;
        const k = clamp01(Math.min(cap, elapsed / 2000));
        const shown = 1 - Math.pow(1 - k, 2);
        if (counterRef.current) counterRef.current.textContent = String(Math.round(shown * 100));
        if (barRef.current) barRef.current.style.transform = `scaleX(${shown})`;
        if (k >= 1) {
          if (!readyAt) readyAt = now;
          if (now - readyAt > 260) {
            phase = "intro";
            introStart = now;
            html.dataset.intro = "done";
            setScrollLocked(false);
            try {
              sessionStorage.setItem("cma-intro", "1");
            } catch {}
          }
        }
      }

      let a: ShapeId;
      let b: ShapeId;
      let m: number;
      let pa: Placement;
      let pb: Placement;
      if (phase !== "done") {
        const k = phase === "intro" ? clamp01((now - introStart) / 2200) : 0;
        a = SHAPE.warp;
        b = SHAPE.ring;
        m = ease(k);
        pa = places[0]!;
        // L'anello nasce piccolo al centro e si allarga fino alla sua misura.
        pb = { ...places[0]!, r: places[0]!.r * (0.5 + 0.5 * ease(clamp01((k - 0.25) / 0.75))) };
        if (k >= 1) phase = "done";
      } else {
        const i = Math.min(Math.floor(sSmooth), SHAPES.length - 1);
        const j = Math.min(i + 1, SHAPES.length - 1);
        a = SHAPES[i]!;
        b = SHAPES[j]!;
        m = i === j ? 0 : sSmooth - i;
        pa = places[i]!;
        pb = places[j]!;
      }
      // Oltre l'ultima scena (verso il footer) le particelle si attenuano.
      const past = clamp01((u - span(plan)) / 0.8);
      universe.target = { key: "home", a, b, m, pa, pb, gain: 1 - 0.85 * past };

      // Testi: visibili solo quando la scena è (quasi) ferma.
      const nearest = Math.round(s);
      const introLate = phase === "intro" && now - introStart > 1100;
      let index = Math.abs(s - nearest) < 0.24 ? nearest : -1;
      if (phase === "loading" || (phase === "intro" && !introLate)) index = -1;
      setActive(index);

      // Fasi del metodo: scorrono in orizzontale mentre la scena è ferma.
      const methodStart = plan.hold.slice(0, METHOD).reduce((sum, h) => sum + h, 0) + plan.trans * METHOD;
      let q = clamp01((u - methodStart) / (plan.hold[METHOD] ?? 1));
      // Su telefono si vede una fase alla volta: la fila si ferma su ognuna.
      if (plan === PLAN.mobile && cards.length > 1) {
        const pos = q * (cards.length - 1);
        const i = Math.min(Math.floor(pos), cards.length - 2);
        q = (i + ease(clamp01((pos - i - 0.25) / 0.5))) / (cards.length - 1);
      }
      const shift = q * maxShift;
      track.style.transform = `translate3d(${-shift}px,0,0)`;
      fill.style.transform = `scaleX(${q})`;
      cardGeo.forEach((g, n) => {
        const cx = g.x + g.w / 2 - shift;
        const on = active === METHOD && cx > vw * 0.03 && cx < vw * 0.97;
        const card = cards[n]!;
        if (on !== cardOn[n]) {
          cardOn[n] = on;
          card.dataset.on = String(on);
          if (on && !reduce) card.querySelectorAll<HTMLElement>("[data-scramble]").forEach(scramble);
        }
      });
    };

    const stop = addTick(tick, TICK.scenes);
    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener("load", onLoad);
      universe.target = null;
      mounted--;
      // In sviluppo React smonta e rimonta subito l'effetto: il caricamento
      // si chiude solo se la home è stata lasciata davvero.
      window.setTimeout(() => {
        if (mounted === 0 && html.dataset.intro === "loading") {
          html.dataset.intro = "done";
          setScrollLocked(false);
        }
      }, 120);
    };
  }, []);

  const plan = PLAN;

  return (
    <>
      <div className="intro-loader" aria-hidden>
        <div className="flex flex-col items-center">
          <span className="text-[15px] font-semibold tabular-nums tracking-wide text-paper/85">
            <span ref={counterRef}>0</span>
            <sup className="ml-0.5 text-[8px] text-paper/60">%</sup>
          </span>
          <span className="mt-1.5 block h-px w-16 overflow-hidden bg-white/10">
            <span ref={barRef} className="block h-full origin-left scale-x-0 bg-[#5B74FF] shadow-[0_0_8px_#5B74FF]" />
          </span>
        </div>
      </div>

      <div
        ref={wrapRef}
        className="scenes relative"
        style={
          {
            "--scenes-h": span(plan.mobile) + 1,
            "--scenes-h-lg": span(plan.desktop) + 1,
          } as CSSProperties
        }
      >
        <div ref={stageRef} className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Hero */}
          <section data-scene="0" data-active="false" aria-label="Introduzione" className="scene-layer">
            <div className="scene-inner">
              <Title as="h1" a="Siti web e software" b="su misura." />
              <div className="relative flex w-full flex-1 items-center justify-center py-4">
                <div data-anchor className="relative aspect-square w-[clamp(140px,17vw,250px)]">
                  <div className="scene-fade absolute inset-0 rounded-full border border-white/[0.09]" style={d(0.35)}>
                    <div className="absolute inset-0 flex items-center justify-center [perspective:700px]">
                      <LogoMark mono fan className="orb-spin h-[48%] w-[48%] text-[#C3C8FF]" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="scene-fade max-w-[30rem] text-pretty text-[13px] font-semibold leading-relaxed text-ink-100 sm:text-sm" style={d(0.45)}>
                Progettiamo e sviluppiamo siti, web app, software e automazioni per la tua azienda: un unico team,
                dall&apos;idea alla messa online.
              </p>
              <div className="scene-fade mt-4 flex w-full justify-center sm:mt-5" style={d(0.55)}>
                <QuickRequest />
              </div>
              <p className="scene-fade mt-3 text-[11px] text-ink-400" style={d(0.65)}>
                Prima valutazione senza impegno · email, telefono o WhatsApp
              </p>
            </div>
          </section>

          {/* Servizi */}
          <section id="servizi" data-scene="1" data-active="false" aria-label="Servizi" className="scene-layer">
            <div className="scene-inner lg:px-12">
              <Title a="Dal sito vetrina" b="al software gestionale." />
              <Lead>Scegli il punto di partenza, al resto pensiamo noi.</Lead>
              <SideLists
                items={serviceSides}
                anchorClass="top-1/2 h-[clamp(70px,13vh,120px)] lg:top-[48%] lg:h-[clamp(140px,22vh,230px)]"
              />
              <div className="scene-fade mt-2 flex flex-col items-center gap-1.5 lg:mt-0" style={d(0.6)}>
                <Link href="/servizi/" className="inline-flex items-center gap-1.5 py-1 text-[12px] font-semibold text-paper transition-colors hover:text-[#AFC0FF]">
                  Tutti i servizi
                  <ChevronRight size={13} strokeWidth={2.5} aria-hidden />
                </Link>
                <p className="mx-auto max-w-xl text-pretty text-[9.5px] leading-snug text-ink-500 lg:text-[10.5px]">* {servicesDisclaimer}</p>
              </div>
            </div>
          </section>

          {/* Approccio */}
          <section id="approccio" data-scene="2" data-active="false" aria-label="Il nostro approccio" className="scene-layer">
            <div className="scene-inner lg:px-12">
              <Title a="Ogni progetto parte" b="da zero, senza template." />
              <Lead>Partiamo dagli obiettivi reali del progetto: contesto, utenti, vincoli tecnici e di tempo.</Lead>
              <SideLists
                flip
                items={skillSides}
                anchorClass="top-1/2 h-[clamp(90px,16vh,150px)] lg:top-[50%] lg:h-[clamp(170px,27vh,280px)]"
              />
            </div>
          </section>

          {/* Metodo */}
          <section id="metodo" data-scene="3" data-active="false" aria-label="Come lavoriamo" className="scene-layer">
            <div className="scene-inner px-0 sm:px-0">
              <div className="px-4">
                <Title a="Come" b="lavoriamo." />
                <Lead>Un percorso semplice, con aggiornamenti costanti e nessuna sorpresa.</Lead>
              </div>
              <div className="relative w-full flex-1">
                <div
                  data-anchor
                  className="absolute left-1/2 top-[50%] aspect-square h-[clamp(80px,12vh,120px)] -translate-x-1/2 -translate-y-1/2 lg:h-[clamp(150px,24vh,250px)]"
                />
              </div>
              <div className="scene-fade relative w-full overflow-hidden" style={d(0.3)}>
                <div ref={trackRef} className="relative w-max pl-[11vw] pr-[11vw] will-change-transform lg:pl-[52vw] lg:pr-[40vw]">
                  <ol className="flex gap-[12vw] text-left sm:gap-16 lg:gap-24">
                    {methodSteps.map((step) => (
                      <li key={step.title} data-card data-on="false" className="method-card relative w-[78vw] shrink-0 pb-7 sm:w-[340px]">
                        <h3 aria-label={step.title} className="text-[22px] font-normal leading-tight text-paper lg:text-[26px]">
                          <span aria-hidden data-scramble data-text={step.title}>
                            {step.title}
                          </span>
                        </h3>
                        <p className="method-desc mt-2 text-[13px] leading-relaxed text-ink-300">{step.description}</p>
                        <svg aria-hidden viewBox="0 0 20 19" className="method-mark absolute -bottom-[7px] left-0 h-3.5 w-3.5">
                          <path d="M10 0.8 L19.2 7.5 L15.7 18.2 L4.3 18.2 L0.8 7.5 Z" />
                        </svg>
                      </li>
                    ))}
                  </ol>
                  <span aria-hidden className="absolute bottom-0 left-[11vw] right-0 h-px bg-white/[0.09] lg:left-[52vw]" />
                  <div
                    ref={fillRef}
                    aria-hidden
                    className="absolute bottom-0 left-[11vw] right-[11vw] h-px origin-left bg-[#5B74FF] shadow-[0_0_10px_#5B74FF] lg:left-[52vw] lg:right-[40vw]"
                  />
                </div>
              </div>
              <div className="scene-fade mt-3 lg:mt-4" style={d(0.5)}>
                <Link href="/studio/" className="inline-flex items-center gap-1.5 py-1 text-[12px] font-semibold text-paper transition-colors hover:text-[#AFC0FF]">
                  Chi siamo
                  <ChevronRight size={13} strokeWidth={2.5} aria-hidden />
                </Link>
              </div>
            </div>
          </section>

          {/* Contatti */}
          <section id="contatti" data-scene="4" data-active="false" aria-label="Contatti" className="scene-layer">
            <div className="scene-inner">
              <Title a="Hai un progetto in mente?" b="Parliamone." />
              <div className="relative w-full flex-1">
                <div
                  data-anchor
                  className="absolute left-1/2 top-1/2 aspect-square h-[clamp(130px,24vh,210px)] -translate-x-1/2 -translate-y-1/2 lg:h-[clamp(220px,34vh,340px)]"
                />
              </div>
              <p className="scene-fade max-w-md text-pretty text-[13px] font-medium leading-relaxed text-ink-100 sm:text-sm" style={d(0.4)}>
                Ti rispondiamo con una prima valutazione, senza impegno.
              </p>
              <div className="scene-fade mt-4 flex w-full justify-center sm:mt-5" style={d(0.5)}>
                <QuickRequest />
              </div>
              <ul className="scene-fade mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[12px] font-medium text-ink-300" style={d(0.6)}>
                <li>
                  <a href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 transition-colors hover:text-paper">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={contactLinks.tel} className="inline-block py-1.5 transition-colors hover:text-paper">
                    {contactConfig.phone}
                  </a>
                </li>
                <li>
                  <a href={contactLinks.mailto} className="inline-block py-1.5 transition-colors hover:text-paper">
                    {contactConfig.email}
                  </a>
                </li>
                {socials.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 transition-colors hover:text-paper">
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

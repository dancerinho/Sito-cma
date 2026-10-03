"use client";

import { type JSX, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, easeOut } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { skillItems } from "@/config/site";
import { cn } from "@/lib/utils";
import { swipeTrack } from "@/lib/swipe";
import { Swipe } from "@/components/ui/swipe";

/**
 * Cosa garantiamo in ogni progetto: una griglia di card, ognuna con una
 * piccola animazione che rappresenta il principio.
 */

function useLoop(on: boolean, count: number, ms: number) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!on || reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % count), ms);
    return () => window.clearInterval(id);
  }, [on, reduce, count, ms]);
  return i;
}

const layouts = [
  ["col-span-4 row-span-1", "col-span-2 row-span-2", "col-span-2 row-span-1", "col-span-2 row-span-1"],
  ["col-span-2 row-span-2", "col-span-4 row-span-1", "col-span-1 row-span-1", "col-span-3 row-span-1"],
  ["col-span-3 row-span-1", "col-span-3 row-span-1", "col-span-6 row-span-1", "hidden"],
];

function DesignVisual({ on }: { on: boolean }) {
  const i = useLoop(on, layouts.length, 2200);
  return (
    <div className="grid h-full grid-cols-6 grid-rows-2 gap-2">
      {(layouts[i] ?? []).map((cls, j) => (
        <motion.span
          layout
          key={j}
          transition={{ duration: 0.8, ease: easeOut }}
          className={cn("rounded-lg border border-white/[0.06]", cls, j === 0 ? "bg-accent/25" : "bg-white/[0.05]")}
        />
      ))}
    </div>
  );
}

function ResponsiveVisual({ on }: { on: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-full items-center justify-center">
      <motion.div
        animate={on && !reduce ? { width: ["92%", "92%", "56%", "56%", "30%", "30%", "92%"] } : { width: "92%" }}
        transition={{ duration: 7, times: [0, 0.18, 0.3, 0.48, 0.6, 0.84, 1], repeat: Infinity, ease: "easeInOut" }}
        className="flex h-full flex-col gap-1.5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-2.5"
      >
        <span className="h-1.5 w-8 shrink-0 rounded bg-white/25" />
        <div className="flex flex-1 flex-wrap content-start gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((j) => (
            <span key={j} className={cn("h-6 min-w-[2.5rem] flex-1 basis-[30%] rounded", j === 0 ? "bg-accent/40" : "bg-white/[0.07]")} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function SpeedVisual({ on }: { on: boolean }) {
  const i = useLoop(on, 2, 1600);
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="flex items-center justify-between font-mono text-[10px]">
        <span className="flex items-center gap-1.5 text-ink-400">
          <Zap size={11} className="text-accent" aria-hidden /> caricamento
        </span>
        <span className={cn("transition-colors duration-300", i === 1 ? "text-accent" : "text-ink-600")}>pronto</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-white/[0.07]">
        <motion.span
          key={i}
          className="absolute inset-0 origin-left rounded-full bg-accent shadow-[0_0_16px_rgb(var(--accent)/0.8)]"
          initial={{ scaleX: i === 1 ? 0 : 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.45, ease: [0.2, 0.9, 0.3, 1] }}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((j) => (
          <motion.span
            key={`${i}-${j}`}
            initial={{ opacity: i === 1 ? 0 : 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + j * 0.06 }}
            className="h-8 rounded-md bg-white/[0.06]"
          />
        ))}
      </div>
    </div>
  );
}

/** Prismi isometrici che crescono uno dopo l'altro. */
function ScaleVisual({ on }: { on: boolean }) {
  const reduce = useReducedMotion();
  const heights = [26, 38, 50, 62, 78];
  const w = 18;
  return (
    <svg viewBox="0 0 220 130" className="h-full w-full" aria-hidden>
      {heights.map((h, j) => {
        const cx = 30 + j * 40;
        const base = 116;
        const top = base - h;
        const last = j === heights.length - 1;
        const left = `${cx - w},${top + 9} ${cx},${top + 18} ${cx},${base} ${cx - w},${base - 9}`;
        const right = `${cx},${top + 18} ${cx + w},${top + 9} ${cx + w},${base - 9} ${cx},${base}`;
        const roof = `${cx - w},${top + 9} ${cx},${top} ${cx + w},${top + 9} ${cx},${top + 18}`;
        return (
          <motion.g
            key={j}
            initial={{ clipPath: reduce ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
            animate={on ? { clipPath: "inset(0% 0 0 0)" } : undefined}
            transition={{ duration: 0.9, delay: 0.15 + j * 0.14, ease: easeOut }}
          >
            <polygon points={left} style={{ fill: last ? "rgb(var(--accent) / 0.55)" : "#1c2026" }} />
            <polygon points={right} style={{ fill: last ? "rgb(var(--accent) / 0.35)" : "#111418" }} />
            <polygon
              points={roof}
              style={{
                fill: last ? "rgb(var(--accent))" : "#B3B9C1",
                filter: last ? "drop-shadow(0 0 8px rgb(var(--accent) / 0.9))" : undefined,
              }}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

function UxVisual({ on }: { on: boolean }) {
  const reduce = useReducedMotion();
  const loop = on && !reduce;
  return (
    <div className="relative h-full">
      <div className="absolute left-0 top-1 flex flex-col gap-1.5">
        <span className="h-2 w-24 rounded bg-white/15" />
        <span className="h-2 w-16 rounded bg-white/[0.07]" />
      </div>
      <motion.span
        animate={loop ? { scale: [1, 1, 0.94, 1, 1] } : undefined}
        transition={{ duration: 3.2, times: [0, 0.55, 0.62, 0.7, 1], repeat: Infinity }}
        className="absolute bottom-3 right-3 flex h-9 items-center rounded-full bg-accent px-4 font-mono text-[10px] text-accent-ink"
      >
        continua
      </motion.span>
      <motion.span
        animate={loop ? { opacity: [0, 0, 0.6, 0, 0], scale: [0.4, 0.4, 1.8, 2.2, 2.2] } : { opacity: 0 }}
        transition={{ duration: 3.2, times: [0, 0.58, 0.64, 0.8, 1], repeat: Infinity }}
        className="absolute bottom-[1.05rem] right-[2.6rem] h-6 w-6 rounded-full border border-accent"
      />
      <motion.svg
        viewBox="0 0 12 18"
        className="absolute h-4 w-3"
        initial={{ left: "12%", top: "30%" }}
        animate={loop ? { left: ["12%", "12%", "74%", "74%", "12%"], top: ["30%", "30%", "66%", "66%", "30%"] } : { left: "74%", top: "66%" }}
        transition={{ duration: 3.2, times: [0, 0.15, 0.55, 0.85, 1], repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
        aria-hidden
      >
        <path d="M0 0 L0 15 L4 11 L7 18 L9.5 17 L6.5 10 L12 10 Z" fill="#F3F4F2" stroke="#07080A" strokeWidth="1" />
      </motion.svg>
    </div>
  );
}

function TalkVisual({ on }: { on: boolean }) {
  const i = useLoop(on, 4, 1300);
  return (
    <div className="flex h-full flex-col justify-end gap-2">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={on ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.7, ease: easeOut }}
        className="max-w-[78%] rounded-2xl rounded-bl-md border border-white/[0.06] bg-white/[0.05] px-3.5 py-2.5"
      >
        <p className="font-mono text-[10px] text-accent">aggiornamento sul progetto</p>
        <span className="mt-2 block h-1.5 w-40 max-w-full rounded bg-white/15" />
        <span className="mt-1.5 block h-1.5 w-28 max-w-full rounded bg-white/[0.08]" />
      </motion.div>
      <div className="flex justify-end">
        <span className="flex gap-1 rounded-2xl rounded-br-md bg-accent/15 px-3.5 py-3">
          {[0, 1, 2].map((j) => (
            <span
              key={j}
              className={cn("h-1.5 w-1.5 rounded-full bg-accent transition-opacity duration-300", i === j ? "opacity-100" : "opacity-30")}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

const visuals: Record<string, (props: { on: boolean }) => JSX.Element> = {
  "Design su misura": DesignVisual,
  "Sviluppo responsive": ResponsiveVisual,
  Prestazioni: SpeedVisual,
  "Codice scalabile": ScaleVisual,
  "Esperienza utente": UxVisual,
  "Comunicazione chiara": TalkVisual,
};

function PrincipleCard({ title, description, index }: { title: string; description: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { margin: "-10% 0px" });
  const Visual = visuals[title];

  return (
    <Reveal
      from={index % 3 === 0 ? "left" : index % 3 === 2 ? "right" : "bottom"}
      delay={(index % 3) * 0.08}
      className="h-auto w-[78%] shrink-0 snap-start sm:w-[46%] md:h-full md:w-auto"
    >
      <div ref={ref} className="panel flex h-full flex-col p-5 sm:p-6">
        <div className="panel-inner dot-grid-light h-32 overflow-hidden p-4 sm:h-40">{Visual ? <Visual on={on} /> : null}</div>
        <h3 className="mt-5 text-lg font-medium tracking-tight text-paper sm:mt-6">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{description}</p>
      </div>
    </Reveal>
  );
}

export function Principles() {
  return (
    <section data-path="0.86" className="py-16 sm:py-28 lg:py-36">
      <Container>
        <SectionHeader
          tag="in ogni progetto"
          title="Cosa trovi in *ogni* progetto."
          description="Esperienza curata su ogni dispositivo, codice solido e aggiornamenti costanti, senza tecnicismi inutili."
        />

        <Swipe
          label="Cosa trovi in ogni progetto"
          className="mt-10 sm:mt-14 lg:mt-20"
          items={skillItems.map((skill, i) => (
            <PrincipleCard key={skill.title} title={skill.title} description={skill.description} index={i} />
          ))}
          trackClassName={cn(
            swipeTrack,
            "md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3",
          )}
          dotsClassName="md:hidden"
        />
      </Container>
    </section>
  );
}

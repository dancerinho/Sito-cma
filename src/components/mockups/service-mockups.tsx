"use client";

import { type JSX, type ReactNode, type Ref, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Activity,
  Check,
  FileText,
  LayoutGrid,
  Lock,
  Power,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { easeOut, useReducedMotionAfterMount } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

/**
 * Interfacce illustrative dei servizi. Mostrano come funziona ciascun
 * servizio, senza numeri, clienti o risultati: sono schemi, non dati.
 */

/** Avvia le animazioni solo quando la card è sullo schermo. */
function useActive() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { margin: "-15% 0px" });
  return { ref, on };
}

/** Contatore che avanza a intervalli regolari finché la card è visibile. */
function useStep(on: boolean, count: number, ms: number) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!on || reduce) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % count), ms);
    return () => window.clearInterval(id);
  }, [on, reduce, count, ms]);
  return reduce ? count - 1 : step;
}

function Frame({
  title,
  status,
  children,
  className,
  innerRef,
}: {
  title: ReactNode;
  status?: string;
  children: ReactNode;
  className?: string;
  innerRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div ref={innerRef} className={cn("panel overflow-hidden", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-3.5 sm:px-6">
        <span className="min-w-0 truncate font-mono text-[11px] text-ink-400">{title}</span>
        {status ? (
          <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-accent">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-accent" />
            {status}
          </span>
        ) : null}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

const pop = (on: boolean, delay: number, from: { x?: number; y?: number } = { y: 10 }) => ({
  initial: { opacity: 0, ...from },
  animate: on ? { opacity: 1, x: 0, y: 0 } : undefined,
  transition: { duration: 0.8, delay, ease: easeOut },
});

/* ------------------------------------------------------------------ */
/* Siti web e landing page                                            */
/* ------------------------------------------------------------------ */

export function SiteMockup() {
  const { ref, on } = useActive();
  const step = useStep(on, 3, 2200);
  const sent = step === 2;

  return (
    <Frame
      innerRef={ref}
      title={
        <span className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
          </span>
          <span className="rounded-md bg-white/[0.05] px-2.5 py-1 text-ink-300">
            <Lock size={9} className="mr-1.5 inline -translate-y-px" aria-hidden />
            il-tuo-sito.it
          </span>
        </span>
      }
    >
      <div className="relative">
        {/* Pagina che si compone. */}
        <div className="panel-inner p-4 sm:p-5">
          <motion.div {...pop(on, 0.1)} className="flex items-center justify-between">
            <span className="h-3 w-14 rounded bg-white/25" />
            <span className="hidden gap-3 sm:flex">
              <span className="h-2 w-8 rounded bg-white/10" />
              <span className="h-2 w-8 rounded bg-white/10" />
              <span className="h-2 w-8 rounded bg-white/10" />
            </span>
            <span className="h-5 w-16 rounded-full bg-accent/80" />
          </motion.div>
          <div className="mt-6 grid grid-cols-5 items-center gap-4">
            <div className="col-span-3">
              <motion.span {...pop(on, 0.25, { x: -24 })} className="block h-4 w-[92%] rounded bg-white/30" />
              <motion.span {...pop(on, 0.35, { x: -24 })} className="mt-2 block h-4 w-[70%] rounded bg-white/30" />
              <motion.span {...pop(on, 0.45, { x: -24 })} className="mt-4 block h-2 w-[85%] rounded bg-white/10" />
              <motion.span {...pop(on, 0.5, { x: -24 })} className="mt-1.5 block h-2 w-[60%] rounded bg-white/10" />
              <motion.span {...pop(on, 0.6)} className="mt-5 block h-6 w-24 rounded-full bg-accent shadow-[0_0_24px_-4px_rgb(var(--accent)/0.8)]" />
            </div>
            <motion.div
              {...pop(on, 0.4, { x: 24 })}
              className="col-span-2 aspect-[4/5] rounded-xl bg-[radial-gradient(circle_at_30%_25%,rgba(111,224,255,0.55),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(31,162,255,0.45),transparent_60%),linear-gradient(160deg,#0f2530,#081018)]"
            />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <motion.span key={i} {...pop(on, 0.7 + i * 0.08)} className="h-12 rounded-lg border border-white/[0.06] bg-white/[0.03]" />
            ))}
          </div>
        </div>

        {/* Richiesta di preventivo che arriva. */}
        <motion.div
          {...pop(on, 1, { x: 40 })}
          className="absolute -bottom-3 right-2 w-[58%] rounded-2xl border border-white/10 bg-ink-900/95 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] sm:right-4 sm:w-[46%]"
        >
          <p className="text-[12px] font-medium text-paper">Richiedi un preventivo</p>
          <span className="mt-3 block h-6 rounded-md border border-white/[0.08] bg-white/[0.03]" />
          <span className="mt-2 block h-6 rounded-md border border-white/[0.08] bg-white/[0.03]" />
          <span
            className={cn(
              "mt-3 flex h-7 items-center justify-center gap-1.5 rounded-full font-mono text-[10px] transition-colors duration-500",
              sent ? "bg-accent/15 text-accent" : "bg-accent text-accent-ink",
            )}
          >
            {sent ? (
              <>
                <Check size={11} strokeWidth={3} aria-hidden /> richiesta inviata
              </>
            ) : (
              "invia"
            )}
          </span>
        </motion.div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        {["seo tecnica", "mobile e desktop", "caricamento rapido"].map((chip, i) => (
          <motion.span
            key={chip}
            {...pop(on, 1.2 + i * 0.1)}
            className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-ink-300"
          >
            <Check size={10} className="text-accent" aria-hidden />
            {chip}
          </motion.span>
        ))}
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Web app e prodotti digitali                                        */
/* ------------------------------------------------------------------ */

const roles = [
  { name: "Amministratore", initials: "AM", perms: [true, true, true] },
  { name: "Team", initials: "TE", perms: [true, true, false] },
  { name: "Cliente", initials: "CL", perms: [true, false, false] },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-4 w-7 shrink-0 rounded-full transition-colors duration-500",
        on ? "bg-accent" : "bg-white/10",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-3 w-3 rounded-full bg-ink-1000 transition-transform duration-500 ease-out",
          on ? "translate-x-3.5" : "translate-x-0.5 bg-ink-400",
        )}
      />
    </span>
  );
}

export function WebAppMockup() {
  const { ref, on } = useActive();
  const step = useStep(on, 4, 1800);

  return (
    <Frame innerRef={ref} title="area riservata / gestione utenti" status="online">
      <div className="flex gap-4">
        <div className="hidden w-11 shrink-0 flex-col items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] py-3 sm:flex">
          {[LayoutGrid, Users, FileText, Settings].map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                i === 1 ? "bg-accent/15 text-accent" : "text-ink-500",
              )}
            >
              <Icon size={14} aria-hidden />
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-paper">Utenti e permessi</p>
            <span className="rounded-full bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] text-ink-300">+ invita</span>
          </div>

          <div className="mt-4 grid grid-cols-[1fr_repeat(3,3.25rem)] items-center gap-y-1 px-3 font-mono text-[9px] text-ink-500 sm:grid-cols-[1fr_repeat(3,3.75rem)] sm:text-[10px]">
            <span>ruolo</span>
            <span className="text-center">legge</span>
            <span className="text-center">modifica</span>
            <span className="text-center">gestisce</span>
          </div>

          <ul className="mt-2 flex flex-col gap-2">
            {roles.map((role, r) => (
              <motion.li
                key={role.name}
                {...pop(on, 0.2 + r * 0.12, { x: 24 })}
                className="grid grid-cols-[1fr_repeat(3,3.25rem)] items-center rounded-xl border border-white/[0.05] bg-white/[0.025] px-3 py-2.5 sm:grid-cols-[1fr_repeat(3,3.75rem)]"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] font-mono text-[10px] text-ink-200">
                    {role.initials}
                  </span>
                  <span className="truncate text-[12px] text-ink-200">{role.name}</span>
                </span>
                {role.perms.map((p, c) => {
                  // Un interruttore alla volta cambia stato, come se qualcuno
                  // stesse configurando i permessi.
                  const flips = r === 2 && c === 1 && step % 2 === 1;
                  return (
                    <span key={c} className="flex justify-center">
                      <Toggle on={flips ? !p : p} />
                    </span>
                  );
                })}
              </motion.li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {[0.7, 0.45, 0.85].map((h, i) => (
              <motion.div
                key={i}
                {...pop(on, 0.6 + i * 0.1)}
                className="flex h-20 items-end gap-1 rounded-xl border border-white/[0.05] bg-white/[0.02] p-2.5"
              >
                {[0.5, 0.8, 0.6, 1, 0.7].map((v, j) => (
                  <motion.span
                    key={j}
                    className={cn("flex-1 origin-bottom rounded-sm", j === 3 ? "bg-accent" : "bg-white/15")}
                    initial={{ scaleY: 0 }}
                    animate={on ? { scaleY: v * h } : undefined}
                    transition={{ duration: 1, delay: 0.8 + i * 0.1 + j * 0.05, ease: easeOut }}
                    style={{ height: "100%" }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Software su misura                                                 */
/* ------------------------------------------------------------------ */

type Seg = [string, string];

const k = "text-[#c792ea]";
const f = "text-accent";
const v = "text-ink-200";
const p = "text-ink-500";
const s = "text-[#9be7c4]";

const code: Seg[][] = [
  [["const ", k], ["processo", v], [" = ", p], ["analizza", f], ["(", p], ["flussiDiLavoro", v], [")", p]],
  [],
  [["if ", k], ["(", p], ["strumentoStandard", v], [".", p], ["basta", f], ["(", p], ["processo", v], [")) {", p]],
  [["  return ", k], ["strumentoStandard", v]],
  [["}", p]],
  [],
  [["return ", k], ["sviluppaSuMisura", f], ["(", p], ["processo", v], [")", p]],
];

const lineLength = (line: Seg[]) => Math.max(line.reduce((n, [t]) => n + t.length, 0), 1);
/** Carattere da cui parte ogni riga, contando le righe precedenti. */
const lineStarts = code.map((_, i) => code.slice(0, i).reduce((n, line) => n + lineLength(line), 0));
const totalChars = code.reduce((n, line) => n + lineLength(line), 0);

export function SoftwareMockup() {
  const { ref, on } = useActive();
  const reduce = useReducedMotion();
  const [count, setTyped] = useState(0);
  const typed = reduce ? totalChars : count;

  useEffect(() => {
    if (!on || reduce) return;
    const id = window.setInterval(() => {
      // Scrive, resta un attimo fermo a codice completo, poi ricomincia.
      setTyped((t) => (t > totalChars + 60 ? 0 : t + 1));
    }, 38);
    return () => window.clearInterval(id);
  }, [on, reduce]);

  const done = typed >= totalChars;

  return (
    <Frame
      innerRef={ref}
      title={
        <span className="flex items-center gap-2">
          <span className="rounded-md bg-white/[0.06] px-2.5 py-1 text-ink-200">processo.ts</span>
          <span className="px-2 text-ink-600">documentazione.md</span>
        </span>
      }
    >
      <pre className="min-h-[188px] overflow-hidden font-mono text-[11.5px] leading-[1.9] sm:text-[12.5px]">
        {code.map((line, i) => {
          const len = lineLength(line);
          const budget = typed - (lineStarts[i] ?? 0);
          const isCurrent = budget > 0 && budget <= len;
          let left = Math.max(0, Math.min(budget, len));
          return (
            <div key={i} className="min-h-[1.9em] whitespace-pre">
              {line.map(([text, cls], j) => {
                const part = text.slice(0, Math.max(0, left));
                left -= text.length;
                return part ? (
                  <span key={j} className={cls}>
                    {part}
                  </span>
                ) : null;
              })}
              {isCurrent && !done ? <span className="animate-caret ml-px inline-block h-[1.1em] w-[7px] translate-y-[3px] bg-accent" /> : null}
            </div>
          );
        })}
      </pre>

      <div className="mt-4 flex flex-col gap-2 rounded-xl border border-white/[0.05] bg-black/30 p-3.5 font-mono text-[10.5px]">
        {[
          "analisi dei flussi di lavoro esistenti",
          "sviluppo su misura, senza vincoli di template",
          "documentazione e passaggio di consegne",
        ].map((line, i) => (
          <span
            key={line}
            className={cn(
              "flex items-center gap-2 transition-all duration-500",
              done ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
            )}
            style={{ transitionDelay: done ? `${i * 160}ms` : "0ms" }}
          >
            <Check size={11} className="text-accent" aria-hidden />
            <span className="text-ink-300">{line}</span>
          </span>
        ))}
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Automazioni e integrazioni                                         */
/* ------------------------------------------------------------------ */

const tools = [
  { short: "EM", label: "email", x: 70, y: 70 },
  { short: "FG", label: "fogli", x: 52, y: 160 },
  { short: "GE", label: "gestionale", x: 70, y: 250 },
  { short: "CR", label: "crm", x: 450, y: 70 },
  { short: "NO", label: "notifiche", x: 468, y: 160 },
  { short: "RE", label: "report", x: 450, y: 250 },
];

export function AutomationMockup() {
  const { ref, on } = useActive();
  const reduce = useReducedMotion();
  const step = useStep(on, tools.length, 1100);
  const hub = { x: 260, y: 160 };

  return (
    <Frame innerRef={ref} title="strumenti già in uso, collegati tra loro" status="automatico">
      <div className="relative">
        <svg viewBox="0 0 520 320" className="h-auto w-full" aria-hidden>
          <defs>
            <radialGradient id="auto-pulse">
              <stop offset="0%" style={{ stopColor: "rgb(var(--accent))", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "rgb(var(--accent))", stopOpacity: 0 }} />
            </radialGradient>
          </defs>
          {tools.map((t, i) => {
            const d = `M ${t.x} ${t.y} C ${(t.x + hub.x) / 2} ${t.y} ${(t.x + hub.x) / 2} ${hub.y} ${hub.x} ${hub.y}`;
            const lit = step === i;
            return (
              <g key={t.label}>
                <motion.path
                  d={d}
                  fill="none"
                  strokeWidth="1.2"
                  initial={{ pathLength: reduce ? 1 : 0 }}
                  animate={on ? { pathLength: 1 } : undefined}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: easeOut }}
                  style={{
                    stroke: lit ? "rgb(var(--accent) / 0.7)" : "rgba(255,255,255,0.12)",
                    transition: "stroke .4s",
                  }}
                />
                {reduce || !on ? null : (
                  <circle r="8" fill="url(#auto-pulse)">
                    <animateMotion
                      dur="1.8s"
                      begin={`${i * 0.3}s`}
                      repeatCount="indefinite"
                      path={d}
                      keyPoints={i < 3 ? "0;1" : "1;0"}
                      keyTimes="0;1"
                      calcMode="linear"
                    />
                  </circle>
                )}
                <circle
                  cx={t.x}
                  cy={t.y}
                  r="22"
                  style={{
                    fill: lit ? "#0f1b21" : "#0d0f12",
                    stroke: lit ? "rgb(var(--accent) / 0.8)" : "rgba(255,255,255,0.1)",
                    transition: "fill .4s, stroke .4s",
                  }}
                />
                <text x={t.x} y={t.y + 3.5} textAnchor="middle" fontSize="10" className="font-mono" style={{ fill: lit ? "rgb(var(--accent))" : "#B3B9C1" }}>
                  {t.short}
                </text>
                <text x={t.x} y={t.y + 40} textAnchor="middle" fontSize="10" className="font-mono" fill="#5A616B">
                  {t.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Il nodo centrale: il marchio CMA che smista il lavoro. Il
            contenitore lo centra esattamente dove convergono le linee; la
            scala animata sta su un elemento interno, così non sposta il centro. */}
        <div
          className="absolute left-1/2 top-1/2 h-[22%] -translate-x-1/2 -translate-y-1/2"
          style={{ aspectRatio: "1" }}
        >
          <motion.span
            initial={{ scale: reduce ? 1 : 0.6, opacity: 0 }}
            animate={on ? { scale: 1, opacity: 1 } : undefined}
            transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.3 }}
            className="flex h-full w-full items-center justify-center rounded-[22%] bg-accent text-accent-ink shadow-[0_0_60px_-10px_rgb(var(--accent)/0.9)]"
          >
            <LogoMark mono animated className="h-[62%] w-[62%]" />
          </motion.span>
        </div>
      </div>

      <p className="mt-3 flex items-center justify-between font-mono text-[10.5px] text-ink-500">
        <span>attività ripetitive</span>
        <span className="text-ink-300">eseguite in automatico</span>
      </p>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Bot e software per investimenti                                    */
/* ------------------------------------------------------------------ */

const modes = ["backtest", "test", "live"];

const logLines = [
  "connessione al broker",
  "regole della strategia caricate",
  "limiti di rischio attivi",
  "operazione registrata nel log",
];

export function TradingMockup() {
  const { ref, on } = useActive();
  const step = useStep(on, 6, 1500);
  const mode = Math.min(Math.floor(step / 2), 2);

  return (
    <Frame innerRef={ref} title="strategia definita dal cliente" status="monitoraggio">
      <div className="flex rounded-full border border-white/[0.07] bg-white/[0.02] p-1 font-mono text-[11px]">
        {modes.map((m, i) => (
          <span key={m} className="relative flex-1 py-1.5 text-center">
            {mode === i ? (
              <motion.span
                layoutId="trade-mode"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            ) : null}
            <span className={cn("relative transition-colors duration-300", mode === i ? "text-accent-ink" : "text-ink-400")}>
              {m}
            </span>
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {["segnale di ingresso", "segnale di uscita"].map((rule, i) => (
          <motion.div key={rule} {...pop(on, 0.2 + i * 0.1)} className="panel-inner px-4 py-3">
            <p className="font-mono text-[10px] text-ink-500">regola</p>
            <p className="mt-1 text-[12.5px] text-ink-100">{rule}</p>
            <p className="mt-2 inline-flex rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-ink-300">
              definito dal cliente
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div {...pop(on, 0.4)} className="panel-inner mt-3 px-4 py-3.5">
        <div className="flex items-center justify-between font-mono text-[10px]">
          <span className="text-ink-500">limite di rischio</span>
          <span className="flex items-center gap-1.5 text-ink-300">
            <ShieldCheck size={11} className="text-accent" aria-hidden />
            attivo
          </span>
        </div>
        <div className="relative mt-3 h-1.5 rounded-full bg-white/[0.07]">
          <motion.span
            className="absolute inset-y-0 left-0 w-[38%] origin-left rounded-full bg-accent"
            initial={{ scaleX: 0 }}
            animate={on ? { scaleX: 1 } : undefined}
            transition={{ duration: 1.2, delay: 0.6, ease: easeOut }}
          />
          <motion.span
            className="absolute top-1/2 h-3.5 w-3.5 rounded-full border-2 border-accent bg-ink-1000"
            style={{ y: "-50%" }}
            initial={{ left: "0%" }}
            animate={on ? { left: "36%" } : undefined}
            transition={{ duration: 1.2, delay: 0.6, ease: easeOut }}
          />
        </div>
      </motion.div>

      <ul className="mt-4 flex flex-col gap-1.5 font-mono text-[10.5px]">
        {logLines.map((line, i) => (
          <li
            key={line}
            className={cn(
              "flex items-center gap-2 transition-all duration-500",
              step >= i || !on ? "opacity-100" : "opacity-25",
            )}
          >
            <span className={cn("h-1 w-1 rounded-full", step >= i ? "bg-accent" : "bg-ink-600")} />
            <span className="text-ink-300">{line}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-[#ff6b81]/25 bg-[#ff6b81]/[0.06] px-4 py-3">
        <span className="font-mono text-[10.5px] text-[#ffb3be]">arresto di emergenza</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6b81]/15 text-[#ff8a9b]">
          <Power size={14} aria-hidden />
        </span>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Manutenzione ed evoluzione                                         */
/* ------------------------------------------------------------------ */

const checks = [
  "aggiornamenti di sicurezza",
  "dipendenze aggiornate",
  "correzioni e miglioramenti",
  "prestazioni monitorate",
];

export function MaintenanceMockup() {
  const { ref, on } = useActive();
  const reduce = useReducedMotion();
  const calm = useReducedMotionAfterMount();

  return (
    <Frame innerRef={ref} title="il tuo progetto, seguito nel tempo" status="attivo">
      <div className="panel-inner relative overflow-hidden px-4 pb-3 pt-4">
        <div className="flex items-center justify-between font-mono text-[10px] text-ink-500">
          <span className="flex items-center gap-1.5">
            <Activity size={11} className="text-accent" aria-hidden /> monitoraggio
          </span>
          <span>sempre attivo</span>
        </div>
        <svg viewBox="0 0 400 90" className="mt-2 h-auto w-full" aria-hidden>
          <path
            d="M0 55 H90 L105 55 L115 25 L128 80 L140 45 L150 55 H250 L265 55 L275 20 L288 82 L300 42 L310 55 H400"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2"
          />
          <path
            d="M0 55 H90 L105 55 L115 25 L128 80 L140 45 L150 55 H250 L265 55 L275 20 L288 82 L300 42 L310 55 H400"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="0.22 0.78"
            style={{ stroke: "rgb(var(--accent))", filter: "drop-shadow(0 0 6px rgb(var(--accent) / 0.8))" }}
          >
            {calm ? null : <animate attributeName="stroke-dashoffset" from="1" to="0" dur="2.8s" repeatCount="indefinite" />}
          </path>
        </svg>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {checks.map((c, i) => (
          <motion.li key={c} {...pop(on, 0.3 + i * 0.15, { x: -20 })} className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5">
            <span className="text-[12.5px] text-ink-200">{c}</span>
            <motion.span
              initial={{ scale: reduce ? 1 : 0 }}
              animate={on ? { scale: 1 } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.6 + i * 0.15 }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent"
            >
              <Check size={11} strokeWidth={3} aria-hidden />
            </motion.span>
          </motion.li>
        ))}
      </ul>
    </Frame>
  );
}

const mockups: Record<string, () => JSX.Element> = {
  "siti-web": SiteMockup,
  "web-app": WebAppMockup,
  software: SoftwareMockup,
  automazioni: AutomationMockup,
  "trading-bot": TradingMockup,
  manutenzione: MaintenanceMockup,
};

/** Interfaccia illustrativa del servizio con l'id indicato. */
export function ServiceMockup({ id }: { id: string }) {
  const Mockup = mockups[id];
  return Mockup ? <Mockup /> : null;
}

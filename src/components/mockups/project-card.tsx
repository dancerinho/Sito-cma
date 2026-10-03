"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, MousePointer2, Plus, Redo2 } from "lucide-react";
import { methodSteps } from "@/config/site";
import { easeOut, useReducedMotionAfterMount } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

/**
 * Interfaccia illustrativa dell'hero: il percorso di un progetto come
 * grafo di nodi, con le quattro fasi reali del metodo che avanzano.
 */

type Node = { x: number; y: number; w: number; h: number; title: string; sub: string };

const W = 640;
const H = 290;

const idea: Node = { x: 24, y: 117, w: 146, h: 56, title: "La tua idea", sub: "obiettivi e vincoli" };
const design: Node = { x: 262, y: 30, w: 168, h: 56, title: "Design su misura", sub: "nessun template" };
const build: Node = { x: 262, y: 204, w: 168, h: 56, title: "Sviluppo", sub: "codice scalabile" };
const online: Node = { x: 480, y: 117, w: 136, h: 56, title: "Online", sub: "e poi evoluzione" };

/** Nodi nell'ordine in cui si accendono, uno per fase del metodo. */
const nodes = [idea, design, build, online];

const J = { x: 212, y: 145 };

const edges = [
  `M ${idea.x + idea.w} 145 L ${J.x - 12} 145`,
  `M ${J.x + 12} 145 C 240 145 230 58 ${design.x} 58`,
  `M ${J.x + 12} 145 C 240 145 230 232 ${build.x} 232`,
  `M ${design.x + design.w} 58 C 460 58 450 145 ${online.x} 145`,
  `M ${build.x + build.w} 232 C 460 232 450 145 ${online.x} 145`,
];

export function ProjectCard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const calm = useReducedMotionAfterMount();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % nodes.length), 2600);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const node = nodes[active] ?? idea;
  const cursor = { x: node.x + node.w * 0.72, y: node.y + node.h * 0.7 };

  return (
    <div ref={ref} className={cn("panel overflow-hidden", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 text-[13px]">
          <span className="truncate text-ink-300">Il tuo progetto</span>
          <span className="hidden h-3 w-px bg-white/10 sm:block" />
          <span className="hidden truncate font-mono text-[11px] text-ink-500 sm:inline">4 fasi / un unico team</span>
        </div>
        <span className="flex shrink-0 items-center gap-2 whitespace-nowrap font-mono text-[11px] text-accent">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-accent" />
          in corso
        </span>
      </div>

      <div className="relative flex">
        <div className="hidden flex-col gap-2 p-4 sm:flex">
          {[MousePointer2, Plus, Redo2].map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-ink-400",
                i === 0 && "bg-white/[0.06] text-paper",
              )}
            >
              <Icon size={14} aria-hidden />
            </span>
          ))}
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Percorso di un progetto: dall'idea al sito online">
          <defs>
            <radialGradient id="pulse-glow">
              <stop offset="0%" style={{ stopColor: "rgb(var(--accent))", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "rgb(var(--accent))", stopOpacity: 0 }} />
            </radialGradient>
          </defs>

          {edges.map((d, i) => (
            <g key={d}>
              <motion.path
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1.2"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.9 + i * 0.15, ease: easeOut }}
              />
              {calm ? null : (
                <circle r="9" fill="url(#pulse-glow)" opacity="0.9">
                  <animateMotion dur="2.6s" begin={`${1.6 + i * 0.4}s`} repeatCount="indefinite" path={d} />
                </circle>
              )}
            </g>
          ))}

          <circle cx={J.x} cy={J.y} r="12" fill="#0b0d10" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />

          <g className="font-mono" fontSize="10">
            <rect x="222" y="86" width="26" height="16" rx="4" fill="#111418" stroke="rgba(255,255,255,0.08)" />
            <text x="235" y="97.5" textAnchor="middle" fill="#8B929C">ux</text>
            <rect x="221" y="188" width="28" height="16" rx="4" fill="#111418" stroke="rgba(255,255,255,0.08)" />
            <text x="235" y="199.5" textAnchor="middle" fill="#8B929C">dev</text>
          </g>

          {nodes.map((n, i) => {
            const on = active === i;
            return (
              <motion.g
                key={n.title}
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 + i * 0.12, ease: easeOut }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx="10"
                  style={{
                    fill: on ? "#0f1b21" : "#0d0f12",
                    stroke: on ? "rgb(var(--accent) / 0.75)" : "rgba(255,255,255,0.08)",
                    transition: "fill .5s, stroke .5s",
                  }}
                />
                <circle cx={n.x} cy={n.y + n.h / 2} r="2.5" style={{ fill: on ? "rgb(var(--accent))" : "#5A616B" }} />
                <circle cx={n.x + n.w} cy={n.y + n.h / 2} r="2.5" style={{ fill: on ? "rgb(var(--accent))" : "#5A616B" }} />
                <text x={n.x + 16} y={n.y + 24} fontSize="13.5" fill="#F3F4F2" className="font-sans" fontWeight="500">
                  {n.title}
                </text>
                <text x={n.x + 16} y={n.y + 41} fontSize="10" fill="#5A616B" className="font-mono">
                  {n.sub}
                </text>
              </motion.g>
            );
          })}

          {/* Cursore che passa da un nodo all'altro. */}
          <motion.g
            initial={false}
            animate={{ x: cursor.x, y: cursor.y }}
            transition={{ duration: reduce ? 0 : 1.1, ease: [0.65, 0, 0.35, 1] }}
          >
            <path
              d="M0 0 L0 15 L4 11 L7 18 L9.5 17 L6.5 10 L12 10 Z"
              fill="#F3F4F2"
              stroke="#07080A"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </motion.g>
        </svg>
      </div>

      <div className="hidden border-t border-white/[0.06] px-5 py-4 sm:block sm:px-6">
        <p className="mono-label">fasi del progetto</p>
        <ul className="mt-3 flex flex-col gap-2.5">
          {methodSteps.map((step, i) => {
            const state = i < active ? "done" : i === active ? "now" : "next";
            return (
              <li key={step.title} className="flex items-center gap-3 font-mono text-[11px]">
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                    state === "done" && "bg-accent/15 text-accent",
                    state === "now" && "bg-accent text-accent-ink",
                    state === "next" && "border border-white/10",
                  )}
                >
                  {state === "done" ? <Check size={10} strokeWidth={3} aria-hidden /> : null}
                  {state === "now" ? <span className="h-1.5 w-1.5 rounded-full bg-accent-ink" /> : null}
                </span>
                <span className={cn("min-w-0 flex-1 truncate lowercase", state === "next" ? "text-ink-500" : "text-ink-200")}>
                  {step.title}
                </span>
                <span className="relative hidden h-1 w-24 overflow-hidden rounded-full bg-white/[0.06] sm:block">
                  {state !== "next" ? (
                    <motion.span
                      key={`${i}-${state}`}
                      className="absolute inset-0 origin-left rounded-full bg-accent"
                      initial={{ scaleX: state === "now" ? 0 : 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: state === "now" ? 2.4 : 0, ease: "linear" }}
                      style={{ opacity: state === "done" ? 0.45 : 1 }}
                    />
                  ) : null}
                </span>
                <span
                  className={cn(
                    "w-16 text-right",
                    state === "now" ? "text-accent" : state === "done" ? "text-ink-400" : "text-ink-600",
                  )}
                >
                  {state === "done" ? "fatto" : state === "now" ? "in corso" : "in attesa"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

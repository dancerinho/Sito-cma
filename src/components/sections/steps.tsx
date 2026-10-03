"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Reveal, SlideHeading, easeOut } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { methodSteps } from "@/config/site";
import { cn } from "@/lib/utils";

const SEGMENTS = 12;

/** Barra a segmenti: ogni fase ne riempie una parte in più. */
function Meter({ filled, delay }: { filled: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="flex h-12 items-end gap-1" aria-hidden>
      {Array.from({ length: SEGMENTS }, (_, i) => {
        const lit = i < filled;
        return (
          <motion.span
            key={i}
            initial={{ opacity: reduce ? 1 : 0.15, scaleY: reduce ? 1 : 0.4 }}
            animate={on ? { opacity: 1, scaleY: 1 } : undefined}
            transition={{ duration: 0.6, delay: delay + i * 0.05, ease: easeOut }}
            className={cn(
              "h-full flex-1 origin-bottom rounded-[3px]",
              lit ? "bg-gradient-to-b from-accent to-accent/60 shadow-[0_0_14px_-2px_rgb(var(--accent)/0.7)]" : "bg-white/[0.06]",
            )}
          />
        );
      })}
    </div>
  );
}

/** Le fasi di lavoro, affiancate, con una linea che si riempie scorrendo. */
export function Steps({ action }: { action?: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section data-path="0.12" data-path-i="0.8" className="py-16 sm:py-28 lg:py-36">
      <Container>
        <SectionHeader
          tag="metodo"
          title="Come *lavoriamo*."
          description="Un percorso semplice, con aggiornamenti costanti e nessuna sorpresa."
          action={action}
        />

        <div className="relative mt-10 sm:mt-16 lg:mt-24">
          {/* Da tablet in su: linea orizzontale che si riempie scorrendo. */}
          <div className="absolute inset-x-0 top-0 hidden h-px bg-white/[0.08] sm:block" />
          <motion.div
            style={{ scaleX: reduce ? 1 : progress }}
            className="absolute inset-x-0 top-0 hidden h-px origin-left bg-accent shadow-[0_0_12px_rgb(var(--accent))] sm:block"
          />
          {/* Su telefono: timeline verticale, la linea si riempie dall'alto. */}
          <div className="absolute bottom-3 left-[5px] top-2 w-px bg-white/[0.08] sm:hidden" />
          <motion.div
            style={{ scaleY: reduce ? 1 : progress }}
            className="absolute bottom-3 left-[5px] top-2 w-px origin-top bg-accent shadow-[0_0_10px_rgb(var(--accent))] sm:hidden"
          />

          <ol ref={ref} className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 sm:gap-y-14 sm:pt-10 lg:grid-cols-4">
            {methodSteps.map((step, i) => (
              <li key={step.title} className="relative pl-8 sm:pl-0">
                <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-accent bg-ink-1000 shadow-[0_0_10px_rgb(var(--accent)/0.8)] sm:hidden" />
                <div className="hidden sm:block">
                  <Meter filled={Math.round(((i + 1) / methodSteps.length) * SEGMENTS)} delay={i * 0.12} />
                </div>
                <SlideHeading
                  as="h3"
                  text={step.title}
                  from={i % 2 === 0 ? "left" : "right"}
                  delay={0.1 + i * 0.08}
                  className="text-xl font-medium tracking-tight text-paper sm:mt-8 sm:text-2xl"
                />
                <Reveal from={i % 2 === 0 ? "left" : "right"} delay={0.2 + i * 0.08} as="p" className="mt-2 text-sm leading-relaxed text-ink-400 sm:mt-3">
                  {step.description}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

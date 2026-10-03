"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { LogoMark } from "@/components/brand/logo-mark";

/**
 * Blocco a tutta larghezza nel colore d'accento: entrando si allarga fino
 * ai bordi dello schermo, e la parola in corsivo scivola al suo posto.
 */
export function Statement() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [56, 28]);
  const italicX = useTransform(scrollYProgress, [0.25, 1], ["-40%", "0%"]);
  const italicOpacity = useTransform(scrollYProgress, [0.25, 0.8], [0, 1]);
  const restX = useTransform(scrollYProgress, [0.25, 1], ["18%", "0%"]);
  const tileY = useTransform(scrollYProgress, [0.4, 1], [40, 0]);

  return (
    <section ref={ref} data-path="0.55" data-path-w="0.35" data-path-i="0.6" className="px-3 py-10 sm:px-4 sm:py-24 lg:py-32">
      <motion.div
        style={reduce ? { borderRadius: 28 } : { scale, borderRadius: radius }}
        className="dot-grid relative mx-auto flex max-w-[1600px] flex-col items-center justify-center overflow-hidden bg-accent px-5 py-14 text-center text-accent-ink sm:min-h-[70svh] sm:py-24 lg:min-h-[78svh]"
      >
        <p className="font-mono text-[11px] lowercase tracking-wide text-accent-ink/60">[ il nostro approccio ]</p>

        <h2 className="mt-6 max-w-4xl sm:mt-8 text-balance text-[clamp(2.25rem,5.6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.045em]">
          <span className="block">Ogni progetto parte</span>
          <span className="block">
            <motion.span
              style={reduce ? undefined : { x: italicX, opacity: italicOpacity }}
              className="inline-block pr-[0.12em] font-serif text-[1.1em] font-normal italic tracking-[-0.01em] text-accent-ink/55"
            >
              da zero,
            </motion.span>
            <motion.span style={reduce ? undefined : { x: restX }} className="inline-block">
              senza template.
            </motion.span>
          </span>
        </h2>

        <motion.div
          style={reduce ? undefined : { y: tileY }}
          className="mt-8 flex h-16 w-16 items-center justify-center rounded-[20px] sm:mt-12 sm:h-20 sm:w-20 sm:rounded-[22px] bg-accent-ink text-accent shadow-[0_30px_60px_-20px_rgba(3,18,26,0.6)]"
        >
          <LogoMark mono animated className="h-9 w-9 sm:h-11 sm:w-11" />
        </motion.div>

        <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-accent-ink/70 sm:mt-10 sm:text-[15px]">
          Partiamo dagli obiettivi reali del progetto: contesto, utenti, vincoli tecnici e di tempo.
        </p>
      </motion.div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { AnimatedHeading, Magnetic } from "@/components/ui/motion-primitives";
import { siteConfig } from "@/config/site";

const easePremium = [0.16, 1, 0.3, 1] as const;

const focusAreas = ["Web", "Web app", "Software", "Automazioni", "Bot"];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-[calc(32svh+6rem)] lg:pt-32"
    >
      {/* Cinematica del marchio come luce ambientale: nessuna cornice, il
          nero del video sparisce in fusione "screen" e i bordi sfumano nel
          gradiente oceano. Su telefono è una fascia larga sopra al testo
          (niente riquadro quadrato), da desktop occupa la metà destra. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: easePremium }}
        style={shouldReduceMotion ? undefined : { y: mediaY }}
        className="pointer-events-none absolute inset-x-[-14%] top-12 -z-10 h-[34svh] mix-blend-screen sm:inset-x-[-6%] lg:inset-x-auto lg:inset-y-0 lg:left-[44%] lg:right-[-8%] lg:top-0 lg:h-auto"
      >
        <div className="relative h-full w-full transform-gpu bg-black [will-change:transform] [mask-image:radial-gradient(closest-side,rgba(0,0,0,1)_40%,rgba(0,0,0,0.5)_66%,rgba(0,0,0,0)_85%)] [-webkit-mask-image:radial-gradient(closest-side,rgba(0,0,0,1)_40%,rgba(0,0,0,0.5)_66%,rgba(0,0,0,0)_85%)]">
          <video
            className="h-full w-full scale-150 object-contain opacity-90 lg:scale-125 lg:opacity-95"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/cinematic-poster.jpg"
          >
            <source src="/media/cinematic.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>

      {/* Su telefono la fascia video sfuma nel fondo prima del titolo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[calc(32svh+2rem)] -z-10 h-32 bg-[linear-gradient(180deg,rgba(2,8,15,0)_0%,rgba(2,8,15,0.85)_70%,rgba(2,8,15,1)_100%)] lg:hidden"
      />

      <Container>
        <motion.div
          style={shouldReduceMotion ? undefined : { y: textY, opacity: textOpacity }}
          className="max-w-2xl lg:max-w-[52%]"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easePremium }}
            className="border-ocean mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-aqua" aria-hidden />
            {siteConfig.name} — Digital Studio
          </motion.span>

          <AnimatedHeading
            text="Trasformiamo idee in prodotti digitali che funzionano."
            className="text-balance text-display-xl font-display font-medium text-paper"
            delay={0.15}
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: easePremium }}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-300"
          >
            Siti web, applicazioni e software su misura. Strategia,
            design e tecnologia in un unico percorso.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: easePremium }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <Link
                href="/contatti"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-glow transition-colors duration-300 ease-premium hover:bg-accent-dim"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/25 opacity-0 transition-opacity duration-300 group-hover:animate-shimmer group-hover:opacity-100"
                />
                <span className="relative">Parliamo del tuo progetto</span>
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="relative transition-transform duration-300 ease-premium group-hover:translate-x-1"
                />
              </Link>
            </Magnetic>
            <Magnetic strength={0.18}>
              <Link
                href="/servizi"
                className="border-ocean inline-flex items-center gap-2 rounded px-7 py-3.5 text-sm font-medium text-paper transition-colors duration-300 ease-premium hover:bg-ink-800/60"
              >
                Esplora i servizi
              </Link>
            </Magnetic>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {focusAreas.map((area, index) => (
              <motion.li
                key={area}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.95 + index * 0.07, ease: easePremium }}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-ink-400"
              >
                <span
                  aria-hidden
                  className="h-px w-5 bg-gradient-to-r from-accent to-transparent"
                />
                {area}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>

      <motion.a
        href="#panoramica"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink-400 transition-colors hover:text-paper lg:flex"
      >
        Scorri
        <ArrowDown size={14} aria-hidden className="animate-float" />
      </motion.a>
    </section>
  );
}

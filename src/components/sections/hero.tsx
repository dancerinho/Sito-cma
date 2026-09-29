"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SplitHeading, easeOut } from "@/components/ui/motion";
import { services } from "@/config/site";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-ink-800 pt-24 sm:pt-28"
    >
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-20" />

      {/* Cinematica del marchio: il nero del video sparisce in fusione
          "screen" sul fondo grafite, i bordi sfumano con una maschera. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: easeOut }}
        style={reduce ? undefined : { y: mediaY, opacity: mediaOpacity }}
        className="pointer-events-none absolute -right-[20%] top-16 -z-10 h-[52svh] w-[140%] mix-blend-screen sm:-right-[10%] sm:w-[120%] lg:-right-[4%] lg:top-6 lg:h-[72%] lg:w-[54%]"
      >
        <div className="h-full w-full [mask-image:radial-gradient(closest-side,#000_45%,transparent_92%)]">
          <video
            className="h-full w-full scale-[1.35] object-contain opacity-80"
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

      <Container className="flex flex-1 flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="label flex items-center justify-between"
        >
          <span className="flex items-center gap-3">
            <span className="text-accent">00</span>
            <span className="h-px w-8 bg-ink-700" aria-hidden />
            Digital Studio
          </span>
          <span className="hidden sm:inline">Strategia · Design · Sviluppo</span>
        </motion.div>

        <div className="flex flex-1 flex-col justify-end pb-10 pt-[34svh] sm:pb-14 lg:pt-16">
          <SplitHeading
            text="Prodotti digitali *costruiti* per funzionare davvero."
            immediate
            delay={0.2}
            className="max-w-[14ch] font-serif text-display-2xl text-paper"
          />

          <div className="mt-12 grid grid-cols-1 gap-10 border-t border-ink-800 pt-8 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: easeOut }}
              className="md:col-span-5"
            >
              <p className="max-w-md text-pretty text-lg leading-relaxed text-ink-300">
                Siti web, web app, software su misura e automazioni. Un solo
                team dalla strategia al codice in produzione.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contatti" className="btn-primary group">
                  Parliamo del tuo progetto
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
                <Link href="/servizi" className="btn-ghost">
                  Vedi i servizi
                </Link>
              </div>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.95 }}
              className="hidden md:col-span-4 md:col-start-9 md:block"
              aria-label="Aree di lavoro"
            >
              {services.map((service, i) => (
                <li key={service.id} className="border-b border-ink-800 last:border-b-0">
                  <Link
                    href={`/servizi#${service.id}`}
                    className="group flex items-baseline gap-4 py-2 text-sm text-ink-300 transition-colors hover:text-paper"
                  >
                    <span className="font-mono text-[10px] text-ink-500 group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {service.title}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </Container>

    </section>
  );
}

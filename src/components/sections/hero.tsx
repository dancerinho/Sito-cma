"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SlideHeading, easeOut } from "@/components/ui/motion";
import { ProjectCard } from "@/components/mockups/project-card";

export function Hero() {
  const reduce = useReducedMotion();

  const enter = (delay: number, x = 0) => ({
    initial: { opacity: 0, x: reduce ? 0 : x, y: reduce || x ? 0 : 16, filter: reduce ? "none" : "blur(8px)" },
    animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
    transition: { duration: 1, delay, ease: easeOut },
  });

  return (
    <section data-path="hero" className="relative flex items-center pb-12 pt-28 sm:pb-20 sm:pt-32 lg:min-h-[100svh] lg:pb-16 lg:pt-28">
      {/* Griglia di puntini appena accennata, come carta millimetrata. */}
      <div
        aria-hidden
        className="dot-grid-light pointer-events-none absolute inset-0 -z-[1] [mask-image:radial-gradient(70%_60%_at_30%_30%,#000,transparent)]"
      />
      <Container className="grid grid-cols-1 items-center gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.span {...enter(0.15, -32)} className="tag">
            siti web / web app / software / automazioni
          </motion.span>

          <SlideHeading
            as="h1"
            text="Siti web e software | *su misura.*"
            immediate
            delay={0.25}
            className="mt-7 text-[clamp(2.75rem,5.4vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.045em] text-paper"
          />

          <motion.p {...enter(0.7, -40)} className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ink-300 sm:mt-7 sm:text-[17px]">
            Progettiamo e sviluppiamo siti, web app, software e automazioni per la tua azienda: un unico team,
            dall&apos;idea alla messa online.
          </motion.p>

          <motion.div {...enter(0.9)} className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <Link href="/contatti/" className="btn-primary group">
              Richiedi un preventivo
              <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/servizi/" className="btn-ghost">
              Scopri i servizi
            </Link>
          </motion.div>

          <motion.p {...enter(1.1)} className="mt-6 font-mono text-[11px] text-ink-500">
            prima valutazione senza impegno / email, telefono o whatsapp
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : 120, filter: reduce ? "none" : "blur(12px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.45, ease: easeOut }}
          className="lg:col-span-6 lg:-mr-12 xl:-mr-24"
        >
          <ProjectCard />
        </motion.div>
      </Container>
    </section>
  );
}

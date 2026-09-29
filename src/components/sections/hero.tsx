"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SlideHeading, easeOut } from "@/components/ui/motion";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36 lg:flex lg:min-h-[88svh] lg:items-center lg:pt-24">
      {/* Cinematica del marchio: il nero del video sparisce in fusione
          "screen" sul fondo scuro, i bordi sfumano con una maschera. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: reduce ? 0 : 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6, ease: easeOut }}
        className="pointer-events-none absolute -right-[25%] top-14 -z-10 h-[40svh] w-[150%] mix-blend-screen sm:-right-[10%] sm:w-[120%] lg:-right-[4%] lg:top-[12%] lg:h-[76%] lg:w-[52%]"
      >
        <div className="h-full w-full [mask-image:radial-gradient(closest-side,#000_45%,transparent_92%)]">
          <video
            className="h-full w-full scale-[1.3] object-contain opacity-80"
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

      <Container className="pt-[26svh] lg:pt-0">
        <SlideHeading
          as="h1"
          text="Siti web e software *su misura* per la tua azienda."
          immediate
          delay={0.1}
          className="max-w-[16ch] text-balance font-serif text-display-xl text-paper"
        />

        <motion.p
          initial={{ opacity: 0, x: reduce ? 0 : 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: easeOut }}
          className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-ink-300"
        >
          Progettiamo e sviluppiamo siti, web app, software e automazioni: un
          unico team, dall&apos;idea alla messa online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: easeOut }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link href="/contatti/" className="btn-primary group">
            Richiedi un preventivo
            <ArrowRight
              size={16}
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            />
          </Link>
          <Link href="/servizi/" className="btn-ghost">
            Scopri i servizi
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

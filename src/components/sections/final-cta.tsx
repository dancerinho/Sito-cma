"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { AnimatedHeading, Magnetic } from "@/components/ui/motion-primitives";
import { contactConfig } from "@/config/site";

const easePremium = [0.16, 1, 0.3, 1] as const;

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(55%_65%_at_50%_100%,rgba(31,162,255,0.20)_0%,rgba(2,8,15,0)_72%)]"
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: easePremium }}
          className="border-ocean relative mx-auto max-w-3xl overflow-hidden rounded-xl glass px-8 py-16 text-center sm:px-14"
        >
          <AnimatedHeading
            as="h2"
            text="Hai un progetto in mente? Costruiamolo insieme."
            className="text-balance text-display-md font-display font-medium text-paper"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-ink-300"
          >
            Raccontaci obiettivi e vincoli del progetto: ti rispondiamo con una
            prima valutazione concreta.
          </motion.p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <Link
                href="/contatti"
                className="group inline-flex items-center gap-2 rounded bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-glow transition-colors duration-300 ease-premium hover:bg-accent-dim"
              >
                Richiedi un preventivo
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 ease-premium group-hover:translate-x-1"
                />
              </Link>
            </Magnetic>

            <a
              href={`mailto:${contactConfig.email}`}
              className="inline-flex items-center gap-2 text-sm text-ink-200 transition-colors hover:text-paper"
            >
              <Mail size={16} aria-hidden className="text-accent-light" />
              {contactConfig.email}
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

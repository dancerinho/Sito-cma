"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { AnimatedHeading } from "@/components/ui/motion-primitives";
import { LogoMark } from "@/components/brand/logo-mark";

const easePremium = [0.16, 1, 0.3, 1] as const;

/**
 * Intestazione comune alle pagine interne: eyebrow, titolo animato e
 * marchio in filigrana sullo sfondo.
 */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9, rotate: -12 }}
        animate={{ opacity: 0.14, scale: 1, rotate: 0 }}
        transition={{ duration: 1.6, ease: easePremium }}
        className="pointer-events-none absolute -right-24 -top-10 hidden lg:block"
      >
        <LogoMark className="h-96 w-96 transform-gpu animate-spin-slow [will-change:transform]" />
      </motion.div>

      <Container>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easePremium }}
          className="mb-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent-light"
        >
          <span className="h-1 w-1 rounded-full bg-accent-aqua" aria-hidden />
          {eyebrow}
        </motion.span>

        <AnimatedHeading
          text={title}
          className="max-w-3xl text-balance text-display-lg font-display font-medium text-paper"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: easePremium }}
          className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-300"
        >
          {description}
        </motion.p>
      </Container>
    </section>
  );
}

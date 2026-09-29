"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SlideHeading, easeOut } from "@/components/ui/motion";

/**
 * Intestazione delle pagine interne: titolo che entra da sinistra e
 * descrizione che arriva da destra. Nel titolo, `*parola*` va in corsivo.
 */
export function PageHero({ title, description }: { title: string; description: string }) {
  const reduce = useReducedMotion();

  return (
    <section className="pb-12 pt-32 sm:pb-16 sm:pt-40">
      <Container>
        <SlideHeading
          as="h1"
          text={title}
          immediate
          className="max-w-4xl text-balance font-serif text-display-xl text-paper"
        />
        <motion.p
          initial={{ opacity: 0, x: reduce ? 0 : 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: easeOut }}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-300"
        >
          {description}
        </motion.p>
      </Container>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SlideHeading, easeOut } from "@/components/ui/motion";

/**
 * Intestazione delle pagine interne: etichetta, titolo che entra parola per
 * parola e descrizione da destra. Nel titolo, `*parole*` vanno in corsivo.
 */
export function PageHero({ tag, title, description }: { tag?: string; title: string; description: string }) {
  const reduce = useReducedMotion();

  return (
    <section data-path="page" className="flex items-end pb-10 pt-28 sm:min-h-[60svh] sm:pb-20 sm:pt-40 lg:min-h-[72svh] lg:pb-28 lg:pt-44">
      <Container>
        {tag ? (
          <motion.span
            initial={{ opacity: 0, x: reduce ? 0 : -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: easeOut }}
            className="tag"
          >
            {tag}
          </motion.span>
        ) : null}
        <SlideHeading
          as="h1"
          text={title}
          immediate
          delay={0.2}
          className="mt-6 max-w-4xl text-balance text-display-xl font-medium text-paper sm:mt-7"
        />
        <motion.p
          initial={{ opacity: 0, x: reduce ? 0 : 48, filter: reduce ? "none" : "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.55, ease: easeOut }}
          className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-300 sm:mt-7 sm:text-lg"
        >
          {description}
        </motion.p>
      </Container>
    </section>
  );
}

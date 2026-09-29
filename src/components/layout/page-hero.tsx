"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SplitHeading, easeOut } from "@/components/ui/motion";

/**
 * Intestazione delle pagine interne: indice di sezione, titolo serif su
 * tutta la larghezza e descrizione sfalsata sulla colonna di destra.
 * Nel titolo, una parola tra asterischi (`*così*`) va in corsivo.
 */
export function PageHero({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-b border-ink-800 pb-14 pt-32 sm:pb-20 sm:pt-44">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="label flex items-center gap-3"
        >
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-ink-700" aria-hidden />
          {eyebrow}
        </motion.p>

        <SplitHeading
          text={title}
          immediate
          delay={0.1}
          className="mt-8 max-w-5xl text-balance font-serif text-display-xl text-paper"
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: easeOut }}
            className="text-pretty text-lg leading-relaxed text-ink-300 md:col-span-6 md:col-start-7"
          >
            {description}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}

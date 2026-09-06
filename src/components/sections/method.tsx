"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { methodSteps } from "@/config/site";

const easePremium = [0.16, 1, 0.3, 1] as const;

export function Method() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <section id="metodo" className="py-8 sm:py-12">
      <Container>
        <ol ref={listRef} className="relative ml-4 flex flex-col gap-14 sm:ml-8">
          {/* Binario verticale: la parte accesa segue lo scroll. */}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 top-2 w-px bg-ink-800"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: lineScale, opacity: lineOpacity }}
            className="absolute bottom-0 left-0 top-2 w-px origin-top bg-gradient-to-b from-accent-light via-accent to-accent-aqua"
          />

          {methodSteps.map((step, index) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: easePremium }}
              className="relative pl-8 sm:pl-12"
            >
              <span
                aria-hidden
                className="absolute -left-[7px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-ink-950"
              >
                <span className="h-2 w-2 rounded-full bg-accent-light" />
                <span className="absolute inset-0 rounded-full bg-accent/40 animate-pulse-ring" />
              </span>

              <span className="font-mono text-xs tracking-[0.2em] text-accent-light">
                {step.number}
              </span>
              <h2 className="mt-3 font-display text-2xl font-medium text-paper">
                {step.title}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-300">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

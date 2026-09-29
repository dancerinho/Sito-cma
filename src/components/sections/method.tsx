"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { methodSteps } from "@/config/site";

/**
 * Le fasi del metodo in sequenza verticale: numero enorme in filigrana,
 * testo a destra e un binario che si riempie con lo scroll.
 */
export function Method() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="metodo" className="pb-24 sm:pb-32">
      <Container>
        <ol ref={listRef} className="relative">
          <span aria-hidden className="absolute bottom-0 left-0 top-0 hidden w-px bg-ink-800 md:block" />
          <motion.span
            aria-hidden
            style={reduce ? undefined : { scaleY: progress }}
            className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-accent md:block"
          />

          {methodSteps.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-1 gap-6 border-b border-ink-800 py-14 sm:py-20 md:grid-cols-12 md:pl-10"
            >
              <Reveal className="md:col-span-5">
                <span className="block font-serif text-[7rem] leading-[0.8] text-ink-800 sm:text-[10rem]">
                  {step.number}
                </span>
              </Reveal>
              <Reveal delay={0.08} className="md:col-span-6 md:col-start-7 md:self-end">
                <h2 className="font-serif text-4xl leading-tight text-paper sm:text-5xl">
                  {step.title}
                </h2>
                <p className="mt-5 max-w-md text-pretty leading-relaxed text-ink-300">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

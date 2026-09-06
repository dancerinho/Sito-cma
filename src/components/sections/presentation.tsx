"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/motion-primitives";
import { methodSteps, services, skillItems } from "@/config/site";

const easePremium = [0.16, 1, 0.3, 1] as const;

const figures = [
  { value: services.length, suffix: "", label: "aree di servizio" },
  { value: methodSteps.length, suffix: "", label: "fasi di lavoro" },
  { value: skillItems.length, suffix: "", label: "competenze chiave" },
  { value: 100, suffix: "%", label: "progetti su misura" },
];

export function Presentation() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: easePremium }}
          className="max-w-4xl text-balance text-display-md font-display font-medium leading-tight text-ink-100"
        >
          Uniamo progettazione, sviluppo e attenzione ai dettagli per costruire{" "}
          <span className="text-ocean">esperienze digitali chiare</span>, veloci
          e <span className="text-ocean">orientate a obiettivi reali</span>.
        </motion.p>

        <ul className="mt-16 grid grid-cols-2 gap-8 border-t border-ink-800 pt-10 lg:grid-cols-4">
          {figures.map((figure, index) => (
            <motion.li
              key={figure.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: easePremium }}
            >
              <CountUp
                to={figure.value}
                suffix={figure.suffix}
                className="font-display text-4xl font-medium text-ocean sm:text-5xl"
              />
              <p className="mt-2 text-sm text-ink-300">{figure.label}</p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

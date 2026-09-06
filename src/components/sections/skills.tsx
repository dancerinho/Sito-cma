"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SpotlightCard } from "@/components/ui/motion-primitives";
import { skillItems } from "@/config/site";

const easePremium = [0.16, 1, 0.3, 1] as const;

export function Skills() {
  return (
    <section id="competenze" className="py-8 sm:py-12">
      <Container>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillItems.map((skill, index) => (
            <motion.li
              key={skill.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.07, ease: easePremium }}
            >
              <SpotlightCard className="h-full" tilt={4}>
                <div className="flex h-full flex-col gap-3 p-7">
                  <span
                    aria-hidden
                    className="mb-1 h-px w-10 bg-gradient-to-r from-accent-light to-transparent"
                  />
                  <h2 className="font-display text-lg font-medium text-paper">
                    {skill.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-ink-300">
                    {skill.description}
                  </p>
                </div>
              </SpotlightCard>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SpotlightCard } from "@/components/ui/motion-primitives";
import { LogoMark } from "@/components/brand/logo-mark";
import { projectTypes } from "@/config/site";

const easePremium = [0.16, 1, 0.3, 1] as const;

export function Projects() {
  return (
    <section id="progetti" className="py-8 sm:py-12">
      <Container>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectTypes.map((project, index) => (
            <motion.li
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: easePremium }}
            >
              <SpotlightCard className="group h-full">
                <div
                  className="relative flex h-48 items-center justify-center overflow-hidden"
                  aria-hidden
                >
                  <div
                    className="absolute inset-0 opacity-80 [background:linear-gradient(135deg,rgba(31,162,255,0.30),rgba(37,224,200,0.12)_45%,rgba(2,8,15,0)_75%)]"
                    style={{ transform: `rotate(${index * 14}deg) scale(1.5)` }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
                  <LogoMark className="relative h-24 w-24 opacity-40 transition-all duration-700 ease-premium group-hover:rotate-[72deg] group-hover:opacity-70" />
                </div>
                <div className="border-t border-ink-800 p-6">
                  <h2 className="font-display text-base font-medium text-paper">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">
                    {project.description}
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

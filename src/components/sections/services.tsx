"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Code2,
  Globe,
  LayoutGrid,
  LifeBuoy,
  LineChart,
  ShoppingBag,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SpotlightCard } from "@/components/ui/motion-primitives";
import { services, servicesDisclaimer } from "@/config/site";

const easePremium = [0.16, 1, 0.3, 1] as const;

const icons: Record<string, LucideIcon> = {
  Globe,
  ShoppingBag,
  LayoutGrid,
  Code2,
  Workflow,
  LineChart,
  LifeBuoy,
};

export function Services() {
  return (
    <section id="servizi" className="py-8 sm:py-12">
      <Container>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[service.icon] ?? Code2;
            return (
              <motion.li
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: (index % 2) * 0.08, ease: easePremium }}
                className="scroll-mt-28"
              >
                <SpotlightCard className="h-full">
                  <article className="group flex h-full flex-col gap-5 p-8">
                    <div className="flex items-center gap-4">
                      <span className="relative inline-flex h-12 w-12 items-center justify-center rounded border border-ink-700 bg-ink-900/70 text-accent-light">
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded bg-accent/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                        />
                        <Icon size={22} strokeWidth={1.6} aria-hidden className="relative" />
                      </span>
                      <h2 className="font-display text-xl font-medium text-paper">
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-sm leading-relaxed text-ink-300">
                      {service.description}
                    </p>

                    <ul className="mt-auto flex flex-col gap-3 border-t border-ink-800 pt-5">
                      {service.highlights.map((highlight, hIndex) => (
                        <motion.li
                          key={highlight}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.45,
                            delay: 0.1 + hIndex * 0.07,
                            ease: easePremium,
                          }}
                          className="flex items-start gap-3 text-sm text-ink-200"
                        >
                          <Check
                            size={15}
                            aria-hidden
                            className="mt-0.5 shrink-0 text-accent-aqua"
                          />
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>

                    <Link
                      href="/contatti"
                      className="group/link inline-flex items-center gap-2 text-sm font-medium text-accent-light transition-colors hover:text-paper"
                    >
                      Richiedi una valutazione
                      <ArrowRight
                        size={15}
                        aria-hidden
                        className="transition-transform duration-300 ease-premium group-hover/link:translate-x-1"
                      />
                    </Link>
                  </article>
                </SpotlightCard>
              </motion.li>
            );
          })}
        </ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easePremium }}
          className="mt-10 max-w-3xl text-xs leading-relaxed text-ink-400"
        >
          {servicesDisclaimer}
        </motion.p>
      </Container>
    </section>
  );
}

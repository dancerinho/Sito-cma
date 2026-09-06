"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Layers, Sparkles, Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SpotlightCard } from "@/components/ui/motion-primitives";
import { services } from "@/config/site";

const easePremium = [0.16, 1, 0.3, 1] as const;

/**
 * Punto di ingresso della home: invece di srotolare tutte le sezioni in un
 * unico scroll, ognuna diventa una scheda che porta alla sua pagina.
 */
const gateways = [
  {
    href: "/servizi",
    label: "Servizi",
    icon: Layers,
    description: "Sei aree di lavoro, dal sito vetrina al software su misura.",
    meta: `${services.length} servizi`,
  },
  {
    href: "/metodo",
    label: "Metodo",
    icon: Compass,
    description: "Come portiamo un progetto dall'analisi al lancio, in quattro fasi.",
    meta: "4 fasi",
  },
  {
    href: "/competenze",
    label: "Competenze",
    icon: Sparkles,
    description: "Design su misura, prestazioni, codice scalabile, comunicazione chiara.",
    meta: "Cosa portiamo",
  },
  {
    href: "/progetti",
    label: "Progetti",
    icon: Wrench,
    description: "Le tipologie di lavoro che seguiamo, in attesa dei primi case study.",
    meta: "Tipologie",
  },
];

export function Overview() {
  return (
    <section id="panoramica" className="relative py-24 sm:py-32">
      <Container>
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: easePremium }}
            className="max-w-xl"
          >
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent-light">
              <span className="h-1 w-1 rounded-full bg-accent-light" aria-hidden />
              Panoramica
            </span>
            <h2 className="text-balance text-display-md font-display font-medium text-paper">
              Tutto lo studio, <span className="text-ocean">in quattro porte</span>.
            </h2>
            <p className="mt-4 text-balance text-base leading-relaxed text-ink-300">
              Nessuna pagina infinita: scegli da qui o dal menu in alto la
              sezione che ti interessa e vai dritto al contenuto.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: easePremium }}
          >
            <Link
              href="/contatti"
              className="group inline-flex items-center gap-2 text-sm text-ink-200 transition-colors hover:text-paper"
            >
              Hai già un progetto in mente?
              <ArrowUpRight
                size={16}
                aria-hidden
                className="text-accent-light transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gateways.map((gateway, index) => {
            const Icon = gateway.icon;
            return (
              <motion.li
                key={gateway.href}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: easePremium }}
              >
                <SpotlightCard className="h-full">
                  <Link href={gateway.href} className="flex h-full flex-col gap-4 p-6">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded border border-ink-700 bg-ink-900/60 text-accent-light">
                      <Icon size={20} aria-hidden />
                    </span>
                    <span className="font-display text-lg font-medium text-paper">
                      {gateway.label}
                    </span>
                    <span className="flex-1 text-sm leading-relaxed text-ink-300">
                      {gateway.description}
                    </span>
                    <span className="mt-2 flex items-center justify-between border-t border-ink-800 pt-4 text-xs uppercase tracking-[0.14em] text-ink-400">
                      {gateway.meta}
                      <ArrowUpRight size={14} aria-hidden className="text-accent-light" />
                    </span>
                  </Link>
                </SpotlightCard>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

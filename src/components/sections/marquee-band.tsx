"use client";

import Link from "next/link";
import { services } from "@/config/site";

/**
 * Nastro scorrevole con i servizi: dà movimento alla home senza
 * aggiungere una sezione lunga da scorrere.
 */
export function MarqueeBand() {
  const items = [...services, ...services];

  return (
    <section
      aria-label="Servizi in breve"
      className="relative overflow-hidden border-y border-ink-800/80 py-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent"
      />

      <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
        {items.map((service, index) => (
          <Link
            key={`${service.id}-${index}`}
            href={`/servizi#${service.id}`}
            className="group flex items-center gap-10 whitespace-nowrap"
          >
            <span className="font-display text-lg font-medium text-ink-300 transition-colors duration-300 group-hover:text-paper sm:text-xl">
              {service.title}
            </span>
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent to-accent-aqua"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

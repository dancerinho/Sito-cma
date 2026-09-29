"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { contactConfig } from "@/config/site";

/**
 * Il sito è statico e non ha un backend per ricevere messaggi: invece di un
 * modulo che si appoggia al client di posta, il contatto è diretto via email.
 */
const briefPoints = [
  "Cosa vuoi realizzare e per chi",
  "Tipologia di progetto (sito, web app, software, automazione…)",
  "Tempistiche desiderate",
  "Budget indicativo, se ne hai già uno",
];

const mailSubject = encodeURIComponent("Richiesta dal sito — nuovo progetto");

export function Contact() {
  return (
    <section id="contatti" className="py-8 sm:py-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="border-ocean h-full rounded-lg glass p-8">
              <h2 className="font-display text-xl font-medium text-paper">
                Scrivici
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-300">
                Mandaci una email con qualche dettaglio sul progetto: ti
                rispondiamo con una prima valutazione concreta.
              </p>
              <a
                href={`mailto:${contactConfig.email}?subject=${mailSubject}`}
                className="mt-8 inline-flex items-center gap-2 rounded bg-accent px-6 py-3.5 text-sm font-medium text-white shadow-glow transition-colors duration-300 ease-premium hover:bg-accent-dim"
              >
                <Mail size={16} aria-hidden />
                {contactConfig.email}
                <ArrowUpRight size={16} aria-hidden />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-lg border border-ink-800 p-8">
              <h2 className="font-display text-xl font-medium text-paper">
                Cosa indicare
              </h2>
              <ul className="mt-5 flex flex-col gap-3 text-sm text-ink-300">
                {briefPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-aqua" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

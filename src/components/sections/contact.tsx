import { Check, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { contactConfig } from "@/config/site";

/**
 * Il sito è statico e non ha un backend per ricevere messaggi: il contatto
 * è diretto via email, con un promemoria di cosa scrivere.
 */
const briefPoints = [
  "Cosa vuoi realizzare e per chi",
  "Il tipo di progetto: sito, web app, software o automazione",
  "Le tempistiche che hai in mente",
  "Un budget indicativo, se ne hai già uno",
];

const mailSubject = encodeURIComponent("Richiesta preventivo dal sito");

export function Contact() {
  return (
    <section className="pb-16 sm:pb-24">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <Reveal from="left">
          <h2 className="font-serif text-display-md text-paper">Scrivici una email</h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-300">
            Ti rispondiamo con una prima valutazione: fattibilità, approccio
            consigliato e prossimi passi.
          </p>
          <a
            href={`mailto:${contactConfig.email}?subject=${mailSubject}`}
            className="btn-primary mt-8 max-w-full"
          >
            <Mail size={16} aria-hidden className="shrink-0" />
            {contactConfig.email}
          </a>
        </Reveal>

        <Reveal from="right" delay={0.1}>
          <h2 className="font-serif text-display-md text-paper">Cosa indicare</h2>
          <ul className="mt-6 flex flex-col gap-4">
            {briefPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-ink-200">
                <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-accent" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

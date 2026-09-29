import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { contactConfig } from "@/config/site";

/**
 * Il sito è statico e non ha un backend per ricevere messaggi: invece di un
 * modulo che si appoggia al client di posta, il contatto è diretto via email.
 */
const briefPoints = [
  "Cosa vuoi realizzare e per chi",
  "Tipologia di progetto: sito, web app, software, automazione…",
  "Tempistiche desiderate",
  "Budget indicativo, se ne hai già uno",
];

const mailSubject = encodeURIComponent("Richiesta dal sito — nuovo progetto");

export function Contact() {
  return (
    <section id="contatti" className="pb-24 pt-14 sm:pb-32 sm:pt-20">
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="label">Scrivici a</p>
            <a
              href={`mailto:${contactConfig.email}?subject=${mailSubject}`}
              className="group mt-6 inline-flex items-center gap-3 break-all font-serif text-4xl text-paper transition-colors hover:text-accent sm:text-6xl"
            >
              {contactConfig.email}
              <ArrowUpRight
                aria-hidden
                className="h-8 w-8 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-12 sm:w-12"
              />
            </a>
            <p className="mt-8 max-w-md text-pretty leading-relaxed text-ink-300">
              Ti rispondiamo con una prima valutazione concreta: fattibilità,
              approccio consigliato e i passi successivi.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <p className="label">Cosa indicare nella email</p>
            <ol className="mt-6 border-t border-ink-800">
              {briefPoints.map((point, i) => (
                <li
                  key={point}
                  className="grid grid-cols-[2.5rem_1fr] border-b border-ink-800 py-4 text-sm text-ink-200"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {point}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

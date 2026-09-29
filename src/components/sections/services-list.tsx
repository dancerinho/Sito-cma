import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { services } from "@/config/site";

/**
 * Servizi in breve per la home: una riga per servizio, che entra
 * alternativamente da sinistra e da destra.
 */
export function ServicesList() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          title="Cosa *facciamo*"
          description="Dal sito vetrina al software gestionale: scegli il punto di partenza, al resto pensiamo noi."
          action={
            <Link href="/servizi/" className="btn-ghost group">
              Tutti i servizi
              <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />

        <ul className="mt-12 border-t border-ink-800">
          {services.map((service, i) => (
            <Reveal
              as="li"
              key={service.id}
              from={i % 2 === 0 ? "left" : "right"}
              className="border-b border-ink-800"
            >
              <Link
                href={`/servizi/#${service.id}`}
                className="group flex items-center justify-between gap-6 py-6"
              >
                <span>
                  <span className="block font-serif text-2xl text-paper transition-colors group-hover:text-accent sm:text-3xl">
                    {service.title}
                  </span>
                  <span className="mt-1 block max-w-xl text-sm leading-relaxed text-ink-400">
                    {service.description}
                  </span>
                </span>
                <ArrowRight
                  size={20}
                  aria-hidden
                  className="shrink-0 text-ink-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

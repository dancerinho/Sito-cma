import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { services } from "@/config/site";

/**
 * Indice dei servizi in home: una riga per area, come il sommario di un
 * catalogo. Ogni riga porta alla scheda dettagliata nella pagina Servizi.
 */
export function ServicesIndex() {
  return (
    <section id="servizi-home" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          index="01"
          label="Cosa facciamo"
          title="Sei aree di lavoro, *un* unico metodo."
          action={
            <Link href="/servizi" className="btn-ghost group">
              Tutti i servizi
              <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          }
        />

        <ul className="mt-16 border-t border-ink-800 sm:mt-20">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={i * 0.04} y={12} className="border-b border-ink-800">
              <Link
                href={`/servizi#${service.id}`}
                className="group relative grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-7 sm:gap-x-8 md:grid-cols-12 md:py-9"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink-900 transition-transform duration-500 ease-out group-hover:scale-y-100"
                />
                <span className="font-mono text-xs text-ink-500 transition-colors group-hover:text-accent md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-3xl leading-none text-paper transition-transform duration-500 ease-out group-hover:translate-x-2 sm:text-4xl md:col-span-6 lg:text-5xl">
                  {service.title}
                </span>
                <span className="col-start-2 mt-3 max-w-md text-sm leading-relaxed text-ink-400 md:col-span-4 md:col-start-auto md:mt-0">
                  {service.description}
                </span>
                <ArrowUpRight
                  size={22}
                  aria-hidden
                  className="col-start-3 row-start-1 text-ink-600 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:col-start-12 md:justify-self-end"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

import Link from "next/link";
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
import { Reveal } from "@/components/ui/motion";
import { services, servicesDisclaimer } from "@/config/site";

const icons: Record<string, LucideIcon> = {
  Globe,
  ShoppingBag,
  LayoutGrid,
  Code2,
  Workflow,
  LineChart,
  LifeBuoy,
};

/**
 * Scheda completa di ogni servizio: descrizione a sinistra, cosa include a
 * destra. Le due colonne entrano da lati opposti.
 */
export function Services() {
  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <ul className="border-t border-ink-800">
          {services.map((service) => {
            const Icon = icons[service.icon] ?? Code2;
            return (
              <li key={service.id} id={service.id} className="scroll-mt-20 border-b border-ink-800 py-12 sm:py-16">
                <article className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
                  <Reveal from="left">
                    <Icon size={24} strokeWidth={1.5} aria-hidden className="text-accent" />
                    <h2 className="mt-5 font-serif text-display-md text-paper">{service.title}</h2>
                    <p className="mt-4 max-w-md text-pretty leading-relaxed text-ink-300">
                      {service.description}
                    </p>
                  </Reveal>

                  <Reveal from="right" delay={0.1}>
                    <h3 className="text-sm font-medium text-ink-400">Cosa include</h3>
                    <ul className="mt-4 flex flex-col gap-3">
                      {service.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3 text-ink-200">
                          <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-accent" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contatti/"
                      className="group mt-4 inline-flex items-center gap-2 py-3 text-sm font-medium text-paper transition-colors hover:text-accent"
                    >
                      Richiedi un preventivo
                      <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Reveal>
                </article>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-ink-500">{servicesDisclaimer}</p>
      </Container>
    </section>
  );
}

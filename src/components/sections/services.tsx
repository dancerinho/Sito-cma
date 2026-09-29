import Link from "next/link";
import {
  ArrowUpRight,
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
 * Schede di servizio come voci di catalogo: indice e icona a sinistra,
 * titolo e descrizione al centro, punti concreti a destra.
 */
export function Services() {
  return (
    <section id="servizi" className="pb-24 sm:pb-32">
      <Container>
        <ul>
          {services.map((service, index) => {
            const Icon = icons[service.icon] ?? Code2;
            return (
              <li
                key={service.id}
                id={service.id}
                className="scroll-mt-20 border-b border-ink-800 py-14 sm:py-20"
              >
                <article className="grid grid-cols-1 gap-8 md:grid-cols-12">
                  <Reveal className="flex items-center gap-4 md:col-span-2 md:flex-col md:items-start">
                    <span className="font-mono text-xs text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon size={22} strokeWidth={1.4} aria-hidden className="text-ink-400" />
                  </Reveal>

                  <Reveal delay={0.05} className="md:col-span-5">
                    <h2 className="font-serif text-4xl leading-[1.05] text-paper sm:text-5xl">
                      {service.title}
                    </h2>
                    <p className="mt-5 max-w-md text-pretty leading-relaxed text-ink-300">
                      {service.description}
                    </p>
                  </Reveal>

                  <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
                    <ul className="border-t border-ink-800">
                      {service.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-3 border-b border-ink-800 py-3.5 text-sm text-ink-200"
                        >
                          <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-accent" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contatti"
                      className="group mt-6 inline-flex items-center gap-2 text-sm text-paper transition-colors hover:text-accent"
                    >
                      Richiedi una valutazione
                      <ArrowUpRight
                        size={15}
                        aria-hidden
                        className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </Reveal>
                </article>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-12 grid grid-cols-1 md:grid-cols-12">
          <p className="text-xs leading-relaxed text-ink-500 md:col-span-8 md:col-start-3">
            {servicesDisclaimer}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

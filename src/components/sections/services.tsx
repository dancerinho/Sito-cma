import {
  Globe,
  ShoppingCart,
  AppWindow,
  Code2,
  Workflow,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { services } from "@/config/site";

const icons: Record<string, LucideIcon> = {
  "siti-web": Globe,
  ecommerce: ShoppingCart,
  "web-app": AppWindow,
  software: Code2,
  automazioni: Workflow,
  manutenzione: RefreshCw,
};

export function Services() {
  return (
    <section id="servizi" className="border-t border-ink-800 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Servizi"
          title="Un supporto completo, dalla prima idea al prodotto in produzione."
          description="Interveniamo su ogni fase del progetto digitale, con un metodo di lavoro coerente indipendentemente dalla complessità."
        />

        <StaggerGroup
          as="ul"
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = icons[service.id] ?? Code2;
            return (
              <Reveal
                key={service.id}
                as="li"
                className="group relative flex flex-col gap-4 bg-ink-950 p-8 transition-colors duration-300 hover:bg-ink-900"
              >
                <Icon className="h-6 w-6 text-accent-light" strokeWidth={1.5} aria-hidden />
                <h3 className="font-display text-lg font-medium text-paper">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-300">
                  {service.description}
                </p>
              </Reveal>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}

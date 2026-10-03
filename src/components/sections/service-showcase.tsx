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
import { Reveal, SlideHeading } from "@/components/ui/motion";
import { ServiceMockup } from "@/components/mockups/service-mockups";
import { services, servicesDisclaimer } from "@/config/site";
import { cn } from "@/lib/utils";
import { swipeTrack } from "@/lib/swipe";
import { Swipe } from "@/components/ui/swipe";

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
 * I servizi uno per uno: testo da un lato, interfaccia illustrativa
 * dall'altro, alternati. In home ogni riga rimanda alla scheda completa;
 * nella pagina Servizi (`detailed`) mostra anche cosa include.
 */
export function ServiceShowcase({ detailed = false }: { detailed?: boolean }) {
  const items = services.map((service, i) => {
    const Icon = icons[service.icon] ?? Code2;
    const flip = i % 2 === 1;
    const Title = detailed ? "h2" : "h3";

    return (
      <article
        key={service.id}
        id={detailed ? service.id : undefined}
        data-path={flip ? "0.3" : "0.7"}
        className="flex w-[86%] shrink-0 snap-start scroll-mt-28 flex-col gap-6 sm:w-[64%] lg:grid lg:w-auto lg:shrink lg:grid-cols-12 lg:items-center lg:gap-12"
      >
        {/* Su telefono prima l'interfaccia e sotto il testo; su desktop si alternano. */}
        <div className={cn("order-2 lg:col-span-5", flip ? "lg:order-2 lg:col-start-8" : "lg:order-1")}>
          <Reveal from={flip ? "right" : "left"} distance={32} className="hidden lg:block">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-accent shadow-[0_0_30px_-12px_rgb(var(--accent)/0.8)]">
              <Icon size={20} strokeWidth={1.6} aria-hidden />
            </span>
          </Reveal>
          <SlideHeading
            as={Title}
            text={service.title}
            from={flip ? "right" : "left"}
            className="text-balance text-[1.375rem] font-medium leading-tight tracking-tight text-paper lg:mt-6 lg:text-display-md"
          />
          <Reveal
            from={flip ? "right" : "left"}
            delay={0.15}
            as="p"
            className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-ink-400 lg:mt-4 lg:text-base"
          >
            {service.description}
          </Reveal>

          {detailed ? (
            <Reveal from={flip ? "right" : "left"} delay={0.25}>
              <ul className="mt-5 flex flex-col gap-2.5 lg:mt-7 lg:gap-3">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm text-ink-200 lg:text-[15px]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check size={11} strokeWidth={3} aria-hidden />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
              <Link href="/contatti/" className="btn-ghost group mt-6 lg:mt-8">
                Richiedi un preventivo
                <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ) : (
            <Reveal from={flip ? "right" : "left"} delay={0.25}>
              <Link
                href={`/servizi/#${service.id}`}
                className="group mt-3 inline-flex items-center gap-2 py-2 text-sm font-medium text-paper transition-colors hover:text-accent lg:mt-5"
              >
                Scopri di più
                <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          )}

          {service.id === "trading-bot" ? (
            <p className="mt-5 max-w-md text-[11px] leading-relaxed text-ink-500 lg:mt-6 lg:text-xs">{servicesDisclaimer}</p>
          ) : null}
        </div>

        <Reveal
          from={flip ? "left" : "right"}
          distance={80}
          delay={0.1}
          className={cn(
            "order-1 max-lg:[zoom:0.9] lg:col-span-7",
            flip ? "lg:order-1 lg:col-start-1" : "lg:order-2",
          )}
        >
          <ServiceMockup id={service.id} />
        </Reveal>
      </article>
    );
  });

  return (
    <Container>
      <Swipe
        label="Servizi"
        items={items}
        trackClassName={cn(
          swipeTrack,
          "items-start lg:mx-0 lg:snap-none lg:flex-col lg:items-stretch lg:gap-24 lg:overflow-visible lg:px-0 lg:pb-0 xl:gap-28",
        )}
        dotsClassName="lg:hidden"
      />
    </Container>
  );
}

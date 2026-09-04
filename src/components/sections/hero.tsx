import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HeroGraphic } from "@/components/graphics/hero-graphic";

const focusAreas = ["Web", "Digital Products", "Software"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(60%_50%_at_50%_0%,rgba(51,88,255,0.16)_0%,rgba(8,9,11,0)_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]"
      />

      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div>
            <Reveal>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-ink-200">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-light" aria-hidden />
                Studio di sviluppo digitale
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-balance text-display-xl font-display font-medium text-paper">
                Trasformiamo idee in prodotti digitali che funzionano.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-300">
                Progettiamo e sviluppiamo siti web, applicazioni e software su
                misura, combinando strategia, design e tecnologia.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#contatti"
                  className="inline-flex items-center justify-center rounded bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-glow transition-all duration-300 ease-premium hover:bg-accent-dim"
                >
                  Parliamo del tuo progetto
                </a>
                <a
                  href="#servizi"
                  className="inline-flex items-center justify-center rounded border border-ink-600 px-7 py-3.5 text-sm font-medium text-paper transition-all duration-300 ease-premium hover:border-accent-light/60 hover:bg-ink-800"
                >
                  Scopri i servizi
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <dl className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
                {focusAreas.map((area) => (
                  <div key={area} className="flex items-center gap-2">
                    <span className="h-px w-6 bg-ink-600" aria-hidden />
                    <dt className="sr-only">Area di lavoro</dt>
                    <dd className="text-sm text-ink-300">{area}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative">
            <HeroGraphic />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

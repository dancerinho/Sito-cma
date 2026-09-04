import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-ink-800 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(50%_60%_at_50%_100%,rgba(51,88,255,0.14)_0%,rgba(8,9,11,0)_70%)]"
      />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-balance text-display-lg font-display font-medium text-paper">
              Hai un progetto in mente? Costruiamolo insieme.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-balance text-base leading-relaxed text-ink-300">
              Raccontaci obiettivi e vincoli del progetto: ti rispondiamo con
              una prima valutazione concreta.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="#contatti"
              className="mt-9 inline-flex items-center justify-center rounded bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-glow transition-all duration-300 ease-premium hover:bg-accent-dim"
            >
              Richiedi un preventivo
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

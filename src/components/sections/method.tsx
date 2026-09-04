import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { methodSteps } from "@/config/site";

export function Method() {
  return (
    <section id="metodo" className="border-t border-ink-800 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Metodo"
          title="Un processo chiaro, dall'analisi al lancio."
          description="Lavoriamo in quattro fasi, mantenendo visibilità e controllo su ogni passaggio del progetto."
        />

        <StaggerGroup as="ul" className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {methodSteps.map((step) => (
            <Reveal as="li" key={step.number} className="relative pt-6">
              <span
                className="absolute left-0 top-0 h-px w-10 bg-accent-light"
                aria-hidden
              />
              <span className="font-mono text-xs text-ink-400">{step.number}</span>
              <h3 className="mt-4 font-display text-lg font-medium text-paper">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">
                {step.description}
              </p>
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

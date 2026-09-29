import { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { methodSteps } from "@/config/site";

/** Le fasi di lavoro, affiancate: ognuna entra da un lato diverso. */
export function Steps({ action }: { action?: ReactNode }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          title="Come *lavoriamo*"
          description="Un percorso semplice, con aggiornamenti costanti e nessuna sorpresa."
          action={action}
        />

        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-4">
          {methodSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              from={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.08}
              className="bg-ink-950 p-7"
            >
              <h3 className="font-serif text-2xl text-paper">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-400">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, Rule } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { methodSteps } from "@/config/site";

/** Le quattro fasi del metodo, affiancate come colonne di un diagramma. */
export function MethodStrip() {
  return (
    <section className="border-t border-ink-800 py-24 sm:py-32">
      <Container>
        <SectionHeader
          index="02"
          label="Come lavoriamo"
          title="Dal primo *ascolto* al lancio, in quattro fasi."
          action={
            <Link href="/metodo" className="btn-ghost group">
              Il metodo
              <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          }
        />

        <ol className="mt-16 grid grid-cols-1 gap-x-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {methodSteps.map((step, i) => (
            <li key={step.number} className="pb-10 lg:pb-0">
              <Rule delay={i * 0.12} className="bg-ink-600" />
              <Reveal delay={0.15 + i * 0.12}>
                <p className="mt-6 font-mono text-xs text-accent">{step.number}</p>
                <h3 className="mt-10 font-serif text-3xl leading-tight text-paper">{step.title}</h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

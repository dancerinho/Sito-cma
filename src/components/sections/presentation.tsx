import { Container } from "@/components/ui/container";
import { Reveal, SplitHeading } from "@/components/ui/motion";
import { skillItems } from "@/config/site";

/**
 * Dichiarazione dello studio: una frase grande e, sotto, i principi che
 * restano costanti in ogni progetto.
 */
export function Presentation({ index = "03" }: { index?: string }) {
  return (
    <section className="border-t border-ink-800 py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <Reveal className="label flex items-center gap-3 md:col-span-3 md:pt-3">
            <span className="text-accent">{index}</span>
            <span className="h-px w-8 bg-ink-700" aria-hidden />
            Principi
          </Reveal>
          <SplitHeading
            as="p"
            text="Niente template, niente scorciatoie: ogni progetto parte da zero ed è costruito per *durare*."
            className="text-balance font-serif text-display-md text-paper md:col-span-9"
          />
        </div>

        <ul className="mt-16 grid grid-cols-1 border-l border-t border-ink-800 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {skillItems.map((skill, i) => (
            <Reveal
              as="li"
              key={skill.title}
              delay={i * 0.05}
              y={10}
              className="border-b border-r border-ink-800 p-7 sm:p-8"
            >
              <p className="font-mono text-[10px] text-ink-500">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-8 text-lg font-medium text-paper">{skill.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">{skill.description}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

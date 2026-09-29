import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { skillItems } from "@/config/site";

/** Competenze come elenco a due colonne: titolo serif, spiegazione breve. */
export function Skills() {
  return (
    <section id="competenze" className="pb-24 sm:pb-32">
      <Container>
        <ul className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {skillItems.map((skill, index) => (
            <Reveal
              as="li"
              key={skill.title}
              delay={(index % 2) * 0.08}
              className="grid grid-cols-[3rem_1fr] border-b border-ink-800 py-10 sm:py-12"
            >
              <span className="pt-2 font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-serif text-3xl leading-tight text-paper sm:text-4xl">
                  {skill.title}
                </h2>
                <p className="mt-3 max-w-sm leading-relaxed text-ink-300">
                  {skill.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

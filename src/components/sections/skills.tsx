import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { skillItems } from "@/config/site";

export function Skills() {
  return (
    <section id="competenze" className="border-t border-ink-800 bg-ink-900/40 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Competenze"
          title="Ciò che portiamo in ogni progetto."
          description="Un insieme di competenze tecniche e di design che restano costanti, indipendentemente dal tipo di prodotto."
        />

        <StaggerGroup as="ul" className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillItems.map((skill) => (
            <Reveal as="li" key={skill.title} className="border-l border-ink-700 pl-6">
              <h3 className="font-display text-base font-medium text-paper">
                {skill.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">
                {skill.description}
              </p>
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

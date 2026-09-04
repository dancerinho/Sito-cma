import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { projectTypes, projectTypesNote } from "@/config/site";

export function Projects() {
  return (
    <section id="progetti" className="border-t border-ink-800 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Progetti"
          title="Il tipo di prodotti che costruiamo."
          description={projectTypesNote}
        />

        <StaggerGroup as="ul" className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectTypes.map((project, i) => (
            <Reveal
              as="li"
              key={project.title}
              className="group relative overflow-hidden rounded-lg border border-ink-800"
            >
              <div
                className="relative flex h-44 items-center justify-center overflow-hidden bg-ink-900"
                aria-hidden
              >
                <div
                  className="absolute inset-0 opacity-70 [background:linear-gradient(135deg,rgba(51,88,255,0.28),rgba(8,9,11,0)_60%)]"
                  style={{ transform: `rotate(${i * 12}deg) scale(1.4)` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
                <span className="relative font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
                  Spazio progetto
                </span>
              </div>
              <div className="bg-ink-950 p-6">
                <h3 className="font-display text-base font-medium text-paper">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">
                  {project.description}
                </p>
              </div>
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

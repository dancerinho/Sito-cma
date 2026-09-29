import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { LogoMark } from "@/components/brand/logo-mark";
import { projectTypes } from "@/config/site";

/**
 * Tipologie di progetto, in attesa dei primi case study pubblicabili.
 * Ogni tavola ha un'area visiva a filetti con il marchio come segnaposto.
 */
export function Projects() {
  return (
    <section id="progetti" className="py-14 sm:py-20">
      <Container>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projectTypes.map((project, index) => (
            <Reveal as="li" key={project.title} delay={index * 0.08} className="group">
              <div
                aria-hidden
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-ink-800 bg-ink-900"
              >
                <div className="grid-lines absolute inset-0" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(242,240,235,0.045)_1px,transparent_1px)] bg-[size:100%_calc(100%/8)]" />
                <LogoMark className="relative h-28 w-28 opacity-60 transition-transform duration-1000 ease-out group-hover:rotate-[72deg]" />
                <span className="label absolute left-5 top-5">Tipologia {String(index + 1).padStart(2, "0")}</span>
                <span className="label absolute bottom-5 right-5">Case study in arrivo</span>
              </div>
              <div className="mt-6 flex items-baseline gap-5">
                <span className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-serif text-3xl leading-tight text-paper sm:text-4xl">
                    {project.title}
                  </h2>
                  <p className="mt-3 max-w-md leading-relaxed text-ink-300">
                    {project.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

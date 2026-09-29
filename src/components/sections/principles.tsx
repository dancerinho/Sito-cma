import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { skillItems } from "@/config/site";

/** Cosa garantiamo in ogni progetto, in una griglia compatta. */
export function Principles() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeader title="Cosa trovi in *ogni* progetto" />

        <ul className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillItems.map((skill, i) => (
            <Reveal
              as="li"
              key={skill.title}
              from={i % 2 === 0 ? "left" : "right"}
              delay={(i % 3) * 0.06}
              className="flex gap-4 border-t border-ink-800 py-6"
            >
              <Check size={18} aria-hidden className="mt-1 shrink-0 text-accent" />
              <div>
                <h3 className="font-medium text-paper">{skill.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-400">{skill.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

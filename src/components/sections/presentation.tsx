import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function Presentation() {
  return (
    <section className="border-t border-ink-800 py-24 sm:py-32">
      <Container>
        <Reveal>
          <p className="text-balance text-display-md font-display font-medium leading-tight text-ink-100">
            Uniamo progettazione, sviluppo e attenzione ai dettagli per
            costruire{" "}
            <span className="text-paper">esperienze digitali chiare</span>,
            veloci e{" "}
            <span className="text-paper">orientate a obiettivi reali</span>.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

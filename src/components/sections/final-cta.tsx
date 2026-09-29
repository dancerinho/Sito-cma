import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, SplitHeading } from "@/components/ui/motion";
import { contactConfig } from "@/config/site";

/** Chiusura di pagina: domanda grande e contatto diretto. */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-ink-800 py-24 sm:py-36">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
      <Container>
        <Reveal className="label flex items-center gap-3">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-accent" aria-hidden />
          Nuovo progetto
        </Reveal>

        <SplitHeading
          as="h2"
          text="Hai un progetto in mente? *Parliamone.*"
          className="mt-8 max-w-5xl text-balance font-serif text-display-xl text-paper"
        />

        <Reveal delay={0.3} className="mt-14 flex flex-col gap-8 border-t border-ink-800 pt-8 md:flex-row md:items-end md:justify-between">
          <a
            href={`mailto:${contactConfig.email}`}
            className="group inline-flex items-center gap-3 break-all font-serif text-3xl text-paper transition-colors hover:text-accent sm:text-5xl"
          >
            {contactConfig.email}
            <ArrowUpRight
              aria-hidden
              className="h-7 w-7 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-10 sm:w-10"
            />
          </a>
          <Link href="/contatti" className="btn-primary shrink-0 self-start md:self-auto">
            Come iniziare
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

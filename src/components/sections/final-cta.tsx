import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, SlideHeading } from "@/components/ui/motion";
import { WhatsappIcon } from "@/components/icons/social-icons";
import { contactLinks } from "@/config/site";

/** Chiusura di pagina: domanda semplice e due modi per contattarci. */
export function FinalCta() {
  return (
    <section className="border-t border-ink-800 py-16 sm:py-24">
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <SlideHeading
            text="Hai un progetto in mente? *Parliamone.*"
            className="max-w-2xl text-balance font-serif text-display-lg text-paper"
          />
          <Reveal from="left" delay={0.2} as="p" className="mt-4 text-ink-300">
            Ti rispondiamo con una prima valutazione, senza impegno.
          </Reveal>
        </div>

        <Reveal from="right" delay={0.25} className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <Link href="/contatti/" className="btn-primary group">
            Richiedi un preventivo
            <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <WhatsappIcon width={16} height={16} className="text-[#25D366]" />
            Scrivici su WhatsApp
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

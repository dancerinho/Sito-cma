import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SlideHeading } from "@/components/ui/motion";
import { RecentWork } from "@/components/sections/recent-work";

export function Hero() {
  return (
    <section data-path="hero" className="relative flex items-center pb-14 pt-28 sm:pb-20 sm:pt-32 lg:min-h-[min(740px,100svh)] lg:pt-28">
      <div
        aria-hidden
        className="dot-grid-light pointer-events-none absolute inset-0 -z-[1] [mask-image:radial-gradient(70%_60%_at_30%_30%,#000,transparent)]"
      />
      <Container className="grid min-w-0 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-6">
          <SlideHeading
            as="h1"
            text="Siti web e software | *su misura.*"
            immediate
            className="text-[clamp(2.5rem,5.4vw,4.75rem)] font-medium leading-[1.03] tracking-[-0.045em] text-paper"
          />
          <p className="mt-5 max-w-[30ch] text-pretty text-base leading-relaxed text-ink-300 sm:max-w-[34ch] sm:text-lg">
            Progettiamo siti web, app, software e automazioni per la tua azienda.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            <Link href="/portfolio/" className="btn-primary group">
              Vedi i lavori
              <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contatti/" className="btn-ghost">
              Richiedi un preventivo
            </Link>
          </div>
        </div>
        <RecentWork />
      </Container>
    </section>
  );
}

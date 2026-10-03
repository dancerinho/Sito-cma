import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { Statement } from "@/components/sections/statement";
import { Principles } from "@/components/sections/principles";
import { Steps } from "@/components/sections/steps";
import { FinalCta } from "@/components/sections/final-cta";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Home: chi siamo, cosa facciamo servizio per servizio, il nostro approccio,
 * cosa garantiamo, come lavoriamo e il contatto.
 */
export default function Home() {
  return (
    <>
      <Hero />

      <section className="pb-16 pt-8 sm:pb-28 sm:pt-16 lg:pb-36">
        <Container className="mb-8 sm:mb-16 lg:mb-24">
          <SectionHeader
            tag="servizi"
            title="Dal sito vetrina al *software* gestionale."
            description="Scegli il punto di partenza, al resto pensiamo noi."
            action={
              <Link href="/servizi/" className="btn-ghost group">
                Tutti i servizi
                <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
              </Link>
            }
          />
        </Container>
        <ServiceShowcase />
      </section>

      <Statement />
      <Principles />
      <Steps
        action={
          <Link href="/studio/" className="btn-ghost group">
            Chi siamo
            <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />
      <FinalCta />
    </>
  );
}

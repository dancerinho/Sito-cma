import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SpotlightCard } from "@/components/ui/motion-primitives";
import { Presentation } from "@/components/sections/presentation";
import { FinalCta } from "@/components/sections/final-cta";
import { navItems } from "@/config/site";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Chi è CMA Enterprise e come lavora: metodo, competenze e tipologie di progetto seguite dallo studio.",
};

const studioGroup = navItems.find((item) => item.label === "Studio");

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio"
        title="Come lavoriamo, cosa sappiamo fare, cosa costruiamo."
        description="Tre pagine per capire lo studio senza scorrere una home infinita: il metodo, le competenze e le tipologie di progetto."
      />

      <section className="py-8 sm:py-12">
        <Container>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {studioGroup?.children?.map((child) => (
              <li key={child.href}>
                <SpotlightCard className="h-full">
                  <Link href={child.href} className="flex h-full flex-col gap-4 p-8">
                    <h2 className="font-display text-xl font-medium text-paper">
                      {child.label}
                    </h2>
                    <p className="flex-1 text-sm leading-relaxed text-ink-300">
                      {child.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-light">
                      Apri la pagina
                      <ArrowUpRight size={15} aria-hidden />
                    </span>
                  </Link>
                </SpotlightCard>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Presentation />
      <FinalCta />
    </>
  );
}

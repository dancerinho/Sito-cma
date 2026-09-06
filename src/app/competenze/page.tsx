import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Skills } from "@/components/sections/skills";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Competenze",
  description:
    "Design su misura, sviluppo responsive, prestazioni, codice scalabile ed esperienza utente: ciò che portiamo in ogni progetto.",
};

export default function CompetenzePage() {
  return (
    <>
      <PageHero
        eyebrow="Competenze"
        title="Ciò che portiamo in ogni progetto."
        description="Un insieme di competenze tecniche e di design che restano costanti, indipendentemente dal tipo di prodotto."
      />
      <Skills />
      <FinalCta />
    </>
  );
}

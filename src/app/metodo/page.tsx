import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Method } from "@/components/sections/method";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Metodo",
  description:
    "Le quattro fasi con cui CMA Enterprise porta un progetto dall'analisi al lancio, mantenendo visibilità su ogni passaggio.",
};

export default function MetodoPage() {
  return (
    <>
      <PageHero
        eyebrow="Metodo"
        title="Un processo chiaro, dall'analisi al lancio."
        description="Lavoriamo in quattro fasi, mantenendo visibilità e controllo su ogni passaggio del progetto."
      />
      <Method />
      <FinalCta />
    </>
  );
}

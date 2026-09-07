import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Services } from "@/components/sections/services";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Servizi",
  description:
    "Siti web, web app, software su misura, automazioni, bot per investimenti e manutenzione: le aree di lavoro di CMA Enterprise.",
};

export default function ServiziPage() {
  return (
    <>
      <PageHero
        eyebrow="Servizi"
        title="Un supporto completo, dalla prima idea al prodotto in produzione."
        description="Interveniamo su ogni fase del progetto digitale, con un metodo di lavoro coerente indipendentemente dalla complessità."
      />
      <Services />
      <FinalCta />
    </>
  );
}

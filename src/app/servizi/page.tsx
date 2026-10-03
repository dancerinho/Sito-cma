import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Servizi: siti web, web app e software su misura",
  description:
    "Sviluppo di siti web e landing page, web app, software su misura, automazioni, bot per investimenti e manutenzione. Scopri cosa include ogni servizio.",
  alternates: { canonical: "/servizi/" },
};

export default function ServiziPage() {
  return (
    <>
      <PageHero
        tag="servizi"
        title="I nostri *servizi*."
        description="Dal sito vetrina al software gestionale: ecco cosa possiamo costruire per te e cosa include ogni servizio."
      />
      <section className="pb-16 pt-4 sm:pb-28 lg:pb-36">
        <ServiceShowcase detailed />
      </section>
      <FinalCta />
    </>
  );
}

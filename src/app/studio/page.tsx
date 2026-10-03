import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Steps } from "@/components/sections/steps";
import { Statement } from "@/components/sections/statement";
import { Principles } from "@/components/sections/principles";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Chi siamo e come lavoriamo",
  description:
    "CMA Enterprise è uno studio digitale che progetta e sviluppa siti web e software su misura. Scopri il nostro metodo di lavoro e cosa garantiamo in ogni progetto.",
  alternates: { canonical: "/studio/" },
};

export default function StudioPage() {
  return (
    <>
      <PageHero
        tag="studio"
        title="Chi *siamo*."
        description="Progettiamo e sviluppiamo prodotti digitali partendo dagli obiettivi reali di chi li usa. Ogni progetto parte da zero, senza template."
      />
      <Steps />
      <Statement />
      <Principles />
      <FinalCta />
    </>
  );
}

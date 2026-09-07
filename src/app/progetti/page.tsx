import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Projects } from "@/components/sections/projects";
import { FinalCta } from "@/components/sections/final-cta";
import { projectTypesNote } from "@/config/site";

export const metadata: Metadata = {
  title: "Progetti",
  description:
    "Le tipologie di prodotto che costruiamo: siti vetrina, applicazioni web su misura e software dedicato.",
};

export default function ProgettiPage() {
  return (
    <>
      <PageHero
        eyebrow="Progetti"
        title="Il tipo di prodotti che costruiamo."
        description={projectTypesNote}
      />
      <Projects />
      <FinalCta />
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Scrivici per raccontarci il tuo progetto: ti rispondiamo con una prima valutazione concreta.",
};

export default function ContattiPage() {
  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title="Parliamo del tuo progetto."
        description="Bastano una email e pochi dettagli per iniziare: ti rispondiamo con una prima valutazione concreta."
      />
      <Contact />
      <div className="h-20" />
    </>
  );
}

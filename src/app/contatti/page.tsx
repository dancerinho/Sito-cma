import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Raccontaci il tuo progetto: obiettivo, tipologia e budget indicativo. Ti rispondiamo con una prima valutazione concreta.",
};

export default function ContattiPage() {
  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title="Parliamo del tuo progetto."
        description="Bastano pochi dettagli per iniziare: ci pensiamo noi a rispondere con una prima valutazione concreta."
      />
      <Contact />
      <div className="h-20" />
    </>
  );
}

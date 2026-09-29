import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contatti e preventivi",
  description:
    "Richiedi un preventivo per il tuo sito web, web app o software su misura: scrivici via email o WhatsApp e ti rispondiamo con una prima valutazione.",
  alternates: { canonical: "/contatti/" },
};

export default function ContattiPage() {
  return (
    <>
      <PageHero
        title="Parliamo del tuo *progetto*"
        description="Scrivici via email o WhatsApp: il messaggio è già pronto, ti basta inviarlo. Ti rispondiamo con una prima valutazione, senza impegno."
      />
      <Contact />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contatti e preventivi",
  description:
    "Richiedi un preventivo per il tuo sito web, web app o software su misura: chiamaci o scrivici via WhatsApp o email e ti rispondiamo con una prima valutazione.",
  alternates: { canonical: "/contatti/" },
};

export default function ContattiPage() {
  return (
    <>
      <PageHero
        tag="contatti"
        title="Parliamo del tuo *progetto*."
        description="Chiamaci o scrivici su WhatsApp o via email: ti rispondiamo con una prima valutazione, senza impegno."
      />
      <Contact />
      <Container>
        <div className="pb-16 text-ink-300">
          <Link href="/checklist-bb/" className="inline-block py-2 text-paper underline underline-offset-4">Leggi la checklist gratuita per il sito del tuo B&B</Link>
        </div>
      </Container>
    </>
  );
}

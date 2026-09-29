import type { Metadata } from "next";
import { Contact, ContactBanner } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contatti e preventivi",
  description:
    "Richiedi un preventivo per il tuo sito web, web app o software su misura: chiamaci o scrivici via WhatsApp o email e ti rispondiamo con una prima valutazione.",
  alternates: { canonical: "/contatti/" },
};

export default function ContattiPage() {
  return (
    <>
      <ContactBanner />
      <Contact />
    </>
  );
}

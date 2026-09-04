import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Informativa sull'uso dei cookie di ${siteConfig.name}.`,
};

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updatedAt="[da completare]">
      <LegalSection title="Cosa sono i cookie">
        <p>
          I cookie sono piccoli file di testo che i siti visitati inviano al
          dispositivo dell&apos;utente, dove vengono memorizzati per essere
          poi ritrasmessi agli stessi siti alla visita successiva.
        </p>
      </LegalSection>

      <LegalSection title="Cookie utilizzati da questo sito">
        <p>
          Allo stato attuale il sito non installa cookie di profilazione o
          di terze parti. Questa sezione verrà aggiornata nel dettaglio non
          appena verranno attivati strumenti di analisi, marketing o
          integrazioni esterne (ad esempio un servizio di invio email per il
          modulo di contatto).
        </p>
      </LegalSection>

      <LegalSection title="Gestione dei cookie">
        <p>
          È possibile gestire le preferenze sui cookie direttamente dalle
          impostazioni del proprio browser, incluso il blocco totale o
          parziale della loro installazione.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { contactConfig, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Informativa sul trattamento dei dati personali di ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updatedAt="[da completare]">
      <LegalSection title="Titolare del trattamento">
        <p>
          Il titolare del trattamento dei dati raccolti tramite questo sito è{" "}
          <strong>[Ragione sociale / Nominativo], P.IVA [P.IVA da inserire]</strong>,
          contattabile all&apos;indirizzo{" "}
          {contactConfig.email ? (
            <a href={`mailto:${contactConfig.email}`} className="text-paper underline underline-offset-2">
              {contactConfig.email}
            </a>
          ) : (
            "[email da inserire]"
          )}
          .
        </p>
      </LegalSection>

      <LegalSection title="Dati raccolti">
        <p>
          Attraverso il modulo di contatto vengono raccolti i dati forniti
          volontariamente dall&apos;utente: nome, indirizzo email, tipologia
          di progetto, budget indicativo (facoltativo) e il contenuto del
          messaggio.
        </p>
      </LegalSection>

      <LegalSection title="Finalità del trattamento">
        <p>
          I dati sono trattati esclusivamente per rispondere alle richieste
          di informazioni o preventivo inviate tramite il modulo di
          contatto, e non sono utilizzati per finalità di marketing senza
          un consenso specifico e separato.
        </p>
      </LegalSection>

      <LegalSection title="Base giuridica e conservazione">
        <p>
          Il trattamento si basa sul consenso espresso dall&apos;utente al
          momento dell&apos;invio del modulo. I dati sono conservati per il
          tempo necessario a gestire la richiesta e, successivamente, secondo
          i termini che verranno definiti da [Ragione sociale].
        </p>
      </LegalSection>

      <LegalSection title="Diritti dell'interessato">
        <p>
          In qualsiasi momento è possibile richiedere accesso, rettifica,
          cancellazione o limitazione del trattamento dei propri dati,
          scrivendo all&apos;indirizzo indicato in questa pagina.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

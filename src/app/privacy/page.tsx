import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { contactConfig, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Informativa sul trattamento dei dati personali di ${siteConfig.name}.`,
  alternates: { canonical: "/privacy/" },
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
          Il sito non contiene moduli di raccolta dati. Vengono trattati
          esclusivamente i dati che l&apos;utente sceglie di inviare scrivendo
          all&apos;indirizzo email indicato: di norma nome, indirizzo email e
          il contenuto del messaggio.
        </p>
      </LegalSection>

      <LegalSection title="Finalità del trattamento">
        <p>
          I dati sono trattati esclusivamente per rispondere alle richieste
          di informazioni o preventivo ricevute via email, e non sono utilizzati per finalità di marketing senza
          un consenso specifico e separato.
        </p>
      </LegalSection>

      <LegalSection title="Base giuridica e conservazione">
        <p>
          Il trattamento si basa sulla richiesta inviata dall&apos;utente e
          sulle misure precontrattuali da lui richieste. I dati sono conservati per il
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

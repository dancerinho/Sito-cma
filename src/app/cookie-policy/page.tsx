import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Come ${siteConfig.name} usa cookie e servizi esterni.`,
  alternates: { canonical: "/cookie-policy/" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updatedAt="4 novembre 2026">
      <LegalSection title="Cookie del sito">
        <p>Il sito non utilizza cookie pubblicitari o di profilazione propri. I cookie sono piccoli file che un sito può salvare sul dispositivo. Puoi bloccarli o cancellarli dalle impostazioni del tuo browser.</p>
      </LegalSection>
      <LegalSection title="Modulo di iscrizione e siti esterni">
        <p>La checklist può essere letta senza caricare il modulo. Solo se scegli di caricare il modulo o aprirlo in una nuova pagina, il browser si collega a Brevo. Brevo può trattare dati tecnici e usare strumenti necessari al funzionamento o alla sicurezza del modulo secondo la propria <a className="text-paper underline" href="https://www.brevo.com/legal/privacypolicy/">informativa privacy</a>.</p>
        <p>I collegamenti a WhatsApp, ai social e ad altri siti seguono le regole dei rispettivi servizi una volta aperti. Per i dettagli sui dati trattati vedi l’<Link className="text-paper underline" href="/privacy/">informativa privacy</Link>.</p>
      </LegalSection>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { contactConfig, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Informativa privacy",
  description: `Come ${siteConfig.name} tratta i dati di chi visita il sito, chiede informazioni o si iscrive alle offerte.`,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Informativa privacy" updatedAt="4 novembre 2026">
      <LegalSection title="Chi tratta i dati">
        <p>Il titolare del trattamento è <strong>Riccardo Novembrini</strong>, che opera con il nome CMA Enterprise. Per questioni relative alla privacy puoi scrivere a <a className="text-paper underline" href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>.</p>
        <p>Questa informativa riguarda la navigazione sul sito, le richieste che ci invii e le iscrizioni alle offerte.</p>
      </LegalSection>
      <LegalSection title="Navigazione e sicurezza">
        <p>Quando visiti il sito, i sistemi che lo ospitano possono trattare l’indirizzo IP e altri dati tecnici della richiesta, come la pagina richiesta, la data e l’ora e il tipo di browser. Il trattamento è necessario per servire le pagine e per il legittimo interesse a mantenere il sito sicuro e funzionante (art. 6, par. 1, lett. f, GDPR). I dati tecnici sono conservati per il tempo necessario a queste finalità, salvo ulteriori esigenze di sicurezza o obblighi di legge.</p>
        <p>Il sito è pubblicato su GitHub Pages. Per i dati trattati dal servizio puoi consultare l’<a className="text-paper underline" href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">informativa di GitHub</a>.</p>
      </LegalSection>
      <LegalSection title="Richieste di informazioni e preventivi">
        <p>Se ci scrivi per email o WhatsApp, oppure ci chiami, trattiamo i recapiti e le informazioni che ci fornisci per risponderti. La base giuridica è l’esecuzione delle misure precontrattuali richieste da te (art. 6, par. 1, lett. b) o, per le richieste generiche che non riguardano un possibile contratto, il legittimo interesse a gestire le comunicazioni ricevute (lett. f).</p>
        <p>I recapiti sono necessari per poterti rispondere. Conserviamo i messaggi per il tempo necessario a gestire la richiesta e gli eventuali sviluppi; più a lungo solo quando necessario per obblighi di legge o per far valere o difendere un diritto. Per WhatsApp si applica anche l’<a className="text-paper underline" href="https://www.whatsapp.com/legal/privacy-policy-eea">informativa di WhatsApp per lo Spazio economico europeo</a>. Una richiesta di preventivo non comporta l’iscrizione alle offerte.</p>
      </LegalSection>
      <LegalSection title="Iscrizione facoltativa alle offerte">
        <p>Usiamo il tuo indirizzo email per inviarti offerte di CMA Enterprise sul restyling e sullo sviluppo di siti web, solo con il tuo consenso (art. 6, par. 1, lett. a, GDPR e art. 130 del Codice Privacy). L’iscrizione richiede una scelta nel modulo e la conferma tramite il link che ricevi via email. La checklist è gratuita e disponibile anche senza fornire dati.</p>
        <p>Per gestire iscrizioni, conferme e invii utilizziamo Brevo come responsabile del trattamento. Il servizio registra l’indirizzo email e le informazioni necessarie a documentare l’iscrizione, come la data, lo stato della conferma e il modulo utilizzato. Se il modulo viene aperto, Brevo può inoltre trattare i dati tecnici necessari a caricarlo e proteggerlo.</p>
        <p>L’indirizzo rimane nella lista per il tempo in cui l’iscrizione è attiva. Puoi revocare il consenso in qualsiasi momento usando il link di disiscrizione presente nelle email promozionali o scrivendoci. La revoca non incide sulla liceità del trattamento precedente. Dopo la disiscrizione conserviamo solo i dati necessari a documentare la revoca, evitare ulteriori invii e, ove necessario, tutelare un diritto.</p>
      </LegalSection>
      <LegalSection title="Destinatari e trasferimenti">
        <p>Accedono ai dati le persone autorizzate e, secondo le rispettive funzioni, i fornitori di hosting, posta elettronica e gestione delle iscrizioni. Per alcuni servizi i dati possono essere trattati fuori dallo Spazio economico europeo: ove necessario si applicano le garanzie previste dagli artt. 44 e seguenti del GDPR, come una decisione di adeguatezza o le clausole contrattuali standard. Puoi chiederci informazioni o una copia delle garanzie applicabili. Per Brevo puoi consultare anche la relativa <a className="text-paper underline" href="https://help.brevo.com/hc/it/articles/360001258744">documentazione sul trattamento dei dati</a>.</p>
      </LegalSection>
      <LegalSection title="I tuoi diritti">
        <p>Nei casi previsti dagli artt. 15–22 del GDPR, puoi chiedere accesso, rettifica, cancellazione, limitazione e portabilità dei dati, oppure opporti ai trattamenti basati sul legittimo interesse. Non utilizziamo i dati descritti qui per decisioni interamente automatizzate che producono effetti giuridici o effetti analoghi. Puoi inoltre presentare reclamo al <a className="text-paper underline" href="https://www.garanteprivacy.it/">Garante per la protezione dei dati personali</a>.</p>
        <p>Per i cookie e i servizi esterni, vedi anche la <Link className="text-paper underline" href="/cookie-policy/">Cookie Policy</Link>.</p>
      </LegalSection>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { BrevoOffersForm } from "@/components/forms/brevo-offers-form";

export const metadata: Metadata = {
  title: "Checklist gratuita per il sito del tuo B&B",
  description: "Dieci controlli pratici per capire se il sito del tuo B&B facilita le prenotazioni e dove intervenire per primo.",
  alternates: { canonical: "/checklist-bb/" },
};

const checks = [
  [
    "Trovi le informazioni essenziali al primo colpo?",
    "Dalla home si capisce dove si trova il B&B, a chi si rivolge e come verificare disponibilità o chiedere un preventivo."
  ],
  [
    "Il sito è facile da usare con una mano?",
    "Aprilo sul telefono. Il testo si legge senza zoom e i pulsanti di prenotazione, telefono e menu si toccano senza errori."
  ],
  [
    "Prenotare è davvero semplice?",
    "Parti dalla home e prova a selezionare due notti. Verifica che il percorso funzioni fino al riepilogo e che eventuali costi e condizioni siano chiari."
  ],
  [
    "Le camere si possono confrontare?",
    "Per ogni camera indica posti letto, bagno, dotazioni e foto aggiornate. Specifica cosa è incluso nella tariffa."
  ],
  [
    "Le foto rispondono alle domande degli ospiti?",
    "Mostra camere, bagni, ingresso e spazi comuni. Metti in evidenza le differenze reali tra le camere e descrivi le immagini utili."
  ],
  [
    "Arrivare è semplice anche per chi non conosce la zona?",
    "Verifica l’indirizzo sulla mappa e spiega parcheggio, eventuale ZTL, trasporti e orari di check-in."
  ],
  [
    "La home è rapida anche fuori dal Wi-Fi?",
    "Aprila con la rete mobile: foto, testo e pulsante principale dovrebbero essere disponibili presto, senza salti fastidiosi della pagina."
  ],
  [
    "I contatti funzionano tutti?",
    "Tocca telefono, email e WhatsApp. Se hai un modulo, prova a inviarlo con un recapito di test e controlla che la richiesta arrivi."
  ],
  [
    "Le informazioni sono coerenti con Google e i portali?",
    "Confronta nome, indirizzo, telefono, orari e servizi con Google Maps e con i portali su cui la struttura è presente."
  ],
  [
    "Gli ospiti trovano risposte prima di contattarti?",
    "Rendi facili da trovare regole per animali, colazione, accessibilità, check-in, cancellazioni ed eventuali costi extra."
  ]
] as const;

export default function ChecklistPage() {
  return (
    <>
      <PageHero
        tag="guida gratuita · 15 minuti"
        title="Il sito del tuo B&B aiuta a *prenotare*?"
        description="Dieci controlli da fare dal telefono, come un ospite che non conosce ancora la struttura. Spunta solo quello che funziona."
      />
      <Container>
        <div className="mx-auto max-w-3xl pb-24">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl font-medium text-paper">La checklist</h2>
            <a href="/risorse/checklist-sito-bb.html" className="text-sm text-paper underline underline-offset-4">Versione stampabile</a>
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {checks.map(([title, description], index) => (
              <li key={title}>
                <label className="flex cursor-pointer gap-4 py-5">
                  <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" />
                  <span>
                    <span className="block font-medium text-paper"><span className="mr-2 font-mono text-sm text-ink-400" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-300">{description}</span>
                  </span>
                </label>
              </li>
            ))}
          </ol>
          <section aria-labelledby="priorita" className="mt-10">
            <h2 id="priorita" className="text-xl font-medium text-paper">Da dove partire</h2>
            <p className="mt-3 leading-relaxed text-ink-300">Se un ospite non riesce a prenotare, a contattarti o a trovare la struttura, risolvi quel problema per primo. Poi scegli due caselle rimaste vuote che rispondono alle domande che ricevi più spesso.</p>
            <Link href="/contatti/" className="mt-3 inline-block py-2 text-paper underline underline-offset-4">Chiedi una prima valutazione senza impegno</Link>
          </section>
          <BrevoOffersForm />
        </div>
      </Container>
    </>
  );
}

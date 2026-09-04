export type ContactFormPayload = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

export class ContactBackendNotConfiguredError extends Error {
  constructor() {
    super("Nessun servizio di invio è ancora collegato al modulo contatti.");
    this.name = "ContactBackendNotConfiguredError";
  }
}

/**
 * Punto di integrazione per l'invio reale del modulo contatti.
 *
 * Il modulo è validato e pronto: collega qui uno di questi servizi prima
 * di andare in produzione, poi rimuovi il throw sottostante.
 *
 * Opzione A — Resend (consigliata, via API route):
 *   1. crea `src/app/api/contact/route.ts` con un handler POST che usa
 *      il pacchetto `resend` lato server (chiave API in variabile d'ambiente);
 *   2. qui sotto sostituisci il throw con:
 *      const res = await fetch("/api/contact", {
 *        method: "POST",
 *        headers: { "Content-Type": "application/json" },
 *        body: JSON.stringify(payload),
 *      });
 *      if (!res.ok) throw new Error("Invio non riuscito");
 *   Nota: le API route richiedono un hosting con runtime Node
 *   (es. Vercel), non l'export statico attuale per GitHub Pages.
 *
 * Opzione B — Formspree (funziona anche con export statico):
 *   const res = await fetch("https://formspree.io/f/IL_TUO_ID", {
 *     method: "POST",
 *     headers: { Accept: "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!res.ok) throw new Error("Invio non riuscito");
 */
export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<void> {
  void payload;
  throw new ContactBackendNotConfiguredError();
}

import { contactConfig } from "@/config/site";

export type ContactFormPayload = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

export class ContactBackendNotConfiguredError extends Error {
  constructor() {
    super("Nessun indirizzo email è configurato per il modulo contatti.");
    this.name = "ContactBackendNotConfiguredError";
  }
}

/**
 * Invio del modulo contatti.
 *
 * Il sito è pubblicato come export statico su GitHub Pages, quindi non c'è
 * un runtime server per inviare email. La richiesta viene quindi composta e
 * aperta nel client di posta dell'utente, già precompilata.
 *
 * Per passare a un invio in background (senza client di posta) basta
 * sostituire il corpo di questa funzione con una chiamata a un servizio
 * compatibile con l'export statico, ad esempio Formspree:
 *
 *   const res = await fetch("https://formspree.io/f/IL_TUO_ID", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json", Accept: "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!res.ok) throw new Error("Invio non riuscito");
 */
export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<void> {
  if (!contactConfig.email) {
    throw new ContactBackendNotConfiguredError();
  }

  const lines = [
    `Nome: ${payload.name}`,
    `Email: ${payload.email}`,
    `Tipologia di progetto: ${payload.projectType || "non indicata"}`,
    `Budget indicativo: ${payload.budget || "non indicato"}`,
    "",
    payload.message,
  ];

  const subject = `Nuova richiesta dal sito — ${payload.name}`;
  const href = `mailto:${contactConfig.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(lines.join("\n"))}`;

  window.location.href = href;
}

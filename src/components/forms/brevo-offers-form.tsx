"use client";

import Link from "next/link";
import { useState } from "react";

const formUrl = "https://4be9a605.sibforms.com/serve/MUIFAMZFJsB8k5EtqqFaoTexQhglMgR5DZvm3fwYLF0dwqHf4kzK-QQBwWMY2BPhIB3f_I3Jqe8IR-95v3KphJNn13vZOGM_z_XEYqTigyRfHGMnewfVWWXONDaophtL7CT2Y3VC_iZNCQEamL8IHOVGLPMQVgLl0lLh3i0bQqepVjCxlU9tCZCHVFZ7_UhGKcM911MZE-AST0Ew5A==";
const embedUrl = formUrl.replace("/serve/", "/v2/serve/");

export function BrevoOffersForm() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="offerte" aria-labelledby="offerte-title" className="panel mt-14 rounded-2xl border border-white/10 p-6 sm:p-8">
      <h2 id="offerte-title" className="text-2xl font-medium text-paper">Vuoi ricevere le offerte di CMA Enterprise?</h2>
      <p className="mt-3 max-w-xl leading-relaxed text-ink-300">Se ti interessa il restyling del tuo sito, puoi iscriverti alle offerte via email. L’iscrizione è facoltativa e diventa attiva dopo la conferma via email.</p>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-300">Il modulo è fornito da Brevo e si carica solo su richiesta. Leggi l’<Link href="/privacy/" className="text-paper underline underline-offset-4">informativa privacy</Link>.</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="button"
          aria-expanded={showForm}
          aria-controls="modulo-offerte"
          onClick={() => setShowForm((open) => !open)}
          className="rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {showForm ? "Nascondi il modulo" : "Carica il modulo Brevo"}
        </button>
        <a href={formUrl} referrerPolicy="no-referrer" className="py-2 text-sm text-paper underline underline-offset-4">Apri il modulo su Brevo</a>
      </div>
      <div id="modulo-offerte" hidden={!showForm} className="mt-5">
        {showForm && (
          <iframe
            title="Iscrizione alle offerte di CMA Enterprise"
            src={embedUrl}
            referrerPolicy="no-referrer"
            className="mx-auto block h-[620px] w-full max-w-[540px] rounded-xl border-0 bg-white sm:h-[485px]"
          />
        )}
      </div>
    </section>
  );
}

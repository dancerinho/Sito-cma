"use client";

import { FormEvent, useId, useState } from "react";
import { ChevronRight } from "lucide-react";
import { contactConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Barra a pillola con nome, email e invio. Il sito è statico: l'invio apre
 * l'app di posta con destinatario, oggetto e testo già compilati, e aggiunge
 * in fondo nome ed email scritti qui.
 */
export function QuickRequest({ className }: { className?: string }) {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const extra = [name.trim() && `Nome: ${name.trim()}`, email.trim() && `Email per la risposta: ${email.trim()}`]
      .filter(Boolean)
      .join("\n");
    const body = extra ? `${contactConfig.emailBody}\n${extra}\n` : contactConfig.emailBody;
    window.location.href = `mailto:${contactConfig.email}?subject=${encodeURIComponent(contactConfig.emailSubject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form
      onSubmit={submit}
      className={cn(
        "flex w-full max-w-[540px] items-center gap-1 rounded-full border border-white/[0.09] bg-[rgba(7,9,22,0.72)] p-1.5 pl-5 shadow-[0_20px_60px_-30px_rgba(40,70,255,0.6)]",
        className,
      )}
    >
      <label htmlFor={`${id}-name`} className="sr-only">
        Nome
      </label>
      <input
        id={`${id}-name`}
        name="name"
        autoComplete="name"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="min-w-0 flex-1 bg-transparent py-2 text-[13px] font-semibold text-paper outline-none placeholder:text-ink-200"
      />
      <span aria-hidden className="h-5 w-px shrink-0 bg-white/10" />
      <label htmlFor={`${id}-email`} className="sr-only">
        Email
      </label>
      <input
        id={`${id}-email`}
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="min-w-0 flex-1 bg-transparent py-2 pl-3 text-[13px] font-semibold text-paper outline-none placeholder:text-ink-200"
      />
      <button
        type="submit"
        className="btn-blue shrink-0 gap-2 py-1.5 pl-1.5 pr-1.5 sm:pr-4"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#3A52F5]">
          <ChevronRight size={15} strokeWidth={2.5} aria-hidden />
        </span>
        <span className="sr-only sm:not-sr-only">Invia richiesta</span>
      </button>
    </form>
  );
}

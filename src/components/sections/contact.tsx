"use client";

import { FormEvent, useState } from "react";
import { Loader2, TriangleAlert, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { contactConfig } from "@/config/site";
import {
  ContactBackendNotConfiguredError,
  submitContactForm,
} from "@/lib/contact";

const projectTypeOptions = [
  { value: "", label: "Seleziona una tipologia" },
  { value: "sito-landing", label: "Sito web / Landing page" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "web-app", label: "Web app / prodotto digitale" },
  { value: "software", label: "Software su misura" },
  { value: "automazioni", label: "Automazioni e integrazioni" },
  { value: "altro", label: "Altro" },
];

const budgetOptions = [
  { value: "", label: "Preferisco non specificarlo" },
  { value: "under-3k", label: "Sotto i 3.000 €" },
  { value: "3k-10k", label: "3.000 – 10.000 €" },
  { value: "10k-30k", label: "10.000 – 30.000 €" },
  { value: "over-30k", label: "Oltre 30.000 €" },
];

type FormValues = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  consent: boolean;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
  consent: false,
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type Status = "idle" | "submitting" | "not-configured" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Inserisci il tuo nome.";
  }

  if (!values.email.trim()) {
    errors.email = "Inserisci un indirizzo email.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Inserisci un indirizzo email valido.";
  }

  if (!values.projectType) {
    errors.projectType = "Seleziona la tipologia di progetto.";
  }

  if (!values.message.trim()) {
    errors.message = "Raccontaci brevemente il progetto.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Aggiungi qualche dettaglio in più (almeno 20 caratteri).";
  }

  if (!values.consent) {
    errors.consent = "Devi accettare il trattamento dei dati per inviare il modulo.";
  }

  return errors;
}

const inputStyles =
  "w-full rounded border bg-ink-900 px-4 py-3 text-sm text-paper placeholder:text-ink-400 transition-colors duration-200 focus-visible:outline-none";

export function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    try {
      await submitContactForm({
        name: values.name,
        email: values.email,
        projectType: values.projectType,
        budget: values.budget,
        message: values.message,
      });
      setStatus("idle");
    } catch (err) {
      if (err instanceof ContactBackendNotConfiguredError) {
        setStatus("not-configured");
      } else {
        setStatus("error");
      }
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section id="contatti" className="border-t border-ink-800 py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Contatti"
              title="Parliamo del tuo progetto."
              description="Compila il modulo con qualche dettaglio: obiettivo, tipologia di progetto e budget indicativo. Ti rispondiamo con una prima valutazione."
            />
            {contactConfig.email ? (
              <Reveal delay={0.12}>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm text-ink-200 transition-colors hover:text-paper"
                >
                  <Mail size={16} className="text-accent-light" aria-hidden />
                  {contactConfig.email}
                </a>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={0.1}>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-ink-200">
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={cn(
                      inputStyles,
                      errors.name
                        ? "border-red-400/70 focus-visible:border-red-400"
                        : "border-ink-700 focus-visible:border-accent-light",
                    )}
                  />
                  {errors.name ? (
                    <p id="name-error" role="alert" className="mt-2 text-xs text-red-400">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-ink-200">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(
                      inputStyles,
                      errors.email
                        ? "border-red-400/70 focus-visible:border-red-400"
                        : "border-ink-700 focus-visible:border-accent-light",
                    )}
                  />
                  {errors.email ? (
                    <p id="email-error" role="alert" className="mt-2 text-xs text-red-400">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="projectType" className="mb-2 block text-sm text-ink-200">
                    Tipologia di progetto
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={values.projectType}
                    onChange={(e) => updateField("projectType", e.target.value)}
                    aria-invalid={Boolean(errors.projectType)}
                    aria-describedby={errors.projectType ? "projectType-error" : undefined}
                    className={cn(
                      inputStyles,
                      "appearance-none",
                      errors.projectType
                        ? "border-red-400/70 focus-visible:border-red-400"
                        : "border-ink-700 focus-visible:border-accent-light",
                    )}
                  >
                    {projectTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.projectType ? (
                    <p
                      id="projectType-error"
                      role="alert"
                      className="mt-2 text-xs text-red-400"
                    >
                      {errors.projectType}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="budget" className="mb-2 block text-sm text-ink-200">
                    Budget indicativo{" "}
                    <span className="text-ink-400">(facoltativo)</span>
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={values.budget}
                    onChange={(e) => updateField("budget", e.target.value)}
                    className={cn(inputStyles, "appearance-none border-ink-700 focus-visible:border-accent-light")}
                  >
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-ink-200">
                  Messaggio
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  placeholder="Raccontaci obiettivo, contesto e tempistiche del progetto."
                  className={cn(
                    inputStyles,
                    "resize-none",
                    errors.message
                      ? "border-red-400/70 focus-visible:border-red-400"
                      : "border-ink-700 focus-visible:border-accent-light",
                  )}
                />
                {errors.message ? (
                  <p id="message-error" role="alert" className="mt-2 text-xs text-red-400">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={values.consent}
                    onChange={(e) => updateField("consent", e.target.checked)}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? "consent-error" : undefined}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-ink-600 bg-ink-900 text-accent focus-visible:outline-none"
                  />
                  <label htmlFor="consent" className="text-sm leading-relaxed text-ink-300">
                    Ho letto l&apos;
                    <a href="/privacy" className="text-ink-200 underline underline-offset-2 hover:text-paper">
                      informativa privacy
                    </a>{" "}
                    e acconsento al trattamento dei miei dati per essere ricontattato/a.
                  </label>
                </div>
                {errors.consent ? (
                  <p id="consent-error" role="alert" className="mt-2 text-xs text-red-400">
                    {errors.consent}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded bg-accent px-6 py-3.5 text-sm font-medium text-white shadow-glow transition-all duration-300 ease-premium hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" aria-hidden />
                ) : null}
                {isSubmitting ? "Invio in corso…" : "Invia richiesta"}
              </button>

              <div aria-live="polite">
                {status === "not-configured" ? (
                  <p className="flex items-start gap-2 rounded border border-accent-light/30 bg-accent-soft px-4 py-3 text-sm text-ink-100">
                    <TriangleAlert
                      size={16}
                      className="mt-0.5 shrink-0 text-accent-light"
                      aria-hidden
                    />
                    Il modulo è validato e pronto, ma l&apos;invio non è ancora
                    collegato a un servizio email. Nel frattempo scrivici
                    direttamente a{" "}
                    {contactConfig.email ? (
                      <a href={`mailto:${contactConfig.email}`} className="underline underline-offset-2">
                        {contactConfig.email}
                      </a>
                    ) : (
                      "il nostro indirizzo email"
                    )}
                    .
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="flex items-start gap-2 rounded border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                    <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden />
                    Si è verificato un errore imprevisto. Riprova tra qualche
                    istante.
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

import { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-ink-800 pb-24 pt-36 sm:pt-44">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-display-md font-display font-medium text-paper">
            {title}
          </h1>
          <p className="mt-3 text-sm text-ink-400">
            Ultimo aggiornamento: {updatedAt}
          </p>

          <div className="mt-6 rounded border border-accent-light/30 bg-accent-soft px-4 py-3 text-sm leading-relaxed text-ink-100">
            Questa è una bozza strutturale, da completare con i dati legali
            reali dell&apos;attività e da far verificare da un consulente
            legale/privacy prima della pubblicazione definitiva.
          </div>

          <div className="prose-legal mt-10 flex flex-col gap-8 text-sm leading-relaxed text-ink-300">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-lg font-medium text-paper">{title}</h2>
      <div className="mt-3 flex flex-col gap-3">{children}</div>
    </div>
  );
}

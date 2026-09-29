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
    <section className="pb-24 pt-32 sm:pt-44">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label">Documenti legali</p>
            <h1 className="mt-6 font-serif text-display-lg text-paper">{title}</h1>
            <p className="mt-4 font-mono text-xs text-ink-500">
              Ultimo aggiornamento: {updatedAt}
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="border-l-2 border-accent py-1 pl-4 text-sm leading-relaxed text-ink-300">
              Questa è una bozza strutturale, da completare con i dati legali
              reali dell&apos;attività e da far verificare da un consulente
              legale/privacy prima della pubblicazione definitiva.
            </div>

            <div className="mt-12 flex flex-col text-[15px] leading-relaxed text-ink-300">
              {children}
            </div>
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
    <div className="border-t border-ink-800 py-8">
      <h2 className="text-lg font-medium text-paper">{title}</h2>
      <div className="mt-3 flex flex-col gap-3">{children}</div>
    </div>
  );
}

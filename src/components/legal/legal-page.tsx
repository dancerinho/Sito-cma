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
    <section data-path="0.92" data-path-i="0.4" className="pb-24 pt-32 sm:pt-44">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h1 className="text-display-lg font-medium text-paper">{title}</h1>
            <p className="mt-4 font-mono text-[11px] text-ink-500">
              Ultimo aggiornamento: {updatedAt}
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="panel px-5 py-4 text-sm leading-relaxed text-ink-300">
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
    <div className="border-t border-white/[0.06] py-8">
      <h2 className="text-lg font-medium text-paper">{title}</h2>
      <div className="mt-3 flex flex-col gap-3">{children}</div>
    </div>
  );
}

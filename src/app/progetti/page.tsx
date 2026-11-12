import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Pagina spostata",
  robots: { index: false, follow: true },
  alternates: { canonical: "/portfolio/" },
};

/**
 * Indirizzo storico dei progetti. Il sito è statico (niente redirect lato server),
 * quindi il vecchio indirizzo rimanda con un meta refresh.
 */
export default function LegacyPage() {
  return (
    <section className="pb-24 pt-40">
      <meta httpEquiv="refresh" content="0; url=/portfolio/" />
      <Container>
        <p className="text-ink-300">
          Questa pagina è stata spostata.{" "}
          <Link href="/portfolio/" className="text-paper underline underline-offset-4">
            Vai agli ultimi lavori
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}

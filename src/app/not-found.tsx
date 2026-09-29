import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-end pb-20 pt-40">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
      <Container>
        <p className="label">
          <span className="text-accent">404</span> — Pagina non trovata
        </p>
        <h1 className="mt-8 max-w-4xl font-serif text-display-xl text-paper">
          Questa pagina non esiste, o non <span className="italic text-accent">più.</span>
        </h1>
        <Link href="/" className="btn-primary mt-12">
          Torna alla home
          <ArrowUpRight size={16} aria-hidden />
        </Link>
      </Container>
    </section>
  );
}

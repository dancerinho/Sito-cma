import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center pb-16 pt-32">
      <Container>
        <p className="text-sm text-ink-400">Errore 404</p>
        <h1 className="mt-4 max-w-4xl font-serif text-display-xl text-paper">
          Questa pagina non esiste, o non <span className="italic text-accent">più.</span>
        </h1>
        <Link href="/" className="btn-primary mt-12">
          Torna alla home
          <ArrowRight size={16} aria-hidden />
        </Link>
      </Container>
    </section>
  );
}

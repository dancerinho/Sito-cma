import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section data-path="page" className="flex min-h-[80svh] items-center pb-16 pt-32">
      <Container>
        <p className="tag">errore 404</p>
        <h1 className="mt-7 max-w-4xl text-display-xl font-medium text-paper">
          Questa pagina non esiste, o non <span className="font-serif text-[1.08em] font-normal italic">più.</span>
        </h1>
        <Link href="/" className="btn-primary mt-12">
          Torna alla home
          <ArrowRight size={16} aria-hidden />
        </Link>
      </Container>
    </section>
  );
}

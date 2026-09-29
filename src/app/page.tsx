import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { ServicesList } from "@/components/sections/services-list";
import { Steps } from "@/components/sections/steps";
import { FinalCta } from "@/components/sections/final-cta";
import { ScrollBand } from "@/components/ui/motion";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Home breve e lineare: chi siamo, cosa facciamo, come lavoriamo, contatto.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ScrollBand words={["Siti web", "Web app", "Software su misura", "Automazioni", "Manutenzione"]} />
      <ServicesList />
      <Steps
        action={
          <Link href="/studio/" className="btn-ghost group">
            Chi siamo
            <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />
      <FinalCta />
    </>
  );
}

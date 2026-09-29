import { Hero } from "@/components/sections/hero";
import { ServicesIndex } from "@/components/sections/home/services-index";
import { MethodStrip } from "@/components/sections/home/method-strip";
import { Presentation } from "@/components/sections/presentation";
import { FinalCta } from "@/components/sections/final-cta";

/**
 * Home come sommario: cinematica del marchio, indice dei servizi, metodo in
 * breve, principi e contatto. I contenuti estesi vivono nelle pagine del menu.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ServicesIndex />
      <MethodStrip />
      <Presentation />
      <FinalCta />
    </>
  );
}

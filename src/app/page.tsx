import { Hero } from "@/components/sections/hero";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { Overview } from "@/components/sections/overview";
import { Presentation } from "@/components/sections/presentation";
import { FinalCta } from "@/components/sections/final-cta";

/**
 * Home volutamente corta: cinematica del marchio, panoramica a schede e
 * invito al contatto. I contenuti estesi vivono nelle pagine del menu.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <Overview />
      <Presentation />
      <FinalCta />
    </>
  );
}

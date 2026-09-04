import { Hero } from "@/components/sections/hero";
import { Presentation } from "@/components/sections/presentation";
import { Services } from "@/components/sections/services";
import { Method } from "@/components/sections/method";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { FinalCta } from "@/components/sections/final-cta";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Presentation />
      <Services />
      <Method />
      <Skills />
      <Projects />
      <FinalCta />
      <Contact />
    </>
  );
}

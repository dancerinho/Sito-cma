import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { Presentation } from "@/components/sections/presentation";
import { FinalCta } from "@/components/sections/final-cta";
import { navItems } from "@/config/site";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Chi è CMA Enterprise e come lavora: metodo, competenze e tipologie di progetto seguite dallo studio.",
};

const studioGroup = navItems.find((item) => item.label === "Studio");

export default function StudioPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Studio"
        title="Come lavoriamo, cosa sappiamo fare, cosa *costruiamo.*"
        description="Tre pagine per conoscere lo studio: il metodo, le competenze e le tipologie di progetto."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <ul className="border-t border-ink-800">
            {studioGroup?.children?.map((child, i) => (
              <Reveal as="li" key={child.href} delay={i * 0.06} className="border-b border-ink-800">
                <Link
                  href={child.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-8 sm:gap-x-8 md:grid-cols-12 md:py-10"
                >
                  <span className="font-mono text-xs text-ink-500 group-hover:text-accent md:col-span-1">
                    02.{i + 1}
                  </span>
                  <span className="font-serif text-4xl leading-none text-paper transition-transform duration-500 ease-out group-hover:translate-x-2 sm:text-5xl md:col-span-5">
                    {child.label}
                  </span>
                  <span className="col-start-2 mt-3 text-sm leading-relaxed text-ink-400 md:col-span-5 md:col-start-auto md:mt-0">
                    {child.description}
                  </span>
                  <ArrowUpRight
                    size={22}
                    aria-hidden
                    className="col-start-3 row-start-1 text-ink-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:col-start-12 md:justify-self-end"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <Presentation index="02.4" />
      <FinalCta />
    </>
  );
}

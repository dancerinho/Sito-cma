import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FinalCta } from "@/components/sections/final-cta";
import { Container } from "@/components/ui/container";
import { portfolioProjects, type PortfolioProject } from "@/config/portfolio";

export const metadata: Metadata = {
  title: "Ultimi lavori",
  description: "Siti pubblicati e anteprime navigabili dei progetti di CMA Enterprise.",
  alternates: { canonical: "/portfolio/" },
};

function ProjectCard({ project }: { project: PortfolioProject }) {
  const action = project.kind === "Sito pubblicato" ? "Visita il sito" : "Apri l’anteprima";

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={project.title + " — " + action + " (nuova scheda)"}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-950/90 transition-colors hover:border-accent/45"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.08]">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 360px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.035]"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-2 p-5">
        <p className="text-xs text-ink-300">
          {project.sector} <span aria-hidden>·</span> <span className="text-accent">{project.kind}</span>
        </p>
        <h2 className="text-xl font-medium leading-snug text-paper">{project.title}</h2>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-ink-200 group-hover:text-accent">
          {action}
          <ArrowUpRight size={15} aria-hidden />
        </span>
      </div>
    </a>
  );
}

export default function PortfolioPage() {
  return (
    <>
      <section data-path="page" className="pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-40">
        <Container>
          <header className="mb-8 sm:mb-12">
            <h1 className="text-balance text-display-xl font-medium text-paper">
              Ultimi <em className="font-serif font-normal italic">lavori.</em>
            </h1>
            <p className="mt-4 max-w-[28ch] text-base leading-relaxed text-ink-300 sm:max-w-md sm:text-lg">
              Siti pubblicati e anteprime da esplorare.
            </p>
          </header>
          <ul aria-label="Progetti" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {portfolioProjects.map((project) => (
              <li key={project.id} className="min-w-0">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}

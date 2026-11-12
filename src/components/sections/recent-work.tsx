import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { portfolioProjects, type PortfolioProject } from "@/config/portfolio";

export function RecentWork() {
  const featured = portfolioProjects.filter(
    (project): project is PortfolioProject & { featuredImage: string } => Boolean(project.featuredImage),
  );
  if (!featured.length) return null;

  return (
    <section id="ultimi-lavori" aria-labelledby="ultimi-lavori-titolo" className="panel min-w-0 p-4 sm:p-5 lg:col-span-7">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 sm:mb-4">
        <h2 id="ultimi-lavori-titolo" className="text-xl font-medium tracking-tight text-paper sm:text-2xl">
          Ultimi lavori
        </h2>
        <Link href="/portfolio/" className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
          Tutti i lavori
          <ArrowRight size={15} aria-hidden className="transition-transform motion-safe:group-hover:translate-x-0.5" />
        </Link>
      </div>
      <ul className="recent-work-panels">
        {featured.map((project) => {
          const action = project.kind === "Sito pubblicato" ? "Visita " : "Apri l’anteprima di ";

          return (
            <li key={project.id}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={action + project.title + " (nuova scheda)"}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-950 transition-colors hover:border-accent/50"
              >
                <div className="relative h-36 shrink-0 overflow-hidden border-b border-white/10 sm:h-44 lg:h-52">
                  <Image
                    src={project.featuredImage}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 190px, (min-width: 640px) 25vw, 50vw"
                    className="object-cover object-center"
                  />
                  <span aria-hidden className="absolute right-2 top-2 grid size-7 place-items-center rounded-full border border-white/20 bg-ink-1000/80 text-paper transition-colors group-hover:text-accent">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
                <div className="flex min-h-[4.25rem] flex-1 flex-col gap-1 px-2.5 py-2.5 sm:min-h-[5.5rem]">
                  <span className="text-[11px] font-medium leading-3 text-accent">
                    {project.sector === "E-commerce" ? project.sector : project.kind}
                  </span>
                  <h3 className="break-words text-[13px] font-medium leading-4 text-paper">{project.title}</h3>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

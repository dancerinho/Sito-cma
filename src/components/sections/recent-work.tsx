import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { portfolioProjects } from "@/config/portfolio";

export function RecentWork() {
  const [lead, ...previews] = portfolioProjects.filter((project) => project.featured);
  if (!lead) return null;

  return (
    <section id="ultimi-lavori" aria-labelledby="ultimi-lavori-titolo" className="panel min-w-0 p-4 sm:p-5 lg:col-span-6">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 sm:mb-4">
        <h2 id="ultimi-lavori-titolo" className="text-xl font-medium tracking-tight text-paper sm:text-2xl">
          Ultimi lavori
        </h2>
        <Link href="/portfolio/" className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
          Tutti i lavori
          <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <a
        href={lead.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={"Visita " + lead.title + " (nuova scheda)"}
        className="group relative isolate flex min-h-[9rem] items-end overflow-hidden rounded-xl border border-white/10 bg-ink-950 sm:min-h-[12.5rem]"
      >
        <Image
          src={lead.image}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 520px, calc(100vw - 64px)"
          className="-z-10 object-cover object-center transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
        />
        <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-1000 via-ink-1000/25 to-transparent" />
        <div className="flex w-full items-end justify-between gap-3 px-4 pb-4 pt-12 sm:px-5 sm:pb-5">
          <div>
            <span className="text-xs font-medium text-accent">{lead.kind}</span>
            <h3 className="mt-1 text-lg font-medium text-paper sm:text-xl">{lead.title}</h3>
          </div>
          <ArrowUpRight size={19} aria-hidden className="mb-0.5 shrink-0 text-paper transition-colors group-hover:text-accent" />
        </div>
      </a>
      <ul className="mt-2 grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
        {previews.map((project) => (
          <li key={project.id} className="min-w-0">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={"Apri l’anteprima di " + project.title + " (nuova scheda)"}
              className="group flex h-full min-w-0 items-center gap-2.5 rounded-xl border border-white/[0.08] px-2 py-2 transition-colors hover:bg-white/[0.06]"
            >
              <Image src={project.image} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-medium leading-snug text-paper sm:text-sm">{project.title}</h3>
                <p className="mt-0.5 text-[11px] text-ink-300">{project.kind}</p>
              </div>
              <ArrowUpRight size={14} aria-hidden className="hidden shrink-0 text-ink-300 group-hover:text-accent sm:block" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

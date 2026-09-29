import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/social-icons";
import {
  contactConfig,
  footerNavItems,
  siteConfig,
  socialLinks,
} from "@/config/site";
import { Logo } from "@/components/brand/logo";

const socialIcons = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  github: GithubIcon,
} as const;

export function Footer() {
  const year = new Date().getFullYear();
  const activeSocials = Object.entries(socialLinks).filter(([, url]) => url);

  return (
    <footer className="relative overflow-hidden border-t border-ink-800">
      <Container className="pt-16 sm:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-400">
              Siti, web app, software e automazioni su misura, dalla strategia
              al lancio.
            </p>
            {activeSocials.length > 0 ? (
              <div className="mt-6 flex items-center gap-4">
                {activeSocials.map(([key, url]) => {
                  const Icon = socialIcons[key as keyof typeof socialIcons];
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={key}
                      className="text-ink-400 transition-colors hover:text-paper"
                    >
                      <Icon width={18} height={18} />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h2 className="label">Pagine</h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-300 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="label">Contatti</h2>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-ink-300">
              <li>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-paper"
                >
                  {contactConfig.email}
                  <ArrowUpRight size={14} aria-hidden className="text-ink-500 group-hover:text-accent" />
                </a>
              </li>
              {contactConfig.phone ? (
                <li>
                  <a href={`tel:${contactConfig.phone}`} className="transition-colors hover:text-paper">
                    {contactConfig.phone}
                  </a>
                </li>
              ) : null}
              {contactConfig.location ? <li>{contactConfig.location}</li> : null}
            </ul>
          </div>
        </div>

        {/* Firma a tutta larghezza: il nome come elemento grafico. */}
        <p
          aria-hidden
          className="mt-20 select-none whitespace-nowrap font-serif text-[min(16.8vw,15.2rem)] leading-[0.8] tracking-[-0.04em] text-ink-850"
        >
          CMA Enterprise
        </p>

        <div className="flex flex-col gap-3 border-t border-ink-800 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-paper">
              Privacy
            </Link>
            <Link href="/cookie-policy" className="transition-colors hover:text-paper">
              Cookie
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

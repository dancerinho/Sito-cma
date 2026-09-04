import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/social-icons";
import {
  contactConfig,
  navItems,
  siteConfig,
  socialLinks,
} from "@/config/site";

const socialIcons = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  github: GithubIcon,
} as const;

export function Footer() {
  const year = new Date().getFullYear();
  const activeSocials = Object.entries(socialLinks).filter(([, url]) => url);

  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <span className="font-display text-lg font-semibold tracking-tight text-paper">
              {siteConfig.name}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-ink-300">
              {siteConfig.tagline} Progettiamo e sviluppiamo siti, software e
              prodotti digitali su misura, dalla strategia al lancio.
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

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-ink-400">
              Navigazione
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-ink-300 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-ink-400">
              Contatti
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-ink-300">
              {contactConfig.email ? (
                <li>
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="transition-colors hover:text-paper"
                  >
                    {contactConfig.email}
                  </a>
                </li>
              ) : null}
              {contactConfig.phone ? (
                <li>
                  <a
                    href={`tel:${contactConfig.phone}`}
                    className="transition-colors hover:text-paper"
                  >
                    {contactConfig.phone}
                  </a>
                </li>
              ) : null}
              {contactConfig.location ? <li>{contactConfig.location}</li> : null}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-800 pt-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-paper">
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              className="transition-colors hover:text-paper"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

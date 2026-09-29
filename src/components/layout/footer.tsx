import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/icons/social-icons";
import { contactConfig, contactLinks, navItems, siteConfig, socialLinks } from "@/config/site";
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
    <footer className="border-t border-ink-800">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-400">
            Siti web, web app, software e automazioni su misura.
          </p>
        </div>

        <nav aria-label="Navigazione secondaria">
          <ul className="-my-2 flex flex-wrap gap-x-6 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-3 text-ink-300 transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={contactLinks.mailto}
                className="inline-block py-3 text-ink-300 transition-colors hover:text-paper"
              >
                {contactConfig.email}
              </a>
            </li>
            <li>
              <a
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 text-ink-300 transition-colors hover:text-paper"
              >
                <WhatsappIcon width={15} height={15} />
                WhatsApp
              </a>
            </li>
          </ul>
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
        </nav>
      </Container>

      <Container className="flex flex-col gap-1 border-t border-ink-800 py-4 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.name}
        </p>
        <div className="-mx-2 flex">
          <Link href="/privacy/" className="inline-block px-2 py-3 transition-colors hover:text-paper">
            Privacy Policy
          </Link>
          <Link href="/cookie-policy/" className="inline-block px-2 py-3 transition-colors hover:text-paper">
            Cookie Policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}

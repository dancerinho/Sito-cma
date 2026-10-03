import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { contactConfig, contactLinks, navItems, services, siteConfig, socialLinks } from "@/config/site";

const strip = [
  "prima valutazione senza impegno",
  "un unico team, dall'idea alla messa online",
  "ogni progetto parte da zero",
];

export function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "navigazione",
      links: [{ label: "Home", href: "/" }, ...navItems],
    },
    {
      title: "servizi",
      links: services.map((s) => ({ label: s.title, href: `/servizi/#${s.id}` })),
    },
    {
      title: "contatti",
      links: [
        { label: contactConfig.email, href: contactLinks.mailto },
        { label: contactConfig.phone, href: contactLinks.tel },
        { label: "WhatsApp", href: contactLinks.whatsapp, external: true },
        ...(socialLinks.instagram ? [{ label: "Instagram", href: socialLinks.instagram, external: true }] : []),
        ...(socialLinks.tiktok ? [{ label: "TikTok", href: socialLinks.tiktok, external: true }] : []),
      ],
    },
  ];

  return (
    <footer data-path="0.97" data-path-i="0.45" className="relative">
      <Container>
        <ul className="hidden flex-col gap-2 border-y border-white/[0.06] py-5 font-mono text-[11px] text-ink-400 md:flex md:flex-row md:justify-between">
          {strip.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent))]" />
              {item}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/[0.06] py-10 md:grid-cols-12 md:border-t-0 md:py-14">
          <div className="col-span-2 md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              Siti web, web app, software e automazioni su misura.
            </p>
          </div>

          {columns.map((col) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className={col.title === "servizi" ? "hidden md:col-span-3 md:block" : "md:col-span-2 md:last:col-span-3"}
            >
              <p className="font-mono text-[11px] text-ink-500">{col.title}</p>
              <ul className="mt-3 flex flex-col">
                {col.links.map((link) => {
                  const external = "external" in link && link.external;
                  const cls = "inline-block py-1.5 text-sm text-ink-300 transition-colors hover:text-paper break-all";
                  return (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link href={link.href} className={cls}>
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className={cls}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-1 border-t border-white/[0.06] py-5 font-mono text-[11px] text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <div className="-mx-2 flex">
            <Link href="/privacy/" className="inline-block px-2 py-3 transition-colors hover:text-paper">
              privacy policy
            </Link>
            <Link href="/cookie-policy/" className="inline-block px-2 py-3 transition-colors hover:text-paper">
              cookie policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

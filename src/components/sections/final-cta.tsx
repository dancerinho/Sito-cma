import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, SlideHeading } from "@/components/ui/motion";
import { Logo } from "@/components/brand/logo";
import { LogoMark } from "@/components/brand/logo-mark";
import { InstagramIcon, TiktokIcon, WhatsappIcon } from "@/components/icons/social-icons";
import { contactConfig, contactLinks, socialLinks } from "@/config/site";

const socials = [
  { label: "Instagram", href: socialLinks.instagram, icon: InstagramIcon },
  { label: "TikTok", href: socialLinks.tiktok, icon: TiktokIcon },
].filter((s) => s.href);

/**
 * Chiusura di pagina: a sinistra il marchio e i social, a destra il blocco
 * colorato con l'invito a scriverci.
 */
export function FinalCta() {
  return (
    <section data-path="0.5" data-path-w="0.42" className="pb-8 pt-4 sm:pb-10 sm:pt-20 lg:pt-28">
      <Container className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Reveal from="left" className="hidden md:block lg:col-span-5">
          <div className="panel relative flex h-full min-h-[300px] flex-col overflow-hidden p-7 sm:p-8">
            <LogoMark className="pointer-events-none absolute -right-12 -top-10 h-72 w-72 opacity-[0.1]" />
            <Logo />
            <p className="mt-auto max-w-xs pt-16 text-lg leading-snug text-ink-200">
              Siti web, web app, software e automazioni su misura.
            </p>
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
              <span className="font-mono text-[11px] text-ink-500">seguici</span>
              <div className="flex gap-2">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} di CMA Enterprise`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-ink-300 transition-colors hover:border-white/20 hover:text-paper"
                  >
                    <Icon width={16} height={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal from="right" delay={0.1} className="lg:col-span-7">
          <div className="dot-grid relative flex h-full flex-col overflow-hidden rounded-3xl bg-accent p-6 text-accent-ink sm:p-10">
            <p className="font-mono text-[11px] lowercase text-accent-ink/60">prossimo passo</p>
            <SlideHeading
              text="Hai un progetto in mente? *Parliamone.*"
              italicClassName="text-accent-ink/60"
              className="mt-5 max-w-xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.04em]"
            />
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-accent-ink/70">
              Ti rispondiamo con una prima valutazione, senza impegno.
            </p>

            <div className="mt-auto flex flex-col gap-3 pt-8 sm:pt-10">
              <a
                href={contactLinks.mailto}
                className="group flex items-center justify-between gap-3 rounded-full bg-white p-1.5 pl-5 shadow-[0_20px_40px_-20px_rgba(3,18,26,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="flex min-w-0 items-center gap-2.5 text-sm text-ink-500">
                  <Mail size={15} aria-hidden className="shrink-0" />
                  <span className="truncate">{contactConfig.email}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2 rounded-full bg-accent-ink px-4 py-2.5 text-[13px] font-medium text-white">
                  Scrivici
                  <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
              <a
                href={contactLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent-ink/15 px-5 py-3 text-[13px] font-medium transition-colors hover:bg-accent-ink/[0.06] sm:self-start"
              >
                <WhatsappIcon width={15} height={15} />
                Oppure su WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

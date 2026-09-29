import { ReactNode } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { WhatsappIcon } from "@/components/icons/social-icons";
import { contactConfig, contactLinks } from "@/config/site";

/**
 * Due soli contatti, grandi e cliccabili: l'email apre l'app di posta del
 * visitatore già indirizzata, il numero apre WhatsApp col messaggio pronto.
 */
function ContactLink({
  href,
  external,
  icon,
  label,
  value,
  accent,
  line,
}: {
  href: string;
  external?: boolean;
  icon: ReactNode;
  label: string;
  value: string;
  accent: string;
  line: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-block max-w-full py-2"
    >
      <span className="flex items-center gap-2 text-sm text-ink-400">
        <span className={accent}>{icon}</span>
        {label}
      </span>
      <span className="mt-3 flex items-center gap-3">
        <span className="relative font-serif text-[clamp(1.6rem,6.5vw,4.5rem)] leading-none text-paper">
          {value}
          {/* Sottolineatura che si disegna al passaggio del mouse. */}
          <span
            aria-hidden
            className={`absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 ${line}`}
          />
        </span>
        <ArrowUpRight
          aria-hidden
          className="h-7 w-7 shrink-0 text-ink-500 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-paper sm:h-10 sm:w-10"
        />
      </span>
    </a>
  );
}

export function Contact() {
  return (
    <section className="pb-20 sm:pb-32">
      <Container className="flex flex-col gap-14 sm:gap-20">
        <Reveal from="left" distance={120}>
          <ContactLink
            href={contactLinks.mailto}
            icon={<Mail size={16} aria-hidden />}
            label="Email"
            value={contactConfig.email}
            accent="text-accent"
            line="bg-accent"
          />
        </Reveal>

        <Reveal from="right" distance={120} delay={0.1}>
          <ContactLink
            href={contactLinks.whatsapp}
            external
            icon={<WhatsappIcon width={16} height={16} />}
            label="WhatsApp"
            value={contactConfig.phone}
            accent="text-[#25D366]"
            line="bg-[#25D366]"
          />
        </Reveal>
      </Container>
    </section>
  );
}

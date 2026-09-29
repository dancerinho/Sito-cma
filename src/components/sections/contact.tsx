import { Check, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { CopyButton } from "@/components/ui/copy-button";
import { WhatsappIcon } from "@/components/icons/social-icons";
import { contactConfig, contactLinks } from "@/config/site";

/**
 * Il sito è statico e non ha un backend per ricevere messaggi: il contatto
 * avviene via email o WhatsApp, con destinatario e testo già precompilati.
 */
const briefPoints = [
  "Cosa vuoi realizzare e per chi",
  "Il tipo di progetto: sito, web app, software o automazione",
  "Le tempistiche che hai in mente",
  "Un budget indicativo, se ne hai già uno",
];

const webmail = [
  { label: "Apri in Gmail", href: contactLinks.gmail },
  { label: "Apri in Outlook", href: contactLinks.outlook },
];

export function Contact() {
  return (
    <section className="pb-16 sm:pb-24">
      <Container className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Reveal from="left" className="flex flex-col border border-ink-800 p-7 sm:p-9">
          <Mail size={24} strokeWidth={1.5} aria-hidden className="text-accent" />
          <h2 className="mt-5 font-serif text-display-md text-paper">Scrivici una email</h2>
          <p className="mt-3 leading-relaxed text-ink-300">
            Si apre un nuovo messaggio già indirizzato a{" "}
            <span className="whitespace-nowrap text-paper">{contactConfig.email}</span>: ti basta
            completarlo e inviarlo.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a href={contactLinks.mailto} className="btn-primary">
              <Mail size={16} aria-hidden />
              Scrivi con la tua app di posta
            </a>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {webmail.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <CopyButton value={contactConfig.email} label="Copia indirizzo email" />
          </div>
        </Reveal>

        <Reveal from="right" delay={0.1} className="flex flex-col border border-ink-800 p-7 sm:p-9">
          <WhatsappIcon width={24} height={24} className="text-[#25D366]" />
          <h2 className="mt-5 font-serif text-display-md text-paper">Scrivici su WhatsApp</h2>
          <p className="mt-3 leading-relaxed text-ink-300">
            Si apre la chat con il messaggio già pronto: “
            {contactConfig.whatsappMessage}”. Premi invio e ti rispondiamo.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-[#25D366] text-ink-950 hover:bg-[#1ebe5a]"
            >
              <WhatsappIcon width={18} height={18} />
              Apri WhatsApp
            </a>
            <a href={contactLinks.tel} className="btn-ghost">
              <Phone size={16} aria-hidden />
              Chiama il {contactConfig.phone}
            </a>
          </div>
        </Reveal>

        <Reveal from="left" delay={0.15} className="md:col-span-2 border border-ink-800 p-7 sm:p-9">
          <h2 className="font-serif text-2xl text-paper">Cosa scriverci</h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {briefPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-ink-200">
                <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-accent" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

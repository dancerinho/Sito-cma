"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { easeOut } from "@/components/ui/motion";
import { InstagramIcon, TiktokIcon, WhatsappIcon } from "@/components/icons/social-icons";
import { contactConfig, contactLinks, socialLinks } from "@/config/site";

/**
 * Pagina contatti: banner con la cinematica del marchio e titolo
 * incorniciato, poi tre canali affiancati e divisi da filetti verticali.
 * Il sito è statico: nessun modulo, solo link già precompilati.
 */

type Channel = {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
  href: string;
  external?: boolean;
};

const socials = [
  { label: "Instagram", href: socialLinks.instagram, icon: InstagramIcon },
  { label: "TikTok", href: socialLinks.tiktok, icon: TiktokIcon },
];

const channels: Channel[] = [
  {
    icon: <Smartphone size={26} strokeWidth={1.4} aria-hidden />,
    label: "Telefono",
    value: contactConfig.phone,
    hint: "Tocca per chiamare",
    href: contactLinks.tel,
  },
  {
    icon: <WhatsappIcon width={26} height={26} />,
    label: "WhatsApp",
    value: contactConfig.phone,
    hint: "Messaggio già pronto da inviare",
    href: contactLinks.whatsapp,
    external: true,
  },
  {
    icon: <Mail size={26} strokeWidth={1.4} aria-hidden />,
    label: "Email",
    value: contactConfig.email,
    hint: "Si apre la tua app di posta",
    href: contactLinks.mailto,
  },
];

export function ContactBanner() {
  const reduce = useReducedMotion();

  return (
    <section className="px-3 pt-16 sm:px-5">
      <div className="relative flex h-[42svh] min-h-[260px] items-center justify-center overflow-hidden rounded-lg border border-ink-800 bg-ink-900 sm:h-[52svh]">
        <motion.video
          aria-hidden
          initial={{ scale: reduce ? 1 : 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: easeOut }}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/cinematic-poster.jpg"
        >
          <source src="/media/cinematic.mp4" type="video/mp4" />
        </motion.video>
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,11,13,0.35),rgba(10,11,13,0.85))]" />

        {/* Titolo incorniciato: la cornice si disegna, poi entra il testo. */}
        <div className="relative px-6 py-3 sm:px-10 sm:py-4">
          <motion.span
            aria-hidden
            initial={{ scaleX: reduce ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
            className="absolute inset-x-0 top-0 h-[2px] origin-left bg-paper"
          />
          <motion.span
            aria-hidden
            initial={{ scaleX: reduce ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
            className="absolute inset-x-0 bottom-0 h-[2px] origin-right bg-paper"
          />
          <motion.span
            aria-hidden
            initial={{ scaleY: reduce ? 1 : 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: easeOut }}
            className="absolute inset-y-0 left-0 w-[2px] origin-bottom bg-paper"
          />
          <motion.span
            aria-hidden
            initial={{ scaleY: reduce ? 1 : 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: easeOut }}
            className="absolute inset-y-0 right-0 w-[2px] origin-top bg-paper"
          />
          <motion.h1
            initial={{ opacity: 0, letterSpacing: reduce ? "0.18em" : "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.18em" }}
            transition={{ duration: 1.2, delay: 0.5, ease: easeOut }}
            className="text-2xl font-semibold uppercase text-paper sm:text-4xl"
          >
            Contatti
          </motion.h1>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const reduce = useReducedMotion();

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="text-center font-serif text-3xl italic text-accent sm:text-4xl"
        >
          Parliamo del tuo progetto!
        </motion.p>

        <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-1 sm:mt-16 md:grid-cols-3">
          {channels.map((channel, i) => (
            <motion.li
              key={channel.label}
              initial={{ opacity: 0, x: reduce ? 0 : (i - 1) * 60, y: reduce || i !== 1 ? 0 : 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: easeOut }}
              className="relative"
            >
              {/* Filetto divisorio: orizzontale su telefono, verticale da tablet. */}
              {i > 0 ? (
                <>
                  <motion.span
                    aria-hidden
                    initial={{ scaleX: reduce ? 1 : 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: easeOut }}
                    className="absolute inset-x-10 top-0 h-px bg-accent/70 md:hidden"
                  />
                  <motion.span
                    aria-hidden
                    initial={{ scaleY: reduce ? 1 : 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: easeOut }}
                    className="absolute inset-y-0 left-0 hidden w-px bg-accent/70 md:block"
                  />
                </>
              ) : null}

              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center px-6 py-10 text-center md:py-6"
              >
                <span className="text-accent transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110">
                  {channel.icon}
                </span>
                <span className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {channel.label}
                </span>
                <span className="relative mt-3 text-paper">
                  {channel.value}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-center scale-x-0 bg-paper transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </span>
                <span className="mt-3 text-xs text-ink-400">{channel.hint}</span>
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: easeOut }}
          className="mt-16 text-center sm:mt-24"
        >
          <p className="text-sm font-semibold uppercase leading-loose tracking-[0.14em] text-ink-200">
            Hai domande o un progetto in mente?
            <br />
            Non esitare a scriverci.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full max-w-xs bg-[#25D366] text-ink-950 hover:bg-[#1ebe5a] sm:w-auto"
            >
              <WhatsappIcon width={18} height={18} />
              Scrivici su WhatsApp
            </a>
            <a href={contactLinks.mailto} className="btn-ghost w-full max-w-xs sm:w-auto">
              <Mail size={16} aria-hidden />
              Invia una email
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mt-20 text-center sm:mt-28"
        >
          <p className="font-serif text-3xl italic text-accent sm:text-4xl">Seguici!</p>
          <ul className="mt-8 flex justify-center gap-4">
            {socials.map(({ label, href, icon: Icon }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 + i * 0.1 }}
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} di CMA Enterprise`}
                  className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent text-ink-950 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-paper"
                >
                  <Icon width={24} height={24} />
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}

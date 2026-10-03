"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { easeOut } from "@/components/ui/motion";
import { InstagramIcon, TiktokIcon, WhatsappIcon } from "@/components/icons/social-icons";
import { contactConfig, contactLinks, socialLinks } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Canali di contatto: tre card affiancate, la centrale (WhatsApp) nel
 * colore d'accento. Il sito è statico: nessun modulo, solo link già
 * precompilati.
 */

type Channel = {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
  href: string;
  external?: boolean;
  featured?: boolean;
};

const channels: Channel[] = [
  {
    icon: <Smartphone size={22} strokeWidth={1.5} aria-hidden />,
    label: "telefono",
    value: contactConfig.phone,
    hint: "Tocca per chiamare",
    href: contactLinks.tel,
  },
  {
    icon: <WhatsappIcon width={22} height={22} />,
    label: "whatsapp",
    value: contactConfig.phone,
    hint: "Messaggio già pronto da inviare",
    href: contactLinks.whatsapp,
    external: true,
    featured: true,
  },
  {
    icon: <Mail size={22} strokeWidth={1.5} aria-hidden />,
    label: "email",
    value: contactConfig.email,
    hint: "Si apre la tua app di posta",
    href: contactLinks.mailto,
  },
];

const socials = [
  { label: "Instagram", href: socialLinks.instagram, icon: InstagramIcon },
  { label: "TikTok", href: socialLinks.tiktok, icon: TiktokIcon },
].filter((s) => s.href);

export function Contact() {
  const reduce = useReducedMotion();

  return (
    <section data-path="0.5" data-path-w="0.4" className="pb-16 sm:pb-28 lg:pb-36">
      <Container>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
          {channels.map((channel, i) => (
            <motion.li
              key={channel.label}
              initial={{ opacity: 0, x: reduce ? 0 : (i - 1) * 80, y: reduce || i !== 1 ? 0 : 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.6 + i * 0.1, ease: easeOut }}
            >
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl p-5 transition-transform duration-500 ease-out hover:-translate-y-1 sm:min-h-[260px] sm:p-7",
                  channel.featured ? "dot-grid bg-accent text-accent-ink" : "panel text-paper",
                )}
              >
                <span className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl",
                      channel.featured ? "bg-accent-ink text-accent" : "border border-white/[0.08] bg-white/[0.03] text-accent",
                    )}
                  >
                    {channel.icon}
                  </span>
                  <ArrowUpRight
                    size={20}
                    aria-hidden
                    className={cn(
                      "transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                      channel.featured ? "text-accent-ink/60" : "text-ink-500",
                    )}
                  />
                </span>
                <span className={cn("mt-auto pt-6 font-mono text-[11px] sm:pt-12", channel.featured ? "text-accent-ink/60" : "text-ink-500")}>
                  {channel.label}
                </span>
                <span className="mt-2 break-all text-xl font-medium tracking-tight sm:text-2xl">{channel.value}</span>
                <span className={cn("mt-2 text-sm", channel.featured ? "text-accent-ink/70" : "text-ink-400")}>
                  {channel.hint}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        {socials.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: easeOut }}
            className="panel mt-4 flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center"
          >
            <div>
              <p className="font-mono text-[11px] text-ink-500">social</p>
              <p className="mt-2 text-xl font-medium tracking-tight text-paper">
                Seguici, <span className="font-serif text-[1.1em] font-normal italic">anche lì.</span>
              </p>
            </div>
            <ul className="flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} di CMA Enterprise`}
                    className="flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm text-ink-200 transition-colors hover:border-white/20 hover:text-paper"
                  >
                    <Icon width={16} height={16} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </Container>
    </section>
  );
}

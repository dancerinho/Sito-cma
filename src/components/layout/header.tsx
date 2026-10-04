"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { contactConfig, contactLinks, navItems, siteConfig, socialLinks } from "@/config/site";
import { LogoMark } from "@/components/brand/logo-mark";
import { easeOut } from "@/components/ui/motion";
import { setScrollLocked } from "@/components/fx/smooth-scroll";
import { InstagramIcon, TiktokIcon, WhatsappIcon } from "@/components/icons/social-icons";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrollLocked(isMenuOpen);
    return () => setScrollLocked(false);
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) => pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:text-ink-950"
      >
        Vai al contenuto principale
      </a>

      {/* Tre pillole centrate: marchio, navigazione e richiesta. Su telefono
          restano marchio e menu. */}
      <header className="site-header fixed inset-x-0 top-0 z-50">
        <nav
          className={cn(
            "mx-auto flex max-w-content items-center justify-between gap-2 px-4 pt-3 transition-[padding] duration-500 sm:px-8 md:justify-center md:pt-5",
            isScrolled && "md:pt-3",
          )}
          aria-label="Navigazione principale"
        >
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="pill group flex h-10 items-center gap-2 pl-2.5 pr-4 text-[13px] font-bold tracking-tight text-paper"
          >
            <LogoMark className="h-6 w-6 transition-transform duration-700 ease-out group-hover:rotate-[72deg]" />
            {siteConfig.name}
          </Link>

          <ul className="pill hidden h-10 items-center px-2 md:flex">
            {[{ label: "Home", href: "/" }, ...navItems].map((item) => {
              const current = item.href === "/" ? pathname === "/" : isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "inline-block rounded-full px-3.5 py-2 text-[13px] font-bold transition-colors duration-200",
                      current ? "text-paper" : "text-ink-300 hover:text-paper",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link href="/contatti/" className="btn-blue hidden h-10 gap-2 px-5 py-0 md:inline-flex">
            Richiedi un preventivo
            <span aria-hidden className="h-1 w-1 rounded-full bg-white/80" />
          </Link>

          {/* Due linee che diventano una X. */}
          <button
            type="button"
            className="pill relative flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span
              aria-hidden
              className={cn(
                "absolute h-[1.5px] w-[16px] rounded-full bg-paper transition-transform duration-500 ease-out",
                isMenuOpen ? "rotate-45" : "-translate-y-[3.5px]",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute h-[1.5px] rounded-full bg-paper transition-all duration-500 ease-out",
                isMenuOpen ? "w-[16px] -rotate-45" : "w-2.5 translate-x-[3px] translate-y-[3.5px]",
              )}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-menu"
            // Si apre come un cerchio che parte dal pulsante, in alto a destra.
            initial={{ clipPath: reduce ? "circle(150% at 100% 0%)" : "circle(0% at calc(100% - 36px) 32px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 32px)" }}
            exit={{ clipPath: reduce ? "circle(150% at 100% 0%)" : "circle(0% at calc(100% - 36px) 32px)", transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink-1000 px-4 pb-8 pt-20 md:hidden"
          >
            <div aria-hidden className="dot-grid-light pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(79,108,255,0.3),transparent_65%)]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(58,82,245,0.2),transparent_65%)]" />

            <nav aria-label="Menu" className="relative">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mono-label"
              >
                menu
              </motion.p>
              <ul className="mt-4 flex flex-col">
                {[{ label: "Home", href: "/" }, ...navItems].map((item, i) => {
                  const current = item.href === "/" ? pathname === "/" : isActive(item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: reduce ? 0 : 28, filter: reduce ? "none" : "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.07, ease: easeOut }}
                      className="border-b border-white/[0.07]"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={current ? "page" : undefined}
                        className="group flex items-center justify-between py-4"
                      >
                        <span className={cn("text-[2.5rem] font-medium leading-none tracking-[-0.04em]", current ? "text-accent" : "text-paper")}>
                          {item.label}
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-300 transition-colors group-active:bg-accent group-active:text-accent-ink">
                          <ArrowUpRight size={18} aria-hidden />
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
              className="relative mt-auto pt-10"
            >
              <p className="font-mono text-[11px] text-ink-500">prima valutazione senza impegno</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={contactLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary px-4"
                >
                  <WhatsappIcon width={16} height={16} />
                  WhatsApp
                </a>
                <a href={contactLinks.mailto} onClick={() => setIsMenuOpen(false)} className="btn-ghost px-4">
                  <Mail size={16} aria-hidden />
                  Email
                </a>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5">
                <a href={contactLinks.tel} className="font-mono text-[12px] text-ink-300">
                  {contactConfig.phone}
                </a>
                <div className="flex gap-2">
                  {socialLinks.instagram ? (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram di CMA Enterprise"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-300"
                    >
                      <InstagramIcon width={16} height={16} />
                    </a>
                  ) : null}
                  {socialLinks.tiktok ? (
                    <a
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok di CMA Enterprise"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-300"
                    >
                      <TiktokIcon width={16} height={16} />
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

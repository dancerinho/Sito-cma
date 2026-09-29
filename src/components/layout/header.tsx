"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { navItems, type NavItem } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { easeOut } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

function isActive(pathname: string, item: NavItem) {
  const targets = [item.href, ...(item.children?.map((c) => c.href) ?? [])];
  return targets.some((href) => {
    const [path = "/"] = href.split("#");
    return path !== "/" && pathname.startsWith(path);
  });
}

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenGroup(null);
      setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  function openGroupNow(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  }

  function closeGroupSoon() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 140);
  }

  const openItem = navItems.find((item) => item.label === openGroup);
  const solid = isScrolled || isMenuOpen || Boolean(openGroup);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:text-ink-950"
      >
        Vai al contenuto principale
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ease-out",
          solid ? "border-ink-800 bg-ink-950/95" : "border-transparent bg-transparent",
        )}
        onMouseLeave={closeGroupSoon}
      >
        <Container>
          <nav
            className="flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]"
            aria-label="Navigazione principale"
          >
            <Logo />

            <ul className="hidden items-center gap-1 lg:flex">
              {navItems.map((item, index) => {
                const active = isActive(pathname, item);
                const hasChildren = Boolean(item.children?.length);
                const isOpen = openGroup === item.label;

                return (
                  <li
                    key={item.label}
                    onMouseEnter={() => (hasChildren ? openGroupNow(item.label) : closeGroupSoon())}
                  >
                    <Link
                      href={item.href}
                      aria-haspopup={hasChildren ? "true" : undefined}
                      aria-expanded={hasChildren ? isOpen : undefined}
                      onFocus={() => (hasChildren ? openGroupNow(item.label) : setOpenGroup(null))}
                      onClick={() => setOpenGroup(null)}
                      className={cn(
                        "group inline-flex items-baseline gap-2 px-3 py-2 text-sm transition-colors duration-200",
                        active || isOpen ? "text-paper" : "text-ink-300 hover:text-paper",
                      )}
                    >
                      <span className="font-mono text-[10px] text-ink-500 group-hover:text-accent">
                        0{index + 1}
                      </span>
                      <span className={cn(active && "underline decoration-accent decoration-1 underline-offset-[6px]")}>
                        {item.label}
                      </span>
                      {hasChildren ? (
                        <Plus
                          size={12}
                          aria-hidden
                          className={cn(
                            "self-center transition-transform duration-300 ease-out",
                            isOpen && "rotate-45",
                          )}
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/contatti"
              className="group hidden items-center gap-2 text-sm text-paper lg:inline-flex"
            >
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-accent" aria-hidden />
              Parliamo del tuo progetto
              <ArrowUpRight
                size={15}
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <button
              type="button"
              className="-mr-2 inline-flex h-11 items-center gap-2 px-2 font-mono text-xs uppercase tracking-[0.18em] text-paper lg:hidden"
              aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              {isMenuOpen ? "Chiudi" : "Menu"}
              <Plus
                size={16}
                aria-hidden
                className={cn("transition-transform duration-300 ease-out", isMenuOpen && "rotate-45")}
              />
            </button>
          </nav>
        </Container>

        {/* Pannello a tutta larghezza per il gruppo aperto. */}
        <AnimatePresence>
          {openItem?.children ? (
            <motion.div
              key={openItem.label}
              initial={{ opacity: 0, y: reduce ? 0 : -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="absolute inset-x-0 top-full hidden border-b border-ink-800 bg-ink-950 lg:block"
              onMouseEnter={() => openGroupNow(openItem.label)}
            >
              <Container className="grid grid-cols-[1fr_2fr] gap-12 py-10">
                <div>
                  <p className="label">{openItem.label}</p>
                  <p className="mt-4 max-w-xs font-serif text-3xl leading-tight text-paper">
                    {openItem.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 gap-x-10">
                  {openItem.children.map((child) => (
                    <li key={child.href} className="border-t border-ink-800">
                      <Link
                        href={child.href}
                        onClick={() => setOpenGroup(null)}
                        className="group flex items-start justify-between gap-4 py-4"
                      >
                        <span>
                          <span className="block text-sm text-paper transition-colors group-hover:text-accent">
                            {child.label}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-ink-400">
                            {child.description}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={15}
                          aria-hidden
                          className="mt-0.5 shrink-0 text-ink-500 transition-colors group-hover:text-accent"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Container>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink-950 lg:hidden"
          >
            <div className="flex min-h-full flex-col px-5 pb-10 pt-24 sm:px-8">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 + i * 0.05, ease: easeOut }}
                    className="border-t border-ink-800 py-5"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-baseline gap-4"
                    >
                      <span className="font-mono text-xs text-ink-500">0{i + 1}</span>
                      <span className="font-serif text-4xl text-paper">{item.label}</span>
                    </Link>
                    {item.children?.length ? (
                      <ul className="mt-3 flex flex-col pl-9">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="inline-block py-1.5 text-sm text-ink-300"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </motion.li>
                ))}
              </ul>

              <Link
                href="/contatti"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary mt-auto w-full"
              >
                Parliamo del tuo progetto
                <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

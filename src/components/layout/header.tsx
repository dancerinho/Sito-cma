"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { navItems, type NavItem } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { cn } from "@/lib/utils";

const easePremium = [0.16, 1, 0.3, 1] as const;

function isActive(pathname: string, item: NavItem) {
  const targets = [item.href, ...(item.children?.map((c) => c.href) ?? [])];
  return targets.some((href) => {
    const [path = "/"] = href.split("#");
    return path !== "/" && pathname.startsWith(path);
  });
}

export function Header() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  // Chiudere il pannello mobile azzera anche l'accordion aperto.
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileGroup(null);
  };
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

  function openWithDelay(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  }

  function closeWithDelay() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 140);
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Vai al contenuto principale
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium",
          isScrolled || isMenuOpen || openGroup
            ? "border-b border-ink-700/70 glass"
            : "border-b border-transparent bg-transparent",
        )}
        onMouseLeave={closeWithDelay}
      >
        <Container>
          <nav
            className="flex h-16 items-center justify-between gap-6 sm:h-20"
            aria-label="Navigazione principale"
          >
            <Logo />

            <div className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => {
                const active = isActive(pathname, item);
                const hasChildren = Boolean(item.children?.length);
                const isOpen = openGroup === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => (hasChildren ? openWithDelay(item.label) : closeWithDelay())}
                  >
                    <Link
                      href={item.href}
                      aria-haspopup={hasChildren ? "true" : undefined}
                      aria-expanded={hasChildren ? isOpen : undefined}
                      onFocus={() => (hasChildren ? openWithDelay(item.label) : setOpenGroup(null))}
                      onClick={() => setOpenGroup(null)}
                      className={cn(
                        "relative inline-flex items-center gap-1.5 rounded px-3 py-2 text-sm transition-colors duration-200",
                        active || isOpen ? "text-paper" : "text-ink-200 hover:text-paper",
                      )}
                    >
                      {item.label}
                      {hasChildren ? (
                        <ChevronDown
                          size={14}
                          aria-hidden
                          className={cn(
                            "transition-transform duration-300 ease-premium",
                            isOpen && "rotate-180",
                          )}
                        />
                      ) : null}
                      {active ? (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-accent-light via-accent to-accent-aqua"
                          transition={{ duration: 0.4, ease: easePremium }}
                        />
                      ) : null}
                    </Link>

                    <AnimatePresence>
                      {hasChildren && isOpen ? (
                        <motion.div
                          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                          transition={{ duration: 0.24, ease: easePremium }}
                          /* Il centraggio sta in `margin` perché framer-motion
                             usa `transform` per l'animazione di ingresso. */
                          className="absolute left-1/2 top-full ml-[max(-17rem,-40vw)] w-[min(34rem,80vw)] pt-3"
                        >
                          <div className="border-ocean overflow-hidden rounded-lg bg-ink-950/95 p-2 shadow-subtle backdrop-blur-xl">
                            <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                              {item.children?.map((child, index) => (
                                <motion.li
                                  key={child.href}
                                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: 0.03 * index,
                                    ease: easePremium,
                                  }}
                                >
                                  <Link
                                    href={child.href}
                                    onClick={() => setOpenGroup(null)}
                                    className="group flex h-full flex-col gap-1 rounded p-3 transition-colors duration-200 hover:bg-accent-soft"
                                  >
                                    <span className="text-sm font-medium text-paper">
                                      {child.label}
                                    </span>
                                    <span className="text-xs leading-relaxed text-ink-300">
                                      {child.description}
                                    </span>
                                  </Link>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                href="/contatti"
                className="group relative ml-3 inline-flex items-center justify-center overflow-hidden rounded bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-all duration-300 ease-premium hover:bg-accent-dim"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/25 opacity-0 transition-opacity duration-300 group-hover:animate-shimmer group-hover:opacity-100"
                />
                <span className="relative">Parliamo del tuo progetto</span>
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded text-paper lg:hidden"
              aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </Container>

        <ScrollProgress />
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easePremium }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink-950/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex min-h-full flex-col px-6 pb-16 pt-24">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const hasChildren = Boolean(item.children?.length);
                  const isOpen = openMobileGroup === item.label;

                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.06 + i * 0.06, ease: easePremium }}
                      className="border-b border-ink-800"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="flex-1 py-5 font-display text-2xl font-medium text-paper"
                        >
                          {item.label}
                        </Link>
                        {hasChildren ? (
                          <button
                            type="button"
                            aria-label={`${isOpen ? "Chiudi" : "Apri"} sottomenu ${item.label}`}
                            aria-expanded={isOpen}
                            onClick={() => setOpenMobileGroup(isOpen ? null : item.label)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded text-ink-200"
                          >
                            <ChevronDown
                              size={20}
                              className={cn(
                                "transition-transform duration-300 ease-premium",
                                isOpen && "rotate-180",
                              )}
                            />
                          </button>
                        ) : null}
                      </div>

                      <AnimatePresence initial={false}>
                        {hasChildren && isOpen ? (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: easePremium }}
                            className="overflow-hidden"
                          >
                            {item.children?.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={closeMobileMenu}
                                  className="block border-l border-ink-700 py-3 pl-4 text-sm text-ink-200"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                            <li aria-hidden className="h-3" />
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.32, ease: easePremium }}
              >
                <Link
                  href="/contatti"
                  onClick={closeMobileMenu}
                  className="mt-10 inline-flex w-full items-center justify-center rounded bg-accent px-6 py-4 text-center text-base font-medium text-white shadow-glow"
                >
                  Parliamo del tuo progetto
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

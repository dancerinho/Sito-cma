"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { TICK, addTick } from "@/components/fx/ticker";

let instance: Lenis | null = null;

/** Blocca o riattiva lo scroll (per esempio con il menu mobile aperto). */
export function setScrollLocked(locked: boolean) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.body.style.overflow = locked ? "hidden" : "";
}

/**
 * Scroll morbido con inerzia su mouse e trackpad. Su touch resta lo scroll
 * nativo del telefono; con "riduci movimento" attivo non parte affatto.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
    instance = lenis;
    const stop = addTick((time) => lenis.raf(time), TICK.scroll);
    return () => {
      stop();
      lenis.destroy();
      instance = null;
    };
  }, []);

  // A ogni cambio pagina si riparte dall'alto (o dall'ancora richiesta).
  useEffect(() => {
    if (!instance) return;
    const hash = window.location.hash;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    instance.resize();
    instance.scrollTo(target ?? 0, { immediate: true, offset: target ? -80 : 0, force: true });
  }, [pathname]);

  return null;
}

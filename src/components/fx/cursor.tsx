"use client";

import { useEffect, useRef } from "react";

/**
 * Anello che segue il puntatore con un leggero ritardo e si allarga sopra
 * link e pulsanti. Solo con mouse o trackpad, mai su touch.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ref.current;
    if (!ring) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pos = { x: -100, y: -100, tx: -100, ty: -100, s: 1, ts: 1 };
    let frame = 0;
    let running = false;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const k = 1 - Math.exp(-dt * 18);
      pos.x += (pos.tx - pos.x) * k;
      pos.y += (pos.ty - pos.y) * k;
      pos.s += (pos.ts - pos.s) * (1 - Math.exp(-dt * 12));
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${pos.s})`;
      const settled = Math.abs(pos.tx - pos.x) < 0.1 && Math.abs(pos.ty - pos.y) < 0.1 && Math.abs(pos.ts - pos.s) < 0.002;
      if (settled) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    const wake = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (pos.x < -50) {
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
      pos.tx = e.clientX;
      pos.ty = e.clientY;
      ring.dataset.visible = "true";
      const interactive = (e.target as Element | null)?.closest("a, button, [role='button'], label");
      pos.ts = interactive ? 1.75 : 1;
      ring.dataset.active = interactive ? "true" : "false";
      wake();
    };
    const onDown = () => {
      pos.ts *= 0.8;
      wake();
    };
    const onLeave = () => {
      ring.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      data-visible="false"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 rounded-full border border-white/50 opacity-0 transition-[opacity,background-color,border-color] duration-300 will-change-transform data-[visible=true]:opacity-100 data-[active=true]:border-accent/80 data-[active=true]:bg-accent/10"
    />
  );
}

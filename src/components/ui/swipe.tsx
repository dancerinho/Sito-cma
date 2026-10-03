"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Su telefono gli elementi diventano schede da scorrere col dito, una alla
 * volta, con i pallini che mostrano dove sei; da `trackClassName` in su
 * (es. `lg:grid`) tornano nella loro griglia normale.
 *
 * Così la pagina resta corta: una riga orizzontale al posto di una colonna
 * lunghissima.
 */
export function Swipe({
  items,
  label,
  trackClassName,
  dotsClassName,
  className,
}: {
  items: ReactNode[];
  label: string;
  /** Classi del binario: scorrimento su mobile, griglia dal breakpoint in su. */
  trackClassName: string;
  /** Classi dei pallini, per nasconderli dove torna la griglia. */
  dotsClassName: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const children = Array.from(track.children) as HTMLElement[];
        const left = track.scrollLeft + track.clientWidth * 0.3;
        let index = 0;
        children.forEach((child, i) => {
          if (child.offsetLeft - track.offsetLeft <= left) index = i;
        });
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) index = children.length - 1;
        setActive(index);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTo = (i: number) => {
    const track = ref.current;
    const child = track?.children[i] as HTMLElement | undefined;
    if (!track || !child) return;
    track.scrollTo({ left: child.offsetLeft - track.offsetLeft - 16, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <div ref={ref} role="region" aria-label={label} className={trackClassName}>
        {items}
      </div>
      <div className={cn("mt-6 flex items-center justify-center gap-1.5", dotsClassName)}>
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Vai alla scheda ${i + 1} di ${items.length}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => goTo(i)}
            className="flex h-6 items-center px-0.5"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full transition-all duration-500 ease-out",
                i === active ? "w-6 bg-accent shadow-[0_0_10px_rgb(var(--accent)/0.8)]" : "w-1.5 bg-white/20",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

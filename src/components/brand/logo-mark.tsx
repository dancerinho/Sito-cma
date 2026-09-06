import { cn } from "@/lib/utils";

/**
 * Marchio CMA: tre pentagoni arrotondati e ruotati, tracciati a linea.
 * `animated` attiva il disegno progressivo del tratto e la rotazione lenta.
 */

export const pentagonPaths = {
  outer:
    "M 90.29 29.05 Q 100.00 22.00 109.71 29.05 L 164.47 68.84 Q 174.18 75.90 170.47 87.31 L 149.56 151.69 Q 145.85 163.10 133.85 163.10 L 66.15 163.10 Q 54.15 163.10 50.44 151.69 L 29.53 87.31 Q 25.82 75.90 35.53 68.84 Z",
  middle:
    "M 101.15 35.86 Q 110.95 30.86 118.73 38.64 L 161.36 81.27 Q 169.14 89.05 164.14 98.85 L 136.77 152.57 Q 131.78 162.37 120.91 160.65 L 61.37 151.22 Q 50.50 149.50 48.78 138.63 L 39.35 79.09 Q 37.63 68.22 47.43 63.23 Z",
  inner:
    "M 109.65 44.12 Q 119.16 41.03 125.04 49.12 L 156.12 91.91 Q 162.00 100.00 156.12 108.09 L 125.04 150.88 Q 119.16 158.97 109.65 155.88 L 59.35 139.53 Q 49.84 136.44 49.84 126.44 L 49.84 73.56 Q 49.84 63.56 59.35 60.47 Z",
} as const;

export function LogoMark({
  className,
  animated = false,
  title,
}: {
  className?: string;
  animated?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("h-9 w-9", className)}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id="cma-mark-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6FE0FF" />
          <stop offset="55%" stopColor="#1FA2FF" />
          <stop offset="100%" stopColor="#25E0C8" />
        </linearGradient>
      </defs>

      <g
        fill="none"
        stroke="url(#cma-mark-stroke)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(animated && "origin-center animate-spin-slow")}
      >
        <path
          d={pentagonPaths.outer}
          opacity="0.95"
          className={cn(animated && "[stroke-dasharray:1400] animate-draw-in")}
        />
        <path
          d={pentagonPaths.middle}
          opacity="0.7"
          className={cn(animated && "[stroke-dasharray:1400] animate-draw-in [animation-delay:180ms]")}
        />
        <path
          d={pentagonPaths.inner}
          opacity="0.45"
          className={cn(animated && "[stroke-dasharray:1400] animate-draw-in [animation-delay:360ms]")}
        />
      </g>
    </svg>
  );
}

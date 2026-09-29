"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/** Curva unica per tutto il sito: arrivo deciso, frenata lunga. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Contenuto che sale ed entra in dissolvenza quando arriva nel viewport.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: easeOut }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Titolo che entra parola per parola, ognuna risale da sotto una maschera.
 * Le parole tra asterischi (`*così*`) vengono rese in corsivo.
 */
export function SplitHeading({
  text,
  className,
  as = "h1",
  delay = 0,
  immediate = false,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  delay?: number;
  /** Anima al caricamento invece che all'ingresso nel viewport. */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[as];

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { y: reduce ? 0 : "110%" },
    visible: { y: 0, transition: { duration: 0.9, ease: easeOut } },
  };

  const trigger = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, margin: "-60px" } };

  return (
    <MotionTag className={className} variants={container} initial="hidden" {...trigger}>
      {words.map((raw, i) => {
        const italic = raw.startsWith("*") && raw.replace(/[.,:;!?]$/, "").endsWith("*");
        const clean = raw.replace(/\*/g, "");
        return (
          <span key={`${clean}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              variants={word}
              className={italic ? "inline-block italic text-accent" : "inline-block"}
            >
              {clean}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}

/**
 * Filetto orizzontale che si traccia da sinistra a destra.
 */
export function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={`block h-px origin-left bg-ink-700 ${className ?? ""}`}
      initial={{ scaleX: reduce ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.1, delay, ease: easeOut }}
    />
  );
}

"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

/** Curva unica per tutto il sito: arrivo deciso, frenata lunga. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

type Side = "left" | "right" | "bottom";

const offset = (side: Side, distance: number) =>
  side === "left" ? { x: -distance } : side === "right" ? { x: distance } : { y: distance / 2 };

/**
 * Contenuto che entra dal lato indicato quando arriva nel viewport.
 */
export function Reveal({
  children,
  className,
  from = "bottom",
  delay = 0,
  distance = 64,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  from?: Side;
  delay?: number;
  distance?: number;
  as?: "div" | "li" | "p";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...(reduce ? {} : offset(from, distance)) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay, ease: easeOut }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Titolo che entra parola per parola scivolando dal lato indicato.
 * Una parola tra asterischi (`*così*`) viene resa in corsivo colorato.
 */
export function SlideHeading({
  text,
  className,
  as = "h2",
  from = "left",
  delay = 0,
  immediate = false,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  from?: "left" | "right";
  delay?: number;
  /** Anima al caricamento invece che all'ingresso nel viewport. */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[as];

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : from === "left" ? -48 : 48 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
  };

  const trigger = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, margin: "-40px" } };

  return (
    <MotionTag className={className} variants={container} initial="hidden" {...trigger}>
      {words.map((raw, i) => {
        const italic = raw.startsWith("*") && raw.replace(/[.,:;!?]$/, "").endsWith("*");
        const clean = raw.replace(/\*/g, "");
        return (
          <motion.span
            key={`${clean}-${i}`}
            variants={word}
            className={italic ? "inline-block italic text-accent" : "inline-block"}
          >
            {clean}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        );
      })}
    </MotionTag>
  );
}

/**
 * Fascia di parole che scorre di lato mentre si scorre la pagina:
 * la riga superiore va verso sinistra, quella inferiore verso destra.
 */
export function ScrollBand({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const toLeft = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  const toRight = useTransform(scrollYProgress, [0, 1], ["-35%", "5%"]);
  const line = [...words, ...words].join("  ·  ");

  return (
    <div ref={ref} aria-hidden className="overflow-hidden py-10 sm:py-14">
      <motion.p
        style={reduce ? undefined : { x: toLeft }}
        className="whitespace-nowrap font-serif text-5xl text-paper sm:text-7xl"
      >
        {line}
      </motion.p>
      <motion.p
        style={reduce ? undefined : { x: toRight }}
        className="mt-2 whitespace-nowrap font-serif text-5xl italic text-ink-600 sm:text-7xl"
      >
        {line}
      </motion.p>
    </div>
  );
}

"use client";

import { Fragment, ReactNode, useSyncExternalStore } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const noop = () => () => {};

/**
 * "Riduci movimento" letto solo dopo l'idratazione: il server non conosce
 * le preferenze del visitatore, quindi il primo disegno deve coincidere col
 * suo, altrimenti React segnala una differenza.
 */
export function useReducedMotionAfterMount() {
  const reduce = useReducedMotion();
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  return mounted && !!reduce;
}

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
      transition={{ duration: 1, delay, ease: easeOut }}
    >
      {children}
    </MotionTag>
  );
}

type Token = { text: string; italic: boolean } | "break";

/**
 * Divide un titolo in parole. `*parole tra asterischi*` vanno in corsivo
 * serif, una `|` isolata manda a capo.
 */
function tokenize(text: string): Token[] {
  let inItalic = false;
  return text.split(" ").map((raw) => {
    if (raw === "|") return "break";
    const opens = raw.startsWith("*");
    const closes = /\*[.,:;!?]*$/.test(raw);
    const italic = inItalic || opens;
    if (opens) inItalic = true;
    if (closes) inItalic = false;
    return { text: raw.replace(/\*/g, ""), italic };
  });
}

/**
 * Titolo che entra parola per parola, scivolando dal lato indicato e
 * mettendosi a fuoco. Le parole in corsivo usano il serif del marchio.
 */
export function SlideHeading({
  text,
  className,
  italicClassName = "text-paper",
  as = "h2",
  from = "left",
  delay = 0,
  immediate = false,
}: {
  text: string;
  className?: string;
  italicClassName?: string;
  as?: "h1" | "h2" | "h3" | "p";
  from?: "left" | "right";
  delay?: number;
  /** Anima al caricamento invece che all'ingresso nel viewport. */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const tokens = tokenize(text);
  const MotionTag = motion[as];

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : from === "left" ? -56 : 56, filter: reduce ? "none" : "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1, ease: easeOut } },
  };

  const trigger = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, margin: "-60px" } };

  return (
    <MotionTag className={className} variants={container} initial="hidden" {...trigger}>
      {tokens.map((token, i) =>
        token === "break" ? (
          <br key={`br-${i}`} />
        ) : (
          <Fragment key={`${token.text}-${i}`}>
            <motion.span
              variants={word}
              className={
                token.italic
                  ? `inline-block pr-[0.06em] font-serif text-[1.08em] font-normal italic leading-[0.9] tracking-[-0.01em] ${italicClassName}`
                  : "inline-block"
              }
            >
              {token.text}
            </motion.span>
            {i < tokens.length - 1 && tokens[i + 1] !== "break" ? " " : null}
          </Fragment>
        ),
      )}
    </MotionTag>
  );
}

/** Etichetta monospazio con pallino luminoso, che entra da sinistra. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Reveal from="left" distance={32} className={className}>
      <span className="tag">{children}</span>
    </Reveal>
  );
}

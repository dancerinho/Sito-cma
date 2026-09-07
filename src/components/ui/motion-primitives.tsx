"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

const easePremium = [0.16, 1, 0.3, 1] as const;

/**
 * Vero solo su dispositivi con puntatore preciso e hover reale.
 * Su touch gli effetti che seguono il cursore non si vedono mai: evitarli
 * risparmia listener e ridisegni proprio dove la GPU è più debole.
 */
function useHoverCapable() {
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCapable(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return capable;
}

/**
 * Titolo animato parola per parola: ogni parola sale ed entra in dissolvenza.
 */
export function AnimatedHeading({
  text,
  className,
  as: Tag = "h1",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.045, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : "0.5em", filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: easePremium },
    },
  };

  const MotionTag = Tag === "h1" ? motion.h1 : Tag === "h2" ? motion.h2 : motion.p;

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * Elemento che segue leggermente il cursore (effetto magnetico).
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const hoverCapable = useHoverCapable();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  function handleMove(event: React.MouseEvent<HTMLSpanElement>) {
    if (shouldReduceMotion || !hoverCapable || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.span>
  );
}

/**
 * Card con inclinazione 3D e alone luminoso che segue il puntatore.
 */
export function SpotlightCard({
  children,
  className,
  tilt = 6,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const hoverCapable = useHoverCapable();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });

  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(111,224,255,0.14), transparent 70%)`;

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!hoverCapable || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    mouseX.set(px);
    mouseY.set(py);
    if (shouldReduceMotion) return;
    rotateY.set(((px / rect.width) - 0.5) * tilt * 2);
    rotateX.set(((py / rect.height) - 0.5) * -tilt * 2);
  }

  function handleLeave() {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn(
        "border-ocean relative overflow-hidden rounded-lg glass transition-shadow duration-500 ease-premium hover:shadow-glow",
        className,
      )}
    >
      {hoverCapable ? (
        <motion.span
          aria-hidden
          style={{ background: spotlight }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0"
        />
      ) : null}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

/**
 * Numero che sale fino al valore finale quando entra nel viewport.
 */
export function CountUp({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [value, setValue] = useState(shouldReduceMotion ? to : 0);
  const started = useRef(false);

  function start() {
    if (started.current || shouldReduceMotion) return;
    started.current = true;
    const duration = 1400;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  return (
    <motion.span
      className={className}
      onViewportEnter={start}
      viewport={{ once: true, margin: "-40px" }}
    >
      {value}
      {suffix}
    </motion.span>
  );
}

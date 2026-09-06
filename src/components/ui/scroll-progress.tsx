"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barra sottile sotto l'header che segue l'avanzamento dello scroll.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="h-px origin-left bg-gradient-to-r from-accent-light via-accent to-accent-aqua"
    />
  );
}

"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useReducedMotionAfterMount } from "@/components/ui/motion";

/**
 * Transizione applicata al cambio pagina: il contenuto entra in dissolvenza
 * e sale leggermente, così la navigazione dal menu non è mai brusca.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotionAfterMount();

  return (
    <motion.div
      key={pathname}
      className="motion-reduce:!opacity-100 motion-reduce:!transform-none"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

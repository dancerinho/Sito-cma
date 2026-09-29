"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Copia un testo negli appunti. Utile per chi non ha un'app di posta
 * configurata sul computer: incolla l'indirizzo dove preferisce.
 */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" onClick={copy} className="btn-ghost">
      {copied ? (
        <Check size={16} aria-hidden className="text-accent" />
      ) : (
        <Copy size={16} aria-hidden />
      )}
      <span aria-live="polite">{copied ? "Copiato!" : label}</span>
    </button>
  );
}

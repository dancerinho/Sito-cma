import { ReactNode } from "react";
import { Reveal, SplitHeading } from "@/components/ui/motion";

/**
 * Testata di sezione: indice mono a sinistra, titolo serif e un'eventuale
 * azione allineata a destra. Nel titolo, `*parola*` va in corsivo.
 */
export function SectionHeader({
  index,
  label,
  title,
  action,
}: {
  index: string;
  label: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
      <Reveal className="label flex items-center gap-3 md:col-span-3 md:pt-3">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-ink-700" aria-hidden />
        {label}
      </Reveal>
      <div className="flex flex-col gap-8 md:col-span-9 lg:flex-row lg:items-end lg:justify-between">
        <SplitHeading
          as="h2"
          text={title}
          className="max-w-3xl text-balance font-serif text-display-lg text-paper"
        />
        {action ? <Reveal delay={0.2} className="shrink-0">{action}</Reveal> : null}
      </div>
    </div>
  );
}

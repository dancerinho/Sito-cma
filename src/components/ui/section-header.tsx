import { ReactNode } from "react";
import { Reveal, SlideHeading } from "@/components/ui/motion";

/**
 * Testata di sezione: titolo che entra da sinistra, testo e azione da destra.
 * Nel titolo, `*parola*` va in corsivo.
 */
export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <SlideHeading text={title} className="text-balance font-serif text-display-lg text-paper" />
        {description ? (
          <Reveal from="right" delay={0.15} as="p" className="mt-4 text-pretty text-ink-300">
            {description}
          </Reveal>
        ) : null}
      </div>
      {action ? (
        <Reveal from="right" delay={0.25} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}

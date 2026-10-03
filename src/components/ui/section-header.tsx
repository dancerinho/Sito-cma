import { ReactNode } from "react";
import { Reveal, SlideHeading, Tag } from "@/components/ui/motion";

/**
 * Testata di sezione: etichetta e titolo a sinistra, testo e azione a
 * destra. Nel titolo, `*parole*` vanno in corsivo.
 */
export function SectionHeader({
  tag,
  title,
  description,
  action,
}: {
  tag?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        {tag ? <Tag className="mb-6">{tag}</Tag> : null}
        <SlideHeading text={title} className="text-balance text-display-lg font-medium text-paper" />
      </div>
      {description || action ? (
        <div className="md:col-span-4 md:col-start-9">
          {description ? (
            <Reveal from="right" delay={0.15} as="p" className="text-pretty leading-relaxed text-ink-400">
              {description}
            </Reveal>
          ) : null}
          {action ? (
            <Reveal from="right" delay={0.25} className="mt-6">
              {action}
            </Reveal>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

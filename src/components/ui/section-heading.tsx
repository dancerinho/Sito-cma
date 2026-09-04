import { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent-light">
            <span className="h-1 w-1 rounded-full bg-accent-light" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 className="text-balance text-display-md font-display font-medium text-paper">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p className="mt-4 text-balance text-base leading-relaxed text-ink-300">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

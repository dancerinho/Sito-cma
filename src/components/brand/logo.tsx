import Link from "next/link";
import { siteConfig } from "@/config/site";
import { LogoMark } from "@/components/brand/logo-mark";
import { cn } from "@/lib/utils";

/**
 * Logo completo (marchio + nome) usato in header e footer.
 */
export function Logo({
  className,
  markClassName,
  showWordmark = true,
  href = "/",
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={siteConfig.name}
    >
      <span className="relative inline-flex">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-accent/25 opacity-0 blur-md transition-opacity duration-500 ease-premium group-hover:opacity-100"
        />
        <LogoMark
          className={cn(
            "relative h-9 w-9 transition-transform duration-700 ease-premium group-hover:rotate-[72deg]",
            markClassName,
          )}
        />
      </span>
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-semibold tracking-tight text-paper">
            {siteConfig.name}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.24em] text-ink-400">
            Digital Studio
          </span>
        </span>
      ) : null}
    </Link>
  );
}

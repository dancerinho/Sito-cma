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
      <LogoMark
        className={cn(
          "h-8 w-8 transition-transform duration-700 ease-out group-hover:rotate-[72deg]",
          markClassName,
        )}
      />
      {showWordmark ? (
        <span className="text-[15px] font-medium tracking-tight text-paper">
          {siteConfig.name}
        </span>
      ) : null}
    </Link>
  );
}

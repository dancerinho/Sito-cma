import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded whitespace-nowrap text-sm font-medium transition-all duration-300 ease-premium focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-dim shadow-glow px-6 py-3.5",
  secondary:
    "border border-ink-600 text-paper hover:border-accent-light/60 hover:bg-ink-800 px-6 py-3.5",
  ghost: "text-ink-200 hover:text-paper px-2 py-1",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
};

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  },
);
LinkButton.displayName = "LinkButton";

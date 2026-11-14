import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

export type IconButtonTone = "default" | "danger";

type IconButtonProps = Omit<
  ComponentProps<"button">,
  "children" | "aria-label"
> & {
  icon: LucideIcon;
  /** Accessible name for an icon-only button */
  label: string;
  tone?: IconButtonTone;
};

const toneClasses: Record<IconButtonTone, string> = {
  default: "text-fg hover:bg-surface-raised",
  danger: "text-danger hover:bg-danger/10",
};

/** Accessible icon-only button with a 44px touch target. */
export function IconButton({
  icon: Icon,
  label,
  tone = "default",
  type = "button",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-control transition-colors",
        "disabled:pointer-events-none disabled:opacity-50",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      <Icon aria-hidden="true" className="size-5" />
    </button>
  );
}

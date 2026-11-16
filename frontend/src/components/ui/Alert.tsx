import {
  CircleAlert,
  Info,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";

export type AlertTone = "info" | "warning" | "danger";

const ALERT_TONES: Record<
  AlertTone,
  { icon: LucideIcon; box: string; iconColor: string }
> = {
  info: {
    icon: Info,
    box: "border-info/40 bg-info/10",
    iconColor: "text-info",
  },
  warning: {
    icon: TriangleAlert,
    box: "border-warning/40 bg-warning/10",
    iconColor: "text-warning",
  },
  danger: {
    icon: CircleAlert,
    box: "border-danger/40 bg-danger/10",
    iconColor: "text-danger",
  },
};

type AlertProps = Omit<ComponentProps<"div">, "title"> & {
  tone: AlertTone;
  title?: string;
  /** Optional action, such as a retry button */
  action?: ReactNode;
};

/** Warning banner that remains visible while a situation lasts. */
export function Alert({
  tone,
  title,
  action,
  children,
  className,
  ...props
}: AlertProps) {
  const { icon: Icon, box, iconColor } = ALERT_TONES[tone];

  return (
    <div
      className={cn(
        "flex gap-3 rounded-card border p-4 text-sm",
        box,
        className,
      )}
      {...props}
    >
      <Icon
        aria-hidden="true"
        className={cn("mt-0.5 size-4 shrink-0", iconColor)}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {title && <p className="font-semibold text-fg">{title}</p>}

          {children && (
            <div className={cn("text-fg", title && "mt-1")}>{children}</div>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type ScreenMessageProps = {
  icon: LucideIcon;
  /** Short label above the title, such as the error code. */
  overline: string;
  title: string;
  children: ReactNode;
  /** Buttons and links that lead the visitor out of the situation. */
  actions: ReactNode;
};

/** Full message for a screen that cannot show its content: denied, missing or failed. */
export function ScreenMessage({
  icon: Icon,
  overline,
  title,
  children,
  actions,
}: ScreenMessageProps) {
  return (
    <section className="mx-auto max-w-xl py-10 text-center sm:py-16">
      <span className="mx-auto flex size-12 items-center justify-center rounded-card border border-line bg-surface text-fg-muted">
        <Icon aria-hidden="true" className="size-6" />
      </span>

      <p className="mt-6 font-mono text-xs tracking-overline text-fg-muted uppercase">
        {overline}
      </p>

      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>

      <div className="mt-3 text-fg-muted">{children}</div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {actions}
      </div>
    </section>
  );
}

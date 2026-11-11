import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useRevealOnScroll } from "../../lib/useRevealOnScroll";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export function ScrollReveal({
  children,
  className,
  delayMs = 0,
}: ScrollRevealProps) {
  const { elementRef, hasEnteredViewport } =
    useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={elementRef}
      className={cn(
        "motion-safe:transition-[opacity,transform] motion-safe:duration-[600ms] motion-safe:ease-out",
        hasEnteredViewport
          ? "motion-safe:translate-y-0 motion-safe:opacity-100"
          : "motion-safe:translate-y-5 motion-safe:opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

import { LoaderCircle } from "lucide-react";
import type { ComponentProps, MouseEvent } from "react";

import { cn } from "../../lib/cn";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./styles";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Action in progress: shows a spinner and ignores new clicks */
  loading?: boolean;
  /** Text shown while loading */
  loadingText?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  loading = false,
  loadingText,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (loading) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  }

  return (
    <button
      type={type}
      aria-disabled={loading || undefined}
      onClick={handleClick}
      className={cn(
        buttonClasses(variant, size),
        loading && "cursor-progress",
        className,
      )}
      {...props}
    >
      {loading && (
        <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
      )}
      {loading && loadingText ? loadingText : children}
    </button>
  );
}

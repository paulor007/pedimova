import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";
import { FormField } from "./FormField";
import { fieldControlClasses } from "./styles";

type TextFieldProps = Omit<
  ComponentProps<"input">,
  "id" | "aria-describedby" | "aria-invalid" | "aria-required"
> & {
  label: string;
  hint?: string;
  error?: string;
};

/** Single-line text input with label, hint and error. */
export function TextField({
  label,
  hint,
  error,
  required,
  className,
  ...props
}: TextFieldProps) {
  return (
    <FormField label={label} hint={hint} error={error} required={required}>
      {(control) => (
        <input
          {...props}
          {...control}
          className={cn(fieldControlClasses(Boolean(error)), "h-11", className)}
        />
      )}
    </FormField>
  );
}

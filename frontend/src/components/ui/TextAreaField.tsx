import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";
import { FormField } from "./FormField";
import { fieldControlClasses } from "./styles";

type TextAreaFieldProps = Omit<
  ComponentProps<"textarea">,
  "id" | "aria-describedby" | "aria-invalid" | "aria-required"
> & {
  label: string;
  hint?: string;
  error?: string;
};

/** Multi-line text input with label, hint and error. */
export function TextAreaField({
  label,
  hint,
  error,
  required,
  className,
  ...props
}: TextAreaFieldProps) {
  return (
    <FormField label={label} hint={hint} error={error} required={required}>
      {(control) => (
        <textarea
          {...props}
          {...control}
          className={cn(
            fieldControlClasses(Boolean(error)),
            "min-h-28 resize-y py-3",
            className,
          )}
        />
      )}
    </FormField>
  );
}

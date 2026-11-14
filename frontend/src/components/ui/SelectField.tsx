import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";
import { FormField } from "./FormField";
import { fieldControlClasses } from "./styles";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = Omit<
  ComponentProps<"select">,
  "id" | "aria-describedby" | "aria-invalid" | "aria-required" | "children"
> & {
  label: string;
  hint?: string;
  error?: string;
  options: readonly SelectOption[];
  /** First, empty choice, such as "Escolha uma opção" */
  placeholder?: string;
};

/** Native select with label, hint and error. */
export function SelectField({
  label,
  hint,
  error,
  required,
  options,
  placeholder,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <FormField label={label} hint={hint} error={error} required={required}>
      {(control) => (
        <select
          {...props}
          {...control}
          className={cn(fieldControlClasses(Boolean(error)), "h-11", className)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FormField>
  );
}

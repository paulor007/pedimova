import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";
import { centsFromInput, formatCents } from "../../lib/money";
import { TextField } from "./TextField";

type CurrencyFieldProps = Omit<
  ComponentProps<typeof TextField>,
  "value" | "onChange" | "inputMode"
> & {
  /** Monetary amount stored as integer cents. */
  cents: number;
  onCentsChange: (cents: number) => void;
};

/** Brazilian currency field with integer-cent representation. */
export function CurrencyField({
  cents,
  onCentsChange,
  className,
  ...props
}: CurrencyFieldProps) {
  return (
    <TextField
      {...props}
      inputMode="numeric"
      value={formatCents(cents)}
      onChange={(event) => onCentsChange(centsFromInput(event.target.value))}
      className={cn("text-right tabular-nums", className)}
    />
  );
}

import type { ComponentProps } from "react";

import { TextField } from "./TextField";

type MaskedTextFieldProps = Omit<
  ComponentProps<typeof TextField>,
  "value" | "onChange"
> & {
  value: string;
  /** Formats the value entered by the user. */
  mask: (typed: string) => string;
  /** Receives the formatted value. */
  onValueChange: (formatted: string) => void;
};

/** Text field with a configurable mask. */
export function MaskedTextField({
  mask,
  onValueChange,
  inputMode = "numeric",
  ...props
}: MaskedTextFieldProps) {
  return (
    <TextField
      {...props}
      inputMode={inputMode}
      onChange={(event) => onValueChange(mask(event.target.value))}
    />
  );
}

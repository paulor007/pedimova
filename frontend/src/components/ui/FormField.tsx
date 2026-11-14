import { CircleAlert } from "lucide-react";
import { useId, type ReactNode } from "react";

/** Attributes that connect a control to its label, hint and error. */
export type FieldControlProps = {
  id: string;
  "aria-describedby": string | undefined;
  "aria-invalid": true | undefined;
  "aria-required": true | undefined;
};

type FormFieldProps = {
  label: string;
  /** Short help shown below the control */
  hint?: string;
  /** What to fix when validation fails */
  error?: string;
  required?: boolean;
  /** Renders the control with its accessibility attributes */
  children: (control: FieldControlProps) => ReactNode;
};

/** Shared label, help and error wrapper for form controls. */
export function FormField({
  label,
  hint,
  error,
  required = false,
  children,
}: FormFieldProps) {
  const id = useId();
  const hintId = `${id}-ajuda`;
  const errorId = `${id}-erro`;

  // The error is announced before the help text.
  const describedBy =
    [error && errorId, hint && hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-danger">
            *
          </span>
        )}
      </label>

      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        "aria-required": required || undefined,
      })}

      {error && (
        <p
          id={errorId}
          className="flex items-start gap-1.5 text-xs text-danger"
        >
          <CircleAlert aria-hidden="true" className="mt-px size-3.5 shrink-0" />
          {error}
        </p>
      )}

      {hint && (
        <p id={hintId} className="text-xs text-fg-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

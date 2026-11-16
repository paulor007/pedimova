import type { FocusEvent } from "react";

export type FieldElement =
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * Detects focus moving from a field to a button
 * belonging to the same form.
 */
export function isLeavingForFormButton(
  event: FocusEvent<FieldElement>,
): boolean {
  const next = event.relatedTarget;

  return (
    next instanceof HTMLButtonElement &&
    next.form !== null &&
    next.form === event.currentTarget.form
  );
}

import { onlyDigits } from "./masks";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Largest accepted amount: R$ 999.999.999,99. */
const MAX_DIGITS = 11;

/** Converts integer cents into formatted Brazilian money. */
export function formatCents(cents: number): string {
  return brl.format(cents / 100);
}

/** Extracts the amount in cents from formatted input. */
export function centsFromInput(value: string): number {
  const digits = onlyDigits(value).slice(0, MAX_DIGITS);

  return digits === "" ? 0 : Number(digits);
}

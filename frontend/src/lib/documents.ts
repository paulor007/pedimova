import { applyPattern } from "./masks";

export type DocumentKind = "CPF" | "CNPJ";

const CPF_PATTERN = "###.###.###-##";
const CNPJ_PATTERN = "##.###.###/####-##";

/** Keeps uppercase letters and digits, without punctuation. */
export function normalizeDocument(value: string): string {
  return value.toUpperCase().replace(/[^0-9A-Z]/g, "");
}

/** A letter or more than eleven characters indicates CNPJ. */
export function documentKind(normalized: string): DocumentKind {
  return /[A-Z]/.test(normalized) || normalized.length > 11 ? "CNPJ" : "CPF";
}

/** Formats CPF or CNPJ as characters are typed. */
export function maskDocument(value: string): string {
  const normalized = normalizeDocument(value);

  return documentKind(normalized) === "CPF"
    ? applyPattern(normalized, CPF_PATTERN)
    : applyPattern(normalized, CNPJ_PATTERN);
}

/** Character value used in the document check-digit calculation. */
function characterValue(character: string): number {
  return character.charCodeAt(0) - 48;
}

/** Calculates a check digit using modulo 11. */
function checkDigit(characters: string, weights: readonly number[]): number {
  const sum = weights.reduce(
    (total, weight, index) =>
      total + characterValue(characters[index]) * weight,
    0,
  );

  const remainder = sum % 11;

  return remainder < 2 ? 0 : 11 - remainder;
}

/** Rejects document numbers made of one repeated digit. */
function isRepeatedDigit(characters: string): boolean {
  return /^(\d)\1+$/.test(characters);
}

export function isValidCpf(value: string): boolean {
  const cpf = normalizeDocument(value);

  if (!/^\d{11}$/.test(cpf) || isRepeatedDigit(cpf)) {
    return false;
  }

  const first = checkDigit(cpf, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  const second = checkDigit(cpf, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);

  return cpf.endsWith(`${first}${second}`);
}

export function isValidCnpj(value: string): boolean {
  const cnpj = normalizeDocument(value);

  // Twelve alphanumeric characters and two numeric check digits.
  if (!/^[0-9A-Z]{12}\d{2}$/.test(cnpj) || isRepeatedDigit(cnpj)) {
    return false;
  }

  const first = checkDigit(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  const second = checkDigit(cnpj, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  return cnpj.endsWith(`${first}${second}`);
}

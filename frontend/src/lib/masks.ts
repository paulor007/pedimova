/** Keeps only the digits of a text. */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Fits characters into a pattern where "#" is a character slot.
 * Separators appear only when another character is available.
 */
export function applyPattern(characters: string, pattern: string): string {
  let result = "";
  let next = 0;

  for (const symbol of pattern) {
    if (next >= characters.length) {
      break;
    }

    if (symbol === "#") {
      result += characters[next];
      next += 1;
    } else {
      result += symbol;
    }
  }

  return result;
}

/** Formats a Brazilian postal code while typing. */
export function maskCep(value: string): string {
  return applyPattern(onlyDigits(value), "#####-###");
}

/** Formats a Brazilian landline or mobile phone number. */
export function maskPhone(value: string): string {
  const digits = onlyDigits(value);

  const pattern = digits.length <= 10 ? "(##) ####-####" : "(##) #####-####";

  return applyPattern(digits, pattern);
}

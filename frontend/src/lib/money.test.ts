import { describe, expect, it } from "vitest";

import { centsFromInput, formatCents } from "./money";

describe("formatCents", () => {
  it("formats cents as Brazilian currency", () => {
    expect(formatCents(123456)).toBe("R$\u00a01.234,56");
    expect(formatCents(0)).toBe("R$\u00a00,00");
  });
});

describe("centsFromInput", () => {
  it("reads formatted money as cents", () => {
    expect(centsFromInput("R$ 1.234,56")).toBe(123456);
  });

  it("moves the amount left as digits are typed", () => {
    expect(centsFromInput("R$ 0,051")).toBe(51);
  });

  it("returns zero when the field is cleared", () => {
    expect(centsFromInput("R$ ")).toBe(0);
  });

  it("limits the amount to eleven digits", () => {
    expect(centsFromInput("1234567890123")).toBe(12345678901);
  });
});

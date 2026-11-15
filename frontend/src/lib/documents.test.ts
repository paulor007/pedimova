import { describe, expect, it } from "vitest";

import {
  documentKind,
  isValidCnpj,
  isValidCpf,
  maskDocument,
  normalizeDocument,
} from "./documents";

describe("isValidCpf", () => {
  it("accepts a CPF with correct check digits", () => {
    expect(isValidCpf("529.982.247-25")).toBe(true);
    expect(isValidCpf("52998224725")).toBe(true);
  });

  it("rejects a wrong check digit", () => {
    expect(isValidCpf("529.982.247-24")).toBe(false);
  });

  it("rejects repeated digits", () => {
    expect(isValidCpf("111.111.111-11")).toBe(false);
  });

  it("rejects incomplete CPF", () => {
    expect(isValidCpf("529.982.247")).toBe(false);
  });
});

describe("isValidCnpj", () => {
  it("accepts a numeric CNPJ", () => {
    expect(isValidCnpj("11.222.333/0001-81")).toBe(true);
  });

  it("accepts an alphanumeric CNPJ in any case", () => {
    expect(isValidCnpj("00.000.000/E08G-12")).toBe(true);
    expect(isValidCnpj("00.000.000/e08g-12")).toBe(true);
  });

  it("rejects wrong check digits", () => {
    expect(isValidCnpj("11.222.333/0001-82")).toBe(false);
    expect(isValidCnpj("00.000.000/E08G-13")).toBe(false);
  });

  it("rejects letters in check digits", () => {
    expect(isValidCnpj("00.000.000/E08G-1A")).toBe(false);
  });
});

describe("documentKind and maskDocument", () => {
  it("treats up to eleven digits as CPF", () => {
    expect(documentKind(normalizeDocument("529.982.247-25"))).toBe("CPF");
    expect(maskDocument("52998224725")).toBe("529.982.247-25");
  });

  it("selects CNPJ for letters or more than eleven digits", () => {
    expect(maskDocument("11222333000181")).toBe("11.222.333/0001-81");
    expect(maskDocument("00000000e08g12")).toBe("00.000.000/E08G-12");
    expect(documentKind("12A")).toBe("CNPJ");
  });
});

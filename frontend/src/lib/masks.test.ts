import { describe, expect, it } from "vitest";

import { applyPattern, maskCep, maskPhone, onlyDigits } from "./masks";

describe("onlyDigits", () => {
  it("removes everything that is not a digit", () => {
    expect(onlyDigits("(11) 98765-4321")).toBe("11987654321");
  });

  it("returns an empty text when there are no digits", () => {
    expect(onlyDigits("abc")).toBe("");
  });
});

describe("applyPattern", () => {
  it.each([
    ["", ""],
    ["0", "0"],
    ["01310", "01310"],
    ["013109", "01310-9"],
    ["01310930", "01310-930"],
  ])("fits %j into #####-### as %j", (characters, expected) => {
    expect(applyPattern(characters, "#####-###")).toBe(expected);
  });

  it("ignores characters beyond the pattern", () => {
    expect(applyPattern("0131093099", "#####-###")).toBe("01310-930");
  });
});

describe("maskCep", () => {
  it("formats a CEP typed with any punctuation", () => {
    expect(maskCep("01.310 930")).toBe("01310-930");
  });
});

describe("maskPhone", () => {
  it("formats a landline with 10 digits", () => {
    expect(maskPhone("1134567890")).toBe("(11) 3456-7890");
  });

  it("formats a mobile with 11 digits", () => {
    expect(maskPhone("11987654321")).toBe("(11) 98765-4321");
  });
});

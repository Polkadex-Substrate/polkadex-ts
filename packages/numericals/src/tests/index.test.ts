import { rmTrailingZeros } from "../index";

describe("Utils function testing <> formatNumber", () => {
  it("Should convert 31.10322000 -> 31.10322", () => {
    const value = "31.10322000";
    const res = rmTrailingZeros(value);
    expect(res).toBe("31.10322");
  });
});

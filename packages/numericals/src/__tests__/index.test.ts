import {cleanNumberLike, decimalPlaces, rmTrailingZeros, trimFloat} from "../index";

// rmTrailingZeros function testing
describe("Utils function testing <> rmTrailingZeros", () => {
  it("Should convert 31.10322000 -> 31.10322", () => {
    const value = "31.10322000";
    const res = rmTrailingZeros(value);
    expect(res).toBe("31.10322");
  });
  it("Should convert 0.083000 -> 0.083", () => {
    const value = "0.083000";
    const res = rmTrailingZeros(value);
    expect(res).toBe("0.083");
  });
  it("Should convert 0.0000 -> 0", () => {
    const value = "0.00000";
    const res = rmTrailingZeros(value);
    expect(res).toBe("0");
  });
});

// trimFloat function testing
describe("Utils function testing <> trimFloat", () => {
  it("Should convert 10.563838100331 -> 10.563 for 3 decimal places", () => {
    const value = "10.563838100331";
    const res = trimFloat({ value, digitsAfterDecimal: 3 });
    expect(res).toBe("10.563");
  });
  it("Should convert 0.83828248131 -> 0.8 for 1 decimal places", () => {
    const value = "0.83828248131";
    const res = trimFloat({ value, digitsAfterDecimal: 1 });
    expect(res).toBe("0.8");
  });
  it("Should convert 0.83828248131 -> 0.83828248 for 8 decimal places", () => {
    const value = "0.83828248131";
    const res = trimFloat({ value });
    expect(res).toBe("0.83828248");
  });
});

// decimalPlaces function testing
describe("Utils function testing <> decimalPlaces", () => {
  it("Should get 10.563838100331 -> 12", () => {
    const value = "10.563838100331";
    const res = decimalPlaces(value);
    expect(res).toBe(12);
  });
  it("Should get 0.00123 -> 5", () => {
    const value = "0.00123";
    const res = decimalPlaces(value);
    expect(res).toBe(5);
  });
  it("Should get 0.00 -> 2", () => {
    const value = "0.00";
    const res = decimalPlaces(value);
    expect(res).toBe(2);
  });
});

describe('test number conversions', () => {
  it("Should clean and return valid big number", () => {
    const value = "1,232.00"
    const res = cleanNumberLike(value)
    expect(res).toBe("1232.00")
  })
});

import {
  cleanNumberLike,
  decimalPlaces,
  millify,
  rmTrailingZeros,
  trimFloat,
} from "../dist";

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

describe("test number conversions", () => {
  it("Should clean and return valid big number", () => {
    const value = "1,232.00";
    const res = cleanNumberLike(value);
    expect(res).toBe("1232.00");
  });
});

// millify function testing
describe("Utils function testing <> millify", () => {
  it("Should convert -4.72519 -> -4.72", () => {
    const value = "-4.72419";
    const res = millify(value);
    expect(res).toBe("-4.72");
  });
  it("Should convert 1.747113 -> 1.75", () => {
    const value = "1.747113";
    const res = millify(value);
    expect(res).toBe("1.75");
  });
  it("Should convert 75 -> 75", () => {
    const value = "75";
    const res = millify(value);
    expect(res).toBe("75");
  });
  it("Should convert 31.10322000 -> 31.1", () => {
    const value = "31.10322000";
    const res = millify(value);
    expect(res).toBe("31.1");
  });
  it("Should convert 996.37139913 -> 996.37", () => {
    const value = "996.37139913";
    const res = millify(value);
    expect(res).toBe("996.37");
  });
  it("Should convert 996.37139913 -> 996.371399", () => {
    const value = "996.37139913";
    const res = millify(value, 6, false);
    expect(res).toBe("996.371399");
  });
  it("Should convert 1000 -> 1K", () => {
    const value = "1000";
    const res = millify(value);
    expect(res).toBe("1K");
  });
  it("Should convert 1314 -> 1.31K", () => {
    const value = "1314";
    const res = millify(value);
    expect(res).toBe("1.31K");
  });
  it("Should convert 1024 -> 1.02K", () => {
    const value = "1024";
    const res = millify(value);
    expect(res).toBe("1.02K");
  });
  it("Should convert 4613913 -> 4.61M", () => {
    const value = "4613913";
    const res = millify(value);
    expect(res).toBe("4.61M");
  });
  it("Should convert 4613913 -> 4.6139 M", () => {
    const value = "4613913";
    const res = millify(value, 4, true);
    expect(res).toBe("4.6139 M");
  });
  it("Should convert 991393379379 -> 991.39B", () => {
    const value = "991393379379";
    const res = millify(value);
    expect(res).toBe("991.39B");
  });
  it("Should convert 78013880138038318308310 -> 78013880138.04T", () => {
    const value = "78013880138038318308310";
    const res = millify(value);
    expect(res).toBe("78013880138.04T");
  });
});

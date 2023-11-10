import { TrimFloatProps } from "./types";

// @Param - string
// @Desc - Removes the trailing zeros
export const rmTrailingZeros = (value: string): string => {
  return value
    .replace(/(\.\d*?)0+$/, "$1") // Remove trailing zeros after the decimal
    .replace(/\.$/, ""); // Remove the deciaml point if there are no decimal places)
};

// @Param - string/number
// @Desc - Trim the value till given decimal places (Prevent's roundoff)
export const trimFloat = ({
  value,
  digitsAfterDecimal = 8,
}: TrimFloatProps): string => {
  const valueString = value.toString();
  const decimalIndex = valueString.indexOf(".");

  if (decimalIndex !== -1) {
    const numberPart = valueString.substr(
      0,
      decimalIndex + digitsAfterDecimal + 1
    );
    return rmTrailingZeros(parseFloat(numberPart).toFixed(digitsAfterDecimal));
  }

  return rmTrailingZeros(valueString);
};

// @Param - string/number
// @Desc - Get count of digits after decimal
export const decimalPlaces = (num: number | string) => {
  const match = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) {
    return 0;
  }
  return Math.max(
    0,
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0) -
      // Adjust for scientific notation.
      (match[2] ? +match[2] : 0)
  );
};

// @Param - string/number
// @Desc - Removes the commas from a string
export const rmCommas = (value: string | number): string => {
  const valueStr = value.toString();
  return valueStr.replace(/,/g, "");
};

// @Param - string (could be float or int)
// @Desc - Check if number contains only zeros (i.e. 0.000000)
export const hasOnlyZeros = (floatString: string): boolean => {
  const floatValue = parseFloat(floatString);
  const integerValue = parseInt(floatString, 10);

  return floatValue === integerValue;
};

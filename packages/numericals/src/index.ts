import BigNumber from "bignumber.js";
import { minDecimalPlaces, planckToUnit } from "@polkadot-cloud/utils";

import { TrimFloatProps } from "./types";

/**
 * @summary - Removes the trailing zeros
 * @param value
 */
export const rmTrailingZeros = (value: string): string => {
  return value
    .replace(/(\.\d*?)0+$/, "$1") // Remove trailing zeros after the decimal
    .replace(/\.$/, ""); // Remove the deciaml point if there are no decimal places)
};

/**
 *
 * @param value
 * @param digitsAfterDecimal
 * @description
 * Trim the value till given decimal places (Prevent's roundoff)
 */
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
    return rmTrailingZeros(
      parseFloat(numberPart).toFixed(digitsAfterDecimal as number)
    );
  }

  return rmTrailingZeros(valueString);
};

/**
 * @param num
 * @summary Get count of digits after decimal
 */
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

/**
 * @param value
 * @summary Remove commas from the string
 */
export const rmCommas = (value: string | number): string => {
  const valueStr = value.toString();
  return valueStr.replace(/,/g, "");
};

/**
 * @param floatString
 * Check if number contains only zeros (i.e. 0.000000)
 */
export const hasOnlyZeros = (floatString: string): boolean => {
  const strippedFloatString = cleanNumberLike(floatString).toString();
  const floatValue = parseFloat(strippedFloatString);
  const integerValue = parseInt(strippedFloatString, 10);

  return floatValue === integerValue;
};

/**
 * @param val
 * @param units
 * @description
 * Converts a balance in token unit to an equivalent value in planck by applying the chain decimals
 * point. (1 token = 10^units planck).
 */
export const toUnit = (
  val: BigNumber | string | number,
  units: number
): BigNumber => {
  const num = new BigNumber(cleanNumberLike(val));
  return planckToUnit(num, units);
};

/**
 * @param val
 * @param units
 * Converts an on chain balance value in BigNumber planck to a decimal value in token unit. (1 token
 * = 10^units planck).
 */
export const toPlank = (
  val: BigNumber | string | number,
  units: number
): BigNumber => {
  const num = new BigNumber(cleanNumberLike(val));
  return planckToUnit(num, units);
};

/**
 * @param val
 * @summary Cleans the number like string and converts it to a BigNumber
 */
export const cleanNumberLike = (
  val: string | number | BigNumber
): BigNumber => {
  const cleanedVal = typeof val === "string" ? rmCommas(val) : val;
  return new BigNumber(cleanedVal);
};

/**
 * @param val
 * @param minDecimals
 * @summary Forces a number to have at least the provided decimal places.
 */
export const withMinDecimals = (
  val: string | number | BigNumber,
  minDecimals: number
): string => {
  const num = cleanNumberLike(val);
  return minDecimalPlaces(num.toString(), minDecimals);
};

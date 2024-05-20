import BigNumber from "bignumber.js";
import { millify as abbreviateNumber } from "millify";
import {
  minDecimalPlaces,
  planckToUnit,
  unitToPlanck,
} from "@polkadot-cloud/utils";

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
export const toPlanck = (
  val: BigNumber | string | number,
  units: number
): BigNumber => {
  const num = new BigNumber(cleanNumberLike(val));
  return unitToPlanck(num.toString(), units);
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

/**
 * @param value
 * @param space
 * @param precision
 * @param units i.e. ["" ,"B", "KB", "MB", "GB", "TB"]
 * @returns The abbreviated number as a string, formatted according to the specified options.
 * @summary Abbreviate large numbers to make it
 */
export const millify = (
  value: string | number,
  precision?: number,
  space?: boolean,
  units?: string[]
) => {
  const actualValue = rmCommas(value);
  const actualPrecision = precision ?? 2;
  const actualSpace = space || false;
  const actualUnits = units || ["", "K", "M", "B", "T", "P", "E"];

  if (+actualValue < Math.pow(2, 53)) {
    return abbreviateNumber(+actualValue, {
      precision: actualPrecision,
      space: actualSpace,
      units: actualUnits,
    });
  }

  const TRILLION = Math.pow(10, 12);

  return (
    (+actualValue / TRILLION).toFixed(actualPrecision) +
    (space ? " " : "") +
    "T"
  );
};

// * Credit goes to https://github.com/balancer/balancer-v2-monorepo/blob/8b5773510dfc7a94d4eef3e22d1de50becb0250d/lib/helpers/numbers.ts#L57-L86 for providing the solution.
export function parseScientific(num: string): string {
  // If the number is not in scientific notation return it as it is.
  if (!/\d+\.?\d*e[+-]*\d+/i.test(num)) {
    return num;
  }

  // Remove the sign.
  const numberSign = Math.sign(Number(num));
  num = Math.abs(Number(num)).toString();

  // Parse into coefficient and exponent.
  const [coefficient, exponent] = num.toLowerCase().split("e");
  let zeros = Math.abs(Number(exponent));
  const exponentSign = Math.sign(Number(exponent));
  const [integer, decimals] = (
    coefficient.indexOf(".") !== -1 ? coefficient : `${coefficient}.`
  ).split(".");

  if (exponentSign === -1) {
    zeros -= integer.length;
    num =
      zeros < 0
        ? integer.slice(0, zeros) + "." + integer.slice(zeros) + decimals
        : "0." + "0".repeat(zeros) + integer + decimals;
  } else {
    if (decimals) zeros -= decimals.length;
    num =
      zeros < 0
        ? integer + decimals.slice(0, zeros) + "." + decimals.slice(zeros)
        : integer + decimals + "0".repeat(zeros);
  }

  return numberSign < 0 ? "-" + num : num;
}

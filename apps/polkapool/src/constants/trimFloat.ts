export const formatNumber = (value: string): string => {
  return value.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
};

export const trimFloat = ({
  value,
  digitsAfterDecimal = 8,
}: {
  value: string | number;
  digitsAfterDecimal?: number;
}): string => {
  const valueString = value.toString();
  const decimalIndex = valueString.indexOf(".");

  if (decimalIndex !== -1) {
    const numberPart = valueString.substr(
      0,
      decimalIndex + digitsAfterDecimal + 1
    );
    return formatNumber(parseFloat(numberPart).toFixed(digitsAfterDecimal));
  }

  return formatNumber(valueString);
};

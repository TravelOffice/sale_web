// eslint-disable-next-line import/prefer-default-export
export const convertCurrencyToNumber = (currencyString: string | undefined) => {
  if (!currencyString) return 0;
  // Remove non-numeric characters from the currency string
  const numericString = currencyString.replace(/[^0-9.-]+/g, '');

  // Parse the numeric string as integer
  const numericValue = parseInt(numericString, 10);

  // Return the converted number
  return Number.isNaN(numericValue) ? 0 : numericValue;
};

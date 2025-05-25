export const formatToCurrency = (value: number): string => {
  if (Number.isNaN(value)) {
    throw new Error('Value must be a valid number');
  }

  return `£${value.toLocaleString('en-GB')}`;
};

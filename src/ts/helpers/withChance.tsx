export const withChance = (probability: number): boolean => {
  if (probability < 0 || probability > 1) {
    throw new Error('Probability must be between 0 and 1');
  }
  return Math.random() < probability;
};

// eslint-disable-next-line max-len
export const calculateZScore = (netScore: number, mean: number, stdDev: number): number => (netScore - mean) / stdDev;

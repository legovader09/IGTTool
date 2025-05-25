/* eslint-disable camelcase */
import { ResultEntry } from '../../../types/ResultEntry';

export const calculateNetScore = (entries: ResultEntry[]): number => {
  const freq_1_2 = entries.filter((entry) => entry.decision === 1 || entry.decision === 2).length;
  const freq_3_4 = entries.filter((entry) => entry.decision === 3 || entry.decision === 4).length;
  return freq_3_4 - freq_1_2;
};

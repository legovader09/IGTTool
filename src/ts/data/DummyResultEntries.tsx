import { ResultEntry } from '../types/ResultEntry';

export const DummyResultEntries = {
  generateEntries: (count: number = 100): ResultEntry[] => {
    const entries: ResultEntry[] = [];

    for (let i = 0; i < count; i++) {
      const entry: ResultEntry = {
        timeTaken: Math.floor(Math.random() * 5000),
        decision: Math.floor(Math.random() * 4) + 1,
      };
      entries.push(entry);
    }

    return entries;
  },
};

import { ResultEntry } from '../types/ResultEntry';

export interface IGTGameProps {
  onComplete: (results: ResultEntry[]) => void;
  numberOfRounds?: number;
}

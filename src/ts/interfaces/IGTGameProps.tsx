import { ResultEntry } from '../types/ResultEntry';

export interface IGTGameProps {
  onComplete: (results: ResultEntry[]) => void;
  immersiveMode: boolean;
  numberOfRounds?: number;
  startingMoney?: number;
  chanceOfFine?: number;
  badChoiceReward?: number,
  goodChoiceReward?: number,
  badChoiceFine?: number,
  goodChoiceFine?: number,
  goodChoices?: Set<number>,
}

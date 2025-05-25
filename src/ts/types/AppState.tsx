import { ResultEntry } from './ResultEntry';
import { States } from "../enums/States";

export type AppState = {
  results: ResultEntry[];
  currentState: States;
}
import * as React from 'react';
import { useState } from 'react';
import { IGTGameProps } from '../../interfaces/IGTGameProps';
import { ResultEntry } from '../../types/ResultEntry';
import { withChance } from '../../helpers/withChance';
import { Instructions } from './components/instructions';

export const IGTGame = ({
  onComplete,
  numberOfRounds = 100,
  startingMoney = 2000,
  chanceOfFine = 0.5,
  badChoiceReward = 100,
  goodChoiceReward = 50,
  badChoiceFine = 250,
  goodChoiceFine = 50,
  goodChoices = new Set([3, 4]),
}: IGTGameProps) => {
  const [resultEntries, setResults] = useState<ResultEntry[]>([]);
  const [currentRound, setRound] = useState<number>(1);
  const [money, setMoney] = useState(startingMoney);
  const [gameStarted, setGameStarted] = useState(false);

  // TODO: https://rcns.co.uk/ - https://igt-tool.streamlit.app/ - https://www.psytoolkit.org/experiment-library/igt.html#_download

  const updateMoney = (choice: number) => {
    const isGoodChoice = goodChoices.has(choice);
    const reward = isGoodChoice ? goodChoiceReward : badChoiceReward;
    const fine = isGoodChoice ? goodChoiceFine : badChoiceFine;

    setMoney((prev) => prev + reward);

    if (withChance(chanceOfFine)) {
      setMoney((prev) => prev - fine);
    }
  };

  const handleCardPress = (choice: number) => {
    if (currentRound < numberOfRounds) {
      updateMoney(choice);
      setResults((prev) => [...prev, { timeTaken: 1, decision: choice }]);
      setRound((prev) => prev + 1);
    } else {
      onComplete(resultEntries);
    }
  };

  const handleGameStart = () => {
    setGameStarted(true);
  };

  return (
    <section className="container igt-game">
      <section className="row">
        {gameStarted ? (
          <section className="col-12">
            <h1>IGT Tool</h1>
            <p>Your money: £{money}</p>
            <button
              type="button"
              className="btn btn--game"
              onClick={() => handleCardPress(1)}
              aria-label="Option A"
            >A
            </button>
            <button
              type="button"
              className="btn btn--game"
              onClick={() => handleCardPress(2)}
              aria-label="Option B"
            >B
            </button>
            <button
              type="button"
              className="btn btn--game"
              onClick={() => handleCardPress(3)}
              aria-label="Option C"
            >C
            </button>
            <button
              type="button"
              className="btn btn--game"
              onClick={() => handleCardPress(4)}
              aria-label="Option D"
            >D
            </button>
          </section>
        ) : (
          <Instructions
            onStart={handleGameStart}
            startingMoney={startingMoney}
            numberOfRounds={numberOfRounds}
          />
        )}
      </section>
    </section>
  );
};

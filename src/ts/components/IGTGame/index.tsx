import * as React from 'react';
import { useState } from 'react';
import { IGTGameProps } from '../../interfaces/IGTGameProps';
import { ResultEntry } from '../../types/ResultEntry';
import { withChance } from '../../helpers/withChance';
import { Instructions } from './components/instructions';
import { formatToCurrency } from '../../helpers/formatAsCurrency';
import { Loader } from '../Loader';

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
  const [currentRound, setRound] = useState(1);
  const [money, setMoney] = useState(startingMoney);
  const [gameStarted, setGameStarted] = useState(false);
  const [latestGain, setLatestGain] = useState(0);
  const [latestFine, setLatestFine] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // TODO: https://rcns.co.uk/ - https://igt-tool.streamlit.app/ - https://www.psytoolkit.org/experiment-library/igt.html#_download

  const updateMoney = (choice: number) => {
    const isGoodChoice = goodChoices.has(choice);
    const reward = isGoodChoice ? goodChoiceReward : badChoiceReward;
    const fine = isGoodChoice ? goodChoiceFine : badChoiceFine;

    setMoney((prev) => prev + reward);
    setLatestGain(reward);

    if (withChance(chanceOfFine)) {
      setMoney((prev) => prev - fine);
      setLatestFine(fine);
    } else {
      setLatestFine(0);
    }
  };

  const handleGameStart = () => {
    setGameStarted(true);
  };

  const handleGameEnd = () => {
    setShowLoader(true);

    setTimeout(() => {
      onComplete(resultEntries);
    }, 3000);
  };

  const handleCardPress = (choice: number) => {
    if (showReward) {
      setShowReward(false);
      return;
    }

    if (currentRound - 1 < numberOfRounds) {
      updateMoney(choice);
      setResults((prev) => [...prev, { timeTaken: 0, decision: choice }]);
      setRound((prev) => prev + 1);
      setShowReward(true);
    } else {
      handleGameEnd();
    }
  };

  if (showLoader) {
    return <Loader />;
  }

  return (
    <section className="container igt-game">
      <section className="row">
        {gameStarted ? (
          <>
            <section className="col-12">
              <p className="igt-game--balance">Your money: <b>£{money}</b></p>
            </section>
            <section className="col-12 mb-3 igt-game--balance-visual">
              {showReward && (
                <>
                  <div className="igt-game--block igt-game--block-reward">
                    <p>
                      You win {formatToCurrency(latestGain)}
                    </p>
                    <img src="../static/assets/icon-win.png" width={64} alt="Winner!" />
                  </div>
                  {latestFine > 0 ? (
                    <div className="igt-game--block igt-game--block-fine">
                      <p>
                        Fee of {formatToCurrency(latestFine)} applies now!
                      </p>
                      <img src="../static/assets/icon-fine.png" width={64} alt="Fined!" />
                    </div>
                  ) : (
                    <div className="igt-game--block igt-game--block-empty" />
                  )}
                </>
              )}
            </section>
            <section className="col-12 mb-3">
              <section className="igt-game--btn-container">
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
            </section>
            <button
              type="button"
              className={`col-12 btn igt-game--info-banner ${showReward ? 'highlight' : ''}`}
              onClick={() => setShowReward(false)}
            >
              <p>{showReward ? 'CLICK HERE TO COLLECT REWARD (and/or pay fee)' : 'CHOOSE AND CLICK/TAP ON ONE OF THE 4 BUTTONS'}</p>
            </button>
          </>
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

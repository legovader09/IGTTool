import * as React from 'react';
import { useEffect, useState } from 'react';
import { IGTGameProps } from '../../interfaces/IGTGameProps';
import { ResultEntry } from '../../types/ResultEntry';
import { withChance } from '../../helpers/withChance';
import { Instructions } from './components/instructions';
import { formatToCurrency } from '../../helpers/formatAsCurrency';
import { Loader } from '../Loader';

export const IGTGame = ({
  onComplete,
  immersiveMode,
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
  const [showEndScreen, setShowEndScreen] = useState(false);

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
      setShowEndScreen(true);
    }, 1100);
  };

  const handleCardPress = (choice: number) => {
    const isLastRound = currentRound - 1 === numberOfRounds;

    if (showReward) {
      setShowReward(false);
      if (isLastRound) handleGameEnd();
      return;
    }

    updateMoney(choice);
    setResults((prev) => [...prev, { timeTaken: 0, decision: choice }]);
    setRound((prevRound) => prevRound + 1);
    setShowReward(true);
  };

  useEffect(() => {
    const clickEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.btn--game') || target.closest('.igt-game--info-banner')) return;
      if (showReward) setShowReward(false);
    };

    window.addEventListener('click', clickEvent);

    return () => {
      window.removeEventListener('click', clickEvent);
    };
  }, [showReward]);

  if (showLoader) {
    return showEndScreen ? (
      <section className="container">
        <section className="row">
          <section className="col-12">
            <h3>Game Complete</h3>
            <p>You may now pass the device back to your Clinician.</p>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => onComplete(resultEntries)}
            >
              Show Results
            </button>
          </section>
        </section>
      </section>
    ) : <Loader />;
  }

  return (
    <>
      <section className={`immersive-mode ${immersiveMode ? 'show' : 'hide'}`} />
      <section className="container igt-game">
        <section className="row immersive">
          {gameStarted ? (
            <>
              <section className="col-12">
                <p className="igt-game--balance">Your money: <b>{formatToCurrency(money)}</b></p>
              </section>
              <section className="col-12 mb-3 igt-game--balance-visual">
                {showReward && (
                <>
                  <div className="igt-game--block igt-game--block-reward">
                    <p>
                      You win {formatToCurrency(latestGain)}
                    </p>
                    <img src="assets/icon-win.png" width={64} alt="Winner!" />
                  </div>
                  {latestFine > 0 ? (
                    <div className="igt-game--block igt-game--block-fine">
                      <p>
                        Fee of {formatToCurrency(latestFine)} applies now!
                      </p>
                      <img src="assets/icon-fine.png" width={64} alt="Fined!" />
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
                className={`col-12 btn btn--no-scale igt-game--info-banner ${showReward ? 'highlight' : ''}`}
                onClick={() => setShowReward(false)}
              >
                <p>{showReward ? `CLICK/TAP ANYWHERE TO COLLECT REWARD${latestFine > 0 ? ' AND PAY FEE' : ''}` : 'CLICK/TAP ANY OF THE 4 BUTTONS'}</p>
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
    </>
  );
};

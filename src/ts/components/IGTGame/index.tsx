import * as React from 'react';
import { useState } from 'react';
import { IGTGameProps } from '../../interfaces/IGTGameProps';
import { ResultEntry } from '../../types/ResultEntry';

export const IGTGame = ({ onComplete, numberOfRounds = 100 }: IGTGameProps) => {
  const [resultEntries, setResults] = useState<ResultEntry[]>([]);
  const [currentRound, setRound] = useState<number>(1);
  
  // TODO: https://rcns.co.uk/ - https://igt-tool.streamlit.app/ - https://www.psytoolkit.org/experiment-library/igt.html#_download

  const handleCardPress = (value: number) => {
    if (currentRound < numberOfRounds) {
      setResults((prev) => [...prev, { timeTaken: 1, decision: value }]);
      setRound(currentRound + 1);
    } else {
      onComplete(resultEntries);
    }
  };

  return (
    <section className="igt-game">
      <h1>IGT Tool</h1>
      <button
        type="button"
        onClick={() => handleCardPress(1)}
      >A
      </button>
      <button
        type="button"
        onClick={() => handleCardPress(2)}
      >B
      </button>
      <button
        type="button"
        onClick={() => handleCardPress(3)}
      >C
      </button>
      <button
        type="button"
        onClick={() => handleCardPress(4)}
      >D
      </button>
    </section>
  );
};

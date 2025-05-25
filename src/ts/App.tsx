import * as React from 'react';
import { useState } from 'react';
import { AppState } from './types/AppState';
import { ResultEntry } from './types/ResultEntry';

import { IGTGame } from './components/IGTGame';

export const App = () => {
  const [appState, setAppState] = useState<AppState>({ results: [] });

  const handleUpdateResults = (results: ResultEntry[]) => {
    setAppState((prevState) => ({
      ...prevState,
      results,
    }));
  };

  return appState && (
    <>
      <h1>Test: {appState.results.length}</h1>
      <IGTGame onComplete={handleUpdateResults} />
    </>
  );
};

import * as React from 'react';
import { useState } from 'react';
import { AppState } from './types/AppState';
import { ResultEntry } from './types/ResultEntry';

import { IGTGame } from './components/IGTGame';
import { States } from './enums/States';
import { IGTAnalyser } from './components/IGTAnalyser';

export const App = () => {
  const [appState, setAppState] = useState<AppState>({ results: [], currentState: States.Menu });

  const handleUpdateResults = (results: ResultEntry[]) => {
    setAppState((prevState) => ({
      ...prevState,
      results,
      currentState: States.Analysing,
    }));
  };

  const handleLaunchGame = () => {
    setAppState((prevState) => ({
      ...prevState,
      currentState: States.Playing,
    }));
  };

  return appState && (
    <section className="container">
      <section className="row justify-content-center">
        <section className="col-12 mb-2">
          <img src="static/logo.png" alt="RCNS" />
        </section>
        {appState.currentState === States.Menu && (
          <>
            <section className="col-12">
              <h2>Iowa Gambling Task</h2>
              <p>To get started, please choose one of the following:</p>
            </section>
            <section className="col-12 btn--grouped">
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleLaunchGame}
              >Run IGT Game & Analyser
              </button>
              <button type="button" className="btn btn--secondary">Analyse existing IGT Results</button>
            </section>
          </>
        )}
        {appState.currentState === States.Playing && (
          <section className="col-12">
            <IGTGame onComplete={handleUpdateResults} numberOfRounds={100} />
          </section>
        )}
        {appState.currentState === States.Analysing && (
          <section className="col-12">
            <IGTAnalyser data={appState.results} />
          </section>
        )}
      </section>
    </section>
  );
};

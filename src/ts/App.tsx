import * as React from 'react';
import { useState } from 'react';
import { AppState } from './types/AppState';
import { ResultEntry } from './types/ResultEntry';

import { IGTGame } from './components/IGTGame';
import { States } from './enums/States';
import { IGTAnalyser } from './components/IGTAnalyser';
import { DummyResultEntries } from './data/DummyResultEntries';

const initialValues: AppState = { results: [], currentState: States.Menu };

export const App = () => {
  const [appState, setAppState] = useState<AppState>(initialValues);

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

  const handleLaunchAnalyser = () => {
    setAppState({
      results: DummyResultEntries.generateEntries(100),
      currentState: States.Analysing,
    });
  };

  return appState && (
    <section className="container">
      <section className="row justify-content-center">
        <section className="col-12">
          <img src="assets/logo.png" alt="RCNS" />
        </section>
        <section className="col-12 mb-2">
          {appState.currentState !== States.Menu && (
            <button
              type="button"
              className="btn btn--inline"
              onClick={() => setAppState(initialValues)}
            >
              Go back
            </button>
          )}
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
              <button
                type="button"
                className="btn btn--secondary"
                onClick={handleLaunchAnalyser}
              >View example IGT Results
              </button>
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

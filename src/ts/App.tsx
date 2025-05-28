import * as React from 'react';
import { useRef, useState } from 'react';
import { AppState } from './types/AppState';
import { ResultEntry } from './types/ResultEntry';
import { States } from './enums/States';

import { copyTable } from './helpers/copyTable';
import { IGTGame } from './components/IGTGame';
import { IGTAnalyser } from './components/IGTAnalyser';
import { DummyResultEntries } from './data/DummyResultEntries';
import { saveToPdf } from './helpers/saveToPdf';

const initialValues: AppState = { results: [], currentState: States.Menu, immersiveMode: false };

export const App = () => {
  const [appState, setAppState] = useState<AppState>(initialValues);
  const tableRef = useRef(null);

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
      immersiveMode: false,
    });
  };

  const handleSetImmersiveMode = () => {
    setAppState((prevState) => {
      const newState = !prevState.immersiveMode;
      document.body.classList.toggle('immersive', newState);

      return ({
        ...prevState,
        immersiveMode: newState,
      });
    });
  };

  return appState && (
    <section className="container">
      <section className="row justify-content-center">
        <section className="col-12">
          <img src="assets/logo.png" alt="RCNS" />
        </section>
        <section className="col-12 mb-2">
          <section className="d-flex justify-content-between btn--grouped">
            {appState.currentState !== States.Menu && (
            <button
              type="button"
              className="btn btn--inline"
              onClick={() => setAppState(initialValues)}
            >
              Go back
            </button>
            )}

            {appState.currentState === States.Playing && (
              <button
                type="button"
                className={`btn btn--primary ${appState.immersiveMode ? 'immersive' : ''}`}
                onClick={handleSetImmersiveMode}
              >
                {appState.immersiveMode ? 'Exit Immersive Mode' : 'Enter Immersive Mode'}
              </button>
            )}

            {appState.currentState === States.Analysing && (
              <section className="btn--grouped">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => copyTable(tableRef.current.id)}
                >
                  Copy Data
                </button>
                {/* <button */}
                {/*  type="button" */}
                {/*  className="btn btn--secondary" */}
                {/*  onClick={() => saveToPdf('results-section')} */}
                {/* > */}
                {/*  <img className="mb-1 me-1" src="assets/icon-download.svg" width={16} alt="Download" /> */}
                {/*  Download as PDF */}
                {/* </button> */}
              </section>
            )}
          </section>
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
            <IGTGame
              onComplete={handleUpdateResults}
              immersiveMode={appState.immersiveMode}
              numberOfRounds={100}
            />
          </section>
        )}
        {appState.currentState === States.Analysing && (
          <section className="col-12">
            <IGTAnalyser data={appState.results} tableRef={tableRef} />
          </section>
        )}
      </section>
    </section>
  );
};

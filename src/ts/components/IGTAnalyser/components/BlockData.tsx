import * as React from 'react';
import { ReactNode } from 'react';
import { IGTAnalyserProps } from '../../../interfaces/IGTAnalyserProps';
import { ResultEntry } from '../../../types/ResultEntry';

export const BlockData = ({ data, isVisible = false }: IGTAnalyserProps) => {
  const blocks = [];
  for (let i = 0; i < data.length; i += 20) {
    blocks.push(data.slice(i, i + 20));
  }

  const getDecisionCounts = (entries: ResultEntry[]) => {
    const counts = {
      A: 0, B: 0, C: 0, D: 0,
    };
    entries.forEach((entry) => {
      switch (entry.decision) {
        case 1:
          counts.A++;
          break;
        case 2:
          counts.B++;
          break;
        case 3:
          counts.C++;
          break;
        case 4:
          counts.D++;
          break;
        default:
          break;
      }
    });
    return counts;
  };

  return (
    <section className={`col-12 igt-analyser ${isVisible ? '' : 'hide'}`}>
      <section className="container">
        <section className="row">
          {blocks.map((blockEntries, blockIndex) => {
            const counts = getDecisionCounts(blockEntries);

            return (
              <div key={blockIndex} className="col">
                <h5>Block {blockIndex + 1}</h5>
                <table className="igt-analyser--table">
                  <thead>
                    <tr>
                      <th>Choice</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(counts).map(([letter, count]) => (
                      <tr key={letter}>
                        <td>{letter}</td>
                        <td>{count}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>Net</td>
                      <td>{(counts.D + counts.C) - (counts.B - counts.A)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
          <section className="col">
            {(() => {
              const counts = getDecisionCounts(data);

              return (
                <>
                  <h5>Frequencies</h5>
                  <table className="igt-analyser--table">
                    <thead>
                      <tr>
                        <th>Choice</th>
                        <th>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>A</td>
                        <td>{counts.A}</td>
                      </tr>
                      <tr>
                        <td>B</td>
                        <td>{counts.B}</td>
                      </tr>
                      <tr>
                        <td>C</td>
                        <td>{counts.C}</td>
                      </tr>
                      <tr>
                        <td>D</td>
                        <td>{counts.D}</td>
                      </tr>
                    </tbody>
                  </table>
                </>
              );
            })()}
          </section>
        </section>
      </section>
    </section>
  );
};

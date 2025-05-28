import * as React from 'react';
import { useEffect, useState } from 'react';
import { IGTAnalyserProps } from '../../../interfaces/IGTAnalyserProps';
import { ResultEntry } from '../../../types/ResultEntry';
import { IGTAnalyserBlockData } from '../../../types/IGTAnalyserBlockData';

export const BlockData = ({ data, isVisible = true }: IGTAnalyserProps) => {
  const [blocks, setBlocks] = useState<IGTAnalyserBlockData[]>([]);

  const getDecisionCounts = (entries: ResultEntry[]) => {
    const counts: IGTAnalyserBlockData = {
      A: 0, B: 0, C: 0, D: 0, Raw: 0,
    };

    const decisionMap: Record<number, keyof Omit<IGTAnalyserBlockData, 'Raw'>> = {
      1: 'A', 2: 'B', 3: 'C', 4: 'D',
    };

    entries.forEach((entry) => {
      const key = decisionMap[entry.decision];
      if (key) counts[key]++;
    });

    counts.Raw = (counts.C + counts.D) - (counts.A + counts.B);
    return counts;
  };

  useEffect(() => {
    const newBlocks: IGTAnalyserBlockData[] = [];
    for (let i = 0; i < data.length; i += 20) {
      const dataBlock = data.slice(i, i + 20);
      const counts = getDecisionCounts(dataBlock);
      newBlocks.push(counts);
    }
    setBlocks(newBlocks);
  }, []);

  return blocks && (
    <section className={`col-12 igt-analyser ${isVisible ? '' : 'hide'}`}>
      <section className="container">
        <section className="row">
          {blocks.map((blockEntries, blockIndex) => (
            <div key={blockIndex} className="col col-md-4 col-lg-2 d-flex flex-column">
              <h5>Block {blockIndex + 1}</h5>
              <table className="igt-analyser--table">
                <thead>
                  <tr>
                    <th>Choice</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(blockEntries).map(([letter, count]) => (
                    <tr key={letter}>
                      <td>{letter}</td>
                      <td>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <section className="col col-md-4 col-lg-2 d-flex flex-column">
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

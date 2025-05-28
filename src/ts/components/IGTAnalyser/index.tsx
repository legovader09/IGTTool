import * as React from 'react';
import { useEffect, useState } from 'react';
import { IGTAnalyserProps } from '../../interfaces/IGTAnalyserProps';
import { IGTAnalyserEntry } from '../../types/IGTAnalyserEntry';
import { calculateNetScore } from './helpers/calculcateNetScore';
import { Norms } from './components/Norms';
import { calculateZScore } from './helpers/calculateZScore';
import { classifyZScore } from './helpers/classifyZScore';
import { BlockData } from './components/BlockData';

export const IGTAnalyser = ({ data, tableRef }: IGTAnalyserProps) => {
  const [resultData, setResultData] = useState<IGTAnalyserEntry[]>();

  useEffect(() => {
    const netScore = calculateNetScore(data);
    const results: IGTAnalyserEntry[] = Object.entries(Norms).map(([key, value]) => {
      const zScore = calculateZScore(netScore, value.mean, value.std_dev);
      return ({
        group: key,
        netScore,
        zScore,
        descriptor: classifyZScore(zScore),
      });
    });
    setResultData(results);
  }, []);

  return resultData && (
    <>
      <section className="container">
        <section className="row">
          <section className="col-12">
            <section className="alert alert-warning animate-visible">
              <h6>Warning</h6>
              <p className="m-0 p-0">
                This data will disappear once you go back or close this tab.
              </p>
            </section>
          </section>
        </section>
      </section>
      <section id="results-section" className="container igt-analyser animate-visible">
        <section className="row">
          <section className="col-12">
            <table id="dataTable" className="igt-analyser--table-full-width" ref={tableRef}>
              <thead>
                <tr>
                  <th>Group</th>
                  <th>Raw Score</th>
                  <th>Z Score</th>
                  <th>Descriptor</th>
                </tr>
              </thead>
              <tbody>
                {resultData.map((entry) => (
                  <tr key={entry.group}>
                    <td>{entry.group}</td>
                    <td>{entry.netScore.toFixed(0)}</td>
                    <td>{entry.zScore.toFixed(3)}</td>
                    <td>{entry.descriptor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <BlockData data={data} />
        </section>
      </section>
    </>
  );
};

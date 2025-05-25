import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { IGTAnalyserProps } from '../../interfaces/IGTAnalyserProps';
import { IGTAnalyserEntry } from '../../types/IGTAnalyserEntry';
import { calculateNetScore } from './helpers/calculcateNetScore';
import { Norms } from './components/Norms';
import { calculateZScore } from './helpers/calculateZScore';
import { classifyZScore } from './helpers/classifyZScore';
import { copyTable } from '../../helpers/copyTable';

export const IGTAnalyser = ({ data }: IGTAnalyserProps) => {
  const [resultData, setResultData] = useState<IGTAnalyserEntry[]>();
  const tableRef = useRef();

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
    <section className="container igt-analyser animate-visible">
      <section className="row">
        <table id="dataTable" className="col-12" ref={tableRef}>
          <thead>
            <tr>
              <th>Group</th>
              <th>Net Score</th>
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
        <section className="col-12">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => copyTable(tableRef.current.id)}
          >
            Copy Data
          </button>
        </section>
      </section>
    </section>
  );
};

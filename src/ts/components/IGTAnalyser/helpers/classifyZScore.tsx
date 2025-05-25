export const classifyZScore = (zScore: number): string => {
  const thresholds = [
    { range: 2, label: 'Exceptionally High Score' },
    { range: 1.33, label: 'Above Average Score' },
    { range: 0.67, label: 'High Average Score' },
    { range: -0.67, label: 'Average Score' },
    { range: -1.33, label: 'Low Average Score' },
    { range: -2, label: 'Below Average Score' },
    { range: -3.2, label: 'Exceptionally Low Score' },
  ];

  const match = thresholds.find((threshold) => zScore >= threshold.range);
  return match ? match.label : 'Score Out of Range';
};

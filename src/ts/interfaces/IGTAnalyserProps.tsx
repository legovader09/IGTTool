import * as React from 'react';
import { ResultEntry } from '../types/ResultEntry';

export interface IGTAnalyserProps {
  data: ResultEntry[];
  isVisible?: boolean;
  tableRef?: React.Ref<any>;
}

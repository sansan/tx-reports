import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'store';

const selectReportSlice = (state: RootState) => state.report;

export const selectQuery = createSelector(
  selectReportSlice,
  (state) => state.query
);

export const selectGroupKey = createSelector(
  selectReportSlice,
  (state) => state.groupKey
);

export const selectShowChart = createSelector(
  selectReportSlice,
  (state) => state.showChart
);

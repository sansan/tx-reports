/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReportApiRequestBody } from 'typings';

export interface AppState {
  value: number;
  query: ReportApiRequestBody;
  groupKey: 'projectId' | 'gatewayId';
  showChart: boolean;
}

const initialState: AppState = {
  value: 0,
  query: {},
  groupKey: 'projectId',
  showChart: false,
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<ReportApiRequestBody>) => {
      const { projectId, gatewayId } = action.payload;

      state.query = action.payload;

      if (projectId && !gatewayId) {
        state.groupKey = 'gatewayId';
      } else {
        state.groupKey = 'projectId';
      }

      if ((!projectId && gatewayId) || (projectId && !gatewayId)) {
        state.showChart = true;
      } else {
        state.showChart = false;
      }
    },
  },
});

export const { setQuery } = reportSlice.actions;

export default reportSlice.reducer;

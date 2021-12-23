/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReportApiRequestBody } from 'typings';

export interface AppState {
  shouldFetch: boolean;
  query: ReportApiRequestBody;
  groupKey: 'projectId' | 'gatewayId' | null;
  showChart: boolean;
  expandTable: Record<string, boolean>;
}

const initialState: AppState = {
  shouldFetch: false,
  query: {},
  groupKey: 'projectId',
  showChart: false,
  expandTable: {},
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<ReportApiRequestBody>) => {
      const { projectId, gatewayId, from, to } = action.payload;

      state.shouldFetch = true;

      state.query = {
        projectId: projectId!.length ? projectId : undefined,
        gatewayId: gatewayId!.length ? gatewayId : undefined,
        from: from!.length ? from : undefined,
        to: to!.length ? to : undefined,
      };

      if (projectId && !gatewayId) {
        state.groupKey = 'gatewayId';
      }

      if (!projectId && gatewayId) {
        state.groupKey = 'projectId';
      }

      if (projectId && gatewayId) {
        state.groupKey = null;
      }

      if ((!projectId && gatewayId) || (projectId && !gatewayId)) {
        state.showChart = true;
      } else {
        state.showChart = false;
      }

      state.expandTable = {};
    },
  },
});

export const { setQuery } = reportSlice.actions;

export default reportSlice.reducer;

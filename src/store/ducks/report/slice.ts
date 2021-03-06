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

      state.query.projectId = projectId!.length ? projectId : undefined;
      state.query.gatewayId = gatewayId!.length ? gatewayId : undefined;
      state.query.from = from!.length ? from : undefined;
      state.query.to = to!.length ? to : undefined;

      if (projectId && !gatewayId) {
        state.groupKey = 'gatewayId';
      }

      if ((!projectId && gatewayId) || (!projectId && !gatewayId)) {
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
    setExpandTable: (
      state,
      { payload }: PayloadAction<{ id: string; value: boolean }>
    ) => {
      state.expandTable[payload.id] = payload.value;
    },
    resetReportSlice: () => initialState,
  },
});

export const { setQuery, setExpandTable, resetReportSlice } =
  reportSlice.actions;

export default reportSlice.reducer;

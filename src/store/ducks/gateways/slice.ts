/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { reportsApi } from '../api/slice';
import gatewayAdapter from './adapter';

export interface AppState {
  value: number;
}

const initialState: AppState = {
  value: 0,
};

export const gatewaysSlice = createSlice({
  name: 'gateways',
  initialState: gatewayAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      reportsApi.endpoints.getAllGateways.matchFulfilled,
      (state, { payload }) => {
        gatewayAdapter.upsertMany(state, payload);
      }
    );
  },
});

export default gatewaysSlice.reducer;

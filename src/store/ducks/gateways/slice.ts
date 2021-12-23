/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { reportsApi } from '../api/slice';
import gatewayAdapter from './adapter';

export const gatewaysSlice = createSlice({
  name: 'gateways',
  initialState: gatewayAdapter.getInitialState(),
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

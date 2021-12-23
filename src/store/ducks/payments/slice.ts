/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { reportsApi } from '../api/slice';
import paymentsAdapter from './adapter';

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState: paymentsAdapter.getInitialState(),
  reducers: {
    clearPaymentData: (state) => {
      paymentsAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      reportsApi.endpoints.getReport.matchFulfilled,
      (state, { payload }) => {
        paymentsAdapter.upsertMany(state, payload);
      }
    );
  },
});

export const { clearPaymentData } = paymentsSlice.actions;

export default paymentsSlice.reducer;

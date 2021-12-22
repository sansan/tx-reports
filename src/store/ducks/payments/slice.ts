/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import paymentsAdaptor from './adapter';

export interface AppState {
  value: number;
}

const initialState: AppState = {
  value: 0,
};

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState: paymentsAdaptor.getInitialState(initialState),
  reducers: {
    clearPaymentData: (state) => {
      paymentsAdaptor.removeAll(state);
    },
  },
});

export const { clearPaymentData } = paymentsSlice.actions;

export default paymentsSlice.reducer;

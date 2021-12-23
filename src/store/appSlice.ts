/* eslint-disable no-param-reassign */
import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { Payment } from 'typings';
import { reportsApi } from './ducks/api/slice';

export interface AppState {
  value: number;
  payments: Payment[];
}

const initialState: AppState = {
  value: 0,
  payments: [],
};

const adapter = createEntityAdapter<Payment>({
  selectId: ({ paymentId }) => paymentId,
  sortComparer: (a, b) =>
    new Date(a.created).valueOf() - new Date(b.created).valueOf(),
});

export const appSlice = createSlice({
  name: 'counter',
  initialState: adapter.getInitialState(initialState),
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      reportsApi.endpoints.getReport.matchFulfilled,
      (state, { payload }) => {
        adapter.upsertMany(state, payload);
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = appSlice.actions;

export default appSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import projectsAdaptor from './adapter';

export interface AppState {
  value: number;
}

const initialState: AppState = {
  value: 0,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: projectsAdaptor.getInitialState(initialState),
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = appSlice.actions;

export default projectsSlice.reducer;

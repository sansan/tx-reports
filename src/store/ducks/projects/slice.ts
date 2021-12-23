/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { reportsApi } from '../api/slice';
import projectsAdapter from './adapter';

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: projectsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      reportsApi.endpoints.getAllProjects.matchFulfilled,
      (state, { payload }) => {
        projectsAdapter.upsertMany(state, payload);
      }
    );
  },
});

export default projectsSlice.reducer;

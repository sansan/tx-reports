// import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from 'store';

import projectAdapter from './adapter';

const selectProjectsSlice = (state: RootState) => state.projects;

export const {
  selectById: selectProjectById,
  selectIds: selectProjectIds,
  selectEntities: selectProjectEntities,
  selectAll: selectAllProjects,
  selectTotal: selectTotalProjects,
} = projectAdapter.getSelectors(selectProjectsSlice);

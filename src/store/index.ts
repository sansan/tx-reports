/* eslint-disable import/no-named-as-default */
import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';

import gateways from './ducks/gateways/slice';
import payments from './ducks/payments/slice';
import projects from './ducks/projects/slice';
import report from './ducks/report/slice';
import { reportsApi } from './ducks/api/slice';

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
  configureStore({
    reducer: {
      gateways,
      payments,
      projects,
      report,
      [reportsApi.reducerPath]: reportsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(reportsApi.middleware),
    ...options,
  });

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

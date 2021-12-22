/* eslint-disable import/no-named-as-default */
import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';

import appSlice from './appSlice';
import { reportsApi } from './reportsApi';

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
  configureStore({
    reducer: {
      appSlice,
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

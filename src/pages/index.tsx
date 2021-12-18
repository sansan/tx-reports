import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { DefaultLayout } from 'components/layouts';

import Dashboard from './Dashboard';

const Apps = lazy(() => import('./Apps'));
const Reports = lazy(() => import('./Reports'));
const Monitor = lazy(() => import('./Monitor'));

const PagesRouter = () => (
  <Routes>
    <Route path="/" element={<DefaultLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/monitor"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Monitor />
          </Suspense>
        }
      />
      <Route
        path="/reports"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Reports />
          </Suspense>
        }
      />
      <Route
        path="/apps"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Apps />
          </Suspense>
        }
      />
    </Route>
  </Routes>
);

export default PagesRouter;

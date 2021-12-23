import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { useAppDispatch } from 'hooks';
import { resetReportSlice } from 'store/ducks/report/slice';
import { clearPaymentData } from 'store/ducks/payments/slice';
import { DefaultLayout } from 'components/layouts';

import Dashboard from './Dashboard';

const Apps = lazy(() => import('./Apps'));
const Reports = lazy(() => import('./ReportPage'));
const Monitor = lazy(() => import('./Monitor'));

const PagesRouter = () => {
  const dispatch = useAppDispatch();
  const [prevPath, setPrevPath] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (prevPath.includes('reports')) {
      dispatch(resetReportSlice());
      dispatch(clearPaymentData());
    }
    setPrevPath(location.pathname);
  }, [dispatch, location, prevPath]);

  return (
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
};

export default PagesRouter;

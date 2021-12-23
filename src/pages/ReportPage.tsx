import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';

import { useAppSelector, useAppDispatch } from 'hooks';
import { selectQuery, selectShouldFetch } from 'store/ducks/report/selectors';
import {
  useLazyGetReportQuery,
  useGetAllGatewaysQuery,
  useGetAllProjectsQuery,
} from 'store/ducks/api/slice';
import { clearPaymentData } from 'store/ducks/payments/slice';
import { resetReportSlice } from 'store/ducks/report/slice';

import ReportPageTemplate from 'components/templates/ReportPage';

const mapStateToProps = createStructuredSelector({
  shouldFetch: selectShouldFetch,
  query: selectQuery,
});

const ReportPage: React.FC = () => {
  const { shouldFetch, query } = useAppSelector(mapStateToProps);
  const dispatch = useAppDispatch();
  const { from, to, projectId, gatewayId } = query;
  const [loadReportData, result] = useLazyGetReportQuery();
  const { isLoading: isGatewaysLoading } = useGetAllGatewaysQuery();
  const { isLoading: isProjectLoading } = useGetAllProjectsQuery();

  const { isSuccess, isFetching, isError } = result;
  const isLoading = isGatewaysLoading || isProjectLoading || isFetching;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (shouldFetch) {
      loadReportData({ from, to, projectId, gatewayId });

      return () => {
        dispatch(clearPaymentData());
        dispatch(resetReportSlice());
      };
    }
  }, [from, to, projectId, gatewayId, loadReportData, shouldFetch, dispatch]);

  return (
    <ReportPageTemplate
      isSuccess={isSuccess}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default ReportPage;

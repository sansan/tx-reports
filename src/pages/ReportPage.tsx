import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';

import { useAppSelector } from 'hooks';
import { selectQuery, selectShouldFetch } from 'store/ducks/report/selectors';
import {
  useLazyGetReportQuery,
  useGetAllGatewaysQuery,
  useGetAllProjectsQuery,
} from 'store/ducks/api/slice';

import ReportPageTemplate from 'components/templates/ReportPage';

const mapStateToProps = createStructuredSelector({
  shouldFetch: selectShouldFetch,
  query: selectQuery,
});

const ReportPage: React.FC = () => {
  const { shouldFetch, query } = useAppSelector(mapStateToProps);
  const { from, to, projectId, gatewayId } = query;
  const [loadReportData, result] = useLazyGetReportQuery();
  const { isLoading: isGatewaysLoading } = useGetAllGatewaysQuery();
  const { isLoading: isProjectLoading } = useGetAllProjectsQuery();

  const { isSuccess, isFetching, isError } = result;
  const isLoading = isGatewaysLoading || isProjectLoading || isFetching;

  useEffect(() => {
    if (shouldFetch) {
      loadReportData({ from, to, projectId, gatewayId });
    }
  }, [from, to, projectId, gatewayId, loadReportData, shouldFetch]);

  return (
    <ReportPageTemplate
      isSuccess={isSuccess}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default ReportPage;

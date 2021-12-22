import React, { useState, useEffect } from 'react';

import { ReportApiRequestBody, Project, Gateway } from 'typings';

import {
  useLazyGetReportQuery,
  useGetAllGatewaysQuery,
  useGetAllProjectsQuery,
} from 'store/reportsApi';

import ReportPageTemplate from 'components/templates/ReportPage';

const ReportPage: React.FC = () => {
  const [query, setQuery] = useState<ReportApiRequestBody>({});
  const [expandedReport, setExpandedReport] = useState<Record<number, boolean>>(
    { 0: true }
  );
  const { from, to, projectId, gatewayId } = query;
  const [loadReportData, result] = useLazyGetReportQuery();
  const { data: gateways, isLoading: isGatewaysLoading } =
    useGetAllGatewaysQuery();
  const { data: projects, isLoading: isProjectLoading } =
    useGetAllProjectsQuery();
  const gatewayMap = new Map<string, Gateway>();
  const projectMap = new Map<string, Project>();

  gateways?.forEach((gateway) => {
    gatewayMap.set(gateway.gatewayId, gateway);
  });

  projects?.forEach((project) => {
    projectMap.set(project.projectId, project);
  });

  const { data, isSuccess, isFetching } = result;
  const isLoading = isGatewaysLoading || isProjectLoading || isFetching;

  useEffect(() => {
    if (typeof from !== 'undefined') {
      loadReportData({ from, to, projectId, gatewayId });
      setExpandedReport({ 0: true });
    }
  }, [from, to, projectId, gatewayId, loadReportData]);

  return (
    <ReportPageTemplate
      data={data}
      query={query}
      onGenerateReport={setQuery}
      gateways={gateways}
      projects={projects}
      projectMap={projectMap}
      gatewayMap={gatewayMap}
      isSuccess={isSuccess}
      isLoading={isLoading}
      expandedReport={expandedReport}
      setExpandedReport={setExpandedReport}
    />
  );
};

export default ReportPage;

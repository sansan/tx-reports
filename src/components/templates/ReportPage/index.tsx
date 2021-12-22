import React from 'react';
import { Flex, CircularProgress } from '@chakra-ui/react';

import { Payment, Gateway, Project, ReportApiRequestBody } from 'typings';
import { PageHeader } from 'components/molecules';

import SearchForm from './SearchForm';
import Report from './Report';
import NoData from './NoData';

type ReportPageTemplateProps = {
  data?: Payment[];
  query: ReportApiRequestBody;
  onGenerateReport: Function;
  gateways?: Gateway[];
  projects?: Project[];
  projectMap: Map<string, Project>;
  gatewayMap: Map<string, Gateway>;
  isSuccess: boolean;
  isLoading: boolean;
  expandedReport: Record<number, boolean>;
  setExpandedReport: Function;
};

const ReportPageTemplate: React.FC<ReportPageTemplateProps> = ({
  data,
  query,
  onGenerateReport,
  gateways,
  projects,
  projectMap,
  gatewayMap,
  isSuccess,
  isLoading,
  expandedReport,
  setExpandedReport,
}) => (
  <Flex flexDirection="column" w="100%">
    <Flex
      flexDirection={{ base: 'column', lg: 'row' }}
      justifyContent="space-between"
      w="100%"
      mb="1.75rem"
    >
      <PageHeader
        title="Reports"
        subtitle="Easily generate a report of your transactions"
      />
      <SearchForm
        onSubmit={onGenerateReport}
        isLoading={isLoading}
        gateways={gateways}
        projects={projects}
      />
    </Flex>

    {!data?.length && <NoData />}

    {isLoading && <CircularProgress value={59} size="100px" thickness="4px" />}

    {isSuccess && (
      <Report
        data={data}
        projectMap={projectMap}
        gatewayMap={gatewayMap}
        query={query}
        expandedReport={expandedReport}
        setExpandedReport={setExpandedReport}
      />
    )}
  </Flex>
);

ReportPageTemplate.defaultProps = {
  data: [],
  gateways: [],
  projects: [],
};

export default ReportPageTemplate;

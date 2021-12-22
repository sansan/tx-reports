import React from 'react';
import { groupBy, orderBy } from 'lodash';
import { Heading, Collapse, Box, Stack } from '@chakra-ui/react';

import { Payment, ReportApiRequestBody, Project, Gateway } from 'typings';
import { formatCurrency } from 'utils';

import { Container } from 'components/atoms';

import DataTable from './Table';
import Chart from './Chart';

type ReportProps = {
  data?: Payment[];
  query: ReportApiRequestBody;
  expandedReport: Record<number, boolean>;
  setExpandedReport: Function;
  projectMap: Map<string, Project>;
  gatewayMap: Map<string, Gateway>;
};

const Report: React.FC<ReportProps> = ({
  data,
  query,
  expandedReport,
  setExpandedReport,
  projectMap,
  gatewayMap,
}) => {
  const { projectId, gatewayId } = query;
  const showChart = projectId && gatewayId ? false : projectId || gatewayId;

  if (!data?.length) {
    return null;
  }
  let groupKey = 'projectId';

  if (projectId && !gatewayId) {
    groupKey = 'gatewayId';
  }

  const gatewayName = gatewayId
    ? gatewayMap.get(gatewayId)?.name
    : 'All projects';
  const projectName = projectId
    ? projectMap.get(projectId)?.name
    : 'All Gateways';

  const title = `${projectName} | ${gatewayName}`;
  const total = data.reduce((prev, { amount }) => prev + amount, 0);
  const totalTitle = `${projectId && !gatewayId ? 'PROJECT' : ''}${
    gatewayId && !projectId ? 'GATEWAY' : ''
  } TOTAL`;
  const arrangedData = groupBy(orderBy(data, ['created'], ['asc']), groupKey);

  const handleExpandReport = (index: number) => {
    if (typeof expandedReport[index] === 'undefined') {
      setExpandedReport({ ...expandedReport, [index]: true });

      return;
    }

    setExpandedReport({ ...expandedReport, [index]: !expandedReport[index] });
  };

  const getRowTitle = (key: string) =>
    groupKey === 'projectId'
      ? projectMap.get(key)?.name
      : gatewayMap.get(key)?.name;

  return (
    <Stack
      direction={showChart ? 'row' : 'column'}
      w="100%"
      gridGap={showChart ? '2rem' : '1.5rem'}
    >
      <Container w="100%">
        <Heading size="sm" mb="2rem">
          {title}
        </Heading>

        {Object.keys(arrangedData).map((key, index) => (
          <React.Fragment key={key}>
            {(!projectId || !gatewayId) && (
              <Container
                variant="secondary"
                onClick={() => handleExpandReport(index)}
                _notFirst={{ marginTop: '5px' }}
              >
                {getRowTitle(key)}
              </Container>
            )}
            <Collapse in={!!expandedReport[index]} animateOpacity>
              <DataTable
                data={arrangedData[key]}
                showGatewayId={!(groupKey === 'gatewayId')}
              />
            </Collapse>
          </React.Fragment>
        ))}
      </Container>
      <Box w="100%">
        {showChart && (
          <Chart
            data={arrangedData}
            total={total}
            groupKey={groupKey}
            projectMap={projectMap}
            gatewayMap={gatewayMap}
          />
        )}
        <Container>
          <Heading size="sm">
            {totalTitle} | {formatCurrency(total)} USD
          </Heading>
        </Container>
      </Box>
    </Stack>
  );
};

Report.defaultProps = {
  data: [],
};

export default Report;

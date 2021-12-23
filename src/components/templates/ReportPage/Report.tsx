import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Heading, Box, Stack } from '@chakra-ui/react';

import { useAppSelector } from 'hooks';
import {
  selectTableTitle,
  selectShowChart,
  selectGroupKey,
  selectTableTotalRowTitle,
} from 'store/ducks/report/selectors';
import { selectAllProjects } from 'store/ducks/projects/selectors';
import { selectAllGateways } from 'store/ducks/gateways/selectors';

import { Container } from 'components/atoms';

import DataGroup from './DataGroup';
import Chart from './Chart';

const mapStateToProps = createStructuredSelector({
  reportTitle: selectTableTitle,
  showChart: selectShowChart,
  groupKey: selectGroupKey,
  projects: selectAllProjects,
  gateways: selectAllGateways,
  totalTitle: selectTableTotalRowTitle,
});

const Report: React.FC = () => {
  const { reportTitle, showChart, groupKey, projects, gateways, totalTitle } =
    useAppSelector(mapStateToProps);

  return (
    <Stack
      direction={showChart ? 'row' : 'column'}
      w="100%"
      gridGap={showChart ? '2rem' : '1.5rem'}
    >
      <Container w="100%">
        <Heading size="sm" mb="2rem">
          {reportTitle}
        </Heading>
        {groupKey === 'projectId'
          ? projects.map(({ projectId, name }) => (
              <DataGroup key={projectId} title={name} id={projectId} />
            ))
          : gateways.map(({ gatewayId, name }) => (
              <DataGroup key={gatewayId} title={name} id={gatewayId} />
            ))}
      </Container>
      <Box w="100%">
        {showChart && <Chart />}
        <Container>
          <Heading size="sm">{totalTitle}</Heading>
        </Container>
      </Box>
    </Stack>
  );
};

Report.defaultProps = {
  data: [],
};

export default Report;

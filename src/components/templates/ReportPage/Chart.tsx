import React from 'react';
import { Box, Text, HStack, Flex } from '@chakra-ui/react';
import { PieChart } from 'react-minimal-pie-chart';

import { Gateway, Project, Payment } from 'typings';
import { Container } from 'components/atoms';

type ChartProps = {
  data: Record<string, Payment[]>;
  total: number;
  groupKey: string;
  gatewayMap: Map<string, Gateway>;
  projectMap: Map<string, Project>;
};

const colors = ['#A259FF', '#6497B1', '#FFC107', '#F24E1E'];

const defaultLabelStyle = {
  fontSize: '0.5rem',
  fontWeight: 'medium',
  fontFamily: 'Roboto',
  fill: '#fff',
};

const Chart: React.FC<ChartProps> = ({
  data,
  total,
  groupKey,
  gatewayMap,
  projectMap,
}) => {
  const legendKeys = Object.keys(data).map((v) =>
    groupKey === 'projectId' ? projectMap.get(v)?.name : gatewayMap.get(v)?.name
  );
  const chartData = Object.keys(data).map((key, index) => {
    const value =
      data[key].reduce((prev, { amount }) => prev + amount, 0) / total;

    return {
      title: key,
      value,
      color: colors[index] || '#fafafa',
    };
  });

  return (
    <Box>
      <Container w="100%">
        <HStack w="100%" gridGap="2rem 1rem" wrap="wrap">
          {legendKeys.map((key, i) => (
            <Flex alignItems="center">
              <Box
                h="16px"
                w="16px"
                borderRadius={5}
                bg={colors[i]}
                marginRight="0.75rem"
              />
              <Text as="span" color="text.primary">
                {key}
              </Text>
            </Flex>
          ))}
        </HStack>
      </Container>
      <Box height="270px" marginY="5.85rem">
        <PieChart
          data={chartData}
          lineWidth={50}
          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
          labelStyle={{
            ...defaultLabelStyle,
          }}
          labelPosition={75}
        />
      </Box>
    </Box>
  );
};

export default Chart;

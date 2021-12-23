import React from 'react';

import { Box, Text, HStack, Flex } from '@chakra-ui/react';
import { PieChart } from 'react-minimal-pie-chart';

import { useAppSelector } from 'hooks';
import { selectChartData } from 'store/ducks/report/selectors';

import { Container } from 'components/atoms';

const defaultLabelStyle = {
  fontSize: '0.5rem',
  fontWeight: 'medium',
  fontFamily: 'Roboto',
  fill: '#fff',
};

const Chart: React.FC = () => {
  const chartData = useAppSelector(selectChartData);

  if (!chartData) {
    return null;
  }

  return (
    <Box>
      <Container w="100%">
        <HStack w="100%" gridGap="2rem 1rem" wrap="wrap">
          {chartData.map(({ title, color }) => (
            <Flex alignItems="center">
              <Box
                h="16px"
                w="16px"
                borderRadius={5}
                bg={color}
                marginRight="0.75rem"
              />
              <Text as="span" color="text.primary">
                {title}
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

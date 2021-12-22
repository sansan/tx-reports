import React from 'react';
import { Table, Tbody, Tr, Td } from '@chakra-ui/react';

import { Payment } from 'typings';
import { formatCurrency } from 'utils';
import { useGetAllGatewaysQuery } from 'store/ducks/api/slice';

type TableProps = {
  data: Payment[];
  showGatewayId: boolean;
};

const shortId = (id: string) => id.slice(-4);

const DataTable: React.FC<TableProps> = ({ data, showGatewayId }) => {
  const { data: gateways } = useGetAllGatewaysQuery();
  const myMap = new Map<string, string>();

  gateways?.forEach(({ gatewayId, name }) => {
    myMap.set(gatewayId, name);
  });

  return (
    <Table>
      <Tbody>
        <Tr>
          <Td>Date</Td>
          {showGatewayId && <Td>Gateway ID</Td>}
          <Td>Transaction ID</Td>
          <Td isNumeric>Amount</Td>
        </Tr>
        {data.map(({ created, paymentId, amount, gatewayId }) => (
          <Tr key={paymentId}>
            <Td>{created}</Td>
            {showGatewayId && <Td>{myMap.get(gatewayId)}</Td>}
            <Td>{shortId(paymentId)}</Td>
            <Td>{formatCurrency(amount)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DataTable;

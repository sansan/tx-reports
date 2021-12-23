import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Table, Tbody, Tr, Td } from '@chakra-ui/react';

import { useAppSelector } from 'hooks';
import { formatCurrency } from 'utils';
import {
  selectShowGatewayInTable,
  selectDataWithGroupKeyId,
} from 'store/ducks/report/selectors';
import { selectGatewayEntities } from 'store/ducks/gateways/selectors';

type TableProps = {
  groupId?: string | undefined;
};

const shortId = (id: string) => id.slice(-4);

const mapStateToProps = createStructuredSelector({
  gatewayMap: selectGatewayEntities,
  showGateway: selectShowGatewayInTable,
  data: (state, groupId) => selectDataWithGroupKeyId(state, groupId),
});

const DataTable: React.FC<TableProps> = ({ groupId }) => {
  const { gatewayMap, showGateway, data } = useAppSelector((state) =>
    mapStateToProps(state, { groupId })
  );

  return (
    <Table>
      <Tbody>
        <Tr>
          <Td>Date</Td>
          {showGateway && <Td>Gateway ID</Td>}
          <Td>Transaction ID</Td>
          <Td isNumeric>Amount</Td>
        </Tr>
        {data.map(({ created, paymentId, amount, gatewayId }) => (
          <Tr key={paymentId}>
            <Td>{created}</Td>
            {showGateway && <Td>{gatewayMap[gatewayId]?.name}</Td>}
            <Td>{shortId(paymentId)}</Td>
            <Td>{formatCurrency(amount)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

DataTable.defaultProps = {
  groupId: undefined,
};

export default DataTable;

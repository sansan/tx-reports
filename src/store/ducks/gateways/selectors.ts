import type { RootState } from 'store';

import gatewaysAdapter from './adapter';

const selectGatewaysSlice = (state: RootState) => state.gateways;

export const {
  selectById: selectGatewayById,
  selectIds: selectGatewayIds,
  selectEntities: selectGatewayEntities,
  selectAll: selectAllGateways,
  selectTotal: selectTotalGateways,
} = gatewaysAdapter.getSelectors(selectGatewaysSlice);

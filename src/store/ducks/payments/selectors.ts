import type { RootState } from 'store';

import paymentsAdapter from './adapter';

const selectPaymentsSlice = (state: RootState) => state.payments;

export const {
  selectById: selectPaymentById,
  selectIds: selectPaymentIds,
  selectEntities: selectPaymentEntities,
  selectAll: selectAllPayments,
  selectTotal: selectTotalPayments,
} = paymentsAdapter.getSelectors(selectPaymentsSlice);

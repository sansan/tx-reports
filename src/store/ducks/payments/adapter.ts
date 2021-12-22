import { createEntityAdapter } from '@reduxjs/toolkit';

import { Payment } from 'typings';

const paymentsAdapter = createEntityAdapter<Payment>({
  selectId: ({ gatewayId }) => gatewayId,
  sortComparer: (a, b) =>
    new Date(a.created).valueOf() - new Date(b.created).valueOf(),
});

export default paymentsAdapter;

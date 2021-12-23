import { createEntityAdapter } from '@reduxjs/toolkit';

import { Payment } from 'typings';

const paymentsAdapter = createEntityAdapter<Payment>({
  selectId: ({ paymentId }) => paymentId,
  sortComparer: (a, b) =>
    new Date(a.created).valueOf() - new Date(b.created).valueOf(),
});

export default paymentsAdapter;

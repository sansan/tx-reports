import { createEntityAdapter } from '@reduxjs/toolkit';

import { Gateway } from 'typings';

const gatewaysAdapter = createEntityAdapter<Gateway>({
  selectId: ({ gatewayId }) => gatewayId,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export default gatewaysAdapter;

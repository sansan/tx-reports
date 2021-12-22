import { createEntityAdapter } from '@reduxjs/toolkit';

import { Project } from 'typings';

const projectAdapter = createEntityAdapter<Project>({
  selectId: ({ projectId }) => projectId,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export default projectAdapter;

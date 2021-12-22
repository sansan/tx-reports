import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'store';

import { Payment } from 'typings';

import { selectAllPayments } from '../payments/selectors';
import { selectProjectEntities } from '../projects/selectors';
import { selectGatewayEntities } from '../gateways/selectors';

const selectReportSlice = (state: RootState) => state.report;

const aggregateAmount = (aggregateValue: number, { amount }: Payment) =>
  aggregateValue + amount;

export const selectQuery = createSelector(
  selectReportSlice,
  (state) => state.query
);

export const selectGroupKey = createSelector(
  selectReportSlice,
  (state) => state.groupKey
);

export const selectShowChart = createSelector(
  selectReportSlice,
  (state) => state.showChart
);

export const selectTableTitle = createSelector(
  selectQuery,
  selectProjectEntities,
  selectGatewayEntities,
  (query, projectMap, gatewayMap) => {
    const { projectId, gatewayId } = query;
    let projectTitle = 'All Projects';
    let gatewayTitle = 'All gateways';

    if (!projectId && !gatewayId) {
      return null;
    }

    if (projectId) {
      projectTitle = projectMap[projectId]!.name;
    }

    if (gatewayId) {
      gatewayTitle = gatewayMap[gatewayId]!.name;
    }

    return `${projectTitle} | ${gatewayTitle}`;
  }
);

export const selectTotalRowTitle = createSelector(
  selectQuery,
  selectProjectEntities,
  selectGatewayEntities,
  (query, projectMap, gatewayMap) => {
    const { projectId, gatewayId } = query;
    let projectTitle;
    let gatewayTitle;

    if (projectId && gatewayId) {
      return 'TOTAL';
    }

    if (projectId) {
      projectTitle = projectMap[projectId]?.name;
    }

    if (gatewayId) {
      gatewayTitle = gatewayMap[gatewayId]?.name;
    }

    return `${projectTitle || gatewayTitle} | TOTAL`;
  }
);

export const selectTotalAmount = createSelector(selectAllPayments, (payments) =>
  payments.reduce(aggregateAmount, 0)
);

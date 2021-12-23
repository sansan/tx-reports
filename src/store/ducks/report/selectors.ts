import { createSelector } from '@reduxjs/toolkit';

import { chartColors } from 'config/theme';
import type { RootState } from 'store';

import { Payment } from 'typings';

import { selectAllPayments, selectTotalPayments } from '../payments/selectors';
import { selectProjectEntities, selectProjectIds } from '../projects/selectors';
import { selectGatewayEntities, selectGatewayIds } from '../gateways/selectors';

const selectReportSlice = (state: RootState) => state.report;

const aggregateAmount = (aggregateValue: number, { amount }: Payment) =>
  aggregateValue + amount;

export const selectShouldFetch = createSelector(
  selectReportSlice,
  ({ shouldFetch }) => shouldFetch
);

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

export const selectShowGatewayInTable = createSelector(
  selectQuery,
  ({ gatewayId, projectId }) => !gatewayId && !projectId
);

export const selectHasData = createSelector(
  selectTotalPayments,
  (number) => !!number
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

export const selectTotalAmount = createSelector(
  selectAllPayments,
  selectQuery,
  (payments) => payments.reduce(aggregateAmount, 0)
);

export const selectTotalPerProject = createSelector(
  selectAllPayments,
  selectProjectIds,
  (payments, projectIds) =>
    projectIds.map((projectId) => ({
      projectId,
      total: payments
        .filter((payment) => payment.projectId === projectId)
        .reduce(aggregateAmount, 0),
    }))
);

export const selectTotalPerGateway = createSelector(
  selectAllPayments,
  selectGatewayIds,
  (payments, gatewayIds) =>
    gatewayIds.map((gatewayId) => ({
      gatewayId,
      total: payments
        .filter((payment) => payment.gatewayId === gatewayId)
        .reduce(aggregateAmount, 0),
    }))
);

export const selectTableTotalRowTitle = createSelector(
  selectQuery,
  selectTotalAmount,
  (query, total) => {
    const { projectId, gatewayId } = query;
    let start;

    if (projectId && !gatewayId) {
      start = 'PROJECT ';
    }

    if (gatewayId && !projectId) {
      start = 'GATEWAY ';
    }

    return `${start || ''}TOTAL | ${new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(total)} USD`;
  }
);

export const selectDataWithGroupKeyId = createSelector(
  [
    selectGroupKey,
    selectAllPayments,
    (_state, { groupId }: { groupId: string | undefined }) => groupId,
  ],
  (groupKey, payments, groupId) => {
    if (groupKey === 'gatewayId' && groupId) {
      return payments.filter(({ gatewayId }) => gatewayId === groupId);
    }

    if (groupKey === 'projectId' && groupId) {
      return payments.filter(({ projectId }) => projectId === groupId);
    }

    return payments;
  }
);

export const selectExpandState = createSelector(
  selectReportSlice,
  (slice) => slice.expandTable
);

export const selectIsContainerOpen = createSelector(
  [selectExpandState, (_state, id: string) => id],
  (expandState, id) => expandState[id]
);

export const selectChartData = createSelector(
  [
    selectGroupKey,
    selectTotalAmount,
    selectTotalPerGateway,
    selectTotalPerProject,
    selectProjectEntities,
    selectGatewayEntities,
  ],
  (groupKey, grossTotal, totalPerGw, totalPerProj, projectMap, gatewayMap) => {
    if (groupKey === 'projectId') {
      return totalPerProj.map(({ projectId, total }, i) => ({
        title: projectMap[projectId]!.name,
        value: total / grossTotal,
        color: chartColors[i] || '#fff',
      }));
    }

    if (groupKey === 'gatewayId') {
      return totalPerGw.map(({ gatewayId, total }, i) => ({
        title: gatewayMap[gatewayId]!.name,
        value: total / grossTotal,
        color: chartColors[i] || '#fff',
      }));
    }

    return null;
  }
);

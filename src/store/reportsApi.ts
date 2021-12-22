import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import dayjs from 'dayjs';

import type {
  Project,
  User,
  Gateway,
  ReportApiRequestBody,
  ReportApiResponse,
  Payment,
} from 'typings';
import baseUrl from 'config/api';
import { transformResponse } from 'utils';
// Define a service using a base URL and expected endpoints
export const reportsApi = createApi({
  reducerPath: 'reportsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => 'users',
      transformResponse: ({ code, data, error }) =>
        transformResponse<User[]>({ code, data, error }),
    }),
    getAllProjects: builder.query<Project[], void>({
      query: () => 'projects',
      transformResponse: ({ code, data, error }) =>
        transformResponse<Project[]>({ code, data, error }),
    }),
    getAllGateways: builder.query<Gateway[], void>({
      query: () => 'gateways',
      transformResponse: ({ code, data, error }) =>
        transformResponse<Gateway[]>({ code, data, error }),
    }),
    getReport: builder.query<Payment[], ReportApiRequestBody>({
      query: (body) => ({ url: 'report', method: 'POST', body }),
      transformResponse: ({ code, data, error }: ReportApiResponse) => {
        if (code === '200') {
          return data
            .sort(
              (a, b) =>
                new Date(a.created).valueOf() - new Date(b.created).valueOf()
            )
            .map(({ created, ...rest }) => ({
              created: dayjs(created).format('MM/DD/YYYY'),
              ...rest,
            }));
        }

        if (error) {
          throw new Error(error);
        }

        throw new Error('Unable to fetch');
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllProjectsQuery,
  useGetAllGatewaysQuery,
  useGetReportQuery,
  useLazyGetReportQuery,
} = reportsApi;

export default reportsApi.reducer;

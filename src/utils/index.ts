import { ApiResponse } from 'typings';

export const transformResponse = <T>({ code, data, error }: ApiResponse<T>) => {
  if (code === '200') {
    return data;
  }

  if (error) {
    throw new Error(error);
  }

  throw new Error('Unable to fetch');
};

export const formatCurrency = (amount: number) =>
  (Math.round(amount * 100) / 100).toFixed(2);

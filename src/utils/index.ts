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
  new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(amount);

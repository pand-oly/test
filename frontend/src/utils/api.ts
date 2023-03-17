import axios from 'axios';
import type { RequestAccess, ResponseAccess } from '../entities/access';
import type {
  HistoryTransaction,
  RequestTransaction,
  ResponseTransaction,
} from '../entities/transaction';
import type { Balance } from '../entities/user';

const api = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_APP_API_PORT}`,
});

export const setToken = (token: string): void => {
  api.defaults.headers.common.Authorization = token;
};

export const requestAccess = async (
  endpoint: string,
  body: RequestAccess
): Promise<ResponseAccess | string> => {
  try {
    const { data } = await api.post(endpoint, body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.error;
    } else if (error instanceof Error) {
      return `Unexpected error: ${error.message}`;
    } else {
      return 'Unexpected error';
    }
  }
};

export const requestTransaction = async (
  body: RequestTransaction
): Promise<ResponseTransaction | string> => {
  try {
    const { data } = await api.put('/transaction', body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.error;
    } else if (error instanceof Error) {
      return `Unexpected error: ${error.message}`;
    } else {
      return 'Unexpected error';
    }
  }
};

export const requestBalance = async (id: string): Promise<Balance | string> => {
  try {
    const { data } = await api.get(`/balance/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.error;
    } else if (error instanceof Error) {
      return `Unexpected error: ${error.message}`;
    } else {
      return 'Unexpected error';
    }
  }
};

export const requestHistoryTransactions = async (
  id: number
): Promise<HistoryTransaction[] | string> => {
  try {
    const { data } = await api.get(`/transaction/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.error;
    } else if (error instanceof Error) {
      return `Unexpected error: ${error.message}`;
    } else {
      return 'Unexpected error';
    }
  }
};

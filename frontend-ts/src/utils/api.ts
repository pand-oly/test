import axios from 'axios';
import type { RequestAccess, ResponseAccess } from '../interfaces/access';
import type {
  HistoryTransaction,
  RequestTransaction,
  ResponseTransaction,
} from '../interfaces/transaction';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
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

export const requestBalance = async (id: string): Promise<number | string> => {
  try {
    const { data } = await api.get(`/balance/${id}`);
    return data.balance;
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
  id: string
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

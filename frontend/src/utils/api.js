import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestAccess = async (endpoint, body) => {
  try {
    const { data } = await api.post(endpoint, body);
    return data;
  } catch (error) {
    return error.response;
  }
};

export const requestTransaction = async (body) => {
  try {
    const { data } = await api.put('/transaction', body);
    return data;
  } catch (error) {
    return error.response;
  }
};

export const requestBalance = async (id) => {
  try {
    const { data } = await api.get(`/balance/${id}`);
    return data;
  } catch (error) {
    return error.response;
  }
};

export const requestHistoryTransactions = async (id) => {
  try {
    const { data } = await api.get(`/transaction/${id}`);
    return data;
  } catch (error) {
    return error.response;
  }
};

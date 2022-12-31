import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestLogin = async (endpoint, body) => {
  try {
    const { data } = await api.post(endpoint, body);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

/*
export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};
*/

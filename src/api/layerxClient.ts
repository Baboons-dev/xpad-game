'use client';

import axios, { AxiosInstance } from 'axios';

const TIMEOUT = 25 * 1000; //15sec
const SERVER_URL = process.env.NEXT_PUBLIC_LAYER_X_API_HOST || 'https://api.layerx.baboons.tech';

const instance: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '9KVvI9QM_98vtE__EYrhCgxFad-6do8fRB9050923uc',
  },
  timeout: TIMEOUT,
});
instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token && config?.headers) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['x-api-key'] =
      process.env.NEXT_PUBLIC_LAYER_X_API_HOST || '9KVvI9QM_98vtE__EYrhCgxFad-6do8fRB9050923uc';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    console.log('err response in intercept resp', err?.response?.data);

    const originalConfig = err?.config;
    if (originalConfig?.url === '/api/current/' && err.response) {
      //todo --> refresh the refresh token
      return Promise.reject(err);
    }
    console.log(err?.response);
    if (err?.response?.status == 401 && originalConfig?.url === '/api/current/') {
      localStorage.removeItem('token');
      location.reload();
    }

    return Promise.reject(err);
  }
);

export default instance;

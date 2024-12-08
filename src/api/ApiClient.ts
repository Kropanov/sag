import axios from 'axios';
import { StorageManager } from '@core/Managers';

const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

ApiClient.interceptors.request.use(
  (config) => {
    const storage = new StorageManager();

    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - maybe redirect to login');
    }
    return Promise.reject(error);
  },
);

export { ApiClient };

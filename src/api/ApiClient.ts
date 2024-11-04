import axios from 'axios';

const ApiClient = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:4200/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

ApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
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

export default ApiClient;

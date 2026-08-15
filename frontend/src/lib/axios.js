import axios from 'axios';

const BASE_URL = import.meta.env.MODE === 'development' ? '/api' : 'https://chat-app-rdnr.onrender.com/api';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

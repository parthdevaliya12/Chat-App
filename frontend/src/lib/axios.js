import axios from 'axios';

const BASE_URL = import.meta.env.MODE === 'development' ? '/api' : 'https://chat-app-rdnr.onrender.com/api';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

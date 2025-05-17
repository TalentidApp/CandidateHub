import axios from 'axios';
import  useAuthStore  from '../constants/store'; 

const API_URL = 'https://talentid-backend-v2.vercel.app';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState(); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
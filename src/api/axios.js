import axios from 'axios';
// https://clinic-ims.onrender.com
const instance = axios.create({
  baseURL: "http://localhost:5000"
  ,
});

export const baseURL = "http://localhost:5000";
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;

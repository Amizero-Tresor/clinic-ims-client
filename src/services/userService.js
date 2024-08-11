// services/userService.js
import instance from '../api/axios';
import axios from '../api/axios';

export const signup = async (userData) => {
  try {
    const response = await instance.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getProfile = async (userData) => {
  try {
    const response = await instance.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

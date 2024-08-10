// services/userService.js
import axios from '../api/axios';

export const signup = async (userData) => {
  try {
    const response = await axios.post('/users/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

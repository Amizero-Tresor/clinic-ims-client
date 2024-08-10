import axios from '../api/axios';

export const register = async (username, password) => {
  try {
    const response = await axios.post('/auth/register', { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post('/auth/login', { username, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

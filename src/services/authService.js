import instance from '../api/axios';

export const register = async (username, password) => {
  try {
    const response = await instance.post('/auth/register', { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (email, password) => {
  try {
    const response = await instance.post('/api/auth/login', { email:email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

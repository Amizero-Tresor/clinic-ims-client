import axios from 'axios';

const API_URL = '/api/stocks';

export const getStocks = async (page = 1, limit = 3) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching stocks: ${error.message}`);
  }
};

export const getStockById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching stock: ${error.message}`);
  }
};

export const addStock = async (stockData) => {
  try {
    const response = await axios.post(API_URL, stockData);
    return response.data;
  } catch (error) {
    throw new Error(`Error adding stock: ${error.message}`);
  }
};

export const updateStock = async (id, stockData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, stockData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating stock: ${error.message}`);
  }
};

export const deleteStock = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error(`Error deleting stock: ${error.message}`);
  }
};

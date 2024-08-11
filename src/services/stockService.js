import axios from 'axios';

const API_URL = '/api/stocks';

export const getStocks = async () => {
  try {
    const response = await axios.get(API_URL);
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
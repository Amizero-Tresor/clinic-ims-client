import instance from '../api/axios';

const API_URL = '/api/stocks';

export const getStocks = async () => {
  try {
    const response = await instance.get(API_URL);
    
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching stocks: ${error.message}`);
  }
};

export const getStockById = async (id) => {
  try {
    const response = await instance.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching stock: ${error.message}`);
  }
};
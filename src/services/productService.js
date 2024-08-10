import axios from '../api/axios';

const API_URL = '/products';

export const getProducts = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw error.response.data;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error.message);
    throw error.response.data;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error.message);
    throw error;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error.message);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error.message);
    throw error;
  }
};

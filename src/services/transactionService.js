import axios from 'axios';
import instance from '../api/axios';

const API_URL = '/api/transactions';  // Base URL for transaction-related API calls

// Create an incoming transaction
export const createIncomingTransaction = async (transactionData) => {
  try {
    const response = await instance.post(`${API_URL}/incoming`, transactionData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating incoming transaction:', error.message);
    throw error;
  }
};

// Create an outgoing transaction
export const createOutgoingTransaction = async (transactionData) => {
  try {
    const response = await instance.post(`${API_URL}/outgoing`, transactionData);
    return response.data;
  } catch (error) {
    console.error('Error creating outgoing transaction:', error.message);
    throw error;
  }
};

// Get an incoming transaction by ID
export const getIncomingTransactionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/incoming/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching incoming transaction by ID:', error.message);
    throw error;
  }
};

// Get an outgoing transaction by ID
export const getOutgoingTransactionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/outgoing/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching outgoing transaction by ID:', error.message);
    throw error;
  }
};

// Get all incoming transactions
export const getIncomingTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/incoming`);
    return response.data;
  } catch (error) {
    console.error('Error fetching incoming transactions:', error.message);
    throw error;
  }
};

// Get all outgoing transactions
export const getOutgoingTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/outgoing`);
    return response.data;
  } catch (error) {
    console.error('Error fetching outgoing transactions:', error.message);
    throw error;
  }
};

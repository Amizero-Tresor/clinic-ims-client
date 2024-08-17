import axios from 'axios';
import { baseURL } from '../api/axios';
const API_BASE_URL = `${baseURL}/api/employees`; // Update to backend URL

// Get all employees without pagination
export const getEmployees = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    // console.log(response.data);  // Log the correct response data
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error.response?.data || error.message;
  }
};

// Get an employee by ID
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error.message);
    throw error.response?.data || error.message;
  }
};

// Create a new employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(API_BASE_URL, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error.response?.data || error.message;
  }
};

// Update an employee by ID
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error.message);
    throw error.response?.data || error.message;
  }
};

// Delete an employee by ID
export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error.message);
    throw error.response?.data || error.message;
  }
};

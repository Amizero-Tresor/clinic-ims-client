import axios from 'axios';

const API_BASE_URL = '/api/employees'; // Base URL for the employee API

// Get all employees with optional pagination
export const getEmployees = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    throw error;
  }
};

// Get an employee by ID
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error.message);
    throw error;
  }
};

// Create a new employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(API_BASE_URL, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error adding employee:', error.message);
    throw error;
  }
};

// Update an employee by ID
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error.message);
    throw error;
  }
};

// Delete an employee by ID
export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error.message);
    throw error;
  }
};

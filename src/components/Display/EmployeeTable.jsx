import React, { useState, useEffect } from 'react';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../../services/employeeService';

const EmployeeTable = ({employees,setEmployees}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    employeeName: '',
    department: '',
    phoneNumber: '',
  });
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        console.log(data);
        if (data) {
          setEmployees(data);
        } else {
          setEmployees([]);  // Safeguard to ensure employees is always an array
        }
      } catch (error) {
        console.error('Error fetching employees:', error.message);
      }
    };

    fetchEmployees();
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setEditingEmployee(null);
  };

  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, newEmployee);
        setEmployees(employees.map(emp => (emp.id === editingEmployee.id ? { ...emp, ...newEmployee } : emp)));
      } else {
        const addedEmployee = await addEmployee(newEmployee);
        setNewEmployee({
          employeeName: '',
          department: '',
          phoneNumber: '',
        })
        setEmployees([...employees, addedEmployee]);
      }
      setNewEmployee({
        employeeName: '',
        department: '',
        phoneNumber: '',
      });
      togglePopup();
    } catch (error) {
      console.error('Error saving employee:', error.message);
    }
  };

  const handleEdit = (employee) => {
    setNewEmployee(employee);
    setEditingEmployee(employee);
    setIsPopupOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Employees</h3>
        <button 
          className="w-[13%] h-[3rem] flex bg-blue justify-center items-center rounded-[2rem] text-white font-bold hover:bg-white hover:text-blue border border-blue transition-all duration-150" 
          onClick={togglePopup} 
        >
          New Employee
        </button>
      </div>
      <hr className="text-blue mb-3" />
      {employees.length > 0 ? (
        <table className="w-full text-left table-auto">
          <thead className=''>
            <tr className="text-blue font-bold">
              <th>Employee Name</th>
              <th>Department</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.employeeName}</td>
                <td>{employee.department}</td>
                <td>{employee.phoneNumber}</td>
                <td>
                  <button 
                    className="bg-green-500 text-white px-4 py-2 rounded-[2rem] border border-transparent hover:border-green-500 hover:bg-white hover:text-green-500 transition-all duration-150" 
                    onClick={() => handleEdit(employee)}
                  >
                    Update
                  </button>
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-[2rem] ml-2 border border-transparent hover:border-red-500 hover:bg-white hover:text-red-500 transition-all duration-150" 
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">{editingEmployee ? 'Update Employee' : 'Add New Employee'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Employee Name</label>
                  <input
                    type="text"
                    name="employeeName"
                    value={newEmployee.employeeName}
                    onChange={handleChange}
                    className="w-full border-b-2 p-2 outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={newEmployee.department}
                    onChange={handleChange}
                    className="w-full border-b-2 p-2 outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={newEmployee.phoneNumber}
                    onChange={handleChange}
                    className="w-full border-b-2 p-2 outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                  onClick={togglePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue text-white rounded-md"
                >
                  {editingEmployee ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;

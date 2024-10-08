import React, { useState, useEffect } from 'react';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../../services/employeeService';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const EmployeeTable = ({ employees, setEmployees }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // New state to manage form submission
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
        setEmployees(data || []);
        toast.success('Employees fetched successfully!');
      } catch (error) {
        toast.error('Error, contact system admin');
      } finally {
        setLoading(false);
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
    
    const { phoneNumber } = newEmployee;

    // Validate phoneNumber
    const phoneNumberPattern = /^07\d{8}$/; // 07 followed by 8 digits

    if (!phoneNumberPattern.test(phoneNumber)) {
        toast.error('Invalid phone number! It must start with "07" and be exactly 10 digits.');
        return;
    }

    setSubmitting(true); // Set submitting to true before request

    try {
        if (editingEmployee) {
            await updateEmployee(editingEmployee.id, newEmployee);
            setEmployees(employees.map(emp => (emp.id === editingEmployee.id ? { ...emp, ...newEmployee } : emp)));
            toast.success('Employee updated successfully!');
        } else {
            const addedEmployee = await addEmployee(newEmployee);
            setEmployees([...employees, addedEmployee]);
            toast.success('Employee added successfully!');
        }
        setNewEmployee({
            employeeName: '',
            department: '',
            phoneNumber: '',
        });
        togglePopup();
    } catch (error) {
        toast.error('Error saving employee: ' + error.message);
    } finally {
        setSubmitting(false); // Set submitting back to false after request
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
      toast.success('Employee deleted successfully!');
    } catch (error) {
      toast.error('Error deleting employee: ' + error.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 overflow-x-hidden">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Employees</h3>
        <button 
          className="w-[4%] h-[3rem] flex bg-blue justify-center items-center rounded-[2rem] text-white font-bold hover:bg-white hover:text-blue border border-blue transition-all duration-150" 
          onClick={togglePopup} 
        >
          +
        </button>
      </div>
      <hr className="text-blue mb-3" />
      {loading ? 
      <div className='w-full flex items-center justify-center mt-5 font-bold gap-3'>
        <h1>Loading</h1>
        <ClipLoader size={20} color='black'/>
      </div>
      :
      employees.length > 0 ? (
        <div className="overflow-x-auto scrollbar-thumb-blue scrollbar-track-gray-100 scrollbar-thin">
          <table className="w-full text-left table-auto">
            <thead className=''>
              <tr className="text-blue font-bold">
                <th className="px-4 py-2">Employee Name</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="w-full flex justify-end px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{employee.employeeName}</td>
                  <td className="px-4 py-2">{employee.department}</td>
                  <td className="px-4 py-2">{employee.phoneNumber}</td>
                  <td className="w-full flex justify-end px-4 py-2">
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
        </div>
      ) : (
        <p>No employees found.</p>
      )}

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">{editingEmployee ? 'Update Employee' : 'Add New Employee'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  disabled={submitting} // Disable the button while submitting
                >
                  {submitting ? <ClipLoader size={20} color="white" /> : editingEmployee ? 'Update' : 'Add'}
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

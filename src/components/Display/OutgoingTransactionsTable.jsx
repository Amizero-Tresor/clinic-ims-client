import React, { useState, useEffect } from 'react';
import { createOutgoingTransaction, getOutgoingTransactions } from '../../services/transactionService';
import { getProducts } from '../../services/productService'; 
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { getEmployees } from '../../services/employeeService';

const OutgoingTransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]); 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // Track form submission state
  const [newTransaction, setNewTransaction] = useState({
    productName: "",
    employeeName: "",
    employeePhone: "",
    quantity: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getOutgoingTransactions();
        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(`Error fetching outgoing transactions: ${error.message}`);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.length > 0 ? response : []);
      } catch (error) {
        toast.error(`Error , contact system admin`);
        setEmployees([]);
      }
    };

    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data || []);
      } catch (error) {
        toast.error(`Error , contact system admin`);
        setProducts([]);
      }
    };

    fetchEmployees();
    fetchProducts();
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // Prevent double submission

    setSubmitting(true); // Set submitting to true
    setLoading(true);

    try {
      const selectedProduct = products.find(product => product.productName === newTransaction.productName);
      if (!selectedProduct) {
        toast.error("Please select a product.");
        setSubmitting(false);
        setLoading(false);
        return;
      }
      
      const quantity = Number(newTransaction.quantity);
      if (isNaN(quantity) || quantity <= 0) {
        toast.error("Please enter a valid quantity.");
        setSubmitting(false);
        setLoading(false);
        return;
      }
      
      if (selectedProduct.stock < quantity) {
        toast.error("Not enough stock available for the selected product.");
        setSubmitting(false);
        setLoading(false);
        return;
      }

      const selectedEmployee = employees.find(employee => employee.employeeName === newTransaction.employeeName);
      if (!selectedEmployee) {
        toast.error("Employee not found.");
        setSubmitting(false);
        setLoading(false);
        return;
      }

      if (newTransaction.employeePhone !== selectedEmployee.phoneNumber) {
        toast.error("Incorrect Phone Number");
        setSubmitting(false);
        setLoading(false);
        return;
      }

      const newData = {
        productName: newTransaction.productName,
        quantity: newTransaction.quantity,
        employeeId: selectedEmployee.id,
        employeeName: selectedEmployee.employeeName,
        employeePhone: newTransaction.employeePhone,
        createdBy: user.name,
      };

      await createOutgoingTransaction(newData);
      setTransactions([...transactions, newData]);
      toast.success("Transaction successfully created");
      setNewTransaction({
        productName: "",
        employeeName: "",
        employeePhone: "",
        quantity: 0,
      });
      togglePopup();
    } catch (error) {
      toast.error(`Error creating transaction: ${error.message}`);
    } finally {
      setSubmitting(false); // Reset submitting to false
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Outgoing Transactions</h3>
        {user.type === "MANAGER" && (
          <button 
            className="w-[23%] h-[3rem] flex bg-blue justify-center items-center rounded-[2rem] text-white font-bold hover:bg-white hover:text-blue border border-blue transition-all duration-150" 
            onClick={togglePopup} 
          >
            +
          </button>
        )}
      </div>
      <hr className="text-blue mb-3" />
      {loading ? 
      <div className='w-full flex items-center justify-center mt-5 font-bold gap-3'>
        <h1>Loading</h1>
        <ClipLoader size={20} color='black'/>
      </div>
      :
      transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-blue font-bold">
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Employee Name</th>
                <th className="px-4 py-2">Employee Phone</th>
                <th className="px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{transaction.productName}</td>
                  <td className="px-4 py-2">{transaction.employeeName}</td>
                  <td className="px-4 py-2">{transaction.employeePhone}</td>
                  <td className="px-4 py-2">{transaction.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No transactions found.</p>
      )}

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Product Name</label>
                  <select
                    name="productName"
                    value={newTransaction.productName}
                    onChange={handleChange}
                    className="w-full border-b-2 p-2 outline-none focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>Select a product</option>
                    {products.map((product, index) => (
                      <option key={index} value={product.productName}>{product.productName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Employee Name</label>
                  <select
                    name="employeeName"
                    value={newTransaction.employeeName}
                    onChange={handleChange}
                    className="w-full border-b-2 p-2 outline-none focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>Select an employee</option>
                    {employees.map((employee, index) => (
                      <option key={index} value={employee.employeeName}>{employee.employeeName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Employee Phone</label>
                  <input
                    type="tel"
                    name="employeePhone"
                    value={newTransaction.employeePhone}
                    onChange={handleChange}
                    className="w-full border-b-2 p-2 outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={newTransaction.quantity}
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
                  className={`px-4 py-2 ${submitting ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-md flex items-center justify-center gap-2`}
                  disabled={submitting}
                >
                  {submitting ? <ClipLoader size={20} color="white" /> : "Add Transaction"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutgoingTransactionsTable;
  
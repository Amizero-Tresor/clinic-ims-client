import React, { useState, useEffect } from 'react';
import { createOutgoingTransaction, getOutgoingTransactions } from '../../services/transactionService';

const OutgoingTransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [newTransaction, setNewTransaction] = useState({
    productName: "",
    employeeName: "",
    employeePhone: "",
    quantity: 0,
    
  })
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getOutgoingTransactions();
        // Ensure that `data` is an array before setting it in state
        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching outgoing transactions:', error.message);
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, []);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const handleChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const addedTransaction = await createOutgoingTransaction(newTransaction);
        setTransactions([...transactions, addedTransaction]);
      setNewTransaction({
        employeeName: '',
        department: '',
        phoneNumber: '',
      });
      togglePopup();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Outgoing Transactions</h3>
        {user?.type === "MANAGER" && <button 
          className="w-[13%] h-[3rem] flex bg-blue justify-center items-center rounded-[2rem] text-white font-bold hover:bg-white hover:text-blue border border-blue transition-all duration-150" 
          onClick={togglePopup} 
        >
          New Transaction
        </button>}
      </div>
      <hr className="text-blue mb-3" />
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="text-blue font-bold">
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Employee Name</th>
            <th>Employee Phone</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.productName}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.employeeName}</td>
                <td>{transaction.employeePhone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No outgoing transactions available.</td>
            </tr>
          )}
        </tbody>
      </table>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">{'Create New Transaction'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={newTransaction.productName}
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
                <div>
                  <label className="block font-semibold mb-1">Employee Name</label>
                  <input
                    type="text"
                    name="employeeName"
                    value={newTransaction.employeeName}
                    onChange={handleChange}
                    className="w-full border-b-2 p-2 outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Employee Phone</label>
                  <input
                    type="text"
                    name="employeePhone"
                    value={newTransaction.employeePhone}
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
                  {'Create'}
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

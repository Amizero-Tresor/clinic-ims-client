import React, { useState, useEffect } from 'react';
import { createIncomingTransaction, getIncomingTransactions } from '../../services/transactionService';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const IncomingTransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [loading, setLoading] = useState(true);
  const [newTransaction, setNewTransaction] = useState({
    productName: "",
    quantity: 0,
    expirationDate: "",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getIncomingTransactions();
        setTransactions(data.transactions || []);
      } catch (error) {
        toast.error(`Error fetching incoming transactions: ${error.message}`);
        setTransactions([]);
      } finally {
        setLoading(false);  // Set loading to false after fetching transactions
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
    setLoading(true); // Set loading to true when submitting the form
    try {
      const newData = {
        productName: newTransaction.productName,
        quantity: parseInt(newTransaction.quantity),
        expirationDate: newTransaction.expirationDate, // Using the actual value from the form
      };
      const addedTransaction = await createIncomingTransaction(newData);
      setTransactions([...transactions, addedTransaction]);
      setNewTransaction({
        productName: '',
        quantity: 0,
        expirationDate: '',
      });
      togglePopup();
    } catch (error) {
      toast.error('Error saving transaction');
    } finally {
      setLoading(false);  // Set loading to false after the submission process is done
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Incoming Transactions</h3>
        {user?.type === "ADMIN" && (
          <button 
            className="w-[13%] h-[3rem] flex bg-blue justify-center items-center rounded-[2rem] text-white font-bold hover:bg-white hover:text-blue border border-blue transition-all duration-150" 
            onClick={togglePopup} 
          >
            New Transaction
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
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="text-blue font-bold">
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.productName}</td>
                  <td>{transaction.quantity}</td>
                  <td>{new Date(transaction.expirationDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No incoming transactions available.</td>
              </tr>
            )}
          </tbody>
        </table>
      }
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Create New Transaction</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={newTransaction.productName}  // Corrected this line
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
                  <label className="block font-semibold mb-1">Expiration Date</label>
                  <input
                    type="datetime-local"
                    name="expirationDate"
                    value={newTransaction.expirationDate}
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomingTransactionTable;

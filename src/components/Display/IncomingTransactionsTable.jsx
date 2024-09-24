import React, { useState, useEffect } from 'react';
import { createIncomingTransaction, getIncomingTransactions } from '../../services/transactionService';
import { getProducts } from '../../services/productService';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const IncomingTransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    productName: "",
    quantity: 0,
    expirationDate: "",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getIncomingTransactions();
        setTransactions(data || []);
      } catch (error) {
        toast.error('Error fetching incoming transactions, please contact the system administrator.');
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data || []);
      } catch (error) {
        toast.error('Error fetching products, please contact the system administrator.');
        setProducts([]);
      }
    };

    fetchTransactions();
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

    // Validate if quantity is not zero
    if (newTransaction.quantity <= 0) {
        toast.error('Quantity must be greater than zero');
        return;
    }

    setLoading(true);
    try {
        const newData = {
            productName: newTransaction.productName,
            quantity: newTransaction.quantity,
            expirationDate: newTransaction.expirationDate,
            createdBy: user.name,
        };
        const savedTransaction = await createIncomingTransaction(newData);
        setTransactions([...transactions, savedTransaction]);
        setNewTransaction({ productName: "", quantity: 0, expirationDate: "" });
        toast.success("Transaction successfully created");
        togglePopup();
    } catch (error) {
        toast.error('Transaction not created, please try again later.');
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Incoming Transactions</h3>
        {user.type === "ADMIN" && (
          <button 
            className="w-[4%] h-[3rem] flex bg-blue justify-center items-center rounded-[2rem] text-white font-bold hover:bg-white hover:text-blue border border-blue transition-all duration-150" 
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
            <thead className=''>
              <tr className="text-blue font-bold">
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Expiration Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{transaction.productName}</td>
                  <td className="px-4 py-2">{transaction.quantity}</td>
                  <td className="px-4 py-2">{new Date(transaction.expirationDate).toLocaleDateString()}</td>
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
                    type="date"
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
                  Add Transaction
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

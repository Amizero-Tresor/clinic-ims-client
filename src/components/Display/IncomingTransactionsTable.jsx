import React, { useState, useEffect } from 'react';
import { getIncomingTransactions } from '../../services/transactionService';

const IncomingTransactionTable = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch incoming transactions when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getIncomingTransactions();
        setTransactions(data.transactions || []);  // Ensure transactions is always an array
      } catch (error) {
        console.error('Error fetching incoming transactions:', error.message);
        setTransactions([]);  // Set transactions to an empty array if fetching fails
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Incoming Transactions</h3>
      <hr className="text-blue mb-3" />
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
    </div>
  );
};

export default IncomingTransactionTable;

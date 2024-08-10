import React, { useState, useEffect } from 'react';
import { getOutgoingTransactions } from '../../services/transactionService';

const OutgoingTransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);

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

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Outgoing Transactions</h3>
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
    </div>
  );
};

export default OutgoingTransactionsTable;

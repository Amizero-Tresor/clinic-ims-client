import React, { useState, useEffect } from 'react';
import { getStocks, getStockById } from '../../services/stockService';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newStock, setNewStock] = useState({
    productName: '',
    quantity: '',
    expirationDate: '',
  });
  const [editingStock, setEditingStock] = useState(null);

  // Fetch stocks when the component mounts
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await getStocks();  // Assuming getStocks fetches all stocks without pagination
        setStocks(data.stocks || []);  // Ensure stocks is always an array
      } catch (error) {
        console.error('Error fetching stocks:', error.message);
        setStocks([]);  // Set stocks to an empty array if fetching fails
      }
    };

    fetchStocks();
  }, []);
  

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Stocks</h3>
      </div>
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
          {stocks.length > 0 ? (
            stocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.productName}</td>
                <td>{stock.quantity}</td>
                <td>{new Date(stock.expirationDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No stocks available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;

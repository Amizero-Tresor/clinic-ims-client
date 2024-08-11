import React, { useState, useEffect } from 'react';
import { getStocks, getStockById } from '../../services/stockService';
import { ClipLoader } from 'react-spinners';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
        const data = await getStocks();
        console.log('Fetched data:', data); // Log to check the entire response structure
        // Check if the response contains stocks data in a different key
        // For example, if the stocks are directly under `data`, use `data` instead of `data.stocks`
        if (Array.isArray(data)) {
          setStocks(data);
        } else if (data && data.stocks) {
          setStocks(data.stocks);
        } else {
          console.error('Stocks data is not available or has a different structure');
          setStocks([]);
        }
      } catch (error) {
        console.error('Error fetching stocks:', error.message);
        setStocks([]);
      } finally {
        setLoading(false);
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
      {
        
        loading ? 
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
          {
      stocks.length > 0 ? (
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
      }
    </div>
  );
};

export default StockTable;

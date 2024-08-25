import React, { useState, useEffect } from 'react';
import { getStocks, getStockById } from '../../services/stockService';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await getStocks();
        if (Array.isArray(data)) {
          setStocks(data);
        } else if (data && data.stocks) {
          setStocks(data.stocks);
        } else {
          setStocks([]);
        }
      } catch (error) {
        toast.error(`Error , contact system admin`);
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
        stocks.length > 0 ? (
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-blue font-bold">
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Expiration Date</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.productName}</td>
                  <td>{stock.quantity}</td>
                  <td>{new Date(stock.expirationDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <tr>
            <td colSpan="3" className="text-center">No stocks available.</td>
          </tr>
        )
      }
    </div>
  );
};

export default StockTable;

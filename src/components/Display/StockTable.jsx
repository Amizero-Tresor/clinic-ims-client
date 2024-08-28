import React, { useState, useEffect } from 'react';
import { getStocks } from '../../services/stockService';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifiedProducts, setNotifiedProducts] = useState(new Set());

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
        toast.error('Error, contact system admin');
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  useEffect(() => {
    const checkExpirations = () => {
      const today = new Date();
      stocks.forEach(stock => {
        const expirationDate = new Date(stock.expirationDate);
        const diffInDays = Math.floor((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffInDays >= 0 && diffInDays <= 3 && !notifiedProducts.has(stock.productName)) {
          toast.warn(
            `${stock.productName} is about to expire on ${expirationDate.toLocaleDateString()}.`,
            {
              autoClose: false,  // Allow user to close the toast
              closeButton: true,
            }
          );
          setNotifiedProducts(prev => new Set(prev.add(stock.productName)));
        }
      });
    };

    if (!loading) {
      checkExpirations();
    }
  }, [stocks, loading, notifiedProducts]);

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Stocks</h3>
      </div>
      <hr className="text-blue mb-3" />
      {loading ? 
        <div className='w-full flex items-center justify-center mt-5 font-bold gap-3'>
          <h1>Loading</h1>
          <ClipLoader size={20} color='black'/>
        </div>
        :
        stocks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="text-blue font-bold">
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Expiration Date</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{stock.productName}</td>
                    <td className="px-4 py-2">{stock.quantity}</td>
                    <td className="px-4 py-2">{new Date(stock.expirationDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No stocks available.</p>
        )
      }
    </div>
  );
};

export default StockTable;

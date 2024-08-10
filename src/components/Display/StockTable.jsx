  import React, { useState, useEffect } from 'react';
  import { getStocks, addStock, updateStock, deleteStock } from '../../services/stockService';

  const StockTable = () => {
    const [stocks, setStocks] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newStock, setNewStock] = useState({
      productName: '',
      quantity: '',
      expirationDate: '',
    });
    const [editingStock, setEditingStock] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch stocks when the component mounts and whenever the page changes
    useEffect(() => {
      const fetchStocks = async () => {
        try {
          const data = await getStocks(currentPage, 3);
          setStocks(data.stocks || []);  // Ensure stocks is always an array
          setTotalPages(data.totalPages);
        } catch (error) {
          console.error('Error fetching stocks:', error.message);
          setStocks([]);  // Set stocks to an empty array if fetching fails
        }
      };

      fetchStocks();
    }, [currentPage]);

    // Toggle popup for adding/updating stocks
    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
      setEditingStock(null);  // Reset editing state when toggling popup
    };

    // Handle form input changes
    const handleChange = (e) => {
      setNewStock({ ...newStock, [e.target.name]: e.target.value });
    };

    // Handle form submission for adding/updating a stock
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (editingStock) {
          await updateStock(editingStock.id, newStock);
          setStocks(stocks.map(stock => (stock.id === editingStock.id ? { ...stock, ...newStock } : stock)));
        } else {
          const addedStock = await addStock(newStock);
          setStocks([...stocks, addedStock]);
        }
        // Reset form and close popup after successful submission
        setNewStock({
          productName: '',
          quantity: '',
          expirationDate: '',
        });
        togglePopup();
      } catch (error) {
        console.error('Error saving stock:', error.message);
      }
    };

    // Set stock to edit mode
    const handleEdit = (stock) => {
      setNewStock(stock);
      setEditingStock(stock);
      setIsPopupOpen(true);
    };

    // Delete a stock
    const handleDelete = async (id) => {
      try {
        await deleteStock(id);
        setStocks(stocks.filter(stock => stock.id !== id));
      } catch (error) {
        console.error('Error deleting stock:', error.message);
      }
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };

    return (
      <div className="bg-white shadow-md rounded-xl p-6">
        <div className="flex justify-between pb-3">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Stocks</h3>
          {/* <button
            className="bg-blue text-white px-4 py-2 rounded-[2rem] border border-transparent hover:border-blue hover:bg-white hover:text-blue transition-all duration-150"
            onClick={togglePopup}
          >
            Add Stock
          </button> */}
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
                <td colSpan="4" className="text-center">No stocks available.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* <div className="flex justify-between items-center mt-4">
          <button
            className="w-[7%] px-4 py-4 bg-blue text-white rounded-[2rem] border border-blue hover:bg-white hover:text-blue transition-all duration-150"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="w-[5%] px-4 py-4 bg-blue text-white rounded-[2rem] border border-blue hover:bg-white hover:text-blue transition-all duration-150"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div> */}

        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-1/2">
              <h2 className="text-xl font-bold mb-4">{editingStock ? 'Update Stock' : 'Add New Stock'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      value={newStock.productName}
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
                      value={newStock.quantity}
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
                      value={newStock.expirationDate}
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
                    {editingStock ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default StockTable;

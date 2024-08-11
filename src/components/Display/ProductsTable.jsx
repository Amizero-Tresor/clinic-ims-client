import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct, updateProduct, addProduct } from '../../services/productService';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: '',
    description: '',
    category: '',
    stock: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data || []); // Safeguard to ensure products is always an array
      } catch (error) {
        console.error('Error fetching products:', error.message);
        setProducts([]); // Initialize to an empty array in case of error
      }
    };

    fetchProducts();
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, newProduct);
        setProducts(products.map(product => (product.id === editingProduct.id ? newProduct : product)));
      } else {
        const addedProduct = await addProduct(newProduct);
        setProducts([...products, addedProduct]);
      }
      setNewProduct({
        productName: '',
        price: '',
        description: '',
        category: '',
        stock: ''
      });
      togglePopup();
    } catch (error) {
      console.error('Error saving product:', error.message);
    }
  };

  const handleEdit = (product) => {
    setNewProduct(product);
    setEditingProduct(product);
    setIsPopupOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Products</h3>
        <button 
          className="w-[10%] h-[3rem] flex bg-blue justify-center items-center rounded-[2rem] text-white font-bold hover:bg-white hover:text-blue border border-blue transition-all duration-150" 
          onClick={togglePopup} 
        >
          New Product
        </button>
      </div>
      <hr className="text-blue mb-3" />
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="text-blue font-bold">
            <th>Product Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index}>
                <td>{product.productName}</td>
                <td>
                  <button 
                    className="bg-green-500 text-white px-4 py-2 rounded-[2rem] border border-transparent hover:border-green-500 hover:bg-white hover:text-green-500 transition-all duration-150" 
                    onClick={() => handleEdit(product)}
                  >
                    Update
                  </button>
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-[2rem] ml-2 border border-transparent hover:border-red-500 hover:bg-white hover:text-red-500 transition-all duration-150" 
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">No products available</td>
            </tr>
          )}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Update Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={newProduct.productName}
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
                  {editingProduct ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;

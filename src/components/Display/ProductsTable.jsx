import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../services/productService';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loader for submit button
  const [newProduct, setNewProduct] = useState({
    productName: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data || []);
        toast.success('Products fetched successfully!');
      } catch (error) {
        toast.error('Error, contact system admin');
      } finally {
        setLoading(false);
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
    setIsSubmitting(true); // Start loader
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, newProduct);
        setProducts(products.map(prod => (prod.id === editingProduct.id ? { ...prod, ...newProduct } : prod)));
        toast.success('Product updated successfully!');
      } else {
        const addedProduct = await addProduct(newProduct);
        setProducts([...products, addedProduct]);
        toast.success('Product added successfully!');
      }
      setNewProduct({ productName: '' });
      togglePopup();
    } catch (error) {
      toast.error('Error saving product: ' + error.message);
    } finally {
      setIsSubmitting(false); // End loader
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
      setProducts(products.filter(prod => prod.id !== id));
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Error deleting product: ' + error.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Products</h3>
        <button 
          className="w-[4%] h-[3rem] flex bg-blue justify-center items-center rounded-[2rem] text-white font-bold hover:bg-white hover:text-blue border border-blue transition-all duration-150" 
          onClick={togglePopup} 
        >
          +
        </button>
      </div>
      <hr className="text-blue mb-3" />
      {loading ? 
      <div className='w-full flex items-center justify-center mt-5 font-bold gap-3'>
        <h1>Loading</h1>
        <ClipLoader size={20} color='black'/>
      </div>
      :
      products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-blue font-bold">
                <th className="px-4 py-2">Product Name</th>
                <th className="w-full flex justify-end px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{product.productName}</td>
                  <td className="w-full flex justify-end px-4 py-2">
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
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No products found.</p>
      )}

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Update Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="px-4 py-2 bg-blue text-white rounded-md flex items-center justify-center"
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? (
                    <>
                      <ClipLoader size={20} color="white" className="mr-2" />
                      {editingProduct ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editingProduct ? 'Update' : 'Add'
                  )}
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

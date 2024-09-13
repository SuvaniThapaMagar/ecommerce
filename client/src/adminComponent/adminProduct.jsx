import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import React Icons
import Side from './adminNav';

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    color: '',
    images: []
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editingProductId, setEditingProductId] = useState(null); // Track the product being edited

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/product/');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:4000/api/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Network response was not ok');
      fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('adminToken');
      const formDataToUpload = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formDataToUpload.append('images', selectedFiles[i]);
      }

      let productId;

      if (isEditing) {
        // If editing, update the existing product
        productId = editingProductId;

        const updateProductResponse = await fetch(`http://localhost:4000/api/product/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        if (!updateProductResponse.ok) throw new Error('Product update failed');
      } else {
        // Otherwise, create a new product
        const productResponse = await fetch('http://localhost:4000/api/product/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        if (!productResponse.ok) throw new Error('Product creation failed');
        const newProduct = await productResponse.json();
        productId = newProduct._id;
      }

      // Upload images to the newly created or updated product
      const imageUploadResponse = await fetch(`http://localhost:4000/api/product/upload/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToUpload
      });

      if (!imageUploadResponse.ok) throw new Error('Image upload failed');

      const imageUploadResult = await imageUploadResponse.json();
      const imageUrls = imageUploadResult.urls;

      // Refresh products after adding or updating
      fetchProducts();

      // Reset the form and editing state
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        quantity: '',
        color: '',
        images: []
      });
      setSelectedFiles([]);
      setShowForm(false);
      setIsEditing(false);
      setEditingProductId(null);
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  const handleEditClick = (product) => {
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      quantity: product.quantity,
      color: product.color,
      images: product.images || []
    });
    setEditingProductId(product._id);
    setIsEditing(true);
    setShowForm(true); // Show form for editing
  };

  return (
    <div className="flex">
      <Side />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Product Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsEditing(false); // Reset editing state
          }}
          className="px-4 py-2 border border-black  text-black  mb-4"
        >
          {showForm ? 'Cancel' : 'Add New Product'}
        </button>

        {showForm ? (
          <form onSubmit={handleFormSubmit} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="p-2 border rounded-md"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="p-2 border rounded-md"
                required
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="p-2 border rounded-md"
                required
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
                required
              >
                <option value="" disabled>Select Category</option>
                <option value="electronics">Fashion</option>
                <option value="fashion">Accessories</option>
                <option value="home">Home Decor</option>
                <option value="toys">Gifts</option>
              </select>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                className="p-2 border rounded-md"
                required
              />
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                placeholder="Color"
                className="p-2 border rounded-md"
                required
              />
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="p-2 border rounded-md"
              />
              <button
                type="submit"
                className="px-4 py-2 border border-black text-black mt-4 "
              >
                {isEditing ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Products List</h2>
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div key={product._id} className="flex items-center border rounded-lg p-4 shadow-sm">
                  {product.images && product.images.length > 0 && (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-16 h-16 object-cover mr-4 rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                  </div>
                  <div className="flex space-x-6">
                    <button onClick={() => handleEditClick(product)} className="text-yellow-500">
                      <FaEdit size={20} />
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="text-black">
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProduct;

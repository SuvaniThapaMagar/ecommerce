import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Side from "./adminNav";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    images: [],
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/product/");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:4000/api/product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Network response was not ok");
      fetchProducts();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, index) => {
    const files = Array.from(e.target.files);
    let updatedFiles = [...selectedFiles];
    updatedFiles[index] = files[0];
    setSelectedFiles(updatedFiles);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");
      const formDataToUpload = new FormData();

      selectedFiles.forEach((file) => {
        if (file) {
          formDataToUpload.append("images", file);
        }
      });

      let productId;

      if (isEditing) {
        productId = editingProductId;
        const updateProductResponse = await fetch(
          `http://localhost:4000/api/product/${productId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        if (!updateProductResponse.ok) throw new Error("Product update failed");
        toast.success("Product updated successfully");
      } else {
        const productResponse = await fetch(
          "http://localhost:4000/api/product/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        if (!productResponse.ok) throw new Error("Product creation failed");
        const newProduct = await productResponse.json();
        productId = newProduct._id;
        toast.success("Product added successfully");
      }

      const imageUploadResponse = await fetch(
        `http://localhost:4000/api/product/upload/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToUpload,
        }
      );

      if (!imageUploadResponse.ok) throw new Error("Image upload failed");

      fetchProducts();

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        images: [],
      });
      setSelectedFiles([]);
      setShowForm(false);
      setIsEditing(false);
      setEditingProductId(null);
    } catch (error) {
      console.error("Error adding/updating product:", error);
      toast.error("Failed to add/update product");
    }
  };

  const handleEditClick = (product) => {
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      quantity: product.quantity,
      images: product.images || [],
    });
    setEditingProductId(product._id);
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <div className="flex">
      <Side />
      <div className="flex-1 p-4">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-4">Admin Product Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsEditing(false);
          }}
          className="px-4 py-2 border border-black text-black mb-4"
        >
          {showForm ? "Cancel" : "Add New Product"}
        </button>

        {showForm ? (
          <form onSubmit={handleFormSubmit} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>
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
                <option value="" disabled>
                  Select Category
                </option>
                <option value="fashion">Fashion</option>
                <option value="accessory">Accessory</option>
                <option value="decor">Decor</option>
                <option value="gift">Gift</option>
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
              {/* Other input fields */}
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, index)}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="px-4 py-2 border border-black text-black mt-4"
              >
                {isEditing ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Products List</h2>
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center border rounded-lg p-4 shadow-sm"
                >
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
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-yellow-500"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500"
                    >
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
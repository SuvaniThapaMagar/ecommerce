import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Filter from './Filter';

const Fashion = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/product?category=fashion');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log(data); // Log the products data to check if images are present
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex p-4">
      {/* Filter section on the left */}
      <Filter />

      {/* Product list on the right */}
      <div className="flex-1 ml-4">
        <h1 className="text-2xl font-bold mb-4">Fashion Products</h1>
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div key={product._id} className="flex items-center border rounded-lg p-4 shadow-sm">
              {product.images && product.images.length > 0 && (
                <Link to={`/description/${product._id}`}> {/* Add Link for navigation */}
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-16 h-16 object-cover mr-4 rounded cursor-pointer"
                  />
                </Link>
              )}
              <div className="flex-1">
                <Link to={`/description/${product._id}`}> {/* Add Link for navigation */}
                  <h3 className="text-lg font-semibold cursor-pointer">{product.title}</h3>
                </Link>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-black font-bold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fashion;

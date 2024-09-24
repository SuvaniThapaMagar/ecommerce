import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/product?search=${encodeURIComponent(search)}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (search) {
      fetchProducts();
    }
  }, [search]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg p-4">
              <h2 className="font-semibold">{product.title}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

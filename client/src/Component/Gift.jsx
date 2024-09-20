import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Filter from "./Filter";
import Footer from "./Footer";

const Gift = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 2; 

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = `http://localhost:4000/api/product?category=gift`;

      // Add sorting option
      if (sortOption) {
        const sortParams = {
          "featured": "-createdAt",
          "title-asc": "title",
          "title-desc": "-title",
          "price-asc": "price",
          "price-desc": "-price",
          "date-newest": "-createdAt",
          "date-oldest": "createdAt",
        };
        url += `&sort=${sortParams[sortOption]}`;
      }

      // Pagination
      url += `&page=${currentPage}&limit=${limit}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("API Response Data:", data);
      setProducts(data || []); // Changed from data.products to data
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortOption, currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex flex-col md:flex-row p-4">
        <Filter />
        <div className="flex-1 items-center justify-evenly ml-10">
          <h1 className="text-2xl text-center font-bold mb-4">Gift Ideas</h1>
          <div className="mb-4">
            <label htmlFor="sort" className="mr-2">Sort by</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded p-2"
            >
              <option value="featured">Featured</option>
              <option value="title-asc">Title, A-Z</option>
              <option value="title-desc">Title, Z-A</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
              <option value="date-newest">Date, new to old</option>
              <option value="date-oldest">Date, old to new</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="">
                  {product.images && product.images.length > 0 && (
                    <div className="relative">
                      <Link to={`/description/${product._id}`}>
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-[300px] object-cover cursor-pointer transition-transform duration-300 transform hover:scale-105"
                        />
                      </Link>
                      <div className="absolute top-2 right-2">
                        <FaHeart className="text-gray-500 hover:text-red-500 cursor-pointer transition duration-300" />
                      </div>
                    </div>
                  )}
                  <div className="p-4 text-center">
                    <Link to={`/description/${product._id}`}>
                      <h3 className="text-lg font-semibold cursor-pointer">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-black font-bold">NPR {product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
          <div className="pagination-controls mt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 p-2 border rounded"
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="ml-2 p-2 border rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gift;
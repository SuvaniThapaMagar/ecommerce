import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');

    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setResults(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [location.search]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((product) => (
            <div key={product._id} className="border p-4 rounded-md">
              <img src={product.images[0]} alt={product.title} className="w-full h-40 object-cover mb-2" />
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-600">NPR {product.price}</p>
              <p className="text-gray-600">Available: {product.quantity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;

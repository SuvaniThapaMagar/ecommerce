import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SalesPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id, quantity }),
      });
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
      alert('Product added to cart!');
    } catch (err) {
      alert('Failed to add product to cart. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="sales-page">
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <p className="product-description">{product.description}</p>
      <div className="product-price">${product.price.toFixed(2)}</div>
      
      <div className="quantity-selector">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>
      
      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Add to Cart
      </button>
      
      <section className="product-features">
        <h2>Key Features</h2>
        <ul>
          {product.features && product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>
      
      <section className="product-reviews">
        <h2>Customer Reviews</h2>
        {product.reviews && product.reviews.map((review, index) => (
          <div key={index} className="review">
            <p>{review.text}</p>
            <p>Rating: {review.rating}/5</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SalesPage;
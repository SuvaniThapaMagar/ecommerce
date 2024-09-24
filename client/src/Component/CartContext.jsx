import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Initialize as an empty array
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  // Derived state for cart item count
  const cartCount = Array.isArray(cartItems) 
    ? cartItems.reduce((total, item) => total + item.quantity, 0) 
    : 0;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/cart/get-item`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setCartItems(data.cartItems);
      } catch (error) {
        console.error("Failed to fetch cart items", error);
      }
    };

    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  const addToCart = async (productId, quantity, image) => {
    try {
      const response = await fetch(`http://localhost:4000/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ cart: [{ productId, quantity, image }] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Add to cart failed");
      }

      const data = await response.json();
      setCartItems(data.cartItems);
      toast.success("Product added successfully");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.message || "Failed to add product to cart");
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/cart/remove/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems);
        toast.success("Product removed from cart");
      } else {
        throw new Error("Error removing from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error(error.message || "Failed to remove product from cart");
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:4000/api/cart/update/${cartItemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems(data.cartItems);
        toast.success("Cart updated successfully");
      } else {
        throw new Error(data.message || "Error updating cart item quantity");
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      toast.error(error.message || "Failed to update cart");
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartCount, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

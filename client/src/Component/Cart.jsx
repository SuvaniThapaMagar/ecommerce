import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/cart/get-item`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCartItems(data.cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [setCartItems]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl font-bold mb-4">Loading cart...</h2>
      </div>
    );
  }

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600">Browse our products and add them to your cart!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-10">
      <h1 className="text-4xl font-bold mb-6">Shopping Cart</h1>
      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center gap-4 p-4 border-b border-gray-200">
            {item.images && item.images.length > 0 ? (
              <img
                src={item.images[0]} // Ensure the image source is correct
                alt={item.title}
                className="w-28 h-28 rounded-md object-cover"
              />
            ) : (
              <div className="w-28 h-28 bg-gray-200 rounded-md flex items-center justify-center">
                No Image
              </div>
            )}
            <div className="flex flex-col flex-1">
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="text-xl font-semibold text-pink-500">NPR {item.price}</p>
              <div className="flex items-center mt-2">
                <button 
                  onClick={() => {
                    const newQuantity = Math.max(1, item.quantity - 1);
                    updateQuantity(item._id, newQuantity);
                  }}
                  className="px-2 py-1 bg-gray-200 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                <button 
                  onClick={() => {
                    const newQuantity = item.quantity + 1;
                    updateQuantity(item._id, newQuantity);
                  }}
                  className="px-2 py-1 bg-gray-200 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-lg font-semibold">Total: NPR {item.price * item.quantity}</div>
              <button 
                onClick={() => removeFromCart(item._id)}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-bold">Order Summary</h2>
        <div className="flex justify-between mt-4 text-xl">
          <span>Subtotal</span>
          <span>NPR {calculateTotal()}</span>
        </div>
        <div className="mt-4">
          <button 
            className="w-full p-3 text-white bg-blue-600 rounded-md" 
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

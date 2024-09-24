// Import necessary hooks
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaHeart } from "react-icons/fa";
import Nav from "./Nav";
import Footer from "./Footer";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems, updateQuantity, removeFromCart } =
    useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!storedUser) {
      alert("You need to login first to access your cart.");
      navigate("/login");
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/cart/get-item`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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
  }, [setCartItems, navigate, storedUser]);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl font-bold mb-4">Loading cart...</h2>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600">
          Browse our products and add them to your cart!
        </p>
        <button
          className="mt-4 p-2 border border-black"
          onClick={() => navigate("/all-product")}
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="container mx-auto mt-10 px-10">
        <h1 className="text-4xl font-bold mb-6">SHOPPING BAG</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Section: Cart Items */}
          <div className="flex-1 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 border border-black"
              >
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.title}
                  className="w-28 h-28 object-cover"
                />
                <div className="flex-1 px-6">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-lg">SIZE: {item.size}</p>
                  <p className="font-semibold">TOTAL: $ {item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-2 py-1 border border-gray-400"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-2 py-1 border border-gray-400"
                  >
                    +
                  </button>
                  <FaHeart className="text-gray-500 cursor-pointer" />
                  <FaTrashAlt
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Section: Summary */}
          <div className="w-full lg:w-1/3 border border-black p-6 space-y-6">
          

            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <span>ORDER VALUE</span>
                <span>$ {calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>SHIPPING</span>
                <span>$ 10</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-xl">
                <span>TOTAL</span>
                <span>$ {calculateTotal() + 10}</span>
              </div>
            </div>

            <button
              className="w-full p-4 text-white bg-black font-semibold"
              onClick={() => navigate("/checkout")}
            >
              CONTINUE TO CHECKOUT
            </button>

          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="mt-6 text-center">
          <button
            className="p-2 border border-black"
            onClick={() => navigate("/all-product")}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Cart;

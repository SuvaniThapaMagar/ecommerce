import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "./CartContext"; // Adjust the path as necessary
import axios from "axios";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calculate total amount
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Load the PayPal script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=AV8SNOUxR8ozWzdXi1u4cVLvL12xpCrz1ncEMn3Zpm5IxyO28ifYsS53uvNcvHMuakFjHIacwnI-b6FP&currency=USD`;
    script.addEventListener("load", () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: calculateTotal().toFixed(2), // Pass the total amount to PayPal
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            handleCheckout(); // Call checkout logic on successful payment
          },
          onError: (err) => {
            console.error("PayPal checkout error: ", err);
            setError("Payment failed. Please try again.");
          },
        })
        .render("#paypal-button-container");
    });
    document.body.appendChild(script);
  }, [cartItems]);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const totalAmount = calculateTotal();
      // Replace with your API endpoint for saving the cart
      const response = await axios.post("http://localhost:4000/api/cart", {
        items: cartItems,
        total: totalAmount,
      });

      // Handle success (e.g., clear cart and show a success message)
      if (response.status === 200) {
        clearCart();
        alert("Checkout successful!"); // You can redirect or show a success page
      }
    } catch (error) {
      console.error("Checkout error: ", error);
      setError("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <ul>
          {cartItems.map((item, index) => (
            <li
              key={`${item.cartItemId}-${index}`}
              className="flex justify-between"
            >
              <span>
                {item.title} (x{item.quantity})
              </span>
              <span>NPR {(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>NPR {calculateTotal().toFixed(2)}</span>
        </div>
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="mb-4" id="paypal-button-container"></div>{" "}
      {/* PayPal button container */}
      <button
        onClick={handleCheckout}
        className="w-full p-3 text-white bg-blue-600 rounded-md"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Checkout;

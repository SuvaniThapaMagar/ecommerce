import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  const [sdkReady, setSdkReady] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Load PayPal SDK dynamically
    const addPayPalScript = async () => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=AV8SNOUxR8ozWzdXi1u4cVLvL12xpCrz1ncEMn3Zpm5IxyO28ifYsS53uvNcvHMuakFjHIacwnI-b6FP&currency=USD`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const createOrderHandler = async (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount.toFixed(2),
          },
        },
      ],
    });
  };

  const onApproveHandler = async (data, actions) => {
    return actions.order.capture().then(async (paymentResult) => {
      console.log("Payment Successful:", paymentResult);

      // Create the order in the backend
      const response = await fetch("http://localhost:4000/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: storedUser._id, // User making the order
          products: cartItems, // Products in the cart
          paymentIntent: {
            id: paymentResult.id,
            amount: totalAmount,
            currency: "USD",
          },
          shippingFee: 10, // If you have fixed shipping fee
        }),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        setOrderCreated(true);
        setCartItems([]); // Clear the cart
        

        // You can navigate to a success page if you want
        navigate("/");
      } else {
        alert("Failed to create order. Please try again.");
      }
    });
  };

  useEffect(() => {
    if (sdkReady) {
      window.paypal.Buttons({
        createOrder: createOrderHandler,
        onApprove: onApproveHandler,
      }).render("#paypal-button-container");
    }
  }, [sdkReady]);

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
        <h2 className="text-4xl font-bold mb-6">Review Your Order</h2>
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
                  <p className="font-semibold">PRICE: ${item.price.toFixed(2)}</p>
                  <p className="font-semibold">
                    TOTAL: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section: Summary */}
          <div className="w-full lg:w-1/3 border border-black p-6 space-y-6">
            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <span>ORDER VALUE</span>
                <span>$ {totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>SHIPPING</span>
                <span>$ 10.00</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-xl">
                <span>TOTAL</span>
                <span>$ {(totalAmount + 10).toFixed(2)}</span>
              </div>
            </div>

            {sdkReady && (
              <div id="paypal-button-container"></div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;

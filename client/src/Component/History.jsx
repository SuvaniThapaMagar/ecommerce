import React, { useState, useEffect } from "react";
import Nav from "./Nav"; // Assuming you're using the same nav component

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:4000/api/order/user-orders", // Adjust the API endpoint as needed
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOrders(Array.isArray(data) ? data : []);
      } else {
        setError(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("An error occurred while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (error) {
    return <div className="text-red-500 font-bold">Error: {error}</div>;
  }

  if (loading) {
    return <div className="font-bold">Loading orders...</div>;
  }

  return (
    <div >
      <Nav />
      <div className="flex flex-col w-full p-6">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>

        {orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <div key={order._id} className="border rounded p-4 shadow">
                <h2 className="font-bold">Order ID: {order._id}</h2>
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Total:</strong> ${order.paymentIntent.amount ? order.paymentIntent.amount : "N/A"}</p>
                <p><strong>Status:</strong> {order.orderStatus}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

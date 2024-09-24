import React, { useState, useEffect } from "react";


const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null); // Track the order being updated

  // Fetch all orders (for admin)
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/order/user-orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Fetched orders:", data);
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

  // Update order status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId); // Set the order being updated
      const response = await fetch(`http://localhost:4000/api/order/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the order status in the state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
        console.log("Order status updated:", data);
      } else {
        setError(data.message || "Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("An error occurred while updating order status");
    } finally {
      setUpdatingOrderId(null); // Reset after updating
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
    <div className="flex flex-row">
     
      <div className="flex flex-col w-full p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Orders</h1>

        {orders.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">Order Date</th>
                <th className="px-4 py-2 border">Products</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Order Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="px-4 py-2 border">{order._id}</td>
                  <td className="px-4 py-2 border">{order.name}</td>
                  <td className="px-4 py-2 border">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">
                    <ul>
                      {order.products.map((item, index) => (
                        <li key={index}>
                          {item.product?.title} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 border">
                    ${order.paymentIntent.amount ? order.paymentIntent.amount : "N/A"}
                  </td>
                  <td className="px-4 py-2 border">
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleUpdateStatus(order._id, e.target.value)
                      }
                      disabled={updatingOrderId === order._id} // Disable during update
                      className="border rounded px-2 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() =>
                        handleUpdateStatus(order._id, order.orderStatus)
                      }
                      disabled={updatingOrderId === order._id} // Disable the button during update
                    >
                      {updatingOrderId === order._id ? "Updating..." : "Update"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrder;

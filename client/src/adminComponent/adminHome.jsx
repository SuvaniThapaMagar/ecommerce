import React, { useState, useEffect } from "react";
import Side from "./adminNav";
import { MdOutlineShoppingBag, MdOutlinePendingActions } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import adminhi from "../assets/adminhi.jpeg";

const AdminDashboard = () => {
  const [orderStats, setOrderStats] = useState({
    total: 0,
    shipped: 0,
    pending: 0,
    processing: 0,
    canceled: 0,
    delivered: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderStats = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/order/user-orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order statistics");
      }

      const data = await response.json();
      setOrderStats(data); // Assuming your API returns the counts in the expected format
    } catch (err) {
      console.error("Error fetching order stats:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderStats();
  }, []);

  if (loading) return <div className="font-bold">Loading dashboard...</div>;
  if (error) return <div className="text-red-500 font-bold">Error: {error}</div>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Side />

      {/* Main Content Area */}
      <div className="flex-1 bg-purple-50 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Hi, Admin Card */}
        <div className="flex items-center bg-white shadow-md p-6 rounded-lg border h-40 mb-8">
          <div className="ml-4 flex-1">
            <p className="text-2xl font-semibold">Hi, Admin!</p>
          </div>
          {/* Image */}
          <img
            src={adminhi}
            alt="Admin Greeting"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Total Orders Card */}
          <div className="flex items-center bg-white shadow-md p-6 rounded-lg border">
            <MdOutlineShoppingBag className="text-4xl text-orange-500 bg-orange-100 p-2 rounded-full" />
            <div className="ml-4">
              <p className="text-2xl font-semibold">{orderStats.total}</p>
              <span className="text-gray-600">Total Orders</span>
            </div>
          </div>

          {/* Pending Card */}
          <div className="flex items-center bg-white shadow-md p-6 rounded-lg border">
            <MdOutlinePendingActions className="text-4xl text-blue-500 bg-blue-100 p-2 rounded-full" />
            <div className="ml-4">
              <p className="text-2xl font-semibold">{orderStats.pending}</p>
              <span className="text-gray-600">Pending</span>
            </div>
          </div>

          {/* Shipped Card */}
          <div className="flex items-center bg-white shadow-md p-6 rounded-lg border">
            <TbTruckDelivery className="text-4xl text-green-500 bg-green-100 p-2 rounded-full" />
            <div className="ml-4">
              <p className="text-2xl font-semibold">{orderStats.shipped}</p>
              <span className="text-gray-600">Shipped</span>
            </div>
          </div>

          {/* Processing Card */}
          <div className="flex items-center bg-white shadow-md p-6 rounded-lg border">
            <MdOutlinePendingActions className="text-4xl text-yellow-500 bg-yellow-100 p-2 rounded-full" />
            <div className="ml-4">
              <p className="text-2xl font-semibold">{orderStats.processing}</p>
              <span className="text-gray-600">Processing</span>
            </div>
          </div>

          {/* Canceled Card */}
          <div className="flex items-center bg-white shadow-md p-6 rounded-lg border">
            <MdOutlinePendingActions className="text-4xl text-red-500 bg-red-100 p-2 rounded-full" />
            <div className="ml-4">
              <p className="text-2xl font-semibold">{orderStats.canceled}</p>
              <span className="text-gray-600">Canceled</span>
            </div>
          </div>

          {/* Delivered Card */}
          <div className="flex items-center bg-white shadow-md p-6 rounded-lg border">
            <MdOutlinePendingActions className="text-4xl text-teal-500 bg-teal-100 p-2 rounded-full" />
            <div className="ml-4">
              <p className="text-2xl font-semibold">{orderStats.delivered}</p>
              <span className="text-gray-600">Delivered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

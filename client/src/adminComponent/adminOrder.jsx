import React, { useState, useEffect } from 'react';
import Side from './adminNav';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/order/user-orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        setOrders(data || []);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('An error occurred while fetching orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='flex flex-row'>
      <Side />
      <h1>Admin Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>Status: {order.orderStatus}</p>
              <p>Ordered by: {order.name}</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
              <h4>Products:</h4>
              <ul>
                {order.products.map((item, index) => (
                  <li key={index}>(Quantity: {item.quantity})
                  </li>
                ))}
              </ul>
              <p>Payment Intent: {JSON.stringify(order.paymentIntent)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default AdminOrder;
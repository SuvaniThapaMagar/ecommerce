const fetchUserOrders = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/order/user-orders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      const orders = await response.json();
      if (response.ok) {
        setOrders(orders);  // Set the orders in state to display
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
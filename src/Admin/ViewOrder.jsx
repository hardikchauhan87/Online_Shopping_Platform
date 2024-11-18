import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderView = () => {
  const { email } = useParams(); // Get email from route parameters
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shippedItems, setShippedItems] = useState({}); // Keep track of shipped items

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        if (data.success && data.orders && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setError('No orders found or invalid data structure');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  // Function to handle shipment and send email
  const handleShipItem = async (orderItem, index) => {
    try {
        const response = await fetch('http://localhost:5000/api/ship-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, orderItemName: orderItem.name }),
        });

        // Check for non-2xx responses
        if (!response.ok) {
            const errorText = await response.text(); // Read response as text
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json(); // Parse JSON response

        if (data.success) {
            // Mark item as shipped
            setShippedItems((prev) => ({ ...prev, [index]: true }));
        } else {
            alert('Failed to ship item: ' + (data.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error shipping item:', error);
        alert('Error shipping item: ' + error.message);
    }
};


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Orders for {email}</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Order Group {index + 1}</h5>
              {Array.isArray(order.order_data) && order.order_data.length > 0 ? (
                order.order_data.map((orderGroup, i) => (
                  <div key={i} className="mb-3">
                    <h6>Order Date: {orderGroup[0]?.Order_date || 'Unknown'}</h6>
                    <table className="table table-bordered table-striped table-hover table-sm">
                      <thead className="thead-dark">
                        <tr>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Size</th>
                          <th>Price</th>
                          <th>Image</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderGroup.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>{item.size}</td>
                            <td>₹{item.price}</td>
                            <td>
                              <img src={item.img} alt={item.name} width="50" className="img-fluid" />
                            </td>
                            <td>
                              <button
                                className={`btn btn-${shippedItems[idx] ? 'success' : 'primary'}`}
                                onClick={() => handleShipItem(item, idx)}
                                disabled={shippedItems[idx]} // Disable button after shipping
                              >
                                {shippedItems[idx] ? 'Shipped' : 'Ship Item'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
              ) : (
                <div className="alert alert-warning">No order data available</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-warning">No orders found.</div>
      )}
    </div>
  );
};

export default OrderView;

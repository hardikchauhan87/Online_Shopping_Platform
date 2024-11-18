import React, { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import Footer from '../Components/Footer';

const MyOrder = () => {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('UserEmail'); // Ensure this matches how you stored it
        console.log("Fetching orders for:", userEmail);
        
        const response = await fetch("http://localhost:5000/api/myorderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userEmail })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Fetched order data:", data); // Log fetched data
            // Set order data if it exists
            if (data.orderData) {
                setOrderData(data.orderData.order_data);
            } else {
                console.error("No order data found");
            }
        } else {
            console.error("Failed to fetch order data");
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? (
                        orderData.map((orderArray, index) => (
                            <div key={index} className='col-12'>
                                {orderArray[0]?.Order_date && (
                                    <div className='m-auto mt-5'>
                                        <h4>Order Date: {orderArray[0].Order_date}</h4>
                                        <hr />
                                    </div>
                                )}
                                <div className='row'>
                                    {orderArray.slice(1).map((order, orderIndex) => (
                                        <div key={orderIndex} className='col-12 col-md-6 col-lg-4'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                <img src={order.img} className="card-img-top" alt={order.name} style={{ height: "120px", objectFit: "fill" }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{order.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>Qty: {order.qty}</span>
                                                        <span className='m-1'>Size: {order.size}</span>
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{order.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <div className='m-5 w-100 text-center fs-3'>You have no orders.</div>
                    )}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
};

export default MyOrder;

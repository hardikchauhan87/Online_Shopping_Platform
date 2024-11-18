import React from 'react';
import { useDispatch, useCart } from '../Components/ContextReducer';

const Cart = () => {
    let data = useCart();
    let dispatch = useDispatch();

    // Check if the cart is empty
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty</div>
            </div>
        );
    }
const handlecheckOut=async()=>{
    let userEmail=localStorage.getItem("UserEmail");
    let response=await fetch("http://localhost:5000/api/orderData",
        {
            method:'POST',
            headers:{
                    'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                order_data:data,
                email:userEmail,
                order_date:new Date().toDateString()
            })
        }
    );
    console.log(response)
    if(response.status==200){
        dispatch({type:'DROP'})
    }

}
    // Calculate total price
    let totalPrice = data.reduce((total, food) => {
        // Ensure food.qty and food.price are numbers
        const quantity = Number(food.qty);
        const price = Number(food.price);
        console.log(`Item: ${food.name}, Price: ${price}, Qty: ${quantity}`); // Debug: log each item and price
        return total + (price * quantity); // Calculate total including quantity
    }, 0);

    console.log("Total Price:", totalPrice); // Debug: check the final total price

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive-sm table-responsive-md'>
                <table className='table table-dark table-sm table-striped table-bordered table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Option</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((food, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>₹{food.price.toFixed(2)}</td> {/* Format price */}
                                    <td>
                                        <button type='button' className='btn p-0'>
                                            <img src="https://img.icons8.com/ios/50/trash--v1.png" alt="delete" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div>
                    <h1 style={{ color: 'white' }} className='fs-2'>Total Price: ₹{totalPrice.toFixed(2)}/-</h1> {/* Ensure it's within the main return */}
                </div>
            </div>
            <button className='btn bg-success mt-5' onClick={handlecheckOut}>Check Out</button>
        </div>
    );
}

export default Cart;

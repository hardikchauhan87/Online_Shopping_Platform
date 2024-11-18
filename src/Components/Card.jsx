import React, { useState, useEffect } from 'react';
import { useDispatch, useCart } from './ContextReducer';

const Card = (props) => {
  let cartData = useCart();
  let dispatch = useDispatch();

  let options = props.options || {};
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0] || "");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let selectedSizePrice = options[size] || 0;
    setTotalPrice(qty * selectedSizePrice);
  }, [qty, size, options]);

  const handleAddToCart = async () => {
    const existingItem = cartData.find(item => item.id === props.foodItem._id && item.size === size);

    if (existingItem) {
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        price: totalPrice,
        qty: existingItem.qty + qty,
        size: size
      });
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: totalPrice,
        img: props.foodItem.img,
        qty: qty,
        size: size
      });
    }
  };

  const getImageSrc = () => {
    if (props.foodItem.img) {
      if (props.foodItem.img.startsWith('data:image/')) {
        return props.foodItem.img;
      } else {
        return props.foodItem.img;
      }
    } else {
      return "";
    }
  };

  useEffect(() => {
    console.log("Current food item image:", props.foodItem.img);
  }, [props.foodItem.img]);

  const cardStyles = {
    width: '18rem',
    marginBottom: '20px',
  };

  const imageStyles = {
    height: '120px',
    objectFit: 'cover',
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card" style={cardStyles}>
        <img
          src={getImageSrc()}
          className="card-img-top"
          alt={props.foodItem.name}
          style={imageStyles}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className='container w-100'>
            <select className='m-2 bg-success text-white' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className='m-2 bg-success text-white rounded' value={size} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.length > 0 ? priceOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              )) : <option>No options available</option>}
            </select>
            <div className='d-inline h-100 fs-5'>
              Total price: ₹{totalPrice.toFixed(2)}
            </div>
          </div>
          <hr />
          <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>
            Add {qty} {qty > 1 ? 'Items' : 'Item'} to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
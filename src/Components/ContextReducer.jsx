import React, { useReducer, createContext, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }
      ];

    case "UPDATE":
      // Update the item with matching id and size
      return state.map(item =>
        item.id === action.id && item.size === action.size
          ? { ...item, qty: action.qty, price: action.price }
          : item
      );

    case "REMOVE":
      // Filter out the item by its index
      return state.filter((_, index) => index !== action.index);

      case "DROP":
  let empArray=[]
  return empArray
    default:
      console.error("Unknown action type:", action.type);
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []); // Initial state as an empty array

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

// Custom hooks to access the cart state and dispatch functions
export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);

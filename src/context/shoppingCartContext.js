import React, { createContext, useState } from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = props => {
  const [cart, setCart] = useState([]);

  const removeItemFromCart = trackId => {
    const newCart = cart.filter(track => track !== trackId);
    setCart(newCart);
  };

  const addItemToCart = trackId => {
    console.log(cart);
    if (cart.includes(trackId)) {
      return removeItemFromCart(trackId);
    }
    return setCart([...cart, trackId]);
  };

  const cartState = {
    cart,
    setCart,
    removeItemFromCart,
    addItemToCart
  };

  return (
    <ShoppingCartContext.Provider value={cartState}>
      {props.children}
    </ShoppingCartContext.Provider>
  );
};

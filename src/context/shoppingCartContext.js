import React, { createContext, useState } from 'react';
import jwt from 'jsonwebtoken';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = props => {
  const [cart, setCart] = useState([]);
  const [licenseModal, setLicenseModal] = useState(false);
  const [modalPrice, setModalPrice] = useState(0);

  const createCartToken = () => {
    const token = jwt.sign(cart, process.env.REACT_APP_SECRET_OR_KEY, { expiresIn: 31556926 });
    localStorage.setItem('cart', token);
  };

  const removeItemFromCart = trackId => {
    const newCart = cart.filter(track => track !== trackId);
    setCart(newCart);
  };

  // {
  //   id: 111,
  //   licenseType: 'mp3'
  // }

  const addItemToCart = track => {
    setCart([...cart, track]);
    return createCartToken();
  };

  const cartState = {
    cart,
    setCart,
    removeItemFromCart,
    addItemToCart,
    licenseModal,
    setLicenseModal,
    modalPrice,
    setModalPrice
  };

  return (
    <ShoppingCartContext.Provider value={cartState}>
      {props.children}
    </ShoppingCartContext.Provider>
  );
};

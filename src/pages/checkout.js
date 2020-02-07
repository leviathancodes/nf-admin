import React, { useContext, useEffect } from 'react';
import CheckoutForm from '../components/checkout/checkoutForm';
import { AudioContext } from '../context/audioContext';
import { ShoppingCartContext } from '../context/shoppingCartContext'

const Checkout = () => {
  const { setFooterVisibility } = useContext(AudioContext);
  const { cart } = useContext(ShoppingCartContext);

  useEffect(() => {
    setFooterVisibility('none');

    return () => {
      setFooterVisibility('auto');
    };
  }, [setFooterVisibility]);

  if (cart.length === 0) {
    return <h1>Your cart is empty.</h1>;
  }
  return (
    <CheckoutForm />
  );
};

export default Checkout;

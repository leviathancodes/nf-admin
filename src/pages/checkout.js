import React, { useContext, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import CheckoutForm from '../components/checkout/checkoutForm';
import CheckoutSidebar from '../components/checkout/sidebar';
import { SideBarPageContainer } from '../components/shared/shared';
import { AudioContext } from '../context/audioContext';
import { ShoppingCartContext } from '../context/shoppingCartContext';
import PurchaseContainer from '../components/modal/purchaseContainer';

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
    <SideBarPageContainer division="60% 40%">
      <div>
        <CheckoutForm />
        <div>
          <PurchaseContainer
            title="Title"
            description="lorem ipsum and then sum ya bum ass nigga"
            licenseBenefits={['Her vulva was beautiful', 'Pussy', 'Yung Muney']}
          />
          <PurchaseContainer
            title="Title 2"
            description="lorem ipsum and then sum ya bum ass nigga"
            licenseBenefits={[
              'Untagged beat in MP3 format',
              'Streaming distribution (Apple Music, Spotify, etc)',
              'Distribution Limit: 2,500',
              'Monetized Streams: 250,000',
              'Instant Download'
            ]}
          />
        </div>
      </div>
      <CheckoutSidebar />
    </SideBarPageContainer>
  );
};

export default Checkout;

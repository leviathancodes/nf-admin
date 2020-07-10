import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const CheckoutForm = () => {
  const onToken = (token, addresses) => {
    console.log(token, addresses);
  };

  return (
    <div>
    <StripeCheckout
      name="Fire beat"
      description="AIDS"
      image={`${process.env.REACT_APP_NOMAD_MUSIC_S3}/bleak/cover/cover_bleak.jpg`}
      stripeKey={process.env.REACT_APP_PUBLIC_STRIPE_KEY}
      amount={1000000}
      token={onToken}
    />
    </div>
  );
};

export default CheckoutForm;

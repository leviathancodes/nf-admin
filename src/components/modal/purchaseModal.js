import React, { useContext } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import PurchaseContainer from './purchaseContainer';
import { ShoppingCartContext } from '../../context/shoppingCartContext';

const Container = styled(Modal)`
  padding: 1em;
`;

const Panels = styled.div`
  display: flex;
  flex-direction: row;
`;

const Exit = styled.img``;

const PurchaseModal = () => {
  const {
    modalPrice,
    licenseModal,
    setLicenseModal,
    setModalPrice
  } = useContext(ShoppingCartContext);

  const handleClose = () => {
    setModalPrice(0);
    setLicenseModal(false);
  };
  return (
    <Container
      isOpen={licenseModal}
      parentSelector={() => document.querySelector('.App')}
      onRequestClose={handleClose}
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          border: '0'
        },
        content: {
          border: '0',
          outline: 'none'
        }
      }}
    >
      <button type="button" onClick={handleClose} />
      <Panels>
        <PurchaseContainer
          title={`Basic MP3 - $${modalPrice}`}
          description="Perfect for independent artists working on a small scale project."
          licenseBenefits={[
            'Untagged beat in MP3 format.  Trackouts not included.',
            'Streaming distribution (Apple Music, Spotify, etc)',
            'Distribution Limit: 2,500',
            'Monetized Streams: 250,000',
            'Instant Download'
          ]}
          onRequestClose={handleClose}
        />
        <PurchaseContainer
          title={`Basic WAV - $${(modalPrice + 25).toFixed(2)}`}
          description="Perfect for independent artists working on a small scale project."
          licenseBenefits={[
            'Untagged beat in WAV format.  Trackouts not included.',
            'Streaming distribution (Apple Music, Spotify, etc)',
            'Distribution Limit: 2,500',
            'Monetized Streams: 250,000',
            'Instant Download'
          ]}
          onRequestClose={handleClose}
        />
        <PurchaseContainer
          title={`Premium WAV - $${(modalPrice + 75).toFixed(2)}`}
          description="Perfect for artists in need of trackouts without distribution limits."
          licenseBenefits={[
            'Untagged beat in WAV format.  Trackouts included.',
            'Streaming distribution (Apple Music, Spotify, etc)',
            'Distribution Limit: 2,500',
            'Monetized Streams: 250,000',
            'Instant Download'
          ]}
          onRequestClose={handleClose}
        />
      </Panels>
    </Container>
  );
};

export default PurchaseModal;

import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { UserContext } from '../../context/userContext';
import { AuthContext } from '../../context/authContext';
import AuthForm from '../form/authForm';

const Container = styled(Modal)`
  background-color: white;
  transition: all 0.5s;
`;

const AuthModal = props => {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  return (
    <Container
      isOpen={props.isOpen}
      parentSelector={() => document.querySelector('#navigation')}
    >
      <button type="button" onClick={() => userContext.setIsAuthModalActive(false)}>Close modal</button>
      <AuthForm
        heading="Log In"
        subheading="Save your favorite beats, get in touch with me faster, and more when you login!"
        authOption="Log In"
        authHandler={authContext.loginUserLocal}
      />{' '}
    </Container>
  );
};

export default AuthModal;

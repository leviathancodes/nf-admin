import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import styled from 'styled-components';
import AuthForm from '../components/form/authForm';
import { AuthContext } from '../context/authContext';
import { AudioContext } from '../context/audioContext';
import { UserContext } from '../context/userContext';

const Container = styled.div`
  height: 100vh;
`;

const Login = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const { setFooterVisibility } = useContext(AudioContext);

  useEffect(() => {
    setFooterVisibility('none');
    return () => {
      setFooterVisibility('auto');
    };
  }, [setFooterVisibility]);

  return (
    <Container>
      <AuthForm
        heading="Log In"
        subheading="Save your favorite beats, get in touch with me faster, and more when you login!"
        authOption="Log In"
        authHandler={authContext.loginFirebaseUser}
      />
    </Container>
  );
};

export default Login;

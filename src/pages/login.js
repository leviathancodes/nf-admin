import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import AuthForm from '../components/form/authForm';
import { AuthContext } from '../context/authContext';
import { AudioContext } from '../context/audioContext';

const Container = styled.div`
  height: 100vh;
`;

const Login = () => {
  const authContext = useContext(AuthContext);
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
        authHandler={authContext.loginUserLocal}
      />
    </Container>
  );
};

export default Login;

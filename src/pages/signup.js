import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import AuthForm from '../components/form/authForm';
import { AuthContext } from '../context/authContext';
import { AudioContext } from '../context/audioContext';

const Container = styled.div`
  height: 150vh;
`;

const SignUp = () => {
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
        register
        heading="Register Now"
        subheading="Save your favorite beats, get in touch with me faster, and more when you register!"
        authOption="Sign Up"
        signup
        authHandler={authContext.registerUserLocal}
      />
    </Container>
  );
};

export default SignUp;

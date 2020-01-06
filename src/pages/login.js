import React from 'react';
import styled from 'styled-components';
import AuthForm from '../components/form/authForm';

const Container = styled.div`
  height: 100vh;
`;

const Login = () => {
  return (
    <Container>
      <AuthForm
        heading="Log In"
        subheading="Save your favorite beats, get in touch with me faster, and more when you login!"
        authOption="Log In"
      />
    </Container>
  );
};

export default Login;

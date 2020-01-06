import React from 'react';
import styled from 'styled-components';
import AuthForm from '../components/form/authForm';

const Container = styled.div`
  height: 150vh;
`;

const SignUp = () => {
  return (
    <Container>
      <AuthForm
        register
        heading="Register Now"
        subheading="Save your favorite beats, get in touch with me faster, and more when you register!"
        authOption="Sign Up"
        signup
      />
    </Container>
  );
};

export default SignUp;

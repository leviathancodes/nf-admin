import React, { useContext } from 'react';
import styled from 'styled-components';
import AuthForm from '../components/form/authForm';
import { AuthContext } from '../context/authContext';


const Container = styled.div`
  height: 100vh;
`;

const Login = () => {
  const authContext = useContext(AuthContext);

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

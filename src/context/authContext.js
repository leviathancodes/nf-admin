import React, { createContext, useContext } from 'react';
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { UserContext }from './userContext';

export const AuthContext = createContext();


export const AuthProvider = props => {
  const userContext = useContext(UserContext);

  const registerUserLocal = async (userData, history) => {
    try {
      await axios.post('/user/signup/local', userData);
      history.push('/login');
    } catch (e) {
      console.log(e);
    }
  };

  const loginUserLocal = async (userData) => {
    try {
      const res = await axios.post('/user/signup/local', userData);
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      console.log('lol');
    } catch (e) {
      console.log(e);
    }
  };

  const logoutUserLocal = async () => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
  };

  const setCurrentUser = decoded => {

  };

  const authState = {
    registerUserLocal,
    loginUserLocal,
    logoutUserLocal
  };

  return (
    <AuthContext.Provider value={authState}>{props.children}</AuthContext.Provider>
  );
};

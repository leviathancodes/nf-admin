import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export const UserContext = createContext();

export const UserProvider = props => {
  const [user, setUser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalActive, setIsAuthModalActive] = useState(false);

  console.log(user);

  useEffect(() => {
    async function fetchData() {
      if (!user && localStorage.getItem('jwtToken')) {
        try {
          setAuthToken(localStorage.getItem('jwtToken'));
          const decodedToken = jwt_decode(localStorage.getItem('jwtToken'));
          const res = await axios.get(`/api/user?id=${decodedToken.id}`);
          return setUser(res.data);
        } catch (e) {
          return console.log(e.message, e);
        }
      }
      console.log('User already set');
    }
    fetchData();
  }, [user]);

  const userState = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAuthModalActive,
    setIsAuthModalActive
  };

  return (
    <UserContext.Provider value={userState}>
      {props.children}
    </UserContext.Provider>
  );
};

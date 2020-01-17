import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState('false');

  const userState = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated
  };

  return (
    <UserContext.Provider value={userState}>{props.children}</UserContext.Provider>
  );
};

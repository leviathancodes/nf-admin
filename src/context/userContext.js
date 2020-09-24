import React, { createContext, useState, useEffect } from 'react';
import backend from '../firebase';

export const UserContext = createContext();

export const UserProvider = props => {
  // const [user, setUser] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalActive, setIsAuthModalActive] = useState(false);

  useEffect(() => {
    backend.auth().onAuthStateChanged(user => {
      setFirebaseUser(user);
    });
    console.log(firebaseUser);
  }, [firebaseUser]);

  const userState = {
    isAuthenticated,
    setIsAuthenticated,
    isAuthModalActive,
    setIsAuthModalActive,
    firebaseUser,
    setFirebaseUser
  };

  return (
    <UserContext.Provider value={userState}>
      {props.children}
    </UserContext.Provider>
  );
};

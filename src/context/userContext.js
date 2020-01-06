import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    likedTracks: [],
    purchases: [],
    admin: false
  });

  const userState = {
    user,
    setUser
  };

  return (
    <UserContext.Provider value={userState}>{props.children}</UserContext.Provider>
  );
};

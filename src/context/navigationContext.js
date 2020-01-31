import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserContext } from './userContext';

export const NavigationContext = createContext();

const initialMenuOptions = {
  pages: [
    { name: 'Home', route: '/' },
    { name: 'About', route: '/about' },
    { name: 'Beats', route: '/music' },
    { name: 'Projects', route: 'projects' },
    { name: 'Contact', route: '/contact' }
  ],
  auth: [
    { name: 'Log in', route: '/login' },
    { name: 'Sign up', route: '/signup' }
  ]
};

export const NavigationProvider = props => {
  const [menuOptions, setMenuOptions] = useState(initialMenuOptions);
  const [backgroundColor, setBackgroundColor] = useState('auto');
  const [visibility, setVisibility] = useState(true);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.user) {
      setMenuOptions({
        ...menuOptions,
        auth: [
          { name: 'Your account', route: '/profile' },
          { name: 'Log out', route: '/' }
        ]
      });
    } else {
      setMenuOptions(initialMenuOptions);
    }
  }, [userContext.user]);
  const navState = {
    menuOptions,
    setMenuOptions,
    backgroundColor,
    setBackgroundColor,
    visibility,
    setVisibility
  };
  return (
    <NavigationContext.Provider value={navState}>
      {props.children}
    </NavigationContext.Provider>
  );
};

import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserContext } from './userContext';

export const NavigationContext = createContext();

export const NavigationProvider = props => {
  const userContext = useContext(UserContext);

  const initialMenuOptions = {
    pages: [
      { name: 'Home', route: '/' },
      { name: 'About', route: '/about' },
      { name: 'Beats', route: '/music' },
      { name: 'Cart', route: '/checkout' }
    ],
    auth: [
      { name: 'Log in', route: '/login' },
      { name: 'Sign up', route: '/signup' }
    ]
  };

  const [menuOptions, setMenuOptions] = useState(initialMenuOptions);
  const [backgroundColor, setBackgroundColor] = useState('auto');
  const [visibility, setVisibility] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    console.log(userContext.firebaseUser);
    if (userContext.firebaseUser) {
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
  }, [userContext.firebaseUser]);
  const navState = {
    menuOptions,
    setMenuOptions,
    backgroundColor,
    setBackgroundColor,
    visibility,
    setVisibility,
    mobileMenu,
    setMobileMenu
  };
  return (
    <NavigationContext.Provider value={navState}>
      {props.children}
    </NavigationContext.Provider>
  );
};

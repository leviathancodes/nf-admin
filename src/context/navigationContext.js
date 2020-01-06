import React, { createContext, useState } from 'react';

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
  const navState = {
    menuOptions,
    setMenuOptions,
    backgroundColor,
    setBackgroundColor
  };
  return (
    <NavigationContext.Provider value={navState}>{props.children}</NavigationContext.Provider>
  );
};

import React from 'react';
import { ThemeProvider } from 'styled-components';
import Wrapper from './Wrapper';
import theme from './styles/styled-components/theme';
import { AudioProvider } from './context/audioContext';
import { NavigationProvider } from './context/navigationContext';
import { AuthProvider } from './context/authContext';
import { UserProvider } from './context/userContext';
import { ShoppingCartProvider } from './context/shoppingCartContext';
import './styles/scss/main.scss';
import backend from './firebase';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <AuthProvider>
          <NavigationProvider>
            <ShoppingCartProvider>
              <AudioProvider>
                <div className="App">
                  <Wrapper />
                </div>
              </AudioProvider>
            </ShoppingCartProvider>
          </NavigationProvider>
        </AuthProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;

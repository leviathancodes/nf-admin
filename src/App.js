import React from 'react';
import { ThemeProvider } from 'styled-components';
import Wrapper from './Wrapper';
import theme from './styles/styled-components/theme';
import { AudioProvider } from './context/audioContext';
import { NavigationProvider } from './context/navigationContext';
import { AuthProvider } from './context/authContext';
import { UserProvider } from './context/userContext';
import './styles/scss/main.scss';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <NavigationProvider>
            <AudioProvider>
              <div className="App">
                <Wrapper />
              </div>
            </AudioProvider>
          </NavigationProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

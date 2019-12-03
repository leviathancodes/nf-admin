import React from 'react';
import { ThemeProvider } from 'styled-components';
import Wrapper from './Wrapper';
import theme from './styles/styled-components/theme';
import { AudioProvider } from './context/audioContext';
import './styles/scss/main.scss';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AudioProvider>
        <div className="App">
          <Wrapper />
        </div>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;

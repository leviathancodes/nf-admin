import React from 'react';
import Wrapper from './Wrapper';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './themes/global';
import './styles/scss/main.scss';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Wrapper />
    </div>
  );
}

export default App;

import React from 'react';
import Wrapper from './Wrapper';
import { AudioProvider } from './context/audioContext';
import './styles/scss/main.scss';

function App() {
  return (
    <AudioProvider>
      <div className="App">
        <Wrapper />
      </div>
    </AudioProvider>
  );
}

export default App;

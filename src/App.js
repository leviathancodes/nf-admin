import React from 'react';
import Wrapper from './Wrapper';
import 'bulma/css/bulma.css';
import './styles/scss/main.scss';
import { SearchProvider } from './context/searchContext';

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <Wrapper />
      </SearchProvider>
    </div>
  );
}

export default App;

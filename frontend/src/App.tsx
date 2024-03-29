import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import Routes from './routes';

import { AppProvider } from './hooks';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyle />
    <AppProvider>
      <Routes />
    </AppProvider>
  </BrowserRouter>
);

export default App;

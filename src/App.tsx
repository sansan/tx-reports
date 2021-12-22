import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import '@fontsource/roboto';

import themeConfig from 'config/theme';
import store from 'store';
import PagesRouter from 'pages';

const App = () => (
  <BrowserRouter>
    <ChakraProvider theme={themeConfig}>
      <Provider store={store}>
        <PagesRouter />
      </Provider>
    </ChakraProvider>
  </BrowserRouter>
);

export default App;

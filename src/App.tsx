import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import PagesRouter from 'pages';

const App = () => (
  <BrowserRouter>
    <ChakraProvider>
      <PagesRouter />
    </ChakraProvider>
  </BrowserRouter>
);

export default App;

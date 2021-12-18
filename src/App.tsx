import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <ChakraProvider />
  </BrowserRouter>
);

export default App;

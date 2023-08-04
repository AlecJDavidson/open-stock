import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './components/views/Home';
import client from './apollo/client';
import PartListContextProvider from './context/PartListContextProvider';

const App: React.FC = () => {
  return (
    <PartListContextProvider>
      <ChakraProvider>
        <ApolloProvider client={client}>
          <Home />
        </ApolloProvider>
      </ChakraProvider>
    </PartListContextProvider>
  );
};

export default App;

import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import PartsSearch from './components/ui/PartSearch'; // Replace with the path to your PartsSearch component

const client = new ApolloClient({
  uri: 'http://localhost:4000/', // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <PartsSearch />
    </ApolloProvider>
  );
};

export default App;

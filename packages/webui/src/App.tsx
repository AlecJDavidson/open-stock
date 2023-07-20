import React from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import Home from './components/views/Home'
const apollo_uri: string = import.meta.env.VITE_APOLLO_URI as string

const client: ApolloClient<unknown> = new ApolloClient({
  uri: apollo_uri,
  cache: new InMemoryCache(),
})

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default App

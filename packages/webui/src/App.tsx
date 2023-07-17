import React from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Navbar from './components/ui/Navbar'
import PartsSearch from './components/ui/PartSearch' // Replace with the path to your PartsSearch component

const apollo_uri = import.meta.env.VITE_APOLLO_URI

const client = new ApolloClient({
  uri: apollo_uri,
  cache: new InMemoryCache(),
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <PartsSearch />
    </ApolloProvider>
  )
}

export default App

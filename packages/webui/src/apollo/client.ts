import { ApolloClient, InMemoryCache } from '@apollo/client';

const apollo_uri: string = import.meta.env.VITE_APOLLO_URI as string;

const client: ApolloClient<unknown> = new ApolloClient({
  uri: apollo_uri,
  cache: new InMemoryCache(),
});

export default client;

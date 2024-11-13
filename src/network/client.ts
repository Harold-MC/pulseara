import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    'x-api-key': import.meta.env.VITE_APP_API_API_KEY
  },
  cache: new InMemoryCache(),
});

export default client;


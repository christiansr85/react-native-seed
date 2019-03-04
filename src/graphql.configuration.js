import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const URI = 'http://192.168.100.51:4000/graphql';
const client = new ApolloClient({
  link: new HttpLink({
    uri: URI
  }),
  cache: new InMemoryCache()
});

export default client;
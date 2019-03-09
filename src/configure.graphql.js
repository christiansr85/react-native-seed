import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import config from '../conf.json'

const URI = config.URL_API;
const client = new ApolloClient({
  link: new HttpLink({
    uri: URI
  }),
  cache: new InMemoryCache()
});

export default client;
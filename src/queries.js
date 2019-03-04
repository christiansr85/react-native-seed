import gql from 'graphql-tag';
import client from './graphql.configuration';

client
  .query({
    query: gql`
      {
        people {
          name
          age
        }
      }
    `
  })
  .then(result => console.log(result));

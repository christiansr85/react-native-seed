import gql from 'graphql-tag';

export const peopleQuery = gql`
  query GetPeople {
    people {
      id
      name
      age
    }
  }`;

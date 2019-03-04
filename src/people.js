import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Text } from 'react-native';

const People = () => (
  <Query
    query={gql`
      {
        people {
          name
          age
        }
      }
    `}>
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) {
        console.log(error);
        return <Text>Error llega :(</Text>;
      }

      return data.people.map(({ name, age }) => (
        <Text key={name}>
          {name}: {age}
        </Text>
      ));
    }}
  </Query>
);

export default People;

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { StyleSheet, Text, View } from 'react-native';

import client from './src/graphql.configuration';
import People from './src/people';

export default class App extends React.Component {
  render() {
    return (
      // <View style={styles.container}>
      //   <Text>Open up App.js to start working on your app!</Text>
      // </View>
      <ApolloProvider client={client}>
        <View style={styles.container}>
          {/* <Text>Open up App.js to start working on your app!</Text> */}
          <People/>
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

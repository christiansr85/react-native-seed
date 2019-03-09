import { registerRootComponent } from 'expo';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import ScaryPeople from './components/scary-people';
import client from './configure.graphql';
import configureStore from './configure.store';

let store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <View style={styles.container}>
            <ScaryPeople />
          </View>
        </Provider>
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

registerRootComponent(App);

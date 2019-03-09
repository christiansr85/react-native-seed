# React Native seed
Seed for React Native apps. Built along GraphQL and Redux.

Below I explain a little how I got to run the application mixin `graphql` and `redux`. I faced many problems, so I'll try to tell you all of them here.

***
You can download this mini-project and test against a very simple `graphql` server I built: https://github.com/christiansr85/express-graphql-server

There you can find more information about the data is server.
***

# Redux

To configure the store for the application wasn't hard at all. It's done like in a typical `react` application. You can find the setup for this fetaure in `configure.store.js` file.

Of course, the definition of actions and reducers is as always too.

# Graphql

This one was more painful. I had problems trying to start the `graphql` client with the `createNetworkInterface` function of `react-apollo`, as you probably have already experimented. After a lot of researching and trying lot of code snippets I ended up using `apollo-client` along `apollo-link-http`. By this way I was able to run the client to communicate with API server.

With just this code snippet we can configure it ready to get data (you can find this in `configure.graphql.js`):
```
const URI = config.URL_API;
const client = new ApolloClient({
  link: new HttpLink({
    uri: URI
  }),
  cache: new InMemoryCache()
});
```

***
**IMPORTANT**: as you are going to test the application through your smartphone or in an emulator, and, probably, against the example server I told you at the start of the document, you can't set the url endpoint to your `localhost` address, so you have to provide, at least, the local IP of the machine where the server is runnig. 

It's something easy to understand but, at the beginning, although I reached to raise the server up, the queries weren't being executed successfully until I realized of that situation.
***

I had to define the query I was going to test as well. I put it in `src/actions/graphql/queries.js`. Maybe it's not the best place I could choose, but the whole folder structure is something that could be improved. In order to define the query, I had to use the dependency `graphql-tag`:
```
import gql from 'graphql-tag';

export const peopleQuery = gql`
  query GetPeople {
    people {
      id
      name
      age
    }
  }`;
```

And also I had to implement the function which consumes that query (in `src/actions/people.js`):
```
import { ACTIONS } from '.';
import client from '../configure.graphql';
import { peopleQuery } from './graphql/queries';

export function fetchPeople() {
  return (dispatch, getState) => {
    dispatch({ type: ACTIONS.PEOPLE.FETCH_PEOPLE });
    client
      .query({
        query: peopleQuery
      })
      .then(resp => {
        if (resp.data) {
          dispatch({
            type: ACTIONS.PEOPLE.FETCH_PEOPLE_SUCCESS,
            payload: resp.data.people
          });
        }
      });
  };
}
```

Note that here is the first place where you can find `redux` and `graphql` features coexisting.

# Blending Redux and Graphql

Basically, we have to take notice of two files: `App.js` and the component which renders the results of the server's request, `scary-people.js`.

## App.js

Here we have to wrap our component with two providers, one for `graphql` and other one for the store:
```
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
```

Old implementations were including the `store` property in the `ApolloProvider` component, doing something like
```
<ApolloProvider client={client} store={store}>
    ...
</ApolloProvider>
```
 But this leads to problems since the `apollo` provider no longer supports the store object. So you have to nest the store provider inside the other one.

## scary-people.js

The code:
```
class ScaryPeople extends Component {
  componentWillMount() {
    this.props.fetchData();
  }

  mapPeople = () => {
    const { peopleData } = this.props;
    if (peopleData) {
      return peopleData.people.map((s, index) => {
        return (
          <View key={index} style={scaryPeopleStyle.itemList}>
            <Text>
              {s.name} is {s.age} years old
            </Text>
          </View>
        );
      });
    }
  };

  render() {
    return (
      <View style={scaryPeopleStyle.containerList}>
        <ScrollView>{this.mapPeople()}</ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    peopleData: state.peopleData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => {
      return dispatch(fetchPeople());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScaryPeople);
```

Besides the `redux` HOC setup at the bottom, you can see that the dispatch map calls to the `fetchPeople` function which executes the `graphql` query. Specifically, this is called from the `componentWillMount` lifecycle function of the component. After the server responses, a new action is dispatched (it depends on the result of the request) and the state management cycle continues as usual, filling the component with the data received.

# Dependencies

As the version of the dependencies is very important (I had lot of issues to build this tiny app for using different versions of the examples I read. Those examples were not too old, just few months...), these are the ones I used:
```
"dependencies": {
    "apollo-cache-inmemory": "^1.5.1",
    "apollo-client": "^2.5.1",
    "apollo-link": "^1.2.8",
    "apollo-link-error": "^1.1.7",
    "apollo-link-http": "^1.5.11",
    "expo": "^32.0.0",
    "graphql": "^14.1.1",
    "graphql-tag": "^2.10.1",
    "react": "16.5.0",
    "react-apollo": "^2.5.1",
    "react-native": "https://github.com/expo/react-native/archive/sdk-32.0.0.tar.gz",
    "react-redux": "^6.0.1",
    "redux": "^4.0.1",
    "redux-thunk": "^2.3.0"
  },
  "devDependencies": {
    "babel-preset-expo": "^5.0.0"
  }
```

# Conclusion

By the moment, that's all. I just wanted to put together all the information I got reading in different forums, articles, documentation and so on, in order to help anyone who could have experimented the same issues (and, sometimes, frustration) trying to run a very simple application. So if this serves for, at least, one person to resolve some doubts, it would be very gratiying.
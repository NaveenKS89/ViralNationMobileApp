import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './navigation/MainNavigation';
import {Provider as ThemeProvider} from 'react-redux';
import configureStore from './redux-store/store';
import {TOKEN} from './services/token';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
const API = require('./services/config').graphql_api_server;

function skipLimitPagination(keyArgs = false) {
  return {
    keyArgs,
    merge(existing, incoming, {args}) {
      const merged = existing ? existing.slice(0) : [];
      const existingIndex = existing ? existing.length : 0;

      for (let i = 0; i < incoming.length; ++i) {
        merged[existingIndex + i] = incoming[i];
      }

      return merged;
    },
  };
}

const client = new ApolloClient({
  uri: API,
  cache: new InMemoryCache({
    typePolicies: {
      ProfilesResponse: {
        fields: {
          profiles: skipLimitPagination([
            '$rows',
            '$searchString',
            '$orderBy',
            ['$key', '$sort'],
          ]),
        },
      },
      Query: {
        fields: {
          getAllProfiles: {
            keyArgs: [
              ['$rows', '$searchString', '$orderBy', ['$key', '$sort']],
            ],
          },
        },
      },
    },
  }),
  headers: {
    authorization: TOKEN,
    contentType: 'application/json',
  },
});
// Initialize the store
const store = configureStore();

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider store={store}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

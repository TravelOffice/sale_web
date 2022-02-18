import React from 'react';
import './App.css';
import {
  ApolloProvider,
} from '@apollo/client';
import client from '@graphql/client';
import Router from '../Router/Router';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}

export default App;

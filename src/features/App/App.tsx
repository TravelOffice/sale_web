import React from 'react';
import './App.css';
import {
  ApolloProvider,
} from '@apollo/client';
import client from '@graphql/client';
import { ToastContainer } from 'react-toastify';
import '@styles/react/libs/toastify/toastify.scss';
import Router from '../Router/Router';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
      <ToastContainer newestOnTop />
    </ApolloProvider>
  );
}

export default App;

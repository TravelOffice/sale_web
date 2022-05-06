import React from 'react';
import './App.css';
import {
  ApolloProvider,
} from '@apollo/client';
import client from '@graphql/client';
import { ToastContainer } from 'react-toastify';
import '@styles/react/libs/toastify/toastify.scss';
import { withTranslation } from 'react-i18next';
import Router from '../Router/Router';

function AppContent() {
  return (
    <ApolloProvider client={client}>
      <Router />
      <ToastContainer newestOnTop />
    </ApolloProvider>
  );
}

const App = withTranslation()(AppContent);

export default App;

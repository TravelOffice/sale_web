import React, { useEffect } from 'react';
import './App.css';
import {
  ApolloProvider,
} from '@apollo/client';
import client from '@graphql/client';
import { ToastContainer } from 'react-toastify';
import '@styles/react/libs/toastify/toastify.scss';
import 'moment/locale/vi';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Router from '../Router/Router';

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);
  return (
    <ApolloProvider client={client}>
      <Router />
      <ToastContainer newestOnTop />
    </ApolloProvider>
  );
}

export default App;

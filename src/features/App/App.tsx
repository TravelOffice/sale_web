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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from '../Router/Router';

const queryClient = new QueryClient();

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <Router />
        <ToastContainer newestOnTop />
      </ApolloProvider>
    </QueryClientProvider>
  );
}

export default App;

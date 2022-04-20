import {
  ApolloClient, ApolloLink, createHttpLink, InMemoryCache,
} from '@apollo/client';
import { AUTH_TYPE, AuthOptions, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { store } from '@redux/store';

const config = {
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_API_ENDPOINT || '',
  aws_appsync_region: process.env.REACT_APP_AWS_REGION || '',
  aws_appsync_realtimeEndpoint: process.env.REACT_APP_APPSYNC_REALTIME_ENDPOINT || '',
};

const httpLink = createHttpLink({
  uri: config.aws_appsync_graphqlEndpoint,
});

const auth : AuthOptions = {
  type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
  jwtToken: () => store.getState().auth.idToken || '',
};

const linkArgs = {
  url: config.aws_appsync_realtimeEndpoint,
  region: config.aws_appsync_region,
  auth,
};

const link = ApolloLink.from([
  createAuthLink(linkArgs),
  createSubscriptionHandshakeLink(linkArgs, httpLink),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;

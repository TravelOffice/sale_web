import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { history } from '@redux/store';
import { ConnectedRouter } from 'connected-react-router';
import SignIn from '../SignIn/SignIn';
import AuthRoute from './AuthRoute';
import Home from '../Home/Home';

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/sign-in">
          <SignIn />
        </Route>

        <AuthRoute exact path="/">
          <Home />
        </AuthRoute>
      </Switch>
    </ConnectedRouter>
  );
}

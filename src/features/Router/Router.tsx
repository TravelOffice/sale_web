import React from 'react';
import {
  Switch,
  Route,
  // BrowserRouter,
} from 'react-router-dom';
import AuthRoute from '@features/Router/AuthRoute';
import SignOut from '@features/SignOut/SignOut';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '@redux/store';
import Home from '../Home/Home';

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/sign-out">
          <SignOut />
        </Route>
        <AuthRoute path="/">
          <Home />
        </AuthRoute>
      </Switch>
    </ConnectedRouter>
  );
}

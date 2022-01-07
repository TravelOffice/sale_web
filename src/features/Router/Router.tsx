import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { history } from '@redux/store';
import { ConnectedRouter } from 'connected-react-router';
import AuthRoute from './AuthRoute';
import Home from '../Home/Home';
import Initial from '../Initial/Initial';

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/initial">
          <Initial />
        </Route>

        <AuthRoute exact path="/">
          <Home />
        </AuthRoute>
      </Switch>
    </ConnectedRouter>
  );
}

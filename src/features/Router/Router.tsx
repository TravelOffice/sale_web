import React from 'react';
import {
  Switch,
  Route, BrowserRouter,
} from 'react-router-dom';
import AuthRoute from '@features/Router/AuthRoute';
import Home from '../Home/Home';
import Initial from '../Initial/Initial';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/initial">
          <Initial />
        </Route>
        <AuthRoute path="/">
          <Home />
        </AuthRoute>
      </Switch>
    </BrowserRouter>
  );
}
